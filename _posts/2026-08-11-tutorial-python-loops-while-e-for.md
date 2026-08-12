---
layout: post
title: "#8 - Loops: While e For"
date: 2026-08-11 10:20:00
image: '/assets/img/posts/tutorial-python-loops-while-e-for.webp'
description: Como repetir blocos de código em Python com while e for, controlando a repetição com break, continue, else e a função range().
category: 'dev'
tags:
- Python
- Programação
- Loops
twitter_text: Loops - While e For
introduction: "Nesta parte do tutorial, você vai aprender a repetir código em Python usando os loops while e for, controlando a repetição com break, continue, else e range()."
---

Até agora você viu como o Python toma decisões com `if`/`elif`/`else`. Mas e quando é preciso repetir a mesma tarefa várias vezes — percorrer uma lista, processar cada linha de um arquivo, ou simplesmente contar até 10? É pra isso que existem os _loops_ (ou "laços de repetição"). O Python tem dois: o `while`, que repete enquanto uma condição continuar verdadeira, e o `for`, que percorre os itens de uma sequência um por um.

Neste post você vai ver os dois em detalhe, além de dois comandos que controlam o fluxo dentro de um loop (`break` e `continue`), a cláusula `else` — uma particularidade meio escondida do Python — e a função `range()`, que anda sempre de mãos dadas com o `for`.

## O loop while

O `while` executa um bloco de código enquanto uma condição for verdadeira. A sintaxe é parecida com a do `if`, só que ele volta pro início e testa a condição de novo a cada repetição.

```py
contador = 1
while contador <= 5:
    print(contador)
    contador += 1
```

A saída é:

```py
1
2
3
4
5
```

Repare que o `contador += 1` é essencial. Se você esquecer de atualizar a variável usada na condição, o `while` nunca vai ficar falso e o programa entra num loop infinito — vai ficar rodando pra sempre (ou até você matar o processo com `Ctrl+C`).

> **Nota:** loop infinito não é sempre um erro. Servidores e programas que ficam "escutando" eventos o tempo todo costumam usar `while True:` de propósito, combinado com uma condição de parada dentro do bloco (geralmente um `break`).

### O comando break

O `break` interrompe o loop imediatamente, mesmo que a condição do `while` ainda seja verdadeira.

```py
numero = 1
while numero <= 10:
    print(numero)
    if numero == 4:
        break
    numero += 1
```

A saída é:

```py
1
2
3
4
```

Assim que `numero` chega a 4, o `break` corta a execução do loop, e o Python nem chega a testar a condição `numero <= 10` de novo.

### O comando continue

Já o `continue` não interrompe o loop inteiro — ele só pula o resto do código daquela repetição específica e volta pro topo do loop, testando a condição de novo.

```py
numero = 0
while numero < 10:
    numero += 1
    if numero % 2 == 0:
        continue
    print(numero)
```

A saída é:

```py
1
3
5
7
9
```

Aqui, sempre que `numero` é par, o `continue` faz o Python pular o `print` e ir direto pra próxima repetição — por isso só os ímpares aparecem na tela.

### O else do while

Isso aqui costuma surpreender quem já programou em outras linguagens: no Python, tanto o `while` quanto o `for` podem ter um bloco `else`. Ele roda uma única vez, quando a condição do loop se torna falsa — ou seja, quando o loop termina "naturalmente".

```py
contador = 1
while contador <= 3:
    print(contador)
    contador += 1
else:
    print("O loop terminou sem interrupções")
```

A saída é:

```py
1
2
3
O loop terminou sem interrupções
```

> **Nota:** se o loop for interrompido por um `break`, o bloco `else` **não** executa. É um jeito prático de saber, depois do loop, se ele rodou até o fim ou se foi cortado no meio.

## O loop for

Enquanto o `while` repete baseado numa condição, o `for` percorre os itens de uma sequência — pode ser uma lista, uma tupla, um dicionário, um conjunto ou uma string — executando o bloco uma vez pra cada item.

```py
frutas = ["maçã", "banana", "uva"]
for fruta in frutas:
    print(fruta)
```

A saída é:

```py
maçã
banana
uva
```

Repare que não existe um "índice" explícito controlando o loop, como em `for (i = 0; i < len(frutas); i++)` de outras linguagens. O `for` do Python entrega o próprio item de cada vez.

### Percorrendo strings

Como uma string é uma sequência de caracteres, dá pra percorrê-la letra por letra do mesmo jeito.

```py
for letra in "Python":
    print(letra)
```

A saída é:

```py
P
y
t
h
o
n
```

### Break e continue no for

O `break` e o `continue` funcionam exatamente como no `while`.

```py
linguagens = ["Python", "Java", "Go", "Rust"]
for linguagem in linguagens:
    if linguagem == "Go":
        break
    print(linguagem)
```

A saída é:

```py
Python
Java
```

Trocando o `break` por `continue`, o Python só pula o item "Go" e continua percorrendo os demais:

```py
linguagens = ["Python", "Java", "Go", "Rust"]
for linguagem in linguagens:
    if linguagem == "Go":
        continue
    print(linguagem)
```

A saída é:

```py
Python
Java
Rust
```

### A função range()

Muitas vezes você quer repetir um bloco um número fixo de vezes, sem necessariamente ter uma lista pronta pra percorrer. É aí que entra o `range()`: ele gera uma sequência de números que você pode usar direto no `for`.

Chamado só com um argumento, `range(n)` gera números de `0` até `n - 1`:

```py
for i in range(5):
    print(i)
```

A saída é:

```py
0
1
2
3
4
```

Com dois argumentos, `range(inicio, fim)` começa em `inicio` e vai até `fim - 1`:

```py
for i in range(2, 6):
    print(i)
```

A saída é:

```py
2
3
4
5
```

E com três argumentos, `range(inicio, fim, passo)` permite definir o incremento entre um número e outro — inclusive incrementos negativos, pra contar regressivamente:

```py
for i in range(10, 0, -2):
    print(i)
```

A saída é:

```py
10
8
6
4
2
```

> **Nota:** o `range()` não retorna uma lista de verdade — ele retorna um objeto do tipo `range`, que gera os números sob demanda, conforme o loop pede. Se quiser ver os valores como lista, use `list(range(5))`.

### Else no for

Assim como no `while`, o `for` também aceita um `else`, que roda quando o loop termina sem ser interrompido por `break`.

```py
for i in range(5):
    print(i)
else:
    print("Terminei de percorrer o range")
```

A saída é:

```py
0
1
2
3
4
Terminei de percorrer o range
```

## Loops aninhados

Você pode colocar um loop dentro do outro — o chamado _loop aninhado_. A cada repetição do loop externo, o loop interno roda por completo.

```py
cores = ["vermelho", "verde"]
objetos = ["carro", "casa"]

for cor in cores:
    for objeto in objetos:
        print(cor, objeto)
```

A saída é:

```py
vermelho carro
vermelho casa
verde carro
verde casa
```

Isso é bem útil pra combinar todos os pares possíveis entre dois conjuntos de dados, ou pra trabalhar com estruturas bidimensionais, como percorrer linhas e colunas de uma matriz representada como lista de listas.

```py
matriz = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]

for linha in matriz:
    for numero in linha:
        print(numero, end=" ")
    print()
```

A saída é:

```py
1 2 3 
4 5 6 
7 8 9 
```

E é assim que você controla repetição em Python: `while` quando a condição de parada não depende de percorrer uma coleção, `for` quando você já tem uma sequência (ou um `range()`) pra percorrer, e `break`/`continue`/`else` pra afinar o comportamento em cada caso.

**Fonte adaptada:** [Python While Loops](https://www.w3schools.com/python/python_while_loops.asp), [Python For Loops](https://www.w3schools.com/python/python_for_loops.asp), [Python range()](https://www.w3schools.com/python/python_range.asp)
