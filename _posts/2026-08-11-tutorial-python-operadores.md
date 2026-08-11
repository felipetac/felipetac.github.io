---
layout: post
title: "#4 - Operadores em Python"
date: 2026-08-11 09:00:00
image: '/assets/img/posts/tutorial-python-operadores.png'
description: Um panorama completo dos operadores do Python — aritméticos, de atribuição, comparação, lógicos, identidade, pertencimento, bit a bit e o operador ternário.
category: 'dev'
tags:
- Python
- Programação
- Operadores
twitter_text: Operadores em Python
introduction: "Nesta parte do tutorial, você vai conhecer todos os tipos de operadores disponíveis em Python e quando usar cada um."
---

Operadores são os símbolos que usamos pra realizar operações sobre variáveis e valores — somar números, comparar dois valores, combinar condições, entre outras coisas. Python tem um conjunto bem completo deles, divididos em categorias, e é isso que a gente cobre nesse post da série.

## As categorias de operadores

O Python organiza os operadores em sete grupos principais:

- **Aritméticos** — operações matemáticas básicas (`+`, `-`, `*`, `/` etc.)
- **De atribuição** — atribuir e atualizar valores de variáveis (`=`, `+=`, `-=` etc.)
- **De comparação** — comparar dois valores (`==`, `!=`, `>`, `<` etc.)
- **Lógicos** — combinar expressões booleanas (`and`, `or`, `not`)
- **De identidade** — comparar se duas variáveis são o mesmo objeto (`is`, `is not`)
- **De pertencimento** — verificar se um valor está contido em uma sequência (`in`, `not in`)
- **Bit a bit** — operações no nível dos bits (`&`, `|`, `^` etc.)

## Operadores aritméticos

Servem pra fazer contas. A maioria é intuitiva se você já estudou matemática básica:

```py
a = 10
b = 3

print(a + b)    # soma
print(a - b)    # subtração
print(a * b)    # multiplicação
print(a / b)    # divisão (sempre retorna float)
print(a % b)    # módulo (resto da divisão)
print(a ** b)   # exponenciação
print(a // b)   # divisão inteira (descarta a parte decimal)
```

```py
13
7
30
3.3333333333333335
1
1000
3
```

> **Nota:** `a / b` sempre devolve um `float`, mesmo que a divisão seja exata (`10 / 2` resulta em `5.0`, não `5`). Se você precisa de um `int`, use a divisão inteira `//`.

## Operadores de atribuição

O `=` já é bem conhecido — atribui um valor a uma variável. Mas existem versões combinadas que fazem uma operação e já reatribuem o resultado na mesma variável, economizando digitação:

```py
x = 10

x += 5   # equivalente a: x = x + 5
print(x)

x -= 2   # equivalente a: x = x - 2
print(x)

x *= 3   # equivalente a: x = x * 3
print(x)

x //= 4  # equivalente a: x = x // 4
print(x)
```

```py
15
13
39
9
```

Praticamente todo operador aritmético e bit a bit tem sua versão combinada com `=`: `+=`, `-=`, `*=`, `/=`, `%=`, `//=`, `**=`, `&=`, `|=`, `^=`, `>>=`, `<<=`.

## Operadores de comparação

Comparam dois valores e sempre retornam um `bool` (`True` ou `False`):

```py
a = 10
b = 20

print(a == b)   # igual a
print(a != b)   # diferente de
print(a > b)    # maior que
print(a < b)    # menor que
print(a >= 10)  # maior ou igual a
print(a <= 5)   # menor ou igual a
```

```py
False
True
False
True
True
False
```

> **Nota:** cuidado pra não confundir `=` (atribuição) com `==` (comparação de igualdade) — é um dos erros mais comuns de quem está começando.

## Operadores lógicos

Combinam expressões booleanas. São três: `and`, `or` e `not`.

```py
idade = 25
tem_carteira = True

print(idade >= 18 and tem_carteira)   # True só se as duas forem True
print(idade < 18 or tem_carteira)     # True se pelo menos uma for True
print(not tem_carteira)                # inverte o valor booleano
```

```py
True
True
False
```

### Combinando várias condições

Dá pra encadear vários operadores lógicos na mesma expressão, e o Python respeita a precedência entre eles (mais sobre isso já já):

```py
idade = 22
tem_cnh = True
tem_veiculo = False

pode_dirigir = idade >= 18 and tem_cnh and (tem_veiculo or True)
print(pode_dirigir)
```

```py
True
```

## Operadores de identidade

`is` e `is not` verificam se duas variáveis apontam pro **mesmo objeto na memória** — não se os valores são iguais, e sim se é literalmente o mesmo objeto. É uma diferença sutil, mas importante:

```py
a = [1, 2, 3]
b = [1, 2, 3]
c = a

print(a == b)   # True: os valores são iguais
print(a is b)   # False: são objetos diferentes na memória
print(a is c)   # True: c aponta pro mesmo objeto que a
```

```py
True
False
True
```

> **Nota:** é por isso que a comparação recomendada com `None` é `variavel is None`, e não `variavel == None` — `None` é um único objeto especial na memória, então faz mais sentido comparar identidade.

## Operadores de pertencimento

`in` e `not in` verificam se um valor está presente dentro de uma sequência, como uma string, lista ou tupla:

```py
linguagens = ["Python", "Java", "Go"]

print("Python" in linguagens)
print("Ruby" in linguagens)
print("Ruby" not in linguagens)

frase = "Aprendendo Python"
print("Python" in frase)
```

```py
True
False
True
True
```

## Operadores bit a bit

Trabalham diretamente na representação binária dos números. São menos comuns no dia a dia de quem está começando, mas aparecem em cenários como manipulação de flags, criptografia e otimizações de baixo nível:

```py
a = 10  # 1010 em binário
b = 4   # 0100 em binário

print(a & b)    # E bit a bit
print(a | b)    # OU bit a bit
print(a ^ b)    # OU exclusivo (XOR)
print(~a)       # NÃO (inverte todos os bits)
print(a << 2)   # desloca os bits pra esquerda
print(a >> 2)   # desloca os bits pra direita
```

```py
0
14
14
-11
40
2
```

## Precedência de operadores

Quando uma expressão tem vários operadores misturados, o Python segue uma ordem de precedência pra decidir o que calcular primeiro — igual você aprendeu na matemática do colégio, onde multiplicação vem antes de soma. Do mais alto (executa primeiro) pro mais baixo, de forma resumida:

1. Parênteses `()`
2. Exponenciação `**`
3. Multiplicação, divisão, módulo (`*`, `/`, `//`, `%`)
4. Soma e subtração (`+`, `-`)
5. Comparações (`==`, `!=`, `>`, `<` etc.)
6. `not`
7. `and`
8. `or`

```py
resultado = 2 + 3 * 4
print(resultado)   # multiplicação primeiro: 2 + 12

resultado2 = (2 + 3) * 4
print(resultado2)  # parênteses forçam a soma primeiro: 5 * 4
```

```py
14
20
```

> **Nota:** na dúvida sobre a ordem em que uma expressão vai ser avaliada, use parênteses. Deixa o código mais lento? Não, o custo é irrelevante. Deixa mais legível e menos propenso a erro? Com certeza.

## Operador ternário (expressão condicional)

O Python não tem um operador ternário no formato `condição ? valor1 : valor2` como em outras linguagens, mas tem uma forma equivalente, mais legível, na própria sintaxe:

```py
idade = 20
status = "maior de idade" if idade >= 18 else "menor de idade"
print(status)
```

```py
maior de idade
```

É basicamente um `if/else` resumido em uma linha só, útil quando você só precisa escolher entre dois valores pra atribuir a uma variável. Dá até pra encadear várias condições, embora isso comece a prejudicar a leitura rapidinho:

```py
nota = 7
conceito = "A" if nota >= 9 else "B" if nota >= 7 else "C" if nota >= 5 else "D"
print(conceito)
```

```py
B
```

> **Nota:** prefira o operador ternário só pra decisões simples de uma linha. Se a lógica começar a ficar complexa, um `if/elif/else` tradicional (que a gente vai ver em detalhe no último post dessa leva) é bem mais legível.

Com esse post, você fechou a visão geral de praticamente todos os operadores que vai usar no dia a dia com Python. No próximo post da série, entramos de vez nas estruturas de dados, começando por listas e tuplas.

**Fonte adaptada:** [Python Operators](https://www.w3schools.com/python/python_operators.asp), [Python - Arithmetic Operators](https://www.w3schools.com/python/python_operators_arithmetic.asp), [Python - Assignment Operators](https://www.w3schools.com/python/python_operators_assign.asp), [Python - Comparison Operators](https://www.w3schools.com/python/python_operators_comparison.asp), [Python Logical Operators](https://www.w3schools.com/python/python_operators_logical.asp), [Python - Identity Operators](https://www.w3schools.com/python/python_operators_identity.asp), [Python - Membership Operators](https://www.w3schools.com/python/python_operators_membership.asp), [Python - Bitwise Operators](https://www.w3schools.com/python/python_operators_bitwise.asp), [Python Operator Precedence](https://www.w3schools.com/python/python_operators_precedence.asp), [Python Ternary Operator](https://www.w3schools.com/python/python_ternary_operator.asp)
