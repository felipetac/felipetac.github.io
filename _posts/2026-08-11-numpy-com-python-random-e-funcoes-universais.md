---
layout: post
title: "#4 - Random e Funções Universais (ufunc) no NumPy"
date: 2026-08-11 14:00:00
image: '/assets/img/posts/numpy-com-python-random-e-funcoes-universais.webp'
description: Como gerar números aleatórios com numpy.random e o que são as ufuncs (funções universais), incluindo por que usá-las no lugar de loops puros em Python.
category: 'ciência de dados'
tags:
- Ciência de Dados
- Python
- Programação
- Numpy
twitter_text: Random e Funções Universais (ufunc) no NumPy
introduction: "Nesta parte do tutorial, você aprende a gerar números aleatórios com numpy.random e entende o que são e por que usar as ufuncs."
---

Fechando a série, dois assuntos que parecem sem relação à primeira vista, mas que aparecem lado a lado o tempo todo em código real de NumPy: geração de números aleatórios (muito usada pra simular dados, embaralhar amostras, inicializar experimentos) e as _ufuncs_, o mecanismo por trás de praticamente toda operação rápida que você já fez em um array até agora.

## O módulo numpy.random

O NumPy tem seu próprio gerador de números pseudo-aleatórios, separado do módulo `random` da biblioteca padrão do Python — e é ele que você deve usar quando o resultado é um _array_, porque é bem mais eficiente que gerar valor por valor em um loop.

### random.randint()

`np.random.randint()` gera um (ou vários) inteiros aleatórios dentro de um intervalo.

```py
import numpy as np

numero = np.random.randint(100)
print(numero)
```

A saída é (o valor exato muda a cada execução):

```py
73
```

Isso gera um inteiro entre 0 (incluso) e 100 (excluso). Com o parâmetro `size`, você gera um array inteiro de uma vez:

```py
arr = np.random.randint(100, size=(5,))
print(arr)

matriz = np.random.randint(100, size=(3, 4))
print(matriz)
```

A saída é:

```py
[45 12 87  3 66]
[[41 96  8 23]
 [59  2 74 31]
 [18 65 90  7]]
```

### random.rand()

Enquanto `randint()` gera inteiros, `np.random.rand()` gera floats aleatórios entre 0 e 1.

```py
numero = np.random.rand()
print(numero)

arr = np.random.rand(5)
print(arr)
```

A saída é:

```py
0.372819...
[0.15 0.89 0.34 0.61 0.02]
```

Assim como `randint()`, dá pra passar as dimensões direto como argumentos pra gerar um array multidimensional:

```py
matriz = np.random.rand(2, 3)
print(matriz)
```

A saída é:

```py
[[0.12 0.75 0.44]
 [0.90 0.03 0.58]]
```

### random.choice()

`np.random.choice()` sorteia valores a partir de um array que você fornece — em vez de um intervalo numérico genérico, você escolhe de que "conjunto" o sorteio sai.

```py
opcoes = np.array([3, 5, 7, 9])
sorteio = np.random.choice(opcoes, size=10)
print(sorteio)
```

A saída é:

```py
[7 3 9 5 7 7 3 9 5 7]
```

O mais interessante é o parâmetro `p`, que define a probabilidade de cada valor ser sorteado — as probabilidades precisam somar 1:

```py
opcoes = np.array([3, 5, 7, 9])
probabilidades = [0.1, 0.3, 0.6, 0.0]

sorteio = np.random.choice(opcoes, size=20, p=probabilidades)
print(sorteio)
```

A saída é:

```py
[7 7 5 3 7 5 7 7 3 5 7 7 5 7 7 3 5 7 7 5]
```

Com essas probabilidades, o valor `7` deve aparecer bem mais que os outros (60% de chance a cada sorteio), e o `9` nunca aparece (0% de chance). Repare que o `p` também pode receber uma tupla de `size`, gerando um array 2-D de sorteios de uma vez.

> **Nota:** por padrão, o NumPy usa um gerador global que muda de resultado a cada execução do script. Se você precisa de resultados reproduzíveis (por exemplo, pra comparar experimentos), vale pesquisar sobre `np.random.seed()` — assunto que passa longe do escopo deste post, mas é bom saber que existe.

## O que são ufuncs

_ufunc_ é abreviação de "universal function" — são as funções do NumPy que operam elemento a elemento sobre um _ndarray_, de forma vetorizada. `np.add()`, `np.sqrt()`, `np.sin()`, e praticamente qualquer função do NumPy que você já usou em um array inteiro, são ufuncs.

### Por que usar ufuncs em vez de loop puro

A resposta curta é: performance. Um loop `for` em Python percorre elemento por elemento na camada do interpretador, que é lenta. Uma ufunc empurra a operação pra dentro de código compilado (C), processando o array inteiro de uma vez — o que costuma ser ordens de magnitude mais rápido, especialmente em arrays grandes.

### Exemplo 1 — somando dois arrays sem ufunc

```py
x = [1, 2, 3, 4]
y = [4, 5, 6, 7]
z = []

for i, j in zip(x, y):
    z.append(i + j)

print(z)
```

A saída é:

```py
[5, 7, 9, 11]
```

Funciona, mas é Python "puro" percorrendo listas — sem nenhuma vetorização por baixo.

### Exemplo 2 — a mesma soma com np.add()

```py
import numpy as np

x = np.array([1, 2, 3, 4])
y = np.array([4, 5, 6, 7])

z = np.add(x, y)
print(z)
```

A saída é:

```py
[ 5  7  9 11]
```

Mesmo resultado, mas a soma inteira acontece dentro do NumPy, sem passar elemento por elemento pelo interpretador Python. Em um array de 4 elementos a diferença é irrelevante; em um array de alguns milhões, é o tipo de coisa que separa um script que roda em segundos de um que roda em minutos.

### Verificando se algo é uma ufunc

Toda ufunc tem o tipo `numpy.ufunc`. Dá pra checar isso com `type()`:

```py
print(type(np.add))
print(type(np.concatenate))
```

A saída é:

```py
<class 'numpy.ufunc'>
<class 'function'>
```

`np.add` é uma ufunc de verdade; `np.concatenate`, apesar de também ser uma função do NumPy, não segue esse mecanismo — é uma função Python comum por baixo.

## Criando sua própria ufunc

Você também pode transformar uma função Python normal em uma ufunc, usando `np.frompyfunc()`. Isso não te dá o ganho de performance de uma ufunc nativa (ela continua rodando em Python por baixo), mas te dá o comportamento vetorizado — aplicar a função elemento a elemento automaticamente, sem escrever loop.

### Exemplo 1

```py
def triplica(x):
    return x * 3

minha_ufunc = np.frompyfunc(triplica, 1, 1)

resultado = minha_ufunc([1, 2, 3, 4])
print(resultado)
print(type(minha_ufunc))
```

A saída é:

```py
[3 6 9 12]
<class 'numpy.ufunc'>
```

Os dois últimos argumentos de `frompyfunc()` são: quantos arrays de entrada a função espera, e quantos arrays de saída ela produz. No exemplo acima, `triplica` recebe 1 valor e retorna 1 valor, então é `frompyfunc(triplica, 1, 1)`.

### Exemplo 2 — uma ufunc com dois argumentos

```py
def soma_customizada(x, y):
    return x + y

minha_soma = np.frompyfunc(soma_customizada, 2, 1)

resultado = minha_soma([1, 2, 3], [10, 20, 30])
print(resultado)
```

A saída é:

```py
[11 22 33]
```

## Operações aritméticas vetorizadas

Já vimos `np.add()` lá em cima, mas existe uma ufunc equivalente pra cada operador aritmético — e todas funcionam elemento a elemento entre dois arrays de mesmo tamanho.

### Comparando operador direto com a ufunc

Na prática, pra aritmética simples, você quase nunca precisa chamar a ufunc pelo nome: os operadores `+`, `-`, `*`, `/` já são vetorizados quando aplicados diretamente em arrays do NumPy.

```py
x = np.array([10, 20, 30, 40])
y = np.array([1, 2, 3, 4])

print(x + y)
print(np.add(x, y))
```

A saída é:

```py
[11 22 33 44]
[11 22 33 44]
```

Os dois retornam exatamente o mesmo resultado — `x + y` chama `np.add()` por baixo dos panos.

### Outras ufuncs aritméticas

```py
x = np.array([10, 20, 30, 40])
y = np.array([3, 4, 5, 6])

print(np.subtract(x, y))
print(np.multiply(x, y))
print(np.divide(x, y))
print(np.power(x, y))
print(np.mod(x, y))
```

A saída é:

```py
[ 7 16 25 34]
[ 30  80 150 240]
[3.33 5.   6.   6.67]
[     1000   160000 24300000 4096000000]
[1 0 0 4]
```

`np.subtract`, `np.multiply` e `np.divide` correspondem a `-`, `*` e `/`. `np.power` eleva cada elemento de `x` à potência do elemento correspondente em `y`. `np.mod` retorna o resto da divisão — equivalente ao operador `%`.

> **Nota:** o motivo de existir uma ufunc nomeada pra cada operador (além do próprio operador) é que as funções aceitam parâmetros extras — por exemplo `where`, pra aplicar a operação só onde uma condição é verdadeira — algo que o operador `+` sozinho não permite.

Com isso fecho a série "NumPy com Python": criação e indexação de arrays, copy/view, shape e iteração, join/split/search/sort, e agora random e ufuncs. É uma base sólida pra seguir pra bibliotecas construídas em cima do NumPy, como pandas e scikit-learn.

**Fonte adaptada:** [Random Numbers in NumPy](https://www.w3schools.com/python/numpy/numpy_random.asp), [Random Data Distribution](https://www.w3schools.com/python/numpy/numpy_random_distribution.asp), [NumPy ufuncs](https://www.w3schools.com/python/numpy/numpy_ufunc.asp), [Create Your Own ufunc](https://www.w3schools.com/python/numpy/numpy_ufunc_create_function.asp), [Simple Arithmetic](https://www.w3schools.com/python/numpy/numpy_ufunc_simple_arithmetic.asp)
