---
layout: post
title: "#5 - Estilos, Anotações e Texto no Matplotlib"
date: 2026-08-11 18:20:00
image: '/assets/img/posts/matplotlib-estilos-anotacoes-e-texto.png'
description: Como aplicar estilos prontos com plt.style.use(), adicionar texto livre com plt.text() e apontar para pontos de um gráfico com plt.annotate().
category: 'ciência de dados'
tags:
- Ciência de Dados
- Python
- Programação
- Matplotlib
twitter_text: Estilos, Anotações e Texto no Matplotlib
introduction: "Nesta parte do tutorial, você vai aprender a aplicar estilos prontos e a adicionar texto e anotações a um gráfico do Matplotlib."
---

Os últimos dois posts trataram de controle e estrutura — `Figure`, `Axes`, legendas, escalas. Este post é sobre a camada mais visual: como dar uma cara diferente a um gráfico inteiro com um estilo pronto, e como chamar atenção pra um ponto específico dos dados com texto e anotações.

## Estilos prontos com plt.style.use()

Por padrão, todo gráfico do Matplotlib segue a mesma paleta e o mesmo visual — funcional, mas nem sempre o mais bonito. A biblioteca vem com uma coleção de estilos prontos, que trocam cores, grade, fundo e tipografia de uma vez só.

### Exemplo 1 - listando os estilos disponíveis

```py
import matplotlib.pyplot as plt

print(plt.style.available)
```

A saída é uma lista com dezenas de nomes, incluindo `'ggplot'`, `'seaborn-v0_8'`, `'fivethirtyeight'`, `'dark_background'`, `'grayscale'`, `'bmh'`, entre outros — cada um inspirado em uma ferramenta ou publicação conhecida de visualização de dados.

### Exemplo 2 - aplicando um estilo

```py
import numpy as np

x = np.linspace(0, 10, 100)
y = np.sin(x)

plt.style.use("ggplot")

plt.plot(x, y)
plt.title("Onda Senoidal")
plt.show()
```

Uma vez chamado, `plt.style.use()` afeta **todos** os gráficos criados depois dele no mesmo script — fundo levemente acinzentado, grade branca e cores mais suaves, no caso do estilo `'ggplot'` (inspirado no pacote homônimo de R). Pra voltar ao visual padrão, use `plt.style.use("default")`.

### Exemplo 3 - aplicando um estilo só temporariamente

Quando você quer um estilo diferente só num gráfico específico, sem afetar o resto do script, `plt.style.context()` aplica o estilo apenas dentro do bloco `with`:

```py
with plt.style.context("dark_background"):
    plt.plot(x, y)
    plt.title("Onda Senoidal (fundo escuro)")
    plt.show()

# fora do bloco, volta ao estilo anterior
plt.plot(x, y)
plt.title("Onda Senoidal (estilo padrão)")
plt.show()
```

## Adicionando texto livre com text()

Além de título e rótulos de eixo, o Matplotlib permite colocar texto solto em qualquer coordenada do gráfico — útil pra destacar um valor, uma observação ou uma marca d'água.

### Exemplo 4 - texto numa posição fixa

```py
plt.style.use("default")

plt.plot(x, y)
plt.text(5, 0.8, "Pico da onda", fontsize=10, color="darkred")
plt.show()
```

`plt.text(x, y, texto)` desenha o texto ancorado nas coordenadas de dados `(x, y)` — as mesmas unidades dos eixos do gráfico, não pixels da tela. Isso significa que o texto se move junto se os limites dos eixos mudarem.

## Anotações com annotate()

Quando o objetivo não é só escrever um texto, mas apontar claramente pra um ponto específico dos dados, `plt.annotate()` é mais indicado que `plt.text()` — ele desenha uma seta ligando o texto ao ponto de interesse.

### Exemplo 5 - anotando o pico da curva

```py
maximo_idx = np.argmax(y)
x_max, y_max = x[maximo_idx], y[maximo_idx]

plt.plot(x, y)
plt.annotate(
    "Máximo",
    xy=(x_max, y_max),
    xytext=(x_max + 1.5, y_max - 0.3),
    arrowprops=dict(facecolor="black", arrowstyle="->")
)
plt.show()
```

Os parâmetros principais são:

- **`xy`**: a coordenada do ponto que está sendo anotado — é onde a ponta da seta encosta;
- **`xytext`**: a coordenada onde o texto da anotação é desenhado — normalmente afastada do ponto, pra não tampar os dados;
- **`arrowprops`**: um dicionário controlando a seta que liga os dois pontos. `arrowstyle="->"` desenha uma seta simples; outros valores incluem `"-|>"` (seta preenchida) e `"fancy"`.

### Exemplo 6 - anotando múltiplos pontos de um gráfico de dispersão

```py
categorias = np.array([10, 25, 40, 55, 70])
valores = np.array([15, 45, 30, 60, 25])

plt.scatter(categorias, valores)

for cat, val in zip(categorias, valores):
    if val > 50:
        plt.annotate(
            f"({cat}, {val})",
            xy=(cat, val),
            xytext=(cat, val + 5),
            ha="center"
        )

plt.show()
```

Esse padrão — percorrer os dados com um `for` e anotar só os pontos que atendem a uma condição — é comum pra destacar automaticamente outliers ou valores acima de um limite, sem precisar identificar as coordenadas manualmente. O parâmetro `ha` (_horizontal alignment_) centraliza o texto em relação ao ponto.

Com estilos prontos, texto livre e anotações, um gráfico deixa de ser só um desenho de dados e passa a contar uma história com contexto embutido. O próximo post da série é sobre um tipo diferente de gráfico: os que resumem a distribuição estatística de uma variável, como boxplot, violin plot e barras de erro.

**Fonte adaptada:** [Matplotlib - Styles](https://www.tutorialspoint.com/matplotlib/matplotlib_styles.htm), [Matplotlib - Working With Text](https://www.tutorialspoint.com/matplotlib/matplotlib_working_with_text.htm), [Matplotlib - Annotations](https://www.tutorialspoint.com/matplotlib/matplotlib_annotations.htm)
