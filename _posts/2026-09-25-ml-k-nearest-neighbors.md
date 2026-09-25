---
layout: post
title: "Machine Learning | #15 - K-Nearest Neighbors (KNN)"
date: 2026-09-25 16:20:00
image: '/assets/img/posts/ml-k-nearest-neighbors.webp'
description: Como funciona o algoritmo K-Nearest Neighbors (KNN) em Python, e como o valor de K muda a classificação de um novo ponto de dados.
category: 'ciência de dados'
tags:
- Python
- Programação
- KNN
twitter_text: K-Nearest Neighbors (KNN) em Python
introduction: "Nesta parte da série, você vai aprender o algoritmo K-Nearest Neighbors (KNN), e como o valor de K muda a classificação de um ponto novo."
---

Fechando a série, um classificador com uma ideia bem direta: pontos parecidos tendem a estar perto uns dos outros. O **K-Nearest Neighbors** (KNN, "K vizinhos mais próximos") classifica um ponto novo olhando pros `K` pontos já conhecidos que estão mais perto dele, e seguindo a maioria.

## Como funciona

`K` é o número de vizinhos mais próximos usados na votação. Pra classificação, o ponto novo recebe a classe mais comum entre esses `K` vizinhos. Valores de `K` maiores costumam ser mais resistentes a outliers e geram fronteiras de decisão mais estáveis do que valores muito pequenos — `K=3`, por exemplo, tende a ser mais confiável que `K=1`, que pode se deixar levar por um único vizinho fora da curva.

## Visualizando os dados

```py
import matplotlib.pyplot as plt

x = [4, 5, 10, 4, 3, 11, 14, 8, 10, 12]
y = [21, 19, 24, 17, 16, 25, 24, 22, 21, 21]
classes = [0, 0, 1, 0, 0, 1, 1, 0, 1, 1]

plt.scatter(x, y, c=classes)
plt.show()
```

Os 10 pontos aparecem coloridos conforme sua classe (0 ou 1) — essa é a informação que o KNN vai usar pra classificar um ponto novo.

## Classificando com K=1

Primeiro, os pares `(x, y)` precisam virar uma lista de pontos:

```py
dados = list(zip(x, y))
print(dados)
```

A saída é:

```py
[(4, 21), (5, 19), (10, 24), (4, 17), (3, 16), (11, 25), (14, 24), (8, 22), (10, 21), (12, 21)]
```

Agora, ajustando o modelo com `n_neighbors=1` e classificando um ponto novo, `(8, 21)`:

```py
from sklearn.neighbors import KNeighborsClassifier

knn = KNeighborsClassifier(n_neighbors=1)
knn.fit(dados, classes)

novo_x = 8
novo_y = 21
novo_ponto = [(novo_x, novo_y)]

previsao = knn.predict(novo_ponto)
print(previsao)
```

A saída é:

```py
[0]
```

Com `K=1`, o ponto novo é classificado igual ao seu único vizinho mais próximo. Visualizando o resultado:

```py
plt.scatter(x + [novo_x], y + [novo_y], c=classes + [previsao[0]])
plt.text(x=novo_x - 1.7, y=novo_y - 0.7, s=f"novo ponto, classe: {previsao[0]}")
plt.show()
```

## Repetindo com K=5

Mudando só o número de vizinhos considerados, a votação muda — e a classificação do mesmo ponto pode mudar junto:

```py
knn = KNeighborsClassifier(n_neighbors=5)
knn.fit(dados, classes)

previsao = knn.predict(novo_ponto)
print(previsao)
```

A saída é:

```py
[1]
```

Com `K=5`, mais vizinhos entram na votação, e a maioria deles pertence à classe 1 — mudando o resultado da classificação em relação ao `K=1`.

```py
plt.scatter(x + [novo_x], y + [novo_y], c=classes + [previsao[0]])
plt.text(x=novo_x - 1.7, y=novo_y - 0.7, s=f"novo ponto, classe: {previsao[0]}")
plt.show()
```

> **Nota:** não existe um valor "correto" de K que sirva pra todo dataset — é um hiperparâmetro a mais pra ajustar, exatamente como o `C` da regressão logística no post sobre grid search. Um K pequeno demais deixa o modelo sensível a ruído; um K grande demais pode borrar a fronteira entre classes que, de fato, são diferentes.

E com isso fecha-se a série de Machine Learning: você passou por estatística descritiva (média, mediana, moda, desvio padrão, percentis, distribuições), regressão (linear, polinomial, múltipla, logística), pré-processamento (escala, treino/teste, dados categóricos), árvores e bagging, clustering (hierárquico e K-Means), validação (matriz de confusão, AUC-ROC, cross validation, grid search) e, por fim, KNN. É o mesmo ciclo que qualquer projeto real de Machine Learning percorre — entender os dados, treinar um modelo, e validar se ele realmente aprendeu alguma coisa antes de confiar nele.

**Fonte adaptada:** [K-nearest neighbors (KNN)](https://www.w3schools.com/python/python_ml_knn.asp)
