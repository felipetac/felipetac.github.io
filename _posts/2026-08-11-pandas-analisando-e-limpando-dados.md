---
layout: post
title: "#2 - Analisando e Limpando Dados com Pandas"
date: 2026-08-11 14:40:00
image: '/assets/img/posts/pandas-analisando-e-limpando-dados.png'
description: Como inspecionar rapidamente um DataFrame e tratar os problemas mais comuns de dados sujos - células vazias, formatos errados, valores incorretos e duplicatas.
category: 'ciência de dados'
tags:
- Ciência de Dados
- Python
- Programação
- Pandas
twitter_text: Analisando e Limpando Dados com Pandas
introduction: "Nesta parte do tutorial, você vai aprender a inspecionar rapidamente um DataFrame e a limpar os tipos de dados sujos mais comuns."
---

No post anterior você viu como criar e carregar um _DataFrame_. Só que, na prática, dificilmente os dados que chegam até você já estão prontos pra análise. Células vazias, datas em formatos diferentes dentro da mesma coluna, valores absurdos e linhas duplicadas são a regra, não a exceção — e é aí que entra a limpeza de dados.

Neste post você vai aprender primeiro a dar uma "olhada rápida" num _DataFrame_ recém-carregado, e depois a resolver os quatro problemas de dados sujos mais comuns: células vazias, formato errado, dados errados e duplicatas.

## Inspecionando um DataFrame rapidamente

Antes de sair limpando qualquer coisa, o primeiro passo é entender o que você tem em mãos. Vamos usar como exemplo um _DataFrame_ com o registro de treinos de uma pessoa ao longo de alguns dias:

```py
import pandas as pd

dados = {
    "duracao": [30, 45, 60, 45, None, 60, 450],
    "pulso": [110, 117, 103, 109, 117, 102, 104],
    "calorias": [280.0, 340.0, 380.5, None, 320.0, 400.0, 300.0]
}

df = pd.DataFrame(dados)
```

### head() e tail()

`.head()` mostra as primeiras linhas do _DataFrame_ (5 por padrão, mas você pode passar outro número):

```py
print(df.head(3))
```

A saída é:

```py
   duracao  pulso  calorias
0     30.0    110     280.0
1     45.0    117     340.0
2     60.0    103     380.5
```

`.tail()` faz o mesmo, só que a partir do final:

```py
print(df.tail(2))
```

```py
   duracao  pulso  calorias
5     60.0    102     400.0
6    450.0    104     300.0
```

Já dá pra notar algo estranho: uma duração de 450 no meio de valores que giram em torno de 30-60. Vamos voltar nisso mais adiante.

### info()

Já `.info()` não mostra os dados em si, mostra metadados sobre a estrutura da tabela — quantidade de linhas, colunas, tipo de cada coluna e quantos valores não-nulos existem em cada uma:

```py
print(df.info())
```

A saída é:

```py
<class 'pandas.core.frame.DataFrame'>
RangeIndex: 7 entries, 0 to 6
Data columns (total 3 columns):
 #   Column    Non-Null Count  Dtype
---  ------    --------------  -----
 0   duracao   6 non-null      float64
 1   pulso     7 non-null      int64
 2   calorias  6 non-null      float64
dtypes: float64(2), int64(1)
```

Repare que `duracao` e `calorias` têm só 6 valores não-nulos, contra 7 linhas no total — ou seja, cada uma tem uma célula vazia. É exatamente esse tipo de sinal que o `.info()` ajuda a enxergar rápido, sem precisar vasculhar a tabela inteira na mão.

> **Nota:** rodar `.head()`, `.tail()` e `.info()` logo depois de carregar qualquer dataset novo é um hábito que economiza muito tempo de debug mais adiante.

## Tratando células vazias

Células vazias (representadas como `NaN`) atrapalham cálculos estatísticos e podem até quebrar algumas operações. O Pandas dá duas saídas principais: remover as linhas com valor vazio, ou preenchê-las com algum valor.

### Removendo linhas com dropna()

```py
df_limpo = df.dropna()
print(df_limpo)
```

Por padrão, `.dropna()` devolve um novo _DataFrame_, sem alterar o original. Se quiser modificar o próprio `df`, use `inplace=True`:

```py
df.dropna(inplace=True)
```

### Preenchendo valores vazios com fillna()

Às vezes remover a linha inteira é desperdício — melhor preencher só a célula vazia. Dá pra aplicar em todo o _DataFrame_ ou numa coluna específica:

```py
df["calorias"].fillna(300, inplace=True)

# ou preenchendo por coluna, num único comando
df.fillna({"calorias": 300}, inplace=True)
```

### Preenchendo com média, mediana ou moda

Chutar um número fixo (como o `300` acima) raramente é a melhor ideia. É mais comum calcular um valor a partir da própria coluna:

```py
import pandas as pd

dados = {
    "duracao": [30, 45, 60, 45, None, 60, 450],
    "pulso": [110, 117, 103, 109, 117, 102, 104],
    "calorias": [280.0, 340.0, 380.5, None, 320.0, 400.0, 300.0]
}
df = pd.DataFrame(dados)

media = df["calorias"].mean()
df.fillna({"calorias": media}, inplace=True)
```

- **Média** (`.mean()`): soma de todos os valores dividida pela quantidade de valores.
- **Mediana** (`.median()`): o valor do meio depois de ordenar a coluna.
- **Moda** (`.mode()[0]`): o valor que mais se repete.

A média costuma ser um bom padrão pra colunas numéricas contínuas; a moda é mais indicada pra colunas categóricas.

## Corrigindo o formato dos dados

Outro problema comum é uma coluna que deveria ter um tipo consistente (datas, por exemplo) mas guarda valores em formatos diferentes — `"2026/03/10"` numa linha, `"10-03-2026"` em outra.

```py
import pandas as pd

dados = {
    "data": ["2026/03/01", "2026/03/02", "10-03-2026", None],
    "duracao": [30, 45, 60, 45]
}
df = pd.DataFrame(dados)

df["data"] = pd.to_datetime(df["data"], format="mixed")
print(df)
```

O parâmetro `format="mixed"` diz pro `pd.to_datetime()` tentar reconhecer formatos diferentes dentro da mesma coluna, em vez de exigir um padrão único. Valores que não conseguem ser convertidos (como um `None`) viram `NaT` ("Not a Time" — o equivalente a `NaN`, só que pra datas).

Depois de converter, dá pra remover as linhas que ficaram com data inválida:

```py
df.dropna(subset=["data"], inplace=True)
```

O parâmetro `subset` restringe a busca por valores vazios só à coluna `data`, em vez de olhar o _DataFrame_ inteiro.

## Corrigindo dados errados

Diferente de uma célula vazia, um dado errado é um valor presente, só que implausível — lembra daquela duração de `450` minutos lá em cima, cercada de valores entre 30 e 60?

### Corrigindo um valor pontualmente

Se você sabe exatamente qual linha e qual deveria ser o valor correto, o `.loc` resolve direto:

```py
df.loc[6, "duracao"] = 45
```

### Corrigindo em lote com uma regra

Pra datasets maiores, não dá pra corrigir linha por linha na mão. Uma abordagem comum é definir um limite e substituir tudo que ultrapassa ele:

```py
for indice in df.index:
    if df.loc[indice, "duracao"] > 120:
        df.loc[indice, "duracao"] = 120
```

### Removendo a linha em vez de corrigir

Se não dá pra saber qual seria o valor certo, às vezes a saída mais simples é descartar a linha inteira:

```py
for indice in df.index:
    if df.loc[indice, "duracao"] > 120:
        df.drop(indice, inplace=True)
```

Vale lembrar que remover dados sempre tem um custo — você está jogando fora informação que pode fazer falta depois. Use com critério.

## Removendo linhas duplicadas

Por fim, o problema mais direto de resolver: linhas repetidas inteiras, que costumam entrar no dataset por erro de coleta ou de junção de fontes diferentes.

### Encontrando duplicatas com duplicated()

```py
print(df.duplicated())
```

O retorno é uma _Series_ de booleanos, uma posição por linha: `True` quando aquela linha é idêntica a alguma anterior, `False` caso contrário.

### Removendo com drop_duplicates()

```py
df.drop_duplicates(inplace=True)
```

Assim como nos outros métodos de limpeza, `inplace=True` aplica a remoção direto no `df`, sem precisar reatribuir o resultado a uma nova variável.

Com o _DataFrame_ inspecionado e limpo, ele já está em condições de ir pra próxima etapa: entender como as colunas se relacionam entre si — que é justamente o assunto do próximo post da série.

**Fonte adaptada:** [Pandas - Analyzing DataFrames](https://www.w3schools.com/python/pandas/pandas_analyzing.asp), [Pandas - Cleaning Data](https://www.w3schools.com/python/pandas/pandas_cleaning.asp), [Pandas - Cleaning Empty Cells](https://www.w3schools.com/python/pandas/pandas_cleaning_empty_cells.asp), [Pandas - Cleaning Data of Wrong Format](https://www.w3schools.com/python/pandas/pandas_cleaning_wrong_format.asp), [Pandas - Fixing Wrong Data](https://www.w3schools.com/python/pandas/pandas_cleaning_wrong_data.asp), [Pandas - Removing Duplicates](https://www.w3schools.com/python/pandas/pandas_cleaning_duplicates.asp)
