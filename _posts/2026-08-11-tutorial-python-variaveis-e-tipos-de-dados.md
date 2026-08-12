---
layout: post
title: "#2 - Variáveis e Tipos de Dados"
date: 2026-08-11 08:20:00
image: '/assets/img/posts/tutorial-python-variaveis-e-tipos-de-dados.webp'
description: Como criar e nomear variáveis em Python, os tipos de dados nativos da linguagem, conversão entre tipos, booleanos e o valor None.
category: 'dev'
tags:
- Python
- Programação
- Variáveis
twitter_text: Variáveis e Tipos de Dados em Python
introduction: "Nesta parte do tutorial, você vai aprender a criar variáveis, conhecer os tipos de dados nativos do Python e como converter entre eles."
---

Seguindo a série de tutorial de Python, hoje o assunto é variável e tipo de dado. Se você programou antes em linguagens como Java ou C, vai notar uma diferença logo de cara: em Python você nunca declara o tipo de uma variável explicitamente — quem cuida disso é o próprio interpretador, em tempo de execução.

## Criando variáveis

Diferente de outras linguagens, Python não tem um comando específico pra declarar uma variável. Ela é criada no exato momento em que você atribui um valor a ela, usando o sinal de igual `=`:

```py
nome = "Felipe"
idade = 30
altura = 1.75
```

Isso é chamado de **tipagem dinâmica**: o tipo da variável é inferido a partir do valor atribuído, e não precisa ser declarado antes. Você também não precisa avisar o Python que uma variável vai guardar um texto ou um número — basta atribuir o valor.

Outro detalhe importante: como o tipo é dinâmico, uma variável pode trocar de tipo durante a execução do programa, só reatribuindo um valor de outro tipo a ela:

```py
x = 10       # x é um int
print(type(x))
x = "dez"    # agora x é uma string
print(type(x))
```

```py
<class 'int'>
<class 'str'>
```

A função `type()` retorna o tipo atual do valor guardado na variável — vale a pena guardar ela, você vai usar bastante pra debugar código.

## Regras para nomear variáveis

Nem todo nome é um nome válido de variável em Python. As regras são:

- Só pode começar com letra ou underscore (`_`) — nunca com número.
- O resto do nome pode ter letras, números e underscore.
- Não pode conter espaços nem símbolos como `-`, `@`, `%`.
- É sensível a maiúsculas/minúsculas: `idade`, `Idade` e `IDADE` são três variáveis diferentes.
- Não pode usar palavras reservadas da linguagem, como `if`, `for`, `class`, `import`.

```py
nome_completo = "Felipe Toscano"   # válido
_contador = 0                       # válido (começa com underscore)
idade2 = 30                         # válido (número não é o primeiro caractere)

2idade = 30                         # inválido: não pode começar com número
nome-completo = "Felipe"            # inválido: hífen não é permitido
```

> **Nota:** a convenção de estilo do Python (a PEP 8) recomenda usar `snake_case` pra nomes de variáveis — tudo minúsculo, com underscore separando palavras, como em `nome_completo` ou `total_de_vendas`.

## Atribuição múltipla

Python permite atribuir valores a várias variáveis em uma única linha, o que economiza bastante código.

### Uma linha, vários valores diferentes

```py
nome, idade, cidade = "Felipe", 30, "São Paulo"
print(nome)
print(idade)
print(cidade)
```

> **Nota:** o número de variáveis à esquerda precisa bater exatamente com o número de valores à direita, senão o Python lança um `ValueError`.

### Uma linha, mesmo valor pra todas

Se você quer que várias variáveis comecem com o mesmo valor, dá pra encadear as atribuições:

```py
x = y = z = 0
print(x, y, z)
```

```py
0 0 0
```

## Misturando texto e número no print()

Se você tentar juntar uma string com um número usando o operador `+`, o Python reclama — ele não converte tipos automaticamente nessa situação:

```py
idade = 30
print("Eu tenho " + idade + " anos")
```

```py
TypeError: can only concatenate str (not "int") to str
```

Pra resolver isso, você tem duas opções: converter o número pra string explicitamente com `str()`, ou simplesmente passar os valores separados por vírgula pro `print()` (que já vimos no post anterior):

```py
idade = 30
print("Eu tenho " + str(idade) + " anos")   # concatenando com str()
print("Eu tenho", idade, "anos")             # separando por vírgula
```

Ambas as linhas produzem a mesma saída:

```py
Eu tenho 30 anos
Eu tenho 30 anos
```

## Uma palavra rápida sobre variáveis globais

Quando uma variável é criada fora de qualquer função, ela é chamada de variável **global** — pode ser acessada em qualquer parte do código, inclusive dentro de funções:

```py
mensagem = "Olá!"

def exibir():
    print(mensagem)  # consegue ler a variável global normalmente

exibir()
```

O detalhe é que, por padrão, você só consegue **ler** uma variável global de dentro de uma função — pra modificá-la lá dentro, é preciso usar a palavra-chave `global`:

```py
contador = 0

def incrementar():
    global contador
    contador += 1

incrementar()
print(contador)
```

```py
1
```

Sem o `global`, o Python entenderia `contador += 1` como a criação de uma variável local nova, e não como uma alteração da variável global. Vou aprofundar melhor esse comportamento quando chegarmos no post sobre funções — por enquanto, o importante é saber que ele existe.

## Os tipos de dados nativos do Python

Python já vem com vários tipos de dados prontos, agrupados por categoria:

| Categoria | Tipos |
|---|---|
| Texto | `str` |
| Numérico | `int`, `float`, `complex` |
| Sequência | `list`, `tuple`, `range` |
| Mapeamento | `dict` |
| Conjunto | `set`, `frozenset` |
| Booleano | `bool` |
| Binário | `bytes`, `bytearray`, `memoryview` |
| Nulo | `NoneType` |

Vamos falar de listas, tuplas, sets e dicionários com calma nos próximos posts da série. Por agora, o foco é nos tipos mais básicos: número, booleano e o valor nulo.

## Números: int, float e complex

### int

Números inteiros, positivos ou negativos, sem casas decimais e de tamanho ilimitado (o Python aumenta a precisão automaticamente conforme necessário):

```py
a = 10
b = -350
c = 93000000000

print(type(a))
```

```py
<class 'int'>
```

### float

Números de ponto flutuante, ou seja, com casas decimais:

```py
a = 3.14
b = -0.5
c = 2.0

print(type(a))
```

```py
<class 'float'>
```

Também dá pra escrever números em notação científica usando `e`:

```py
x = 3.5e3   # 3.5 * 10^3
print(x)
```

```py
3500.0
```

### complex

Números complexos, com parte imaginária representada pelo sufixo `j`:

```py
z = 2 + 3j
print(z)
print(type(z))
```

```py
(2+3j)
<class 'complex'>
```

Esse tipo é bem menos comum no dia a dia, aparece mais em contextos matemáticos e de engenharia.

## Conversão de tipos (casting)

Às vezes você precisa forçar a conversão de um valor pra outro tipo — isso se chama _casting_, e é feito com as funções `int()`, `float()` e `str()`.

```py
x = int(1.9)      # float -> int (trunca, não arredonda)
y = float(1)       # int -> float
z = str(10)        # int -> str

print(x, type(x))
print(y, type(y))
print(z, type(z))
```

```py
1 <class 'int'>
1.0 <class 'float'>
10 <class 'str'>
```

> **Nota:** `int()` não arredonda, ele **trunca** a parte decimal. `int(1.9)` vira `1`, não `2`. Se quiser arredondar de verdade, use a função `round()`.

Converter uma string pra número também funciona, desde que o conteúdo da string seja um número válido:

```py
idade_texto = "30"
idade_numero = int(idade_texto)
print(idade_numero + 1)
```

```py
31
```

Se a string não representar um número válido, o Python lança um erro:

```py
int("trinta")
```

```py
ValueError: invalid literal for int() with base 10: 'trinta'
```

## Booleanos

O tipo `bool` representa apenas dois valores possíveis: `True` ou `False` (sempre com a primeira letra maiúscula). Booleanos aparecem o tempo todo em comparações e condições:

```py
print(10 > 5)
print(10 == 5)

ligado = True
print(type(ligado))
```

```py
True
False
<class 'bool'>
```

Praticamente qualquer valor em Python pode ser avaliado como `True` ou `False` num contexto booleano, através da função `bool()`. Como regra geral: valores "vazios" ou "zerados" são `False`, o resto é `True`:

```py
print(bool(0))          # False
print(bool(42))         # True
print(bool(""))         # False (string vazia)
print(bool("oi"))       # True
print(bool([]))         # False (lista vazia)
print(bool(None))       # False
```

## O valor None

`None` é um valor especial em Python que representa "nenhum valor" ou "vazio" — não é a mesma coisa que `0`, string vazia `""` ou `False`, embora todos esses avaliem como "falsy" num contexto booleano. `None` tem seu próprio tipo, o `NoneType`, e é o único valor possível dele:

```py
resultado = None
print(resultado)
print(type(resultado))
```

```py
None
<class 'NoneType'>
```

Um uso comum de `None` é como valor inicial de uma variável que ainda vai receber algo depois, ou como retorno padrão de uma função que não tem nenhum `return` explícito:

```py
def sem_retorno():
    x = 5  # não tem return

resultado = sem_retorno()
print(resultado)
```

```py
None
```

> **Nota:** pra comparar se uma variável é `None`, o correto é usar `is` (ex: `if resultado is None:`), e não `==`. Isso vai fazer mais sentido quando a gente chegar no post sobre operadores de identidade — por ora, adote esse hábito.

Com isso você já sabe criar variáveis, entende os principais tipos de dados nativos do Python e como transitar entre eles. No próximo post, vamos nos aprofundar em um dos tipos mais usados no dia a dia: as strings.

**Fonte adaptada:** [Python Variables](https://www.w3schools.com/python/python_variables.asp), [Python - Variable Names](https://www.w3schools.com/python/python_variables_names.asp), [Python - Multiple Variables](https://www.w3schools.com/python/python_variables_multiple.asp), [Python - Output Variables](https://www.w3schools.com/python/python_variables_output.asp), [Python - Global Variables](https://www.w3schools.com/python/python_variables_global.asp), [Python Data Types](https://www.w3schools.com/python/python_datatypes.asp), [Python Numbers](https://www.w3schools.com/python/python_numbers.asp), [Python Casting](https://www.w3schools.com/python/python_casting.asp), [Python Booleans](https://www.w3schools.com/python/python_booleans.asp), [Python - The None Keyword](https://www.w3schools.com/python/python_none.asp)
