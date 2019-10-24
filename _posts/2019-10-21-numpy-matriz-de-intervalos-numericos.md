---
layout: post
title: "#7 - Matriz de intervalos numéricos no NumPy"
date: 2019-10-21 13:30:00
description: Neste capítulo, veremos como criar uma matriz a partir de intervalos numéricos.
image: 'https://res.cloudinary.com/felipetac/image/upload/v1571950058/rubrik8_dvttrx.jpg'
category: 'ciência de dados'
tags:
- Ciência de Dados
- Data Science
- Python
- Programação
- Numpy
twitter_text: Numpy - Matriz de intervalos numéricos.
introduction: Neste capítulo, veremos como criar uma matriz a partir de intervalos numéricos.
---

## numpy.arange

Essa função retorna um objeto __ndarray__ que contém valores espaçados igualmente dentro de um determinado intervalo. O formato da função é o seguinte -

```py
numpy.arange(start, stop, step, dtype)
```

O construtor usa os seguintes parâmetros.

<table>
<tbody><tr>
<th style="text-align:center;">Sr.No.</th>
<th style="text-align:center;">Parâmetros &amp; Descrição</th>
</tr>
<tr>
<td>1</td>
<td><p><b>start</b></p>
<p>O início de um intervalo. Se omitido, o padrão é 0</p>
</td>
</tr>
<tr>
<td>2</td>
<td><p><b>stop</b></p>
<p>O fim de um intervalo (não incluindo este número)</p>
</td>
</tr>
<tr>
<td>3</td>
<td><p><b>step</b></p>
<p>Espaçamento entre valores, o padrão é 1</p>
</td>
</tr>
<tr>
<td>4</td>
<td><p><b>dtype</b></p>
<p>Tipo de dados do ndarray resultante. Se não for fornecido, o tipo de dado de entrada é usado</p>
</td>
</tr>
</tbody></table>

Os exemplos a seguir mostram como você pode usar esta função.

### Exemplo 1

```py
import numpy as np
x = np.arange(5)
print x
```

Sua saída seria a seguinte -

```py
[0  1  2  3  4]
```

### Exemplo 2

```py
import numpy as np
# dtype set
x = np.arange(5, dtype = float)
print x
```

Aqui, a saída seria -

```py
[0.  1.  2.  3.  4.]
```

### Exemplo 3

```py
# start and stop parameters set
import numpy as np
x = np.arange(10,20,2)
print x
```

Sua saída é a seguinte -

```py
[10  12  14  16  18]
```

## numpy.linspace

Esta função é semelhante à função __arange()__. Nesta função, em vez do tamanho da etapa, é especificado o número de valores espaçados igualmente entre o intervalo. O uso desta função é o seguinte -

```py
numpy.linspace(start, stop, num, endpoint, retstep, dtype)
```

O construtor usa os seguintes parâmetros.

<table>
<tbody><tr>
<th style="text-align:center;">Sr.No.</th>
<th style="text-align:center;">Parameter &amp; Description</th>
</tr>
<tr>
<td>1</td>
<td><p><b>start</b></p>
<p>O valor inicial da sequência</p>
</td>
</tr>
<tr>
<td>2</td>
<td><p><b>stop</b></p>
<p>O valor final da sequência, incluído na sequência se o terminal estiver definido como <i>true</i></p>
</td>
</tr>
<tr>
<td>3</td>
<td><p><b>num</b></p>
<p>O número de amostras espaçadas uniformemente a serem geradas. O padrão é 50</p>
</td>
</tr>
<tr>
<td>4</td>
<td><p><b>endpoint</b></p>
<p><i>True</i> por padrão, portanto, o valor de parada é incluído na sequência. Se <i>False</i>, não está incluído</p>
</td>
</tr>
<tr>
<td>5</td>
<td><p><b>retstep</b></p>
<p>Se <i>True</i>, retorna amostras e alterna entre os números consecutivos</p>
</td>
</tr>
<tr>
<td>6</td>
<td><p><b>dtype</b></p>
<p>Tipo de dados de saída <b>ndarray</b></p>
</td>
</tr>
</tbody></table>

Os exemplos a seguir demonstram a função __linspace()__ use.

### Exemplo 1

```py
import numpy as np
x = np.linspace(10,20,5)
print x
```

Sua saída seria -

```py
[10.   12.5   15.   17.5  20.]
```

### Exemplo 2

```py
# endpoint set to false
import numpy as np
x = np.linspace(10,20, 5, endpoint = False)
print x
```

A saída seria -

```py
[10.   12.   14.   16.   18.]
```

### Exemplo 3

```py
# find retstep value
import numpy as np

x = np.linspace(1,2,5, retstep = True)
print x
# retstep here is 0.25
```

Agora, a saída seria -

```py
(array([ 1.  ,  1.25,  1.5 ,  1.75,  2.  ]), 0.25)
```

## numpy.logspace

Essa função retorna um objeto __ndarray__ que contém os números espaçados igualmente em uma escala logarítmica. Os pontos iniciais e finais da escala são índices da base, geralmente 10.

```py
numpy.logspace(start, stop, num, endpoint, base, dtype)
```

Os seguintes parâmetros determinam a saída da função de espaço da logarítmica.

<table>
<tbody><tr>
<th style="text-align:center;">Sr.No.</th>
<th style="text-align:center;">Parâmetro &amp; Descrição</th>
</tr>
<tr>
<td>1</td>
<td><p><b>start</b></p>
<p>O ponto inicial da sequência é base<sup>inicio</sup></p>
</td>
</tr>
<tr>
<td>2</td>
<td><p><b>stop</b></p>
<p>O valor final da sequência é base<sup>fim</sup></p>
</td>
</tr>
<tr>
<td>3</td>
<td><p><b>num</b></p>
<p>O número de valores entre o intervalo. O padrão é 500</p>
</td>
</tr>
<tr>
<td>4</td>
<td><p><b>endpoint</b></p>
<p>Se <i>True</i>, o <i>stop</i> é o último valor no intervalo</p>
</td>
</tr>
<tr>
<td>5</td>
<td><p><b>base</b></p>
<p>Espaçamento da base logarítmica, o padrão é 10</p>
</td>
</tr>
<tr>
<td>6</td>
<td><p><b>dtype</b></p>
<p>Tipo de dados da matriz de saída. Se não for fornecido, depende de outros argumentos de entrada</p>
</td>
</tr>
</tbody></table>

Os exemplos a seguir ajudarão você a entender a função do espaço de log.

### Exemplo 1

```py
import numpy as np
# default base is 10
a = np.logspace(1.0, 2.0, num = 10)
print a
```

Sua saída seria a seguinte -

```py
[ 10. 12.91549665 16.68100537 21.5443469 27.82559402 35.93813664 46.41588834 59.94842503 77.42636827 100. ]
```

### Exemplo 2

```py
# set base of log space to 2
import numpy as np
a = np.logspace(1,10,num = 10, base = 2)
print a
```

Agora, a saída seria -

```py
[ 2.     4.     8.    16.    32.    64.   128.   256.    512.   1024.]
```

**Fonte traduzida com adaptações:** [NumPy - Array From Numerical Ranges](https://www.tutorialspoint.com/numpy/numpy_array_from_numerical_ranges.htm)

