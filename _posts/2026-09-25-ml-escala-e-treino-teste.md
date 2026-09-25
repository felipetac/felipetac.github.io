---
layout: post
title: "Machine Learning | #8 - Escala de Dados e Divisão Treino/Teste"
date: 2026-09-25 14:00:00
image: '/assets/img/posts/ml-escala-e-treino-teste.webp'
description: Como padronizar colunas em escalas diferentes com StandardScaler, e como dividir um dataset em treino e teste pra avaliar se um modelo generaliza bem.
category: 'ciência de dados'
tags:
- Python
- Programação
- Pré-processamento
twitter_text: Escala de Dados e Treino/Teste em Python
introduction: "Nesta parte da série, você vai aprender a padronizar dados em escalas diferentes, e a dividir um dataset em treino e teste pra avaliar seu modelo de verdade."
---

Dois problemas bem práticos aparecem antes de qualquer regressão múltipla séria: como comparar colunas que estão em unidades completamente diferentes, e como saber se um modelo realmente aprendeu alguma coisa, em vez de simplesmente decorar os dados que viu.

## Escalando dados

Quando os dados têm valores — e até unidades — bem diferentes entre si, fica difícil compará-los. O que é 1000 quilos comparado a 1.6 litro? É pra isso que serve o **escalonamento** (scaling): transformar os dados em novos valores mais fáceis de comparar entre si.

Vamos usar o mesmo dataset de carros do post anterior, mas com o Volume do motor agora em litros (1.0) em vez de cm³ (1000). O método usado aqui se chama **padronização** (standardization), com a fórmula:

```
z = (x - u) / s
```

Onde `z` é o novo valor, `x` é o valor original, `u` é a média, e `s` é o desvio padrão.

Pra coluna `Weight`, o primeiro valor é 790; a média é 1292.23 e o desvio padrão é 238.74: `(790 - 1292.23) / 238.74 = -2.1`. Pra coluna `Volume`, o primeiro valor é 1.0; a média é 1.61 e o desvio padrão é 0.38: `(1.0 - 1.61) / 0.38 = -1.59`. Agora dá pra comparar -2.1 com -1.59, em vez de comparar 790 com 1.0.

Não é preciso fazer essa conta na mão — o `StandardScaler` do sklearn já faz isso:

```py
import pandas
from sklearn.preprocessing import StandardScaler

scale = StandardScaler()

df = pandas.read_csv("data.csv")

X = df[['Weight', 'Volume']]

X_escalado = scale.fit_transform(X)

print(X_escalado)
```

A saída é:

```py
[[-2.10389253 -1.59336644]
 [-0.55407235 -1.07190106]
 [-1.52166278 -1.59336644]
 [-1.78973979 -1.85409913]
 [-0.63784641 -0.28970299]
 [-1.52166278 -1.59336644]
 [-0.76769621 -0.55043568]
 [ 0.3046118  -0.28970299]
 [-0.7551301  -0.28970299]
 [-0.59595938 -0.0289703 ]
 [-1.30803892 -1.33263375]
 [-1.26615189 -0.81116837]
 [-0.7551301  -1.59336644]
 [-0.16871166 -0.0289703 ]
 [ 0.14125238 -0.0289703 ]
 [ 0.15800719 -0.0289703 ]
 [ 0.3046118  -0.0289703 ]
 [-0.05142797  1.53542584]
 [-0.72580918 -0.0289703 ]
 [ 0.14962979  1.01396046]
 [ 1.2219378  -0.0289703 ]
 [ 0.5685001   1.01396046]
 [ 0.3046118   1.27469315]
 [ 0.51404696 -0.0289703 ]
 [ 0.51404696  1.01396046]
 [ 0.72348212 -0.28970299]
 [ 0.8281997   1.01396046]
 [ 1.81254495  1.01396046]
 [ 0.96642691 -0.0289703 ]
 [ 1.72877089  1.01396046]
 [ 1.30990057  1.27469315]
 [ 1.90050772  1.01396046]
 [-0.23991961 -0.0289703 ]
 [ 0.40932938 -0.0289703 ]
 [ 0.47215993 -0.0289703 ]
 [ 0.4302729   2.31762392]]
```

Repare que os dois primeiros valores são -2.1 e -1.59 — exatamente os mesmos que calculamos manualmente.

> **Nota:** ao prever um valor novo com dados escalados, é essencial escalar a nova entrada da mesma forma antes de passar pro modelo — usando `scale.transform()`, não `fit_transform()` de novo, senão a previsão usa uma escala diferente da que o modelo aprendeu.

```py
import pandas
from sklearn import linear_model
from sklearn.preprocessing import StandardScaler

scale = StandardScaler()

df = pandas.read_csv("data.csv")

X = df[['Weight', 'Volume']]
y = df['CO2']

X_escalado = scale.fit_transform(X)

regr = linear_model.LinearRegression()
regr.fit(X_escalado, y)

escalado = scale.transform([[2300, 1.3]])

co2_previsto = regr.predict([escalado[0]])
print(co2_previsto)
```

A saída é:

```py
[107.2087328]
```

O mesmo resultado do post anterior — ~107g de CO2 pra um carro de 2300kg com motor de 1.3 litro — confirmando que escalar os dados de entrada e de saída da mesma forma preserva a previsão.

## Dividindo em treino e teste

Depois de treinar um modelo, como saber se ele é bom o suficiente? Um jeito comum é o método **treino/teste**: dividir o dataset em duas partes — normalmente **80% pra treino e 20% pra teste**. Você treina o modelo com uma parte dos dados, e testa a precisão dele com a outra parte, que o modelo nunca viu.

O dataset deste exemplo simula 100 clientes de uma loja: `x` é o número de minutos que cada cliente passou na loja antes de comprar, `y` é o valor gasto.

```py
import numpy
import matplotlib.pyplot as plt

numpy.random.seed(2)

x = numpy.random.normal(3, 1, 100)
y = numpy.random.normal(150, 40, 100) / x

plt.scatter(x, y)
plt.show()
```

Separando 80% pros dados de treino e os 20% restantes pro teste:

```py
treino_x = x[:80]
treino_y = y[:80]

teste_x = x[80:]
teste_y = y[80:]
```

Plotando cada conjunto separadamente (`plt.scatter(treino_x, treino_y)` e depois `plt.scatter(teste_x, teste_y)`), os dois parecem manter a mesma forma do dataset original — um bom sinal de que a divisão foi justa, sem viés.

### Ajustando o modelo

Olhando pro formato da curva, uma regressão polinomial de grau 4 parece ser a melhor opção aqui:

```py
import numpy
import matplotlib.pyplot as plt

numpy.random.seed(2)

x = numpy.random.normal(3, 1, 100)
y = numpy.random.normal(150, 40, 100) / x

treino_x = x[:80]
treino_y = y[:80]

meu_modelo = numpy.poly1d(numpy.polyfit(treino_x, treino_y, 4))

minha_linha = numpy.linspace(0, 6, 100)

plt.scatter(treino_x, treino_y)
plt.plot(minha_linha, meu_modelo(minha_linha))
plt.show()
```

> **Nota:** fora do intervalo do dataset, essa curva dá resultados estranhos — por exemplo, ela sugere que um cliente que passasse 6 minutos na loja gastaria 200. Isso é sinal de **overfitting**: o modelo se ajustou demais aos dados de treino, a ponto de "inventar" padrões que não existem de verdade fora deles.

### Medindo com R²

```py
import numpy
from sklearn.metrics import r2_score

numpy.random.seed(2)

x = numpy.random.normal(3, 1, 100)
y = numpy.random.normal(150, 40, 100) / x

treino_x = x[:80]
treino_y = y[:80]

meu_modelo = numpy.poly1d(numpy.polyfit(treino_x, treino_y, 4))

r2 = r2_score(treino_y, meu_modelo(treino_x))

print(r2)
```

A saída é:

```py
0.799
```

Um R² de 0.799 no treino mostra uma relação razoável. Mas o teste de verdade é ver se o modelo se sai bem também nos dados de **teste**, que ele nunca viu durante o treino:

```py
import numpy
from sklearn.metrics import r2_score

numpy.random.seed(2)

x = numpy.random.normal(3, 1, 100)
y = numpy.random.normal(150, 40, 100) / x

treino_x = x[:80]
treino_y = y[:80]

teste_x = x[80:]
teste_y = y[80:]

meu_modelo = numpy.poly1d(numpy.polyfit(treino_x, treino_y, 4))

r2 = r2_score(teste_y, meu_modelo(teste_x))

print(r2)
```

A saída é:

```py
0.809
```

O R² do teste (0.809) fica bem próximo do R² do treino (0.799) — o modelo se comporta de forma parecida em dados que nunca viu, o que dá confiança pra usá-lo em previsões novas.

### Prevendo um valor novo

Quanto um cliente vai gastar se passar 5 minutos na loja?

```py
print(meu_modelo(5))
```

A saída é:

```py
22.88
```

O modelo prevê que um cliente gastaria cerca de 22.88 — um valor que faz sentido olhando pro formato geral do gráfico.

Com dados escalados e devidamente separados em treino e teste, você tem as ferramentas pra confiar (ou desconfiar) de um modelo antes de usá-lo de verdade. No próximo post, você conhece um tipo de modelo bem diferente das regressões vistas até aqui: a árvore de decisão.

**Fonte adaptada:** [Scale](https://www.w3schools.com/python/python_ml_scale.asp), [Train/Test](https://www.w3schools.com/python/python_ml_train_test.asp)
