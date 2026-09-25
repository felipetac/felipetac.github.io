---
layout: post
title: "Estruturas de Dados #2 - Arrays e Listas"
date: 2026-09-25 08:20:00
image: '/assets/img/posts/dsa-arrays-e-listas.webp'
description: Como a lista nativa do Python funciona como um array dinâmico, os métodos prontos que ela já traz, e como criar seu próprio algoritmo em cima dela.
category: 'dev'
tags:
- Python
- Programação
- Arrays
twitter_text: Arrays e Listas em Python
introduction: "Nesta parte da série, você vai ver como a lista do Python funciona como um array dinâmico, os métodos prontos que ela já traz, e como criar seu próprio algoritmo em cima dela."
---

No post anterior, você viu o que é DSA e como medir a eficiência de um algoritmo com complexidade de tempo. Agora é hora de começar pela estrutura de dados mais básica e mais usada de todas: a lista.

## Listas como array dinâmico

Em Python, listas são a estrutura de dados embutida que funciona como um _array dinâmico_ — ordenada, mutável, e capaz de guardar elementos de tipos diferentes ao mesmo tempo.

```py
# Lista vazia
x = []

# Lista com valores iniciais
y = [1, 2, 3, 4, 5]

# Lista com tipos misturados
z = [1, "olá", 3.14, True]
```

## Métodos de lista

Além de criar e acessar listas, o Python já vem com vários métodos prontos (que nada mais são do que algoritmos já implementados pra você) pra tarefas comuns, como adicionar um item ou ordenar a lista inteira.

```py
x = [9, 12, 7, 4, 11]

# Adiciona um elemento
x.append(8)

# Ordena a lista, do menor pro maior
x.sort()

print(x)
```

A saída é:

```py
[4, 7, 8, 9, 11, 12]
```

## Criando seu próprio algoritmo

Às vezes você precisa de uma operação que o Python não oferece pronta — é nesse momento que entra a criação do seu próprio algoritmo. No post anterior, você já viu um exemplo clássico: encontrar o menor valor de uma lista, comparando elemento por elemento. Vamos ver outro, igualmente comum: somar todos os valores.

```py
minha_lista = [7, 12, 9, 4, 11, 8]
soma = 0

for valor in minha_lista:
    soma += valor

print("Soma total:", soma)
```

A saída é:

```py
Soma total: 51
```

Esse algoritmo é simples e roda rápido o bastante pra listas pequenas — mas, assim como o de encontrar o menor valor, qualquer algoritmo vai levar mais tempo conforme os dados crescem. É por isso que otimização é uma parte tão importante do desenvolvimento de algoritmos, e da programação DSA de forma geral.

## Complexidade de tempo

Assim como o algoritmo de encontrar o menor valor visto no post anterior, o algoritmo de soma acima precisa visitar cada elemento da lista uma única vez — o loop roda `n` vezes pra uma lista de `n` valores. A complexidade de tempo, portanto, é **O(n)**: linear, proporcional ao tamanho da lista.

Já um método como `x.sort()`, embora pareça uma linha só de código, não é `O(n)` — ordenar uma lista exige comparar valores entre si repetidamente, e ao longo desta série você vai entender exatamente por que isso custa mais caro (e como diferentes algoritmos de ordenação lidam com esse custo de formas diferentes).

Com listas cobertas, o próximo passo é conhecer duas estruturas que se comportam de um jeito bem específico — sempre adicionando e removendo elementos por uma ponta só: pilhas e filas.

**Fonte adaptada:** [Python Lists and Arrays](https://www.w3schools.com/python/python_dsa_lists.asp)
