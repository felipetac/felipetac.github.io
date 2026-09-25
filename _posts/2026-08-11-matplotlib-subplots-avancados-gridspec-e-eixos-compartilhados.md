---
layout: post
title: "#5 - Subplots Avançados: GridSpec, subplot2grid e Eixos Compartilhados"
date: 2026-08-11 18:20:00
image: '/assets/img/posts/matplotlib-subplots-avancados-gridspec-e-eixos-compartilhados.webp'
description: Como criar layouts de subplot irregulares com GridSpec e subplot2grid, e como sincronizar eixos entre gráficos com sharex e sharey no Matplotlib.
category: 'ciência de dados'
tags:
- Ciência de Dados
- Python
- Programação
- Matplotlib
twitter_text: Subplots Avançados - GridSpec, subplot2grid e Eixos Compartilhados
introduction: "Nesta parte do tutorial, você vai aprender a criar layouts de subplot irregulares com GridSpec e subplot2grid, e a sincronizar eixos com sharex e sharey."
---

No post anterior você conheceu a interface orientada a objetos do Matplotlib, criando grades uniformes de gráficos com `plt.subplots(linhas, colunas)`. Isso resolve bem quando todos os subgráficos têm o mesmo tamanho, mas nem todo layout é uma grade perfeita — às vezes um gráfico precisa ocupar o dobro do espaço dos outros, ou vários gráficos precisam compartilhar a mesma escala pra ficarem comparáveis lado a lado. Este post mostra como ir além da grade uniforme.

## Layouts irregulares com GridSpec

`GridSpec` divide a figura numa grade lógica de linhas e colunas, mas permite que um único subplot ocupe mais de uma célula dessa grade — o que dá controle total sobre proporções e posições que `plt.subplots()` sozinho não oferece.

### Exemplo 1 - um gráfico grande e dois pequenos

```py
import matplotlib.pyplot as plt
import numpy as np

x = np.linspace(0, 10, 100)

fig = plt.figure(figsize=(8, 6))
gs = fig.add_gridspec(2, 2)

ax_principal = fig.add_subplot(gs[0, :])
ax_principal.plot(x, np.sin(x))
ax_principal.set_title("Gráfico Principal (ocupa a linha inteira)")

ax_esquerda = fig.add_subplot(gs[1, 0])
ax_esquerda.plot(x, np.cos(x), color="tab:orange")
ax_esquerda.set_title("Cosseno")

ax_direita = fig.add_subplot(gs[1, 1])
ax_direita.plot(x, -np.sin(x), color="tab:green")
ax_direita.set_title("Seno Invertido")

plt.tight_layout()
plt.show()
```

`fig.add_gridspec(2, 2)` cria uma grade lógica de 2 linhas por 2 colunas, mas essa grade não gera `Axes` sozinha — cada chamada de `fig.add_subplot(gs[...])` é que efetivamente desenha um gráfico numa fatia dessa grade. `gs[0, :]` seleciona a primeira linha inteira (todas as colunas), fazendo o gráfico principal ocupar o espaço de dois subplots normais; `gs[1, 0]` e `gs[1, 1]` pegam cada célula da segunda linha individualmente, como numa grade comum.

### Exemplo 2 - controlando a proporção entre linhas e colunas

```py
gs = fig.add_gridspec(2, 2, height_ratios=[2, 1], width_ratios=[3, 1])
```

`height_ratios` e `width_ratios` recebem uma lista com o peso relativo de cada linha/coluna — no exemplo, a primeira linha fica com o dobro da altura da segunda, e a primeira coluna com o triplo da largura da segunda. É a forma de fazer um subplot de destaque maior que os demais sem depender de mesclar células com fatiamento.

## subplot2grid() como alternativa mais direta

`plt.subplot2grid()` resolve o mesmo problema que `GridSpec`, mas com uma sintaxe mais direta pra quem não precisa guardar o objeto da grade — cada chamada já recebe o formato da grade, a posição inicial e, opcionalmente, quantas linhas/colunas ocupar.

### Exemplo 3 - o mesmo layout com subplot2grid

```py
fig = plt.figure(figsize=(8, 6))

ax_principal = plt.subplot2grid((2, 2), (0, 0), colspan=2)
ax_principal.plot(x, np.sin(x))
ax_principal.set_title("Gráfico Principal")

ax_esquerda = plt.subplot2grid((2, 2), (1, 0))
ax_esquerda.plot(x, np.cos(x), color="tab:orange")

ax_direita = plt.subplot2grid((2, 2), (1, 1))
ax_direita.plot(x, -np.sin(x), color="tab:green")

plt.tight_layout()
plt.show()
```

O primeiro argumento `(2, 2)` é o formato da grade (2 linhas, 2 colunas); o segundo, `(0, 0)`, é a posição onde o subplot começa (linha 0, coluna 0); e `colspan=2` faz esse subplot ocupar duas colunas — o equivalente ao `gs[0, :]` do exemplo com `GridSpec`. Existe também `rowspan`, pra ocupar várias linhas.

> **Nota:** pra layouts simples, `subplot2grid()` costuma ser mais rápido de escrever; pra grades maiores ou com proporções customizadas (`height_ratios`/`width_ratios`), `GridSpec` tende a ficar mais legível porque separa claramente a definição da grade da criação de cada `Axes`.

## Eixos compartilhados com sharex e sharey

Quando vários subplots representam a mesma grandeza (por exemplo, o mesmo intervalo de tempo em gráficos diferentes), sincronizar os eixos evita que cada um escolha sua própria escala — o que facilitaria comparações erradas à primeira vista.

### Exemplo 4 - compartilhando o eixo x

```py
fig, (ax1, ax2) = plt.subplots(2, 1, sharex=True, figsize=(7, 5))

dias = np.arange(0, 30)
temperatura = 20 + 5 * np.sin(dias / 3)
chuva = np.random.default_rng(42).integers(0, 20, size=30)

ax1.plot(dias, temperatura, color="tab:red")
ax1.set_ylabel("Temperatura (°C)")

ax2.bar(dias, chuva, color="tab:blue")
ax2.set_ylabel("Chuva (mm)")
ax2.set_xlabel("Dia do mês")

plt.tight_layout()
plt.show()
```

`sharex=True` faz os dois subplots usarem exatamente o mesmo eixo x — zerar o zoom ou mudar o intervalo num deles afeta automaticamente o outro, e o Matplotlib evita repetir os rótulos do eixo x no gráfico de cima, já que ele é idêntico ao de baixo. O equivalente pra sincronizar o eixo y é `sharey=True`, útil quando dois subplots lado a lado precisam da mesma escala vertical pra serem comparáveis com justiça.

> **Nota:** `plt.subplot_mosaic()` é outra forma de montar layouts irregulares, definindo a grade a partir de uma lista de strings (ex. `[["principal", "principal"], ["esquerda", "direita"]]`), onde cada string vira o nome de um `Axes` acessível depois num dicionário — uma alternativa mais legível ao `GridSpec` quando o layout tem muitas células nomeadas.

Com `GridSpec`, `subplot2grid()` e eixos compartilhados, dá pra montar praticamente qualquer composição de gráficos numa única figura. O próximo post volta a um único gráfico por vez, com legendas, eixos duplos e escalas.

**Fonte adaptada:** [Matplotlib - Multiplots](https://www.tutorialspoint.com/matplotlib/matplotlib_multiplots.htm), [Matplotlib - Subplot2grid() Function](https://www.tutorialspoint.com/matplotlib/matplotlib_subplot2grid_function.htm)
