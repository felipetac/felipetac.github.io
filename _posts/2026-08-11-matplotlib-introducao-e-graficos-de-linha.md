---
layout: post
title: "#1 - Introdução ao Matplotlib e Gráficos de Linha"
date: 2026-08-11 15:20:00
image: '/assets/img/posts/matplotlib-introducao-e-graficos-de-linha.png'
description: Introdução ao Matplotlib e ao módulo pyplot, cobrindo gráficos de linha, marcadores, personalização visual, rótulos, grade e múltiplos gráficos na mesma figura.
category: 'ciência de dados'
tags:
- Ciência de Dados
- Python
- Programação
- Matplotlib
twitter_text: Introdução ao Matplotlib e Gráficos de Linha
introduction: "Nesta parte do tutorial, você vai conhecer o Matplotlib, o módulo pyplot e como desenhar e personalizar gráficos de linha."
---

No post anterior da série sobre Pandas eu mencionei que o método `.plot()` usa o Matplotlib por baixo dos panos pra desenhar os gráficos. Chegou a hora de conhecer essa biblioteca de verdade, direto na fonte — porque quando você precisa de controle fino sobre cores, marcadores, título, grade ou múltiplos gráficos numa mesma figura, é pro Matplotlib que você recorre.

Nesta primeira parte da série sobre Matplotlib você vai aprender a instalar a biblioteca, entender o módulo `pyplot`, plotar seus primeiros pontos e linhas, e personalizar cada detalhe visual do gráfico.

## O que é o Matplotlib

O Matplotlib é uma biblioteca de visualização e plotagem de gráficos pra Python, criada por John D. Hunter. É open source, roda em praticamente qualquer ambiente Python e serve de base pra várias outras bibliotecas de visualização — inclusive pro `.plot()` do Pandas que vimos na série anterior.

## Instalando o Matplotlib

```bash
pip install matplotlib
```

### Verificando a versão instalada

```py
import matplotlib

print(matplotlib.__version__)
```

A saída é algo como:

```py
3.9.0
```

## O módulo pyplot

A biblioteca inteira do Matplotlib é enorme, mas no dia a dia você vai usar principalmente o submódulo `pyplot`, que reúne as funções mais comuns de plotagem. Por convenção, ele é importado com o apelido `plt`:

```py
import matplotlib.pyplot as plt
```

### Exemplo 1 - seu primeiro gráfico

```py
import matplotlib.pyplot as plt
import numpy as np

eixo_x = np.array([0, 6])
eixo_y = np.array([0, 250])

plt.plot(eixo_x, eixo_y)
plt.show()
```

Isso desenha uma linha reta ligando o ponto `(0, 0)` ao ponto `(6, 250)`. O `plt.plot()` recebe os pontos, e o `plt.show()` é quem efetivamente abre a janela (ou renderiza a imagem) com o gráfico — sem ele, nada aparece na tela.

## Plotando pontos e linhas

### Exemplo 2 - ligando vários pontos

`plt.plot()` recebe um array com os valores do eixo x e outro com os valores do eixo y, e por padrão desenha uma linha ligando todos os pontos, na ordem em que aparecem:

```py
import matplotlib.pyplot as plt
import numpy as np

eixo_x = np.array([1, 3, 5, 7])
eixo_y = np.array([2, 8, 4, 10])

plt.plot(eixo_x, eixo_y)
plt.show()
```

O gráfico resultante mostra uma linha em zigue-zague passando exatamente pelos quatro pontos `(1,2)`, `(3,8)`, `(5,4)` e `(7,10)`, nessa ordem.

### Exemplo 3 - plotando só o eixo y

Se você passar um único array pro `plt.plot()`, o Matplotlib assume que ele é o eixo y, e preenche o eixo x automaticamente com `0, 1, 2, 3...`:

```py
import matplotlib.pyplot as plt
import numpy as np

vendas = np.array([15, 34, 22, 48, 30])

plt.plot(vendas)
plt.show()
```

O gráfico mostra a mesma linha de antes, só que agora o eixo x representa a posição de cada valor dentro do array (0, 1, 2, 3, 4) em vez de valores próprios.

### Exemplo 4 - só os pontos, sem linha

Pra desenhar somente os pontos, sem ligá-los, use o formato curto `'o'` como terceiro argumento:

```py
plt.plot(eixo_x, eixo_y, 'o')
plt.show()
```

O gráfico mostra quatro círculos soltos, um em cada coordenada, sem nenhuma linha conectando eles.

## Marcadores

Marcadores são símbolos desenhados em cada ponto do gráfico, o que ajuda a destacar exatamente onde estão os valores reais (em vez de deixar só a linha, que é uma interpolação visual entre eles).

### Exemplo 5 - usando o parâmetro marker

```py
import matplotlib.pyplot as plt
import numpy as np

vendas = np.array([15, 34, 22, 48, 30])

plt.plot(vendas, marker='o')
plt.show()
```

Isso gera um gráfico de linha com marcadores circulares em cada ponto. Alguns marcadores comuns:

- `'o'` — círculo
- `'*'` — estrela
- `'.'` — ponto
- `'x'` — xis
- `'s'` — quadrado
- `'D'` — losango
- `'^'` — triângulo pra cima
- `'+'` — sinal de mais

### Exemplo 6 - fmt: marcador, linha e cor num só argumento

Existe um atalho que combina marcador, estilo de linha e cor num único texto, no formato `marcador|linha|cor`:

```py
plt.plot(vendas, 'o:r')
plt.show()
```

Isso desenha marcadores circulares (`o`), conectados por uma linha pontilhada (`:`), tudo em vermelho (`r`).

### Exemplo 7 - controlando o tamanho do marcador

```py
plt.plot(vendas, marker='o', ms=20)
plt.show()
```

O parâmetro `ms` (abreviação de `markersize`) aumenta o tamanho dos marcadores — nesse caso, círculos bem grandes em cada ponto. Também dá pra colorir separadamente a borda (`mec`, de `markeredgecolor`) e o preenchimento (`mfc`, de `markerfacecolor`) de cada marcador.

## Personalizando a linha

### Exemplo 8 - estilo, cor e espessura

```py
import matplotlib.pyplot as plt
import numpy as np

vendas = np.array([15, 34, 22, 48, 30])

plt.plot(vendas, linestyle='dotted', color='r', linewidth=3)
plt.show()
```

O gráfico mostra a mesma linha de sempre, agora pontilhada (`linestyle='dotted'`), vermelha (`color='r'`) e mais espessa (`linewidth=3`). Os apelidos curtos `ls`, `c` e `lw` funcionam do mesmo jeito, se você preferir digitar menos. Outros estilos de linha incluem `'dashed'` (tracejada) e `'dashdot'` (traço-ponto).

### Exemplo 9 - múltiplas linhas no mesmo gráfico

Basta chamar `plt.plot()` mais de uma vez antes do `plt.show()`:

```py
import matplotlib.pyplot as plt
import numpy as np

vendas_loja_a = np.array([15, 34, 22, 48, 30])
vendas_loja_b = np.array([25, 20, 35, 30, 40])

plt.plot(vendas_loja_a)
plt.plot(vendas_loja_b)
plt.show()
```

O resultado é um gráfico com duas linhas de cores diferentes (escolhidas automaticamente pelo Matplotlib), cada uma representando as vendas de uma das lojas.

## Rótulos e título

Um gráfico sem rótulo nos eixos e sem título é difícil de interpretar fora do contexto em que foi criado — vale sempre nomear o que cada eixo representa.

### Exemplo 10 - xlabel, ylabel e title

```py
import matplotlib.pyplot as plt
import numpy as np

eixo_x = np.array([1, 2, 3, 4, 5])
eixo_y = np.array([15, 34, 22, 48, 30])

plt.plot(eixo_x, eixo_y)
plt.title("Vendas da Semana")
plt.xlabel("Dia")
plt.ylabel("Unidades Vendidas")
plt.show()
```

O gráfico mostra a linha de sempre, agora com o título "Vendas da Semana" centralizado no topo, "Dia" escrito abaixo do eixo x e "Unidades Vendidas" ao lado do eixo y.

### Exemplo 11 - personalizando a fonte

```py
fonte_titulo = {'family': 'serif', 'color': 'darkblue', 'size': 18}

plt.title("Vendas da Semana", fontdict=fonte_titulo)
plt.show()
```

O dicionário passado em `fontdict` controla a família da fonte, a cor do texto e o tamanho — nesse caso, um título maior, azul-escuro e com fonte serifada.

### Exemplo 12 - posição do título

```py
plt.title("Vendas da Semana", loc='left')
plt.show()
```

O parâmetro `loc` aceita `'left'`, `'right'` ou `'center'` (o padrão), controlando o alinhamento horizontal do título.

## Grade

### Exemplo 13 - adicionando linhas de grade

```py
import matplotlib.pyplot as plt
import numpy as np

eixo_x = np.array([1, 2, 3, 4, 5])
eixo_y = np.array([15, 34, 22, 48, 30])

plt.plot(eixo_x, eixo_y)
plt.grid()
plt.show()
```

Isso desenha linhas de grade claras cruzando o gráfico tanto na horizontal quanto na vertical, facilitando enxergar o valor aproximado de cada ponto sem precisar apontar exatamente pra ele.

### Exemplo 14 - grade só num eixo, com estilo próprio

```py
plt.grid(axis='y', color='green', linestyle='--', linewidth=0.5)
plt.show()
```

O parâmetro `axis` restringe a grade a `'x'`, `'y'` ou `'both'` (padrão). Nesse exemplo, só as linhas horizontais aparecem, em verde, tracejadas e finas.

## Múltiplos gráficos numa mesma figura

### Exemplo 15 - usando subplot()

Quando você quer comparar dois (ou mais) gráficos lado a lado, `plt.subplot()` organiza tudo numa grade dentro de uma única figura. Os três parâmetros são: número de linhas, número de colunas e a posição do gráfico atual (começando em 1):

```py
import matplotlib.pyplot as plt
import numpy as np

x = np.array([1, 2, 3, 4])
vendas = np.array([15, 34, 22, 48])

plt.subplot(1, 2, 1)
plt.plot(x, vendas)
plt.title("Vendas")

receita = np.array([150, 340, 220, 480])

plt.subplot(1, 2, 2)
plt.plot(x, receita)
plt.title("Receita")

plt.suptitle("Loja de Eletrônicos")
plt.show()
```

Isso gera uma figura com uma grade de 1 linha por 2 colunas: à esquerda, o gráfico de "Vendas"; à direita, o gráfico de "Receita" — cada um com seu próprio título, e "Loja de Eletrônicos" como título geral no topo da figura inteira, criado por `plt.suptitle()`.

Com o básico de linhas, marcadores, rótulos e grade dominado, o próximo post da série parte pra outros tipos de gráfico: dispersão, barras, histogramas e pizza.

**Fonte adaptada:** [Matplotlib Tutorial](https://www.w3schools.com/python/matplotlib_intro.asp), [Matplotlib Getting Started](https://www.w3schools.com/python/matplotlib_getting_started.asp), [Matplotlib Pyplot](https://www.w3schools.com/python/matplotlib_pyplot.asp), [Matplotlib Plotting](https://www.w3schools.com/python/matplotlib_plotting.asp), [Matplotlib Markers](https://www.w3schools.com/python/matplotlib_markers.asp), [Matplotlib Line](https://www.w3schools.com/python/matplotlib_line.asp), [Matplotlib Labels and Title](https://www.w3schools.com/python/matplotlib_labels.asp), [Matplotlib Adding Grid Lines](https://www.w3schools.com/python/matplotlib_grid.asp), [Matplotlib Subplot](https://www.w3schools.com/python/matplotlib_subplot.asp)
