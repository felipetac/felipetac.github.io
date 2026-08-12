---
layout: post
title: "#9 - Funções e Lambda"
date: 2026-08-11 10:40:00
image: '/assets/img/posts/tutorial-python-funcoes-e-lambda.webp'
description: Como criar e chamar funções em Python, trabalhar com argumentos posicionais, nomeados, *args/**kwargs, escopo de variáveis, funções lambda e recursão.
category: 'dev'
tags:
- Python
- Programação
- Funções
twitter_text: Funções e Lambda
introduction: "Nesta parte do tutorial, você vai aprender a criar funções em Python, lidar com diferentes tipos de argumentos, entender escopo de variáveis, usar lambda e recursão."
---

Se você já se pegou copiando e colando o mesmo pedaço de código em lugares diferentes do seu programa, é sinal de que chegou a hora de aprender sobre funções. Uma função é um bloco de código nomeado que só executa quando você o chama — ela existe justamente pra evitar repetição e organizar seu programa em pedaços menores e reutilizáveis.

Neste post você vai ver como criar e chamar funções, os diferentes jeitos de passar argumentos pra elas (incluindo os famosos `*args` e `**kwargs`), como funciona o escopo de variáveis dentro e fora de uma função, o que são funções _lambda_ e, por fim, o que é recursão.

## Criando e chamando funções

Uma função é definida com a palavra-chave `def`, seguida do nome da função, parênteses e dois-pontos. O corpo da função fica indentado embaixo.

```py
def saudacao():
    print("Olá! Bem-vindo ao tutorial.")

saudacao()
saudacao()
```

A saída é:

```py
Olá! Bem-vindo ao tutorial.
Olá! Bem-vindo ao tutorial.
```

Repare que só definir a função não executa nada — o `print` só roda quando você chama `saudacao()`. E você pode chamar a mesma função quantas vezes quiser.

### Retornando valores

Uma função pode devolver um resultado pra quem a chamou usando `return`. Assim que o Python encontra um `return`, ele encerra a execução da função naquele ponto e devolve o valor.

```py
def dobro(numero):
    return numero * 2

resultado = dobro(7)
print(resultado)
```

A saída é:

```py
14
```

Se a função não tiver um `return` explícito, ela devolve `None` por padrão.

### Função vazia

Se por algum motivo você precisar deixar uma função sem conteúdo por enquanto (por exemplo, pra implementar depois), use `pass` — um bloco de função vazio dá erro de sintaxe.

```py
def implementar_depois():
    pass
```

## Argumentos de funções

_Parâmetro_ é o nome que aparece na definição da função; _argumento_ é o valor de fato passado na hora da chamada. Na prática, os dois termos costumam ser usados meio que como sinônimos no dia a dia.

### Argumentos posicionais

Por padrão, os argumentos são associados aos parâmetros pela ordem em que aparecem.

```py
def apresentar(nome, idade):
    print(f"{nome} tem {idade} anos.")

apresentar("Ana", 28)
```

A saída é:

```py
Ana tem 28 anos.
```

Se você chamar a função com o número errado de argumentos, o Python lança um erro — cada parâmetro precisa receber exatamente um valor, a não ser que ele tenha um padrão definido (veja a seguir).

### Argumentos nomeados (keyword arguments)

Você também pode passar os argumentos explicitando o nome do parâmetro, e nesse caso a ordem deixa de importar.

```py
def apresentar(nome, idade):
    print(f"{nome} tem {idade} anos.")

apresentar(idade=28, nome="Ana")
```

A saída é a mesma de antes:

```py
Ana tem 28 anos.
```

### Valores padrão

Você pode dar um valor padrão a um parâmetro. Se a chamada não informar aquele argumento, o padrão é usado.

```py
def apresentar(nome, idade=18):
    print(f"{nome} tem {idade} anos.")

apresentar("Carlos")
apresentar("Bia", 32)
```

A saída é:

```py
Carlos tem 18 anos.
Bia tem 32 anos.
```

> **Nota:** parâmetros com valor padrão sempre vêm depois dos que não têm padrão, na definição da função. `def f(a, b=1):` funciona, `def f(a=1, b):` dá erro de sintaxe.

## *args: número variável de argumentos posicionais

Às vezes você não sabe de antemão quantos argumentos a função vai receber. Colocando um `*` antes do nome do parâmetro, o Python empacota todos os argumentos posicionais extras numa tupla.

```py
def somar_tudo(*numeros):
    total = 0
    for numero in numeros:
        total += numero
    return total

print(somar_tudo(1, 2, 3))
print(somar_tudo(10, 20, 30, 40))
```

A saída é:

```py
6
100
```

O nome `args` é só convenção — o que importa é o `*` na frente. Dentro da função, `numeros` é uma tupla comum, então dá pra iterar, indexar, usar `len()`, etc.

## **kwargs: número variável de argumentos nomeados

Do mesmo jeito, um `**` antes do nome do parâmetro empacota argumentos nomeados extras num dicionário.

```py
def exibir_dados(**dados):
    for chave, valor in dados.items():
        print(f"{chave}: {valor}")

exibir_dados(nome="Felipe", linguagem="Python", ano=2026)
```

A saída é:

```py
nome: Felipe
linguagem: Python
ano: 2026
```

### Combinando tudo

A ordem importa quando você mistura parâmetros normais, `*args` e `**kwargs` numa mesma função: primeiro os parâmetros posicionais/nomeados normais, depois `*args`, depois `**kwargs`.

```py
def resumo(titulo, *itens, **detalhes):
    print(f"--- {titulo} ---")
    for item in itens:
        print(f"- {item}")
    for chave, valor in detalhes.items():
        print(f"{chave}: {valor}")

resumo("Compras", "Arroz", "Feijão", urgente=True, quantidade=2)
```

A saída é:

```py
--- Compras ---
- Arroz
- Feijão
urgente: True
quantidade: 2
```

## Escopo de variáveis

_Escopo_ é a região do código onde uma variável pode ser acessada. Em Python existem basicamente dois níveis: local e global.

### Escopo local

Uma variável criada dentro de uma função pertence ao _escopo local_ daquela função — só pode ser usada ali dentro.

```py
def minha_funcao():
    x = 300
    print(x)

minha_funcao()
```

Se você tentar usar `x` fora da função, o Python lança um `NameError`, porque `x` simplesmente não existe naquele escopo.

### Escopo global

Uma variável criada no corpo principal do programa (fora de qualquer função) é _global_ — pode ser lida de dentro de qualquer função.

```py
x = 300

def minha_funcao():
    print(x)

minha_funcao()
print(x)
```

A saída é:

```py
300
300
```

Só que atenção: se você tentar **atribuir** um valor a uma variável de mesmo nome dentro de uma função, o Python cria uma nova variável local, sem alterar a global.

```py
x = 300

def minha_funcao():
    x = 100
    print(x)

minha_funcao()
print(x)
```

A saída é:

```py
100
300
```

### A palavra-chave global

Se você realmente precisa modificar a variável global de dentro de uma função, use `global`.

```py
x = 300

def minha_funcao():
    global x
    x = 100

minha_funcao()
print(x)
```

A saída é:

```py
100
```

> **Nota:** use `global` com moderação. Funções que alteram variáveis globais escondidas ficam mais difíceis de entender e de testar — na maioria dos casos, é mais claro receber a informação como argumento e devolver o resultado com `return`.

### A palavra-chave nonlocal

Quando você tem uma função dentro de outra função (funções aninhadas), o `nonlocal` permite que a função interna modifique uma variável da função externa, sem torná-la global.

```py
def funcao_externa():
    mensagem = "oi"

    def funcao_interna():
        nonlocal mensagem
        mensagem = "olá"

    funcao_interna()
    return mensagem

print(funcao_externa())
```

A saída é:

```py
olá
```

## Funções lambda

Uma função _lambda_ é uma função anônima — sem nome — escrita numa linha só, com a sintaxe `lambda argumentos: expressão`. Ela pode receber quantos argumentos você quiser, mas o corpo é limitado a uma única expressão (o resultado dessa expressão já é o retorno, sem precisar de `return`).

```py
dobro = lambda x: x * 2
print(dobro(5))

soma = lambda a, b: a + b
print(soma(3, 4))
```

A saída é:

```py
10
7
```

### Lambda dentro de uma função normal

Um uso comum é uma função "fábrica", que devolve uma lambda configurada com um valor capturado do escopo externo.

```py
def multiplicador(fator):
    return lambda numero: numero * fator

triplicar = multiplicador(3)
print(triplicar(10))
```

A saída é:

```py
30
```

### Lambda com funções embutidas

Lambdas aparecem bastante como argumento de funções como `sorted()`, `map()` e `filter()`, quando você precisa de uma pequena lógica descartável — sem a necessidade de dar nome e definir uma função separada só pra isso.

```py
pessoas = [("Ana", 28), ("Bruno", 19), ("Carla", 35)]
pessoas_ordenadas = sorted(pessoas, key=lambda pessoa: pessoa[1])
print(pessoas_ordenadas)
```

A saída é:

```py
[('Bruno', 19), ('Ana', 28), ('Carla', 35)]
```

## Recursão

Uma função _recursiva_ é uma função que chama a si mesma. É uma técnica poderosa pra resolver problemas que podem ser quebrados em versões menores do mesmo problema — mas que exige cuidado, porque é fácil escrever uma recursão que nunca termina.

Toda função recursiva precisa de dois ingredientes: um _caso base_, que interrompe as chamadas, e um _caso recursivo_, que chama a função de novo com uma entrada "menor", caminhando em direção ao caso base.

### Exemplo clássico: fatorial

```py
def fatorial(n):
    if n <= 1:
        return 1
    return n * fatorial(n - 1)

print(fatorial(5))
```

A saída é:

```py
120
```

Cada chamada de `fatorial` empilha uma nova execução esperando o resultado da chamada seguinte, até `n` chegar a 1 — o caso base — e a pilha começar a "desenrolar", multiplicando os resultados de volta.

### Cuidado com a profundidade da recursão

O Python tem um limite padrão de aproximadamente 1000 chamadas recursivas empilhadas. Se o caso base nunca for alcançado (ou se a recursão for funda demais), você recebe um `RecursionError`.

```py
import sys

print(sys.getrecursionlimit())
```

A saída, no caso mais comum, é:

```py
1000
```

> **Nota:** dá pra aumentar esse limite com `sys.setrecursionlimit()`, mas isso só adia o problema — recursão funda demais tende a ser mais lenta e consumir mais memória do que a versão equivalente com loop. Prefira recursão quando ela deixa o código mais claro (como em estruturas de árvore), e não como substituto padrão de um `for`/`while`.

E é assim que funções deixam seu código mais organizado e reutilizável — do `def` mais simples até recursões que resolvem problemas inteiros em poucas linhas.

**Fonte adaptada:** [Python Functions](https://www.w3schools.com/python/python_functions.asp), [Python Function Arguments](https://www.w3schools.com/python/python_arguments.asp), [Python *args and **kwargs](https://www.w3schools.com/python/python_args_kwargs.asp), [Python Scope](https://www.w3schools.com/python/python_scope.asp), [Python Lambda](https://www.w3schools.com/python/python_lambda.asp), [Python Recursion](https://www.w3schools.com/python/python_recursion.asp)
