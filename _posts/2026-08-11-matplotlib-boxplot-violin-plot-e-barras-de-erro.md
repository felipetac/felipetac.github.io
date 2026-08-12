---
layout: post
title: "#6 - Boxplot, Violin Plot e Barras de Erro no Matplotlib"
date: 2026-08-11 18:40:00
image: '/assets/img/posts/matplotlib-boxplot-violin-plot-e-barras-de-erro.webp'
description: Como visualizar a distribuição estatística de uma variável com boxplot() e violinplot(), e como representar incerteza com barras de erro usando errorbar().
category: 'ciência de dados'
tags:
- Ciência de Dados
- Python
- Programação
- Matplotlib
twitter_text: Boxplot, Violin Plot e Barras de Erro no Matplotlib
introduction: "Nesta parte do tutorial, você vai aprender a criar boxplots, violin plots e barras de erro com o Matplotlib."
---

O post sobre dispersão, barras, histogramas e pizza cobriu os gráficos mais usados no dia a dia. Existe, porém, uma categoria à parte: gráficos pensados especificamente pra resumir a **distribuição estatística** de uma variável, ou pra deixar explícita a **incerteza** de uma medida. Neste post você vai conhecer os três mais comuns: boxplot, violin plot e barras de erro.

## Boxplot

O boxplot (ou "diagrama de caixa") resume uma distribuição em cinco números: o mínimo, o primeiro quartil, a mediana, o terceiro quartil e o máximo — de uma olhada só, dá pra ver onde a maioria dos valores se concentra e identificar possíveis outliers.

### Exemplo 1 - boxplot básico

```py
import matplotlib.pyplot as plt
import numpy as np

np.random.seed(42)
turma_a = np.random.normal(7.0, 1.2, 40)
turma_b = np.random.normal(6.2, 1.8, 40)

plt.boxplot([turma_a, turma_b], tick_labels=["Turma A", "Turma B"])
plt.title("Distribuição de Notas por Turma")
plt.ylabel("Nota")
plt.show()
```

Cada caixa mostra o intervalo entre o primeiro e o terceiro quartil (os 50% centrais dos dados), com uma linha marcando a mediana. As linhas que saem da caixa (os "bigodes") se estendem até o menor e o maior valor que ainda não são considerados outliers; pontos isolados além dos bigodes são desenhados individualmente, e representam valores atípicos.

### Exemplo 2 - boxplot horizontal com notch

```py
plt.boxplot([turma_a, turma_b], tick_labels=["Turma A", "Turma B"], vert=False, notch=True)
plt.xlabel("Nota")
plt.show()
```

`vert=False` deita o boxplot na horizontal — útil quando os rótulos das categorias são longos. `notch=True` adiciona um "entalhe" ao redor da mediana de cada caixa, uma pista visual de que caixas cujos entalhes não se sobrepõem tendem a ter medianas significativamente diferentes.

### Exemplo 3 - preenchendo as caixas com cor

Por padrão, o boxplot é desenhado só com linhas. Pra preencher as caixas com uma cor sólida, é preciso combinar `patch_artist=True` com o dicionário `boxprops`:

```py
plt.boxplot(
    [turma_a, turma_b],
    tick_labels=["Turma A", "Turma B"],
    patch_artist=True,
    boxprops=dict(facecolor="#4CAF50", color="black"),
    medianprops=dict(color="darkred", linewidth=2)
)
plt.title("Distribuição de Notas por Turma")
plt.show()
```

`boxprops` controla a aparência da própria caixa (aqui, preenchimento verde com borda preta), e `medianprops` controla especificamente a linha da mediana — nesse caso, mais grossa e em vermelho escuro, pra destacar em relação ao resto da caixa.

## Violin plot

O violin plot mostra a mesma ideia de distribuição do boxplot, mas em vez de resumir em quartis, desenha o formato completo da densidade dos dados — por isso o contorno lembra o corpo de um violino, mais largo onde há mais concentração de valores.

### Exemplo 4 - violin plot básico

```py
plt.violinplot([turma_a, turma_b], showmeans=True, showmedians=True)
plt.xticks([1, 2], ["Turma A", "Turma B"])
plt.title("Densidade das Notas por Turma")
plt.ylabel("Nota")
plt.show()
```

`showmeans=True` desenha uma linha marcando a média de cada grupo, e `showmedians=True` faz o mesmo pra mediana — dá pra ligar as duas ao mesmo tempo, cada uma com um estilo de linha diferente, pra comparar visualmente onde ficam. Diferente do `boxplot()`, o `violinplot()` não aceita `tick_labels` diretamente, por isso os rótulos do eixo x são definidos à parte com `plt.xticks()`, informando as posições (`1`, `2`, ...) e os textos correspondentes.

> **Nota:** o violin plot revela detalhes que o boxplot esconde — por exemplo, uma distribuição bimodal (dois "picos" de concentração) aparece como duas barrigas no violino, enquanto no boxplot ela ficaria só como uma caixa comum, sem indicar essa característica.

## Barras de erro

Enquanto boxplot e violin plot resumem uma distribuição inteira de valores, as barras de erro (_error bars_) servem pra representar a incerteza em torno de uma **única medida** — por exemplo, o desvio padrão de uma média, ou a margem de erro de uma pesquisa.

### Exemplo 5 - barras de erro simétricas

```py
meses = np.array([1, 2, 3, 4, 5])
temperatura_media = np.array([24.5, 25.1, 23.8, 26.0, 24.9])
desvio_padrao = np.array([1.2, 0.8, 1.5, 1.0, 0.9])

plt.errorbar(meses, temperatura_media, yerr=desvio_padrao, fmt="o", capsize=5)
plt.title("Temperatura Média Mensal")
plt.xlabel("Mês")
plt.ylabel("Temperatura (°C)")
plt.show()
```

`yerr` define o tamanho da barra de erro em torno de cada ponto no eixo y — nesse caso, o desvio padrão de cada mês. `fmt="o"` desenha um marcador circular em cada ponto central (sem `fmt`, o Matplotlib conecta os pontos com uma linha, o que nem sempre faz sentido pra esse tipo de gráfico). `capsize` adiciona um pequeno traço nas pontas de cada barra, deixando mais fácil enxergar onde ela termina.

### Exemplo 6 - erro assimétrico

Quando o erro pra cima e pra baixo não é o mesmo, `yerr` aceita uma lista com dois arrays: os erros negativos e os positivos, nessa ordem:

```py
erro_baixo = np.array([0.8, 0.5, 1.0, 0.6, 0.7])
erro_alto = np.array([1.5, 1.2, 1.8, 1.4, 1.1])

plt.errorbar(
    meses, temperatura_media,
    yerr=[erro_baixo, erro_alto],
    fmt="o", capsize=5, ecolor="gray"
)
plt.show()
```

`ecolor` controla a cor específica das barras de erro, independente da cor dos marcadores — útil pra deixar a barra mais discreta que o ponto central, ou vice-versa.

Boxplot, violin plot e barras de erro completam o repertório de gráficos voltados pra estatística descritiva. Fechando esta leva de posts sobre Matplotlib, o próximo (e último, por enquanto) trata de dois temas mais práticos: como salvar figuras em arquivo e como plotar em três dimensões.

**Fonte adaptada:** [Matplotlib - Box Plot](https://www.tutorialspoint.com/matplotlib/matplotlib_box_plot.htm), [Matplotlib - Violin Plot](https://www.tutorialspoint.com/matplotlib/matplotlib_violin_plot.htm), [Matplotlib - Errorbar](https://www.tutorialspoint.com/matplotlib/matplotlib_errorbar.htm)
