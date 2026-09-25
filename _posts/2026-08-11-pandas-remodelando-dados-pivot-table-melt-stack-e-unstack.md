---
layout: post
title: "Pandas | #14 - Remodelando Dados: pivot_table(), melt() e stack()/unstack()"
date: 2026-08-11 18:05:00
image: '/assets/img/posts/pandas-remodelando-dados-pivot-table-melt-stack-e-unstack.webp'
description: Como transformar o formato de um DataFrame com pivot() e pivot_table(), voltar ao formato longo com melt(), alternar entre linhas e colunas com stack() e unstack(), e criar variáveis dummy com get_dummies().
category: 'ciência de dados'
tags:
- Ciência de Dados
- Python
- Programação
- Pandas
twitter_text: "Remodelando Dados: pivot_table(), melt() e stack()/unstack()"
introduction: "Nesta parte do tutorial, você vai aprender a remodelar DataFrames com pivot(), pivot_table(), melt(), stack(), unstack() e get_dummies()."
---

No post anterior você usou `groupby()` pra resumir um _DataFrame_ por categoria — o resultado veio numa única coluna, com um índice (ou MultiIndex) representando os grupos. Só que às vezes o formato mais útil pra ler ou exportar esses dados é bem diferente: uma tabela "larga", com uma categoria por coluna, em vez de uma por linha. Este post cobre exatamente essa transformação de formato: `pivot_table()`, `melt()`, `stack()`/`unstack()` e `get_dummies()`.

## pivot() e pivot_table(): do formato longo pro largo

`pivot()` transforma valores únicos de uma coluna em novas colunas — útil quando os dados estão no formato "longo" (uma linha por combinação de categoria e valor) e você quer o formato "largo" (uma coluna por categoria).

### Exemplo 1 - pivot() com valores já únicos

```py
import pandas as pd

vendas = pd.DataFrame({
    "mes": ["jan", "jan", "fev", "fev"],
    "produto": ["notebook", "mouse", "notebook", "mouse"],
    "unidades": [8, 30, 12, 25]
})

print(vendas.pivot(index="mes", columns="produto", values="unidades"))
```

A saída é:

```py
produto  mouse  notebook
mes
fev         25        12
jan         30         8
```

Cada combinação de `mes` e `produto` virou uma célula da nova tabela. Mas `pivot()` só funciona quando existe no máximo uma linha por combinação — se houver duas linhas com o mesmo `mes` e `produto`, ele lança um erro, porque não sabe qual delas usar.

### Exemplo 2 - pivot_table() com agregação

`pivot_table()` resolve exatamente essa limitação: quando existe mais de um valor por combinação, ele agrega (por padrão, com a média) em vez de dar erro.

```py
vendas_repetidas = pd.DataFrame({
    "mes": ["jan", "jan", "jan", "fev"],
    "produto": ["notebook", "notebook", "mouse", "notebook"],
    "unidades": [5, 3, 30, 12]
})

print(vendas_repetidas.pivot_table(index="mes", columns="produto", values="unidades", aggfunc="sum"))
```

```py
produto  mouse  notebook
mes
fev        NaN      12.0
jan       30.0       8.0
```

As duas linhas de `jan`/`notebook` (`5` e `3`) foram somadas em `8`, porque `aggfunc="sum"` foi especificado. Sem esse parâmetro, `pivot_table()` usa a média por padrão — o mesmo tipo de agregação que você já viu em `groupby().agg()`.

> **Nota:** por padrão, `pivot_table()` descarta combinações onde `values` ficaria inteiramente vazio (`dropna=True`) — passe `dropna=False` se quiser manter essas combinações "vazias" explicitamente como `NaN` na tabela resultante.

## melt(): voltando ao formato longo

`melt()` faz o caminho inverso de `pivot()`: transforma colunas em linhas, "derretendo" uma tabela larga de volta pro formato longo.

### Exemplo 3 - melt() numa tabela larga

```py
tabela_larga = pd.DataFrame({
    "produto": ["notebook", "mouse"],
    "jan": [8, 30],
    "fev": [12, 25]
})

print(tabela_larga.melt(id_vars="produto", var_name="mes", value_name="unidades"))
```

```py
    produto  mes  unidades
0  notebook  jan         8
1     mouse  jan        30
2  notebook  fev        12
3     mouse  fev        25
```

`id_vars` diz qual coluna deve continuar identificando cada linha (`produto`), e as demais colunas (`jan`, `fev`) viraram duas colunas novas: uma com o nome da coluna original (`mes`) e outra com o valor que estava nela (`unidades`).

## stack() e unstack(): alternando entre linhas e colunas

`stack()` e `unstack()` fazem uma transformação parecida com `melt()`/`pivot()`, só que operando diretamente sobre os níveis do índice, em vez de colunas nomeadas.

### Exemplo 4 - stack() empilhando colunas no índice

```py
df_largo = pd.DataFrame({"notebook": [8, 12], "mouse": [30, 25]}, index=["jan", "fev"])
empilhado = df_largo.stack()
print(empilhado)
```

```py
jan  notebook     8
     mouse       30
fev  notebook    12
     mouse       25
dtype: int64
```

`stack()` moveu os nomes das colunas pra dentro do índice, criando um segundo nível — o resultado agora é uma Series com um MultiIndex de dois níveis (mês e produto). `unstack()` desfaz exatamente essa operação, devolvendo as colunas ao lugar original:

```py
print(empilhado.unstack())
```

```py
     notebook  mouse
jan         8     30
fev        12     25
```

## Criando variáveis dummy com get_dummies()

Por fim, uma transformação de formato bem específica, muito comum antes de treinar um modelo de machine learning: converter uma coluna categórica em várias colunas binárias, uma pra cada categoria.

### Exemplo 5 - get_dummies()

```py
status = pd.DataFrame({"pedido": [1, 2, 3], "status": ["enviado", "entregue", "enviado"]})
print(pd.get_dummies(status["status"]))
```

```py
   entregue  enviado
0     False     True
1      True    False
2     False     True
```

Cada categoria distinta (`entregue`, `enviado`) virou uma coluna própria, com `True`/`False` indicando se aquela linha pertence a ela — o formato que a maioria dos algoritmos de machine learning espera receber, já que eles não sabem lidar com texto diretamente.

> **Nota:** o parâmetro `drop_first=True` remove a primeira coluna dummy gerada, já que ela é redundante — se você sabe que uma linha não é `entregue`, e existem só duas categorias, ela necessariamente é `enviado`. É uma prática comum pra evitar colinearidade em alguns modelos estatísticos.

Com `pivot_table()`, `melt()`, `stack()`/`unstack()` e `get_dummies()`, você já sabe reorganizar a forma de um DataFrame pro que a análise (ou o modelo) exigir. Esse mesmo `stack()` que acabou de gerar um índice em dois níveis é uma boa deixa pro próximo post: como criar e navegar índices hierárquicos de propósito, com MultiIndex.

**Fonte adaptada:** [Pandas - Pivoting](https://www.tutorialspoint.com/python_pandas/python_pandas_pivoting.htm), [Pandas - Stacking and Unstacking](https://www.tutorialspoint.com/python_pandas/python_pandas_stacking_and_unstacking.htm), [Pandas - Melting](https://www.tutorialspoint.com/python_pandas/python_pandas_melting.htm), [Pandas - Computing Dummy Variables](https://www.tutorialspoint.com/python_pandas/python_pandas_computing_dummy_variables.htm)
