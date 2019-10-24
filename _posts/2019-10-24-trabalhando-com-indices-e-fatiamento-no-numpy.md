---
layout: post
title: "#8 - Trabalhando com Indices e Fatiamento no NumPy"
date: 2019-10-24 13:30:00
description: Neste capítulo, aprenderemos como trabalhar com índices e fatiamento de matrizes no NumPy.
image: 'https://res.cloudinary.com/felipetac/image/upload/v1571950350/rubrik9_lpzqgl.jpg'
category: 'ciência de dados'
tags:
- Ciência de Dados
- Data Science
- Python
- Programação
- Numpy
twitter_text: Numpy - Indexação e Fatiamento.
introduction: Neste capítulo, aprenderemos como trabalhar com índices e fatiamento de matrizes no NumPy.
---
O conteúdo do objeto ndarray pode ser acessado e modificado por via da indexação ou fatiamento, do mesmo jeito que a linguagem Python acessa o conteúdo dos objetos por padrão.

Como mencionado anteriormente, os itens no objeto ndarray seguem o índice baseado em zero. Estão disponíveis três tipos de métodos de indexação - __acesso ao campo__, __fatiamento básico__ e __indexação avançada__.

Fatiamento básico é uma extensão do conceito básico de fatiar do Python para n dimensões. Um objeto de fatia do Python é construído fornecendo parâmetros de **_start_**, **_stop_** e **_step_** para a função __slice__. Este objeto de fatiamento é passado para a matriz para extrair uma parte da matriz.

### Exemplo 1

```py
import numpy as np
a = np.arange(10)
s = slice(2,7,2)
print a[s]
```

Sua saída é a seguinte -

```py
[2  4  6]
```

No exemplo acima, um objeto ndarray é preparado pela função __arange()__. Em seguida, um objeto de fatiamento é definido com os valores de **_start_**, **_stop_** e **_step_** 2, 7 e 2, respectivamente. Quando esse objeto de fatiamento é passado para o ndarray, o conteudo do objeto partirá no índice 2 até 7 e pula 2.

O mesmo resultado também pode ser obtido fornecendo os parâmetros de fatia separados por dois pontos:_(start: stop: step)_ diretamente para o objeto ndarray .

### Exemplo 2

```py
import numpy as np
a = np.arange(10)
b = a[2:7:2]
print b
```

Aqui, obteremos a mesma saída -

```py
[2  4  6]
```

Se apenas um parâmetro for colocado, um único item correspondente ao índice será retornado. Se a: for inserido na frente, todos os itens desse índice em diante serão extraídos. Se dois parâmetros (com: entre eles) forem usados, os itens entre os dois índices (não incluindo o índice de parada) com a _step_ padrão 1 serão fatiados.

### Exemplo 3

```py
# fatiar um único item
import numpy as np

a = np.arange(10)
b = a[5]
print b
```

Sua saída é a seguinte -

```py
5
```

### Exemplo 4


```py
# fatiar itens começando por um índice
import numpy as np
a = np.arange(10)
print a[2:]
```

Agora, a saída seria -

```py
[2  3  4  5  6  7  8  9]
```

### Exemplo 5

```py
# fatiar itens entre índices
import numpy as np
a = np.arange(10)
print a[2:5]
```

Aqui, a saída seria -

```py
[2  3  4]
```

A descrição acima também se aplica ao ndarray multidimensional.

### Exemplo 6

```py
import numpy as np
a = np.array([[1,2,3],[3,4,5],[4,5,6]])
print a

# fatiar itens começando por um índice
print 'Agora vamos cortar a matriz do índice a[1:]'
print a[1:]
```

A saída é a seguinte -

```py
[[1 2 3]
 [3 4 5]
 [4 5 6]]

Agora vamos cortar a matriz do índice a[1:]
[[3 4 5]
 [4 5 6]]
```

O fatiamento também pode incluir reticências (…) para fazer uma tupla de seleção do mesmo comprimento que a dimensão de uma matriz. Se reticências forem usadas na posição da linha, ele retornará um ndarray composto de itens nas linhas.

### Exemplo 7

```py
# iniciando uma matriz
import numpy as np
a = np.array([[1,2,3],[3,4,5],[4,5,6]])

print 'Nossa matriz é:'
print a
print '\n'

# esta retorna uma matriz de itens da segunda coluna
print 'Os itens na segunda coluna são:'
print a[...,1]
print '\n'

# Agora iremos fatiar todos os itens da segunda linha
print 'Os itens na segunda linha são:'
print a[1,...]
print '\n'

# Agora iremos fatiar todos as itens da coluna 1 adiante
print 'Os itens da coluna 1 em diante são:'
print a[...,1:]
```

A saída deste programa é a seguinte -

```py
Nossa matriz é:
[[1 2 3]
 [3 4 5]
 [4 5 6]]

Os itens na segunda coluna são:
[2 4 5]

Os itens na segunda linha são:
[3 4 5]

Os itens da coluna 1 em diante são:
[[2 3]
 [4 5]
 [5 6]]
```

**Fonte traduzida com adaptações:** [NumPy - Indexing & Slicing](https://www.tutorialspoint.com/numpy/numpy_indexing_and_slicing.htm)
