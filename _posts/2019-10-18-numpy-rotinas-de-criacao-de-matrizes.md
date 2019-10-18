---
layout: post
title: "#5 - Rotinas para criação de matrizes com o NumPy"
date: 2019-10-18 12:40:00
description: Introdução sobre as funções no NumPy para criação de matrizes.
image: 'https://res.cloudinary.com/felipetac/image/upload/v1571419748/rubrik4_ghyneb.jpg'
category: 'ciência de dados'
tags:
- Ciência de Dados
- Data Science
- Python
- Programação
- Numpy
twitter_text: Numpy - Rotinas para criação de matrizes.
introduction: Introdução sobre as funções no NumPy para criação de matrizes.
---

Um novo objeto ndarray pode ser construído por qualquer uma das rotinas de criação de matriz a seguir ou usando um
construtor ndarray de baixo nível.

## numpy.empty

Ele cria uma matriz não inicializada de forma e tipo especificados. Ele usa o seguinte construtor -

```py
numpy.empty(shape, dtype = float, order = 'C')
```

### Exemplo

O código a seguir mostra um exemplo de uma matriz vazia.

```py
import numpy as np
x = np.empty([3,2], dtype = int)
print x
```

A saída é a seguinte -

```py
[[22649312, 1701344351], [1818321759, 1885959276}, [16779776, 156368896]]
```

Nota - Os elementos em uma matriz mostram valores aleatórios, pois não são inicializados.

## numpy.zeros

Retorna uma nova matriz de tamanho especificado, preenchida com zeros.

```py
numpy.zeros(shape, dtype = float, order = 'C')
```

### Exemplo 1

```py
# matriz com cinco "zeros". Por padrão o dtype é float
import numpy as np
x = np.zeros(5)
print x
```

A saída é a seguinte -

```py
[ 0., 0., 0., 0., 0.]
```

### Exemplo 2

```py
import numpy as np
x = np.zeros((5,), dtype = np.int)
print x
```

Agora, a saída seria a seguinte -

```py
[0, 0, 0, 0, 0]
```

### Exemplo 3

```py
# custom type
import numpy as np
x = np.zeros((2,2), dtype = [('x', 'i4'), ('y', 'i4')])
print x
```

Deve produzir a seguinte saída -
```py
[[(0,0)(0,0)], [(0,0)(0,0)]]
 ```

## numpy.ones

Retorna uma nova matriz de tamanho e tipo especificado, preenchida com "1".

```py
numpy.ones(shape, dtype = None, order = 'C')
```

### Exemplo 1

```py
# matriz com cinco "1". Por padrão o dtype é float
import numpy as np
x = np.ones(5)
print x
```

A saída é a seguinte -

```py
[ 1., 1., 1., 1., 1.]
```

### Exemplo 2

```py
import numpy as np
x = np.ones([2,2], dtype = int)
print x
```

Agora, a saída seria a seguinte -

```py
[[1, 1], [1, 1]]
```

**Fonte traduzida com adaptações:** [NumPy - Array Creation Routines](https://www.tutorialspoint.com/numpy/numpy_array_creation_routines.htm)