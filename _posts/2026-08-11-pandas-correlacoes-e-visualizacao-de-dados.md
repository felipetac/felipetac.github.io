---
layout: post
title: "#3 - Correlações e Visualização de Dados com Pandas"
date: 2026-08-11 15:00:00
image: '/assets/img/posts/pandas-correlacoes-e-visualizacao-de-dados.webp'
description: Como encontrar correlações entre colunas numéricas de um DataFrame com .corr() e como gerar gráficos rápidos com o método .plot() do Pandas.
category: 'ciência de dados'
tags:
- Ciência de Dados
- Python
- Programação
- Pandas
twitter_text: Correlações e Visualização de Dados com Pandas
introduction: "Nesta parte do tutorial, você vai aprender a encontrar correlações entre colunas com .corr() e a gerar gráficos rápidos com .plot()."
---

Com os dados já limpos, chegou a hora da parte mais interessante: extrair alguma informação útil deles. Neste post você vai ver como medir o quanto duas colunas de um _DataFrame_ "andam juntas" usando correlação, e como transformar esses números em gráficos com poucas linhas de código.

## Encontrando correlações com corr()

Correlação é uma medida estatística que indica o quanto duas variáveis se relacionam. O método `.corr()` do Pandas calcula essa relação entre todas as colunas numéricas de um _DataFrame_ de uma vez só — colunas não-numéricas são simplesmente ignoradas.

```py
import pandas as pd

dados = {
    "duracao": [30, 45, 60, 45, 50, 60, 45],
    "pulso": [110, 117, 103, 109, 117, 102, 104],
    "calorias": [280.0, 340.0, 380.5, 300.0, 320.0, 400.0, 300.0]
}

df = pd.DataFrame(dados)
print(df.corr())
```

A saída é:

```py
          duracao     pulso  calorias
duracao  1.000000 -0.157750  0.878421
pulso   -0.157750  1.000000  0.042315
calorias 0.878421  0.042315  1.000000
```

### Como interpretar os valores

O resultado do `.corr()` é sempre um número entre -1 e 1:

- **Perto de 1**: correlação positiva forte — quando uma coluna sobe, a outra tende a subir junto. No exemplo acima, `duracao` e `calorias` têm correlação de aproximadamente `0.88`, o que faz sentido: treinos mais longos tendem a queimar mais calorias.
- **Perto de -1**: correlação negativa forte — quando uma sobe, a outra tende a descer.
- **Perto de 0**: pouca ou nenhuma correlação. `duracao` e `pulso`, por exemplo, ficaram em `-0.16`, bem perto de zero — não há uma relação clara entre a duração do treino e o pulso registrado.

Uma régua informal bastante usada: valores acima de `0.6` (ou abaixo de `-0.6`) já costumam ser considerados uma correlação "boa" o bastante pra chamar atenção; valores em torno de `0.2` costumam ser fracos demais pra tirar qualquer conclusão.

> **Nota:** correlação não implica causalidade. Duas colunas correlacionadas não significam necessariamente que uma causa a outra — pode haver um terceiro fator por trás, ou pode ser só coincidência.

### Colunas não-numéricas são ignoradas automaticamente

Se o seu _DataFrame_ tiver colunas de texto misturadas com as numéricas, não precisa removê-las antes de chamar `.corr()` — o método já ignora qualquer coluna que não seja numérica:

```py
import pandas as pd

dados = {
    "instrutor": ["Ana", "Ana", "Bruno", "Bruno", "Ana", "Bruno", "Ana"],
    "duracao": [30, 45, 60, 45, 50, 60, 45],
    "calorias": [280.0, 340.0, 380.5, 300.0, 320.0, 400.0, 300.0]
}

df = pd.DataFrame(dados)
print(df.corr(numeric_only=True))
```

A coluna `instrutor` some do resultado sem gerar nenhum erro — o `.corr()` simplesmente calcula a relação entre `duracao` e `calorias`, do mesmo jeito que no exemplo anterior. O parâmetro `numeric_only=True` deixa essa intenção explícita e evita um aviso em versões mais recentes do Pandas.

## Visualizando dados com plot()

Números soltos numa tabela raramente contam a história inteira — às vezes um gráfico simples revela um padrão que passaria despercebido. O Pandas tem um método `.plot()` embutido em todo _DataFrame_ e _Series_, que é uma forma rápida de gerar visualizações sem escrever muito código.

> **Nota:** por baixo dos panos, o `.plot()` do Pandas usa o Matplotlib pra desenhar o gráfico de fato. É por isso que, além do `import pandas`, você também precisa importar `matplotlib.pyplot` e chamar `plt.show()` pra exibir o resultado na tela — e é justamente o Matplotlib o assunto dos próximos dois posts da série.

### Gráfico de linha

Sem nenhum parâmetro, `.plot()` desenha um gráfico de linha usando o índice do _DataFrame_ como eixo x e cada coluna numérica como uma linha própria:

```py
import pandas as pd
import matplotlib.pyplot as plt

dados = {
    "duracao": [30, 45, 60, 45, 50, 60, 45],
    "calorias": [280.0, 340.0, 380.5, 300.0, 320.0, 400.0, 300.0]
}

df = pd.DataFrame(dados)
df.plot()
plt.show()
```

Isso gera um gráfico com duas linhas — uma pra `duracao` e outra pra `calorias` — cada uma acompanhando a evolução dos valores ao longo dos índices (os dias de treino, nesse caso), com uma legenda no canto indicando qual cor representa qual coluna.

### Gráfico de dispersão

Pra investigar visualmente uma correlação específica entre duas colunas, o gráfico de dispersão costuma ser mais claro que o de linha. Basta passar `kind="scatter"` junto com as colunas dos eixos x e y:

```py
df.plot(kind="scatter", x="duracao", y="calorias")
plt.show()
```

O gráfico resultante mostra um ponto pra cada linha do _DataFrame_, posicionado conforme sua duração (eixo x) e suas calorias (eixo y). Como vimos que a correlação entre essas duas colunas é forte (`0.88`), os pontos tendem a formar uma tendência de subida visível: treinos mais longos concentrados nos pontos com mais calorias queimadas.

### Gráfico de barras

Pra comparar valores entre categorias, o gráfico de barras é mais direto:

```py
vendas = {
    "produto": ["Notebook", "Mouse", "Teclado", "Monitor"],
    "unidades": [12, 45, 30, 8]
}

df_vendas = pd.DataFrame(vendas)
df_vendas.plot(kind="bar", x="produto", y="unidades")
plt.show()
```

Isso desenha uma barra vertical pra cada produto, com a altura proporcional ao número de unidades vendidas — dá pra comparar as quatro categorias com uma olhada só, o que seria bem menos imediato só olhando a tabela.

### Personalizando o gráfico gerado pelo plot()

Como o `.plot()` do Pandas é só uma camada por cima do Matplotlib, as funções de personalização que valem pra qualquer gráfico do Matplotlib (título, rótulos dos eixos, grade) também funcionam aqui — basta chamá-las depois do `.plot()` e antes do `plt.show()`:

```py
df_vendas.plot(kind="bar", x="produto", y="unidades", color="#4CAF50")
plt.title("Unidades Vendidas por Produto")
plt.xlabel("Produto")
plt.ylabel("Unidades")
plt.grid(axis="y")
plt.show()
```

O gráfico de barras fica com um título no topo, rótulos identificando os dois eixos e linhas de grade horizontais discretas atrás das barras — tudo isso sem precisar sair do fluxo `df.plot(...)` que já é familiar de quem vem do Pandas.

### Histograma de uma única coluna

Quando o interesse é entender como os valores de uma coluna estão distribuídos (e não compará-la com outra), o histograma é a ferramenta certa. Nesse caso, o `.plot()` é chamado direto numa _Series_ (ou seja, numa coluna isolada do _DataFrame_):

```py
df["duracao"].plot(kind="hist")
plt.show()
```

O gráfico agrupa os valores de `duracao` em faixas (chamadas de _bins_) e desenha uma barra pra cada faixa, com a altura representando quantos treinos caíram naquele intervalo — por exemplo, quantos treinos duraram entre 40 e 50 minutos.

Com `.corr()` e `.plot()` você já consegue extrair e visualizar as primeiras conclusões reais de um dataset. A partir daqui, vale mergulhar direto no Matplotlib pra ter controle fino sobre cada detalhe dos gráficos — que é exatamente pra onde a série vai a seguir.

**Fonte adaptada:** [Pandas - Data Correlations](https://www.w3schools.com/python/pandas/pandas_correlations.asp), [Pandas - Plotting](https://www.w3schools.com/python/pandas/pandas_plotting.asp)
