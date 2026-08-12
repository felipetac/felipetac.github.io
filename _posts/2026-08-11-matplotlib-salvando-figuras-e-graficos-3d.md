---
layout: post
title: "#7 - Salvando Figuras e Gráficos 3D no Matplotlib"
date: 2026-08-11 19:00:00
image: '/assets/img/posts/matplotlib-salvando-figuras-e-graficos-3d.png'
description: Como exportar gráficos para arquivo com savefig() controlando resolução e formato, e como plotar em três dimensões com o módulo mplot3d.
category: 'ciência de dados'
tags:
- Ciência de Dados
- Python
- Programação
- Matplotlib
twitter_text: Salvando Figuras e Gráficos 3D no Matplotlib
introduction: "Nesta parte do tutorial, você vai aprender a salvar gráficos em arquivo com savefig() e a plotar em três dimensões com mplot3d."
---

Fechando esta leva de posts sobre Matplotlib, faltam dois assuntos bem práticos: como tirar um gráfico da tela e colocá-lo num arquivo — pra usar num relatório, numa apresentação ou num post de blog, por exemplo — e como dar um passo além das duas dimensões, plotando em três eixos.

## Salvando figuras com savefig()

Até agora, todo gráfico desta série terminou com `plt.show()`, que abre uma janela (ou renderiza inline, num notebook) só pra visualização. Pra gerar um arquivo de verdade, a função é `plt.savefig()`.

### Exemplo 1 - salvando um PNG

```py
import matplotlib.pyplot as plt
import numpy as np

x = np.linspace(0, 10, 100)
y = np.sin(x)

plt.plot(x, y)
plt.title("Onda Senoidal")
plt.savefig("onda-senoidal.png")
plt.show()
```

O formato do arquivo é definido automaticamente pela extensão do nome — `.png`, `.pdf`, `.svg` e `.jpg` são os mais comuns, e todos funcionam sem precisar instalar nada além do próprio Matplotlib.

> **Nota:** `plt.savefig()` precisa ser chamado **antes** de `plt.show()`. Dependendo do ambiente, `plt.show()` pode limpar a figura da memória depois de exibi-la — chamando `savefig()` depois disso, você corre o risco de salvar um arquivo em branco.

### Exemplo 2 - controlando resolução e corte

```py
plt.plot(x, y)
plt.title("Onda Senoidal")
plt.savefig("onda-senoidal-hd.png", dpi=300, bbox_inches="tight")
plt.show()
```

`dpi` (_dots per inch_) controla a resolução do arquivo exportado — quanto maior, mais nítida a imagem (e maior o arquivo). O padrão do Matplotlib gira em torno de 100 DPI, adequado pra tela; 300 DPI é um valor comum quando o destino é impressão ou uma imagem de alta qualidade pra um artigo. `bbox_inches="tight"` recorta margens em branco desnecessárias ao redor do gráfico, ajustando a área salva ao conteúdo real da figura.

### Exemplo 3 - salvando em mais de um formato

Como o formato vem da extensão, gerar o mesmo gráfico em formatos diferentes é só chamar `savefig()` mais de uma vez, antes do `show()`:

```py
plt.plot(x, y)
plt.savefig("grafico.png", dpi=300)
plt.savefig("grafico.svg")
plt.savefig("grafico.pdf")
plt.show()
```

PNG é raster (uma grade de pixels — bom pra web); SVG e PDF são vetoriais, o que significa que a imagem pode ser ampliada infinitamente sem perder nitidez — a escolha certa quando o gráfico vai pra um documento que talvez precise ser redimensionado.

## Gráficos 3D com mplot3d

O Matplotlib também plota em três dimensões, através do módulo `mpl_toolkits.mplot3d`, que já vem incluído na instalação padrão — não é preciso instalar nada além do Matplotlib.

### Exemplo 4 - criando um eixo 3D

```py
from mpl_toolkits.mplot3d import Axes3D
import matplotlib.pyplot as plt

fig = plt.figure(figsize=(7, 6))
ax = fig.add_subplot(111, projection="3d")
```

A diferença central em relação a um `Axes` comum é o parâmetro `projection="3d"` passado pro `add_subplot()`. A partir daí, o objeto `ax` ganha um terceiro eixo (`z`), além dos já conhecidos `x` e `y`.

### Exemplo 5 - linha 3D

```py
import numpy as np

theta = np.linspace(-4 * np.pi, 4 * np.pi, 100)
z = np.linspace(-2, 2, 100)
r = z ** 2 + 1
x = r * np.sin(theta)
y = r * np.cos(theta)

fig = plt.figure(figsize=(7, 6))
ax = fig.add_subplot(111, projection="3d")
ax.plot(x, y, z)
ax.set_xlabel("X")
ax.set_ylabel("Y")
ax.set_zlabel("Z")
plt.show()
```

`ax.plot()` funciona como no gráfico 2D, só que agora recebendo três arrays em vez de dois — o resultado é uma espiral cônica se afastando e se aproximando do centro conforme `z` varia, um clássico pra testar visualização 3D. `set_zlabel()` é o equivalente em três dimensões do `set_xlabel()`/`set_ylabel()` que você já conhece.

### Exemplo 6 - dispersão 3D com cor mapeada

```py
np.random.seed(42)
n_pontos = 150
x = np.random.rand(n_pontos)
y = np.random.rand(n_pontos)
z = np.random.rand(n_pontos)

fig = plt.figure(figsize=(7, 6))
ax = fig.add_subplot(111, projection="3d")
grafico = ax.scatter(x, y, z, c=z, cmap="viridis")
fig.colorbar(grafico, ax=ax, shrink=0.6, label="Valor de Z")
ax.set_xlabel("X")
ax.set_ylabel("Y")
ax.set_zlabel("Z")
plt.show()
```

O `ax.scatter()` 3D aceita os mesmos parâmetros de cor e colormap do `plt.scatter()` bidimensional visto lá no post sobre dispersão — aqui, `c=z` colore cada ponto conforme sua própria posição no eixo z, e `fig.colorbar()` adiciona a barra de escala lateral explicando o que cada cor representa.

> **Nota:** gráficos 3D do Matplotlib são ótimos pra explorar dados interativamente num notebook Jupyter (onde dá pra girar o gráfico com o mouse), mas exportados como imagem estática eles mostram só um ângulo fixo — vale escolher o ângulo de visualização com `ax.view_init(elev=..., azim=...)` antes de salvar, pra garantir que o ponto mais importante do gráfico fique visível.

Com `savefig()` e o módulo `mplot3d`, encerramos esta segunda leva sobre Matplotlib: interface orientada a objetos, legendas e escalas, estilos e anotações, gráficos estatísticos e, agora, exportação e três dimensões. Entre Pandas e Matplotlib, a série já cobre o ciclo quase completo de uma análise de dados em Python — do carregamento bruto até um gráfico pronto pra apresentar.

**Fonte adaptada:** [Matplotlib - Saving Figures](https://www.tutorialspoint.com/matplotlib/matplotlib_saving_figures.htm), [Matplotlib - 3D Plotting](https://www.tutorialspoint.com/matplotlib/matplotlib_3d_plotting.htm)
