---
layout: post
title: "Matplotlib #8 - Texto Matemático, rcParams e Gráficos Polares no Matplotlib"
date: 2026-08-11 22:00:00
image: '/assets/img/posts/matplotlib-texto-matematico-rcparams-e-graficos-polares.webp'
description: Como escrever símbolos e fórmulas matemáticas com mathtext, mudar configurações globais com matplotlib.rcParams, e criar gráficos em coordenadas polares.
category: 'ciência de dados'
tags:
- Ciência de Dados
- Python
- Programação
- Matplotlib
twitter_text: Texto Matemático, rcParams e Gráficos Polares no Matplotlib
introduction: "Nesta parte do tutorial, você vai aprender a escrever texto matemático com mathtext, configurar o Matplotlib globalmente com rcParams e criar gráficos polares."
---

Os últimos posts trataram de estrutura e personalização visual: `Figure`, `Axes`, layouts de subplot, estilos e anotações. Este post fecha essa camada de personalização com três recursos que costumam aparecer juntos em gráficos técnicos e científicos: escrever notação matemática de verdade nos textos, mudar configurações do Matplotlib de forma global (não só por gráfico), e sair do sistema de coordenadas cartesiano de vez em quando.

## Texto matemático com mathtext

O Matplotlib entende uma sintaxe parecida com LaTeX, chamada _mathtext_, pra renderizar símbolos gregos, frações, expoentes e outros elementos matemáticos em qualquer texto do gráfico — título, rótulos de eixo, `plt.text()` — sem precisar de uma instalação externa de LaTeX.

### Exemplo 1 - símbolos gregos e expoentes

```py
import matplotlib.pyplot as plt
import numpy as np

x = np.linspace(0, 10, 100)
y = np.sin(x)

plt.plot(x, y)
plt.title(r"Onda: $y = \sin(\alpha x)$")
plt.xlabel(r"$x$ (radianos)")
plt.ylabel(r"$y = \sin(\alpha x)$")
plt.show()
```

Qualquer trecho entre `$...$` é interpretado como mathtext em vez de texto comum: `\alpha` vira a letra grega α, e o restante da expressão é formatado como uma fórmula matemática, com itálico automático nas variáveis. O prefixo `r` antes da string (uma _raw string_) evita que o Python tente interpretar `\a` como um caractere de escape antes mesmo do Matplotlib processar o mathtext.

### Exemplo 2 - frações e subscritos

```py
plt.text(5, 0.5, r"$\frac{1}{2}x^2 + x_0$", fontsize=16)
plt.show()
```

`\frac{numerador}{denominador}` desenha uma fração de verdade, com o numerador em cima e o denominador embaixo; `^` cria um expoente (`x^2`) e `_` cria um subscrito (`x_0`) — chaves `{}` agrupam mais de um caractere quando o expoente/subscrito tem mais de um símbolo, como em `x^{10}`.

## Configuração global com rcParams

Todo gráfico do Matplotlib segue um conjunto de configurações padrão — espessura de linha, tamanho de fonte, cor de fundo — guardadas no dicionário `matplotlib.rcParams`. Diferente de `plt.style.use()`, que troca um conjunto inteiro de configurações de uma vez, mexer direto em `rcParams` altera só o que você especificar, mantendo o resto do visual padrão.

### Exemplo 3 - mudando espessura de linha e tamanho de fonte globalmente

```py
plt.rcParams["lines.linewidth"] = 3
plt.rcParams["font.size"] = 14

plt.plot(x, y)
plt.plot(x, np.cos(x))
plt.title("Linhas Mais Grossas, Fonte Maior")
plt.show()
```

A partir dessas duas linhas, **todo** gráfico criado no restante do script usa linhas de espessura `3` e fonte tamanho `14`, sem precisar passar `linewidth=3` em cada chamada de `.plot()` individualmente. `rcParams` funciona como um dicionário comum — a chave segue o padrão `"categoria.propriedade"` (`lines.linewidth`, `font.size`, `axes.grid`, `figure.figsize`, entre muitas outras).

### Exemplo 4 - restaurando os padrões

```py
plt.rcdefaults()

plt.plot(x, y)
plt.title("De Volta ao Padrão")
plt.show()
```

`plt.rcdefaults()` desfaz qualquer alteração feita em `rcParams` durante a sessão, voltando à configuração original do Matplotlib — equivalente ao `plt.style.use("default")` visto no post sobre estilos, só que restaurando especificamente os valores de `rcParams`, não um estilo completo.

## Gráficos polares

Nem todo dado se encaixa bem num par de eixos x/y cartesianos — ângulos e direções fazem mais sentido num sistema de coordenadas polares, onde cada ponto é definido por uma distância do centro (raio) e um ângulo.

### Exemplo 5 - linha em coordenadas polares

```py
theta = np.linspace(0, 2 * np.pi, 200)
r = 1 + np.sin(4 * theta)

fig = plt.figure(figsize=(6, 6))
ax = fig.add_subplot(111, projection="polar")
ax.plot(theta, r)
ax.set_title("Curva Polar")
plt.show()
```

O parâmetro `projection="polar"` no `add_subplot()` — o mesmo mecanismo usado pra criar eixos 3D no post sobre `mplot3d` — troca o sistema de coordenadas do `Axes` inteiro. A partir daí, `ax.plot(theta, r)` interpreta o primeiro array como ângulo (em radianos) e o segundo como distância do centro, desenhando a curva característica de "pétalas" dessa combinação de seno com múltiplo do ângulo.

### Exemplo 6 - barras em coordenadas polares

```py
categorias = 8
theta = np.linspace(0, 2 * np.pi, categorias, endpoint=False)
valores = np.array([4, 6, 3, 8, 5, 7, 2, 6])

fig = plt.figure(figsize=(6, 6))
ax = fig.add_subplot(111, projection="polar")
ax.bar(theta, valores, width=0.6, color="tab:purple", alpha=0.7)
plt.show()
```

O mesmo `ax.bar()` de sempre funciona em coordenadas polares — cada barra vira uma "fatia" saindo do centro em direção à borda, com o comprimento representando o valor e a posição angular representando a categoria. É a base de gráficos do tipo radar/spider, comuns pra comparar várias variáveis de um mesmo item.

Com mathtext, `rcParams` e gráficos polares, a série encerra a camada de personalização e notação. A partir daqui, a série muda de rumo para gráficos que resumem a distribuição estatística de uma variável, como boxplot, violin plot e barras de erro.

**Fonte adaptada:** [Matplotlib - Mathematical Expressions](https://www.tutorialspoint.com/matplotlib/matplotlib_mathematical_expressions.htm), [Customizing Matplotlib with style sheets and rcParams](https://matplotlib.org/stable/users/explain/customizing.html), [Matplotlib - Polar Charts](https://www.tutorialspoint.com/matplotlib/matplotlib_polar_charts.htm)
