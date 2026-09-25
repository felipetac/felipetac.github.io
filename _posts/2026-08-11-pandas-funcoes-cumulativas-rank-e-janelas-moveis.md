---
layout: post
title: "Pandas #8 - Funções Cumulativas, rank() e Janelas Móveis"
date: 2026-08-11 17:35:00
image: '/assets/img/posts/pandas-funcoes-cumulativas-rank-e-janelas-moveis.webp'
description: Como calcular somas e produtos acumulados com cumsum() e cumprod(), medir variação entre linhas com diff() e pct_change(), ranquear valores com rank() e suavizar séries com médias móveis usando rolling().
category: 'ciência de dados'
tags:
- Ciência de Dados
- Python
- Programação
- Pandas
twitter_text: Funções Cumulativas, rank() e Janelas Móveis
introduction: "Nesta parte do tutorial, você vai aprender funções cumulativas, rank(), pct_change(), cov() e médias móveis com rolling()."
---

No post anterior você viu como resumir uma coluna inteira numa estatística só, como a média ou o máximo. Mas algumas perguntas não têm uma resposta única — "qual é o total acumulado até aqui?" ou "como esse valor varia em relação ao anterior?" dependem da posição de cada linha, não só do conjunto todo. Este post cobre esse tipo de cálculo: funções cumulativas, variação entre linhas, ranking e médias móveis.

## Somas e produtos acumulados

`cumsum()` e `cumprod()` calculam, pra cada posição, o total acumulado até ali — em vez de um número só pro DataFrame inteiro, você recebe uma Series do mesmo tamanho.

### Exemplo 1 - soma acumulada de vendas

```py
import pandas as pd

vendas = pd.Series([120, 95, 140, 80, 110], index=["seg", "ter", "qua", "qui", "sex"])
print(vendas.cumsum())
```

A saída é:

```py
seg    120
ter    215
qua    355
qui    435
sex    545
dtype: int64
```

Cada posição soma o próprio valor com o acumulado de todas as anteriores — a linha `qua`, por exemplo, mostra `355`, que é `120 + 95 + 140`. `cumprod()` funciona igual, só que multiplicando em vez de somar. `cummax()` e `cummin()` seguem a mesma lógica, guardando o maior (ou menor) valor visto até cada posição.

## Variação entre linhas: diff() e pct_change()

Outra pergunta comum é "quanto esse valor mudou em relação ao anterior?" — em valor absoluto (`diff()`) ou em percentual (`pct_change()`).

### Exemplo 2 - diferença absoluta e percentual

```py
print(vendas.diff())
print(vendas.pct_change().round(2))
```

```py
seg      NaN
ter    -25.0
qua     45.0
qui    -60.0
sex     30.0
dtype: float64

seg     NaN
ter   -0.21
qua    0.47
qui   -0.43
sex    0.38
dtype: float64
```

A primeira posição sempre vira `NaN` nos dois casos — não existe "linha anterior" pra comparar. Da segunda em diante, `diff()` mostra a diferença absoluta (terça teve `25` a menos que segunda) e `pct_change()` mostra a variação em proporção (uma queda de `21%`).

## Ranqueando valores com rank()

`rank()` atribui uma posição de ranking a cada valor, do menor pro maior — útil pra responder "essa venda ficou em que colocação entre as demais?".

### Exemplo 3 - ranking de vendas

```py
print(vendas.rank())
```

```py
seg    4.0
ter    2.0
qua    5.0
qui    1.0
sex    3.0
dtype: float64
```

A menor venda (`qui`, com `80`) recebe o rank `1.0`, e a maior (`qua`, com `140`) recebe `5.0`. Por padrão o `rank()` é crescente e devolve `float`, já que em caso de empate ele atribui a média das posições empatadas.

> **Nota:** o parâmetro `method` do `rank()` controla como empates são tratados — o padrão (`"average"`) usado no exemplo divide a posição entre os empatados; `method="min"` dá a menor posição possível pra todos os empatados, e `method="first"` desempata pela ordem de aparição na Series.

## Covariância com cov()

Mais adiante nesta série você vai encontrar `.corr()`, que normaliza a relação entre duas colunas pra um valor entre -1 e 1. `.cov()` calcula a covariância — a mesma ideia, mas numa escala que depende da grandeza dos próprios dados, o que a torna mais difícil de interpretar isoladamente.

```py
calorias = pd.Series([280, 340, 380, 300, 320], index=vendas.index)
print(vendas.cov(calorias))
```

```py
715.0
```

> **Nota:** o valor `715.0` sozinho não diz muito — não dá pra saber, só olhando pra ele, se a relação é forte ou fraca. É justamente por isso que `.corr()`, no próximo post, costuma ser mais útil no dia a dia: ele normaliza esse número bruto da covariância pra uma escala comparável entre quaisquer duas colunas.

## Médias móveis com rolling()

Por fim, `rolling()` calcula uma estatística sobre uma "janela" de linhas vizinhas, que desliza ao longo da Series — a base de qualquer média móvel.

### Exemplo 4 - média móvel de 3 dias

```py
print(vendas.rolling(3).mean())
```

```py
seg           NaN
ter           NaN
qua    118.333333
qui    105.000000
sex    110.000000
dtype: float64
```

As duas primeiras posições ficam `NaN`, porque ainda não existem 3 valores pra formar a primeira janela completa. A partir da terceira posição, cada valor é a média das 3 linhas mais recentes (incluindo a própria) — `qua` mostra a média de `seg`, `ter` e `qua` (`118.33`), e a janela "desliza" uma posição a cada linha seguinte.

> **Nota:** além de `rolling()` (janela de tamanho fixo), o Pandas também tem `expanding()` (janela que cresce desde o início da série) e `ewm()` (média com peso exponencial, dando mais importância aos valores recentes) — ambos seguem a mesma lógica de encadear um método de agregação (`.mean()`, `.sum()`) depois deles.

Com funções cumulativas, `diff()`, `pct_change()`, `rank()`, `cov()` e `rolling()`, você já cobre a maior parte das perguntas sobre tendência e variação ao longo de uma série. O próximo post volta ao tema de correlação e visualização, agora com o contexto de covariância que você acabou de ver.

**Fonte adaptada:** [Pandas - Descriptive Statistics](https://www.tutorialspoint.com/python_pandas/python_pandas_descriptive_statistics.htm), [Pandas - Statistical Functions](https://www.tutorialspoint.com/python_pandas/python_pandas_statistical_functions.htm), [Pandas - Window Functions](https://www.tutorialspoint.com/python_pandas/python_pandas_window_functions.htm)
