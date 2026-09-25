---
layout: post
title: "Pandas #6 - Ordenando e Reindexando DataFrames"
date: 2026-08-11 17:25:00
image: '/assets/img/posts/pandas-ordenando-e-reindexando-dataframes.webp'
description: Como ordenar um DataFrame por valores ou por índice com sort_values() e sort_index(), e como reindexar com reindex() para encaixar dados em um novo conjunto de rótulos.
category: 'ciência de dados'
tags:
- Ciência de Dados
- Python
- Programação
- Pandas
twitter_text: "Pandas #6 - Ordenando e Reindexando DataFrames"
introduction: "Nesta parte do tutorial, você vai aprender a ordenar DataFrames com sort_values() e sort_index(), e a reindexar dados com reindex()."
---

No post anterior você viu como preencher lacunas de um jeito mais inteligente que um valor fixo. Este post continua no tema de organizar um _DataFrame_, mas de um ângulo diferente: a ordem das linhas e os próprios rótulos do índice. Você vai ver como ordenar dados com `sort_values()` e `sort_index()`, e como encaixar um _DataFrame_ num conjunto de rótulos diferente com `reindex()` — que, aliás, é onde `ffill()`/`bfill()` do post anterior voltam a aparecer.

## Ordenando por valor com sort_values()

O jeito mais comum de ordenar um _DataFrame_ é por valor de uma coluna — do menor pro maior preço, do mais recente pro mais antigo, etc.

### Exemplo 1 - ordenando por uma coluna

```py
import pandas as pd

dados = {
    "produto": ["Notebook", "Mouse", "Teclado", "Monitor"],
    "preco": [3200, 89, 150, 890]
}

df = pd.DataFrame(dados)
print(df.sort_values("preco"))
```

A saída é:

```py
    produto  preco
1     Mouse     89
2   Teclado    150
3   Monitor    890
0  Notebook   3200
```

Por padrão a ordenação é crescente. Pra inverter, use `ascending=False`:

```py
print(df.sort_values("preco", ascending=False))
```

### Exemplo 2 - ordenando por múltiplas colunas

Passando uma lista em `by`, o Pandas ordena primeiro pela primeira coluna, e usa a segunda só como critério de desempate:

```py
dados_vendas = {
    "categoria": ["Informática", "Áudio", "Informática", "Áudio"],
    "produto": ["Notebook", "Headset", "Mouse", "Fone"],
    "unidades": [8, 20, 45, 20]
}

df_vendas = pd.DataFrame(dados_vendas)
print(df_vendas.sort_values(by=["categoria", "unidades"]))
```

```py
     categoria  produto  unidades
3        Áudio     Fone        20
1        Áudio  Headset        20
2  Informática    Mouse        45
0  Informática  Notebook         8
```

Repare que `Fone` e `Headset` têm o mesmo número de unidades (`20`) — como o desempate não foi especificado por uma terceira coluna, eles mantiveram a ordem em que já apareciam no _DataFrame_ original.

## Ordenando pelo índice com sort_index()

Depois de algumas operações (como um `.loc` com lista fora de ordem, ou um `concat()`), o índice pode acabar bagunçado. `sort_index()` reorganiza o _DataFrame_ pela ordem dos próprios rótulos, não pelos valores das colunas.

### Exemplo 3 - reordenando pelo índice

```py
df_bagunçado = df.loc[[3, 0, 2, 1]]
print(df_bagunçado)
print(df_bagunçado.sort_index())
```

```py
    produto  preco
3   Monitor    890
0  Notebook   3200
2   Teclado    150
1     Mouse     89

    produto  preco
0  Notebook   3200
1     Mouse     89
2   Teclado    150
3   Monitor    890
```

### Ordenando com valores ausentes

Colunas com `NaN` merecem atenção na hora de ordenar — por padrão, o Pandas sempre joga os valores ausentes pro final, independente da direção da ordenação.

```py
precos_com_falha = pd.Series([150, None, 89, 3200])
print(precos_com_falha.sort_values())
print(precos_com_falha.sort_values(ascending=False))
```

```py
2      89.0
0     150.0
3    3200.0
1       NaN
dtype: float64

3    3200.0
0     150.0
2      89.0
1       NaN
dtype: float64
```

Repare que o `NaN` fica na última posição nos dois casos, mesmo com `ascending=False` invertendo a ordem dos demais valores. Pra mudar esse comportamento, o parâmetro `na_position` aceita `"first"` pra jogar os ausentes pro início em vez do fim.

## Reindexando com reindex()

`reindex()` faz algo diferente de ordenar: ele encaixa o _DataFrame_ num novo conjunto de rótulos, que você especifica — rótulos que já existiam mantêm seu valor, e rótulos novos entram com `NaN`.

### Exemplo 4 - reindexando com novos rótulos

```py
serie = pd.Series([89, 150, 3200], index=["mouse", "teclado", "notebook"])
nova_ordem = ["notebook", "teclado", "mouse", "headset"]

print(serie.reindex(nova_ordem))
```

```py
notebook    3200.0
teclado      150.0
mouse         89.0
headset        NaN
dtype: float64
```

`headset` não existia na _Series_ original, então entrou com `NaN` — é exatamente o tipo de lacuna que `ffill()`, `bfill()` ou `interpolate()`, vistos no post anterior, podem resolver logo em seguida. Inclusive, o próprio `reindex()` aceita um parâmetro `method` pra já preencher na hora.

### Exemplo 5 - reindexando e preenchendo ao mesmo tempo

```py
print(serie.reindex(nova_ordem, method="ffill"))
```

Nesse caso específico o resultado não muda `headset` (porque não existe um valor anterior na nova ordem pra copiar — o `method` do `reindex()` segue a ordem da lista de rótulos nova, não a original), mas o parâmetro é útil quando a lista de rótulos é uma sequência contínua, como preencher dias que faltam num índice de datas.

Além de `method`, `reindex()` também aceita `fill_value` pra definir um valor fixo de preenchimento (em vez de copiar de uma direção), do mesmo jeito que você viu em `.add()` no post de operações aritméticas:

```py
print(serie.reindex(nova_ordem, fill_value=0))
```

```py
notebook    3200
teclado      150
mouse         89
headset        0
dtype: int64
```

> **Nota:** `reindex_like(outro_df)` é um atalho pra reindexar um _DataFrame_ usando exatamente o índice de outro _DataFrame_ já existente — útil quando você quer garantir que duas tabelas tenham as mesmas linhas antes de operar entre elas.

Com `sort_values()`, `sort_index()` e `reindex()`, você já controla tanto a ordem quanto os próprios rótulos de um _DataFrame_. O próximo post muda de assunto: estatísticas descritivas, começando pelo método que resume uma coluna inteira numa única chamada, `describe()`.

**Fonte adaptada:** [Pandas - Sorting](https://www.tutorialspoint.com/python_pandas/python_pandas_sorting.htm), [Pandas - Reindexing](https://www.tutorialspoint.com/python_pandas/python_pandas_reindexing.htm)
