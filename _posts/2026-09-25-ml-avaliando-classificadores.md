---
layout: post
title: "Machine Learning #10 - Avaliando Classificadores: Matriz de Confusão e Curva AUC-ROC"
date: 2026-09-25 14:40:00
image: '/assets/img/posts/ml-avaliando-classificadores.webp'
description: Como avaliar um modelo de classificação além da acurácia simples, usando matriz de confusão (accuracy, precision, recall, specificity, F-score) e a curva AUC-ROC.
category: 'ciência de dados'
tags:
- Python
- Programação
- Avaliação de Modelos
twitter_text: "Machine Learning #10 - Avaliando Classificadores: Matriz de Confusão e Curva AUC-ROC"
introduction: "Nesta parte da série, você vai aprender a avaliar um modelo de classificação de verdade, usando matriz de confusão e a curva AUC-ROC."
---

A árvore de decisão do post anterior classifica — "vai" ou "não vai" ao show. Mas como saber se ela está fazendo um bom trabalho? Contar quantas vezes o modelo acertou já ajuda, mas esconde detalhes importantes, principalmente quando os erros não custam a mesma coisa. Este post cobre duas formas de enxergar isso com mais profundidade.

## Matriz de confusão

Uma matriz de confusão é uma tabela usada em problemas de classificação pra localizar onde exatamente o modelo errou. As linhas representam a classe real; as colunas representam o que o modelo previu — com essa tabela, fica fácil ver quais previsões saíram erradas.

```py
import matplotlib.pyplot as plt
import numpy
from sklearn import metrics

real = numpy.random.binomial(1, .9, size=1000)
previsto = numpy.random.binomial(1, .9, size=1000)

matriz_confusao = metrics.confusion_matrix(real, previsto)

exibicao_cm = metrics.ConfusionMatrixDisplay(confusion_matrix=matriz_confusao, display_labels=[0, 1])

exibicao_cm.plot()
plt.show()
```

A matriz gerada tem quatro quadrantes:

- **Verdadeiro Negativo** (canto superior esquerdo)
- **Falso Positivo** (canto superior direito)
- **Falso Negativo** (canto inferior esquerdo)
- **Verdadeiro Positivo** (canto inferior direito)

"Verdadeiro" significa que o valor foi previsto corretamente; "Falso" significa que houve erro na previsão.

### As métricas que a matriz revela

A partir desses quatro números, dá pra calcular várias métricas úteis:

**Acurácia (accuracy)** — o quanto o modelo acerta, no geral:

```
(Verdadeiro Positivo + Verdadeiro Negativo) / Total de Previsões
```

```py
Acuracia = metrics.accuracy_score(real, previsto)
```

**Precisão (precision)** — dos casos que o modelo previu como positivos, quantos realmente são? Não considera os negativos corretamente previstos:

```
Verdadeiro Positivo / (Verdadeiro Positivo + Falso Positivo)
```

```py
Precisao = metrics.precision_score(real, previsto)
```

**Sensibilidade / Recall (sensitivity)** — de todos os casos que realmente são positivos, quantos o modelo conseguiu identificar? Mede o quão bom o modelo é em prever positivos:

```
Verdadeiro Positivo / (Verdadeiro Positivo + Falso Negativo)
```

```py
Sensibilidade = metrics.recall_score(real, previsto)
```

**Especificidade (specificity)** — o espelho da sensibilidade, olhando pro lado dos negativos: usa a mesma função `recall_score`, mas invertendo qual rótulo é considerado "positivo":

```
Verdadeiro Negativo / (Verdadeiro Negativo + Falso Positivo)
```

```py
Especificidade = metrics.recall_score(real, previsto, pos_label=0)
```

**F-score** — a "média harmônica" entre precisão e sensibilidade, considerando tanto falsos positivos quanto falsos negativos. É uma boa escolha pra datasets desbalanceados, mas não leva em conta os verdadeiros negativos:

```
2 * ((Precisão * Sensibilidade) / (Precisão + Sensibilidade))
```

```py
F1 = metrics.f1_score(real, previsto)
```

Dá pra calcular tudo de uma vez:

```py
print({
    "Acuracia": Acuracia,
    "Precisao": Precisao,
    "Sensibilidade": Sensibilidade,
    "Especificidade": Especificidade,
    "F1": F1,
})
```

> **Nota:** como `real` e `previsto` são gerados aleatoriamente com `numpy.random.binomial()`, os valores dessas métricas mudam a cada execução — o importante aqui é entender o que cada uma mede, não decorar um número específico.

## Curva AUC-ROC

A métrica mais popular de classificação é a acurácia — fácil de entender, mas nem sempre conta a história toda. A **AUC** (area under the ROC curve, área sob a curva ROC) é outra métrica comum. A curva **ROC** (Receiver Operating Characteristic) plota a taxa de verdadeiros positivos contra a taxa de falsos positivos em diferentes limiares (thresholds) de classificação — ela mostra, usando probabilidade, o quão bem um modelo separa as duas classes.

### O problema dos dados desbalanceados

Imagine um dataset onde 95% dos casos são de uma única classe. Um modelo "preguiçoso" que sempre prevê essa classe majoritária já teria acurácia altíssima, sem aprender nada de útil:

```py
import numpy as np
from sklearn.metrics import accuracy_score, confusion_matrix, roc_auc_score, roc_curve

n = 10000
proporcao = .95
n_0 = int((1 - proporcao) * n)
n_1 = int(proporcao * n)

y = np.array([0] * n_0 + [1] * n_1)

# probabilidades de um modelo hipotético que sempre prevê a classe majoritária
y_proba = np.array([1] * n)
y_pred = y_proba > .5

print(f'acurácia: {accuracy_score(y, y_pred)}')
cf_mat = confusion_matrix(y, y_pred)
print('Matriz de confusão')
print(cf_mat)
print(f'acurácia da classe 0: {cf_mat[0][0] / n_0}')
print(f'acurácia da classe 1: {cf_mat[1][1] / n_1}')
```

A acurácia geral fica alta, mas a classe 0 nunca é prevista corretamente (0% de acerto) — o modelo simplesmente ignora essa classe inteira. Agora compare com um segundo modelo, que não aposta sempre na mesma classe:

```py
y_proba_2 = np.array(
    np.random.uniform(0, .7, n_0).tolist() +
    np.random.uniform(.3, 1, n_1).tolist()
)
y_pred_2 = y_proba_2 > .5

print(f'acurácia: {accuracy_score(y, y_pred_2)}')
cf_mat = confusion_matrix(y, y_pred_2)
print('Matriz de confusão')
print(cf_mat)
print(f'acurácia da classe 0: {cf_mat[0][0] / n_0}')
print(f'acurácia da classe 1: {cf_mat[1][1] / n_1}')
```

A acurácia geral do segundo modelo é menor, mas a acurácia por classe fica bem mais equilibrada. Usando só a acurácia como critério, o primeiro modelo pareceria melhor — mesmo não dizendo nada de útil sobre os dados. É exatamente nesse tipo de caso que a AUC ajuda.

### Desenhando a curva e calculando a AUC

```py
import matplotlib.pyplot as plt

def plotar_curva_roc(y_real, y_prob):
    fpr, tpr, thresholds = roc_curve(y_real, y_prob)
    plt.plot(fpr, tpr)
    plt.xlabel('Taxa de Falsos Positivos')
    plt.ylabel('Taxa de Verdadeiros Positivos')

plotar_curva_roc(y, y_proba)
print(f'AUC do modelo 1: {roc_auc_score(y, y_proba)}')
```

A saída é:

```py
AUC do modelo 1: 0.5
```

```py
plotar_curva_roc(y, y_proba_2)
print(f'AUC do modelo 2: {roc_auc_score(y, y_proba_2)}')
```

A saída é:

```py
AUC do modelo 2: 0.8270551578947367
```

Um AUC em torno de 0.5 significa que o modelo não consegue distinguir as duas classes — a curva fica numa linha reta diagonal. Um AUC mais próximo de 1 significa que o modelo separa bem as classes, e a curva se aproxima do canto superior esquerdo do gráfico. O modelo 1 (que sempre prevê a mesma classe) tem AUC 0.5, mesmo com acurácia altíssima — confirmando que, sozinha, a acurácia enganou.

### Confiança nas previsões

A AUC também é sensível ao quão "confiantes" são as probabilidades previstas pelo modelo — não só se a previsão final está certa ou errada. Compare dois modelos com o mesmo formato de dados, mas com probabilidades mais "na dúvida" (perto de 0.5) ou mais "decididas" (perto de 0 ou 1):

```py
import numpy as np

n = 10000
y = np.array([0] * n + [1] * n)

# modelo 1: probabilidades mais hesitantes
y_prob_1 = np.array(
    np.random.uniform(.25, .5, n // 2).tolist() +
    np.random.uniform(.3, .7, n).tolist() +
    np.random.uniform(.5, .75, n // 2).tolist()
)

# modelo 2: probabilidades mais confiantes
y_prob_2 = np.array(
    np.random.uniform(0, .4, n // 2).tolist() +
    np.random.uniform(.3, .7, n).tolist() +
    np.random.uniform(.6, 1, n // 2).tolist()
)

print(f'acurácia do modelo 1: {accuracy_score(y, y_prob_1 > .5)}')
print(f'acurácia do modelo 2: {accuracy_score(y, y_prob_2 > .5)}')

print(f'AUC do modelo 1: {roc_auc_score(y, y_prob_1)}')
print(f'AUC do modelo 2: {roc_auc_score(y, y_prob_2)}')
```

Mesmo que as acurácias dos dois modelos acabem parecidas, o modelo com AUC mais alto é mais confiável — porque ele leva em conta a probabilidade prevista, não só o veredito final acima ou abaixo de 0.5. Na prática, isso costuma significar maior acurácia ao prever dados novos no futuro.

Com matriz de confusão e AUC-ROC, você tem duas ferramentas pra ir além do "quantos acertos" e enxergar como o modelo está errando. No próximo post, a série muda de aprendizado supervisionado pra não supervisionado, com técnicas de agrupamento: clustering hierárquico e K-Means.

**Fonte adaptada:** [Confusion Matrix](https://www.w3schools.com/python/python_ml_confusion_matrix.asp), [AUC - ROC Curve](https://www.w3schools.com/python/python_ml_auc_roc.asp)
