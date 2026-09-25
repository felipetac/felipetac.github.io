---
layout: post
title: "NumPy #9 - Distribuições de Probabilidade (Parte 1)"
date: 2026-08-11 16:50:00
image: '/assets/img/posts/numpy-com-python-distribuicoes-de-probabilidade-parte-1.webp'
description: Como embaralhar e permutar arrays com numpy.random, visualizar distribuições com Seaborn, e gerar dados seguindo as distribuições Normal, Binomial, Poisson e Uniforme.
category: 'ciência de dados'
tags:
- Ciência de Dados
- Python
- Programação
- Numpy
twitter_text: "NumPy #9 - Distribuições de Probabilidade (Parte 1)"
introduction: "Nesta parte do tutorial, você vai aprender a embaralhar arrays, visualizar distribuições com Seaborn, e gerar dados com as distribuições Normal, Binomial, Poisson e Uniforme."
---

Lá no [post #4](/numpy-com-python-random-e-funcoes-universais/), você viu o básico de `numpy.random`: `randint()`, `rand()` e `choice()`. Isso é suficiente pra sortear números soltos, mas o `numpy.random` vai bem mais fundo — ele sabe gerar dados que seguem distribuições de probabilidade específicas, o tipo de coisa usada o tempo todo pra simular dados realistas antes de testar um modelo. Como é bastante conteúdo, a gente divide em duas partes: hoje, embaralhamento, uma introdução à visualização com Seaborn, e as quatro distribuições mais comuns.

## Embaralhando e permutando arrays

### random.shuffle()

`np.random.shuffle()` embaralha um array **no próprio lugar** (in place) — ele modifica o array original e não devolve nada.

```py
import numpy as np

arr = np.array([1, 2, 3, 4, 5])
np.random.shuffle(arr)

print(arr)
```

A saída é (a ordem muda a cada execução):

```py
[3 1 5 2 4]
```

### random.permutation()

`np.random.permutation()` faz a mesma coisa, mas devolve um **array novo** embaralhado, deixando o original intacto.

```py
arr = np.array([1, 2, 3, 4, 5])
embaralhado = np.random.permutation(arr)

print(embaralhado)
print(arr)
```

A saída é:

```py
[4 2 5 1 3]
[1 2 3 4 5]
```

Repare que `arr` continua na ordem original — só `embaralhado` mudou. É a mesma diferença de comportamento que apareceu no post de copy vs view: uma função muta o array, a outra devolve uma cópia modificada.

## Visualizando distribuições com Seaborn

Antes de gerar dados de distribuições diferentes, ajuda enxergar o formato de cada uma — e olhar uma lista de números não ajuda muito nisso. O Seaborn, uma biblioteca de visualização construída em cima do Matplotlib, tem uma função feita sob medida pra isso.

```bash
pip install seaborn
```

```py
import matplotlib.pyplot as plt
import seaborn as sns

dados = np.random.normal(size=1000)

sns.displot(dados, kind="kde")
plt.show()
```

`sns.displot(dados, kind="kde")` desenha a curva de densidade dos dados — mostra em quais faixas de valor os dados se concentram mais ou menos, sem precisar de um histograma com barras. A partir daqui, todo exemplo de distribuição pode ser visualizado trocando só o `dados` por outra chamada de `numpy.random`.

> **Nota:** o Seaborn não é NumPy — é uma biblioteca separada, focada em visualização estatística. Ela não faz parte do escopo desta série, mas aparece aqui porque é praticamente o par perfeito do `numpy.random` pra enxergar o que cada distribuição representa.

## Distribuição Normal (Gaussiana)

A distribuição Normal é a clássica "curva de sino" — a maioria dos valores fica perto da média, e a frequência cai conforme o valor se afasta dela pros dois lados. É a distribuição mais comum na natureza (altura de pessoas, erros de medição, etc.).

```py
dados = np.random.normal(loc=0, scale=1, size=(2, 4))

print(dados)
```

A saída é (os valores mudam a cada execução):

```py
[[ 0.49 -1.23  0.87  0.02]
 [-0.65  1.14 -0.08  0.33]]
```

`loc` define a média da distribuição (o centro da curva), `scale` define o desvio padrão (o quão "espalhados" os valores ficam), e `size` define o formato do array de saída — os três parâmetros que você vai ver se repetir, com nomes um pouco diferentes, em quase toda distribuição do NumPy.

### Exemplo prático — simulando notas de uma prova

Combinando a distribuição Normal com a indexação booleana vista no post #3, dá pra simular um cenário realista: as notas de 1000 alunos numa prova, com média 70 e desvio padrão 10, e então contar quantos ficaram acima de 90.

```py
notas = np.random.normal(loc=70, scale=10, size=1000)

acima_de_90 = notas[notas > 90]
print(len(acima_de_90))
```

A saída é (o número exato muda a cada execução, mas fica sempre perto disso):

```py
23
```

Isso bate com a teoria: em uma distribuição Normal, valores acima de 2 desvios padrão da média (aqui, acima de `70 + 2*10 = 90`) representam só uma fatia pequena do total — por volta de 2 a 3% em 1000 amostras.

## Distribuição Binomial

A Binomial é **discreta** (só gera inteiros, diferente da Normal, que é contínua) e modela o número de sucessos em um número fixo de tentativas com probabilidade fixa — o exemplo clássico é contar quantas caras saem em 10 lançamentos de moeda.

```py
resultado = np.random.binomial(n=10, p=0.5, size=10)

print(resultado)
```

A saída é:

```py
[6 4 5 7 5 3 6 5 4 8]
```

`n` é o número de tentativas em cada "rodada" (10 lançamentos de moeda), `p` é a probabilidade de sucesso em cada tentativa (`0.5` = moeda honesta), e `size` é quantas rodadas simular. Cada valor do array é quantos sucessos saíram naquela rodada.

## Distribuição de Poisson

A Poisson também é discreta, e modela quantas vezes um evento acontece em um intervalo fixo de tempo (ou espaço) — por exemplo, quantos clientes chegam a uma loja por hora.

```py
resultado = np.random.poisson(lam=2, size=10)

print(resultado)
```

A saída é:

```py
[1 3 2 0 4 2 1 2 3 1]
```

`lam` (de _lambda_) é a taxa média de ocorrência esperada no intervalo — com `lam=2`, o valor mais comum de aparecer é próximo de `2`, mas valores mais altos ou mais baixos também aparecem, só que com menos frequência.

## Distribuição Uniforme

A Uniforme é a mais simples das quatro: todo valor dentro de um intervalo tem exatamente a mesma chance de aparecer — nenhuma região é mais "concentrada" que outra.

```py
resultado = np.random.uniform(low=0, high=10, size=(2, 3))

print(resultado)
```

A saída é:

```py
[[3.42 7.91 0.55]
 [9.14 2.08 5.67]]
```

`low` e `high` definem o intervalo (por padrão, `0.0` e `1.0`). Se você plotar essa distribuição com `sns.displot()`, ao contrário da curva em sino da Normal, o gráfico fica praticamente "achatado" — sem pico central, porque nenhum valor é mais provável que outro.

Quatro distribuições já dão uma boa base, mas o `numpy.random` tem mais sete que vale conhecer, algumas específicas de áreas como processamento de sinais e testes estatísticos. É isso que fecha a série no próximo (e último) post.

**Fonte adaptada:** [NumPy Random Permutations](https://www.w3schools.com/python/numpy/numpy_random_permutation.asp), [NumPy Seaborn Module](https://www.w3schools.com/python/numpy/numpy_random_seaborn.asp), [Normal (Gaussian) Distribution](https://www.w3schools.com/python/numpy/numpy_random_normal.asp), [Binomial Distribution](https://www.w3schools.com/python/numpy/numpy_random_binomial.asp), [Poisson Distribution](https://www.w3schools.com/python/numpy/numpy_random_poisson.asp), [Uniform Distribution](https://www.w3schools.com/python/numpy/numpy_random_uniform.asp)
