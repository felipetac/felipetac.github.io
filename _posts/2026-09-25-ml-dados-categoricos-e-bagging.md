---
layout: post
title: "Machine Learning #14 - Dados Categóricos e Bagging"
date: 2026-09-25 16:00:00
image: '/assets/img/posts/ml-dados-categoricos-e-bagging.webp'
description: Como transformar colunas de texto em números com one hot encoding, e como combinar vários modelos com bootstrap aggregation (bagging) pra reduzir overfitting.
category: 'ciência de dados'
tags:
- Python
- Programação
- Pré-processamento
twitter_text: "Machine Learning #14 - Dados Categóricos e Bagging"
introduction: "Nesta parte da série, você vai aprender a transformar colunas de texto em números com one hot encoding, e a combinar vários modelos com bagging."
---

Faltam duas peças práticas antes de fechar a série: o que fazer quando uma coluna é feita de texto, não de números — e como reduzir o overfitting combinando vários modelos em vez de confiar num só.

## Dados categóricos

Modelos de Machine Learning, no geral, só aceitam dados numéricos — mas datasets do mundo real vêm cheios de colunas de texto. Em vez de simplesmente descartar essa informação, dá pra transformá-la em algo que o modelo consegue usar.

Lembra do dataset de carros usado nas regressões? Ele tem as colunas `Car` e `Model`, que ficaram de fora das previsões até agora — não dá pra encontrar uma relação linear entre uma variável categórica (a marca do carro) e uma numérica (o CO2) do jeito que ela está.

### One Hot Encoding

A solução é criar uma coluna numérica pra cada categoria diferente, com valores 1 ou 0 — 1 significa que aquela linha pertence a esse grupo, 0 significa que não. Essa técnica se chama **one hot encoding**, e o Pandas já tem um método pronto pra isso: `get_dummies()`.

```py
import pandas

carros = pandas.read_csv("data.csv")

carros_codificados = pandas.get_dummies(carros[['Car']])

print(carros_codificados.to_string())
```

O resultado é uma coluna pra cada marca de carro presente no dataset (`Car_Audi`, `Car_BMW`, `Car_Fiat`, `Car_Ford`, e assim por diante), com um único `1` na coluna correspondente à marca daquele carro, e `0` em todas as outras:

```py
   Car_Audi  Car_BMW  Car_Fiat  Car_Ford  ...  Car_Toyota  Car_VW  Car_Volvo
0         0        0         0         0  ...           1       0          0
1         0        0         0         0  ...           0       0          0
9         1        0         0         0  ...           0       0          0
16        0        1         0         0  ...           0       0          0
24        0        0         0         0  ...           0       0          1
```

Com as colunas codificadas, dá pra combiná-las com as colunas numéricas (`Volume`, `Weight`) e treinar a regressão múltipla incluindo a marca do carro na previsão:

```py
import pandas
from sklearn import linear_model

carros = pandas.read_csv("data.csv")
carros_codificados = pandas.get_dummies(carros[['Car']])

X = pandas.concat([carros[['Volume', 'Weight']], carros_codificados], axis=1)
y = carros['CO2']

regr = linear_model.LinearRegression()
regr.fit(X, y)

co2_previsto = regr.predict([[2300, 1300, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0]])

print(co2_previsto)
```

A saída é:

```py
[122.45153299]
```

A lista de previsão combina `Volume=2300`, `Weight=1300`, e um vetor de 17 posições com um único `1` marcando a marca escolhida — nesse caso, dá uma previsão bem diferente da regressão sem a marca (107g), mostrando que a marca do carro carrega informação relevante pra prever o CO2.

### Reduzindo o número de colunas

Não é preciso criar uma coluna pra cada categoria — dá pra manter a mesma informação usando uma coluna a menos, com o parâmetro `drop_first=True`.

```py
import pandas

cores = pandas.DataFrame({'color': ['blue', 'red']})
dummies = pandas.get_dummies(cores, drop_first=True)

print(dummies)
```

A saída é:

```py
   color_red
0          0
1          1
```

Quando `color_red` é 0, já se sabe que a cor é "blue" — não é preciso uma coluna própria pra ela. O mesmo vale com mais categorias:

```py
import pandas

cores = pandas.DataFrame({'color': ['blue', 'red', 'green']})
dummies = pandas.get_dummies(cores, drop_first=True)
dummies['color'] = cores['color']

print(dummies)
```

A saída é:

```py
   color_green  color_red  color
0            0          0   blue
1            0          1    red
2            1          0  green
```

Quando ambas as colunas (`color_green` e `color_red`) são 0, a cor só pode ser "blue" — a informação continua completa, só com uma coluna a menos.

## Bagging

Modelos como a árvore de decisão do post #9 podem sofrer **overfitting** no conjunto de treino, decorando os dados em vez de aprender um padrão que generalize. **Bootstrap Aggregation**, ou **bagging**, é uma técnica de _ensembling_ (combinar vários modelos) que ataca esse problema: em vez de treinar um único modelo, treina-se vários, cada um numa amostra aleatória do dataset original (tirada **com reposição**), e depois combina-se as previsões de todos — por voto majoritário, em classificação, ou por média, em regressão.

### O modelo base, sem bagging

Usando o dataset de vinhos do scikit-learn, pra classificar o tipo de vinho:

```py
from sklearn import datasets
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score
from sklearn.tree import DecisionTreeClassifier

dados = datasets.load_wine(as_frame=True)

X = dados.data
y = dados.target

X_treino, X_teste, y_treino, y_teste = train_test_split(X, y, test_size=0.25, random_state=22)

dtree = DecisionTreeClassifier(random_state=22)
dtree.fit(X_treino, y_treino)

y_previsto = dtree.predict(X_teste)

print("Acurácia no treino:", accuracy_score(y_true=y_treino, y_pred=dtree.predict(X_treino)))
print("Acurácia no teste:", accuracy_score(y_true=y_teste, y_pred=y_previsto))
```

A saída é:

```py
Acurácia no treino: 1.0
Acurácia no teste: 0.8222222222222222
```

Uma acurácia de 100% no treino contra 82% no teste é um sinal clássico de overfitting: a árvore memorizou o conjunto de treino quase perfeitamente, mas perde precisão em dados que nunca viu.

### Combinando várias árvores com BaggingClassifier

```py
import matplotlib.pyplot as plt
from sklearn.ensemble import BaggingClassifier

faixa_estimadores = [2, 4, 6, 8, 10, 12, 14, 16]

modelos = []
scores = []

for n_estimadores in faixa_estimadores:
    clf = BaggingClassifier(n_estimators=n_estimadores, random_state=22)
    clf.fit(X_treino, y_treino)
    modelos.append(clf)
    scores.append(accuracy_score(y_true=y_teste, y_pred=clf.predict(X_teste)))

plt.figure(figsize=(9, 6))
plt.plot(faixa_estimadores, scores)
plt.xlabel("n_estimators", fontsize=18)
plt.ylabel("score", fontsize=18)
plt.tick_params(labelsize=16)
plt.show()
```

`BaggingClassifier` já usa `DecisionTreeClassifier` como modelo base por padrão, então não é preciso especificar isso. Variando o número de árvores agregadas (`n_estimators`) de 2 a 16, a acurácia no teste sobe de **82.2% para 95.5%** — um ganho de mais de 13 pontos percentuais sobre a árvore única, só por combinar vários modelos treinados em amostras diferentes. Depois de 14 estimadores, a acurácia para de melhorar.

> **Nota:** os números exatos variam se você rodar sem fixar `random_state` — por isso, na prática, vale combinar bagging com validação cruzada (post anterior) pra garantir que o ganho de desempenho é real, e não só sorte da divisão treino/teste.

### Avaliação Out-of-Bag

Como o bootstrapping seleciona amostras aleatórias com reposição, sempre sobram algumas observações que nenhum dos modelos usou pra treinar — as chamadas observações **out-of-bag** (OOB). Elas podem servir como uma espécie de conjunto de validação "de graça", sem precisar reservar dados à parte.

```py
from sklearn.ensemble import BaggingClassifier

modelo_oob = BaggingClassifier(n_estimators=12, oob_score=True, random_state=22)
modelo_oob.fit(X_treino, y_treino)

print(modelo_oob.oob_score_)
```

> **Nota:** a estimativa out-of-bag pode superestimar o erro em problemas de classificação binária, e costuma divergir um pouco do score medido no conjunto de teste, especialmente em datasets pequenos — trate-a como um complemento rápido, não como substituta de uma avaliação mais completa.

Com dados categóricos codificados e bagging reduzindo o overfitting de árvores de decisão, fecha-se o conjunto de técnicas práticas de pré-processamento e ensembling da série. Falta só um classificador clássico pra encerrar: o K-Nearest Neighbors, no próximo (e último) post.

**Fonte adaptada:** [Categorical Data](https://www.w3schools.com/python/python_ml_preprocessing.asp), [Bootstrap Aggregation (Bagging)](https://www.w3schools.com/python/python_ml_bagging.asp)
