---
layout: post
title: "Machine Learning #13 - Validação Cruzada e Grid Search"
date: 2026-09-25 15:40:00
image: '/assets/img/posts/ml-validacao-cruzada-e-grid-search.webp'
description: Como validar um modelo com técnicas de validação cruzada (K-Fold, Stratified K-Fold, Leave-One-Out, Leave-P-Out, Shuffle Split) e como ajustar hiperparâmetros com grid search.
category: 'ciência de dados'
tags:
- Python
- Programação
- Validação de Modelos
twitter_text: Validação Cruzada e Grid Search em Python
introduction: "Nesta parte da série, você vai aprender técnicas de validação cruzada e como usar grid search pra ajustar os hiperparâmetros de um modelo."
---

Ajustar os parâmetros de um modelo pra maximizar o desempenho no conjunto de teste parece uma boa ideia — até você perceber que, fazendo isso, está "vazando" informação do teste pro treino, e o modelo pode acabar performando pior em dados realmente novos. As duas técnicas deste post ajudam a evitar essa armadilha.

## Validação Cruzada

Validação cruzada (cross validation) é uma família de técnicas que reparte os dados de treino de formas diferentes, pra ter mais confiança de que o modelo generaliza bem. Todos os exemplos abaixo usam o dataset Iris, já incluído no scikit-learn.

```py
from sklearn import datasets

X, y = datasets.load_iris(return_X_y=True)
```

### K-Fold

Os dados são divididos em `k` grupos (folds); o modelo treina em `k-1` folds, e o fold restante vira validação — repetindo até que cada fold já tenha sido usado como validação uma vez.

```py
from sklearn.tree import DecisionTreeClassifier
from sklearn.model_selection import KFold, cross_val_score

clf = DecisionTreeClassifier(random_state=42)

k_folds = KFold(n_splits=5)

scores = cross_val_score(clf, X, y, cv=k_folds)

print("Scores de cada fold: ", scores)
print("Média dos scores: ", scores.mean())
print("Quantidade de scores usados na média: ", len(scores))
```

### Stratified K-Fold

Quando as classes do dataset estão desbalanceadas, é importante manter essa proporção tanto no treino quanto na validação — é isso que o Stratified K-Fold garante, mantendo a mesma proporção de cada classe em todos os folds.

```py
from sklearn.model_selection import StratifiedKFold, cross_val_score

sk_folds = StratifiedKFold(n_splits=5)

scores = cross_val_score(clf, X, y, cv=sk_folds)

print("Scores de cada fold: ", scores)
print("Média dos scores: ", scores.mean())
```

Com o mesmo número de folds, a média do Stratified K-Fold tende a ser mais alta que a do K-Fold básico, justamente por respeitar a proporção das classes.

### Leave-One-Out (LOO)

Em vez de escolher um número de folds, o `LeaveOneOut` usa **1 observação** pra validação e todas as demais pro treino — repetindo isso uma vez pra cada observação do dataset. É um método exaustivo.

```py
from sklearn.model_selection import LeaveOneOut, cross_val_score

loo = LeaveOneOut()

scores = cross_val_score(clf, X, y, cv=loo)

print("Média dos scores: ", scores.mean())
print("Quantidade de scores usados na média: ", len(scores))
```

Como o Iris tem 150 observações, o número de scores calculados também é 150 — um pra cada rodada de validação. A média fica em torno de **94%**.

### Leave-P-Out (LPO)

Uma variação do Leave-One-Out, que permite escolher quantas observações (`p`) ficam de fora pra validação em cada rodada, em vez de sempre uma só.

```py
from sklearn.model_selection import LeavePOut, cross_val_score

lpo = LeavePOut(p=2)

scores = cross_val_score(clf, X, y, cv=lpo)

print("Média dos scores: ", scores.mean())
print("Quantidade de scores usados na média: ", len(scores))
```

Com `p=2`, o número de combinações calculadas é bem maior que no Leave-One-Out — mas a média do score fica bem parecida (perto dos mesmos ~94%).

### Shuffle Split

Diferente do K-Fold, o `ShuffleSplit` deixa uma parte dos dados de fora — nem no treino, nem na validação. É preciso definir o tamanho do treino, do teste, e quantos splits rodar.

```py
from sklearn.model_selection import ShuffleSplit, cross_val_score

ss = ShuffleSplit(train_size=0.6, test_size=0.3, n_splits=5)

scores = cross_val_score(clf, X, y, cv=ss)

print("Scores de cada split: ", scores)
print("Média dos scores: ", scores.mean())
```

> **Nota:** essas são só algumas das técnicas de validação cruzada disponíveis — a maioria dos modelos do scikit-learn tem sua própria classe de validação recomendada. Vale a pena consultar a documentação quando um desses cinco métodos não encaixar bem no seu problema.

## Grid Search

A maioria dos modelos de Machine Learning tem parâmetros que podem ser ajustados pra mudar como o modelo aprende. A regressão logística, por exemplo, tem um parâmetro `C` que controla a regularização — e afeta o quão "complexo" o modelo fica. Valores mais altos de `C` dão mais peso aos dados de treino; valores mais baixos fazem o oposto. Mas qual valor de `C` é o melhor? Depende dos dados.

### Ponto de partida: parâmetro padrão

```py
from sklearn import datasets
from sklearn.linear_model import LogisticRegression

iris = datasets.load_iris()

X = iris['data']
y = iris['target']

logit = LogisticRegression(max_iter=10000)

print(logit.fit(X, y))
print(logit.score(X, y))
```

A saída é:

```py
0.973
```

Com `C = 1` (o valor padrão), o modelo atinge um score de 0.973. Será que dá pra melhorar isso testando outros valores?

### Testando vários valores de C

Um grid search testa uma faixa de valores e escolhe o que dá o melhor score. Escolher quais valores testar exige um pouco de conhecimento do problema e prática — como o padrão de `C` é 1, faz sentido testar uma faixa ao redor dele.

```py
C = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2]

scores = []

for escolha in C:
    logit.set_params(C=escolha)
    logit.fit(X, y)
    scores.append(logit.score(X, y))

print(scores)
```

Valores de `C` menores que 1 tiveram desempenho pior que o padrão. Conforme `C` aumenta, o score melhora, até chegar em **1.75** — passar disso não traz mais ganho de acurácia.

> **Nota:** neste exemplo, o modelo foi avaliado com os mesmos dados usados pra treiná-lo — o que pode disfarçar overfitting (o modelo "decorando" o treino em vez de aprender de verdade). Pra evitar ser enganado pelos scores, vale usar uma divisão treino/teste de verdade (post #8) ou uma das técnicas de validação cruzada deste mesmo post antes de confiar no resultado do grid search.

Com validação cruzada e grid search, você tem como confiar (com evidência, não só com fé) num modelo e nos parâmetros escolhidos pra ele. No próximo post, antes de fechar a série, você vai ver duas técnicas que resolvem problemas bem práticos: como lidar com colunas de texto, e como combinar vários modelos num só com bagging.

**Fonte adaptada:** [Cross Validation](https://www.w3schools.com/python/python_ml_cross_validation.asp), [Grid Search](https://www.w3schools.com/python/python_ml_grid_search.asp)
