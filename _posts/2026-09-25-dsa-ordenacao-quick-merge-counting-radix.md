---
layout: post
title: "Estruturas de Dados #11 - Algoritmos de Ordenação II: Quick, Merge, Counting e Radix Sort"
date: 2026-09-25 11:20:00
image: '/assets/img/posts/dsa-ordenacao-quick-merge-counting-radix.webp'
description: Como funcionam Quick Sort, Merge Sort, Counting Sort e Radix Sort em Python - algoritmos de ordenação mais rápidos que O(n²), com complexidades O(n log n), O(n+k) e O(n·k).
category: 'dev'
tags:
- Python
- Programação
- Ordenação
twitter_text: Ordenação II - Quick, Merge, Counting e Radix Sort
introduction: "Nesta parte da série, você vai conhecer quatro algoritmos de ordenação mais rápidos que os do post anterior - Quick Sort, Merge Sort, Counting Sort e Radix Sort."
---

No post anterior, Bubble, Selection e Insertion Sort compartilhavam a mesma complexidade O(n²) — ótimos pra aprender, mas lentos com muitos dados. Fechando a série, você vai conhecer quatro algoritmos bem mais rápidos, cada um com uma estratégia diferente pra chegar lá.

## Quick Sort

Como o nome sugere, o Quicksort é um dos algoritmos de ordenação mais rápidos que existem. A ideia central: escolher um valor da lista como **pivô**, e reorganizar os demais valores de forma que os menores fiquem à esquerda do pivô e os maiores à direita. Neste post, o pivô é sempre o último elemento de cada trecho da lista.

Depois de posicionar o pivô corretamente, o mesmo processo se repete — recursivamente — nas duas metades ao redor dele, até que a lista inteira esteja ordenada. **Recursão**, se você não lembra da série de introdução ao Python, é quando uma função chama a si mesma.

**Como funciona:**

1. Escolha um valor da lista pra ser o pivô.
2. Reorganize o restante: valores menores que o pivô à esquerda, maiores à direita.
3. Troque o pivô de posição com o primeiro valor do grupo dos maiores, deixando-o entre os dois grupos.
4. Repita os passos acima, recursivamente, nas sublistas à esquerda e à direita do pivô.

```py
def particionar(array, baixo, alto):
    pivo = array[alto]
    i = baixo - 1

    for j in range(baixo, alto):
        if array[j] <= pivo:
            i += 1
            array[i], array[j] = array[j], array[i]

    array[i + 1], array[alto] = array[alto], array[i + 1]
    return i + 1

def quicksort(array, baixo=0, alto=None):
    if alto is None:
        alto = len(array) - 1

    if baixo < alto:
        indice_pivo = particionar(array, baixo, alto)
        quicksort(array, baixo, indice_pivo - 1)
        quicksort(array, indice_pivo + 1, alto)

minha_lista = [64, 34, 25, 5, 22, 11, 90, 12]
quicksort(minha_lista)
print(minha_lista)
```

A saída é:

```py
[5, 11, 12, 22, 25, 34, 64, 90]
```

`particionar()` faz o trabalho pesado: percorre o trecho da lista movendo tudo que é menor ou igual ao pivô pra frente (usando o índice `i` como um marcador de "até aqui está tudo menor"), e no final troca o pivô pra posição logo depois desse marcador — deixando-o exatamente entre os menores e os maiores.

### Complexidade de tempo

No **pior caso**, o Quicksort é **O(n²)** — acontece quando o pivô escolhido é sempre o maior ou o menor valor do trecho (por exemplo, quando a lista já está ordenada). Mas, **em média**, sua complexidade é **O(n log n)**, bem melhor que os algoritmos do post anterior — e é por isso que o Quicksort é tão popular na prática. A razão: com boas escolhas de pivô, cada chamada recursiva divide a lista praticamente ao meio, então o número de chamadas não dobra mesmo que `n` dobre.

## Merge Sort

O Merge Sort segue a estratégia de "dividir pra conquistar" (divide and conquer): primeiro quebra a lista em pedaços cada vez menores, depois remonta esses pedaços na ordem certa.

- **Dividir:** quebra a lista recursivamente em metades, até sobrar só um elemento por pedaço.
- **Conquistar:** mescla (merge) os pedaços de volta, sempre colocando o menor valor primeiro, até reconstruir a lista inteira ordenada.

```py
def mesclar(esquerda, direita):
    resultado = []
    i = j = 0

    while i < len(esquerda) and j < len(direita):
        if esquerda[i] < direita[j]:
            resultado.append(esquerda[i])
            i += 1
        else:
            resultado.append(direita[j])
            j += 1

    resultado.extend(esquerda[i:])
    resultado.extend(direita[j:])

    return resultado

def merge_sort(array):
    if len(array) <= 1:
        return array

    meio = len(array) // 2
    metade_esquerda = array[:meio]
    metade_direita = array[meio:]

    esquerda_ordenada = merge_sort(metade_esquerda)
    direita_ordenada = merge_sort(metade_direita)

    return mesclar(esquerda_ordenada, direita_ordenada)

minha_lista = [3, 7, 6, -10, 15, 23.5, 55, -13]
lista_ordenada = merge_sort(minha_lista)
print("Lista ordenada:", lista_ordenada)
```

A saída é:

```py
Lista ordenada: [-13, -10, 3, 6, 7, 15, 23.5, 55]
```

Repare que, quando a função `mesclar()` chega no ponto de usar `resultado.extend(...)`, um dos dois lados (esquerda ou direita) já está vazio — então basta completar o resultado com o que sobrou do outro lado, em qualquer ordem entre as duas chamadas de `extend()`.

### Complexidade de tempo

A complexidade do Merge Sort é **O(n log n)** — e, diferente do Quicksort, esse tempo é praticamente o mesmo não importa como os dados estão organizados, porque a lista sempre é dividida e mesclada por comparação, esteja ela ordenada ou embaralhada.

## Counting Sort

O Counting Sort ordena contando quantas vezes cada valor aparece — sem nenhuma comparação entre elementos, o que o torna rápido quando o intervalo de valores possíveis (`k`) é menor que a quantidade de valores (`n`). A limitação: só funciona com **números inteiros não negativos**.

```py
def counting_sort(array):
    valor_max = max(array)
    contagem = [0] * (valor_max + 1)

    while len(array) > 0:
        num = array.pop(0)
        contagem[num] += 1

    for i in range(len(contagem)):
        while contagem[i] > 0:
            array.append(i)
            contagem[i] -= 1

    return array

minha_lista = [4, 2, 2, 6, 3, 3, 1, 6, 5, 2, 3]
lista_ordenada = counting_sort(minha_lista)
print(lista_ordenada)
```

A saída é:

```py
[1, 2, 2, 2, 3, 3, 3, 4, 5, 6, 6]
```

O algoritmo cria um array `contagem` com uma posição pra cada valor possível, de 0 até o maior valor da lista. Primeiro, esvazia a lista original contando cada valor no índice correspondente; depois, reconstrói a lista percorrendo `contagem` do início ao fim, recriando cada valor tantas vezes quanto ele apareceu.

> **Nota:** se o intervalo de valores possíveis `k` for muito maior que a quantidade de valores `n` a ordenar — por exemplo, poucos números, mas bem espalhados entre si — o array `contagem` fica maior que a própria lista original, e o Counting Sort deixa de valer a pena.

### Complexidade de tempo

A complexidade geral é **O(n + k)**. No melhor caso, com `k` pequeno em relação a `n`, isso se simplifica pra **O(n)**. No pior caso, com `k` muito maior que `n`, pode chegar a **O(n²)** ou pior.

## Radix Sort

O Radix Sort ordena por dígitos individuais, começando pelo menos significativo (o mais à direita). O **radix** (base) é o número de dígitos únicos de um sistema numérico — no sistema decimal, 10 (de 0 a 9). O algoritmo usa esses 10 dígitos como "baldes" (buckets), redistribuindo os valores a cada rodada conforme o dígito em foco.

**Como funciona:**

1. Comece pelo dígito menos significativo.
2. Distribua os valores nos baldes de acordo com esse dígito, depois recoloque-os de volta na lista, na ordem dos baldes.
3. Passe pro próximo dígito e repita, até não sobrar mais nenhum dígito.

```py
minha_lista = [170, 45, 75, 90, 802, 24, 2, 66]
baldes_radix = [[], [], [], [], [], [], [], [], [], []]
valor_max = max(minha_lista)
exp = 1

while valor_max // exp > 0:

    while len(minha_lista) > 0:
        val = minha_lista.pop()
        indice_radix = (val // exp) % 10
        baldes_radix[indice_radix].append(val)

    for balde in baldes_radix:
        while len(balde) > 0:
            val = balde.pop()
            minha_lista.append(val)

    exp *= 10

print(minha_lista)
```

A saída é:

```py
[2, 24, 45, 66, 75, 90, 170, 802]
```

`exp` controla qual dígito está em foco a cada rodada do loop externo: primeiro as unidades (`exp = 1`), depois as dezenas (`exp = 10`), e assim por diante — `(val // exp) % 10` isola exatamente esse dígito. É essencial que a distribuição nos baldes seja **estável** (elementos com o mesmo dígito mantêm sua ordem relativa entre si), senão o trabalho de ordenação feito nos dígitos anteriores se perde.

### Complexidade de tempo

A complexidade é **O(n · k)**, onde `k` é o número de dígitos do maior valor. Com muitos valores mas poucos dígitos (`k` pequeno), isso se aproxima de **O(n)**; no cenário raro de `k` ser tão grande quanto `n`, chega a **O(n²)**.

## Fechando a série

Com busca linear e binária, e seis algoritmos de ordenação diferentes — cada um com seu próprio equilíbrio entre simplicidade, velocidade e tipo de dado que aceita — você agora tem o vocabulário e a intuição pra escolher a estrutura e o algoritmo certos quando o Python pronto não resolver sozinho. Da próxima vez que `list.sort()` parecer lento demais, ou que precisar de uma pilha, uma fila ou uma árvore, você vai saber exatamente o que está acontecendo por baixo dos panos.

**Fonte adaptada:** [Quick Sort with Python](https://www.w3schools.com/python/python_dsa_quicksort.asp), [Merge Sort with Python](https://www.w3schools.com/python/python_dsa_mergesort.asp), [Counting Sort with Python](https://www.w3schools.com/python/python_dsa_countingsort.asp), [Radix Sort with Python](https://www.w3schools.com/python/python_dsa_radixsort.asp)
