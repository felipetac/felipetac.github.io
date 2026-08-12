---
layout: post
title: "#4 - Legendas, Eixos Duplos e Escalas no Matplotlib"
date: 2026-08-11 18:00:00
image: '/assets/img/posts/matplotlib-legendas-eixos-e-escalas.png'
description: Como adicionar e posicionar legendas com legend(), criar eixos duplos com twinx(), usar escala logarítmica e personalizar ticks no Matplotlib.
category: 'ciência de dados'
tags:
- Ciência de Dados
- Python
- Programação
- Matplotlib
twitter_text: Legendas, Eixos Duplos e Escalas no Matplotlib
introduction: "Nesta parte do tutorial, você vai aprender a criar legendas, eixos duplos com twinx() e escalas logarítmicas no Matplotlib."
---

No post anterior você conheceu a interface orientada a objetos do Matplotlib, com `Figure` e `Axes` controlados explicitamente. Neste post, o foco é em três recursos que ajudam a deixar um gráfico mais legível quando ele passa a ter mais de uma linha ou mais de uma grandeza: legendas, eixos duplos e escalas.

## Legendas com legend()

Quando um gráfico tem mais de uma linha, uma legenda é o jeito mais direto de deixar claro o que cada uma representa.

### Exemplo 1 - legenda básica

```py
import matplotlib.pyplot as plt
import numpy as np

x = np.arange(0, 10, 1)
vendas_loja_a = np.array([15, 22, 18, 30, 25, 28, 35, 32, 40, 38])
vendas_loja_b = np.array([10, 18, 25, 20, 22, 30, 28, 34, 30, 36])

fig, ax = plt.subplots(figsize=(7, 4))
ax.plot(x, vendas_loja_a, label="Loja A")
ax.plot(x, vendas_loja_b, label="Loja B")
ax.legend()
plt.show()
```

O parâmetro `label` é passado em cada chamada de `.plot()`, e `ax.legend()` (ou `plt.legend()`, na interface implícita) reúne todos os `label` definidos numa caixa de legenda, com uma amostra da cor/estilo de cada linha ao lado do respectivo texto.

### Exemplo 2 - posição e título da legenda

```py
ax.legend(loc="upper left", title="Loja:")
plt.show()
```

O parâmetro `loc` posiciona a legenda dentro da área do gráfico — aceita valores como `"upper right"`, `"upper left"`, `"lower right"`, `"lower left"` e `"center"`, ou `"best"` (o padrão), que deixa o Matplotlib escolher automaticamente o canto com menos sobreposição de dados. `title` adiciona um cabeçalho à caixa de legenda.

### Exemplo 3 - legenda fora da área do gráfico

Quando o gráfico já está cheio, colocar a legenda em cima dos dados atrapalha a leitura. `bbox_to_anchor` posiciona a legenda em coordenadas relativas ao `Axes`, permitindo jogá-la pra fora da área de plotagem:

```py
ax.legend(loc="upper left", bbox_to_anchor=(1, 1))
plt.tight_layout()
plt.show()
```

Aqui, `(1, 1)` corresponde ao canto superior direito do `Axes` (as coordenadas vão de `0` a `1` em cada eixo) — combinado com `loc="upper left"`, a legenda é ancorada logo à direita do gráfico, em vez de dentro dele. `plt.tight_layout()` evita que ela fique cortada na borda da figura.

## Eixos duplos com twinx()

Às vezes duas grandezas fazem sentido no mesmo gráfico, mas têm escalas completamente diferentes — por exemplo, número de vendas (dezenas) e receita em reais (milhares). Plotar as duas juntas no mesmo eixo y esmagaria uma delas visualmente. A solução é um eixo y secundário, criado com `.twinx()`.

### Exemplo 4 - vendas e receita, cada uma com sua escala

```py
unidades = np.array([15, 22, 18, 30, 25, 28, 35, 32, 40, 38])
receita = unidades * 320.0

fig, ax1 = plt.subplots(figsize=(7, 4))

ax1.plot(x, unidades, color="tab:blue", marker="o")
ax1.set_xlabel("Dia")
ax1.set_ylabel("Unidades vendidas", color="tab:blue")

ax2 = ax1.twinx()
ax2.plot(x, receita, color="tab:red", marker="s")
ax2.set_ylabel("Receita (R$)", color="tab:red")

fig.suptitle("Unidades x Receita")
plt.show()
```

`ax1.twinx()` cria um novo `Axes` (`ax2`) que compartilha o mesmo eixo x de `ax1`, mas tem seu próprio eixo y independente, desenhado do lado direito da figura. Colorir cada `set_ylabel()` com a mesma cor da linha correspondente ajuda a associar visualmente qual eixo pertence a qual linha, já que não há uma legenda tradicional unindo as duas escalas. O equivalente pra eixos x independentes compartilhando o y é o `.twiny()`.

## Escala logarítmica

Alguns dados crescem tão rápido (ou variam em ordens de grandeza tão diferentes) que uma escala linear comum esconde o padrão — é o caso clássico de crescimento exponencial. Trocar pra escala logarítmica resolve isso.

### Exemplo 5 - crescimento exponencial em escala linear vs. logarítmica

```py
dias = np.arange(0, 15)
casos = 10 * (1.5 ** dias)

fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(10, 4))

ax1.plot(dias, casos)
ax1.set_title("Escala linear")

ax2.plot(dias, casos)
ax2.set_yscale("log")
ax2.set_title("Escala logarítmica")

plt.tight_layout()
plt.show()
```

No gráfico da esquerda, com escala linear, os primeiros dias parecem quase planos, e só o final da curva salta aos olhos — o crescimento exponencial "esmaga" o começo. À direita, com `ax2.set_yscale("log")`, cada intervalo igual no eixo y representa uma multiplicação (não uma soma) constante, e a curva de crescimento exponencial aparece como uma linha praticamente reta — muito mais fácil de comparar taxas de crescimento entre trechos diferentes. O equivalente para o eixo x é `set_xscale("log")`.

## Personalizando ticks

Os _ticks_ são as marcações nos eixos — por padrão, o Matplotlib escolhe posições e rótulos automaticamente, mas às vezes vale sobrescrever isso.

### Exemplo 6 - rótulos de tick personalizados

```py
fig, ax = plt.subplots(figsize=(7, 4))
ax.plot(x, vendas_loja_a)

dias_semana = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom", "Seg", "Ter", "Qua"]
ax.set_xticks(x)
ax.set_xticklabels(dias_semana, rotation=45)
plt.tight_layout()
plt.show()
```

`ax.set_xticks()` define exatamente em quais posições do eixo x uma marcação deve aparecer, e `ax.set_xticklabels()` troca o texto exibido em cada uma — nesse exemplo, trocando os números `0` a `9` pelos nomes dos dias da semana. `rotation=45` inclina os rótulos, útil quando eles são longos demais pra caber na horizontal sem se sobrepor.

Com legendas, eixos duplos, escala logarítmica e ticks personalizados, seus gráficos já ficam bem mais informativos sem precisar de nenhuma biblioteca externa. No próximo post, a série trata da parte mais visual: estilos prontos, texto e anotações apontando pra pontos específicos do gráfico.

**Fonte adaptada:** [Matplotlib - Legends](https://www.tutorialspoint.com/matplotlib/matplotlib_legends.htm), [Matplotlib - Twin Axes](https://www.tutorialspoint.com/matplotlib/matplotlib_twin_axes.htm), [Matplotlib - Ticks and Tick Labels](https://www.tutorialspoint.com/matplotlib/matplotlib_ticks_and_tick_labels.htm)
