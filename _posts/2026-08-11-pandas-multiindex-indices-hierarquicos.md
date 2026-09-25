---
layout: post
title: "Pandas #15 - MultiIndex: Índices Hierárquicos no Pandas"
date: 2026-08-11 18:10:00
image: '/assets/img/posts/pandas-multiindex-indices-hierarquicos.webp'
description: Como criar um índice hierárquico (MultiIndex) com from_arrays() e from_tuples(), selecionar dados em múltiplos níveis com .loc e reordenar níveis com swaplevel().
category: 'ciência de dados'
tags:
- Ciência de Dados
- Python
- Programação
- Pandas
twitter_text: "MultiIndex: Índices Hierárquicos no Pandas"
introduction: "Nesta parte do tutorial, você vai aprender a criar e navegar índices hierárquicos (MultiIndex) no Pandas."
---

No post anterior, `stack()` transformou um DataFrame comum numa Series com um índice de dois níveis — mês e produto, um dentro do outro. Isso não foi um efeito colateral estranho: é um _MultiIndex_, uma estrutura que o Pandas usa o tempo todo pra representar dados com mais de uma dimensão de agrupamento, e que já apareceu antes na série, sem nome, como resultado de um `groupby()` por múltiplas colunas. Neste post você vai conhecer o MultiIndex de propósito: como criá-lo, indexar com ele e reorganizar seus níveis.

## Criando um MultiIndex

O jeito mais direto de criar um MultiIndex é a partir de listas de rótulos, usando `MultiIndex.from_arrays()`.

### Exemplo 1 - criando um MultiIndex com from_arrays()

```py
import pandas as pd

regioes = ["Sul", "Sul", "Sudeste", "Sudeste"]
produtos = ["notebook", "mouse", "notebook", "mouse"]

indice = pd.MultiIndex.from_arrays([regioes, produtos], names=["regiao", "produto"])
vendas = pd.Series([16000, 2670, 38400, 3300], index=indice)

print(vendas)
```

A saída é:

```py
regiao   produto
Sul      notebook    16000
         mouse        2670
Sudeste  notebook    38400
         mouse        3300
dtype: int64
```

Repare que os rótulos do primeiro nível (`regiao`) não se repetem visualmente nas linhas seguintes que compartilham o mesmo valor — é só uma questão de exibição, o índice de cada linha continua sendo a tupla completa (`("Sul", "notebook")`, por exemplo).

Também dá pra montar um MultiIndex a partir de uma lista de tuplas prontas, com `from_tuples()`:

```py
tuplas = [("Sul", "notebook"), ("Sul", "mouse"), ("Sudeste", "notebook")]
indice2 = pd.MultiIndex.from_tuples(tuplas, names=["regiao", "produto"])
```

## Selecionando dados com .loc em múltiplos níveis

Com um MultiIndex, `.loc` aceita tanto um rótulo de nível único (retornando tudo que está "dentro" dele) quanto uma tupla completa (retornando um valor específico).

### Exemplo 2 - selecionando por nível único

```py
print(vendas.loc["Sul"])
```

```py
produto
notebook    16000
mouse        2670
dtype: int64
```

Passar só `"Sul"` devolve uma Series com o segundo nível (`produto`) como índice, já filtrada pra essa região.

### Exemplo 3 - selecionando com uma tupla

```py
print(vendas.loc[("Sul", "mouse")])
```

```py
2670
```

Uma tupla completa aponta pra uma combinação específica dos dois níveis, devolvendo o valor escalar correspondente.

> **Nota:** o mesmo `.loc` que você já usa em índices simples funciona aqui — a diferença é só que, com MultiIndex, ele aceita tanto um rótulo "parcial" (um nível) quanto uma tupla completa (todos os níveis), com comportamentos diferentes pra cada caso.

## Reordenando níveis com swaplevel()

Às vezes faz mais sentido ler o índice na ordem inversa — produto primeiro, região depois. `swaplevel()` troca a posição de dois níveis sem alterar os dados.

### Exemplo 4 - trocando a ordem dos níveis

```py
print(vendas.swaplevel().sort_index())
```

```py
produto   regiao
mouse     Sudeste     3300
          Sul         2670
notebook  Sudeste    38400
          Sul        16000
dtype: int64
```

Repare que `swaplevel()` só troca a posição dos níveis — o `sort_index()` logo depois é o que reordena as linhas de fato pra ficarem agrupadas pelo novo primeiro nível (`produto`). Sem o `sort_index()`, os dados continuariam na ordem original, só com os rótulos de nível invertidos.

Um MultiIndex também aceita ordenar por um nível específico, em vez de todos:

```py
print(vendas.sort_index(level="produto"))
```

Isso ordena as linhas priorizando o nível `produto`, mesmo ele sendo o segundo nível do índice.

## Um DataFrame com MultiIndex de verdade

Até aqui os exemplos usaram uma Series, mas o mesmo MultiIndex funciona igual num DataFrame — inclusive dá pra criar índices combinando todas as combinações possíveis de duas listas com `from_product()`, sem precisar repetir os rótulos manualmente.

### Exemplo 5 - MultiIndex com from_product()

```py
indice_completo = pd.MultiIndex.from_product(
    [["Sul", "Sudeste"], ["notebook", "mouse"]],
    names=["regiao", "produto"]
)

df_vendas = pd.DataFrame({"unidades": [5, 30, 12, 22]}, index=indice_completo)
print(df_vendas)
```

```py
                  unidades
regiao  produto
Sul     notebook         5
        mouse           30
Sudeste notebook        12
        mouse           22
```

`from_product()` gera automaticamente as quatro combinações entre as duas regiões e os dois produtos — bem mais prático que listar cada tupla na mão quando o número de combinações cresce.

> **Nota:** pra selecionar um valor de um nível que não é o primeiro (por exemplo, só as linhas de `produto == "mouse"`, de qualquer região), `.loc` sozinho fica menos direto — o método `.xs("mouse", level="produto")` resolve isso, buscando uma "fatia" cruzada por qualquer nível do índice, não só o mais externo.

Se em algum momento você quiser voltar os níveis do índice pra colunas normais, `reset_index()` faz exatamente isso:

```py
print(df_vendas.reset_index())
```

```py
    regiao   produto  unidades
0      Sul  notebook         5
1      Sul     mouse        30
2  Sudeste  notebook        12
3  Sudeste     mouse        22
```

Com `MultiIndex.from_arrays()`, seleção por nível ou por tupla, e `swaplevel()`, você já consegue trabalhar com índices hierárquicos sem se perder neles — a mesma estrutura que aparece nos bastidores de um `groupby()` com várias colunas ou de um `stack()`. O próximo post volta a um problema diferente: como combinar dados que vêm de tabelas completamente separadas, com `merge()`, `join()` e `concat()`.

**Fonte adaptada:** [Pandas - Basics of MultiIndex](https://www.tutorialspoint.com/python_pandas/python_pandas_basics_of_multiindex.htm), [Pandas - Indexing with MultiIndex](https://www.tutorialspoint.com/python_pandas/python_pandas_indexing_with_multiindex.htm), [Pandas - Sorting a MultiIndex](https://www.tutorialspoint.com/python_pandas/python_pandas_sorting_a_multiindex.htm)
