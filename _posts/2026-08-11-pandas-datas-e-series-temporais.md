---
layout: post
title: "#8 - Datas e Séries Temporais no Pandas"
date: 2026-08-11 16:40:00
image: '/assets/img/posts/pandas-datas-e-series-temporais.webp'
description: Como gerar datas com date_range(), usar datas como índice de um DataFrame, extrair ano e mês com o acessor .dt e reamostrar séries com resample().
category: 'ciência de dados'
tags:
- Ciência de Dados
- Python
- Programação
- Pandas
twitter_text: Datas e Séries Temporais no Pandas
introduction: "Nesta parte do tutorial, você vai aprender a trabalhar com datas no Pandas: date_range(), índice temporal, o acessor .dt e resample()."
---

Fechando esta segunda leva de posts sobre Pandas, falta um tipo de dado que aparece o tempo todo em análises reais: datas. Vendas por dia, pedidos por mês, sensores registrando uma medida por hora — sempre que existe uma dimensão de tempo envolvida, vale a pena aprender a trabalhar com ela do jeito que o Pandas foi desenhado pra lidar: não como texto solto, mas como uma estrutura temporal de verdade.

## Relembrando o to_datetime()

Lá no post sobre limpeza de dados você já viu o `pd.to_datetime()`, usado pra converter uma coluna de texto (com formatos até inconsistentes) numa coluna do tipo `datetime64`. Ele continua sendo o ponto de entrada pra qualquer data que já existe nos seus dados, vinda de um CSV ou de uma API:

```py
import pandas as pd

data = pd.to_datetime("2026-03-10")
print(data)
print(type(data))
```

A saída é:

```py
2026-03-10 00:00:00
<class 'pandas._libs.tslibs.timestamps.Timestamp'>
```

Um `Timestamp` é o jeito do Pandas de representar um ponto específico no tempo — o equivalente a um `datetime` do Python puro, só que otimizado pra trabalhar em massa dentro de uma _Series_ ou de um índice.

## Gerando sequências de datas com date_range()

Quando você precisa de uma sequência de datas — pra simular dados, gerar um calendário ou servir de índice — `pd.date_range()` gera exatamente isso.

### Exemplo 1 - sequência diária

```py
datas = pd.date_range("2026-01-01", periods=5)
print(datas)
```

```py
DatetimeIndex(['2026-01-01', '2026-01-02', '2026-01-03', '2026-01-04',
               '2026-01-05'],
              dtype='datetime64[ns]', freq='D')
```

`periods` define quantas datas gerar, e a frequência padrão é diária (`freq='D'`).

### Exemplo 2 - outras frequências

```py
print(pd.date_range("2026-01-01", periods=5, freq="ME"))
```

```py
DatetimeIndex(['2026-01-31', '2026-02-28', '2026-03-31', '2026-04-30',
               '2026-05-31'],
              dtype='datetime64[ns]', freq='ME')
```

`freq="ME"` gera o último dia de cada mês (_month end_). Outros aliases comuns: `"W"` (semanal), `"h"` (a cada hora), `"MS"` (primeiro dia de cada mês) e `"B"` (dias úteis, pulando sábado e domingo).

> **Nota:** em versões mais antigas do Pandas o alias de fim de mês era `"M"`; a partir do Pandas 2.2 o recomendado é `"ME"`, pra deixar mais claro que se trata de fim de mês (_month end_) e não de minuto. Se você encontrar `freq="M"` em código ou tutorial mais antigo, é a mesma ideia.

## Usando datas como índice

Onde datas realmente brilham no Pandas é como índice de um _DataFrame_ — isso libera uma série de operações específicas pra série temporal, como fatiar por período e reamostrar.

```py
datas = pd.date_range("2026-01-01", periods=12, freq="D")
vendas = [120, 95, 140, 80, 110, 130, 150, 90, 100, 125, 115, 105]

df = pd.DataFrame({"vendas": vendas}, index=datas)
print(df.head())
```

A saída é:

```py
            vendas
2026-01-01     120
2026-01-02      95
2026-01-03     140
2026-01-04      80
2026-01-05     110
```

### Exemplo 3 - fatiando por período

Com um `DatetimeIndex`, o `.loc` aceita strings de data diretamente, inclusive um intervalo:

```py
print(df.loc["2026-01-03":"2026-01-06"])
```

```py
            vendas
2026-01-03     140
2026-01-04      80
2026-01-05     110
2026-01-06     130
```

O mesmo funciona com um período parcial, como só o mês (`df.loc["2026-01"]` traria todas as linhas de janeiro) — o Pandas entende a string e expande automaticamente pro intervalo correspondente.

## Extraindo partes de uma data com o acessor .dt

Assim como o `.str` dá acesso a métodos de string, o `.dt` dá acesso aos componentes de uma coluna de datas — só que aqui ele se aplica a uma **coluna comum** do tipo `datetime64`, não ao índice (pra extrair partes do índice, o acesso é direto, como `df.index.year`).

### Exemplo 4 - ano, mês e dia da semana

```py
pedidos = pd.DataFrame({
    "pedido": [1, 2, 3, 4],
    "data_pedido": pd.to_datetime(["2026-01-05", "2026-02-14", "2026-03-01", "2026-01-20"])
})

pedidos["ano"] = pedidos["data_pedido"].dt.year
pedidos["mes"] = pedidos["data_pedido"].dt.month
pedidos["dia_semana"] = pedidos["data_pedido"].dt.day_name()

print(pedidos)
```

```py
   pedido data_pedido   ano  mes dia_semana
0       1  2026-01-05  2026    1     Monday
1       2  2026-02-14  2026    2   Saturday
2       3  2026-03-01  2026    3     Sunday
3       4  2026-01-20  2026    1    Tuesday
```

> **Nota:** `.dt.day_name()` devolve o nome do dia em inglês por padrão. Pra obter os nomes em português, é preciso passar um _locale_ instalado no sistema operacional (`.dt.day_name(locale="pt_BR.utf8")`) — o que depende de configuração fora do Pandas, então nem sempre está disponível. Uma alternativa mais portátil é mapear o resultado em inglês pra português com um dicionário próprio.

Outros atributos úteis do `.dt`: `.dt.day` (dia do mês), `.dt.quarter` (trimestre), `.dt.is_month_end` (booleano indicando se a data é o último dia do mês).

## Reamostrando com resample()

`resample()` é o `groupby()` do mundo das séries temporais: agrupa os dados em intervalos de tempo regulares (a cada 3 dias, a cada semana, a cada mês) e aplica uma agregação a cada intervalo.

### Exemplo 5 - somando vendas a cada 5 dias

```py
print(df.resample("5D").sum())
```

```py
            vendas
2026-01-01     545
2026-01-06     595
2026-01-11     220
```

Os 12 dias do _DataFrame_ viraram três intervalos de 5 dias — o primeiro de `01` a `05`, o segundo de `06` a `10`, e o terceiro com só os 2 dias restantes (`11` e `12`), já que a sequência acabou antes de completar mais um intervalo cheio. Cada rótulo mostra a data de **início** do intervalo correspondente.

Isso fecha esta segunda leva de posts sobre Pandas: seleção e filtragem, agrupamento e agregação, combinação de tabelas, texto e categorias, e agora datas e séries temporais. Combinado com o que a série já tinha sobre limpeza e visualização, você tem agora um conjunto bem completo de ferramentas pra qualquer análise no dia a dia. A partir do próximo post, a série volta ao Matplotlib pra ir além do básico: a interface orientada a objetos com Figure e Axes.

**Fonte adaptada:** [Pandas - Date Functionality](https://www.tutorialspoint.com/python_pandas/python_pandas_date_functionality.htm)
