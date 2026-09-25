---
layout: post
title: "Machine Learning #6 - Regressão Linear"
date: 2026-09-25 13:20:00
image: '/assets/img/posts/ml-regressao-linear.webp'
description: Como traçar uma reta de regressão linear com SciPy, medir a força da relação entre duas variáveis com o coeficiente r, e usar isso pra prever valores futuros.
category: 'ciência de dados'
tags:
- Python
- Programação
- Regressão
twitter_text: "Machine Learning #6 - Regressão Linear"
introduction: "Nesta parte da série, você vai aprender a traçar uma reta de regressão linear, medir a força dessa relação com o coeficiente r, e prever valores futuros."
---

No post anterior, o gráfico de dispersão dos carros deu a impressão de que carros mais novos andam mais rápido — mas "parece que existe uma relação" não é a mesma coisa que "existe uma relação". **Regressão** é o termo usado quando se tenta encontrar essa relação entre variáveis, e a **regressão linear** faz isso traçando uma reta através dos pontos, uma reta que depois pode ser usada pra prever valores novos.

## Traçando a reta de regressão

Usando o mesmo dataset de 13 carros — `x` é a idade, `y` é a velocidade — o módulo `scipy.stats` calcula tudo que é preciso pra desenhar a reta.

```py
import matplotlib.pyplot as plt
from scipy import stats

x = [5, 7, 8, 7, 2, 17, 2, 9, 4, 11, 12, 9, 6]
y = [99, 86, 87, 88, 111, 86, 103, 87, 94, 78, 77, 85, 86]

slope, intercept, r, p, std_err = stats.linregress(x, y)

def minha_funcao(x):
    return slope * x + intercept

meu_modelo = list(map(minha_funcao, x))

plt.scatter(x, y)
plt.plot(x, meu_modelo)
plt.show()
```

Passo a passo: `stats.linregress(x, y)` retorna cinco valores importantes — `slope` (inclinação), `intercept` (interceptação), `r` (correlação), `p` e `std_err`. A função `minha_funcao()` usa `slope` e `intercept` pra transformar cada valor de `x` no ponto correspondente da reta; `map()` aplica essa função a cada valor de `x`, gerando `meu_modelo` — os valores de `y` que formam a reta. No final, o gráfico mostra o scatter plot original com a reta de regressão desenhada por cima.

## R: o coeficiente de correlação

Antes de confiar numa reta de regressão, é importante saber o quão forte é a relação entre `x` e `y` — se não houver relação nenhuma, a regressão linear não serve pra prever nada. Essa força é medida pelo coeficiente `r`, que varia de -1 a 1: 0 significa nenhuma relação, e 1 (ou -1) significa uma relação perfeita.

```py
from scipy import stats

x = [5, 7, 8, 7, 2, 17, 2, 9, 4, 11, 12, 9, 6]
y = [99, 86, 87, 88, 111, 86, 103, 87, 94, 78, 77, 85, 86]

slope, intercept, r, p, std_err = stats.linregress(x, y)

print(r)
```

A saída é:

```py
-0.76
```

O resultado -0.76 mostra que existe uma relação — não perfeita, mas forte o suficiente pra indicar que a regressão linear pode ser usada em previsões futuras.

## Prevendo valores futuros

Com a reta calculada, dá pra prever a velocidade de um carro só pela idade — por exemplo, de um carro de 10 anos.

```py
from scipy import stats

x = [5, 7, 8, 7, 2, 17, 2, 9, 4, 11, 12, 9, 6]
y = [99, 86, 87, 88, 111, 86, 103, 87, 94, 78, 77, 85, 86]

slope, intercept, r, p, std_err = stats.linregress(x, y)

def minha_funcao(x):
    return slope * x + intercept

velocidade = minha_funcao(10)

print(velocidade)
```

A saída é:

```py
85.6
```

## Quando a regressão linear não serve

Nem todo par de variáveis tem uma relação linear. Veja um dataset onde os valores de `x` e `y` não guardam relação nenhuma entre si:

```py
import matplotlib.pyplot as plt
from scipy import stats

x = [89, 43, 36, 36, 95, 10, 66, 34, 38, 20, 26, 29, 48, 64, 6, 5, 36, 66, 72, 40]
y = [21, 46, 3, 35, 67, 95, 53, 72, 58, 10, 26, 34, 90, 33, 38, 20, 56, 2, 47, 15]

slope, intercept, r, p, std_err = stats.linregress(x, y)

print(r)
```

A saída é:

```py
0.013
```

Um `r` de 0.013 indica uma relação péssima — bem perto de zero — e mostra que esse dataset não é adequado pra regressão linear. Traçar uma reta aqui não ajudaria a prever nada com confiança.

> **Nota:** sempre confira o valor de `r` antes de confiar numa reta de regressão. Uma reta bonita no gráfico não significa nada se `r` estiver perto de zero.

Quando os pontos não seguem uma linha reta, mas ainda assim têm um padrão, existe uma alternativa — e é justamente o assunto do próximo post: regressão polinomial e múltipla.

**Fonte adaptada:** [Linear Regression](https://www.w3schools.com/python/python_ml_linear_regression.asp)
