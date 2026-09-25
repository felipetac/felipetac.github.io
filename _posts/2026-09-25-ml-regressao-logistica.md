---
layout: post
title: "Machine Learning | #12 - Regressão Logística"
date: 2026-09-25 15:20:00
image: '/assets/img/posts/ml-regressao-logistica.webp'
description: Como usar regressão logística para prever resultados categóricos (sim/não) em Python, e como interpretar coeficiente, odds e probabilidade de cada previsão.
category: 'ciência de dados'
tags:
- Python
- Programação
- Regressão
twitter_text: Regressão Logística em Python
introduction: "Nesta parte da série, você vai aprender a usar regressão logística pra prever resultados categóricos, e a interpretar coeficiente, odds e probabilidade."
---

As regressões dos posts anteriores preveem um número contínuo — velocidade, emissão de CO2. A **regressão logística** resolve um problema diferente: prever resultados categóricos. No caso mais simples, com só duas saídas possíveis (chamado _binomial_) — por exemplo, prever se um tumor é maligno ou benigno.

## Como funciona

`X` guarda o tamanho de 12 tumores (em centímetros); `y` guarda se cada um é canceroso (1) ou não (0).

```py
import numpy
from sklearn import linear_model

# X precisa virar uma coluna (em vez de uma linha) pra função LogisticRegression() funcionar
X = numpy.array([3.78, 2.44, 2.09, 0.14, 1.72, 1.65, 4.92, 4.37, 4.96, 4.52, 3.69, 5.88]).reshape(-1, 1)
y = numpy.array([0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1])

logr = linear_model.LogisticRegression()
logr.fit(X, y)

# prever se um tumor de 3.46cm é canceroso
previsto = logr.predict(numpy.array([3.46]).reshape(-1, 1))
print(previsto)
```

A saída é:

```py
[0]
```

O modelo prevê que um tumor de 3.46cm **não** é canceroso.

## Coeficiente

Na regressão logística, o coeficiente é a mudança esperada no log-odds (log das chances) de ocorrer o resultado, por unidade de mudança em `X`. Isso não é muito intuitivo sozinho — mas exponenciando o coeficiente, chegamos num número bem mais fácil de interpretar: o **odds** (razão de chances).

```py
import numpy
from sklearn import linear_model

X = numpy.array([3.78, 2.44, 2.09, 0.14, 1.72, 1.65, 4.92, 4.37, 4.96, 4.52, 3.69, 5.88]).reshape(-1, 1)
y = numpy.array([0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1])

logr = linear_model.LogisticRegression()
logr.fit(X, y)

log_odds = logr.coef_
odds = numpy.exp(log_odds)

print(odds)
```

A saída é:

```py
[4.03541657]
```

Isso significa que, a cada 1mm de aumento no tamanho de um tumor, as chances dele ser canceroso aumentam 4 vezes.

## Probabilidade

Combinando o coeficiente com o intercepto, dá pra calcular a probabilidade exata de cada tumor ser canceroso, em vez de só a classificação final (0 ou 1).

```py
def logit2prob(logr, x):
    log_odds = logr.coef_ * x + logr.intercept_
    odds = numpy.exp(log_odds)
    probabilidade = odds / (1 + odds)
    return probabilidade
```

A função segue três passos:

1. Calcula o log-odds — igual à fórmula de uma reta, usando o coeficiente e o intercepto.
2. Converte log-odds em odds, exponenciando o resultado.
3. Converte odds em probabilidade, dividindo pelo próprio odds mais 1.

```py
import numpy
from sklearn import linear_model

X = numpy.array([3.78, 2.44, 2.09, 0.14, 1.72, 1.65, 4.92, 4.37, 4.96, 4.52, 3.69, 5.88]).reshape(-1, 1)
y = numpy.array([0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1])

logr = linear_model.LogisticRegression()
logr.fit(X, y)

def logit2prob(logr, X):
    log_odds = logr.coef_ * X + logr.intercept_
    odds = numpy.exp(log_odds)
    probabilidade = odds / (1 + odds)
    return probabilidade

print(logit2prob(logr, X))
```

A saída é:

```py
[[0.60749955]
 [0.19268876]
 [0.12775886]
 [0.00955221]
 [0.08038616]
 [0.07345637]
 [0.88362743]
 [0.77901378]
 [0.88924409]
 [0.81293497]
 [0.57719129]
 [0.96664243]]
```

Olhando pros três primeiros tumores do dataset:

- Tamanho 3.78cm → probabilidade 0.61 → 61% de chance de ser canceroso.
- Tamanho 2.44cm → probabilidade 0.19 → 19% de chance.
- Tamanho 2.09cm → probabilidade 0.13 → 13% de chance.

Repare que a probabilidade sobe conforme o tumor cresce — exatamente o que o odds de 4x por milímetro já indicava, só que agora em números mais fáceis de comunicar (uma porcentagem) do que o `[0]`/`[1]` bruto do `predict()`.

Com árvore de decisão e regressão logística, você já tem dois classificadores bem diferentes entre si. No próximo post, você vai ver duas técnicas que ajudam a confiar mais nos resultados de qualquer um deles: validação cruzada e grid search.

**Fonte adaptada:** [Logistic Regression](https://www.w3schools.com/python/python_ml_logistic_regression.asp)
