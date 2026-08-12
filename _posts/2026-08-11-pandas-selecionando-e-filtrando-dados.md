---
layout: post
title: "#4 - Selecionando e Filtrando Dados com loc, iloc e Máscaras Booleanas"
date: 2026-08-11 16:00:00
image: '/assets/img/posts/pandas-selecionando-e-filtrando-dados.png'
description: Como selecionar linhas e colunas específicas de um DataFrame com .loc e .iloc, e como filtrar dados com máscaras booleanas e o método .query().
category: 'ciência de dados'
tags:
- Ciência de Dados
- Python
- Programação
- Pandas
twitter_text: Selecionando e Filtrando Dados com loc, iloc e Máscaras Booleanas
introduction: "Nesta parte do tutorial, você vai aprender a selecionar linhas e colunas específicas de um DataFrame com .loc e .iloc, e a filtrar dados com máscaras booleanas."
---

Nos três primeiros posts desta série você aprendeu a criar, carregar, limpar, correlacionar e visualizar dados com o Pandas — o suficiente pra sair fazendo análises de verdade. A partir de agora a série volta ao Pandas pra aprofundar em técnicas que você vai usar o tempo todo: selecionar exatamente as linhas e colunas que interessam, filtrar dados por condição, agrupar e agregar, combinar tabelas diferentes, tratar texto e trabalhar com datas.

Neste post o assunto é seleção e filtragem: como pedir pro Pandas "me dê só essa parte da tabela".

## Revisão rápida: colchetes simples

Antes de entrar em `.loc` e `.iloc`, vale relembrar o jeito mais básico de selecionar colunas, já usado nos posts anteriores — colchetes direto no _DataFrame_:

```py
import pandas as pd

dados = {
    "produto": ["Notebook", "Mouse", "Teclado", "Monitor", "Headset"],
    "categoria": ["Informática", "Informática", "Informática", "Informática", "Áudio"],
    "preco": [3200, 89, 150, 890, 220],
    "estoque": [12, 45, 30, 8, 20]
}

df = pd.DataFrame(dados)

print(df["produto"])
print(df[["produto", "preco"]])
```

Um colchete com um nome só devolve uma _Series_ (a coluna); colchete duplo com uma lista de nomes devolve um _DataFrame_ com aquelas colunas. Isso funciona bem pra colunas, mas não é o jeito recomendado de selecionar linhas — é aí que entram `.loc` e `.iloc`.

## Selecionando com .loc (por rótulo)

O `.loc` já apareceu de leve no primeiro post da série, pra buscar uma linha pelo índice. Na prática ele aceita uma sintaxe bem mais rica: `df.loc[linhas, colunas]`, onde tanto linhas quanto colunas podem ser um rótulo único, uma lista de rótulos, um slice ou uma máscara booleana.

### Exemplo 1 - linhas e colunas específicas

```py
print(df.loc[[0, 2, 4], ["produto", "preco"]])
```

A saída é:

```py
   produto  preco
0  Notebook   3200
2   Teclado    150
4   Headset    220
```

### Exemplo 2 - slice de linhas com .loc

```py
print(df.loc[1:3, "produto":"preco"])
```

```py
   produto    categoria  preco
1     Mouse  Informática     89
2   Teclado  Informática    150
3   Monitor  Informática    890
```

> **Nota:** slices com `.loc` incluem o rótulo final — `1:3` traz as linhas `1`, `2` **e** `3`, diferente do fatiamento comum de listas Python, onde o limite superior fica de fora. O mesmo vale pro slice de colunas: `"produto":"preco"` inclui a própria coluna `preco`.

### Exemplo 3 - todas as linhas, uma coluna

```py
print(df.loc[:, "categoria"])
```

O `:` sozinho significa "todas as linhas", exatamente como no fatiamento de listas.

## Selecionando com .iloc (por posição)

Enquanto `.loc` busca por rótulo, `.iloc` busca pela posição numérica — começando em `0`, igual a listas e arrays do NumPy. É a escolha certa quando você quer "a terceira linha" ou "as duas últimas colunas", independente de como os índices foram rotulados.

### Exemplo 4 - linhas e colunas por posição

```py
print(df.iloc[0:2, 0:2])
```

```py
    produto    categoria
0  Notebook  Informática
1     Mouse  Informática
```

Diferente do `.loc`, o slice `0:2` aqui **não** inclui a posição `2` — segue a mesma regra de qualquer fatiamento Python.

### Exemplo 5 - a última linha, com índice negativo

```py
print(df.iloc[-1])
```

```py
produto           Headset
categoria            Áudio
preco                  220
estoque                 20
Name: 4, dtype: object
```

Índices negativos funcionam com `.iloc` do mesmo jeito que numa lista Python — `-1` é sempre a última posição, mesmo que os rótulos do índice sejam outra coisa.

> **Nota:** um jeito fácil de lembrar a diferença: **`.loc`** = **lo**cation por rótulo (**l**abel), **`.iloc`** = **i**nteger **loc**ation por posição. Se os rótulos do seu índice já forem números sequenciais a partir de `0`, os dois podem até devolver o mesmo resultado num slice simples — mas o comportamento diverge assim que o índice é reordenado, filtrado ou nomeado com texto.

## Filtrando com máscaras booleanas

Selecionar por posição ou rótulo é útil, mas o mais comum no dia a dia é filtrar por condição — "só os produtos com preço acima de 200", por exemplo. O Pandas faz isso com **máscaras booleanas**: uma _Series_ de `True`/`False`, uma posição pra cada linha, que serve de filtro dentro dos colchetes.

### Exemplo 6 - uma condição simples

```py
caros = df["preco"] > 200
print(caros)
```

```py
0     True
1    False
2    False
3     True
4     True
Name: preco, dtype: bool
```

```py
print(df[caros])
```

```py
    produto    categoria  preco  estoque
0  Notebook  Informática   3200       12
3   Monitor  Informática    890        8
4   Headset        Áudio    220       20
```

Na prática, quase sempre a máscara é escrita direto dentro dos colchetes, sem passar por uma variável intermediária:

```py
print(df[df["preco"] > 200])
```

### Exemplo 7 - combinando condições

Pra combinar mais de uma condição, use `&` (e) ou `|` (ou) — não os operadores `and`/`or` do Python puro, que não funcionam elemento a elemento numa _Series_. Cada condição precisa ficar entre parênteses:

```py
filtro = (df["categoria"] == "Informática") & (df["preco"] < 200)
print(df[filtro])
```

```py
  produto    categoria  preco  estoque
1   Mouse  Informática     89       30
2  Teclado  Informática    150       30
```

E pra negar uma condição inteira, o `~` faz o papel do `not`:

```py
print(df[~(df["categoria"] == "Áudio")])
```

Isso devolve todas as linhas cuja categoria **não** é "Áudio".

### Exemplo 8 - filtrando e escolhendo colunas ao mesmo tempo

`.loc` aceita uma máscara booleana no lugar das linhas, o que permite filtrar e escolher colunas numa única chamada:

```py
print(df.loc[df["preco"] > 200, ["produto", "preco"]])
```

```py
    produto  preco
0  Notebook   3200
3   Monitor    890
4   Headset    220
```

## Filtrando com query()

Pra condições mais longas, encadear várias máscaras entre parênteses pode ficar difícil de ler. O método `.query()` aceita a condição como uma string, com uma sintaxe mais parecida com SQL:

### Exemplo 9 - a mesma condição, com query()

```py
print(df.query("categoria == 'Informática' and preco < 200"))
```

```py
  produto    categoria  preco  estoque
1   Mouse  Informática     89       30
2  Teclado  Informática    150       30
```

Repare que dentro da string do `.query()` os operadores voltam a ser `and`, `or` e `not` normais — é só fora dele, nas máscaras booleanas comuns, que valem `&`, `|` e `~`.

### Exemplo 10 - usando uma variável Python dentro do query()

Pra referenciar uma variável externa dentro da string, prefixe o nome com `@`:

```py
preco_minimo = 200
print(df.query("preco > @preco_minimo"))
```

Com `.loc`, `.iloc`, máscaras booleanas e `.query()` no repertório, você já consegue recortar qualquer _DataFrame_ exatamente do jeito que precisa. No próximo post, o passo natural depois de filtrar dados é resumi-los: vamos ver como agrupar linhas por categoria e calcular agregações com `groupby()`.

**Fonte adaptada:** [Pandas - Indexing and Selecting Data](https://www.tutorialspoint.com/python_pandas/python_pandas_indexing_and_selecting_data.htm), [Pandas - Boolean Indexing](https://www.tutorialspoint.com/python_pandas/python_pandas_boolean_indexing.htm), [Pandas - Boolean Masking](https://www.tutorialspoint.com/python_pandas/python_pandas_boolean_masking.htm)
