---
layout: post
title: "NumPy #6 - MDC, MMC, Trigonometria e Operações de Conjunto"
date: 2026-08-11 16:44:00
image: '/assets/img/posts/numpy-com-python-mdc-mmc-trigonometria-e-operacoes-de-conjunto.webp'
description: Como calcular MDC e MMC com gcd e lcm, trabalhar com funções trigonométricas e hiperbólicas, e comparar arrays como conjuntos matemáticos no NumPy.
category: 'ciência de dados'
tags:
- Ciência de Dados
- Python
- Programação
- Numpy
twitter_text: "NumPy #6 - MDC, MMC, Trigonometria e Operações de Conjunto"
introduction: "Nesta parte do tutorial, você vai aprender a calcular MDC e MMC, usar funções trigonométricas e hiperbólicas, e comparar arrays como conjuntos com o NumPy."
---

No [post anterior](/numpy-com-python-arredondamento-logaritmos-e-somas-acumuladas/), você viu arredondamento, logaritmos e acumulação de somas e produtos. Fechando o catálogo de ufuncs mais usadas do dia a dia, hoje é a vez de MDC/MMC, trigonometria (incluindo as funções hiperbólicas) e as operações que tratam um array como um conjunto matemático.

## MDC e MMC

MDC (máximo divisor comum) e MMC (mínimo múltiplo comum) são operações clássicas de matemática básica, e o NumPy tem uma ufunc pronta pra cada uma. MDC aparece em problemas de simplificação de fração e de particionamento (por exemplo, dividir um terreno em lotes iguais do maior tamanho possível); MMC aparece em problemas de sincronização — como descobrir de quantos em quantos dias dois eventos periódicos diferentes voltam a coincidir.

### np.gcd() — máximo divisor comum

```py
import numpy as np

print(np.gcd(6, 9))
```

A saída é:

```py
3
```

`gcd` vem de "greatest common divisor" — o nome em inglês do MDC. Pra calcular o MDC de mais de dois números de uma vez, use o método `reduce()` da ufunc:

```py
arr = np.array([20, 8, 32])

print(np.gcd.reduce(arr))
```

A saída é:

```py
4
```

`reduce()` aplica a ufunc par a par ao longo do array — primeiro entre os dois primeiros elementos, depois entre esse resultado e o próximo, e assim por diante, até sobrar um único valor.

### np.lcm() — mínimo múltiplo comum

```py
print(np.lcm(4, 6))
```

A saída é:

```py
12
```

E, do mesmo jeito que `gcd()`, `lcm()` também aceita `reduce()` pra calcular o MMC de um array inteiro:

```py
arr = np.array([3, 6, 9])

print(np.lcm.reduce(arr))
```

A saída é:

```py
18
```

## Funções trigonométricas

O NumPy trabalha com ângulos em **radianos**, não em graus — é um detalhe fácil de esquecer e que gera resultados sem sentido se você passar graus direto pras funções trigonométricas.

### np.sin(), np.deg2rad() e np.rad2deg()

```py
graus = np.array([90, 180, 270, 360])
radianos = np.deg2rad(graus)

print(radianos)
print(np.sin(radianos))
```

A saída é:

```py
[1.57079633 3.14159265 4.71238898 6.28318531]
[ 1.0000000e+00  1.2246468e-16 -1.0000000e+00 -2.4492936e-16]
```

`np.deg2rad()` converte graus pra radianos (o inverso, `np.rad2deg()`, faz o caminho contrário). Repare que `sin(180°)` não deu exatamente `0` — deu um número extremamente pequeno (`1.22e-16`), consequência de como números de ponto flutuante são representados. Na prática, isso é zero; é só a limitação de precisão do `float64` aparecendo.

`np.cos()` e `np.tan()` funcionam exatamente do mesmo jeito, também esperando radianos como entrada:

```py
print(np.cos(radianos))
```

A saída é:

```py
[ 6.1232340e-17 -1.0000000e+00 -1.8369702e-16  1.0000000e+00]
```

O mesmo efeito de precisão de ponto flutuante aparece aqui: `cos(90°)` e `cos(270°)` deveriam ser exatamente `0`, mas aparecem como números extremamente pequenos.

### Funções trigonométricas inversas e np.hypot()

As inversas (`arcsin()`, `arccos()`, `arctan()`) fazem o caminho contrário: recebem um valor e devolvem o ângulo em radianos.

```py
print(np.arcsin(1.0))
print(np.rad2deg(np.arcsin(1.0)))
```

A saída é:

```py
1.5707963267948966
90.0
```

`np.hypot()` calcula a hipotenusa de um triângulo retângulo a partir dos dois catetos, usando o teorema de Pitágoras:

```py
print(np.hypot(3, 4))
```

A saída é:

```py
5.0
```

### Exemplo prático — altura de uma escada encostada na parede

Combinando seno e cosseno, dá pra resolver um problema clássico de trigonometria: uma escada de 5 metros encostada numa parede, formando um ângulo de 60° com o chão — a que altura ela toca a parede, e a que distância da parede está sua base?

```py
comprimento = 5
angulo = np.deg2rad(60)

altura = comprimento * np.sin(angulo)
base = comprimento * np.cos(angulo)

print(altura, base)
```

A saída é:

```py
4.330127018922194 2.5000000000000004
```

A escada toca a parede a cerca de `4.33` metros de altura, com a base a `2.5` metros da parede — o tipo de cálculo que, escrito à mão, exige lembrar a trigonometria do triângulo retângulo, mas que aqui é só multiplicar o comprimento pelo seno e pelo cosseno do ângulo.

## Funções hiperbólicas

As funções hiperbólicas (`sinh`, `cosh`, `tanh`) e suas inversas (`arcsinh`, `arccosh`, `arctanh`) seguem a mesma família de nomes das trigonométricas, mas vêm da geometria de hipérboles em vez de círculos — aparecem bastante em redes neurais (a `tanh` é uma função de ativação clássica).

```py
print(np.sinh(1))
print(np.cosh(1))
print(np.tanh(1))
```

A saída é:

```py
1.1752011936438014
1.5430806348152437
0.7615941559557649
```

E as inversas funcionam do mesmo jeito que `arcsin()`/`arccos()`/`arctan()`:

```py
print(np.arcsinh(1))
print(np.arccosh(1.5))
print(np.arctanh(0.5))
```

A saída é:

```py
0.881373587019543
0.9624236501192069
0.5493061443340548
```

> **Nota:** `arccosh()` só aceita valores maiores ou iguais a `1`, e `arctanh()` só aceita valores entre `-1` e `1` (sem incluir as pontas) — fora desse intervalo, o resultado é `nan` com um aviso do NumPy, porque a função não é definida ali.

## Operações de conjunto

O NumPy trata arrays 1-D como conjuntos matemáticos, com funções pra unir, cruzar e comparar sem precisar escrever loop.

### np.unique()

```py
arr = np.array([1, 2, 2, 3, 3, 3, 4])

print(np.unique(arr))
```

A saída é:

```py
[1 2 3 4]
```

### np.union1d() e np.intersect1d()

```py
arr1 = np.array([1, 2, 3, 4])
arr2 = np.array([3, 4, 5, 6])

print(np.union1d(arr1, arr2))
print(np.intersect1d(arr1, arr2, assume_unique=True))
```

A saída é:

```py
[1 2 3 4 5 6]
[3 4]
```

`union1d()` junta os dois arrays removendo duplicatas; `intersect1d()` devolve só os valores que aparecem nos dois. O parâmetro `assume_unique=True` diz ao NumPy que os arrays de entrada já não têm valores repetidos — isso deixa a operação mais rápida, então vale usar sempre que você já sabe que está lidando com conjuntos.

### np.setdiff1d() e np.setxor1d()

```py
print(np.setdiff1d(arr1, arr2, assume_unique=True))
print(np.setxor1d(arr1, arr2, assume_unique=True))
```

A saída é:

```py
[1 2]
[1 2 5 6]
```

`setdiff1d(arr1, arr2)` devolve o que está em `arr1` mas não em `arr2`. `setxor1d()` é a diferença simétrica — os valores que aparecem em só um dos dois arrays, nunca nos dois ao mesmo tempo (`1` e `2` só estão em `arr1`; `5` e `6` só estão em `arr2`; `3` e `4`, que aparecem nos dois, ficam de fora).

> **Nota:** essas quatro operações não precisam ser só com números — funcionam igual com arrays de strings. Por exemplo, `np.intersect1d(tags_post_a, tags_post_b)` encontraria as tags em comum entre dois posts, o mesmo tipo de comparação que a página de tags deste blog faz.

Com isso fecham as ufuncs "de catálogo" — as que já vêm prontas pra usar. No próximo post da série, a gente muda de assunto pra entender _broadcasting_, o mecanismo que permite o NumPy operar entre arrays de tamanhos diferentes, e como ele abre caminho pra álgebra linear com matrizes.

**Fonte adaptada:** [NumPy GCD](https://www.w3schools.com/python/numpy/numpy_ufunc_gcd.asp), [NumPy LCM](https://www.w3schools.com/python/numpy/numpy_ufunc_lcm.asp), [NumPy Trigonometric Functions](https://www.w3schools.com/python/numpy/numpy_ufunc_trigonometric.asp), [NumPy Hyperbolic Functions](https://www.w3schools.com/python/numpy/numpy_ufunc_hyperbolic.asp), [NumPy Set Operations](https://www.w3schools.com/python/numpy/numpy_ufunc_set_operations.asp)
