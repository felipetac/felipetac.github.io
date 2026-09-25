---
layout: post
title: "#10 - Argumentos Avançados e Type Hints"
date: 2026-08-11 11:00:00
image: '/assets/img/posts/tutorial-python-argumentos-avancados-e-type-hints.webp'
description: Como forçar argumentos somente-posicionais ou somente-nomeados numa função Python, e como usar type hints e anotações de função para documentar os tipos esperados.
category: 'dev'
tags:
- Python
- Programação
- Funções
twitter_text: Argumentos Avançados e Type Hints
introduction: "Nesta parte do tutorial, você vai aprender a controlar como os argumentos de uma função podem ser passados, e a documentar os tipos esperados com type hints."
---

No post anterior você viu argumentos posicionais, nomeados, valores padrão, `*args` e `**kwargs` — o suficiente pra escrever praticamente qualquer função do dia a dia. Só que, conforme uma função cresce ou passa a ser usada por outras pessoas do seu time, dois problemas aparecem: às vezes você quer **forçar** um jeito específico de passar um argumento (só por posição, ou só por nome), e quase sempre você quer deixar claro **que tipo de dado** cada parâmetro espera, sem precisar escrever isso só nos comentários.

Neste post você vai ver como resolver os dois problemas: argumentos somente-posicionais e somente-nomeados, e type hints.

## Argumentos somente-posicionais

Colocando uma `/` na lista de parâmetros, tudo que vem **antes** dela só pode ser passado por posição — tentar usar o nome do parâmetro nessa chamada dá erro.

```py
def dividir(a, b, /):
    return a / b

print(dividir(10, 2))
```

A saída é:

```py
5.0
```

Se você tentar chamar `dividir(a=10, b=2)`, o Python lança um `TypeError`, porque `a` e `b` foram declarados como somente-posicionais. Isso é útil quando o nome do parâmetro não tem muito significado pra quem está chamando a função (`a` e `b` numa divisão, por exemplo), ou quando você quer liberdade pra renomear o parâmetro no futuro sem quebrar o código de quem já usa a função.

## Argumentos somente-nomeados

O caminho inverso também existe: colocando um `*` na lista de parâmetros, tudo que vem **depois** dele só pode ser passado explicitando o nome.

```py
def criar_usuario(nome, *, admin=False):
    print(f"Usuário {nome}, admin={admin}")

criar_usuario("Ana", admin=True)
```

A saída é:

```py
Usuário Ana, admin=True
```

Tentar chamar `criar_usuario("Ana", True)` (passando `admin` por posição) dá erro. Isso é especialmente útil pra parâmetros booleanos ou pouco óbvios: `criar_usuario("Ana", True)` não deixa claro o que aquele `True` representa só de olhar a chamada, enquanto `criar_usuario("Ana", admin=True)` é auto-explicativo.

### Combinando os dois

Dá pra misturar as três categorias numa função só: primeiro os parâmetros somente-posicionais, depois os "normais" (que aceitam qualquer um dos dois jeitos), depois os somente-nomeados.

```py
def registrar(nome, idade, /, cidade, *, ativo=True):
    print(f"{nome}, {idade} anos, mora em {cidade}, ativo={ativo}")

registrar("Bruno", 30, cidade="Recife", ativo=False)
```

A saída é:

```py
Bruno, 30 anos, mora em Recife, ativo=False
```

Aqui, `nome` e `idade` só podem vir por posição, `cidade` aceita qualquer jeito, e `ativo` só pode vir por nome.

> **Nota:** você não precisa usar `/` e `*` em toda função que escrever — a maioria do código Python do dia a dia nem usa. Eles fazem sentido quando você está projetando uma função que outras pessoas (ou você mesmo, no futuro) vão chamar bastante, e quer deixar a interface mais clara ou mais flexível de manter.

## Anotações de função

_Function annotations_ são um jeito de anexar informação extra a um parâmetro ou ao retorno de uma função, usando `:` depois do nome do parâmetro e `->` antes dos dois-pontos finais da definição. O uso mais comum, de longe, é indicar o tipo esperado.

```py
def saudacao(nome: str, idade: int) -> str:
    return f"{nome} tem {idade} anos"

print(saudacao("Carla", 27))
```

A saída é:

```py
Carla tem 27 anos
```

O Python guarda essas anotações num dicionário especial, `__annotations__`, que você pode inspecionar em tempo de execução.

```py
def saudacao(nome: str, idade: int) -> str:
    return f"{nome} tem {idade} anos"

print(saudacao.__annotations__)
```

A saída é:

```py
{'nome': <class 'str'>, 'idade': <class 'int'>, 'return': <class 'str'>}
```

## Type hints

_Type hints_ é o nome mais comum pra esse mesmo recurso quando usado especificamente pra indicar tipos — e é praticamente onipresente em código Python profissional hoje em dia. Além dos tipos básicos (`str`, `int`, `float`, `bool`), dá pra anotar estruturas mais elaboradas, como listas e dicionários com um tipo específico de conteúdo.

```py
def media(numeros: list[float]) -> float:
    return sum(numeros) / len(numeros)

print(media([8.5, 9.0, 7.5]))
```

A saída é:

```py
8.333333333333334
```

`list[float]` diz "uma lista onde cada item é um `float`". O mesmo padrão vale pra `dict[str, int]` (dicionário com chaves texto e valores inteiros), `tuple[int, int]` (tupla com dois inteiros) e assim por diante.

Quando um valor pode ser de um tipo **ou** `None`, a forma mais moderna de indicar isso é com `|`:

```py
def buscar_usuario(id: int) -> str | None:
    usuarios = {1: "Ana", 2: "Bruno"}
    return usuarios.get(id)

print(buscar_usuario(1))
print(buscar_usuario(99))
```

A saída é:

```py
Ana
None
```

> **Nota:** essa é provavelmente a maior pegadinha de type hints em Python: eles são **só documentação** pro interpretador. Nada impede você de chamar `saudacao(123, "trinta")` com os tipos trocados — o Python não vai reclamar em tempo de execução, e o programa só vai quebrar (ou pior, dar um resultado errado silenciosamente) se o código tentar tratar `123` como texto. Quem de fato verifica se os tipos batem são ferramentas externas como o `mypy`, rodadas separadamente, geralmente como parte do processo de CI de um projeto.

Mesmo sem checagem automática, type hints valem a pena: deixam a assinatura da função auto-documentada, ajudam o autocomplete do seu editor a ser muito mais preciso, e facilitam bastante entender o que uma função espera sem precisar ler o corpo inteiro dela.

## A pegadinha dos valores padrão mutáveis

Já que o assunto é valor padrão de argumento, tem uma armadilha clássica do Python que vale conhecer antes de sair usando valores padrão livremente: nunca use uma lista, dicionário ou outro objeto mutável como valor padrão.

```py
def adicionar_item(item, lista=[]):
    lista.append(item)
    return lista

print(adicionar_item("maçã"))
print(adicionar_item("banana"))
```

A saída (bem contraintuitiva) é:

```py
['maçã']
['maçã', 'banana']
```

Repare que a segunda chamada "lembrou" do item da primeira, mesmo sem você ter passado nenhuma lista. O motivo é que o valor padrão de um parâmetro é criado **uma única vez**, quando a função é definida — não a cada chamada. Todas as chamadas que não passam `lista` explicitamente acabam compartilhando exatamente a mesma lista por baixo dos panos.

O jeito correto de resolver isso é usar `None` como padrão, e criar a lista nova dentro do corpo da função.

```py
def adicionar_item(item, lista=None):
    if lista is None:
        lista = []
    lista.append(item)
    return lista

print(adicionar_item("maçã"))
print(adicionar_item("banana"))
```

A saída é:

```py
['maçã']
['banana']
```

> **Nota:** essa pegadinha vale pra qualquer valor **mutável** usado como padrão (listas, dicionários, sets, ou instâncias de classes que você mesmo escreveu). Valores **imutáveis** como padrão — números, strings, tuplas, `None` — não têm esse problema, porque não têm como ser alterados "no lugar" por uma chamada anterior.

Com argumentos somente-posicionais, somente-nomeados e type hints, suas funções ficam com uma interface mais clara tanto pra quem chama quanto pra quem lê o código depois. No próximo post, você vai ver como funções podem ser tratadas como qualquer outro valor em Python — passadas de um lado pro outro, devolvidas por outras funções — com funções de alta ordem e closures.

**Fonte adaptada:** [Python Positional-Only Arguments](https://www.tutorialspoint.com/python/python_positional_only_arguments.htm), [Python Keyword-Only Arguments](https://www.tutorialspoint.com/python/python_keywordonly_arguments.htm), [Python Function Annotations](https://www.tutorialspoint.com/python/python_function_annotations.htm), [Python Type Hints](https://www.tutorialspoint.com/python/python_type_hints.htm)
