---
layout: post
title: "#5 - Agrupando e Agregando Dados com groupby()"
date: 2026-08-11 15:40:00
image: '/assets/img/posts/pandas-agrupando-e-agregando-dados-com-groupby.png'
description: Como usar o groupby() do Pandas para agrupar dados por categoria e calcular agregações com o padrão split-apply-combine, incluindo o método agg().
category: 'ciência de dados'
tags:
- Ciência de Dados
- Python
- Programação
- Pandas
twitter_text: Agrupando e Agregando Dados com groupby()
introduction: "Nesta parte do tutorial, você vai aprender a agrupar dados por categoria e calcular agregações com groupby() e agg()."
---

No post anterior você aprendeu a filtrar um _DataFrame_ pra ficar só com as linhas que interessam. O próximo passo natural, depois de filtrar, é resumir: em vez de olhar linha por linha, você quer respostas como "qual a média de vendas por região?" ou "quantos produtos cada categoria tem?". É exatamente pra isso que existe o `groupby()`.

## O padrão split-apply-combine

O `groupby()` segue uma lógica em três etapas, conhecida como **split-apply-combine**:

1. **Split** (dividir): o _DataFrame_ é dividido em grupos, com base nos valores de uma ou mais colunas;
2. **Apply** (aplicar): uma função é aplicada separadamente a cada grupo (uma soma, uma média, uma contagem...);
3. **Combine** (combinar): os resultados de cada grupo são reunidos de volta numa única estrutura.

Na prática, você quase nunca pensa nessas três etapas separadamente — o Pandas cuida disso internamente. Mas ter esse modelo mental em mente ajuda a entender o que está acontecendo por trás de cada `.groupby(...)`.

## Agrupando com groupby()

Vamos usar como exemplo um _DataFrame_ com vendas de produtos em diferentes regiões:

```py
import pandas as pd

dados = {
    "regiao": ["Sul", "Sudeste", "Sul", "Nordeste", "Sudeste", "Nordeste", "Sul"],
    "produto": ["Notebook", "Notebook", "Mouse", "Mouse", "Teclado", "Notebook", "Teclado"],
    "unidades": [5, 12, 30, 18, 22, 7, 15],
    "receita": [16000, 38400, 2670, 1602, 3300, 22400, 2250]
}

df = pd.DataFrame(dados)
```

### Exemplo 1 - criando o objeto GroupBy

```py
grupos = df.groupby("regiao")
print(grupos)
```

A saída é algo como:

```py
<pandas.core.groupby.generic.DataFrameGroupBy object at 0x7f2a1c0b5d90>
```

Repare que `groupby()` sozinho não devolve uma tabela — devolve um objeto `DataFrameGroupBy`, que guarda a informação de como os dados foram divididos, mas só calcula alguma coisa quando você chama um método de agregação em cima dele.

### Exemplo 2 - contando linhas por grupo

```py
print(grupos.size())
```

```py
regiao
Nordeste    2
Sudeste     2
Sul         3
dtype: int64
```

`.size()` conta quantas linhas caíram em cada grupo, incluindo linhas com valores nulos. Se você quiser contar valores não-nulos por coluna, use `.count()` no lugar.

## Agregando com funções estatísticas

Com os grupos formados, dá pra aplicar qualquer função estatística — ela é calculada separadamente pra cada grupo.

### Exemplo 3 - média por grupo

```py
print(df.groupby("regiao")["receita"].mean())
```

```py
regiao
Nordeste    12001.0
Sudeste     20850.0
Sul          6973.333333
dtype: float64
```

### Exemplo 4 - soma de todas as colunas numéricas

Sem selecionar uma coluna específica, a agregação é aplicada a todas as colunas numéricas do _DataFrame_:

```py
print(df.groupby("regiao")[["unidades", "receita"]].sum())
```

```py
          unidades  receita
regiao
Nordeste        25    24002
Sudeste         34    41700
Sul             50    20920
```

Outras agregações comuns funcionam do mesmo jeito: `.max()`, `.min()`, `.median()`, `.std()`.

## Agrupando por múltiplas colunas

Pra cruzar mais de uma dimensão ao mesmo tempo, passe uma lista de nomes de coluna pro `groupby()`:

### Exemplo 5 - região e produto juntos

```py
print(df.groupby(["regiao", "produto"])["receita"].sum())
```

```py
regiao    produto
Nordeste  Mouse        1602
          Notebook    22400
Sudeste   Notebook    38400
          Teclado      3300
Sul       Mouse        2670
          Notebook    16000
          Teclado      2250
Name: receita, dtype: int64
```

O resultado ganha um índice em dois níveis (um _MultiIndex_): primeiro a região, depois o produto dentro dela.

## Múltiplas agregações com agg()

Calcular só uma estatística por vez é limitado — o método `.agg()` (abreviação de _aggregate_) permite pedir várias de uma vez, ou até funções diferentes por coluna.

### Exemplo 6 - várias funções na mesma coluna

```py
print(df.groupby("regiao")["receita"].agg(["sum", "mean", "max"]))
```

```py
               sum          mean    max
regiao
Nordeste     24002  12001.000000  22400
Sudeste      41700  20850.000000  38400
Sul          20920   6973.333333  16000
```

### Exemplo 7 - uma função diferente por coluna

Passando um dicionário, cada coluna recebe sua própria lista de agregações:

```py
resultado = df.groupby("regiao").agg({
    "unidades": "sum",
    "receita": ["mean", "max"]
})
print(resultado)
```

```py
         unidades      receita
              sum         mean    max
regiao
Nordeste       25  12001.000000  22400
Sudeste        34  20850.000000  38400
Sul            50   6973.333333  16000
```

> **Nota:** o `.agg()` também aceita funções personalizadas, inclusive `lambda`s — por exemplo, `df.groupby("regiao")["receita"].agg(lambda x: x.max() - x.min())` calcula a amplitude (máximo menos mínimo) de receita em cada região.

## Iterando e acessando um grupo específico

### Exemplo 8 - percorrendo cada grupo com um for

O objeto `GroupBy` é iterável: cada iteração devolve uma tupla com o nome do grupo e o _DataFrame_ correspondente.

```py
for regiao, grupo in df.groupby("regiao"):
    print(f"Região: {regiao} — total de linhas: {len(grupo)}")
```

```py
Região: Nordeste — total de linhas: 2
Região: Sudeste — total de linhas: 2
Região: Sul — total de linhas: 3
```

### Exemplo 9 - buscando um grupo específico com get_group()

Se você já sabe qual grupo quer, não precisa iterar por todos — `.get_group()` busca direto:

```py
print(df.groupby("regiao").get_group("Sul"))
```

```py
     regiao   produto  unidades  receita
0       Sul  Notebook         5    16000
2       Sul     Mouse        30     2670
6       Sul   Teclado        15     2250
```

Com `groupby()` e `agg()` você já consegue transformar uma tabela de linhas soltas em resumos por categoria — a base de praticamente qualquer relatório ou dashboard. No próximo post, vamos ver o que fazer quando essa informação está espalhada em mais de um _DataFrame_: como combinar tabelas diferentes com `merge()`, `join()` e `concat()`.

**Fonte adaptada:** [Pandas - GroupBy](https://www.tutorialspoint.com/python_pandas/python_pandas_groupby.htm), [Pandas - Aggregations](https://www.tutorialspoint.com/python_pandas/python_pandas_aggregations.htm)
