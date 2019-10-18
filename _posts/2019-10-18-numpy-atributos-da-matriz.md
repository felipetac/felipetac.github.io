---
layout: post
title: "#4 - Atributos da matriz no NumPy"
date: 2019-10-18 12:20:00
description: Neste capítulo, discutiremos os vários atributos da matriz do NumPy.
image: 'https://res.cloudinary.com/felipetac/image/upload/v1571418842/lego-rubrik_bebrfs.jpg'
category: 'ciência de dados'
tags:
- Ciência de Dados
- Data Science
- Python
- Programação
- Numpy
twitter_text: Numpy - Atributos da matriz.
introduction: Neste capítulo, discutiremos os vários atributos da matriz do NumPy.
---

## ndarray.shape

Este atributo da matriz retorna uma tupla que consiste em dimensões da matriz. Também pode ser usado para redimensionar a matriz.

### Exemplo 1
```py
import numpy as np 
a = np.array([[1,2,3],[4,5,6]]) 
print a.shape
```

A saída é a seguinte -

```py
(2, 3)
```

### Exemplo 2

```py
# isto redimensiona o ndarray
import numpy as np

a = np.array([[1,2,3],[4,5,6]])
a.shape = (3,2)
print a
```

A saída é a seguinte -

```py
[[1, 2],[3, 4],[5, 6]]
 ```

### Exemplo 3

O NumPy também fornece uma função de remodelação para redimensionar uma matriz.

```py
import numpy as np 
a = np.array([[1,2,3],[4,5,6]]) 
b = a.reshape(3,2) 
print b
```

A saída é a seguinte -

```py
[[1, 2], [3, 4], [5, 6]]
```

## ndarray.ndim

Este atributo da matriz retorna o número de dimensões da matriz.

#### Exemplo 1

```py
# uma matriz de números espaçados igualmente
import numpy as np
a = np.arange(24)
print a
```

A saída é a seguinte -

```py
[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]
```

### Exemplo 2

```py
# esta é uma matriz dimensional
import numpy as np
a = np.arange(24)
a.ndim

# agora remodelando a matriz
b = a.reshape(2,4,3)
print b
# b tem agora 3 dimensões
```

A saída é a seguinte -

```py
[[[ 0,  1,  2]
  [ 3,  4,  5]
  [ 6,  7,  8]
  [ 9, 10, 11]]
  [[12, 13, 14]
   [15, 16, 17]
   [18, 19, 20]
   [21, 22, 23]]]
```

## numpy.itemsize

Este atributo da matriz retorna o comprimento de cada elemento da matriz em bytes.

### Exemplo 1

```py
# o dtype da matriz é int8 (1 byte)
import numpy as np
x = np.array([1,2,3,4,5], dtype = np.int8)
print x.itemsize
```

A saída é a seguinte -

```py
1
```

### Exemplo 2

```py
# o dtype da matriz agora é float32 (4 bytes)
import numpy as np
x = np.array([1,2,3,4,5], dtype = np.float32)
print x.itemsize
```

A saída é a seguinte -

```py
4
```

## numpy.flags

O objeto ndarray possui os seguintes atributos. Seus valores atuais são retornados por esta função.

<table>
<tbody><tr>
<th style="text-align:center;">Nº</th>
<th style="text-align:center;">Atributo &amp; Descrição</th>
</tr>
<tr>
<td>1</td>
<td><p><b>C_CONTIGUOUS (C)</b></p>
<p>Os dados estão em um único segmento contíguo no estilo C</p>
</td>
</tr>
<tr>
<td>2</td>
<td><p><b>F_CONTIGUOUS (F)</b></p>
<p>Os dados estão em um único segmento contíguo no estilo Fortran</p>
</td>
</tr>
<tr>
<td>3</td>
<td><p><b>OWNDATA (O)</b></p>
<p>A matriz possui a memória que usa ou a empresta de outro objeto</p>
</td>
</tr>
<tr>
<td>4</td>
<td><p><b>WRITEABLE (W)</b></p>
<p>A área de dados possuir permissão de escrita. Definir como False bloqueia os dados, tornando-os somente leitura</p>
</td>
</tr>
<tr>
<td>5</td>
<td><p><b>ALIGNED (A)</b></p>
<p>Os dados e todos os elementos estão alinhados adequadamente para o hardware</p>
</td>
</tr>
<tr>
<td>6</td>
<td><p><b>UPDATEIFCOPY (U)</b></p>
<p>Essa matriz é uma cópia de outra matriz. Quando essa matriz é desalocada, a matriz base será atualizada com o conteúdo dessa matriz</p>
</td>
</tr>
</tbody></table>

### Exemplo

O exemplo a seguir mostra os valores atuais dos sinalizadores.

```py
import numpy as np
x = np.array([1,2,3,4,5])
print x.flags
```

A saída é a seguinte -

```py
C_CONTIGUOUS : True
F_CONTIGUOUS : True
OWNDATA : True
WRITEABLE : True
ALIGNED : True
UPDATEIFCOPY : False
```

**Fonte traduzida com adaptações:** [NumPy - Array Attributes](https://www.tutorialspoint.com/numpy/numpy_array_attributes.htm)