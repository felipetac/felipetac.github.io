---
layout: post
title: "Machine Learning #5 - Gráfico de Dispersão"
date: 2026-09-25 13:00:00
image: '/assets/img/posts/ml-grafico-de-dispersao.webp'
description: Como desenhar e interpretar um gráfico de dispersão (scatter plot) com Matplotlib, o primeiro passo pra enxergar a relação entre duas variáveis antes de qualquer regressão.
category: 'ciência de dados'
tags:
- Python
- Programação
- Dispersão
twitter_text: Gráfico de Dispersão em Python
introduction: "Nesta parte da série, você vai aprender a desenhar e interpretar um gráfico de dispersão (scatter plot), o primeiro passo pra enxergar relações entre duas variáveis."
---

Antes de tentar prever qualquer coisa, o primeiro passo costuma ser simplesmente _olhar_ pros dados. Um **gráfico de dispersão** (scatter plot) é um diagrama onde cada valor do dataset vira um ponto — e é exatamente essa visualização que vai te ajudar, nos próximos posts, a decidir se vale a pena tentar uma regressão.

## Desenhando um gráfico de dispersão

O Matplotlib tem um método pronto pra desenhar gráficos de dispersão: basta passar dois arrays do mesmo tamanho, um pro eixo x e outro pro eixo y. No exemplo abaixo, `x` representa a idade de 13 carros, e `y` representa a velocidade registrada de cada um, ao passar por um pedágio.

```py
import matplotlib.pyplot as plt

x = [5, 7, 8, 7, 2, 17, 2, 9, 4, 11, 12, 9, 6]
y = [99, 86, 87, 88, 111, 86, 103, 87, 94, 78, 77, 85, 86]

plt.scatter(x, y)
plt.show()
```

O eixo x representa idades, e o eixo y representa velocidades. Olhando pro gráfico, dá pra notar que os dois carros mais rápidos tinham ambos 2 anos de idade, e o carro mais lento tinha 12 anos.

> **Nota:** parece que quanto mais novo o carro, mais rápido ele anda — mas isso pode muito bem ser coincidência, afinal só registramos 13 carros. É exatamente esse tipo de "parece que existe uma relação, mas será que existe mesmo?" que a regressão linear, no próximo post, ajuda a responder de forma mais rigorosa.

## Distribuições de dados aleatórios

Em Machine Learning, datasets costumam ter milhares (ou milhões) de valores — e nem sempre você vai ter dados reais disponíveis pra testar um algoritmo. Nesses casos, o NumPy ajuda a gerar valores aleatórios, como você já viu no post anterior sobre distribuição de dados.

Vamos criar dois arrays preenchidos com 1000 números aleatórios de uma distribuição normal: o primeiro com média 5.0 e desvio padrão 1.0; o segundo com média 10.0 e desvio padrão 2.0.

```py
import numpy
import matplotlib.pyplot as plt

x = numpy.random.normal(5.0, 1.0, 1000)
y = numpy.random.normal(10.0, 2.0, 1000)

plt.scatter(x, y)
plt.show()
```

O resultado é uma nuvem de pontos concentrada em torno do valor 5 no eixo x, e do valor 10 no eixo y — mas repare que a dispersão é bem mais ampla no eixo y do que no eixo x, exatamente porque o desvio padrão usado pra gerar `y` (2.0) é o dobro do usado pra gerar `x` (1.0).

Com o gráfico de dispersão no seu kit de ferramentas, chegou a hora de ir além de "parece que tem uma relação ali" — no próximo post, você vai aprender a traçar uma reta que resume essa relação, e usá-la pra prever valores novos: a regressão linear.

**Fonte adaptada:** [Scatter Plot](https://www.w3schools.com/python/python_ml_scatterplot.asp)
