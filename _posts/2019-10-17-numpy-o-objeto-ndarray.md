---
layout: post
title: "#2 - O objeto Ndarray do NumPy"
date: 2019-10-17 19:30:00
description: Introdução sobre o objeto mais importante definido no NumPy.
image: 'https://res.cloudinary.com/felipetac/image/upload/c_scale,h_315,w_600/v1571418481/rubiks-object2_zjh50q.jpg'
category: 'ciência de dados'
tags:
- Ciência de Dados
- Data Science
- Python
- Programação
- Numpy
twitter_text: Numpy - Objeto Ndarray.
introduction: Nesta parte do tutorial faço uma breve introdução ao principal objeto do Numpy.
---

## Ndarray

O objeto mais importante definido no NumPy é um tipo de matriz N-dimensional chamado __ndarray__. Ele descreve a coleção de itens do mesmo tipo. Os itens da coleção podem ser acessados ​​usando um índice baseado em zero.

Cada item em um ndarray tem o mesmo tamanho de bloco na memória. Cada elemento no ndarray é um objeto do tipo de dados (chamado __dtype__).

Qualquer item extraído do objeto ndarray (por fatia) é representado por um objeto Python de um dos tipos escalares de array. O diagrama a seguir mostra um relacionamento entre ndarray, objeto de tipo de dados (dtype) e tipo escalar da matriz -

![Ndarray Object](https://res.cloudinary.com/felipetac/image/upload/v1571339255/ndarray_n6ptqj.jpg)

Uma instância da classe ndarray pode ser construída por diferentes rotinas de criação de matriz descritas mais adiante no tutorial. O ndarray básico é criado usando uma função de matriz no NumPy da seguinte maneira -

```python
numpy.array
```

Ele cria um ndarray a partir de qualquer objeto que exponha a interface da matriz ou de qualquer método que retorne uma matriz.

```py
numpy.array(object, dtype = None, copy = True, order = None, subok = False, ndmin = 0)
```

O construtor acima usa os seguintes parâmetros -

<table>
<tbody><tr>
<th style="text-align:center;">Pos.</th>
<th style="text-align:center;">Parâmetros e Descrição</th>
</tr>
<tr>
<td>1</td>
<td><p><b>object</b></p>
<p>Qualquer objeto que exponha o método de interface da matriz retorna uma matriz ou qualquer sequência (aninhada).</p>
</td>
</tr>
<tr>
<td>2</td>
<td><p><b>dtype</b></p>
<p>Tipo de dados desejado da matriz, opcional</p>
</td>
</tr>
<tr>
<td>3</td>
<td><p><b>copy</b></p>
<p>Opcional. Por padrão (true), o objeto é copiado</p>
</td>
</tr>
<tr>
<td>4</td>
<td><p><b>order</b></p>
<p>C (linha principal) ou F (coluna principal) ou A (qualquer) (padrão)</p>
</td>
</tr>
<tr>
<td>5</td>
<td><p><b>subok</b></p>
<p>Por padrão, a matriz retornada é forçada a ser uma classe base de matriz. Se verdadeiro, as subclasses sobrepoem</p>
</td>
</tr>
<tr>
<td>6</td>
<td><p><b>ndmin</b></p>
<p>Especifica as dimensões mínimas da matriz resultante</p>
</td>
</tr>
</tbody></table>

Dê uma olhada nos exemplos a seguir para entender melhor.

### Exemplo 1

```py
import numpy as np
a = np.array([1,2,3])
print a
```

A saída é a seguinte -

```py
[1 2 3]
```

### Exemplo 2

```py
# mais de uma dimensão
import numpy as np
a = np.array([[1, 2], [3, 4]])
print a
```

A saída é a seguinte -

```py
[[1 2]
 [3 4]]
```

### Exemplo 3

```py
# dimensões mínimas
import numpy as np
a = np.array([1,2,3,4,5], ndmin = 2)
print a
```

A saída é a seguinte -

```py
[[1 2 3 4 5]]
```

### Exemplo 4

```py
# parâmetro dtype
import numpy as np 
a = np.array([1, 2, 3], dtype = complex) 
print a
```

A saída é a seguinte -

```py
[1.+0.j 2.+0.j 3.+0.j]
```

O objeto __ndarray__ consiste em um segmento unidimensional contído na memória do computador, combinado com um esquema de indexação que mapeia cada item para um local no bloco de memória. O bloco de memória mantém os elementos em uma ordem principal de linha (estilo C) ou em uma ordem principal de coluna (estilo FORTRAN ou MatLab).

**Fonte traduzida com adaptações:** [NumPy - Ndarray Object](https://www.tutorialspoint.com/numpy/numpy_ndarray_object.htm)