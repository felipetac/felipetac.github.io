---
layout: post
title: "#6 - Matriz de dados existentes com Numpy"
date: 2019-10-18 13:30:00
description: Neste capítulo, discutiremos como criar uma matriz a partir de dados existentes.
image: 'https://res.cloudinary.com/felipetac/image/upload/v1571419295/rubrik3_wy9ufi.jpg'
category: 'ciência de dados'
tags:
- Ciência de Dados
- Data Science
- Python
- Programação
- Numpy
twitter_text: Numpy - Matriz de dados existentes.
introduction: Neste capítulo, discutiremos como criar uma matriz a partir dos dados existentes.
---

## numpy.asarray

Essa função é semelhante ao numpy.array, exceto pelo fato de ter menos parâmetros. Essa rotina é útil para converter a sequência Python em ndarray.

```py
numpy.asarray(a, dtype = None, order = None)
```

O construtor usa os seguintes parâmetros.

<table>
<tbody><tr>
<th style="text-align:center;">Nº</th>
<th style="text-align:center;">Parâmetro &amp; Descrição</th>
</tr>
<tr>
<td>1</td>
<td><p><b>a</b></p>
<p>Insira dados de qualquer forma, como lista, lista de tuplas, tuplas, tupla de tuplas ou tupla de listas</p>
</td>
</tr>
<tr>
<td>2</td>
<td><p><b>dtype</b></p>
<p>Por padrão, o tipo de dado de entrada é aplicado ao ndarray resultante</p>
</td>
</tr>
<tr>
<td>3</td>
<td><p><b>order</b></p>
<p>C (linha principal) ou F (coluna principal). C é o padrão</p>
</td>
</tr>
</tbody></table>

Os exemplos a seguir mostram como você pode usar a função asarray .

### Exemplo 1

```py
# converte lista para ndarray
import numpy as np

x = [1,2,3]
a = np.asarray(x)
print a
```

Sua saída seria a seguinte -

```py
[1 2 3]
```

### Exemplo 2


```py
# seta o tipo do dado (dtype)
import numpy as np

x = [1,2,3]
a = np.asarray(x, dtype = float)
print a
```

Agora, a saída seria a seguinte -

```py
[1. 2. 3.]
```

### Exemplo 3

```py
# ndarray da tupla
import numpy as np

x = (1,2,3)
a = np.asarray(x)
print a
```

Sua saída seria -

```py
[1 2 3]
```

### Exemplo 4

```py
# ndarray da lista de tuplas
import numpy as np

x = [(1,2,3),(4,5)]
a = np.asarray(x)
print a
```

Aqui, a saída seria a seguinte -

```py
[(1, 2, 3) (4, 5)]
```

## numpy.frombuffer

Esta função interpreta um buffer como matriz unidimensional. Qualquer objeto que expõe a interface do buffer é usado como parâmetro para retornar um ndarray .

```py
numpy.frombuffer(buffer, dtype = float, count = -1, offset = 0)
```

O construtor usa os seguintes parâmetros.

<table>
<tbody><tr>
<th style="text-align:center;">Nº</th>
<th style="text-align:center;">Parâmetro &amp; Descrição</th>
</tr>
<tr>
<td>1</td>
<td><p><b>buffer</b></p>
<p>Qualquer objeto que expõe a interface do buffer</p>
</td>
</tr>
<tr>
<td>2</td>
<td><p><b>dtype</b></p>
<p>Tipo de dados do ndarray retornado. O padrão é <i>float</i></p>
</td>
</tr>
<tr>
<td>3</td>
<td><p><b>count</b></p>
<p>O número de itens a serem lidos, o padrão -1 significa todos os dados</p>
</td>
</tr>
<tr>
<td>4</td>
<td><p><b>offset</b></p>
<p>A posição inicial para ler. O padrão é 0</p>
</td>
</tr>
</tbody></table>

### Exemplo

Os exemplos a seguir demonstram o uso da função _frombuffer_.

```py
import numpy as np
s = 'Hello World'
a = np.frombuffer(s, dtype = 'S1')
print a
```

Aqui está sua saída -

```py
['H' 'e' 'l' 'l' 'o' ' ' 'W' 'o' 'r' 'l' 'd']
```

## numpy.fromiter

Essa função cria um objeto ndarray a partir de qualquer objeto iterável. Uma nova matriz unidimensional é retornada por esta função.

```py
numpy.fromiter(iterable, dtype, count = -1)
```

Aqui, o construtor usa os seguintes parâmetros.

<table>
<tbody><tr>
<th style="text-align:center;">Nº</th>
<th style="text-align:center;">Parâmetro &amp; Descrição</th>
</tr>
<tr>
<td>1</td>
<td><p><b>iterable</b></p>
<p>Qualquer objeto iterável</p>
</td>
</tr>
<tr>
<td>2</td>
<td><p><b>dtype</b></p>
<p>Tipo de dados da matriz resultante</p>
</td>
</tr>
<tr>
<td>3</td>
<td><p><b>count</b></p>
<p>O número de itens a serem lidos no iterador. O padrão é -1, o que significa que todos os dados devem ser lidos</p>
</td>
</tr>
</tbody></table>

Os exemplos a seguir mostram como usar a função __range()__ interna para retornar um objeto de lista. Um iterador desta lista é usado para formar um objeto __ndarray__.

### Exemplo 1

```py
# cria uma lista de objetos usando a função range
import numpy as np
list = range(5)
print list
```

Sua saída é a seguinte -

```py
[0 1 2 3 4]
```

### Exemplo 2

```py
# obtem o objeto iterador da lista
import numpy as np
list = range(5)
it = iter(list)

# usa o iterador para criar o ndarray
x = np.fromiter(it, dtype = float)
print x
```

Agora, a saída seria a seguinte -

```py
[0. 1. 2. 3. 4.]
```

**Fonte traduzida com adaptações:** [NumPy - Array From Existing Data](https://www.tutorialspoint.com/numpy/numpy_array_from_existing_data.htm)

