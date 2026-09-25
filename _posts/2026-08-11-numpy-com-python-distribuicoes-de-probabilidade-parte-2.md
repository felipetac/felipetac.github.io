---
layout: post
title: "NumPy #10 - Distribuições de Probabilidade (Parte 2)"
date: 2026-08-11 16:52:00
image: '/assets/img/posts/numpy-com-python-distribuicoes-de-probabilidade-parte-2.webp'
description: Como gerar dados com as distribuições Exponencial, Qui-Quadrado, Rayleigh, Pareto, Logística, Multinomial e Zipf usando numpy.random.
category: 'ciência de dados'
tags:
- Ciência de Dados
- Python
- Programação
- Numpy
twitter_text: "NumPy #10 - Distribuições de Probabilidade (Parte 2)"
introduction: "Nesta parte do tutorial, você vai conhecer as distribuições Exponencial, Qui-Quadrado, Rayleigh, Pareto, Logística, Multinomial e Zipf do numpy.random."
---

Na [primeira parte](/numpy-com-python-distribuicoes-de-probabilidade-parte-1/), você viu embaralhamento, uma introdução ao Seaborn, e as distribuições Normal, Binomial, Poisson e Uniforme. Fechando o assunto (e a série), sobraram sete distribuições mais específicas — cada uma com um caso de uso bem particular, mas que seguem o mesmo padrão de parâmetros (`loc`/`scale`/`size` ou equivalentes) que você já está acostumado a ver.

## Distribuição Exponencial

A Exponencial descreve o tempo até o próximo evento acontecer — e tem uma relação direta com a Poisson (que descreve _quantos_ eventos acontecem em um intervalo): se o número de eventos segue Poisson, o tempo _entre_ eventos segue Exponencial.

```py
import numpy as np

resultado = np.random.exponential(scale=2, size=(2, 3))

print(resultado)
```

A saída é (os valores mudam a cada execução):

```py
[[1.12 4.87 0.34]
 [2.95 0.71 3.08]]
```

`scale` é o inverso da taxa de ocorrência (quanto maior o `scale`, mais tempo se espera até o próximo evento, em média).

Pra visualizar as duas lado a lado e comparar o formato de cada curva, o `sns.displot()` (visto na parte 1) aceita um dicionário no lugar de um único array:

```py
import matplotlib.pyplot as plt
import seaborn as sns

dados = {
    "poisson": np.random.poisson(lam=5, size=1000),
    "exponencial": np.random.exponential(scale=5, size=1000)
}

sns.displot(dados, kind="kde")
plt.show()
```

A Poisson fica concentrada em torno de `5` (o `lam`), com uma curva simétrica; a Exponencial começa alta perto de `0` e cai continuamente — o formato típico de "tempo até o próximo evento", onde intervalos curtos são muito mais comuns que intervalos longos.

## Distribuição Qui-Quadrado (Chi Square)

A Qui-Quadrado é usada bastante em testes de hipótese estatísticos — por exemplo, pra verificar se a diferença entre um resultado observado e um esperado é significativa ou só coincidência.

```py
resultado = np.random.chisquare(df=2, size=(2, 3))

print(resultado)
```

A saída é:

```py
[[0.85 3.41 1.02]
 [4.76 0.19 2.33]]
```

`df` é o número de "graus de liberdade" da distribuição — um parâmetro que vem direto da teoria estatística por trás dela e que muda o formato da curva.

## Distribuição de Rayleigh

A Rayleigh aparece bastante em processamento de sinais (por exemplo, para modelar a magnitude de um sinal de rádio sujeito a ruído). Ela é, na prática, um caso particular da Qui-Quadrado com 2 graus de liberdade.

```py
resultado = np.random.rayleigh(scale=2, size=(2, 3))

print(resultado)
```

A saída é:

```py
[[2.34 1.02 3.87]
 [0.91 2.65 1.48]]
```

## Distribuição de Pareto

A Pareto é a base matemática da "regra 80-20" (80% dos efeitos vêm de 20% das causas) — muito usada em economia e análise de negócios, por exemplo pra modelar como uma pequena fração dos clientes costuma gerar a maior parte da receita.

```py
resultado = np.random.pareto(a=2, size=(2, 3))

print(resultado)
```

A saída é:

```py
[[0.42 1.87 0.15]
 [2.93 0.08 0.61]]
```

`a` é o parâmetro de forma da distribuição — quanto maior, mais concentrados ficam os valores perto de zero (e mais raros os valores extremos).

## Distribuição Logística

A Logística é parecida com a Normal (mesma curva em sino, mesma simetria), mas com "caudas" mais pesadas — valores extremos aparecem com um pouco mais de frequência. Ela é a base matemática da regressão logística e aparece como função de ativação em redes neurais.

```py
resultado = np.random.logistic(loc=1, scale=2, size=(2, 3))

print(resultado)
```

A saída é:

```py
[[ 2.14 -1.32  4.05]
 [-0.28  3.61  0.87]]
```

`loc` e `scale` funcionam igual à distribuição Normal — centro e dispersão da curva.

## Distribuição Multinomial

A Multinomial generaliza a Binomial: em vez de só dois resultados possíveis (sucesso/fracasso), ela lida com múltiplos resultados possíveis por tentativa — o exemplo clássico é rolar um dado de 6 lados várias vezes.

```py
resultado = np.random.multinomial(n=6, pvals=[1/6] * 6)

print(resultado)
```

A saída é:

```py
[0 2 1 0 2 1]
```

`n` é o número de tentativas (6 rolagens de dado) e `pvals` é a lista de probabilidades de cada resultado possível (aqui, 1/6 pra cada face, um dado honesto). O array de saída não é um único número — é a contagem de quantas vezes cada face saiu, então a soma dos elementos do resultado sempre bate com `n`.

## Distribuição de Zipf

A lei de Zipf diz que, em muitos conjuntos de dados do mundo real, o segundo item mais comum aparece com aproximadamente metade da frequência do mais comum, o terceiro com um terço, e assim por diante — é o padrão clássico de frequência de palavras em um texto (a palavra mais usada aparece muito mais que a segunda mais usada).

```py
resultado = np.random.zipf(a=2, size=1000)

filtrado = resultado[resultado < 10]
print(filtrado[:15])
```

A saída é:

```py
[1 2 1 1 3 1 5 1 2 1 4 1 1 2 7]
```

Com `size=1000`, a distribuição de Zipf gera muitos valores altos (às vezes bem extremos) — por isso o filtro `resultado[resultado < 10]`, a mesma técnica de máscara booleana vista lá no post #3, é útil aqui pra cortar os valores muito grandes antes de visualizar a distribuição com `sns.displot()`.

Com essas sete distribuições, mais as quatro da primeira parte, você tem um repertório sólido pra simular praticamente qualquer tipo de dado que precisar em um experimento. Fechando a série de vez, falta um assunto bem prático que ainda não apareceu: o que fazer com valores ausentes em um array, e como ler e salvar arrays em arquivo.

**Fonte adaptada:** [Exponential Distribution](https://www.w3schools.com/python/numpy/numpy_random_exponential.asp), [Chi Square Distribution](https://www.w3schools.com/python/numpy/numpy_random_chisquare.asp), [Rayleigh Distribution](https://www.w3schools.com/python/numpy/numpy_random_rayleigh.asp), [Pareto Distribution](https://www.w3schools.com/python/numpy/numpy_random_pareto.asp), [Logistic Distribution](https://www.w3schools.com/python/numpy/numpy_random_logistic.asp), [Multinomial Distribution](https://www.w3schools.com/python/numpy/numpy_random_multinomial.asp), [Zipf Distribution](https://www.w3schools.com/python/numpy/numpy_random_zipf.asp)
