---
layout: post
title: "#2 - Copy vs View, Shape e Iterando Arrays no NumPy"
date: 2026-08-11 13:20:00
image: '/assets/img/posts/numpy-com-python-copy-view-shape-e-iterando.png'
description: A diferença entre copy e view no NumPy, como consultar e mudar o shape de um array com reshape, e as formas de iterar sobre arrays de qualquer dimensão.
category: 'ciência de dados'
tags:
- Ciência de Dados
- Python
- Programação
- Numpy
twitter_text: Copy vs View, Shape e Iterando Arrays no NumPy
introduction: "Nesta parte do tutorial, você aprende a diferença entre copy e view, como consultar e mudar o shape de um array, e como iterar sobre arrays."
---

No [post anterior](/numpy-com-python-criando-e-indexando-arrays/) você viu como criar arrays e acessar elementos com indexação e slicing. Agora entra um detalhe que costuma pegar muita gente de surpresa: quando você faz uma "cópia" de um array no NumPy, ela é realmente uma cópia independente, ou só uma referência pro mesmo dado? A resposta muda o comportamento do seu código, então vale entender bem antes de seguir. Depois disso, você vai ver como consultar e mudar o formato (_shape_) de um array, e as diferentes formas de percorrer seus elementos.

## Copy vs View

Existem duas formas de "duplicar" um array no NumPy, e elas se comportam de um jeito bem diferente.

### O método copy()

`.copy()` cria um array totalmente novo, com seus próprios dados na memória. Mudar o original depois não afeta a cópia, e vice-versa.

```py
import numpy as np

arr = np.array([1, 2, 3, 4, 5])
copia = arr.copy()
arr[0] = 42

print('original:', arr)
print('cópia:', copia)
```

A saída é:

```py
original: [42  2  3  4  5]
cópia: [1 2 3 4 5]
```

Repare que mudar `arr` depois de tirar a cópia não afetou `copia` em nada — ela já é independente.

### O método view()

`.view()` cria um novo objeto array, mas ele **não** tem dados próprios: é só uma janela pros mesmos dados do array original. Mudar um afeta o outro, nos dois sentidos.

```py
arr = np.array([1, 2, 3, 4, 5])
visao = arr.view()
arr[0] = 42

print('original:', arr)
print('view:', visao)

visao[1] = 99
print('original depois de mudar a view:', arr)
```

A saída é:

```py
original: [42  2  3  4  5]
view: [42  2  3  4  5]
original depois de mudar a view: [42 99  3  4  5]
```

### Descobrindo quem é dono dos dados com base

Toda instância de array tem um atributo `base`. Se o array for dono dos próprios dados, `base` retorna `None`. Se for um _view_, `base` retorna o objeto original.

```py
arr = np.array([1, 2, 3, 4, 5])
copia = arr.copy()
visao = arr.view()

print(copia.base)
print(visao.base)
```

A saída é:

```py
None
[1 2 3 4 5]
```

É um jeito rápido de checar, em código, se um array que você recebeu de algum lugar é independente ou está "grudado" em outro.

> **Nota:** slicing também retorna uma _view_, não uma cópia! Se você fizer `pedaco = arr[1:3]` e mudar `pedaco`, o `arr` original muda junto. Se precisar de um pedaço independente, use `.copy()` explicitamente.

## Shape de um array

O atributo `.shape` retorna uma tupla com o número de elementos em cada dimensão do array.

### Consultando o shape

```py
arr = np.array([[1, 2, 3, 4], [5, 6, 7, 8]])
print(arr.shape)
```

A saída é:

```py
(2, 4)
```

Isso significa: 2 linhas, 4 colunas. O primeiro valor da tupla é a dimensão mais "externa", e por aí vai.

### Shape em arrays de mais dimensões

```py
arr = np.array([1, 2, 3, 4], ndmin=5)
print(arr)
print('shape:', arr.shape)
```

A saída é:

```py
[[[[[1 2 3 4]]]]]
shape: (1, 1, 1, 1, 4)
```

Cada posição da tupla corresponde a uma dimensão: as 4 primeiras dimensões têm só 1 elemento (foram criadas artificialmente pelo `ndmin`), e a última tem os 4 valores reais.

## Reshape: mudando o formato de um array

_Reshape_ é pegar os elementos de um array e reorganizá-los em outro formato, sem alterar os dados em si — só a "moldura" onde eles ficam.

### Exemplo 1 — de 1-D pra 2-D

```py
arr = np.arange(1, 13)
print(arr)

novo = arr.reshape(4, 3)
print(novo)
```

A saída é:

```py
[ 1  2  3  4  5  6  7  8  9 10 11 12]
[[ 1  2  3]
 [ 4  5  6]
 [ 7  8  9]
 [10 11 12]]
```

(Usei `np.arange(1, 13)` só pra gerar rápido os números de 1 a 12 — é o `range()` do Python, só que retornando um _ndarray_.)

### Exemplo 2 — de 1-D pra 3-D

```py
arr = np.arange(1, 13)
novo = arr.reshape(2, 3, 2)
print(novo)
```

A saída é:

```py
[[[ 1  2]
  [ 3  4]
  [ 5  6]]

 [[ 7  8]
  [ 9 10]
  [11 12]]]
```

> **Nota:** o número total de elementos precisa bater. Um array com 12 elementos pode virar `(4, 3)`, `(2, 6)`, `(2, 3, 2)` etc, mas nunca `(3, 5)` — 15 é diferente de 12, e o NumPy levanta `ValueError` se você tentar.

### Dimensão desconhecida com -1

Se você não quer calcular uma das dimensões na mão, passa `-1` nela e deixa o NumPy resolver sozinho:

```py
arr = np.arange(1, 13)
novo = arr.reshape(3, -1)
print(novo)
print('shape:', novo.shape)
```

A saída é:

```py
[[ 1  2  3  4]
 [ 5  6  7  8]
 [ 9 10 11 12]]
shape: (3, 4)
```

Como pedi 3 linhas e o array tem 12 elementos, o NumPy calculou sozinho que a outra dimensão precisa ser 4.

> **Nota:** você só pode usar `-1` em **uma** dimensão por vez — o NumPy não tem como adivinhar duas incógnitas ao mesmo tempo.

### Achatando um array com reshape(-1)

Pra transformar qualquer array multidimensional em um array 1-D (o processo chamado de _flatten_), basta usar `reshape(-1)`:

```py
arr = np.array([[1, 2, 3], [4, 5, 6]])
achatado = arr.reshape(-1)
print(achatado)
```

A saída é:

```py
[1 2 3 4 5 6]
```

> **Nota:** assim como o slicing, `reshape()` geralmente retorna uma _view_ dos dados originais quando possível — outro motivo pra ter o conceito de copy vs view fresco na cabeça.

## Iterando arrays

### Iterando um array 1-D

Um array 1-D se comporta como qualquer sequência do Python em um `for`:

```py
arr = np.array([1, 2, 3])
for elemento in arr:
    print(elemento)
```

A saída é:

```py
1
2
3
```

### Iterando um array 2-D

Um `for` simples em um array 2-D itera pelas **linhas**, não pelos elementos individuais:

```py
arr = np.array([[1, 2, 3], [4, 5, 6]])
for linha in arr:
    print(linha)
```

A saída é:

```py
[1 2 3]
[4 5 6]
```

Pra chegar nos elementos individuais, você precisa de um `for` aninhado:

```py
arr = np.array([[1, 2, 3], [4, 5, 6]])
for linha in arr:
    for elemento in linha:
        print(elemento)
```

A saída é:

```py
1
2
3
4
5
6
```

### Iterando um array 3-D

A lógica se repete: cada nível de `for` a mais remove uma dimensão, até sobrarem só os escalares.

```py
arr = np.array([[[1, 2], [3, 4]], [[5, 6], [7, 8]]])
for bloco in arr:
    for linha in bloco:
        for elemento in linha:
            print(elemento)
```

A saída é:

```py
1
2
3
4
5
6
7
8
```

### Iterando com np.nditer()

Empilhar `for`s aninhados fica chato rápido conforme a dimensão cresce. A função `np.nditer()` resolve isso pra qualquer número de dimensões, sem você precisar escrever um loop por nível:

```py
arr = np.array([[[1, 2], [3, 4]], [[5, 6], [7, 8]]])
for elemento in np.nditer(arr):
    print(elemento)
```

A saída é:

```py
1
2
3
4
5
6
7
8
```

Um recurso legal do `nditer()` é poder pular elementos usando slicing dentro dele — por exemplo, pra iterar só os elementos de índice par de cada linha:

```py
arr = np.array([[1, 2, 3, 4], [5, 6, 7, 8]])
for elemento in np.nditer(arr[:, ::2]):
    print(elemento)
```

A saída é:

```py
1
3
5
7
```

### Iterando com índices usando np.ndenumerate()

Se além do valor você também precisa saber a posição de cada elemento, `np.ndenumerate()` retorna pares (índice, valor):

```py
arr = np.array([[1, 2, 3], [4, 5, 6]])
for indice, elemento in np.ndenumerate(arr):
    print(indice, elemento)
```

A saída é:

```py
(0, 0) 1
(0, 1) 2
(0, 2) 3
(1, 0) 4
(1, 1) 5
(1, 2) 6
```

Cada índice é uma tupla com a posição exata do elemento em cada dimensão — útil quando você precisa não só do valor, mas também de onde ele está no array.

Com _copy_/_view_, _shape_, `reshape()` e as formas de iterar na manga, você já consegue manipular a estrutura de um array com bastante liberdade. No próximo post da série a gente parte pra juntar, dividir, buscar e ordenar arrays.

**Fonte adaptada:** [NumPy Array Copy vs View](https://www.w3schools.com/python/numpy/numpy_copy_vs_view.asp), [NumPy Array Shape](https://www.w3schools.com/python/numpy/numpy_array_shape.asp), [NumPy Array Reshape](https://www.w3schools.com/python/numpy/numpy_array_reshape.asp), [NumPy Array Iterating](https://www.w3schools.com/python/numpy/numpy_array_iterating.asp)
