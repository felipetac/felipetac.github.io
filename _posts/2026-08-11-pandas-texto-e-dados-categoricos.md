---
layout: post
title: "#7 - Trabalhando com Texto e Dados Categóricos no Pandas"
date: 2026-08-11 17:00:00
image: '/assets/img/posts/pandas-texto-e-dados-categoricos.png'
description: Como manipular colunas de texto com o acessor .str do Pandas e como usar dados categóricos com astype('category') para economizar memória e impor uma ordem lógica.
category: 'ciência de dados'
tags:
- Ciência de Dados
- Python
- Programação
- Pandas
twitter_text: Trabalhando com Texto e Dados Categóricos no Pandas
introduction: "Nesta parte do tutorial, você vai aprender a manipular texto com o acessor .str e a trabalhar com dados categóricos no Pandas."
---

Até aqui a série tratou principalmente de números — médias, somas, correlações. Mas boa parte dos dados do mundo real é texto: nomes, categorias, descrições, códigos. Neste post você vai ver como o Pandas trata colunas de texto através do acessor `.str`, e como representar valores que se repetem bastante (como categorias) de um jeito mais eficiente, com o tipo `category`.

## O acessor .str

Colunas de texto num _DataFrame_ são armazenadas como `object` (ou `string`, em versões mais recentes do Pandas). Pra aplicar métodos de string a uma coluna inteira de uma vez — sem escrever um loop — o Pandas oferece o acessor `.str`, que dá acesso a praticamente todos os métodos de string do Python, aplicados elemento a elemento.

```py
import pandas as pd

dados = {
    "nome": ["  Ana Silva", "bruno costa", "CARLA MENDES  ", "Diego Alves"],
    "email": ["ana@EMPRESA.com", "bruno@empresa.COM", "carla@empresa.com", "diego@Empresa.com"]
}

df = pd.DataFrame(dados)
```

### Exemplo 1 - maiúsculas, minúsculas e espaços

```py
df["nome_limpo"] = df["nome"].str.strip().str.title()
print(df["nome_limpo"])
```

A saída é:

```py
0       Ana Silva
1     Bruno Costa
2    Carla Mendes
3     Diego Alves
Name: nome_limpo, dtype: object
```

`.strip()` remove espaços em branco do início e do fim de cada valor, e `.title()` deixa a primeira letra de cada palavra maiúscula — os métodos encadeiam normalmente, já que cada um devolve uma nova _Series_ de texto.

### Exemplo 2 - padronizando e-mails

```py
df["email"] = df["email"].str.lower()
print(df["email"])
```

```py
0      ana@empresa.com
1    bruno@empresa.com
2    carla@empresa.com
3    diego@empresa.com
Name: email, dtype: object
```

### Exemplo 3 - contando caracteres com len()

```py
print(df["nome_limpo"].str.len())
```

```py
0     9
1    11
2    12
3    11
Name: nome_limpo, dtype: int64
```

### Exemplo 4 - verificando conteúdo com contains()

`.str.contains()` devolve uma máscara booleana, útil pra filtrar linhas — o mesmo tipo de máscara que você já viu no post sobre seleção e filtragem:

```py
tem_costa = df["nome_limpo"].str.contains("Costa")
print(df[tem_costa])
```

```py
          nome         email    nome_limpo
1  bruno costa  bruno@empresa.com  Bruno Costa
```

### Exemplo 5 - substituindo texto com replace()

```py
dominio_novo = df["email"].str.replace("empresa.com", "novaempresa.com")
print(dominio_novo)
```

```py
0      ana@novaempresa.com
1    bruno@novaempresa.com
2    carla@novaempresa.com
3    diego@novaempresa.com
Name: email, dtype: object
```

### Exemplo 6 - dividindo texto com split()

`.str.split()` quebra cada valor em uma lista, usando o separador informado (por padrão, espaço em branco):

```py
partes = df["nome_limpo"].str.split(" ")
print(partes)
```

```py
0       [Ana, Silva]
1     [Bruno, Costa]
2    [Carla, Mendes]
3     [Diego, Alves]
Name: nome_limpo, dtype: object
```

Passando `expand=True`, cada parte vira uma coluna própria, em vez de ficar dentro de uma lista:

```py
df[["primeiro_nome", "sobrenome"]] = df["nome_limpo"].str.split(" ", expand=True)
print(df[["primeiro_nome", "sobrenome"]])
```

```py
  primeiro_nome sobrenome
0           Ana     Silva
1         Bruno     Costa
2         Carla    Mendes
3         Diego     Alves
```

> **Nota:** todos os métodos de `.str` ignoram valores `NaN` automaticamente, sem gerar erro — uma célula vazia numa coluna de texto continua `NaN` depois de qualquer operação `.str`, em vez de quebrar o processamento das demais linhas.

## Dados categóricos

Algumas colunas de texto não representam um valor livre, mas uma de um conjunto pequeno e fixo de categorias — status de um pedido (`"pendente"`, `"enviado"`, `"entregue"`), tamanho de uma peça de roupa (`"P"`, `"M"`, `"G"`), avaliação (`"ruim"`, `"médio"`, `"bom"`, `"ótimo"`). Pra esse tipo de coluna, o Pandas tem um tipo dedicado: `category`.

### Exemplo 7 - convertendo uma coluna pra category

```py
dados_pedidos = {
    "pedido": [1, 2, 3, 4, 5],
    "status": ["enviado", "pendente", "entregue", "enviado", "entregue"]
}

df_pedidos = pd.DataFrame(dados_pedidos)
df_pedidos["status"] = df_pedidos["status"].astype("category")

print(df_pedidos["status"])
print(df_pedidos.dtypes)
```

A saída é:

```py
0     enviado
1    pendente
2    entregue
3     enviado
4    entregue
Name: status, dtype: category
Categories (3, object): ['entregue', 'enviado', 'pendente']

pedido       int64
status     category
dtype: object
```

Por baixo dos panos, o Pandas passa a guardar só um código numérico por linha (referenciando uma lista fixa de categorias), em vez do texto repetido em cada célula — o que economiza bastante memória em colunas com poucos valores distintos e muitas linhas.

### Exemplo 8 - impondo uma ordem lógica

Por padrão, as categorias não têm uma ordem — mas casos como "tamanho" ou "avaliação" têm uma ordem natural que faz sentido preservar. Isso é feito com `CategoricalDtype`:

```py
from pandas.api.types import CategoricalDtype

ordem_tamanhos = CategoricalDtype(categories=["P", "M", "G", "GG"], ordered=True)

df_produtos = pd.DataFrame({"produto": ["Camisa", "Calça", "Jaqueta"], "tamanho": ["M", "GG", "P"]})
df_produtos["tamanho"] = df_produtos["tamanho"].astype(ordem_tamanhos)

print(df_produtos.sort_values("tamanho"))
```

```py
   produto tamanho
2  Jaqueta       P
0   Camisa       M
1    Calça      GG
```

Com `ordered=True`, o `.sort_values()` ordena pela sequência lógica definida em `categories` (`P < M < G < GG`), em vez da ordem alfabética que você teria com uma coluna de texto comum (onde `"GG"` viria antes de `"M"` e `"P"`).

### Exemplo 9 - comparando categorias ordenadas

Categorias ordenadas também aceitam operadores de comparação diretamente:

```py
print(df_produtos["tamanho"] > "M")
```

```py
0    False
1     True
2    False
Name: tamanho, dtype: bool
```

A comparação segue a ordem lógica definida (`P < M < G < GG`), não a ordem alfabética — é por isso que `"GG"` (índice 1) é considerado maior que `"M"`.

Com o `.str` e o tipo `category` no repertório, você já consegue tratar tanto texto livre quanto categorias com ordem própria. No próximo — e último post desta leva — o assunto é datas: como o Pandas representa datas e séries temporais, e como usá-las como índice de um _DataFrame_.

**Fonte adaptada:** [Pandas - Working with Text Data](https://www.tutorialspoint.com/python_pandas/python_pandas_working_with_text_data.htm), [Pandas - Categorical Data](https://www.tutorialspoint.com/python_pandas/python_pandas_categorical_data.htm), [Pandas - Ordering and Sorting Categorical Data](https://www.tutorialspoint.com/python_pandas/python_pandas_ordering_sorting_categorical_data.htm)
