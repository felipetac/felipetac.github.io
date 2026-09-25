---
layout: post
title: "NumPy #8 - Estatísticas Descritivas"
date: 2026-08-11 16:48:00
image: '/assets/img/posts/numpy-com-python-estatisticas-descritivas.webp'
description: Como calcular soma, média, mediana, desvio padrão e percentil com NumPy, controlando o eixo do cálculo com axis e mantendo as dimensões do resultado com keepdims.
category: 'ciência de dados'
tags:
- Ciência de Dados
- Python
- Programação
- Numpy
twitter_text: "NumPy #8 - Estatísticas Descritivas"
introduction: "Nesta parte do tutorial, você vai aprender a calcular soma, média, mediana, desvio padrão e percentil com NumPy, controlando o eixo do cálculo."
---

No [post anterior](/numpy-com-python-broadcasting-e-algebra-linear/), você viu broadcasting e álgebra linear. Se você já leu a série de Machine Learning aqui do blog, já viu média, mediana e desvio padrão do lado conceitual — o que esses números significam. Aqui o foco é outro: como calcular tudo isso com o NumPy, em especial o parâmetro `axis`, que decide se a estatística é calculada sobre o array inteiro ou linha a linha/coluna a coluna.

## Soma e média com axis

Sem `axis`, toda função estatística do NumPy colapsa o array inteiro em um único número. Com `axis`, o cálculo passa a respeitar a estrutura de linhas e colunas.

```py
import numpy as np

matriz = np.array([[1, 2, 3],
                    [4, 5, 6]])

print(np.sum(matriz))
print(np.sum(matriz, axis=0))
print(np.sum(matriz, axis=1))
```

A saída é:

```py
21
[5 7 9]
[ 6 15]
```

Sem `axis`, a soma é de todos os 6 elementos (`21`). Com `axis=0`, a soma acontece "descendo" as colunas — soma o primeiro elemento de cada linha, depois o segundo, e assim por diante (`[1+4, 2+5, 3+6]`). Com `axis=1`, a soma acontece "atravessando" cada linha (`[1+2+3, 4+5+6]`).

`np.mean()` segue exatamente a mesma lógica de `axis`:

```py
print(np.mean(matriz))
print(np.mean(matriz, axis=0))
print(np.mean(matriz, axis=1))
```

A saída é:

```py
3.5
[2.5 3.5 4.5]
[2. 5.]
```

> **Nota:** é fácil confundir `axis=0` com "linha" e `axis=1` com "coluna" — mas é o contrário do que parece à primeira vista. `axis=0` percorre **através das linhas** (resultado tem uma entrada por coluna); `axis=1` percorre **através das colunas** (resultado tem uma entrada por linha). Vale reler esse parágrafo umas duas vezes até grudar.

## Mediana, desvio padrão e variância

```py
arr = np.array([7, 1, 5, 3, 9])

print(np.median(arr))
```

A saída é:

```py
5.0
```

`np.median()` ordena o array internamente e pega o valor do meio (`[1, 3, 5, 7, 9]` → `5`). Em um array com número par de elementos, a mediana é a média dos dois valores centrais.

```py
notas = np.array([2, 4, 4, 4, 5, 5, 7, 9])

print(np.std(notas))
print(np.var(notas))
```

A saída é:

```py
2.0
4.0
```

`np.var()` calcula a variância (a média do quadrado da distância de cada valor até a média do array); `np.std()` é a raiz quadrada da variância — o desvio padrão. Os dois também aceitam `axis`, do mesmo jeito que `sum()` e `mean()`, pra calcular por linha ou por coluna em uma matriz.

### Exemplo prático — padronização (z-score)

Uma aplicação muito comum de média e desvio padrão juntos é a padronização (ou "z-score"): transformar os dados pra que fiquem centrados em `0`, com desvio padrão `1` — o que facilita comparar variáveis em escalas bem diferentes entre si (uma técnica que provavelmente você vai rever quando chegar em normalização de dados pra Machine Learning).

```py
notas = np.array([2, 4, 4, 4, 5, 5, 7, 9])

z_scores = (notas - np.mean(notas)) / np.std(notas)
print(z_scores)
```

A saída é:

```py
[-1.5 -0.5 -0.5 -0.5  0.   0.   1.   2. ]
```

Cada valor original foi subtraído da média (`5`) e dividido pelo desvio padrão (`2`) — o `2`, que estava exatamente na média, virou `0`; o `9`, que estava 2 desvios padrão acima da média, virou `2`. Repare que essa conta inteira aconteceu sem nenhum loop: `notas - np.mean(notas)` já é broadcasting (o escalar `mean` sendo subtraído de cada elemento), visto no post anterior.

## Mínimo, máximo e percentil

```py
matriz = np.array([[1, 2, 3],
                    [4, 5, 6]])

print(np.min(matriz, axis=0))
print(np.max(matriz, axis=1))
```

A saída é:

```py
[1 2 3]
[3 6]
```

`np.percentile()` generaliza a mediana: em vez de fixar em "o valor do meio" (percentil 50), você escolhe qualquer ponto de corte entre 0 e 100.

```py
arr = np.arange(1, 11)

print(np.percentile(arr, 25))
print(np.percentile(arr, 50))
print(np.percentile(arr, 75))
```

A saída é:

```py
3.25
5.5
7.75
```

O percentil 50 é a mediana (`5.5`, já que o array tem 10 elementos e número par não tem valor central único). O percentil 25 diz que 25% dos valores do array estão abaixo de `3.25`; o percentil 75, que 75% estão abaixo de `7.75`. É a mesma lógica usada pra descrever quartis em análise de dados.

## Mantendo as dimensões com keepdims

Por padrão, calcular uma estatística com `axis` "achata" a dimensão usada no cálculo — uma matriz `(2, 3)` com `axis=1` vira um array `(2,)`. Às vezes isso atrapalha uma operação seguinte (como broadcasting de volta contra a matriz original), e é pra isso que existe `keepdims`.

```py
matriz = np.array([[1, 2, 3],
                    [4, 5, 6]])

soma_normal = np.sum(matriz, axis=1)
soma_keepdims = np.sum(matriz, axis=1, keepdims=True)

print(soma_normal, soma_normal.shape)
print(soma_keepdims, soma_keepdims.shape)
```

A saída é:

```py
[ 6 15] (2,)
[[ 6]
 [15]] (2, 1)
```

Com `keepdims=True`, o resultado continua sendo uma matriz `(2, 1)` em vez de um array `(2,)` — o que, por broadcasting (visto no post anterior), permite dividir `matriz` inteira por essa soma linha a linha sem erro de shape (`matriz / soma_keepdims`), algo que `matriz / soma_normal` não faria da forma esperada.

Com estatísticas resolvidas, sobrou o assunto que a série vem adiando desde o post de random: as distribuições de probabilidade. É pra lá que a gente vai nos próximos dois posts.

**Fonte adaptada:** [NumPy - Sum](https://www.tutorialspoint.com/numpy/numpy_sum.htm), [NumPy - Mean](https://www.tutorialspoint.com/numpy/numpy_mean.htm), [NumPy - Median](https://www.tutorialspoint.com/numpy/numpy_median.htm), [NumPy - Statistical Functions](https://www.tutorialspoint.com/numpy/numpy_statistical_functions.htm)
