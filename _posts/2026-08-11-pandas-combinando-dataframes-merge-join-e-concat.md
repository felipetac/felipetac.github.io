---
layout: post
title: "#6 - Combinando DataFrames: merge, join e concat"
date: 2026-08-11 16:00:00
image: '/assets/img/posts/pandas-combinando-dataframes-merge-join-e-concat.png'
description: Como combinar DataFrames diferentes no Pandas usando merge() para joins ao estilo SQL, join() por índice e concat() para empilhar tabelas.
category: 'ciência de dados'
tags:
- Ciência de Dados
- Python
- Programação
- Pandas
twitter_text: Combinando DataFrames com merge, join e concat
introduction: "Nesta parte do tutorial, você vai aprender a combinar DataFrames diferentes com merge(), join() e concat()."
---

Dificilmente todos os dados de uma análise real vêm de uma única tabela. É bem mais comum ter um _DataFrame_ de clientes, outro de pedidos, outro de produtos — cada um numa fonte diferente — e precisar juntá-los antes de conseguir responder qualquer pergunta que cruze essas informações. O Pandas tem três ferramentas principais pra isso: `merge()`, `join()` e `concat()`.

## merge(): joins ao estilo SQL

`pd.merge()` (ou o método equivalente `df.merge()`) combina dois _DataFrames_ com base nos valores de uma ou mais colunas em comum — o mesmo conceito de _JOIN_ do SQL, pra quem já usou banco de dados relacional.

Vamos usar dois _DataFrames_ de exemplo: um de clientes e outro de pedidos.

```py
import pandas as pd

clientes = pd.DataFrame({
    "id_cliente": [1, 2, 3, 4],
    "nome": ["Ana", "Bruno", "Carla", "Diego"]
})

pedidos = pd.DataFrame({
    "id_pedido": [101, 102, 103, 104],
    "id_cliente": [1, 2, 2, 5],
    "valor": [250.0, 89.9, 430.0, 120.0]
})
```

Repare que o cliente `4` (Diego) não tem nenhum pedido, e o pedido `104` pertence ao cliente `5`, que não existe na tabela de clientes — isso vai ser importante pra entender a diferença entre os tipos de _join_.

### Exemplo 1 - inner join (o padrão)

```py
resultado = pd.merge(clientes, pedidos, on="id_cliente")
print(resultado)
```

A saída é:

```py
   id_cliente   nome  id_pedido  valor
0           1    Ana        101  250.0
1           2  Bruno        102   89.9
2           2  Bruno        103  430.0
```

Por padrão (`how="inner"`), só sobrevivem as linhas cujo `id_cliente` existe **nas duas** tabelas. Carla e Diego somem (não tinham pedido), e o pedido `104` também some (não tinha cliente correspondente).

### Exemplo 2 - left join

Pra manter todas as linhas da tabela da esquerda mesmo sem correspondência, use `how="left"`:

```py
resultado = pd.merge(clientes, pedidos, on="id_cliente", how="left")
print(resultado)
```

```py
   id_cliente   nome  id_pedido  valor
0           1    Ana      101.0  250.0
1           2  Bruno      102.0   89.9
2           2  Bruno      103.0  430.0
3           3  Carla        NaN    NaN
4           4  Diego        NaN    NaN
```

Agora Carla e Diego aparecem, com `NaN` nas colunas que vieram da tabela de pedidos — já que nenhum deles tinha um pedido correspondente.

### Exemplo 3 - outer join

`how="outer"` mantém tudo dos dois lados, preenchendo com `NaN` onde não há correspondência de nenhum dos lados:

```py
resultado = pd.merge(clientes, pedidos, on="id_cliente", how="outer")
print(resultado)
```

```py
   id_cliente   nome  id_pedido  valor
0           1    Ana      101.0  250.0
1           2  Bruno      102.0   89.9
2           2  Bruno      103.0  430.0
3           3  Carla        NaN    NaN
4           4  Diego        NaN    NaN
5           5    NaN      104.0  120.0
```

Agora o pedido `104` também aparece, mesmo sem um cliente correspondente — a coluna `nome` fica `NaN` nessa linha.

> **Nota:** existe ainda `how="right"`, que faz o espelho do `left` (mantém tudo da tabela da direita), e `how="cross"`, que combina cada linha de uma tabela com cada linha da outra — útil pra gerar todas as combinações possíveis entre dois conjuntos.

### Exemplo 4 - juntando por colunas com nomes diferentes

Se a coluna-chave tiver nomes diferentes em cada tabela, use `left_on` e `right_on` no lugar de `on`:

```py
pedidos2 = pedidos.rename(columns={"id_cliente": "cliente_id"})

resultado = pd.merge(clientes, pedidos2, left_on="id_cliente", right_on="cliente_id")
print(resultado)
```

O resultado é o mesmo do _inner join_ do Exemplo 1, só que agora com as duas colunas-chave (`id_cliente` e `cliente_id`) lado a lado no resultado, em vez de uma só.

## join(): combinando pelo índice

Enquanto `merge()` combina por colunas, `.join()` combina pelo **índice** de cada _DataFrame_. É útil quando as tabelas já compartilham o mesmo rótulo de índice, sem precisar de uma coluna-chave explícita.

### Exemplo 5 - join básico

```py
esquerda = pd.DataFrame(
    {"nome": ["Ana", "Bruno", "Carla"]},
    index=["c1", "c2", "c3"]
)

direita = pd.DataFrame(
    {"cidade": ["Recife", "Curitiba"]},
    index=["c1", "c2"]
)

print(esquerda.join(direita))
```

```py
   nome    cidade
c1  Ana    Recife
c2 Bruno  Curitiba
c3 Carla       NaN
```

Por padrão, `.join()` se comporta como um _left join_ (`how="left"`) — todas as linhas do `esquerda` são mantidas, com `NaN` onde não há correspondência no índice de `direita`. O parâmetro `how` aceita os mesmos valores de `merge()` (`"inner"`, `"outer"`, `"right"`).

## concat(): empilhando DataFrames

Diferente de `merge()` e `join()`, que combinam colunas com base numa chave, `pd.concat()` serve pra **empilhar** _DataFrames_ que já têm a mesma estrutura — por exemplo, vendas de janeiro e vendas de fevereiro, cada mês num arquivo separado.

### Exemplo 6 - empilhando linhas

```py
vendas_jan = pd.DataFrame({"produto": ["Mouse", "Teclado"], "unidades": [30, 15]})
vendas_fev = pd.DataFrame({"produto": ["Mouse", "Monitor"], "unidades": [22, 8]})

resultado = pd.concat([vendas_jan, vendas_fev])
print(resultado)
```

```py
   produto  unidades
0    Mouse        30
1  Teclado        15
0    Mouse        22
1  Monitor         8
```

Repare que o índice se repete (`0, 1, 0, 1`) — cada _DataFrame_ manteve o índice original. Pra gerar um índice novo e sequencial, use `ignore_index=True`:

```py
resultado = pd.concat([vendas_jan, vendas_fev], ignore_index=True)
print(resultado)
```

```py
   produto  unidades
0    Mouse        30
1  Teclado        15
2    Mouse        22
3  Monitor         8
```

### Exemplo 7 - empilhando lado a lado

Com `axis=1`, em vez de empilhar linhas, o `concat()` junta colunas lado a lado, alinhando pelo índice:

```py
resultado = pd.concat([esquerda, direita], axis=1)
print(resultado)
```

```py
    nome    cidade
c1   Ana    Recife
c2 Bruno  Curitiba
c3 Carla       NaN
```

Nesse caso o resultado fica parecido com o `.join()` do Exemplo 5, já que os dois _DataFrames_ compartilham índice — a diferença é que `concat()` não tem o conceito de "esquerda" e "direita" prioritário, ele só alinha pelo índice e junta as colunas de cada um.

Com `merge()`, `join()` e `concat()`, você já consegue reunir dados espalhados em várias fontes numa única tabela pronta pra análise. No próximo post da série, o foco muda pra dentro das colunas: como tratar texto e dados categóricos com o Pandas.

**Fonte adaptada:** [Pandas - Merging/Joining](https://www.tutorialspoint.com/python_pandas/python_pandas_merging_joining.htm), [Pandas - Concatenation](https://www.tutorialspoint.com/python_pandas/python_pandas_concatenation.htm)
