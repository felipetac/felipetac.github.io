---
layout: post
title: "Pandas #18 - Gráficos Avançados: Boxplot, Área, Pizza e Subplots"
date: 2026-08-11 18:25:00
image: '/assets/img/posts/pandas-graficos-avancados-boxplot-area-pizza-e-subplots.webp'
description: Como ir além do gráfico de linha e dispersão com plot(kind="box"), gráfico de área, pizza, múltiplos subplots de uma vez e barras/áreas empilhadas com stacked=True.
category: 'ciência de dados'
tags:
- Ciência de Dados
- Python
- Programação
- Pandas
twitter_text: "Pandas #18 - Gráficos Avançados: Boxplot, Área, Pizza e Subplots"
introduction: "Nesta parte do tutorial, você vai aprender tipos de gráfico mais avançados do Pandas: boxplot, área, pizza, subplots e barras empilhadas."
---

No post anterior você fechou o ciclo de entrada e saída de dados do Pandas. Pra fechar esta série, valem mais alguns tipos de gráfico que `.plot()` oferece além de linha, dispersão e barra, já vistos lá atrás: boxplot, gráfico de área, pizza, e a possibilidade de desenhar várias colunas em subplots separados de uma vez.

## Boxplot: visualizando a distribuição

O boxplot (ou "diagrama de caixa") mostra de uma vez só a mediana, os quartis e possíveis valores atípicos (_outliers_) de uma coluna — um resumo visual do que `describe()` já mostra em número, visto lá no post de estatísticas descritivas.

### Exemplo 1 - boxplot de uma coluna

```py
import pandas as pd
import matplotlib.pyplot as plt

dados = {"salario": [3200, 4100, 3900, 4500, 12000, 3800, 4200]}
df = pd.DataFrame(dados)

df.plot(kind="box")
plt.show()
```

A caixa central mostra onde fica a maioria dos dados (entre o primeiro e o terceiro quartil), a linha dentro dela marca a mediana, e os pontos fora dos "bigodes" — nesse caso, o `12000`, bem distante dos demais salários — aparecem marcados individualmente como possíveis outliers.

## Gráfico de área

Parecido com o gráfico de linha, mas preenchendo o espaço abaixo da linha até o eixo x — útil pra reforçar visualmente o volume acumulado, não só a tendência.

### Exemplo 2 - área simples

```py
vendas = pd.DataFrame({
    "notebook": [8, 12, 10, 15],
    "mouse": [30, 25, 28, 32]
}, index=["jan", "fev", "mar", "abr"])

vendas.plot(kind="area", alpha=0.5)
plt.show()
```

O parâmetro `alpha` controla a transparência do preenchimento — importante aqui porque, por padrão, as áreas de duas colunas diferentes se sobrepõem, e um preenchimento totalmente opaco esconderia a área de baixo.

### Exemplo 3 - área empilhada com stacked=True

Pra ver o total das duas colunas somado, em vez de sobreposto, use `stacked=True` — o mesmo parâmetro funciona em gráficos de barra:

```py
vendas.plot(kind="area", stacked=True)
plt.show()
```

Agora a área de `mouse` começa exatamente onde a de `notebook` termina, então a altura total do gráfico em cada mês representa a soma das duas colunas.

## Gráfico de pizza

Pra mostrar a proporção de cada categoria dentro de um total, o gráfico de pizza é chamado numa única Series (uma coluna isolada), não num DataFrame inteiro.

### Exemplo 4 - pizza de participação por produto

```py
participacao = pd.Series([45, 30, 25], index=["notebook", "mouse", "teclado"])
participacao.plot(kind="pie", autopct="%1.0f%%")
plt.show()
```

`autopct="%1.0f%%"` exibe o percentual de cada fatia diretamente no gráfico, arredondado sem casas decimais — sem esse parâmetro, o gráfico mostra só os rótulos, sem os números.

> **Nota:** gráficos de pizza são úteis pra poucas categorias (até uns 5-6), mas ficam difíceis de ler com muitas fatias pequenas — nesse caso, um gráfico de barras costuma comunicar melhor a mesma informação.

## Vários gráficos de uma vez com subplots

Quando um DataFrame tem várias colunas numéricas com escalas bem diferentes, colocar todas no mesmo gráfico pode distorcer a leitura. `subplots=True` desenha um gráfico separado pra cada coluna, todos na mesma figura.

### Exemplo 5 - subplots automáticos

```py
dados_variados = pd.DataFrame({
    "temperatura": [24, 26, 23, 27],
    "umidade": [60, 55, 70, 50]
}, index=["seg", "ter", "qua", "qui"])

dados_variados.plot(subplots=True)
plt.show()
```

Em vez de uma única linha misturando graus e porcentagem na mesma escala, o resultado é dois gráficos empilhados, um pra `temperatura` e outro pra `umidade`, cada um com sua própria escala de eixo y.

## Ajustando o layout dos subplots

Por padrão, `subplots=True` empilha os gráficos verticalmente, um embaixo do outro. Pra organizar em grade (por exemplo, 2 colunas), o parâmetro `layout` controla isso.

### Exemplo 6 - subplots em grade

```py
dados_variados.plot(subplots=True, layout=(1, 2), figsize=(10, 4))
plt.show()
```

`layout=(1, 2)` pede uma grade de 1 linha por 2 colunas — os dois gráficos ficam lado a lado, em vez de empilhados, e `figsize` controla o tamanho total da figura em polegadas (largura, altura).

Outros dois parâmetros úteis em conjunto com `subplots=True`: `sharex=True` e `sharey=True`, que forçam todos os subplots a compartilhar a mesma escala de eixo — bom pra comparar diretamente a amplitude de duas colunas, mesmo que estejam em subplots separados.

> **Nota:** o Pandas também tem `kind="hexbin"` (dispersão em hexágonos, útil quando há muitos pontos sobrepostos) e `kind="kde"`/`kind="density"` (estimativa suave da distribuição, uma alternativa ao histograma) — ambos seguem a mesma sintaxe `df.plot(kind=...)` já vista ao longo desta série.

Com boxplot, área, pizza, `stacked=True` e `subplots=True`, você tem agora um repertório bem mais amplo do que o gráfico de linha do início desta série pra visualizar dados direto do Pandas. E, como já vimos lá atrás, tudo isso é só uma camada de conveniência sobre o Matplotlib — o próximo post da série mergulha direto nele, pra ter controle fino sobre cada detalhe do gráfico.

**Fonte adaptada:** [Pandas - Visualization](https://www.tutorialspoint.com/python_pandas/python_pandas_visualization.htm)
