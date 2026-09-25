---
layout: post
title: "Machine Learning #11 - Agrupamento: Hierárquico e K-Means"
date: 2026-09-25 15:00:00
image: '/assets/img/posts/ml-agrupamento-hierarquico-e-k-means.webp'
description: Como agrupar dados sem rótulos usando clustering hierárquico (com dendrograma) e K-Means (com o método do cotovelo pra escolher o número de clusters).
category: 'ciência de dados'
tags:
- Python
- Programação
- Clustering
twitter_text: Agrupamento - Hierárquico e K-Means em Python
introduction: "Nesta parte da série, você vai aprender duas técnicas de agrupamento sem rótulos: clustering hierárquico e K-Means."
---

Tudo que você viu até agora — regressões, árvore de decisão — tem uma coluna alvo que o modelo tenta prever: aprendizado **supervisionado**. Agrupamento (clustering) é diferente: não existe uma resposta certa dada de antemão, o algoritmo só encontra padrões e agrupa pontos parecidos entre si. É aprendizado **não supervisionado**.

## Clustering Hierárquico

O clustering hierárquico agrupa pontos de dados medindo o quão diferentes eles são entre si. A técnica usada aqui é o **Agglomerative Clustering**, que funciona de baixo pra cima: cada ponto começa sendo seu próprio cluster, e os clusters mais próximos vão sendo unidos repetidamente até sobrar um único cluster gigante com todos os pontos.

```py
x = [4, 5, 10, 4, 3, 11, 14, 6, 10, 12]
y = [21, 19, 24, 17, 16, 25, 24, 22, 21, 21]
```

```py
import matplotlib.pyplot as plt

plt.scatter(x, y)
plt.show()
```

### Visualizando com um dendrograma

Um jeito de visualizar esse processo de união é o **dendrograma** — um diagrama em árvore que mostra a hierarquia de agrupamentos, do nível individual até o cluster único no topo.

```py
import matplotlib.pyplot as plt
from scipy.cluster.hierarchy import dendrogram, linkage

x = [4, 5, 10, 4, 3, 11, 14, 6, 10, 12]
y = [21, 19, 24, 17, 16, 25, 24, 22, 21, 21]

dados = list(zip(x, y))

dados_linkage = linkage(dados, method='ward', metric='euclidean')
dendrogram(dados_linkage)

plt.show()
```

`linkage()` calcula a distância entre todos os pontos usando distância euclidiana, e o método **Ward**, que tenta minimizar a variância dentro de cada cluster a cada união.

### Agrupando de verdade

Com o `AgglomerativeClustering` do scikit-learn, dá pra escolher quantos clusters finais você quer, e deixar o algoritmo atribuir cada ponto a um deles.

```py
import matplotlib.pyplot as plt
from sklearn.cluster import AgglomerativeClustering

x = [4, 5, 10, 4, 3, 11, 14, 6, 10, 12]
y = [21, 19, 24, 17, 16, 25, 24, 22, 21, 21]

dados = list(zip(x, y))

cluster_hierarquico = AgglomerativeClustering(n_clusters=2, linkage='ward')
labels = cluster_hierarquico.fit_predict(dados)

plt.scatter(x, y, c=labels)
plt.show()
```

A saída de `labels` é:

```py
[0 0 1 0 0 1 1 0 1 1]
```

Cada ponto recebeu um rótulo (0 ou 1) indicando a qual dos dois clusters ele pertence — e é isso que colore o scatter plot final.

## K-Means

K-Means é outra técnica de clustering não supervisionado, só que funciona de forma diferente: divide os pontos iterativamente em K clusters, minimizando a variância dentro de cada um. Cada ponto começa atribuído aleatoriamente a um dos K clusters; calcula-se o centro (centróide) de cada cluster; cada ponto é reatribuído ao centróide mais próximo; e o processo se repete até que as atribuições parem de mudar.

A diferença central em relação ao clustering hierárquico: você precisa decidir o valor de K, o número de clusters, **antes** de rodar o algoritmo.

### Escolhendo K com o método do cotovelo

Usando o mesmo dataset de 10 pontos, o **método do cotovelo** (elbow method) ajuda a estimar o melhor K: calcula-se a inércia (uma métrica de distância) pra cada valor possível de K, e procura-se o ponto onde a curva para de cair tão rápido.

```py
import matplotlib.pyplot as plt
from sklearn.cluster import KMeans

x = [4, 5, 10, 4, 3, 11, 14, 6, 10, 12]
y = [21, 19, 24, 17, 16, 25, 24, 22, 21, 21]

dados = list(zip(x, y))
inercias = []

for i in range(1, 11):
    kmeans = KMeans(n_clusters=i)
    kmeans.fit(dados)
    inercias.append(kmeans.inertia_)

plt.plot(range(1, 11), inercias, marker='o')
plt.title('Método do cotovelo')
plt.xlabel('Número de clusters')
plt.ylabel('Inércia')
plt.show()
```

Como só há 10 pontos de dados, o número máximo de clusters testado é 10. Olhando pro gráfico resultante, o "cotovelo" — o ponto onde a inércia passa a cair de forma mais linear — aparece em **K = 2**.

### Agrupando com K = 2

```py
kmeans = KMeans(n_clusters=2)
kmeans.fit(dados)

plt.scatter(x, y, c=kmeans.labels_)
plt.show()
```

`kmeans.labels_` guarda o cluster atribuído a cada ponto, exatamente como o `labels` do clustering hierárquico — e, com esse dataset pequeno, os dois métodos tendem a chegar num agrupamento bem parecido.

Clustering resolve bem o problema de "quais pontos se parecem entre si", mas não substitui um classificador quando você já sabe a resposta certa de antemão. No próximo post, você volta pra esse terreno com outro tipo de classificador: a regressão logística.

**Fonte adaptada:** [Hierarchical Clustering](https://www.w3schools.com/python/python_ml_hierarchial_clustering.asp), [K-means](https://www.w3schools.com/python/python_ml_k-means.asp)
