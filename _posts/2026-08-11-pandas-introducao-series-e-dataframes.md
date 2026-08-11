---
layout: post
title: "#1 - Introdução ao Pandas: Series e DataFrames"
date: 2026-08-11 14:20:00
image: '/assets/img/posts/pandas-introducao-series-e-dataframes.png'
description: Uma introdução ao Pandas explicando os objetos Series e DataFrame, como acessar dados com .loc e como carregar arquivos CSV e JSON.
category: 'ciência de dados'
tags:
- Ciência de Dados
- Python
- Programação
- Pandas
twitter_text: Introdução ao Pandas - Series e DataFrames
introduction: "Nesta parte do tutorial, você vai conhecer o Pandas e os dois objetos fundamentais da biblioteca: Series e DataFrame."
---

Se você já mexeu com planilhas ou com tabelas de banco de dados, vai se sentir em casa com o Pandas. É a biblioteca Python mais usada para análise e manipulação de dados tabulares — criada por Wes McKinney em 2008 (o nome vem de "Panel Data") e hoje uma peça praticamente obrigatória em qualquer projeto de ciência de dados feito em Python.

Começo esta série mostrando como instalar a biblioteca e apresentando as duas estruturas de dados que sustentam tudo o que vem depois: a _Series_ e o _DataFrame_. Termino mostrando como carregar dados de arquivos CSV e JSON, que é normalmente o primeiro passo de qualquer análise de verdade.

## O que é o Pandas e pra que ele serve

O Pandas existe pra resolver um problema bem prático: dados do mundo real costumam vir bagunçados, incompletos ou espalhados em arquivos de formatos diferentes. Com o Pandas você consegue:

- Carregar dados de CSV, JSON, Excel, bancos de dados SQL, entre outros formatos;
- Limpar dados sujos, removendo linhas irrelevantes ou tratando valores vazios;
- Calcular estatísticas básicas (média, máximo, mínimo) rapidamente;
- Encontrar correlações entre colunas;
- Gerar gráficos simples pra visualizar tudo isso.

Os próximos posts da série vão cobrir cada um desses pontos com calma. Por hoje, o foco é entender como o Pandas representa os dados internamente.

## Instalando o Pandas

Se você já tem Python e o `pip` configurados, instalar é uma linha só:

```bash
pip install pandas
```

Depois de instalado, a convenção quase universal é importar o Pandas com o apelido `pd`:

```py
import pandas as pd
```

Você vai ver esse `import pandas as pd` em praticamente todo código Pandas que existe por aí — vale a pena já se acostumar com ele.

### Verificando a versão instalada

```py
import pandas as pd

print(pd.__version__)
```

A saída é algo parecido com:

```py
2.2.2
```

O número exato depende de quando você instalou a biblioteca, mas o importante é confirmar que o import funcionou sem erro.

## Series: a estrutura unidimensional

Uma _Series_ é como uma única coluna de uma tabela: um array unidimensional que guarda uma sequência de valores, cada um associado a um rótulo (o chamado _index_). Pense nela como um meio-termo entre uma lista Python e um dicionário — tem a ordem de uma lista, mas também rótulos como um dicionário.

### Exemplo 1 - criando uma Series a partir de uma lista

```py
import pandas as pd

vendas = [120, 95, 140]
serie_vendas = pd.Series(vendas)
print(serie_vendas)
```

A saída é:

```py
0    120
1     95
2    140
dtype: int64
```

Repare na coluna da esquerda: são os rótulos automáticos, numerados a partir de 0. É por eles que você acessa um valor específico, por exemplo `serie_vendas[1]` retorna `95`.

### Exemplo 2 - usando rótulos personalizados

Você não precisa ficar preso aos índices numéricos — dá pra nomear cada posição com o parâmetro `index`:

```py
import pandas as pd

vendas = [120, 95, 140]
dias = ["segunda", "terça", "quarta"]

serie_vendas = pd.Series(vendas, index=dias)
print(serie_vendas)
print(serie_vendas["terça"])
```

A saída é:

```py
segunda    120
terça       95
quarta     140
dtype: int64
95
```

### Exemplo 3 - criando uma Series a partir de um dicionário

Quando você cria uma _Series_ a partir de um dicionário, as chaves viram os rótulos automaticamente:

```py
import pandas as pd

vendas_mensais = {"jan": 1000, "fev": 1250, "mar": 980}
serie_vendas = pd.Series(vendas_mensais)
print(serie_vendas)
```

A saída é:

```py
jan    1000
fev    1250
mar     980
dtype: int64
```

Se quiser trazer só algumas chaves do dicionário, passe o parâmetro `index` com a lista das que interessam — as demais são ignoradas.

## DataFrame: a estrutura tabular

Enquanto a _Series_ representa uma coluna, o _DataFrame_ representa a tabela inteira: uma estrutura de dados de duas dimensões, com linhas e colunas rotuladas — muito parecida com uma planilha ou com uma tabela de banco de dados relacional. Na prática, é a estrutura com a qual você vai trabalhar na maior parte do tempo.

### Exemplo - criando um DataFrame com dados de funcionários

A forma mais comum de criar um _DataFrame_ do zero é a partir de um dicionário onde cada chave é uma coluna e o valor é uma lista com os dados daquela coluna:

```py
import pandas as pd

dados = {
    "nome": ["Ana", "Bruno", "Carla"],
    "cargo": ["Analista", "Desenvolvedor", "Gerente"],
    "salario": [4500, 6200, 8900]
}

df = pd.DataFrame(dados)
print(df)
```

A saída é:

```py
    nome          cargo  salario
0    Ana       Analista     4500
1  Bruno  Desenvolvedor     6200
2  Carla        Gerente     8900
```

Cada linha ganhou um índice numérico automático, igual aconteceu com a _Series_. E cada coluna, por baixo dos panos, também é uma _Series_ — um _DataFrame_ nada mais é do que uma coleção de _Series_ que compartilham o mesmo índice.

### Acessando linhas com .loc

O acessor `.loc` é a forma recomendada de buscar uma ou mais linhas pelo rótulo do índice:

```py
print(df.loc[1])
```

A saída é:

```py
nome       Bruno
cargo      Desenvolvedor
salario     6200
Name: 1, dtype: object
```

Repare que usar colchete simples (`df.loc[1]`) devolve uma _Series_ com aquela linha. Se você usar colchete duplo, o retorno é um _DataFrame_ — útil quando quer selecionar mais de uma linha de uma vez:

```py
print(df.loc[[0, 2]])
```

```py
    nome     cargo  salario
0    Ana  Analista     4500
2  Carla   Gerente     8900
```

Também dá pra definir seus próprios rótulos de linha na hora de criar o _DataFrame_, em vez de usar os números automáticos:

```py
df = pd.DataFrame(dados, index=["func1", "func2", "func3"])
print(df.loc["func2"])
```

> **Nota:** `.loc` busca pelo rótulo do índice, não pela posição. Se seus índices forem números "fora de ordem" (por exemplo, depois de remover linhas), `.loc[1]` ainda busca o rótulo `1`, não a segunda linha da tabela.

## Lendo dados de arquivos CSV e JSON

Criar um _DataFrame_ direto no código é ótimo pra aprender e pra testar coisas rápido, mas no dia a dia os dados quase sempre já existem em algum arquivo. O Pandas tem funções prontas pra carregar os formatos mais comuns.

### Lendo um CSV

```py
import pandas as pd

df = pd.read_csv("funcionarios.csv")
print(df.to_string())
```

O método `.to_string()` força a exibição de todas as linhas do _DataFrame_. Sem ele, DataFrames grandes são exibidos de forma resumida (só as primeiras e últimas linhas), porque por padrão o Pandas limita a exibição a um número máximo de linhas — configurável em `pd.options.display.max_rows`.

```py
import pandas as pd

pd.options.display.max_rows = 9999
df = pd.read_csv("funcionarios.csv")
print(df)
```

Com esse ajuste, o _DataFrame_ inteiro aparece na tela mesmo que tenha milhares de linhas.

### Lendo um JSON

JSON tem praticamente a mesma cara de um dicionário Python, então a leitura funciona de forma parecida:

```py
import pandas as pd

df = pd.read_json("funcionarios.json")
print(df.to_string())
```

E se seus dados já estiverem em memória como um dicionário Python (por exemplo, vindos de uma resposta de API), nem precisa passar por um arquivo — dá pra criar o _DataFrame_ direto:

```py
import pandas as pd

dados_json = {
    "nome": ["Ana", "Bruno", "Carla"],
    "cargo": ["Analista", "Desenvolvedor", "Gerente"],
    "salario": [4500, 6200, 8900]
}

df = pd.DataFrame(dados_json)
print(df)
```

Com isso você já tem a base pra começar a trabalhar com dados de verdade. No próximo post da série, vamos usar essas mesmas ideias pra inspecionar e limpar um _DataFrame_ — porque dados do mundo real quase nunca vêm perfeitos.

**Fonte adaptada:** [Pandas Introduction](https://www.w3schools.com/python/pandas/pandas_intro.asp), [Pandas Getting Started](https://www.w3schools.com/python/pandas/pandas_getting_started.asp), [Pandas Series](https://www.w3schools.com/python/pandas/pandas_series.asp), [Pandas DataFrames](https://www.w3schools.com/python/pandas/pandas_dataframes.asp), [Pandas Read CSV](https://www.w3schools.com/python/pandas/pandas_csv.asp), [Pandas Read JSON](https://www.w3schools.com/python/pandas/pandas_json.asp)
