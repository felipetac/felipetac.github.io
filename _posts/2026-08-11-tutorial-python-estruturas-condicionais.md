---
layout: post
title: "#7 - Estruturas Condicionais"
date: 2026-08-11 10:00:00
image: '/assets/img/posts/tutorial-python-estruturas-condicionais.png'
description: Como usar if, elif e else em Python, a sintaxe compacta de uma linha, condicionais aninhadas, o statement pass e uma introdução ao match/case.
category: 'dev'
tags:
- Python
- Programação
- Condicionais
twitter_text: Estruturas Condicionais em Python
introduction: "Nesta parte do tutorial, você vai aprender a tomar decisões no seu código com if, elif, else e a nova estrutura match/case."
---

Fechando essa primeira leva do tutorial de Python, chegou a hora de aprender a fazer o programa tomar decisões. É isso que as estruturas condicionais fazem: executam um bloco de código diferente dependendo se uma condição é verdadeira ou falsa. Em Python, isso é feito principalmente com `if`, `elif` e `else`.

## A estrutura básica: if

Uma condição em Python é qualquer expressão que resulta em `True` ou `False` (lembra dos operadores de comparação e lógicos, que vimos no post 4?). O bloco depois do `if` só executa se a condição for verdadeira:

```py
idade = 20

if idade >= 18:
    print("Você é maior de idade")
```

```py
Você é maior de idade
```

Repare, de novo, que o Python usa indentação pra definir o que faz parte do bloco `if` — não tem chaves nem palavra-chave `end`. Se a condição fosse falsa, nada seria impresso, porque não existe nenhuma alternativa definida ainda.

## else: o caminho alternativo

`else` define o que acontece quando a condição do `if` é falsa:

```py
idade = 15

if idade >= 18:
    print("Você é maior de idade")
else:
    print("Você é menor de idade")
```

```py
Você é menor de idade
```

## elif: encadeando várias condições

Quando você tem mais de duas possibilidades, usa `elif` (abreviação de "else if") pra encadear outras condições antes do `else` final:

```py
nota = 7

if nota >= 9:
    print("Conceito A")
elif nota >= 7:
    print("Conceito B")
elif nota >= 5:
    print("Conceito C")
else:
    print("Reprovado")
```

```py
Conceito B
```

O Python avalia as condições **na ordem em que aparecem** e para no primeiro `if`/`elif` que for verdadeiro — os demais nem chegam a ser avaliados. Por isso a ordem das condições importa: se você colocasse `nota >= 5` antes de `nota >= 7`, o resultado do exemplo acima estaria errado, já que `7 >= 5` também é verdadeiro.

> **Nota:** `elif` pode aparecer quantas vezes forem necessárias dentro do mesmo bloco, mas `else` só pode aparecer uma vez, sempre por último.

## Sintaxe compacta (shorthand if)

Quando o bloco `if` só tem uma linha, dá pra escrever tudo em uma linha só, sem quebrar:

```py
idade = 20
if idade >= 18: print("Maior de idade")
```

Isso também funciona pra `if/else`, embora aí normalmente valha mais a pena usar o operador ternário que vimos no post sobre operadores:

```py
idade = 20
print("Maior de idade") if idade >= 18 else print("Menor de idade")
```

> **Nota:** essa forma compacta é útil pra scripts curtos ou condições bem simples, mas some o costume rápido se você abusar dela — pra lógica com mais de uma linha, prefira sempre a sintaxe tradicional com indentação, que é bem mais legível.

## Combinando operadores lógicos na condição

É super comum combinar mais de uma condição usando `and`, `or` e `not` (que já vimos no post 4 sobre operadores):

```py
idade = 25
tem_carteira = True

if idade >= 18 and tem_carteira:
    print("Pode dirigir")
else:
    print("Não pode dirigir")
```

```py
Pode dirigir
```

```py
dia = "sábado"

if dia == "sábado" or dia == "domingo":
    print("É fim de semana")
else:
    print("É dia de semana")
```

```py
É fim de semana
```

E dá pra usar `not` pra inverter o resultado de uma condição:

```py
logado = False

if not logado:
    print("Faça login para continuar")
```

```py
Faça login para continuar
```

## if aninhado

Você pode colocar um `if` dentro de outro `if`, criando níveis de decisão mais específicos dentro de uma condição já verdadeira:

```py
idade = 20
tem_documento = True

if idade >= 18:
    print("Maior de idade")
    if tem_documento:
        print("Pode entrar no evento")
    else:
        print("Precisa apresentar documento")
else:
    print("Menor de idade, entrada não permitida")
```

```py
Maior de idade
Pode entrar no evento
```

> **Nota:** condicionais aninhadas em excesso deixam o código difícil de ler (o famoso "código em escada"). Muitas vezes dá pra simplificar juntando as condições com `and`, como no exemplo anterior com carteira de motorista — vale sempre considerar essa opção antes de aninhar.

## O statement pass

Em Python, um bloco `if` (ou `for`, `while`, função etc.) não pode ficar vazio — se você escrever a condição e não colocar nada indentado embaixo, o interpretador lança um erro de sintaxe. Quando você ainda não decidiu o que fazer ali, mas precisa que o código rode sem quebrar, usa o `pass`:

```py
idade = 15

if idade >= 18:
    pass  # TODO: implementar lógica de maior de idade depois
else:
    print("Menor de idade")
```

`pass` é um "não-operação" — o interpretador executa ele, mas nada acontece de fato. É só um placeholder sintático, diferente de um comentário, que é totalmente ignorado pelo interpretador:

```py
if idade >= 18:
```

```py
IndentationError: expected an indented block after 'if' statement on line 1
```

```py
if idade >= 18:
    pass
```

```py
(nenhum erro, nenhuma saída — o bloco só não faz nada)
```

## match / case: uma alternativa mais recente

Desde o Python 3.10, existe uma estrutura chamada `match`, parecida com o `switch/case` de outras linguagens. Ela compara um valor contra vários padrões possíveis e executa o bloco correspondente ao primeiro `case` que combinar:

```py
dia = 3

match dia:
    case 1:
        print("Segunda-feira")
    case 2:
        print("Terça-feira")
    case 3:
        print("Quarta-feira")
    case _:
        print("Dia inválido")
```

```py
Quarta-feira
```

O `case _` funciona como um "coringa", parecido com o `else` de um `if/elif/else` — é o caso padrão, executado quando nenhum dos anteriores combina. Dá pra combinar vários valores no mesmo `case` usando `|` (como um "ou"):

```py
dia = 6

match dia:
    case 1 | 2 | 3 | 4 | 5:
        print("Dia de semana")
    case 6 | 7:
        print("Fim de semana")
    case _:
        print("Dia inválido")
```

```py
Fim de semana
```

Também dá pra adicionar uma condição extra a um `case`, usando `if` depois do padrão (chamado de _guard_):

```py
idade = 16

match idade:
    case idade if idade < 12:
        print("Criança")
    case idade if idade < 18:
        print("Adolescente")
    case _:
        print("Adulto")
```

```py
Adolescente
```

> **Nota:** `match/case` exige Python 3.10 ou superior — se o seu ambiente tiver uma versão mais antiga (confira com `python3 --version`, como vimos no post 1), a sintaxe nem vai ser reconhecida. Pra código que precisa rodar em versões mais antigas, o encadeamento tradicional com `if/elif/else` continua sendo o caminho seguro.

Pronto, agora você já sabe fazer seu programa tomar decisões — do `if` mais simples ao `match/case` mais moderno. Isso fecha essa primeira leva de sete posts do tutorial de Python: da introdução à linguagem até estruturas condicionais, você já tem uma base sólida pra escrever scripts de verdade. Os próximos capítulos da série vão seguir com loops, funções e outros tópicos mais avançados.

**Fonte adaptada:** [Python Conditions](https://www.w3schools.com/python/python_conditions.asp), [Python - The elif Statement](https://www.w3schools.com/python/python_if_elif.asp), [Python - The else Statement](https://www.w3schools.com/python/python_if_else.asp), [Python - Short Hand If](https://www.w3schools.com/python/python_if_shorthand.asp), [Python Logical Operators](https://www.w3schools.com/python/python_if_logical.asp), [Python - Nested If](https://www.w3schools.com/python/python_if_nested_if.asp), [Python - The pass Statement](https://www.w3schools.com/python/python_if_pass.asp), [Python Match Statement](https://www.w3schools.com/python/python_match.asp)
