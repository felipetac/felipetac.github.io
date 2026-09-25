---
layout: post
title: "Estruturas de Dados #10 - Algoritmos de Ordenação I: Bubble, Selection e Insertion Sort"
date: 2026-09-25 11:00:00
image: '/assets/img/posts/dsa-ordenacao-bubble-selection-insertion.webp'
description: Como funcionam os algoritmos de ordenação Bubble Sort, Selection Sort e Insertion Sort em Python, incluindo o problema do deslocamento de memória e como cada um pode ser otimizado.
category: 'dev'
tags:
- Python
- Programação
- Ordenação
twitter_text: "Estruturas de Dados #10 - Algoritmos de Ordenação I: Bubble, Selection e Insertion Sort"
introduction: "Nesta parte da série, você vai aprender três algoritmos clássicos de ordenação - Bubble Sort, Selection Sort e Insertion Sort - e como otimizar cada um."
---

Depois da busca, o outro grande problema clássico de DSA é a ordenação: colocar os valores de uma lista em ordem crescente. Existem vários algoritmos pra fazer isso, cada um com suas vantagens — vamos começar pelos três mais didáticos, todos com complexidade O(n²).

## Bubble Sort

O Bubble Sort percorre a lista comparando pares de valores vizinhos, trocando-os de posição quando estão fora de ordem — o nome vem do fato de que os valores maiores vão "borbulhando" até o final da lista a cada passada.

**Como funciona:**

1. Percorra a lista, valor por valor.
2. Compare cada valor com o próximo.
3. Se o valor for maior que o próximo, troque os dois de posição.
4. Repita o processo tantas vezes quanto forem os valores da lista.

Um exemplo manual com `[7, 12, 9, 11, 3]`: compara-se 7 e 12 (sem troca, 7 é menor); compara-se 12 e 9 (troca: `[7, 9, 12, 11, 3]`); compara-se 12 e 11 (troca: `[7, 9, 11, 12, 3]`); compara-se 12 e 3 (troca: `[7, 9, 11, 3, 12]`). Repare que o 12 foi "borbulhando" até quase o final numa única passada — o processo se repete até que nenhuma troca seja mais necessária.

```py
minha_lista = [64, 34, 25, 12, 22, 11, 90, 5]

n = len(minha_lista)
for i in range(n - 1):
    for j in range(n - i - 1):
        if minha_lista[j] > minha_lista[j + 1]:
            minha_lista[j], minha_lista[j + 1] = minha_lista[j + 1], minha_lista[j]

print(minha_lista)
```

A saída é:

```py
[5, 11, 12, 22, 25, 34, 64, 90]
```

### Melhorando o Bubble Sort

Se a lista já estiver quase ordenada, o algoritmo acima continua rodando o número máximo de passadas mesmo sem precisar de mais trocas. A melhoria é simples: se uma passada inteira não fizer nenhuma troca, a lista já está ordenada, e dá pra parar (`break`) antes da hora.

```py
minha_lista = [7, 3, 9, 12, 11]

n = len(minha_lista)
for i in range(n - 1):
    trocou = False
    for j in range(n - i - 1):
        if minha_lista[j] > minha_lista[j + 1]:
            minha_lista[j], minha_lista[j + 1] = minha_lista[j + 1], minha_lista[j]
            trocou = True
    if not trocou:
        break

print(minha_lista)
```

A saída é:

```py
[3, 7, 9, 11, 12]
```

### Complexidade de tempo

O Bubble Sort compara cada valor com o vizinho num loop que roda `n` vezes, e repete esse loop mais `n` vezes — resultando em `n · n` comparações no total. A complexidade de tempo é **O(n²)**.

## Selection Sort

O Selection Sort encontra o menor valor da lista e o move pro início. Repete essa busca, movendo o próximo menor valor pra frente, até a lista inteira estar ordenada.

**Como funciona:**

1. Percorra a lista pra encontrar o menor valor.
2. Mova esse valor pro início da parte ainda não ordenada.
3. Repita, tantas vezes quantos forem os valores da lista.

```py
minha_lista = [64, 34, 25, 5, 22, 11, 90, 12]

n = len(minha_lista)
for i in range(n - 1):
    indice_menor = i
    for j in range(i + 1, n):
        if minha_lista[j] < minha_lista[indice_menor]:
            indice_menor = j
    valor_menor = minha_lista.pop(indice_menor)
    minha_lista.insert(i, valor_menor)

print(minha_lista)
```

A saída é:

```py
[5, 11, 12, 22, 25, 34, 64, 90]
```

### O problema do deslocamento

O código acima usa `pop()` pra remover o menor valor e `insert()` pra recolocá-lo no início — mas cada uma dessas operações desloca todos os elementos seguintes uma posição na memória. Você não vê esse deslocamento diretamente no código, porque o Python cuida disso pra você por baixo dos panos, mas ele acontece — e consome tempo extra, especialmente em listas grandes.

A solução é trocar (swap) o menor valor direto com o primeiro, em vez de removê-lo e reinseri-lo: isso funciona porque o menor valor termina na posição certa de qualquer forma, e não importa pra onde vai o valor que estava lá antes, já que ele ainda não está ordenado.

```py
minha_lista = [64, 34, 25, 12, 22, 11, 90, 5]

n = len(minha_lista)
for i in range(n):
    indice_menor = i
    for j in range(i + 1, n):
        if minha_lista[j] < minha_lista[indice_menor]:
            indice_menor = j
    minha_lista[i], minha_lista[indice_menor] = minha_lista[indice_menor], minha_lista[i]

print(minha_lista)
```

A saída é a mesma lista ordenada, `[5, 11, 12, 22, 25, 34, 64, 90]`, mas sem o custo escondido do deslocamento.

### Complexidade de tempo

Em média, cerca de `n/2` elementos são comparados pra achar o menor valor em cada passada, e o loop externo roda aproximadamente `n` vezes — resultando em `O(n/2 · n)`, que também é **O(n²)**: o mesmo tempo de execução do Bubble Sort.

## Insertion Sort

O Insertion Sort mantém uma parte da lista já ordenada, e vai pegando um valor de cada vez da parte não ordenada, inserindo-o na posição correta dentro da parte já ordenada. É parecido com organizar cartas de baralho na mão: você pega uma carta nova e a encaixa no lugar certo entre as que já estão ordenadas.

**Como funciona:**

1. Pegue o primeiro valor da parte não ordenada.
2. Mova esse valor pra posição correta dentro da parte já ordenada.
3. Repita, percorrendo a parte não ordenada até o final.

```py
minha_lista = [64, 34, 25, 12, 22, 11, 90, 5]

n = len(minha_lista)
for i in range(1, n):
    indice_insercao = i
    valor_atual = minha_lista.pop(i)
    for j in range(i - 1, -1, -1):
        if minha_lista[j] > valor_atual:
            indice_insercao = j
    minha_lista.insert(indice_insercao, valor_atual)

print(minha_lista)
```

A saída é:

```py
[5, 11, 12, 22, 25, 34, 64, 90]
```

### Reduzindo o deslocamento

Esse código sofre do mesmo problema do Selection Sort: `pop()` e `insert()` deslocam elementos na memória a cada iteração. Dá pra reduzir bastante esse custo deslocando só o necessário — em vez de remover e reinserir o valor atual, os elementos maiores vão sendo empurrados uma posição pra frente até sobrar o espaço certo pro valor atual, e um `break` evita comparações desnecessárias assim que a posição certa é encontrada.

```py
minha_lista = [64, 34, 25, 12, 22, 11, 90, 5]

n = len(minha_lista)
for i in range(1, n):
    indice_insercao = i
    valor_atual = minha_lista[i]
    for j in range(i - 1, -1, -1):
        if minha_lista[j] > valor_atual:
            minha_lista[j + 1] = minha_lista[j]
            indice_insercao = j
        else:
            break
    minha_lista[indice_insercao] = valor_atual

print(minha_lista)
```

A saída é a mesma lista ordenada de sempre, `[5, 11, 12, 22, 25, 34, 64, 90]`.

### Complexidade de tempo

Em média, cada valor é comparado com cerca de `n/2` outros valores pra achar sua posição certa, e o processo se repete aproximadamente `n` vezes — resultando, de novo, em **O(n²)**.

> **Nota:** diferente do Bubble e do Selection Sort, o Insertion Sort tem uma diferença grande entre melhor, médio e pior caso: numa lista quase ordenada, ele é bem mais rápido que O(n²) na prática, porque o loop interno para cedo (graças ao `break`) na maioria das iterações.

Os três algoritmos deste post são ótimos pra aprender os fundamentos de ordenação, mas todos compartilham a mesma complexidade O(n²) — o que fica lento rápido conforme os dados crescem. No próximo (e último) post da série, você vai conhecer algoritmos de ordenação mais rápidos, capazes de resolver o mesmo problema em O(n log n).

**Fonte adaptada:** [Bubble Sort with Python](https://www.w3schools.com/python/python_dsa_bubblesort.asp), [Selection Sort with Python](https://www.w3schools.com/python/python_dsa_selectionsort.asp), [Insertion Sort with Python](https://www.w3schools.com/python/python_dsa_insertionsort.asp)
