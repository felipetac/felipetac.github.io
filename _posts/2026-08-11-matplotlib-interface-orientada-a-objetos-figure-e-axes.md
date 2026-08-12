---
layout: post
title: "#3 - Interface Orientada a Objetos do Matplotlib: Figure e Axes"
date: 2026-08-11 17:40:00
image: '/assets/img/posts/matplotlib-interface-orientada-a-objetos-figure-e-axes.webp'
description: A diferença entre a interface implícita do pyplot e a interface orientada a objetos do Matplotlib, usando plt.subplots() para criar Figure e Axes.
category: 'ciência de dados'
tags:
- Ciência de Dados
- Python
- Programação
- Matplotlib
twitter_text: Interface Orientada a Objetos do Matplotlib - Figure e Axes
introduction: "Nesta parte do tutorial, você vai conhecer a interface orientada a objetos do Matplotlib, com os objetos Figure e Axes controlados explicitamente."
---

Depois de uma pausa pra aprofundar em Pandas, a série volta ao Matplotlib. Até agora, todo gráfico foi feito chamando funções soltas do `pyplot` — `plt.plot()`, `plt.title()`, `plt.grid()` — cada uma mexendo "no gráfico atual", meio que por trás dos panos. Essa é a chamada **interface implícita**, ótima pra gráficos rápidos e scripts curtos. Mas o Matplotlib também oferece uma **interface orientada a objetos**, onde você guarda e manipula diretamente os objetos `Figure` e `Axes` — e é essa interface que dá controle fino quando o gráfico fica mais complexo.

## pyplot vs. orientação a objetos

Todo gráfico do Matplotlib é composto por dois objetos principais:

- **Figure**: a "folha" inteira — o container que engloba tudo, incluindo um ou mais gráficos, título geral, e é o objeto que você salva em arquivo;
- **Axes**: um gráfico individual dentro da figura — é o `Axes` que tem os eixos x/y, o título próprio, e é nele que os dados são efetivamente desenhados.

Quando você chama `plt.plot()` direto, o Matplotlib cria (ou reaproveita) uma `Figure` e um `Axes` implicitamente, sem você precisar nomeá-los. Na interface orientada a objetos, você cria esses dois objetos você mesmo, com `plt.subplots()`, e chama os métodos diretamente neles.

### Exemplo 1 - o mesmo gráfico, nas duas interfaces

```py
import matplotlib.pyplot as plt
import numpy as np

x = np.linspace(0, 10, 100)
y = np.sin(x)

# interface implícita (pyplot)
plt.plot(x, y)
plt.title("Onda Senoidal")
plt.xlabel("x")
plt.ylabel("sen(x)")
plt.show()
```

```py
# interface orientada a objetos
fig, ax = plt.subplots(figsize=(7, 4))
ax.plot(x, y)
ax.set_title("Onda Senoidal")
ax.set_xlabel("x")
ax.set_ylabel("sen(x)")
plt.show()
```

Os dois trechos produzem exatamente o mesmo gráfico. A diferença é que no segundo, `fig` e `ax` são variáveis de verdade — dá pra passá-las adiante, guardá-las, ou voltar a mexer nelas mais tarde, o que fica difícil de controlar só com `plt.algumacoisa()`.

## Criando Figure e Axes com subplots()

`plt.subplots()` é a forma mais comum de criar os dois objetos de uma vez — mesmo quando você só precisa de um único gráfico:

### Exemplo 2 - controlando o tamanho da figura

```py
fig, ax = plt.subplots(figsize=(7, 4))
ax.plot(x, y)
plt.show()
```

O parâmetro `figsize` recebe uma tupla `(largura, altura)` em polegadas, e controla o tamanho da `Figure` inteira — não existe um equivalente direto disso na interface implícita sem passar por `plt.figure(figsize=...)` antes do `plt.plot()`.

### Exemplo 3 - o padrão set_* nos métodos do Axes

Repare que os métodos chamados em `ax` levam o prefixo `set_`: `ax.set_title()`, `ax.set_xlabel()`, `ax.set_ylabel()`, em vez de `plt.title()`, `plt.xlabel()`, `plt.ylabel()`. É um padrão consistente em praticamente todo atributo do `Axes` — inclusive `ax.set_xlim()` e `ax.set_ylim()`, pra definir os limites dos eixos manualmente:

```py
fig, ax = plt.subplots(figsize=(7, 4))
ax.plot(x, y)
ax.set_xlim(0, 10)
ax.set_ylim(-1.5, 1.5)
plt.show()
```

## Múltiplos eixos numa mesma figura

`plt.subplots()` também aceita o número de linhas e colunas da grade, retornando um _array_ de `Axes` em vez de um único objeto — a mesma ideia do `plt.subplot()` que você viu no primeiro post da série, só que na interface orientada a objetos.

### Exemplo 4 - uma grade 2x2

```py
fig, axs = plt.subplots(2, 2, figsize=(8, 6))

axs[0, 0].plot(x, np.sin(x))
axs[0, 0].set_title("Seno")

axs[0, 1].plot(x, np.cos(x))
axs[0, 1].set_title("Cosseno")

axs[1, 0].plot(x, np.sin(x) * np.cos(x))
axs[1, 0].set_title("Seno × Cosseno")

axs[1, 1].plot(x, -np.sin(x))
axs[1, 1].set_title("Seno invertido")

fig.suptitle("Funções Trigonométricas")
plt.tight_layout()
plt.show()
```

Isso desenha uma grade de 2 linhas por 2 colunas, com um gráfico diferente em cada posição, acessada como `axs[linha, coluna]`. `fig.suptitle()` adiciona um título geral no topo da figura inteira — o equivalente orientado a objetos do `plt.suptitle()` visto anteriormente — e `plt.tight_layout()` ajusta automaticamente o espaçamento entre os subgráficos pra evitar que títulos e rótulos se sobreponham.

> **Nota:** quando a grade tem só uma linha ou uma coluna (por exemplo, `plt.subplots(1, 3)`), o retorno é um array de uma dimensão, acessado como `axs[0]`, `axs[1]`, `axs[2]` — sem o segundo índice.

## Quando usar cada interface

Não existe uma resposta única, mas uma régua prática que costuma funcionar bem:

- Pra um gráfico rápido, exploratório, de poucas linhas — a interface implícita (`plt.plot()`, `plt.title()`...) é mais direta e exige menos código;
- Pra qualquer coisa com múltiplos subgráficos, ou que vá virar uma função reutilizável, ou parte de uma aplicação maior — a interface orientada a objetos evita ambiguidade sobre "qual gráfico" cada chamada está afetando, já que tudo é explícito através de `fig` e `ax`.

Vale notar que os dois estilos se misturam sem problema: é comum criar `fig, ax = plt.subplots()` e ainda assim chamar `plt.show()` no final, como nos exemplos deste post.

Com `Figure` e `Axes` sob controle direto, os próximos posts da série vão explorar recursos que ficam mais naturais nessa interface: legendas, escalas de eixo e anotações.

**Fonte adaptada:** [Matplotlib - Object-Oriented Interface](https://www.tutorialspoint.com/matplotlib/matplotlib_object_oriented_interface.htm), [Matplotlib - Figure Class](https://www.tutorialspoint.com/matplotlib/matplotlib_figure_class.htm), [Matplotlib - Axes Class](https://www.tutorialspoint.com/matplotlib/matplotlib_axes_class.htm)
