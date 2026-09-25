---
layout: post
title: "Machine Learning #3 - Desvio Padrão e Percentis"
date: 2026-09-25 12:20:00
image: '/assets/img/posts/ml-desvio-padrao-e-percentis.webp'
description: Como medir o quanto os valores de um conjunto de dados estão espalhados usando desvio padrão e variância, e como encontrar percentis com NumPy.
category: 'ciência de dados'
tags:
- Python
- Programação
- Estatística
twitter_text: "Machine Learning #3 - Desvio Padrão e Percentis"
introduction: "Nesta parte da série, você vai aprender a medir o quanto os dados estão espalhados com desvio padrão e variância, e a encontrar percentis com NumPy."
---

Média, mediana e moda resumem um conjunto de dados num único número — mas nenhuma delas diz o quanto esses valores estão espalhados entre si. É pra isso que serve o **desvio padrão**.

## Desvio padrão

O desvio padrão é um número que descreve o quanto os valores estão espalhados. Um desvio padrão baixo significa que a maioria dos números está perto da média; um desvio padrão alto significa que os valores estão espalhados por um intervalo maior.

Um exemplo com valores próximos entre si:

```py
import numpy

velocidades = [86, 87, 88, 86, 87, 85, 86]

x = numpy.std(velocidades)

print(x)
```

A saída é:

```py
0.9
```

O desvio padrão é 0.9, o que significa que a maioria dos valores está a uma distância de 0.9 da média, que é 86.4.

Agora um exemplo com valores mais espalhados:

```py
import numpy

velocidades = [32, 111, 138, 28, 59, 77, 97]

x = numpy.std(velocidades)

print(x)
```

A saída é:

```py
37.85
```

Um desvio padrão de 37.85, contra a média de 77.4, confirma que quanto maior o desvio padrão, mais espalhados estão os valores.

## Variância

Variância é outro número que indica o espalhamento dos dados. Na verdade, a raiz quadrada da variância é o próprio desvio padrão — e, ao contrário, elevando o desvio padrão ao quadrado, você chega na variância.

Calculando manualmente, com a lista `[32, 111, 138, 28, 59, 77, 97]`:

1. Encontre a média: `(32+111+138+28+59+77+97) / 7 = 77.4`
2. Para cada valor, encontre a diferença em relação à média: `32 - 77.4 = -45.4`, `111 - 77.4 = 33.6`, `138 - 77.4 = 60.6`, `28 - 77.4 = -49.4`, `59 - 77.4 = -18.4`, `77 - 77.4 = -0.4`, `97 - 77.4 = 19.6`.
3. Eleve cada diferença ao quadrado: `2061.16`, `1128.96`, `3672.36`, `2440.36`, `338.56`, `0.16`, `384.16`.
4. A variância é a média dessas diferenças ao quadrado: `(2061.16+1128.96+3672.36+2440.36+338.56+0.16+384.16) / 7 = 1432.25`.

```py
import numpy

velocidades = [32, 111, 138, 28, 59, 77, 97]

x = numpy.var(velocidades)

print(x)
```

A saída é:

```py
1432.25
```

E, como esperado, a raiz quadrada da variância dá o desvio padrão: `√1432.25 = 37.85` — o mesmo valor calculado com `numpy.std()` mais acima.

> **Nota:** desvio padrão costuma ser representado pelo símbolo sigma (σ), e a variância por sigma ao quadrado (σ²).

## Percentis

Percentis são usados em estatística pra dar um número que descreve o valor abaixo do qual uma certa porcentagem dos dados se encontra. Considere as idades de 21 pessoas de uma mesma rua:

```py
idades = [5, 31, 43, 48, 50, 41, 7, 11, 15, 39, 80, 82, 32, 2, 8, 6, 25, 36, 27, 61, 31]
```

Qual é o percentil 75? A resposta é 43 — ou seja, 75% das pessoas têm 43 anos ou menos.

```py
import numpy

idades = [5, 31, 43, 48, 50, 41, 7, 11, 15, 39, 80, 82, 32, 2, 8, 6, 25, 36, 27, 61, 31]

x = numpy.percentile(idades, 75)

print(x)
```

A saída é:

```py
43.0
```

E qual é a idade que 90% das pessoas têm ou menos?

```py
import numpy

idades = [5, 31, 43, 48, 50, 41, 7, 11, 15, 39, 80, 82, 32, 2, 8, 6, 25, 36, 27, 61, 31]

x = numpy.percentile(idades, 90)

print(x)
```

A saída é:

```py
61.0
```

Com média, mediana, moda, desvio padrão e percentis, você já tem o básico de estatística descritiva pronto. No próximo post, você vai ver como visualizar esses conceitos junto com a forma que um conjunto de dados assume: sua distribuição.

**Fonte adaptada:** [Standard Deviation](https://www.w3schools.com/python/python_ml_standard_deviation.asp), [Percentile](https://www.w3schools.com/python/python_ml_percentile.asp)
