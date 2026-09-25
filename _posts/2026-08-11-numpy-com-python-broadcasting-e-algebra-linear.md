---
layout: post
title: "NumPy #7 - Broadcasting e Álgebra Linear"
date: 2026-08-11 16:46:00
image: '/assets/img/posts/numpy-com-python-broadcasting-e-algebra-linear.webp'
description: Como o NumPy opera entre arrays de tamanhos diferentes com broadcasting, e como usar o módulo numpy.linalg para multiplicação de matrizes, determinante, inversa, sistemas lineares e norma.
category: 'ciência de dados'
tags:
- Ciência de Dados
- Python
- Programação
- Numpy
twitter_text: "NumPy #7 - Broadcasting e Álgebra Linear"
introduction: "Nesta parte do tutorial, você vai entender o que é broadcasting e vai aprender a fazer operações de álgebra linear com o módulo numpy.linalg."
---

No [post anterior](/numpy-com-python-mdc-mmc-trigonometria-e-operacoes-de-conjunto/), você fechou o catálogo de ufuncs "de prateleira" do NumPy. Nos posts anteriores, toda operação aritmética foi feita entre arrays do mesmo tamanho. Mas se você já escreveu `arr + 10` em algum exemplo da série, viu o NumPy somar `10` a **cada** elemento de um array — mesmo o `10` sendo um único número, não um array do mesmo tamanho. Esse comportamento tem nome: _broadcasting_. Hoje a gente entende como ele funciona e usa esse entendimento como base pra dar os primeiros passos em álgebra linear com o NumPy.

## O que é broadcasting

Broadcasting é o mecanismo que permite ao NumPy operar entre arrays de shapes diferentes, "esticando" o menor deles (sem duplicar dados de verdade na memória) pra combinar com o maior.

### Exemplo 1 — escalar com array

```py
import numpy as np

arr = np.array([[1, 2, 3],
                 [4, 5, 6],
                 [7, 8, 9]])

print(arr + 10)
```

A saída é:

```py
[[11 12 13]
 [14 15 16]
 [17 18 19]]
```

O `10` (um escalar, shape `()`) foi "esticado" pra parecer uma matriz `3x3` cheia de `10`s, e somado elemento a elemento. É o broadcasting mais simples que existe, e você já usou ele várias vezes na série sem perceber.

### Exemplo 2 — array 2-D com array 1-D

```py
matriz = np.array([[1, 2, 3],
                    [4, 5, 6],
                    [7, 8, 9]])
linha = np.array([10, 20, 30])

print(matriz + linha)
```

A saída é:

```py
[[11 22 33]
 [14 25 36]
 [17 28 39]]
```

Aqui `linha`, com shape `(3,)`, foi aplicada a **cada linha** de `matriz`, que tem shape `(3, 3)`. O NumPy consegue fazer isso porque a última dimensão dos dois arrays é compatível (`3` combina com `3`).

> **Nota:** a regra geral é: comparando as dimensões de trás pra frente, cada par precisa ser igual ou uma das duas precisa ser `1`. Se nenhuma dessas condições for verdadeira (por exemplo, somar um array `(3, 3)` com um array `(2,)`), o NumPy levanta `ValueError: operands could not be broadcast together`, em vez de adivinhar o que você quis dizer.

### Exemplo 3 — broadcasting nos dois lados ao mesmo tempo

O broadcasting também funciona quando **os dois** arrays precisam ser esticados, não só um deles — é o que acontece quando você combina uma coluna com uma linha.

```py
coluna = np.array([[10], [20], [30]])
linha = np.array([1, 2, 3])

print(coluna + linha)
```

A saída é:

```py
[[11 12 13]
 [21 22 23]
 [31 32 33]]
```

`coluna` tem shape `(3, 1)` e `linha` tem shape `(3,)` (que o NumPy trata como `(1, 3)` pra fins de broadcasting). Nenhum dos dois "cabe" no outro sozinho — o NumPy estica `coluna` pra `(3, 3)` repetindo cada valor ao longo da linha, e estica `linha` pra `(3, 3)` repetindo ela em cada linha, produzindo uma espécie de "tabela de soma" entre os dois arrays originais.

Esse "esticar sem duplicar de verdade" é também o motivo de ufuncs serem rápidas mesmo entre arrays de tamanhos diferentes — e é o mecanismo que sustenta as operações de matriz que vêm a seguir.

## Álgebra linear com numpy.linalg

Pra operações de matriz mais sérias — multiplicação, determinante, inversa, resolução de sistemas — o NumPy tem um submódulo dedicado: `numpy.linalg`.

### Multiplicação de matrizes

Repare que o operador `*` faz multiplicação **elemento a elemento**, não multiplicação de matrizes de verdade — pra isso, você precisa do operador `@` ou de `np.dot()`/`np.matmul()`.

```py
A = np.array([[1, 2], [3, 4]])
B = np.array([[5, 6], [7, 8]])

print(A @ B)
print(np.matmul(A, B))
```

A saída é:

```py
[[19 22]
 [43 50]]
[[19 22]
 [43 50]]
```

`A @ B` e `np.matmul(A, B)` são equivalentes — o `@` é só um jeito mais curto de escrever a mesma operação. `np.dot()` também funciona para matrizes 2-D e dá o mesmo resultado; a diferença entre os três só aparece em casos específicos com arrays de mais de 2 dimensões, fora do escopo deste post.

Entre dois vetores (arrays 1-D), `np.dot()` calcula o produto escalar — multiplica cada par de elementos correspondentes e soma tudo em um único número:

```py
a = np.array([1, 2, 3])
b = np.array([4, 5, 6])

print(np.dot(a, b))
```

A saída é:

```py
32
```

(`1*4 + 2*5 + 3*6 = 4 + 10 + 18 = 32`). É a mesma operação usada, por exemplo, pra calcular a soma ponderada de entradas em um neurônio artificial.

### Determinante e matriz inversa

```py
A = np.array([[1, 2], [3, 4]])

print(np.linalg.det(A))
print(np.linalg.inv(A))
```

A saída é:

```py
-2.0
[[-2.   1. ]
 [ 1.5 -0.5]]
```

O determinante diz se uma matriz tem inversa: só é possível calcular a inversa se o determinante for diferente de zero (matrizes com determinante `0` são chamadas de "singulares", e `np.linalg.inv()` levanta `LinAlgError` pra elas). Multiplicar uma matriz pela sua inversa sempre devolve a matriz identidade — vale conferir com `A @ np.linalg.inv(A)`.

### Resolvendo sistemas lineares com np.linalg.solve()

Em vez de calcular a inversa manualmente pra resolver um sistema de equações, `np.linalg.solve()` faz isso direto e de forma numericamente mais estável.

```py
# 3x + y = 9
# x + 2y = 8
A = np.array([[3, 1], [1, 2]])
b = np.array([9, 8])

print(np.linalg.solve(A, b))
```

A saída é:

```py
[2. 3.]
```

Ou seja, `x=2` e `y=3` — dá pra conferir substituindo de volta nas equações originais (`3*2+3=9` ✓, `2+2*3=8` ✓).

### Autovalores com np.linalg.eig()

`np.linalg.eig()` calcula os autovalores e autovetores de uma matriz quadrada — um conceito que aparece bastante em técnicas como PCA (redução de dimensionalidade), que provavelmente você vai encontrar mais pra frente em ciência de dados.

```py
A = np.array([[4, 1], [2, 3]])

autovalores, autovetores = np.linalg.eig(A)
print(autovalores)
```

A saída é:

```py
[5. 2.]
```

`np.linalg.eig()` devolve dois arrays: os autovalores e, junto, os autovetores correspondentes (uma coluna por autovalor). A ordem exata em que eles aparecem pode variar dependendo da implementação de álgebra linear usada por baixo — o importante aqui é saber que a função existe e o que ela representa; a matemática por trás de autovalores/autovetores é assunto pra um post (ou uma disciplina inteira) à parte.

### Norma de um vetor com np.linalg.norm()

```py
v = np.array([3, 4])

print(np.linalg.norm(v))
```

A saída é:

```py
5.0
```

Por padrão, `np.linalg.norm()` calcula a norma euclidiana (a distância do vetor até a origem) — que, pra um vetor 2-D, é exatamente o teorema de Pitágoras: `sqrt(3² + 4²) = 5`.

Com broadcasting e o básico de `numpy.linalg` na bagagem, a próxima parada é olhar mais de perto pras funções estatísticas do NumPy — `mean`, `median`, `std` e companhia — que você já viu por alto em outras séries, mas que aqui a gente vê com foco no `axis` e no `keepdims`.

**Fonte adaptada:** [NumPy - Broadcasting](https://www.tutorialspoint.com/numpy/numpy_broadcasting.htm), [NumPy - Dot Product](https://www.tutorialspoint.com/numpy/numpy_dot_product.htm), [NumPy - Determinant Calculation](https://www.tutorialspoint.com/numpy/numpy_determinant_calculation.htm), [NumPy - Matrix Inversion](https://www.tutorialspoint.com/numpy/numpy_matrix_inversion.htm), [NumPy - Solving Linear Equations](https://www.tutorialspoint.com/numpy/numpy_solving_linear_equations.htm), [NumPy - Eigenvalues](https://www.tutorialspoint.com/numpy/numpy_eigenvalues.htm), [NumPy - Matrix Norms](https://www.tutorialspoint.com/numpy/numpy_matrix_norms.htm)
