---
layout: post
title: "Machine Learning #4 - Distribuição de Dados"
date: 2026-09-25 12:40:00
image: '/assets/img/posts/ml-distribuicao-de-dados.webp'
description: Como gerar grandes conjuntos de dados aleatórios com NumPy, visualizá-los com histogramas do Matplotlib, e o que é a distribuição normal (a curva em forma de sino).
category: 'ciência de dados'
tags:
- Python
- Programação
- Distribuição
twitter_text: "Machine Learning #4 - Distribuição de Dados"
introduction: "Nesta parte da série, você vai aprender a gerar grandes conjuntos de dados aleatórios, visualizá-los com histogramas, e entender a distribuição normal."
---

Até aqui, os exemplos da série usaram conjuntos de dados bem pequenos — só pra deixar cada conceito claro. No mundo real, datasets costumam ser bem maiores, e nem sempre é fácil conseguir dados reais logo no início de um projeto. É aí que entra a geração de dados aleatórios.

## Criando grandes conjuntos de dados

Pra criar datasets grandes pra teste, usamos o NumPy, que tem vários métodos pra gerar conjuntos de dados aleatórios de qualquer tamanho.

```py
import numpy

x = numpy.random.uniform(0.0, 5.0, 250)

print(x)
```

Esse código gera um array com 250 números decimais aleatórios, todos entre 0.0 e 5.0.

## Histograma

Pra visualizar um conjunto de dados como esse, dá pra desenhar um histograma, usando o Matplotlib.

```py
import numpy
import matplotlib.pyplot as plt

x = numpy.random.uniform(0.0, 5.0, 250)

plt.hist(x, 5)
plt.show()
```

O resultado é um histograma com 5 barras, desenhado a partir do mesmo array gerado acima:

- A primeira barra representa quantos valores do array estão entre 0 e 1.
- A segunda barra representa quantos valores estão entre 1 e 2.
- E assim por diante.

O que dá um resultado parecido com este:

- 52 valores estão entre 0 e 1
- 48 valores estão entre 1 e 2
- 49 valores estão entre 2 e 3
- 51 valores estão entre 3 e 4
- 50 valores estão entre 4 e 5

> **Nota:** como os valores do array são gerados aleatoriamente, você não vai ver exatamente esses mesmos números ao rodar o código na sua máquina — mas, com uma distribuição uniforme, as 5 barras tendem a ficar bem parecidas em altura.

## Distribuições grandes

Um array com 250 valores não é considerado muito grande — mas agora que você sabe como criar um conjunto de valores aleatórios, basta mudar os parâmetros pra criar um dataset do tamanho que precisar.

```py
import numpy
import matplotlib.pyplot as plt

x = numpy.random.uniform(0.0, 5.0, 100000)

plt.hist(x, 100)
plt.show()
```

Com 100.000 valores espalhados em 100 barras, o histograma fica bem mais granular — cada barra representa uma fatia bem mais fina do intervalo entre 0 e 5, mas o formato geral continua achatado (uniforme), já que os valores continuam sendo gerados com a mesma probabilidade em qualquer ponto do intervalo.

## Distribuição normal

No exemplo acima, os valores foram gerados de forma completamente aleatória, espalhados igualmente entre dois valores. Agora vamos ver como gerar um array onde os valores ficam concentrados ao redor de um valor específico.

Na teoria da probabilidade, esse tipo de distribuição é chamado de **distribuição normal**, ou **distribuição gaussiana** — batizada em homenagem ao matemático Carl Friedrich Gauss, que criou a fórmula por trás dela.

```py
import numpy
import matplotlib.pyplot as plt

x = numpy.random.normal(5.0, 1.0, 100000)

plt.hist(x, 100)
plt.show()
```

O resultado é um histograma com o formato clássico de sino: um pico alto centrado por volta de 5.0, caindo simetricamente pros dois lados, com poucos valores nas pontas — bem abaixo de 4.0 ou bem acima de 6.0.

> **Nota:** por causa desse formato característico, um gráfico de distribuição normal também é conhecido como "curva do sino" (bell curve).

`numpy.random.normal()` recebe três parâmetros: a **média** (aqui, 5.0), o **desvio padrão** (aqui, 1.0), e o tamanho do array (100.000 valores). Isso significa que os valores devem se concentrar ao redor de 5.0, e raramente devem se afastar mais que 1.0 da média — e é exatamente isso que o histograma mostra: a maioria dos valores cai entre 4.0 e 6.0, com o pico por volta de 5.0.

Com uniforme e normal cobertas, você já sabe gerar e visualizar dados sintéticos — uma ferramenta que vai aparecer o tempo todo daqui pra frente. No próximo post, você vai usar gráficos de dispersão pra começar a enxergar relações entre duas variáveis diferentes, o primeiro passo antes de qualquer regressão.

**Fonte adaptada:** [Data Distribution](https://www.w3schools.com/python/python_ml_data_distribution.asp), [Normal Data Distribution](https://www.w3schools.com/python/python_ml_normal_data_distribution.asp)
