---
layout: post
title: "Matplotlib #10 - Mapas de Calor e Dados 2D com imshow, contour e pcolormesh"
date: 2026-08-11 22:40:00
image: '/assets/img/posts/matplotlib-mapas-de-calor-imshow-contour-e-pcolormesh.webp'
description: Como visualizar matrizes como mapas de calor com imshow(), desenhar curvas de nível com contour() e contourf(), e controlar a escala de cores com Normalize e LogNorm.
category: 'ciência de dados'
tags:
- Ciência de Dados
- Python
- Programação
- Matplotlib
twitter_text: Mapas de Calor e Dados 2D com imshow, contour e pcolormesh
introduction: "Nesta parte do tutorial, você vai aprender a visualizar matrizes como mapas de calor com imshow(), curvas de nível com contour() e a controlar a escala de cores."
---

Boxplot, violin plot e barras de erro resumem a distribuição de uma variável. Mas alguns dados não são uma lista de valores — são uma **grade** de valores, como uma matriz de correlação ou uma função que depende de duas variáveis. Este post mostra como visualizar esse tipo de dado bidimensional com mapas de calor e curvas de nível.

## Mapas de calor com imshow()

`plt.imshow()` desenha uma matriz numérica como uma grade de células coloridas — cada célula recebe uma cor proporcional ao seu valor, seguindo um colormap. Lembra do post de Pandas sobre correlações? É exatamente esse tipo de matriz que um mapa de calor deixa muito mais fácil de interpretar de relance.

### Exemplo 1 - visualizando uma matriz de correlação

```py
import matplotlib.pyplot as plt
import numpy as np

rotulos = ["duracao", "pulso", "calorias"]
matriz_correlacao = np.array([
    [1.00, -0.16, 0.88],
    [-0.16, 1.00, 0.04],
    [0.88, 0.04, 1.00]
])

fig, ax = plt.subplots(figsize=(5, 5))
grafico = ax.imshow(matriz_correlacao, cmap="coolwarm", vmin=-1, vmax=1)
ax.set_xticks(range(len(rotulos)))
ax.set_yticks(range(len(rotulos)))
ax.set_xticklabels(rotulos)
ax.set_yticklabels(rotulos)
fig.colorbar(grafico, ax=ax, label="Correlação")
plt.show()
```

Cada célula da matriz vira um quadrado colorido: tons próximos de uma das pontas do colormap `"coolwarm"` representam correlação forte (positiva ou negativa), e tons no meio (branco) representam correlação perto de zero. `vmin=-1` e `vmax=1` fixam os extremos da escala de cores nos limites teóricos de uma correlação, garantindo que a mesma cor sempre signifique o mesmo valor em gráficos diferentes. `fig.colorbar()` funciona aqui exatamente como nos gráficos de dispersão e 3D vistos antes na série.

### Exemplo 2 - anotando os valores em cima do mapa de calor

```py
fig, ax = plt.subplots(figsize=(5, 5))
grafico = ax.imshow(matriz_correlacao, cmap="coolwarm", vmin=-1, vmax=1)
ax.set_xticks(range(len(rotulos)))
ax.set_yticks(range(len(rotulos)))
ax.set_xticklabels(rotulos)
ax.set_yticklabels(rotulos)

for i in range(len(rotulos)):
    for j in range(len(rotulos)):
        ax.text(j, i, f"{matriz_correlacao[i, j]:.2f}", ha="center", va="center", color="black")

fig.colorbar(grafico, ax=ax, label="Correlação")
plt.show()
```

Um laço duplo percorre todas as posições `(linha, coluna)` da matriz e desenha o valor exato em cima de cada célula com `ax.text()` — combinar a cor de fundo (uma impressão geral rápida) com o número exato (pra quem precisa do valor preciso) é um padrão comum em mapas de calor de matrizes de correlação.

## Controlando a escala de cores com Normalize e LogNorm

Por padrão, o `imshow()` mapeia o menor valor da matriz pra uma ponta do colormap e o maior pra outra, de forma linear. Quando os dados têm uma distribuição muito desigual — a maioria dos valores pequenos e uns poucos bem maiores —, essa escala linear esconde variação nos valores pequenos. `matplotlib.colors.LogNorm` resolve isso aplicando uma escala logarítmica às cores, do mesmo jeito que `set_yscale("log")` resolve pra um eixo.

### Exemplo 3 - LogNorm numa matriz com valores muito desiguais

```py
from matplotlib.colors import LogNorm

dados = np.array([
    [1, 10, 100],
    [5, 50, 500],
    [2, 2000, 20000]
])

fig, ax = plt.subplots(figsize=(5, 4))
grafico = ax.imshow(dados, cmap="viridis", norm=LogNorm())
fig.colorbar(grafico, ax=ax, label="Valor (escala log)")
plt.show()
```

Sem `LogNorm`, o valor `20000` puxaria quase toda a escala de cores pra si, deixando os valores menores (`1`, `10`, `100`...) praticamente indistinguíveis, todos na mesma cor escura. Com `norm=LogNorm()`, a escala de cores segue progressão logarítmica, e diferenças entre valores pequenos voltam a ser visíveis. O equivalente pra uma escala linear explícita (o padrão, mas configurável) é `matplotlib.colors.Normalize(vmin=..., vmax=...)`.

## Curvas de nível com contour() e contourf()

Quando o dado vem de uma função de duas variáveis — `z = f(x, y)` —, em vez de uma matriz já pronta, `plt.contour()` desenha curvas de nível (linhas que conectam pontos de mesmo valor de `z`), e `plt.contourf()` faz o mesmo preenchendo as regiões entre as curvas com cor.

### Exemplo 4 - gerando a grade com meshgrid

```py
x = np.linspace(-3, 3, 100)
y = np.linspace(-3, 3, 100)
X, Y = np.meshgrid(x, y)
Z = np.sin(X) * np.cos(Y)
```

`np.meshgrid()` transforma dois arrays 1D (`x` e `y`) em duas matrizes 2D (`X` e `Y`) que representam todas as combinações possíveis de coordenadas da grade — é a partir de `X` e `Y` que uma função como `Z = sin(X) * cos(Y)` calcula um valor de `z` pra cada ponto da grade de uma vez, sem precisar de nenhum laço explícito.

### Exemplo 5 - curvas de nível

```py
fig, ax = plt.subplots(figsize=(6, 5))
contornos = ax.contour(X, Y, Z, levels=10, cmap="viridis")
ax.clabel(contornos, inline=True, fontsize=8)
ax.set_title("Curvas de Nível de sin(x) * cos(y)")
plt.show()
```

`levels=10` define quantas curvas de nível desenhar, distribuídas automaticamente entre o menor e o maior valor de `Z`. `ax.clabel()` escreve o valor de `z` diretamente sobre cada curva, o que ajuda a interpretar rapidamente se uma região representa um pico ou um vale.

### Exemplo 6 - preenchendo as regiões com contourf()

```py
fig, ax = plt.subplots(figsize=(6, 5))
preenchido = ax.contourf(X, Y, Z, levels=20, cmap="viridis")
fig.colorbar(preenchido, ax=ax, label="Valor de Z")
ax.set_title("Curvas de Nível Preenchidas")
plt.show()
```

`contourf()` (o "f" de _filled_) colore o espaço entre as curvas de nível em vez de desenhar só as linhas, produzindo um resultado visual parecido com um mapa de calor contínuo — mas construído a partir de uma função matemática e uma grade, em vez de uma matriz de dados já discreta como no `imshow()`.

> **Nota:** `plt.pcolormesh()` é uma terceira função pra visualizar dados de grade, mais próxima do `imshow()` — a diferença é que ela aceita eixos x/y com espaçamento irregular entre as células (o `imshow()` assume células igualmente espaçadas), o que a torna útil quando a grade de dados não é uniforme.

Com mapas de calor, curvas de nível e controle fino da escala de cores, o repertório de visualizações do Matplotlib cobre praticamente qualquer formato de dado — de uma lista simples de números a uma grade bidimensional inteira. Chegou a hora de fechar esta leva de posts sobre Matplotlib com um tema mais prático: como salvar as figuras em arquivo e como plotar em três dimensões.

**Fonte adaptada:** [Matplotlib - Heatmap](https://www.tutorialspoint.com/matplotlib/matplotlib_heatmap.htm), [Matplotlib - Contour Plot](https://www.tutorialspoint.com/matplotlib/matplotlib_contour_plot.htm)
