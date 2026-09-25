---
layout: post
title: "NumPy #5 - Arredondamento, Logaritmos e Somas/Produtos Acumulados"
date: 2026-08-11 16:42:00
image: '/assets/img/posts/numpy-com-python-arredondamento-logaritmos-e-somas-acumuladas.webp'
description: Como arredondar valores com trunc, floor e ceil, calcular logaritmos com log2, log10 e log, e acumular somas e produtos com cumsum, cumprod e diff no NumPy.
category: 'ciência de dados'
tags:
- Ciência de Dados
- Python
- Programação
- Numpy
twitter_text: "NumPy #5 - Arredondamento, Logaritmos e Somas/Produtos Acumulados"
introduction: "Nesta parte do tutorial, você vai aprender a arredondar valores, calcular logaritmos e acumular somas e produtos usando ufuncs do NumPy."
---

No [post anterior da série](/numpy-com-python-random-e-funcoes-universais/), você viu o que são as _ufuncs_ e como as operações aritméticas básicas (`np.add()`, `np.subtract()` e companhia) são só a porta de entrada desse mecanismo. O catálogo de ufuncs do NumPy é bem maior que isso — hoje a gente segue com funções de arredondamento, logaritmos em diferentes bases, e as formas de acumular somas e produtos ao longo de um array.

## Arredondando valores

O NumPy tem várias formas de arredondar um número, e cada uma se comporta de um jeito diferente com valores negativos — vale conhecer as quatro antes de escolher qual usar.

### np.trunc() e np.fix()

`np.trunc()` e `np.fix()` removem a parte decimal, sempre "cortando" na direção do zero — não importa se o número é positivo ou negativo.

```py
import numpy as np

arr = np.array([-3.1666, 3.6667])

print(np.trunc(arr))
print(np.fix(arr))
```

A saída é:

```py
[-3.  3.]
[-3.  3.]
```

Repare que `-3.1666` virou `-3.0`, não `-4.0` — a truncagem descarta a parte decimal em vez de arredondar pra baixo. Na prática, `trunc()` e `fix()` fazem a mesma coisa; `fix()` existe como um nome alternativo mais alinhado com outras bibliotecas numéricas.

### np.around()

`np.around()` arredonda para o número de casas decimais que você definir, seguindo a regra de arredondamento matemático (pra cima a partir de 5).

```py
arr = np.array([3.1666, 3.6667])

print(np.around(arr, 2))
```

A saída é:

```py
[3.17 3.67]
```

> **Nota:** `np.round()` (com "o" duplo) existe como um segundo nome pra exatamente a mesma função — `np.round is np.around` dá `True`. Os dois aparecem em código por aí; use o que preferir, não há diferença de comportamento entre eles.

### np.floor() e np.ceil()

`np.floor()` sempre arredonda pra baixo (na direção de menos infinito); `np.ceil()` sempre arredonda pra cima (na direção de mais infinito) — diferente de `trunc()`, que arredonda na direção do zero.

```py
arr = np.array([-3.1666, 3.6667])

print(np.floor(arr))
print(np.ceil(arr))
```

A saída é:

```py
[-4.  3.]
[-3.  4.]
```

> **Nota:** é fácil confundir `floor()`/`ceil()` com `trunc()`/`fix()` porque em números positivos eles dão o mesmo resultado. A diferença só aparece com negativos: `floor(-3.16)` é `-4` (desce), enquanto `trunc(-3.16)` é `-3` (corta na direção do zero).

## Logaritmos

O NumPy oferece ufuncs prontas pras bases de log mais usadas — base 2, base 10 e natural (base _e_) — e um jeito de calcular logaritmo em qualquer outra base.

### np.log2(), np.log10() e np.log()

```py
arr_log2 = np.array([2, 4, 8, 16, 32])
arr_log10 = np.array([1, 10, 100, 1000])
arr_log = np.array([1, np.e, np.e ** 2])

print(np.log2(arr_log2))
print(np.log10(arr_log10))
print(np.log(arr_log))
```

A saída é:

```py
[1. 2. 3. 4. 5.]
[0. 1. 2. 3.]
[0. 1. 2.]
```

Escolhi valores que são potências exatas de cada base só pra deixar o resultado redondo e fácil de conferir — na prática, o array de entrada raramente vem tão arrumado assim.

### Log em uma base arbitrária

O NumPy não tem uma ufunc pronta pra "log em qualquer base", mas dá pra criar uma combinando `np.frompyfunc()` (visto no post anterior) com `math.log()`, que aceita a base como segundo argumento.

```py
import math

log_generico = np.frompyfunc(math.log, 2, 1)

resultado = log_generico(100, 15)
print(resultado)
```

A saída é:

```py
1.7005483074552052
```

`math.log(100, 15)` calcula o logaritmo de 100 na base 15. Como vimos no post anterior, `frompyfunc(func, 2, 1)` diz que a função recebe 2 argumentos de entrada e devolve 1 de saída — o que permite aplicar `log_generico()` em arrays inteiros, não só em números soltos.

> **Nota:** logs de números não positivos não geram erro — o NumPy retorna `-inf` (para 0) ou `nan` (para negativos) e emite um aviso (`RuntimeWarning`) no lugar de interromper o script.

## Somas e produtos acumulados

Além da soma elemento a elemento que você já viu com `np.add()`, o NumPy tem funções pra somar (ou multiplicar) **todos** os elementos de um array, com ou sem manter o histórico da acumulação.

### np.sum() com axis

`np.sum()` soma todos os elementos de um array (ou de vários arrays) em um único valor.

```py
arr1 = np.array([1, 2, 3])
arr2 = np.array([4, 5, 6])

print(np.sum([arr1, arr2]))
print(np.sum([arr1, arr2], axis=1))
```

A saída é:

```py
21
[ 6 15]
```

Sem `axis`, `np.sum()` soma absolutamente tudo (`1+2+3+4+5+6 = 21`). Com `axis=1`, a soma acontece dentro de cada sub-array separadamente — `arr1` soma `6`, `arr2` soma `15`. É a mesma lógica de `axis` que apareceu no post de join/split: `axis=0` percorre linhas, `axis=1` percorre colunas.

### np.cumsum() — soma acumulada

`np.cumsum()` não colapsa o array em um único número — ele devolve, pra cada posição, a soma de tudo até ali.

```py
arr = np.array([1, 2, 3, 4])

print(np.cumsum(arr))
```

A saída é:

```py
[ 1  3  6 10]
```

O primeiro valor é só `1`; o segundo é `1+2=3`; o terceiro é `1+2+3=6`; e assim por diante. É útil, por exemplo, pra calcular um saldo acumulado dia a dia a partir de uma lista de valores diários.

### np.prod() e np.cumprod()

`np.prod()` e `np.cumprod()` seguem exatamente a mesma lógica de `sum()`/`cumsum()`, trocando soma por multiplicação.

```py
arr = np.array([1, 2, 3])

print(np.prod(arr))
print(np.cumprod(arr))
```

A saída é:

```py
6
[1 2 6]
```

`np.prod()` multiplica tudo (`1*2*3=6`); `np.cumprod()` devolve o produto acumulado em cada posição (`1`, `1*2=2`, `1*2*3=6`).

### np.diff() — diferença entre elementos consecutivos

`np.diff()` faz o caminho inverso de uma soma acumulada: calcula a diferença entre cada elemento e o anterior.

```py
arr = np.array([10, 15, 25, 5])

print(np.diff(arr))
print(np.diff(arr, n=2))
```

A saída é:

```py
[  5  10 -20]
[  5 -30]
```

A primeira diferença já era esperada (`15-10=5`, `25-15=10`, `5-25=-20`). Com `n=2`, o NumPy repete a operação — calcula a diferença do resultado anterior (`[5, 10, -20]` vira `[10-5, -20-10] = [5, -30]`). É uma forma rápida de detectar variação (por exemplo, entre medições de um sensor) sem escrever um loop manual.

### Exemplo prático — juros compostos com cumprod()

Uma aplicação bem direta de `cumprod()` é calcular o crescimento acumulado de um capital sujeito a taxas de retorno diferentes a cada período — em vez de somar percentuais (o que dá resultado errado quando a taxa é composta), você multiplica os fatores de crescimento.

```py
taxas = np.array([1.02, 1.03, 0.98, 1.05])

crescimento_acumulado = np.cumprod(taxas)
print(crescimento_acumulado)
```

A saída é:

```py
[1.02     1.0506   1.029588 1.081067]
```

Cada `1.02`, `1.03`, `0.98` e `1.05` representa um fator de crescimento por período (`1.02` = alta de 2%, `0.98` = queda de 2%). Depois de 4 períodos, o capital original ficou multiplicado por `1.081067` — um crescimento acumulado de cerca de 8,1%, mesmo com um período de queda no meio do caminho. Sem `cumprod()`, você precisaria de um loop multiplicando o resultado anterior a cada iteração.

Arredondamento, logaritmos e acumulação cobrem boa parte do dia a dia com ufuncs, mas ainda faltam alguns clássicos — mínimo múltiplo comum, máximo divisor comum, trigonometria e operações de conjunto. É pra lá que a gente vai no próximo post da série.

**Fonte adaptada:** [NumPy Rounding Decimals](https://www.w3schools.com/python/numpy/numpy_ufunc_rounding_decimals.asp), [NumPy Logs](https://www.w3schools.com/python/numpy/numpy_ufunc_logs.asp), [NumPy Summations](https://www.w3schools.com/python/numpy/numpy_ufunc_summations.asp), [NumPy Products](https://www.w3schools.com/python/numpy/numpy_ufunc_products.asp), [NumPy Differences](https://www.w3schools.com/python/numpy/numpy_ufunc_differences.asp)
