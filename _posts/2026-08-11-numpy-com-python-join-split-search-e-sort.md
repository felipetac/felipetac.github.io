---
layout: post
title: "#3 - Join, Split, Search e Sort no NumPy"
date: 2026-08-11 13:40:00
image: '/assets/img/posts/numpy-com-python-join-split-search-e-sort.png'
description: Como juntar arrays com concatenate e stack, dividi-los com array_split, buscar valores com where e searchsorted e ordenar com sort no NumPy.
category: 'ciência de dados'
tags:
- Ciência de Dados
- Python
- Programação
- Numpy
twitter_text: Join, Split, Search e Sort no NumPy
introduction: "Nesta parte do tutorial, você aprende a juntar, dividir, buscar, ordenar e filtrar arrays com o NumPy."
---

Depois de ver criação, indexação, shape e iteração nos dois posts anteriores, chegou a hora de trabalhar com **múltiplos** arrays e com operações de organização: juntar, dividir, buscar valores dentro de um array e ordenar. São operações que aparecem o tempo todo em qualquer análise de dados um pouco mais realista.

## Juntando arrays

Juntar (_join_) arrays no NumPy é combinar o conteúdo de dois ou mais arrays em um único array. Diferente de listas do Python, não existe um `+` simples pra isso — você usa funções específicas.

### np.concatenate()

`np.concatenate()` junta arrays ao longo de um eixo (por padrão, o eixo 0).

```py
import numpy as np

a = np.array([1, 2, 3])
b = np.array([4, 5, 6])

resultado = np.concatenate((a, b))
print(resultado)
```

A saída é:

```py
[1 2 3 4 5 6]
```

Com arrays 2-D, o parâmetro `axis` controla a direção: `axis=0` empilha por linha (padrão), `axis=1` junta por coluna.

```py
a = np.array([[1, 2], [3, 4]])
b = np.array([[5, 6], [7, 8]])

print(np.concatenate((a, b), axis=0))
print(np.concatenate((a, b), axis=1))
```

A saída é:

```py
[[1 2]
 [3 4]
 [5 6]
 [7 8]]
[[1 2 5 6]
 [3 4 7 8]]
```

### np.stack()

`np.stack()` é parecido com `concatenate()`, mas em vez de juntar ao longo de um eixo existente, ele cria um **eixo novo**.

```py
a = np.array([1, 2, 3])
b = np.array([4, 5, 6])

resultado = np.stack((a, b), axis=1)
print(resultado)
```

A saída é:

```py
[[1 4]
 [2 5]
 [3 6]]
```

### np.hstack() e np.vstack()

Pra deixar código mais legível em casos comuns, o NumPy tem atalhos: `hstack()` empilha na horizontal (lado a lado), `vstack()` empilha na vertical (um em cima do outro).

```py
a = np.array([1, 2, 3])
b = np.array([4, 5, 6])

print(np.hstack((a, b)))
print(np.vstack((a, b)))
```

A saída é:

```py
[1 2 3 4 5 6]
[[1 2 3]
 [4 5 6]]
```

> **Nota:** existe também o `np.dstack()`, que empilha ao longo de um terceiro eixo (profundidade) — útil quando você quer combinar arrays 1-D em uma estrutura 3-D, por exemplo pra representar canais de cor de uma imagem.

## Dividindo arrays

Dividir (_split_) é o processo inverso de juntar: você pega um array e o quebra em pedaços menores.

### np.array_split()

```py
arr = np.array([1, 2, 3, 4, 5, 6])
partes = np.array_split(arr, 3)
print(partes)
```

A saída é:

```py
[array([1, 2]), array([3, 4]), array([5, 6])]
```

O retorno é uma lista de arrays — cada item acessível normalmente por índice: `partes[0]`, `partes[1]` etc.

### Quando a divisão não é exata

A vantagem do `array_split()` sobre o `np.split()` "puro" é que ele lida bem quando o array não divide igualzinho pelo número de partes pedido — ele ajusta o tamanho dos últimos pedaços em vez de dar erro.

```py
arr = np.array([1, 2, 3, 4, 5, 6, 7])
partes = np.array_split(arr, 3)
print(partes)
```

A saída é:

```py
[array([1, 2, 3]), array([4, 5]), array([6, 7])]
```

### Dividindo arrays 2-D

O mesmo `array_split()` funciona em arrays 2-D. Por padrão ele divide por linha (`axis=0`); com `axis=1`, divide por coluna.

```py
arr = np.array([[1, 2], [3, 4], [5, 6], [7, 8], [9, 10], [11, 12]])

print(np.array_split(arr, 3))
print(np.array_split(arr, 2, axis=1))
```

A saída é:

```py
[array([[1, 2],
       [3, 4]]), array([[5, 6],
       [7, 8]]), array([[ 9, 10],
       [11, 12]])]
[array([[ 1],
       [ 3],
       [ 5],
       [ 7],
       [ 9],
       [11]]), array([[ 2],
       [ 4],
       [ 6],
       [ 8],
       [10],
       [12]])]
```

> **Nota:** pra casos específicos com arrays 2-D e 3-D, existem também `np.hsplit()` e `np.vsplit()`, atalhos equivalentes ao `hstack()`/`vstack()` só que na direção inversa.

## Buscando valores em um array

### np.where()

`np.where()` retorna os índices onde uma condição é verdadeira.

```py
arr = np.array([1, 2, 3, 4, 5, 4, 4])
indices = np.where(arr == 4)
print(indices)
```

A saída é:

```py
(array([3, 5, 6]),)
```

O retorno vem dentro de uma tupla (um array de índices por dimensão) — pra um array 1-D, você normalmente acessa `indices[0]` pra pegar só o array de posições.

Funciona também com qualquer condição, não só igualdade:

```py
arr = np.array([1, 2, 3, 4, 5, 6, 7, 8])
pares = np.where(arr % 2 == 0)
print(pares)
```

A saída é:

```py
(array([1, 3, 5, 7]),)
```

### np.searchsorted()

`np.searchsorted()` faz uma busca binária: dado um array **já ordenado**, ele te diz em qual índice um valor precisaria ser inserido pra manter a ordem.

```py
arr = np.array([6, 7, 8, 9])
posicao = np.searchsorted(arr, 7)
print(posicao)
```

A saída é:

```py
1
```

Por padrão, `searchsorted()` retorna a posição mais à esquerda possível. Com `side='right'`, ele retorna a posição mais à direita:

```py
arr = np.array([6, 7, 8, 9])
print(np.searchsorted(arr, 7, side='right'))
```

A saída é:

```py
2
```

Também dá pra buscar vários valores de uma vez, passando uma lista:

```py
arr = np.array([1, 3, 5, 7])
posicoes = np.searchsorted(arr, [2, 4, 6])
print(posicoes)
```

A saída é:

```py
[1 2 3]
```

> **Nota:** `searchsorted()` **assume** que o array já está ordenado. Se você passar um array fora de ordem, o resultado não faz sentido nenhum — o NumPy não valida isso pra você.

## Ordenando arrays

### np.sort()

`np.sort()` retorna uma **cópia** ordenada do array, sem alterar o original.

```py
arr = np.array([5, 2, 8, 1, 9])
print(np.sort(arr))
print(arr)
```

A saída é:

```py
[1 2 5 8 9]
[5 2 8 1 9]
```

### Ordenando strings e booleanos

`sort()` funciona em arrays de qualquer tipo comparável, não só números — inclusive ordena strings em ordem alfabética e booleanos com `False` antes de `True`.

```py
frutas = np.array(['banana', 'abacaxi', 'uva'])
print(np.sort(frutas))

flags = np.array([True, False, True])
print(np.sort(flags))
```

A saída é:

```py
['abacaxi' 'banana' 'uva']
[False  True  True]
```

### Ordenando arrays 2-D

Aplicado em um array 2-D, `sort()` ordena cada linha de forma independente:

```py
arr = np.array([[3, 2, 4], [5, 0, 1]])
print(np.sort(arr))
```

A saída é:

```py
[[2 3 4]
 [0 1 5]]
```

## Filtrando arrays

Filtrar é extrair de um array só os elementos que satisfazem alguma condição, usando o que o NumPy chama de máscara booleana: um array de `True`/`False` do mesmo tamanho, onde `True` mantém o elemento e `False` descarta.

### Filtro manual

```py
arr = np.array([41, 42, 43, 44])
mascara = [True, False, True, False]

print(arr[mascara])
```

A saída é:

```py
[41 43]
```

### Criando o filtro a partir de uma condição

Na prática, quase ninguém escreve a máscara na mão — o normal é gerar ela a partir de uma condição direto sobre o array:

```py
arr = np.array([1, 2, 3, 4, 5, 6, 7, 8])

filtro = arr > 4
print(filtro)
print(arr[filtro])
```

A saída é:

```py
[False False False False  True  True  True  True]
[5 6 7 8]
```

Ou, ainda mais direto, sem nem guardar a máscara em uma variável:

```py
arr = np.array([1, 2, 3, 4, 5, 6, 7, 8])
pares = arr[arr % 2 == 0]
print(pares)
```

A saída é:

```py
[2 4 6 8]
```

Essa forma — condição booleana direto dentro dos colchetes — é provavelmente uma das construções que você mais vai usar trabalhando com NumPy no dia a dia, então vale deixar bem internalizada.

Juntar, dividir, buscar, ordenar e filtrar são operações que combinam entre si o tempo todo em código real — por exemplo, filtrar um array e depois ordenar o resultado. No próximo (e último) post da série, a gente fecha com números aleatórios e as chamadas _ufuncs_.

**Fonte adaptada:** [NumPy Joining Array](https://www.w3schools.com/python/numpy/numpy_array_join.asp), [NumPy Splitting Array](https://www.w3schools.com/python/numpy/numpy_array_split.asp), [NumPy Searching Arrays](https://www.w3schools.com/python/numpy/numpy_array_search.asp), [NumPy Sorting Arrays](https://www.w3schools.com/python/numpy/numpy_array_sort.asp), [NumPy Filter Array](https://www.w3schools.com/python/numpy/numpy_array_filter.asp)
