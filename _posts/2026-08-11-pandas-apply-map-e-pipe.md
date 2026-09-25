---
layout: post
title: "Pandas #10 - apply(), map() e pipe(): Aplicando Funções"
date: 2026-08-11 17:45:00
image: '/assets/img/posts/pandas-apply-map-e-pipe.webp'
description: Como aplicar funções personalizadas a DataFrames e Series com apply() e map(), e como encadear transformações num fluxo legível com pipe().
category: 'ciência de dados'
tags:
- Ciência de Dados
- Python
- Programação
- Pandas
twitter_text: "apply(), map() e pipe(): Aplicando Funções"
introduction: "Nesta parte do tutorial, você vai aprender a aplicar funções personalizadas com apply(), map() e a encadear transformações com pipe()."
---

No post anterior você usou métodos prontos do Pandas, como `.corr()` e `.plot()`, pra extrair informação de um _DataFrame_. Mas nem toda transformação que você precisa já vem embutida na biblioteca — às vezes a regra é específica do seu problema, e é aí que entram `apply()`, `map()` e `pipe()`: três jeitos de aplicar a sua própria lógica a um _DataFrame_ ou Series.

## apply(): aplicando uma função a linhas, colunas ou elementos

`apply()` roda uma função ao longo de um eixo do DataFrame (linha por linha ou coluna por coluna) — ou elemento por elemento, quando chamado numa Series.

### Exemplo 1 - apply() numa Series

```py
import pandas as pd

precos = pd.Series([89.90, 150.00, 3200.00])

def aplicar_desconto(valor):
    return valor * 0.9 if valor > 100 else valor

print(precos.apply(aplicar_desconto))
```

A saída é:

```py
0      89.90
1     135.00
2    2880.00
dtype: float64
```

Cada valor da Series passou pela função `aplicar_desconto`, que só desconta preços acima de `100` — uma lógica que nenhum método pronto do Pandas cobre diretamente.

### Exemplo 2 - apply() num DataFrame, por coluna

Num DataFrame, `apply()` por padrão roda a função em cada coluna inteira (não célula por célula):

```py
dados = {"matematica": [7.5, 8.0, 6.5], "portugues": [8.5, 7.0, 9.0]}
df = pd.DataFrame(dados)

print(df.apply(lambda coluna: coluna.max() - coluna.min()))
```

```py
matematica    1.5
portugues     2.0
dtype: float64
```

A função recebeu cada coluna como uma Series inteira (por isso `coluna.max()` e `coluna.min()` funcionam direto) e devolveu a amplitude de notas em cada matéria.

### Exemplo 3 - apply() por linha, com axis=1

Passando `axis=1`, a função passa a receber cada linha como uma Series, em vez de cada coluna:

```py
print(df.apply(lambda linha: linha.mean(), axis=1))
```

```py
0    8.00
1    7.50
2    7.75
dtype: float64
```

Agora o resultado é a média de cada aluno (cada linha), em vez da amplitude de cada matéria.

> **Nota:** `axis=1` costuma confundir no começo — parece que deveria significar "aplicar às colunas", mas na verdade indica a direção em que a função enxerga os dados: `axis=1` faz a função andar pelas colunas de uma mesma linha, entregando a linha inteira de uma vez.

## map(): transformando elemento por elemento numa Series

`map()` existe só pra Series (não pra DataFrame inteiro) e aplica uma função — ou um dicionário de substituição — a cada elemento individualmente.

### Exemplo 4 - map() com uma função

```py
status = pd.Series(["ativo", "inativo", "ativo", "pendente"])
print(status.map(str.upper))
```

```py
0       ATIVO
1     INATIVO
2       ATIVO
3    PENDENTE
dtype: object
```

### Exemplo 5 - map() com um dicionário

```py
traducao = {"ativo": "active", "inativo": "inactive", "pendente": "pending"}
print(status.map(traducao))
```

```py
0      active
1    inactive
2      active
3     pending
dtype: object
```

Cada valor da Series foi substituído pela chave correspondente no dicionário — um jeito direto de fazer um "de-para" sem escrever um loop nem uma função.

## map() num DataFrame inteiro

Historicamente, quem queria aplicar uma função elemento a elemento num DataFrame inteiro (não só numa Series) usava `.applymap()`. Esse método foi descontinuado nas versões mais recentes do Pandas — o substituto direto é `DataFrame.map()`, que segue a mesma ideia de `Series.map()`, só que aplicado a todas as células do DataFrame.

### Exemplo 7 - map() em todas as células de um DataFrame

```py
notas = pd.DataFrame({"prova1": [7.456, 8.923], "prova2": [6.123, 9.501]})
print(notas.map(lambda valor: round(valor, 1)))
```

```py
   prova1  prova2
0     7.5     6.1
1     8.9     9.5
```

> **Nota:** se você encontrar `applymap()` em código ou tutorial mais antigo, é essa mesma ideia — só que com o nome antigo, hoje descontinuado em favor de `DataFrame.map()`.

## pipe(): encadeando funções customizadas

Quando você tem mais de uma transformação personalizada pra aplicar em sequência, encadear chamadas de função fica ilegível de fora pra dentro (`funcao_c(funcao_b(funcao_a(df)))`). `pipe()` resolve isso permitindo encadear no mesmo estilo fluente de `.loc`, `.groupby()` etc.

### Exemplo 6 - encadeando transformações com pipe()

```py
def remover_nulos(df):
    return df.dropna()

def normalizar_colunas(df):
    df.columns = df.columns.str.lower()
    return df

dados_brutos = pd.DataFrame({"Nota": [7.5, None, 8.0]})

resultado = dados_brutos.pipe(remover_nulos).pipe(normalizar_colunas)
print(resultado)
```

```py
   nota
0   7.5
2   8.0
```

Cada `.pipe()` passa o DataFrame atual como primeiro argumento da próxima função — o resultado é o mesmo de `normalizar_colunas(remover_nulos(dados_brutos))`, só que lido de cima pra baixo, na ordem em que as transformações realmente acontecem.

`pipe()` também aceita argumentos extras, repassados direto pra função encadeada — útil quando a transformação depende de um parâmetro, não só do DataFrame:

```py
def filtrar_por_nota_minima(df, minimo):
    return df[df["prova1"] >= minimo]

print(notas.pipe(filtrar_por_nota_minima, minimo=8))
```

```py
   prova1  prova2
1   8.923   9.501
```

Com `apply()`, `map()` e `pipe()`, você não depende só dos métodos prontos do Pandas — qualquer lógica customizada pode virar parte do fluxo normal de transformação de dados. O próximo post muda de assunto: como o Pandas trata colunas de texto com o acessor `.str`, e como representar dados categóricos.

**Fonte adaptada:** [Pandas - Function Application](https://www.tutorialspoint.com/python_pandas/python_pandas_function_application.htm)
