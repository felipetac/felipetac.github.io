---
layout: post
title: "Pandas #5 - Dados Ausentes: isna(), ffill(), bfill() e interpolate()"
date: 2026-08-11 17:20:00
image: '/assets/img/posts/pandas-dados-ausentes-isna-ffill-bfill-e-interpolate.webp'
description: Como inspecionar dados ausentes com isna() e notna(), preencher lacunas na direção certa com ffill() e bfill(), e estimar valores intermediários com interpolate().
category: 'ciência de dados'
tags:
- Ciência de Dados
- Python
- Programação
- Pandas
twitter_text: Dados Ausentes - isna(), ffill(), bfill() e interpolate()
introduction: "Nesta parte do tutorial, você vai aprofundar no tratamento de dados ausentes no Pandas, com isna(), notna(), ffill(), bfill() e interpolate()."
---

No post anterior você viu as duas ferramentas mais diretas pra lidar com células vazias: `dropna()`, que remove as linhas, e `fillna()`, que preenche com um valor fixo ou estatístico. Elas resolvem a maioria dos casos, mas não são as únicas opções — às vezes você só quer saber onde estão os vazios sem mexer em nada ainda, e às vezes o melhor preenchimento não é uma média, e sim o valor mais próximo na linha do tempo.

Neste post você vai ver três ferramentas que complementam o que já foi visto: `isna()`/`notna()` pra inspecionar sem remover, `ffill()`/`bfill()` pra preencher na direção certa, e `interpolate()` pra estimar valores intermediários.

## Inspecionando sem remover: isna() e notna()

Antes de decidir o que fazer com uma célula vazia, às vezes você só quer confirmar onde ela está — sem descartar nada ainda. `isna()` devolve uma máscara booleana, `True` em cada posição vazia.

### Exemplo 1 - localizando valores ausentes

```py
import pandas as pd

dados = {
    "dia": [1, 2, 3, 4, 5],
    "temperatura": [24.5, None, 23.8, None, 25.1]
}

df = pd.DataFrame(dados)
print(df["temperatura"].isna())
```

A saída é:

```py
0    False
1     True
2    False
3     True
4    False
Name: temperatura, dtype: bool
```

`notna()` é o inverso exato — `True` onde o valor existe. Como qualquer máscara booleana, dá pra usar direto pra filtrar:

```py
print(df[df["temperatura"].isna()])
```

```py
   dia  temperatura
1    2          NaN
3    4          NaN
```

Isso é útil pra medir o tamanho do problema antes de decidir a estratégia — por exemplo, `df["temperatura"].isna().sum()` conta quantas células estão vazias, já que `True` vale `1` numa soma.

## Preenchendo na direção certa: ffill() e bfill()

Preencher com a média (como no post anterior) faz sentido pra dados sem ordem específica. Mas em séries com uma sequência natural — como leituras de um dia após o outro — muitas vezes o preenchimento mais sensato é repetir o último valor conhecido. É pra isso que existem `ffill()` (_forward fill_) e `bfill()` (_backward fill_).

### Exemplo 2 - preenchendo com o valor anterior (ffill)

```py
print(df["temperatura"].ffill())
```

```py
0    24.5
1    24.5
2    23.8
3    23.8
4    25.1
Name: temperatura, dtype: float64
```

Cada `NaN` foi substituído pelo último valor válido antes dele — a posição `1` copiou o `24.5` da posição `0`, e a posição `3` copiou o `23.8` da posição `2`.

### Exemplo 3 - preenchendo com o valor seguinte (bfill)

```py
print(df["temperatura"].bfill())
```

```py
0    24.5
1    23.8
2    23.8
3    25.1
4    25.1
Name: temperatura, dtype: float64
```

`bfill()` faz o caminho inverso: cada `NaN` recebe o próximo valor válido depois dele.

> **Nota:** se o `NaN` estiver na primeira posição, `ffill()` não tem valor anterior pra copiar e a célula continua vazia; o mesmo vale pro `bfill()` numa lacuna na última posição. Nesses casos, vale combinar os dois (`ffill()` seguido de `bfill()`) ou aceitar que alguma lacuna nas pontas da série vai continuar sem preenchimento.

### Limitando quantas células consecutivas preencher

Repetir o mesmo valor indefinidamente pode não fazer sentido se a lacuna for muito grande — o parâmetro `limit` restringe quantas células consecutivas cada chamada preenche.

```py
serie_com_lacuna = pd.Series([10, None, None, None, 20])
print(serie_com_lacuna.ffill(limit=1))
```

```py
0    10.0
1    10.0
2     NaN
3     NaN
4    20.0
dtype: float64
```

Com `limit=1`, só a primeira célula vazia depois de um valor válido foi preenchida — as duas seguintes continuaram `NaN`, porque já ultrapassaram o limite.

## Estimando valores com interpolate()

`ffill()` e `bfill()` simplesmente copiam um valor existente. Quando os dados variam de forma mais ou menos contínua, `interpolate()` costuma dar uma estimativa mais realista: ele calcula um valor intermediário entre o ponto anterior e o seguinte.

### Exemplo 4 - interpolação linear

```py
print(df["temperatura"].interpolate())
```

```py
0    24.50
1    24.15
2    23.80
3    24.45
4    25.10
Name: temperatura, dtype: float64
```

Por padrão (`method="linear"`), o Pandas traça uma reta entre os dois valores válidos mais próximos e calcula o ponto correspondente — a posição `1`, entre `24.5` e `23.8`, virou a média dos dois (`24.15`), e a posição `3`, entre `23.8` e `25.1`, virou `24.45`.

> **Nota:** `interpolate()` tem outros métodos além do linear — `method="time"`, por exemplo, leva em conta o espaçamento real entre datas quando o índice é temporal, em vez de assumir que os pontos estão igualmente espaçados. Vale a pena revisitar esse parâmetro quando o índice do seu DataFrame for de datas.

Com `isna()`, `notna()`, `ffill()`, `bfill()` e `interpolate()`, você tem agora um conjunto bem mais completo de estratégias pra dados ausentes do que só remover ou preencher com um valor fixo. O próximo post continua no tema de organização de dados, mas de um ângulo diferente: como ordenar e reindexar um _DataFrame_.

**Fonte adaptada:** [Pandas - Missing Data](https://www.tutorialspoint.com/python_pandas/python_pandas_missing_data.htm), [Pandas - Filling Missing Data](https://www.tutorialspoint.com/python_pandas/python_pandas_filling_missing_data.htm), [Pandas - Interpolation of Missing Values](https://www.tutorialspoint.com/python_pandas/python_pandas_interpolation_of_missing_values.htm)
