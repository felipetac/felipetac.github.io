---
layout: post
title: "Machine Learning #1 - Introdução"
date: 2026-09-25 11:40:00
image: '/assets/img/posts/ml-introducao-ao-machine-learning.webp'
description: O que é Machine Learning, o que é um dataset, e os três tipos de dados (numéricos, categóricos e ordinais) que você precisa saber reconhecer antes de analisar qualquer conjunto de dados.
category: 'ciência de dados'
tags:
- Python
- Programação
- Introdução
twitter_text: "Machine Learning #1 - Introdução"
introduction: "Nesta parte da série, você vai entender o que é Machine Learning, o que é um dataset, e os três tipos de dados que aparecem em qualquer análise."
---

Depois de estruturas de dados e algoritmos, chegou a hora de um assunto que anda na boca de todo mundo: Machine Learning. Se você acompanhou as séries de NumPy, Pandas e Matplotlib deste blog, já tem boa parte das ferramentas prontas — essa nova série assume que você já sabe manipular arrays e DataFrames, e foca no que vem depois: como usar dados pra fazer previsões.

## O que é Machine Learning

- Machine Learning é fazer o computador aprender estudando dados e estatística.
- Machine Learning é um passo na direção da inteligência artificial (IA).
- Machine Learning é um programa que analisa dados e aprende a prever um resultado.

## Por onde começar

Ao longo desta série, você vai voltar um pouco pra matemática e estudar estatística — como calcular números importantes a partir de um conjunto de dados. Também vai usar módulos Python pra chegar nessas respostas sem fazer conta na mão, e, por fim, vai aprender a montar funções capazes de prever um resultado com base no que os dados ensinam.

## O que é um dataset

Pra um computador, um dataset é qualquer coleção de dados — pode ser desde um array simples até um banco de dados completo.

```py
velocidades = [99, 86, 87, 88, 111, 86, 103, 87, 94, 78, 77, 85, 86]
```

Ou algo mais estruturado, como uma tabela de carros:

| Modelo | Cor | Idade | Velocidade | Passou |
|---|---|---|---|---|
| BMW | vermelho | 5 | 99 | Sim |
| Volvo | preto | 7 | 86 | Sim |
| VW | cinza | 8 | 87 | Não |
| VW | branco | 7 | 88 | Sim |
| Ford | branco | 2 | 111 | Sim |
| VW | branco | 17 | 86 | Sim |
| Tesla | vermelho | 2 | 103 | Sim |
| BMW | preto | 9 | 87 | Sim |
| Volvo | cinza | 4 | 94 | Não |
| Ford | branco | 11 | 78 | Não |
| Toyota | cinza | 12 | 77 | Não |
| VW | branco | 9 | 85 | Não |
| Toyota | azul | 6 | 86 | Sim |

Só olhando pro array, dá pra chutar que a média fica em torno de 80 ou 90, e dá pra identificar o maior e o menor valor — mas o que mais dá pra fazer com isso? E olhando pra tabela de carros, dá pra perceber que a cor mais comum é branco, e que o carro mais velho tem 17 anos. Mas, e se você pudesse prever se um carro passou no teste (`AutoPass`) só olhando pras outras colunas?

É exatamente pra isso que serve o Machine Learning: analisar dados e prever o resultado. Em Machine Learning de verdade, é comum trabalhar com datasets bem maiores que esses — mas, pra manter as coisas simples e fáceis de acompanhar, esta série vai usar sempre datasets pequenos, do tamanho certo pra entender cada conceito sem se perder nos números.

## Tipos de dados

Pra analisar um conjunto de dados, é essencial saber com que tipo de dado você está lidando. Existem três categorias principais:

- **Numéricos:** números, divididos em dois grupos:
  - **Discretos:** dados contados, limitados a números inteiros. Exemplo: a quantidade de carros que passam por um cruzamento.
  - **Contínuos:** dados medidos, que podem ser qualquer número. Exemplo: o preço de um produto, ou o tamanho de um item.
- **Categóricos:** valores que não podem ser comparados entre si numa escala. Exemplo: uma cor, ou qualquer valor do tipo sim/não.
- **Ordinais:** parecidos com categóricos, mas que podem ser comparados entre si. Exemplo: notas escolares, onde A é melhor que B, que é melhor que C, e assim por diante.

Saber o tipo de dado que você está analisando é o que determina qual técnica faz sentido usar — e é exatamente por aí que a série continua: nos próximos posts, você vai aprender a resumir um conjunto de números com três valores centrais — média, mediana e moda.

**Fonte adaptada:** [Machine Learning Getting Started](https://www.w3schools.com/python/python_ml_getting_started.asp)
