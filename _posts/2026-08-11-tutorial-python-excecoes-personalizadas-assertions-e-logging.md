---
layout: post
title: "Python #20 - Exceções Personalizadas, Assertions e Logging"
date: 2026-08-11 14:20:00
image: '/assets/img/posts/tutorial-python-excecoes-personalizadas-assertions-e-logging.webp'
description: Como criar suas próprias classes de exceção em Python, usar assert para verificar suposições no código, e registrar eventos de um programa com o módulo logging.
category: 'dev'
tags:
- Python
- Programação
- Exceções
twitter_text: Exceções Personalizadas, Assertions e Logging
introduction: "Nesta parte do tutorial, você vai aprender a criar exceções personalizadas, usar assert e registrar eventos do seu programa com o módulo logging."
---

No post sobre tratamento de erros, você usou `try`/`except` com exceções já prontas da linguagem, como `ValueError` e `ZeroDivisionError`. Esse post continua o assunto com três ferramentas que aparecem bastante em código Python mais maduro: criar seu próprio tipo de exceção, usar `assert` pra verificar suposições do seu código, e registrar o que está acontecendo num programa com o módulo `logging` — algo bem mais adequado que `print()` pra esse propósito.

## Exceções personalizadas

Você pode criar seu próprio tipo de erro criando uma classe que herda de `Exception` (ou de uma exceção mais específica já existente).

```py
class SaldoInsuficienteError(Exception):
    pass

def sacar(saldo, valor):
    if valor > saldo:
        raise SaldoInsuficienteError("Saldo insuficiente para o saque")
    return saldo - valor

try:
    sacar(100, 500)
except SaldoInsuficienteError as erro:
    print(f"Operação negada: {erro}")
```

A saída é:

```py
Operação negada: Saldo insuficiente para o saque
```

O mensagem passada pra `SaldoInsuficienteError("...")` vira o texto acessível via `str(erro)` (o que é exatamente o que o `{erro}` do f-string acima usa) — o mesmo comportamento de qualquer exceção embutida da linguagem.

### Adicionando dados extras à exceção

Como qualquer classe, uma exceção personalizada pode ter seu próprio `__init__` e guardar informações adicionais, além da mensagem.

```py
class SaldoInsuficienteError(Exception):
    def __init__(self, saldo_atual, valor_solicitado):
        self.saldo_atual = saldo_atual
        self.valor_solicitado = valor_solicitado
        super().__init__(
            f"Saldo de R${saldo_atual:.2f} insuficiente para sacar R${valor_solicitado:.2f}"
        )

def sacar(saldo, valor):
    if valor > saldo:
        raise SaldoInsuficienteError(saldo, valor)
    return saldo - valor

try:
    sacar(100, 500)
except SaldoInsuficienteError as erro:
    print(erro)
    print(f"Faltaram R${erro.valor_solicitado - erro.saldo_atual:.2f}")
```

A saída é:

```py
Saldo de R$100.00 insuficiente para sacar R$500.00
Faltaram R$400.00
```

`super().__init__(...)` passa a mensagem final pro `Exception` original, garantindo que `print(erro)` continue funcionando como você espera. Quem captura essa exceção ainda ganha acesso direto a `erro.saldo_atual` e `erro.valor_solicitado`, sem precisar extrair esses números de dentro do texto da mensagem.

> **Nota:** por convenção, o nome de uma exceção personalizada termina com `Error` (`SaldoInsuficienteError`, e não só `SaldoInsuficiente`) — segue o mesmo padrão das exceções embutidas da linguagem (`ValueError`, `TypeError`), e deixa claro pra quem lê o código que aquilo é um tipo de erro.

### Encadeando exceções com raise ... from

Às vezes você captura um erro de baixo nível e quer relançar um erro seu, mais específico pro contexto — mas sem perder o rastro do erro original. É pra isso que serve `raise ... from ...`.

```py
def carregar_configuracao(caminho):
    try:
        with open(caminho) as arquivo:
            return arquivo.read()
    except FileNotFoundError as erro_original:
        raise RuntimeError("Não foi possível iniciar a aplicação") from erro_original

carregar_configuracao("config_inexistente.txt")
```

A saída mostra os dois erros encadeados, deixando claro qual foi a causa raiz:

```py
FileNotFoundError: [Errno 2] No such file or directory: 'config_inexistente.txt'

The above exception was the direct cause of the following exception:

RuntimeError: Não foi possível iniciar a aplicação
```

Sem o `from erro_original`, o traceback ainda mostraria os dois erros (porque um aconteceu dentro do `except` do outro), mas com uma mensagem genérica de contexto em vez da relação explícita de "causa direta" — `from` deixa claro, tanto pra quem lê o código quanto pra quem lê o traceback em produção, que o `RuntimeError` é consequência direta do `FileNotFoundError`, e não um erro não relacionado.

## assert

`assert` verifica se uma condição é verdadeira, e levanta um `AssertionError` imediatamente se não for. É uma ferramenta pensada pra pegar situações que, na teoria, **nunca deveriam acontecer** — bugs no seu próprio código, não erros esperados vindos do usuário ou de uma fonte externa.

```py
def calcular_media(notas):
    assert len(notas) > 0, "A lista de notas não pode estar vazia"
    return sum(notas) / len(notas)

print(calcular_media([7, 8, 9]))
print(calcular_media([]))
```

A saída é:

```py
8.0
AssertionError: A lista de notas não pode estar vazia
```

O segundo argumento de `assert` (depois da vírgula) é a mensagem que aparece se a condição for falsa — é opcional, mas deixa o erro muito mais fácil de entender.

> **Nota:** não use `assert` pra validar dados que vêm de fora do seu programa (entrada do usuário, resposta de uma API, conteúdo de um arquivo) — use `if`/`raise` com uma exceção apropriada pra isso, como você viu no post sobre tratamento de erros. O motivo é que `assert` pode ser **desativado inteiro** ao rodar o Python com a flag `-O` (otimizado), o que faria sua validação desaparecer silenciosamente em produção.

## Logging

`print()` é ótimo pra depurar rapidamente, mas não escala: não tem como desligar só alguns prints, não distingue uma mensagem informativa de um erro grave, e não registra quando cada coisa aconteceu. O módulo `logging`, da biblioteca padrão, resolve os três problemas.

```py
import logging

logging.basicConfig(level=logging.INFO)

logging.debug("Mensagem de debug")
logging.info("Servidor iniciado")
logging.warning("Uso de memória alto")
logging.error("Falha ao conectar no banco de dados")
```

A saída é:

```py
INFO:root:Servidor iniciado
WARNING:root:Uso de memória alto
ERROR:root:Falha ao conectar no banco de dados
```

Repare que `logging.debug(...)` não apareceu na saída — isso porque `basicConfig(level=logging.INFO)` configurou o log pra mostrar só mensagens de nível `INFO` pra cima, ignorando `DEBUG`.

### Os níveis de log

Do menos ao mais grave, os níveis padrão são: `DEBUG`, `INFO`, `WARNING`, `ERROR` e `CRITICAL`. Configurar o `level` na hora do `basicConfig()` define o nível mínimo que aparece — qualquer mensagem abaixo dele é simplesmente ignorada, sem precisar remover as chamadas de log do código.

```py
import logging

logging.basicConfig(level=logging.WARNING)

logging.info("Essa mensagem não aparece")
logging.warning("Essa mensagem aparece")
logging.error("Essa também aparece")
```

A saída é:

```py
WARNING:root:Essa mensagem aparece
ERROR:root:Essa também aparece
```

Isso é exatamente o tipo de flexibilidade que `print()` não oferece: você pode deixar chamadas de `logging.debug(...)` espalhadas pelo código o tempo todo, e só ativá-las (mudando o `level`) quando estiver de fato investigando um problema.

Com exceções personalizadas pra representar erros específicos do seu domínio, `assert` pra pegar bugs cedo durante o desenvolvimento, e `logging` pra registrar o que seu programa está fazendo de um jeito organizado, você fecha o assunto de tratamento de erros com ferramentas bem mais robustas do que só `try`/`except` e `print()`.

**Fonte adaptada:** [Python User-defined Exception](https://www.tutorialspoint.com/python/python_userdefined_exception.htm), [Python Assertions](https://www.tutorialspoint.com/python/python_assertions.htm), [Python Logging](https://www.tutorialspoint.com/python/python_logging.htm)
