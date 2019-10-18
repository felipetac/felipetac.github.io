---
layout: post
title: "#3 - Tipos de dados no NumPy"
date: 2019-10-17 20:00:00
description: Introdução sobre os tipos de dados no Numpy.
image: 'https://res.cloudinary.com/felipetac/image/upload/c_scale,h_315,w_600/v1571348561/rubiks-types_m2emf6.jpg'
category: 'ciência de dados'
tags:
- Ciência de Dados
- Data Science
- Python
- Programação
- Numpy
twitter_text: Numpy - Tipos de dados.
introduction: Nesta parte do tutorial faço uma breve introdução aos tipos de dados no Numpy.
---

O NumPy suporta uma variedade muito maior de tipos numéricos do que o Python. A tabela a seguir mostra os diferentes tipos de dados escalares definidos no NumPy.

<table>
<tbody><tr>
<th style="text-align:center;">Nº</th>
<th style="text-align:center;">Tipos de Dados &amp; Descrição</th>
</tr>
<tr>
<td>1</td>
<td><p><b>bool_</b></p>
<p>Booleano (Verdadeiro ou Falso) armazenado como um byte</p>
</td>
</tr>
<tr>
<td>2</td>
<td><p><b>int_</b></p>
<p>Tipo inteiro padrão (igual o <i>long</i> no C; normalmente int64 ou int32)</p>
</td>
</tr>
<tr>
<td>3</td>
<td><p><b>intc</b></p>
<p>Idêntico o <i>int</i> do C (normalmente int32 ou int64)</p>
</td>
</tr>
<tr>
<td>4</td>
<td><p><b>intp</b></p>
<p>Inteiro usado para indexação (o mesmo que C <i>ssize_t</i>; normalmente, int32 ou int64)</p>
</td>
</tr>
<tr>
<td>5</td>
<td><p><b>int8</b></p>
<p>Byte (-128 to 127)</p>
</td>
</tr>
<tr>
<td>6</td>
<td><p><b>int16</b></p>
<p>Inteiro (-32768 to 32767)</p>
</td>
</tr>
<tr>
<td>7</td>
<td><p><b>int32</b></p>
<p>Inteiro (-2147483648 to 2147483647)</p>
</td>
</tr>
<tr>
<td>8</td>
<td><p><b>int64</b></p>
<p>Inteiro (-9223372036854775808 to 9223372036854775807)</p>
</td>
</tr>
<tr>
<td>9</td>
<td><p><b>uint8</b></p>
<p>Unsigned integer (0 to 255)</p>
</td>
</tr>
<tr>
<td>10</td>
<td><p><b>uint16</b></p>
<p>Inteiro não assinado (0 to 65535)</p>
</td>
</tr>
<tr>
<td>11</td>
<td><p><b>uint32</b></p>
<p>Inteiro não assinado (0 to 4294967295)</p>
</td>
</tr>
<tr>
<td>12</td>
<td><p><b>uint64</b></p>
<p>Inteiro não assinado (0 to 18446744073709551615)</p>
</td>
</tr>
<tr>
<td>13</td>
<td><p><b>float_</b></p>
<p>Taquigrafia para float64</p>
</td>
</tr>
<tr>
<td>14</td>
<td><p><b>float16</b></p>
<p><i>Half precision float</i>: sign bit, 5 bits exponent, 10 bits mantissa</p>
</td>
</tr>
<tr>
<td>15</td>
<td><p><b>float32</b></p>
<p><i>Single precision float</i>: sign bit, 8 bits exponent, 23 bits mantissa</p>
</td>
</tr>
<tr>
<td>16</td>
<td><p><b>float64</b></p>
<p><i>Double precision float</i>: sign bit, 11 bits exponent, 52 bits mantissa</p>
</td>
</tr>
<tr>
<td>17</td>
<td><p><b>complex_</b></p>
<p>Taquigrafia para complex128</p>
</td>
</tr>
<tr>
<td>18</td>
<td><p><b>complex64</b></p>
<p>Número complexo, representado por dois <i>floats</i> de 32 bits (componentes reais e imaginários)</p>
</td>
</tr>
<tr>
<td>19</td>
<td><p><b>complex128</b></p>
<p>Número complexo, representado por dois <i>floats</i> de 64 bits (componentes reais e imaginários)</p>
</td>
</tr>
</tbody></table>

Os tipos numéricos NumPy são instâncias de objetos dtype (tipo de dados), cada um com características únicas. Os tipos estão disponíveis como np.bool_, np.float32, etc.

## Objetos de tipo de dados (dtype)

Um objeto de tipo de dados descreve a interpretação do bloco fixo de memória correspondente a uma matriz, dependendo dos seguintes aspectos -

- Tipo de dados (número inteiro, objeto flutuante ou objeto Python)

- Tamanho dos dados

- Ordem de bytes (little-endian ou big-endian)

- No caso de tipo estruturado, os nomes dos campos, o tipo de dados de cada campo e parte do bloco de memória utilizado por cada campo.

- Se o tipo de dados for uma sub-matriz, sua forma e tipo de dados

A ordem dos bytes é decidida prefixando '<' ou '>' para o tipo de dados. '<' significa que a codificação é _little-endian_ (menos significativa é armazenada no menor endereço). '>' significa que a codificação é _big-endian_ (o _byte_ mais significativo é armazenado no menor endereço).

Um objeto __dtype__ é construído usando a seguinte sintaxe -

```py
numpy.dtype(object, align, copy)
```

Os parâmetros são -

- __object__ - Para ser convertido em objeto de tipo de dados

- __align__ - Se verdadeiro, adiciona preenchimento ao campo para torná-lo semelhante ao _C-struct_

- __copy__ - Faz uma nova cópia do objeto dtype. Se falso, o resultado é referência ao objeto de tipo de dados interno

### Exemplo 1
```py
# usando o tipo array-scalar
import numpy as np
dt = np.dtype(np.int32)
print dt
```

A saída é a seguinte -

```
int32
```

### Exemplo 2

```py
#int8, int16, int32, int64 podem ser substituidos pela string equivalente a 'i1', 'i2','i4', etc.
import numpy as np

dt = np.dtype('i4')
print dt
```

A saída é a seguinte -

```
int32
```

### Exemplo 3

```py
# utilizando a notação endian
import numpy as np
dt = np.dtype('>i4')
print dt
```

A saída é a seguinte -

```
>i4
```

Os exemplos a seguir mostram o uso do tipo de dados estruturado. Aqui, o nome do campo e o tipo de dados escalar correspondente devem ser declarados.

### Exemplo 4

```py
# primeiro crie um tipo de dados estruturado
import numpy as np
dt = np.dtype([('age',np.int8)])
print dt
```

A saída é a seguinte -

```py
[('age', 'i1')]
```

### Exemplo 5

```py
# agora aplique-o ao objeto ndarray
import numpy as np

dt = np.dtype([('age',np.int8)])
a = np.array([(10,),(20,),(30,)], dtype = dt)
print a
```

A saída é a seguinte -

```py
[(10,) (20,) (30,)]
```

### Exemplo 6

```py
# file name can be used to access content of age column
import numpy as np

dt = np.dtype([('age',np.int8)])
a = np.array([(10,),(20,),(30,)], dtype = dt)
print a['age']
```

A saída é a seguinte -

```py
[10 20 30]
```

### Exemplo 7

Os exemplos a seguir definem um tipo de dados estruturado chamado aluno com um campo de cadeia 'nome', um campo inteiro 'idade' e um campo _float_ 'marcas'. Este dtype é aplicado ao objeto ndarray.

```py
import numpy as np
aluno = np.dtype([('nome','S20'), ('idade', 'i1'), ('marcas', 'f4')])
print student
```

A saída é a seguinte -

```py
[('nome', 'S20'), ('idade', 'i1'), ('marcas', '<f4')])
```

### Exemplo 8

```py
import numpy as np

student = np.dtype([('name','S20'), ('age', 'i1'), ('marks', 'f4')])
a = np.array([('abc', 21, 50),('xyz', 18, 75)], dtype = student)
print a
```

A saída é a seguinte -

```py
[('abc', 21, 50.0), ('xyz', 18, 75.0)]
```

Cada tipo de dados interno possui um código de caractere que o identifica exclusivamente.

- __'b'__ - booleano

- __'i'__ - inteiro (assinado)

- __'u'__ - número inteiro não assinado

- __'f'__ - ponto flutuante

- __'c'__ - ponto flutuante complexo

- __'m'__ - timedelta

- __'M'__ - data e hora

- __'O'__ - objeto (Python)

- __'S', 'a'__ - (byte-)string

- __'U'__ - unicode

- __'V'__ - dados brutos (raw data) (sem valor)

**Fonte traduzida com adaptações:** [NumPy - Data Types](https://www.tutorialspoint.com/numpy/numpy_data_types.htm)
