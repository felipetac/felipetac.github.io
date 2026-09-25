---
layout: post
title: "Pandas #7 - Estatísticas Descritivas e describe()"
date: 2026-08-11 17:30:00
image: '/assets/img/posts/pandas-estatisticas-descritivas-e-describe.webp'
description: Como resumir um DataFrame inteiro com describe(), contar valores únicos com value_counts(), unique() e nunique(), e localizar o índice do maior e do menor valor com idxmax() e idxmin().
category: 'ciência de dados'
tags:
- Ciência de Dados
- Python
- Programação
- Pandas
twitter_text: Estatísticas Descritivas e describe()
introduction: "Nesta parte do tutorial, você vai aprender a resumir dados numéricos e categóricos com describe(), value_counts(), unique(), nunique(), idxmax() e idxmin()."
---

No post anterior você organizou a ordem e os rótulos de um _DataFrame_. Agora que os dados estão limpos e organizados, chegou a hora de resumi-los: em vez de rodar `.mean()`, `.std()` e `.min()` um de cada vez, o Pandas tem métodos que entregam várias estatísticas de uma vez só — ou que resumem colunas de texto e categoria, que não aceitam média nenhuma.

Neste post você vai conhecer `describe()`, `value_counts()`, `unique()`, `nunique()` e `idxmax()`/`idxmin()`.

## Resumindo tudo de uma vez com describe()

`describe()` é provavelmente o método mais usado pra ter uma primeira visão geral de um _DataFrame_ — ele calcula várias estatísticas de cada coluna numérica numa única chamada.

### Exemplo 1 - describe() num DataFrame numérico

```py
import pandas as pd

dados = {
    "idade": [23, 45, 31, 62, 28, 39, 51],
    "salario": [3200, 8900, 5400, 12000, 4100, 6800, 9500]
}

df = pd.DataFrame(dados)
print(df.describe())
```

A saída é:

```py
           idade       salario
count   7.000000      7.000000
mean   39.857143   7128.571429
std    13.797516   3067.960432
min    23.000000   3200.000000
25%    29.500000   4750.000000
50%    39.000000   6800.000000
75%    48.000000   9200.000000
max    62.000000  12000.000000
```

Numa chamada só, você já tem contagem (`count`), média (`mean`), desvio padrão (`std`), mínimo, os três quartis (`25%`, `50%`, `75%`) e máximo — o suficiente pra ter uma ideia da distribuição de cada coluna sem calcular nada manualmente.

> **Nota:** `describe()` calcula esses percentuais só pras colunas numéricas por padrão. Se o seu DataFrame tiver só colunas de texto, `describe()` muda automaticamente pra mostrar `count`, `unique`, `top` (valor mais frequente) e `freq` (quantas vezes ele aparece) — um resumo diferente, mais adequado pra dados categóricos.

## Contando valores únicos com value_counts()

Enquanto `describe()` resume números, `value_counts()` é a ferramenta certa pra colunas de texto ou categoria: ele conta quantas vezes cada valor distinto aparece.

### Exemplo 2 - contando ocorrências

```py
pedidos = pd.DataFrame({
    "status": ["entregue", "enviado", "entregue", "pendente", "entregue", "enviado"]
})

print(pedidos["status"].value_counts())
```

```py
status
entregue    3
enviado     2
pendente    1
Name: count, dtype: int64
```

Por padrão, o resultado já vem ordenado do valor mais frequente pro menos frequente — uma forma rápida de responder "qual status é mais comum?" sem escrever um `groupby()`.

## Valores distintos: unique() e nunique()

Às vezes o que interessa não é a contagem, e sim simplesmente quais valores distintos existem numa coluna, ou quantos são.

### Exemplo 3 - listando e contando valores distintos

```py
print(pedidos["status"].unique())
print(pedidos["status"].nunique())
```

```py
['entregue' 'enviado' 'pendente']
3
```

`unique()` devolve um array com cada valor distinto (na ordem em que apareceu pela primeira vez), e `nunique()` devolve só a contagem — útil, por exemplo, pra confirmar rapidamente quantas categorias diferentes uma coluna tem antes de decidir se vale a pena convertê-la pra `category`.

## Localizando o índice do maior e do menor valor

Por fim, duas funções que respondem "onde" está o valor extremo, não só "qual" é ele.

### Exemplo 4 - idxmax() e idxmin()

```py
print(df["salario"].idxmax())
print(df["salario"].idxmin())
```

```py
3
0
```

`idxmax()` devolve o rótulo do índice onde está o maior valor da coluna (nesse caso, a posição `3`, com salário `12000`), e `idxmin()` faz o mesmo pro menor. É uma diferença importante em relação a `.max()`/`.min()`, que devolvem o próprio valor — `idxmax()`/`idxmin()` devolvem onde aquele valor está, o que é útil quando você quer ver a linha inteira correspondente:

```py
print(df.loc[df["salario"].idxmax()])
```

```py
idade         62
salario    12000
Name: 3, dtype: int64
```

## Personalizando describe() com percentiles e include

Por padrão, `describe()` mostra os quartis 25%, 50% e 75%. O parâmetro `percentiles` deixa você escolher outros cortes — por exemplo, os decis 10% e 90%.

### Exemplo 5 - percentis customizados

```py
print(df.describe(percentiles=[0.1, 0.9]))
```

```py
           idade       salario
count   7.000000      7.000000
mean   39.857143   7128.571429
std    13.797516   3067.960432
min    23.000000   3200.000000
10%    25.400000   3620.000000
50%    39.000000   6800.000000
90%    54.800000  10160.000000
max    62.000000  12000.000000
```

E quando o DataFrame mistura colunas numéricas e de texto, `include="all"` força o `describe()` a resumir todas elas juntas, combinando as duas visões — estatísticas numéricas onde fazem sentido, contagem e valor mais frequente onde não fazem:

```py
dados_mistos = pd.DataFrame({"idade": [23, 45, 31], "cidade": ["Recife", "Recife", "Curitiba"]})
print(dados_mistos.describe(include="all"))
```

```py
            idade   cidade
count    3.000000        3
unique        NaN        2
top           NaN   Recife
freq          NaN        2
mean    33.000000      NaN
std     11.269428      NaN
min     23.000000      NaN
25%     27.000000      NaN
50%     31.000000      NaN
75%     38.000000      NaN
max     45.000000      NaN
```

Cada coluna fica com `NaN` nas estatísticas que não fazem sentido pro seu tipo — `cidade` não tem `mean`, e `idade` não tem `top`/`freq`.

Com `describe()`, `value_counts()`, `unique()`, `nunique()`, `idxmax()` e `idxmin()`, você já consegue resumir tanto colunas numéricas quanto categóricas sem escrever cálculos manuais. O próximo post continua na linha de estatísticas, indo além do resumo estático: funções cumulativas, `rank()` e médias móveis com `rolling()`.

**Fonte adaptada:** [Pandas - Basic Functionality](https://www.tutorialspoint.com/python_pandas/python_pandas_basic_functionality.htm), [Pandas - Descriptive Statistics](https://www.tutorialspoint.com/python_pandas/python_pandas_descriptive_statistics.htm)
