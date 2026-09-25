---
layout: post
title: "Pandas | #3 - Operações Aritméticas em Series e DataFrames"
date: 2026-08-11 17:10:00
image: '/assets/img/posts/pandas-operacoes-aritmeticas-em-series-e-dataframes.webp'
description: Como usar operadores aritméticos em Series e DataFrames do Pandas, como funciona o alinhamento automático pelo índice e como usar fill_value para evitar valores NaN.
category: 'ciência de dados'
tags:
- Ciência de Dados
- Python
- Programação
- Pandas
twitter_text: Operações Aritméticas em Series e DataFrames
introduction: "Nesta parte do tutorial, você vai aprender a fazer contas com Series e DataFrames, incluindo o alinhamento automático pelo índice e o parâmetro fill_value."
---

No post anterior você aprendeu a selecionar exatamente as linhas e colunas que precisa com `.loc`, `.iloc` e máscaras booleanas. Depois de isolar os dados certos, o passo seguinte é quase sempre fazer contas com eles: somar duas colunas, aplicar um desconto, calcular uma diferença. O Pandas deixa isso natural, porque tanto _Series_ quanto _DataFrame_ suportam os operadores aritméticos comuns do Python direto.

Neste post você vai ver como funcionam essas operações — incluindo um comportamento que costuma surpreender quem vem de listas ou arrays do NumPy: o alinhamento automático pelo índice.

## Operações com um número fixo (escalar)

O caso mais simples é aplicar uma operação entre uma _Series_ (ou uma coluna de um _DataFrame_) e um número fixo — o Pandas aplica a operação em cada elemento automaticamente.

### Exemplo 1 - reajustando preços

```py
import pandas as pd

precos = pd.Series([89.90, 150.00, 3200.00, 220.00], index=["mouse", "teclado", "notebook", "headset"])
print(precos * 1.1)
```

A saída é:

```py
mouse         98.89
teclado      165.00
notebook    3520.00
headset      242.00
dtype: float64
```

Cada valor foi multiplicado por `1.1`, simulando um reajuste de 10% — sem precisar de nenhum loop. O mesmo vale pra `+`, `-`, `/`, `**` (potência), `%` (resto da divisão) e `//` (divisão inteira), e funciona do mesmo jeito numa coluna inteira de um _DataFrame_.

## Operações entre duas Series: o alinhamento automático

Quando a operação envolve duas _Series_ (ou duas colunas), o Pandas não soma "posição por posição" como faria uma lista — ele soma **rótulo por rótulo**, casando os índices de cada lado antes de calcular.

### Exemplo 2 - somando duas Series com o mesmo índice

```py
estoque_loja1 = pd.Series([12, 45, 8], index=["mouse", "teclado", "notebook"])
estoque_loja2 = pd.Series([20, 15, 3], index=["mouse", "teclado", "notebook"])

print(estoque_loja1 + estoque_loja2)
```

```py
mouse        32
teclado      60
notebook     11
dtype: int64
```

Enquanto os dois índices batem exatamente, o resultado é intuitivo. Mas repare o que acontece quando eles **não** batem:

### Exemplo 3 - índices desalinhados geram NaN

```py
estoque_loja3 = pd.Series([5, 10], index=["mouse", "headset"])

print(estoque_loja1 + estoque_loja3)
```

```py
headset      NaN
mouse       17.0
notebook     NaN
teclado      NaN
dtype: float64
```

O Pandas junta **todos** os rótulos que aparecem em qualquer um dos dois lados. Onde um rótulo só existe de um lado (`teclado` e `notebook` só em `estoque_loja1`, `headset` só em `estoque_loja3`), o resultado vira `NaN` — o Pandas não assume que "posição 2" de um lado é a mesma coisa que "posição 2" do outro, ele só combina o que tem o mesmo rótulo.

> **Nota:** esse alinhamento por índice é uma das maiores diferenças entre operar com Series do Pandas e com arrays do NumPy. Um array simplesmente soma posição por posição, sem olhar rótulo nenhum — o Pandas é mais cuidadoso, mas isso significa que índices desalinhados (por exemplo, depois de um filtro aplicado antes) podem gerar `NaN` inesperados se você não prestar atenção.

## Operações entre DataFrames

A mesma lógica de alinhamento vale pra _DataFrames_ inteiros — só que agora tanto o índice das linhas quanto os nomes das colunas precisam bater.

### Exemplo 4 - somando dois DataFrames

```py
vendas_q1 = pd.DataFrame({"notebook": [10, 8], "mouse": [30, 25]}, index=["loja1", "loja2"])
vendas_q2 = pd.DataFrame({"notebook": [12, 9], "teclado": [15, 20]}, index=["loja1", "loja2"])

print(vendas_q1 + vendas_q2)
```

```py
       mouse  notebook  teclado
loja1    NaN        22      NaN
loja2    NaN        17      NaN
```

Só a coluna `notebook`, presente nos dois _DataFrames_, teve um resultado numérico de verdade. `mouse` (só em `vendas_q1`) e `teclado` (só em `vendas_q2`) viraram `NaN` em todas as linhas, pelo mesmo motivo do exemplo anterior.

## Evitando NaN com os métodos explícitos e fill_value

Quando um valor ausente de um lado deveria ser tratado como zero (em vez de virar `NaN`), os métodos explícitos `.add()`, `.sub()`, `.mul()` e `.div()` resolvem isso com o parâmetro `fill_value`.

### Exemplo 5 - somando com fill_value

```py
print(vendas_q1.add(vendas_q2, fill_value=0))
```

```py
       mouse  notebook  teclado
loja1   30.0        22     15.0
loja2   25.0        17     20.0
```

Agora, onde uma coluna não existia de um dos lados, o Pandas trata o valor ausente como `0` antes de somar — `mouse` (que só existia em `vendas_q1`) aparece com o próprio valor de `vendas_q1`, em vez de `NaN`.

> **Nota:** `fill_value` substitui o valor ausente **antes** da operação, então não é a mesma coisa que rodar `.add()` normal e depois usar `.fillna(0)` no resultado — se **os dois** lados tiverem `NaN` na mesma posição, o resultado continua `NaN` mesmo com `fill_value`.

O Pandas também tem um método `.dot()` pra produto matricial entre DataFrames (equivalente ao `@` do NumPy), útil em contas mais avançadas de álgebra linear — mas no dia a dia de análise de dados, `add()`, `sub()`, `mul()` e `div()` cobrem a grande maioria dos casos.

Com operadores aritméticos e o alinhamento automático pelo índice no repertório, você já sabe fazer contas com segurança entre Series e DataFrames diferentes. Mas até aqui todos os exemplos assumiram dados já limpos — no próximo post a série volta pra um tema essencial antes de qualquer conta valer a pena: como inspecionar e limpar um DataFrame recém-carregado.

**Fonte adaptada:** [Pandas - Arithmetic Operations on Series Object](https://www.tutorialspoint.com/python_pandas/python_pandas_arithmetic_operations_on_series_object.htm), [Pandas - Arithmetic Operations on DataFrame](https://www.tutorialspoint.com/python_pandas/python_pandas_arithmetic_operations_on_dataframe.htm)
