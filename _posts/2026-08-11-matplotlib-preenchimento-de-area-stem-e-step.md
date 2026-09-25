---
layout: post
title: "Matplotlib #3 - Preenchimento de Área, Stem e Step no Matplotlib"
date: 2026-08-11 20:20:00
image: '/assets/img/posts/matplotlib-preenchimento-de-area-stem-e-step.webp'
description: Como preencher a área sob uma curva ou entre duas curvas com fill_between(), empilhar séries com stackplot(), e desenhar gráficos stem() e step() no Matplotlib.
category: 'ciência de dados'
tags:
- Ciência de Dados
- Python
- Programação
- Matplotlib
twitter_text: Preenchimento de Área, Stem e Step no Matplotlib
introduction: "Nesta parte do tutorial, você vai aprender a preencher áreas com fill_between(), empilhar séries com stackplot() e a desenhar gráficos stem() e step()."
---

No post anterior você conheceu dispersão, barras, histograma e pizza — os quatro tipos de gráfico mais usados no dia a dia. Este post fecha o repertório de visualizações "clássicas" com mais quatro ferramentas: preencher a área sob uma curva, empilhar várias séries numa só área, e duas formas de destacar valores discretos, `stem()` e `step()`.

## Preenchendo áreas com fill_between()

`plt.fill_between()` colore a área entre uma curva e o eixo x (ou entre duas curvas), o que ajuda a dar peso visual a uma tendência ou a destacar uma faixa de valores.

### Exemplo 1 - área sob uma curva

```py
import matplotlib.pyplot as plt
import numpy as np

dias = np.arange(1, 8)
temperatura = np.array([22, 24, 23, 26, 28, 27, 25])

plt.fill_between(dias, temperatura, color="skyblue", alpha=0.4)
plt.plot(dias, temperatura, color="tab:blue", marker="o")
plt.title("Temperatura ao Longo da Semana")
plt.xlabel("Dia")
plt.ylabel("Temperatura (°C)")
plt.show()
```

O gráfico desenha a linha de temperatura normalmente, mas com a área entre ela e o eixo x pintada de azul claro — o efeito visual deixa mais evidente o "volume" acumulado da grandeza, não só sua variação. O parâmetro `alpha` controla a transparência do preenchimento (de `0`, totalmente transparente, a `1`, totalmente opaco); sem ele, a área ficaria sólida demais e esconderia a grade e outros elementos do gráfico.

### Exemplo 2 - área entre duas curvas

Passar um segundo array de valores pinta a faixa entre as duas curvas, em vez de entre uma curva e o eixo x — útil pra mostrar um intervalo, como a variação entre a temperatura mínima e a máxima de cada dia:

```py
temp_min = np.array([18, 19, 17, 20, 22, 21, 19])
temp_max = np.array([26, 28, 27, 30, 32, 31, 29])

plt.fill_between(dias, temp_min, temp_max, color="orange", alpha=0.3, label="Faixa do dia")
plt.plot(dias, temp_min, color="tab:orange")
plt.plot(dias, temp_max, color="tab:red")
plt.legend()
plt.title("Faixa de Temperatura Diária")
plt.xlabel("Dia")
plt.ylabel("Temperatura (°C)")
plt.show()
```

Agora a área preenchida fica entre as duas linhas (mínima e máxima), formando uma banda que deixa claro o intervalo de variação de cada dia — um padrão comum em gráficos de previsão do tempo e de intervalos de confiança estatísticos.

## Empilhando séries com stackplot()

Quando várias séries numéricas compõem um total (por exemplo, vendas de produtos diferentes somando a receita total), `plt.stackplot()` empilha as áreas umas sobre as outras em vez de sobrepô-las.

### Exemplo 3 - vendas empilhadas por produto

```py
meses = np.arange(1, 6)
produto_a = np.array([10, 15, 13, 17, 20])
produto_b = np.array([5, 8, 9, 10, 12])
produto_c = np.array([3, 4, 6, 5, 7])

plt.stackplot(
    meses, produto_a, produto_b, produto_c,
    labels=["Produto A", "Produto B", "Produto C"]
)
plt.legend(loc="upper left")
plt.title("Vendas Mensais por Produto")
plt.xlabel("Mês")
plt.ylabel("Unidades Vendidas")
plt.show()
```

Cada array vira uma camada colorida empilhada sobre a anterior, e a altura total da pilha em qualquer ponto representa a soma das três séries naquele mês — dá pra ver tanto a contribuição de cada produto isoladamente (a espessura de cada faixa) quanto o crescimento do total (o topo da pilha subindo). `labels` associa um nome a cada camada, que aparece na legenda na mesma ordem em que as séries foram passadas.

## Hastes discretas com stem()

O gráfico stem desenha uma haste vertical (uma linha fina) do eixo x até cada valor, terminando num marcador — é uma alternativa ao gráfico de barras quando o interesse está no valor pontual, não numa área.

### Exemplo 4 - stem básico

```py
np.random.seed(42)
usuarios = np.arange(1, 11)
avaliacoes = np.random.randint(1, 6, 10)

plt.stem(usuarios, avaliacoes)
plt.title("Avaliações de 10 Usuários")
plt.xlabel("Usuário")
plt.ylabel("Nota (1 a 5)")
plt.show()
```

Cada usuário recebe uma haste vertical até a nota que deu, terminando num pequeno círculo — visualmente mais "leve" que uma barra cheia, o que ajuda quando há muitos pontos discretos lado a lado.

### Exemplo 5 - customizando linha, marcador e base

```py
plt.stem(usuarios, avaliacoes, linefmt="gray", markerfmt="o", basefmt=" ")
plt.title("Avaliações de 10 Usuários")
plt.xlabel("Usuário")
plt.ylabel("Nota (1 a 5)")
plt.show()
```

`linefmt` e `markerfmt` seguem a mesma sintaxe curta de formato usada em `plt.plot()`, controlando a cor/estilo das hastes e dos marcadores separadamente. `basefmt=" "` (um espaço em branco) remove a linha horizontal de base que o `stem()` desenha por padrão no `y=0`, deixando só as hastes.

## Linha em degraus com step()

`plt.step()` desenha uma linha que muda de valor em saltos retos, em vez de interpolar com uma diagonal entre dois pontos — o formato certo pra representar uma grandeza que muda em degraus, como o preço de um produto ao longo do dia.

### Exemplo 6 - step básico

```py
horas = np.arange(0, 24, 3)
preco = np.array([4.50, 4.50, 4.80, 5.20, 5.20, 4.90, 4.60, 4.50])

plt.step(horas, preco, where="post")
plt.title("Preço do Combustível ao Longo do Dia")
plt.xlabel("Hora")
plt.ylabel("Preço (R$)")
plt.show()
```

Em vez de uma reta diagonal ligando cada par de pontos (o que sugeriria uma mudança gradual de preço), a linha se mantém constante e "pula" verticalmente só no instante em que o valor muda de fato. O parâmetro `where` controla em qual lado do intervalo o degrau acontece: `"post"` (o valor muda logo depois do ponto, o padrão), `"pre"` (muda antes) ou `"mid"` (o degrau fica centralizado entre os dois pontos).

Com preenchimento de área, séries empilhadas e os gráficos stem e step, o repertório de tipos de gráfico 2D do Matplotlib está completo. O próximo post muda de assunto: a interface orientada a objetos, com os objetos `Figure` e `Axes` controlados explicitamente.

**Fonte adaptada:** [Matplotlib - Filled Plots](https://www.tutorialspoint.com/matplotlib/matplotlib_filled_plots.htm), [Matplotlib - Stacked Plots](https://www.tutorialspoint.com/matplotlib/matplotlib_stacked_plots.htm), [Matplotlib - Stem Plots](https://www.tutorialspoint.com/matplotlib/matplotlib_stem_plots.htm), [Matplotlib - Step Plots](https://www.tutorialspoint.com/matplotlib/matplotlib_step_plots.htm)
