---
layout: post
title: "Estruturas de Dados | #9 - Algoritmos de Busca: Linear e Binária"
date: 2026-09-25 10:40:00
image: '/assets/img/posts/dsa-algoritmos-de-busca.webp'
description: A diferença entre busca linear e busca binária em Python - como implementar cada uma, e por que a busca binária exige uma lista ordenada pra ser tão mais rápida.
category: 'dev'
tags:
- Python
- Programação
- Busca
twitter_text: Algoritmos de Busca - Linear e Binária
introduction: "Nesta parte da série, você vai aprender dois algoritmos de busca - linear e binária - e entender por que a binária é tão mais rápida quando a lista está ordenada."
---

Com as estruturas de dados cobertas, a série entra na segunda parte: algoritmos. Vamos começar pelo problema mais básico de todos — encontrar um valor dentro de uma coleção de dados — com dois algoritmos de busca bem diferentes entre si.

## Busca linear

A busca linear (ou busca sequencial) é o algoritmo de busca mais simples que existe: ela checa cada elemento, um por um, até achar o que procura.

**Como funciona:**

1. Percorra a lista, valor por valor, do começo.
2. Compare cada valor com o valor procurado.
3. Se achar, retorne o índice daquele valor.
4. Se chegar ao final da lista sem achar, retorne -1 indicando que o valor não existe na lista.

A forma mais rápida de checar se um valor existe numa lista Python é usar o operador `in`:

```py
minha_lista = [3, 7, 2, 9, 5, 1, 8, 4, 6]

if 4 in minha_lista:
    print("Encontrado!")
else:
    print("Não encontrado!")
```

A saída é:

```py
Encontrado!
```

Mas se você precisa saber o **índice** onde o valor está, é preciso implementar a busca de fato:

```py
def busca_linear(lista, alvo):
    for i in range(len(lista)):
        if lista[i] == alvo:
            return i
    return -1

minha_lista = [3, 7, 2, 9, 5, 1, 8, 4, 6]
x = 4

resultado = busca_linear(minha_lista, x)

if resultado != -1:
    print("Encontrado no índice", resultado)
else:
    print("Não encontrado")
```

A saída é:

```py
Encontrado no índice 7
```

### Complexidade de tempo

Se o valor procurado estiver logo no primeiro elemento, basta uma comparação. Mas, no pior caso — o valor não está na lista, ou está no final dela — são necessárias `n` comparações, pra uma lista de `n` valores. A complexidade de tempo da busca linear é, portanto, **O(n)**.

## Busca binária

A busca binária é bem mais rápida que a linear, mas com uma exigência importante: a lista precisa estar **ordenada**.

**Como funciona:**

1. Verifique o valor no meio da lista.
2. Se o valor procurado for menor, continue buscando na metade esquerda; se for maior, na metade direita.
3. Repita os passos 1 e 2 na nova metade reduzida, até achar o valor ou a área de busca ficar vazia.
4. Se achar, retorne o índice; senão, retorne -1.

Como a área de busca é sempre cortada pela metade, o algoritmo converge rápido. Um exemplo manual: procurando o valor 11 na lista ordenada `[2, 3, 7, 7, 11, 15, 25]`.

- O valor do meio (índice 3) é 7 — não é 11.
- 7 é menor que 11, então a busca continua na metade direita: `[11, 15, 25]`. O novo valor do meio (índice 5) é 15.
- 15 é maior que 11, então a busca volta pra esquerda — sobra só o índice 4, que vale 11. Encontrado.

### Implementando em Python

```py
def busca_binaria(lista, alvo):
    esquerda = 0
    direita = len(lista) - 1

    while esquerda <= direita:
        meio = (esquerda + direita) // 2

        if lista[meio] == alvo:
            return meio

        if lista[meio] < alvo:
            esquerda = meio + 1
        else:
            direita = meio - 1

    return -1

minha_lista = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19]
x = 11

resultado = busca_binaria(minha_lista, x)

if resultado != -1:
    print("Encontrado no índice", resultado)
else:
    print("Não encontrado")
```

A saída é:

```py
Encontrado no índice 5
```

### Complexidade de tempo

Cada comparação corta a área de busca pela metade — então, mesmo no pior caso (valor não encontrado), a busca binária precisa de no máximo log₂n comparações pra percorrer uma lista ordenada de `n` valores. A complexidade de tempo é **O(log₂n)**.

> **Nota:** normalmente dá pra escrever só `O(log n)` em notação Big O, mas manter o `O(log₂n)` com a base explícita ajuda a lembrar de onde vem essa complexidade: a cada comparação, a área de busca é cortada pela metade — a base 2 não é um detalhe qualquer, é o próprio mecanismo do algoritmo.

A troca é clara: busca binária é muito mais rápida que busca linear, mas só funciona em dados ordenados — e ordenar dados também tem seu custo, que é justamente o assunto dos dois próximos (e últimos) posts da série.

**Fonte adaptada:** [Linear Search with Python](https://www.w3schools.com/python/python_dsa_linearsearch.asp), [Binary Search with Python](https://www.w3schools.com/python/python_dsa_binarysearch.asp)
