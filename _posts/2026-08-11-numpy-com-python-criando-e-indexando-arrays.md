---
layout: post
title: "#1 - Criando e Indexando Arrays no NumPy"
date: 2026-08-11 13:00:00
image: '/assets/img/posts/numpy-com-python-criando-e-indexando-arrays.webp'
description: Como criar arrays com o NumPy, entender suas dimensões e o parâmetro dtype, e acessar elementos com indexação e fatiamento (slicing).
category: 'ciência de dados'
tags:
- Ciência de Dados
- Python
- Programação
- Numpy
twitter_text: Criando e Indexando Arrays no NumPy
introduction: "Nesta parte do tutorial, você aprende a criar arrays com o NumPy, entender suas dimensões e tipos, e acessar elementos com indexação e slicing."
---

Começando uma nova série sobre _NumPy_ aqui no blog. Se você já leu a [série antiga sobre o assunto](/numpy-introducao/), publicada lá em 2019 e baseada no tutorialspoint, sabe que ela cobre o objeto _ndarray_ de um jeito bem teórico — construtor, parâmetros, ordem de memória e afins. Vale a pena como leitura complementar se você quer entender o "porquê" por trás das coisas. Essa série nova segue outra referência (o tutorial de NumPy do w3schools) e tem uma pegada mais prática: menos teoria de construtor, mais "como eu resolvo isso no dia a dia" — criação de arrays, indexação, slicing, shape, iteração, ordenação, números aleatórios e por aí vai.

O _NumPy_ é a biblioteca base pra computação numérica em Python. Se você já mexeu com pandas, scikit-learn ou qualquer coisa de ciência de dados, o NumPy tá lá por baixo dos panos. Neste primeiro post você vai aprender a criar seus primeiros _arrays_, entender o conceito de dimensão (0-D, 1-D, 2-D, 3-D...), dar uma olhada no parâmetro `dtype`, e começar a acessar elementos com indexação e slicing.

## Instalando e importando

Se você ainda não tem o NumPy instalado no seu ambiente:

```bash
pip install numpy
```

E a convenção universal pra importar a biblioteca é apelidá-la de `np`:

```py
import numpy as np
```

Todo exemplo deste post (e dos próximos da série) assume que essa linha já foi executada.

## Criando arrays com np.array()

O objeto central do NumPy é o _ndarray_ (N-dimensional array). Você cria um a partir de uma lista (ou tupla) do Python usando `np.array()`.

### Exemplo 1

```py
import numpy as np

arr = np.array([1, 2, 3, 4, 5])
print(arr)
print(type(arr))
```

A saída é:

```py
[1 2 3 4 5]
<class 'numpy.ndarray'>
```

Repare que `type(arr)` mostra `numpy.ndarray` — é esse o tipo de objeto que você vai usar o tempo todo daqui pra frente.

### Criando a partir de uma tupla

`np.array()` também aceita tuplas, não só listas:

```py
arr = np.array((1, 2, 3, 4, 5))
print(arr)
```

A saída é:

```py
[1 2 3 4 5]
```

## Dimensões de um array

Um _array_ pode ter zero, uma, duas, três ou mais dimensões. Isso é o que o NumPy chama de _shape_/dimensionalidade, e é um dos conceitos mais importantes pra entender bem antes de seguir em frente.

### Array 0-D (escalar)

Um array 0-D é, na prática, um único valor — o elemento em si é o array.

```py
arr = np.array(42)
print(arr)
```

A saída é:

```py
42
```

### Array 1-D

O array 1-D é o mais comum: uma sequência simples de valores, como uma lista comum.

```py
arr = np.array([1, 2, 3, 4, 5])
print(arr)
```

A saída é:

```py
[1 2 3 4 5]
```

### Array 2-D

Um array 2-D tem arrays 1-D como elementos — na prática, é uma matriz, útil pra representar dados tabulares.

```py
arr = np.array([[1, 2, 3], [4, 5, 6]])
print(arr)
```

A saída é:

```py
[[1 2 3]
 [4 5 6]]
```

### Array 3-D

Um array 3-D tem arrays 2-D como elementos. É comum aparecer quando você trabalha com, por exemplo, uma coleção de imagens (cada imagem sendo uma matriz).

```py
arr = np.array([[[1, 2], [3, 4]], [[5, 6], [7, 8]]])
print(arr)
```

A saída é:

```py
[[[1 2]
  [3 4]]

 [[5 6]
  [7 8]]]
```

### Verificando o número de dimensões com ndim

Todo _ndarray_ tem um atributo `ndim` que te diz quantas dimensões ele tem, sem você precisar contar colchete por colchete:

```py
a = np.array(42)
b = np.array([1, 2, 3, 4, 5])
c = np.array([[1, 2, 3], [4, 5, 6]])
d = np.array([[[1, 2], [3, 4]], [[5, 6], [7, 8]]])

print(a.ndim)
print(b.ndim)
print(c.ndim)
print(d.ndim)
```

A saída é:

```py
0
1
2
3
```

### Definindo o número mínimo de dimensões

Se você quiser forçar um array a ter mais dimensões do que ele teria naturalmente, existe o parâmetro `ndmin`:

```py
arr = np.array([1, 2, 3, 4], ndmin=5)
print(arr)
print('número de dimensões:', arr.ndim)
```

A saída é:

```py
[[[[[1 2 3 4]]]]]
número de dimensões: 5
```

> **Nota:** na prática, o dia a dia gira em torno de arrays 1-D e 2-D. Arrays com 3+ dimensões aparecem mais em processamento de imagem, séries temporais multivariadas e esse tipo de coisa — mas vale saber que o conceito escala sem limite.

## O parâmetro dtype

Todo elemento de um _ndarray_ tem o mesmo tipo de dado, chamado de _dtype_. Isso é bem diferente de uma lista comum do Python, que pode misturar tipos à vontade — e é justamente essa uniformidade que deixa as operações do NumPy tão mais rápidas.

### Descobrindo o dtype de um array

```py
arr = np.array([1, 2, 3, 4])
print(arr.dtype)

arr2 = np.array(['maçã', 'banana', 'uva'])
print(arr2.dtype)
```

A saída é:

```py
int64
<U6
```

`int64` é um inteiro de 64 bits; `<U6` é uma string Unicode de até 6 caracteres (o `<` indica a ordem de bytes, e o 6 é o tamanho do maior elemento).

### Definindo o dtype na criação

Você pode forçar o tipo desejado passando o parâmetro `dtype`:

```py
arr = np.array([1, 2, 3, 4], dtype='S')
print(arr)
print(arr.dtype)

arr_float = np.array([1, 2, 3, 4], dtype='f4')
print(arr_float)
print(arr_float.dtype)
```

A saída é:

```py
[b'1' b'2' b'3' b'4']
|S1
[1. 2. 3. 4.]
float32
```

Alguns dos códigos de tipo mais usados: `i` (inteiro), `u` (inteiro sem sinal), `f` (float), `b` (booleano), `S` (string), `U` (string unicode), `c` (complexo).

### Convertendo o tipo com astype

Se você já tem um array pronto e quer mudar o tipo dele, use `.astype()` — ele retorna uma _cópia_ nova, sem alterar o array original:

```py
arr = np.array([1.1, 2.2, 3.3])
novo_arr = arr.astype(int)

print(novo_arr)
print(novo_arr.dtype)
```

A saída é:

```py
[1 2 3]
int64
```

> **Nota:** se você tentar converter algo pra um tipo incompatível (por exemplo, a string `'oi'` pra `int`), o NumPy levanta um `ValueError`. Vale sempre garantir que os dados fazem sentido pro tipo de destino antes de converter.

## Indexação de arrays

Indexar um array no NumPy funciona do mesmo jeito que em uma lista Python comum: o índice começa em `0`.

### Indexando um array 1-D

```py
arr = np.array([10, 20, 30, 40])
print(arr[0])
print(arr[2])
print(arr[1] + arr[3])
```

A saída é:

```py
10
30
60
```

### Indexando um array 2-D

Em um array 2-D, você precisa de dois índices: um pra linha, outro pra coluna, separados por vírgula.

```py
arr = np.array([[1, 2, 3, 4, 5], [6, 7, 8, 9, 10]])

print('elemento na linha 0, coluna 3:', arr[0, 3])
print('elemento na linha 1, coluna 4:', arr[1, 4])
```

A saída é:

```py
elemento na linha 0, coluna 3: 4
elemento na linha 1, coluna 4: 10
```

### Indexando um array 3-D

O raciocínio se estende: cada índice a mais "desce" mais um nível de profundidade.

```py
arr = np.array([[[1, 2, 3], [4, 5, 6]], [[7, 8, 9], [10, 11, 12]]])
print(arr[1, 0, 2])
```

A saída é:

```py
9
```

Pra chegar nesse `9`: `arr[1]` pega o segundo bloco 2-D (`[[7, 8, 9], [10, 11, 12]]`), `[0]` pega a primeira linha desse bloco (`[7, 8, 9]`), e `[2]` pega o terceiro elemento dessa linha.

### Índices negativos

Índices negativos contam a partir do final do array — `-1` é o último elemento, `-2` o penúltimo, e assim por diante.

```py
arr = np.array([[1, 2, 3, 4, 5], [6, 7, 8, 9, 10]])
print('último elemento da segunda linha:', arr[1, -1])
```

A saída é:

```py
último elemento da segunda linha: 10
```

## Fatiamento (slicing) de arrays

Slicing é extrair um pedaço do array, não só um elemento. A sintaxe é `[início:fim]`, onde o índice inicial entra no resultado e o final fica de fora.

### Sintaxe básica

```py
arr = np.array([1, 2, 3, 4, 5, 6, 7])
print(arr[1:5])
print(arr[4:])
print(arr[:4])
```

A saída é:

```py
[2 3 4 5]
[5 6 7]
[1 2 3 4]
```

Quando você omite o início, o NumPy assume `0`; quando omite o fim, assume o tamanho do array.

### Slicing com índices negativos

```py
arr = np.array([1, 2, 3, 4, 5, 6, 7])
print(arr[-3:-1])
```

A saída é:

```py
[5 6]
```

### Usando step

Você também pode informar um terceiro valor, o _step_ (passo), na forma `[início:fim:step]`:

```py
arr = np.array([1, 2, 3, 4, 5, 6, 7])
print(arr[1:6:2])
print(arr[::2])
```

A saída é:

```py
[2 4 6]
[1 3 5 7]
```

`arr[::2]` pega o array inteiro pulando de 2 em 2 — um jeito curto e comum de pegar "todo elemento par de índice".

### Slicing em arrays 2-D

Em arrays 2-D, você fatia linha e coluna separadamente, também com vírgula:

```py
arr = np.array([[1, 2, 3, 4, 5], [6, 7, 8, 9, 10]])

print(arr[1, 1:4])
print(arr[0:2, 2])
print(arr[0:2, 1:4])
```

A saída é:

```py
[7 8 9]
[3 8]
[[2 3 4]
 [7 8 9]]
```

`arr[1, 1:4]` pega a linha 1 inteira, colunas 1 até 3. `arr[0:2, 2]` pega a coluna 2 nas duas linhas. `arr[0:2, 1:4]` combina as duas fatias, retornando um recorte retangular da matriz.

Isso fecha a base: criar arrays, entender dimensão e tipo, e acessar/recortar dados com indexação e slicing. No próximo post da série a gente entra em _copy vs view_, _shape_ e as formas de iterar sobre um array.

**Fonte adaptada:** [NumPy Creating Arrays](https://www.w3schools.com/python/numpy/numpy_creating_arrays.asp), [NumPy Data Types](https://www.w3schools.com/python/numpy/numpy_data_types.asp), [NumPy Array Indexing](https://www.w3schools.com/python/numpy/numpy_array_indexing.asp), [NumPy Array Slicing](https://www.w3schools.com/python/numpy/numpy_array_slicing.asp)
