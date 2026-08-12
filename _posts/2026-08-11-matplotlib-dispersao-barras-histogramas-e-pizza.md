---
layout: post
title: "#2 - Dispersão, Barras, Histogramas e Pizza no Matplotlib"
date: 2026-08-11 17:20:00
image: '/assets/img/posts/matplotlib-dispersao-barras-histogramas-e-pizza.webp'
description: Como criar gráficos de dispersão, barras, histogramas e pizza com o Matplotlib, incluindo cores, tamanhos e a opção de destacar uma fatia do gráfico de pizza.
category: 'ciência de dados'
tags:
- Ciência de Dados
- Python
- Programação
- Matplotlib
twitter_text: Dispersão, Barras, Histogramas e Pizza no Matplotlib
introduction: "Nesta parte do tutorial, você vai aprender a criar gráficos de dispersão, barras, histogramas e pizza com o Matplotlib."
---

No post anterior você viu o básico do Matplotlib com gráficos de linha, marcadores, rótulos e grade. Cada tipo de dado, porém, costuma se encaixar melhor num tipo diferente de gráfico: comparar categorias pede barras, entender a relação entre duas variáveis pede dispersão, ver a distribuição de uma variável pede histograma, e mostrar proporções de um todo pede pizza.

Neste post você vai conhecer os quatro tipos com exemplos práticos.

## Gráfico de dispersão

O gráfico de dispersão (_scatter plot_) desenha um ponto pra cada par de valores (x, y), sem ligar nenhum deles com linha — é a ferramenta certa quando você quer investigar visualmente se duas variáveis parecem se relacionar.

### Exemplo 1 - dispersão básica

```py
import matplotlib.pyplot as plt
import numpy as np

duracao = np.array([30, 45, 60, 45, 50, 60, 45])
calorias = np.array([280, 340, 380, 300, 320, 400, 300])

plt.scatter(duracao, calorias)
plt.show()
```

O gráfico mostra sete pontos soltos, um pra cada treino, posicionados conforme a duração (eixo x) e as calorias queimadas (eixo y). Como os dois valores tendem a crescer juntos, os pontos formam uma tendência visível de subida da esquerda pra direita.

### Exemplo 2 - toda a nuvem de pontos numa única cor

```py
plt.scatter(duracao, calorias, color='hotpink')
plt.show()
```

Isso pinta todos os pontos da mesma cor — nesse caso, um rosa forte, em vez do azul padrão do Matplotlib.

### Exemplo 3 - uma cor diferente por ponto

Pra colorir cada ponto individualmente, use o parâmetro `c` (não `color`) com um array de cores do mesmo tamanho dos dados:

```py
import matplotlib.pyplot as plt
import numpy as np

duracao = np.array([30, 45, 60, 45, 50, 60, 45])
calorias = np.array([280, 340, 380, 300, 320, 400, 300])
cores = np.array(["red", "green", "blue", "orange", "purple", "green", "red"])

plt.scatter(duracao, calorias, c=cores)
plt.show()
```

Cada um dos sete pontos aparece com a cor correspondente à sua posição no array `cores`.

### Exemplo 4 - cor a partir de uma escala numérica (colormap)

Também dá pra mapear um valor numérico pra uma escala de cores contínua, usando `cmap`:

```py
pulso = np.array([110, 117, 103, 109, 117, 102, 104])

plt.scatter(duracao, calorias, c=pulso, cmap='viridis')
plt.colorbar()
plt.show()
```

Aqui, a cor de cada ponto varia conforme o pulso registrado naquele treino, seguindo a paleta `viridis` (de tons escuros pra amarelo-claro). O `plt.colorbar()` adiciona uma barra lateral mostrando a escala de cores usada, o que ajuda a interpretar rapidamente qual faixa de valor cada cor representa.

> **Nota:** o parâmetro `s` controla o tamanho dos pontos, também aceitando um array — útil pra representar uma terceira variável através do tamanho de cada bolha.

## Gráfico de barras

O gráfico de barras compara valores entre categorias diferentes, com uma barra por categoria.

### Exemplo 5 - barras verticais

```py
import matplotlib.pyplot as plt
import numpy as np

produtos = np.array(["Notebook", "Mouse", "Teclado", "Monitor"])
unidades = np.array([12, 45, 30, 8])

plt.bar(produtos, unidades)
plt.show()
```

O gráfico mostra quatro barras verticais, uma pra cada produto, com a altura proporcional ao número de unidades vendidas.

### Exemplo 6 - cor e largura das barras

```py
plt.bar(produtos, unidades, color="#4CAF50", width=0.5)
plt.show()
```

`color` aceita nome de cor, sigla de uma letra ou valor hexadecimal (como no exemplo, um verde). `width` controla a largura de cada barra — o padrão é `0.8`; valores menores deixam barras mais finas, com mais espaço entre elas.

### Exemplo 7 - barras horizontais

Quando os rótulos das categorias são longos, barras horizontais costumam ficar mais legíveis. Basta trocar `bar` por `barh`:

```py
plt.barh(produtos, unidades, color="hotpink")
plt.show()
```

O gráfico agora mostra as mesmas quatro barras, só que deitadas — os produtos ficam listados no eixo vertical e o comprimento de cada barra representa as unidades vendidas. Nesse caso, o parâmetro equivalente ao `width` é o `height`.

## Histograma

Um histograma mostra a distribuição de frequência de uma variável numérica: os valores são agrupados em faixas (_bins_), e a altura de cada barra representa quantas observações caíram naquela faixa.

### Exemplo 8 - histograma de uma distribuição normal

Uma forma prática de gerar dados de exemplo pra testar histogramas é usar `numpy.random.normal()`, que cria valores seguindo uma distribuição normal (a clássica "curva de sino") em torno de uma média:

```py
import matplotlib.pyplot as plt
import numpy as np

alturas = np.random.normal(170, 10, 250)

plt.hist(alturas)
plt.show()
```

Esse código gera 250 valores aleatórios centrados em 170 (por exemplo, alturas em centímetros de um grupo de pessoas), com desvio padrão de 10. O gráfico resultante mostra barras mais altas perto de 170 e barras cada vez mais curtas conforme os valores se afastam da média pra cima ou pra baixo — o formato característico de sino da distribuição normal.

### Exemplo 9 - rótulos e título no histograma

```py
plt.hist(alturas)
plt.title("Distribuição de Alturas")
plt.xlabel("Altura (cm)")
plt.ylabel("Número de Pessoas")
plt.show()
```

O mesmo histograma de antes, agora com título e rótulos nos eixos deixando claro o que cada barra representa — os mesmos `plt.title()`, `plt.xlabel()` e `plt.ylabel()` que você já viu no post anterior funcionam igual pra qualquer tipo de gráfico do Matplotlib.

## Gráfico de pizza

O gráfico de pizza mostra a proporção que cada categoria representa dentro de um total, dividindo um círculo em fatias.

### Exemplo 10 - pizza básica

```py
import matplotlib.pyplot as plt
import numpy as np

vendas = np.array([35, 25, 25, 15])
categorias = ["Notebooks", "Mouses", "Teclados", "Monitores"]

plt.pie(vendas, labels=categorias)
plt.show()
```

Cada valor de `vendas` vira uma fatia, com tamanho proporcional ao total (o Matplotlib calcula automaticamente `valor / soma_de_todos_os_valores` pra cada uma). Por padrão, a primeira fatia começa no eixo x e as demais seguem no sentido anti-horário, com o rótulo de `labels` identificando cada uma.

### Exemplo 11 - girando o ponto de partida

```py
plt.pie(vendas, labels=categorias, startangle=90)
plt.show()
```

`startangle` gira o ponto de início da primeira fatia, em graus — nesse caso, a fatia de "Notebooks" começa no topo do círculo (90°) em vez de começar à direita (0°, o padrão).

### Exemplo 12 - destacando uma fatia com explode

Pra chamar atenção pra uma fatia específica, dá pra "puxá-la" um pouco pra fora do círculo com o parâmetro `explode` — um array com um valor por fatia, indicando o quanto cada uma se afasta do centro (`0` significa "não afastar"):

```py
destaque = [0.2, 0, 0, 0]

plt.pie(vendas, labels=categorias, explode=destaque)
plt.show()
```

O gráfico mostra a fatia de "Notebooks" ligeiramente separada das demais, enquanto os outros três produtos continuam colados uns aos outros formando o resto do círculo.

### Exemplo 13 - sombra, cores e legenda

```py
cores_pizza = ["#4CAF50", "hotpink", "b", "orange"]

plt.pie(
    vendas,
    labels=categorias,
    explode=destaque,
    shadow=True,
    colors=cores_pizza
)
plt.legend(title="Categorias:")
plt.show()
```

`shadow=True` adiciona uma sombra por baixo do gráfico, dando uma sensação de profundidade. `colors` define a cor de cada fatia manualmente, na mesma ordem dos valores. E `plt.legend()` desenha uma legenda ao lado do gráfico, com um título opcional, associando cada cor ao nome da categoria correspondente — bem útil quando os rótulos já não cabem direto ao lado das fatias.

Com dispersão, barras, histograma e pizza no repertório, você já tem os tipos de gráfico mais usados no dia a dia de qualquer análise exploratória de dados.

**Fonte adaptada:** [Matplotlib Scatter](https://www.w3schools.com/python/matplotlib_scatter.asp), [Matplotlib Bars](https://www.w3schools.com/python/matplotlib_bars.asp), [Matplotlib Histograms](https://www.w3schools.com/python/matplotlib_histograms.asp), [Matplotlib Pie Charts](https://www.w3schools.com/python/matplotlib_pie_charts.asp)
