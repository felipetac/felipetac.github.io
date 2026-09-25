---
layout: post
title: "#9 - Árvore de Decisão"
date: 2026-09-25 14:20:00
image: '/assets/img/posts/ml-arvore-de-decisao.webp'
description: Como criar e interpretar uma árvore de decisão em Python com scikit-learn, incluindo como o algoritmo escolhe onde dividir os dados usando o método Gini.
category: 'ciência de dados'
tags:
- Python
- Programação
- Árvore de Decisão
twitter_text: Árvore de Decisão em Python
introduction: "Nesta parte da série, você vai aprender a criar e interpretar uma árvore de decisão em Python, e como o algoritmo decide onde dividir os dados."
---

As regressões dos posts anteriores preveem um número. Mas e quando a pergunta é mais parecida com "sim ou não"? É aí que entra a **árvore de decisão** — um fluxograma que ajuda a tomar uma decisão com base em experiência anterior.

## O dataset: comediantes

Imagine alguém que decide se vai ou não a um show de comédia, e anota informações sobre cada comediante toda vez que um show acontece na cidade — e se foi ou não ao show:

| Age | Experience | Rank | Nationality | Go |
|---|---|---|---|---|
| 36 | 10 | 9 | UK | NO |
| 42 | 12 | 4 | USA | NO |
| 23 | 4 | 6 | N | NO |
| 52 | 4 | 4 | USA | NO |
| 43 | 21 | 8 | USA | YES |
| 44 | 14 | 5 | UK | NO |
| 66 | 3 | 7 | N | YES |
| 35 | 14 | 9 | UK | YES |
| 52 | 13 | 7 | N | YES |
| 35 | 5 | 9 | N | YES |
| 24 | 3 | 5 | USA | NO |
| 18 | 3 | 7 | UK | YES |
| 45 | 9 | 9 | UK | YES |

Com base nesses dados, o Python consegue criar uma árvore de decisão capaz de indicar se vale a pena ir a um novo show.

## Como funciona

Primeiro, lê-se o dataset (salvo como `data.csv`):

```py
import pandas

df = pandas.read_csv("data.csv")

print(df)
```

Pra montar uma árvore de decisão, todos os dados precisam ser numéricos — então é preciso converter as colunas `Nationality` e `Go`, que são texto, em números. O Pandas tem o método `map()`, que recebe um dicionário dizendo como converter cada valor.

```py
d = {'UK': 0, 'USA': 1, 'N': 2}
df['Nationality'] = df['Nationality'].map(d)

d = {'YES': 1, 'NO': 0}
df['Go'] = df['Go'].map(d)

print(df)
```

Depois, separam-se as colunas de entrada (features, o que usamos pra prever) da coluna alvo (target, o que queremos prever):

```py
features = ['Age', 'Experience', 'Rank', 'Nationality']

X = df[features]
y = df['Go']
```

E por fim, criar e treinar a árvore:

```py
import pandas
from sklearn import tree
from sklearn.tree import DecisionTreeClassifier
import matplotlib.pyplot as plt

df = pandas.read_csv("data.csv")

d = {'UK': 0, 'USA': 1, 'N': 2}
df['Nationality'] = df['Nationality'].map(d)

d = {'YES': 1, 'NO': 0}
df['Go'] = df['Go'].map(d)

features = ['Age', 'Experience', 'Rank', 'Nationality']

X = df[features]
y = df['Go']

dtree = DecisionTreeClassifier()
dtree = dtree.fit(X, y)

tree.plot_tree(dtree, feature_names=features)
```

## Interpretando a árvore

Existem várias formas de decidir onde dividir os dados em cada nó da árvore — este exemplo usa o método **Gini**, calculado com a fórmula:

```
Gini = 1 - (x/n)² - (y/n)²
```

Onde `x` é o número de respostas positivas ("GO"), `y` é o número de respostas negativas ("NO"), e `n` é o total de amostras.

No **nó raiz**, a árvore decide dividir pela coluna `Rank`, com o corte `Rank <= 6.5`: comediantes com rank até 6.5 seguem pra um lado, os demais pro outro. Com os 13 comediantes (7 "GO", 6 "NO"), o Gini do nó raiz é `1 - (7/13)² - (6/13)² = 0.497` — bem perto do máximo (0.5), o que faz sentido, já que a divisão é quase meio a meio.

- **Ramo com `Rank <= 6.5`** (5 comediantes): todos têm o mesmo resultado ("NO"), então o Gini aqui é `0.0` — esse ramo já termina num nó-folha, sem precisar de mais divisões.
- **Ramo com `Rank > 6.5`** (8 comediantes): a árvore continua, agora dividindo por `Nationality` — comediantes do Reino Unido (`Nationality <= 0.5`) de um lado, os demais do outro. O Gini aqui é `0.219` (com 1 "NO" e 7 "GO").
  - Dentro do grupo do Reino Unido (4 comediantes), a árvore divide mais uma vez, agora por `Age` (`Age <= 35.5`), com Gini `0.375`.
  - Fora do Reino Unido (4 comediantes), todos têm o mesmo resultado ("GO"), Gini `0.0` — outro nó-folha.

A árvore continua se dividindo dessa forma — sempre escolhendo a coluna e o ponto de corte que mais reduzem o Gini — até que cada ramo termine num nó-folha com Gini `0.0` (todas as amostras daquele grupo concordam no resultado) ou fique pequeno demais pra dividir mais.

## Prevendo com a árvore

Depois de treinada, a árvore pode responder: vale a pena ver um show com um comediante americano de 40 anos, 10 anos de experiência e nota 7?

```py
print(dtree.predict([[40, 10, 7, 1]]))
```

E se a nota fosse 6, em vez de 7?

```py
print(dtree.predict([[40, 10, 6, 1]]))
```

## Os resultados podem variar

Rodando o treinamento várias vezes com os mesmos dados, é possível obter árvores (e previsões) ligeiramente diferentes entre uma execução e outra. Isso acontece porque a árvore de decisão não dá uma resposta 100% certa — ela se baseia na probabilidade de um resultado, então a resposta pode variar.

Árvores de decisão são o ponto de partida de uma família inteira de técnicas — inclusive o bagging, que você vai ver mais adiante na série. Mas antes disso, o próximo post mostra como avaliar de forma mais rigorosa um modelo de classificação como este, com matriz de confusão e curva AUC-ROC.

**Fonte adaptada:** [Decision Tree](https://www.w3schools.com/python/python_ml_decision_tree.asp)
