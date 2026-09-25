---
layout: post
title: "#2 - Média, Mediana e Moda"
date: 2026-09-25 12:00:00
image: '/assets/img/posts/ml-media-mediana-e-moda.webp'
description: Como calcular média, mediana e moda de um conjunto de números em Python usando NumPy e SciPy - os três valores centrais mais usados em Machine Learning.
category: 'ciência de dados'
tags:
- Python
- Programação
- Estatística
twitter_text: Média, Mediana e Moda em Python
introduction: "Nesta parte da série, você vai aprender a calcular média, mediana e moda de um conjunto de dados usando NumPy e SciPy."
---

O que dá pra aprender só olhando pra um grupo de números? Em Machine Learning (e em matemática, de forma geral), três valores costumam interessar bastante: a **média**, o valor médio; a **mediana**, o valor do meio; e a **moda**, o valor mais comum.

Vamos usar a velocidade de 13 carros pra calcular os três:

```py
velocidades = [99, 86, 87, 88, 111, 86, 103, 87, 94, 78, 77, 85, 86]
```

## Média

A média é o valor médio — soma-se todos os valores e divide-se pelo total de valores: `(99+86+87+88+111+86+103+87+94+78+77+85+86) / 13 = 89.77`. O NumPy já tem um método pronto pra isso.

```py
import numpy

velocidades = [99, 86, 87, 88, 111, 86, 103, 87, 94, 78, 77, 85, 86]

x = numpy.mean(velocidades)

print(x)
```

A saída é:

```py
89.76923076923077
```

## Mediana

A mediana é o valor que fica bem no meio, depois de ordenar todos os valores. Ordenando a lista de velocidades: `77, 78, 85, 86, 86, 86, 87, 87, 88, 94, 99, 103, 111` — com 13 valores, o valor central (o sétimo) é 87.

```py
import numpy

velocidades = [99, 86, 87, 88, 111, 86, 103, 87, 94, 78, 77, 85, 86]

x = numpy.median(velocidades)

print(x)
```

A saída é:

```py
87.0
```

> **Nota:** é essencial que os números estejam ordenados antes de encontrar a mediana — `numpy.median()` já cuida disso internamente, mas se você calculasse na mão, esquecer de ordenar primeiro dá um resultado errado.

Se a lista tiver uma quantidade **par** de valores, a mediana é a média dos dois valores do meio. Por exemplo, removendo o 111 da lista original, sobram 12 valores: `[99, 86, 87, 88, 86, 103, 87, 94, 78, 77, 85, 86]`, que ordenados ficam `77, 78, 85, 86, 86, 86, 87, 87, 88, 94, 99, 103` — os dois valores centrais são 86 e 87, e a mediana é `(86 + 87) / 2 = 86.5`.

```py
import numpy

velocidades = [99, 86, 87, 88, 86, 103, 87, 94, 78, 77, 85, 86]

x = numpy.median(velocidades)

print(x)
```

A saída é:

```py
86.5
```

## Moda

A moda é o valor que aparece com mais frequência. Na lista original, o 86 aparece 3 vezes — mais que qualquer outro valor. O SciPy tem um método pronto pra isso.

```py
from scipy import stats

velocidades = [99, 86, 87, 88, 111, 86, 103, 87, 94, 78, 77, 85, 86]

x = stats.mode(velocidades)

print(x)
```

A saída é:

```py
ModeResult(mode=86, count=3)
```

Média, mediana e moda são técnicas usadas o tempo todo em Machine Learning, então vale a pena entender bem o conceito por trás de cada uma — elas são a base pro próximo assunto: medir o quanto os dados de um conjunto estão espalhados, com desvio padrão e percentis.

**Fonte adaptada:** [Mean Median Mode](https://www.w3schools.com/python/python_ml_mean_median_mode.asp)
