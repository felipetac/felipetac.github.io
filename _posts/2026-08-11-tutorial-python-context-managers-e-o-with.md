---
layout: post
title: "Python #19 - Context Managers: Controlando Recursos com with"
date: 2026-08-11 14:00:00
image: '/assets/img/posts/tutorial-python-context-managers-e-o-with.webp'
description: O que acontece por trás do with open(...), como criar seu próprio context manager com uma classe usando __enter__ e __exit__, e a versão mais curta com contextlib.
category: 'dev'
tags:
- Python
- Programação
- Context Managers
twitter_text: "Python #19 - Context Managers: Controlando Recursos com with"
introduction: "Nesta parte do tutorial, você vai entender o que o with faz por trás dos panos e vai aprender a criar seus próprios context managers."
---

No post sobre arquivos, você aprendeu que `with open(...)` é o jeito recomendado de abrir um arquivo, porque ele garante o fechamento automático, mesmo se um erro acontecer no meio do caminho. O que talvez não tenha ficado claro é **como** isso funciona — `with` não é mágica exclusiva de arquivos, é um protocolo genérico que qualquer objeto pode implementar. Neste post você vai entender esse protocolo, e vai criar seus próprios _context managers_.

## O que with faz de verdade

Um _context manager_ é qualquer objeto que sabe responder a duas perguntas: "o que fazer ao entrar no bloco `with`" e "o que fazer ao sair dele" (com erro ou sem erro). O objeto retornado por `open()` já implementa esse protocolo — é por isso que `with open(...) as arquivo:` funciona.

```py
with open("notas.txt", "w") as arquivo:
    arquivo.write("Primeira linha\n")

print("Arquivo já foi fechado automaticamente aqui fora")
```

A saída é:

```py
Arquivo já foi fechado automaticamente aqui fora
```

Ao final do bloco `with` — mesmo que aconteça um erro no meio dele — o arquivo é fechado sozinho, sem você precisar chamar `arquivo.close()`.

## Criando um context manager com uma classe

Pra um objeto participar do protocolo `with`, ele precisa implementar dois métodos mágicos: `__enter__()`, chamado ao entrar no bloco, e `__exit__()`, chamado ao sair dele (com erro ou sem erro).

```py
class Cronometro:
    def __enter__(self):
        print("Cronômetro iniciado")
        return self

    def __exit__(self, tipo_erro, valor_erro, traceback):
        print("Cronômetro finalizado")

with Cronometro():
    print("Fazendo alguma coisa demorada...")
```

A saída é:

```py
Cronômetro iniciado
Fazendo alguma coisa demorada...
Cronômetro finalizado
```

O valor que `__enter__()` devolve é o que fica disponível depois do `as`, se você usar um.

```py
class ConexaoFalsa:
    def __enter__(self):
        print("Conectando...")
        self.conectado = True
        return self

    def __exit__(self, tipo_erro, valor_erro, traceback):
        print("Desconectando...")
        self.conectado = False

with ConexaoFalsa() as conexao:
    print("Conectado?", conexao.conectado)

print("Conectado?", conexao.conectado)
```

A saída é:

```py
Conectando...
Conectado? True
Desconectando...
Conectado? False
```

### Lidando com erros dentro do bloco

Os três parâmetros de `__exit__()` — `tipo_erro`, `valor_erro` e `traceback` — descrevem um erro que tenha acontecido dentro do bloco `with`. Se não houve erro, os três vêm como `None`.

```py
class Cronometro:
    def __enter__(self):
        print("Cronômetro iniciado")
        return self

    def __exit__(self, tipo_erro, valor_erro, traceback):
        if tipo_erro is not None:
            print(f"Um erro aconteceu: {valor_erro}")
        print("Cronômetro finalizado")
        return True

with Cronometro():
    print("Início")
    raise ValueError("Algo deu errado")
    print("Essa linha nunca roda")

print("O programa continua normalmente aqui")
```

A saída é:

```py
Cronômetro iniciado
Início
Um erro aconteceu: Algo deu errado
Cronômetro finalizado
O programa continua normalmente aqui
```

Repare que o programa **não** quebrou com o `ValueError` — isso porque `__exit__()` devolveu `True`, o que diz ao Python "eu já tratei esse erro, pode seguir em frente". Se `__exit__()` devolvesse `False` (ou nada, que é o mesmo que `None`), o erro se propagaria normalmente pra fora do bloco `with`, como qualquer exceção não tratada.

> **Nota:** `__exit__()` roda sempre, com erro ou sem erro — é o mesmo tipo de garantia que o bloco `finally` do `try`/`except` oferece. Na prática, `__exit__()` é o lugar certo pra código de limpeza (fechar conexão, liberar recurso, desfazer uma alteração temporária), do mesmo jeito que `finally` é.

## Vários context managers num único with

Quando você precisa de mais de um recurso ao mesmo tempo — dois arquivos, por exemplo —, dá pra combinar vários context managers na mesma linha de `with`, separados por vírgula, em vez de aninhar um `with` dentro do outro.

```py
with open("origem.txt", "r") as entrada, open("copia.txt", "w") as saida:
    conteudo = entrada.read()
    saida.write(conteudo)

print("Cópia concluída, os dois arquivos já foram fechados")
```

A saída é:

```py
Cópia concluída, os dois arquivos já foram fechados
```

Os dois arquivos são fechados automaticamente ao final do bloco, na ordem inversa da abertura — `saida` primeiro, depois `entrada` — mesmo que um erro aconteça no meio da cópia. Isso é equivalente a escrever `with open("origem.txt") as entrada:` e, dentro dele, um segundo `with open("copia.txt", "w") as saida:` aninhado — só que numa sintaxe mais enxuta.

## Um exemplo mais prático: cronômetro de verdade

O `Cronometro` de exemplo lá em cima só imprimia texto — mas dá pra usar exatamente a mesma ideia pra medir quanto tempo um bloco de código realmente demora, usando `time.perf_counter()` no `__enter__` e no `__exit__`.

```py
import time

class Cronometro:
    def __enter__(self):
        self.inicio = time.perf_counter()
        return self

    def __exit__(self, tipo_erro, valor_erro, traceback):
        duracao = time.perf_counter() - self.inicio
        print(f"Bloco executado em {duracao:.4f} segundos")

with Cronometro():
    total = sum(numero ** 2 for numero in range(1_000_000))

print(total)
```

A saída (a duração exata varia conforme a máquina) é algo como:

```py
Bloco executado em 0.0731 segundos
333332833333500000
```

Esse é um padrão bastante comum na prática: qualquer coisa que precise de uma etapa de "preparação" antes de um bloco de código e uma etapa de "finalização" depois — medir tempo, abrir e fechar uma transação de banco de dados, ligar e desligar um modo de depuração — é uma boa candidata a virar um context manager.

## A versão curta: contextlib.contextmanager

Escrever uma classe inteira só pra ter `__enter__`/`__exit__` pode ser mais código do que o necessário pra casos simples. O decorator `@contextmanager`, do módulo `contextlib`, permite escrever um context manager como uma função geradora: tudo antes do `yield` roda como `__enter__`, o valor do `yield` é o que vem depois do `as`, e tudo depois do `yield` roda como `__exit__`.

```py
from contextlib import contextmanager

@contextmanager
def cronometro():
    print("Cronômetro iniciado")
    yield "resultado"
    print("Cronômetro finalizado")

with cronometro() as resultado:
    print("Fazendo alguma coisa demorada...")
    print("Valor recebido:", resultado)
```

A saída é:

```py
Cronômetro iniciado
Fazendo alguma coisa demorada...
Valor recebido: resultado
Cronômetro finalizado
```

Essa versão faz exatamente o mesmo que a classe `Cronometro` do primeiro exemplo, com bem menos código — geralmente vale a pena reservar a versão com classe pra quando você precisa de um controle mais fino sobre erros, como no exemplo do `__exit__()` que devolve `True`.

Com context managers, você entende o mecanismo por trás do `with open(...)` que já vinha usando, e ganha uma ferramenta pra garantir que qualquer recurso do seu programa — não só arquivos — seja liberado de forma confiável, mesmo quando algo dá errado no meio do caminho.

**Fonte adaptada:** [Python Context Managers](https://www.tutorialspoint.com/python/python_context_managers.htm)
