---
layout: post
title: "#3 - Strings em Python"
date: 2026-08-11 08:40:00
image: '/assets/img/posts/tutorial-python-strings.webp'
description: Como criar, indexar, fatiar e formatar strings em Python, além dos principais métodos de manipulação de texto da linguagem.
category: 'dev'
tags:
- Python
- Programação
- Strings
twitter_text: Strings em Python
introduction: "Nesta parte do tutorial, você vai aprender a criar, manipular e formatar strings em Python."
---

Texto é provavelmente o tipo de dado mais manipulado em qualquer linguagem de programação, e em Python não é diferente. Nesse post da série de tutorial, vamos explorar a fundo o tipo `str`: como criar, acessar pedaços de uma string, os principais métodos prontos da linguagem e as formas modernas de formatar texto.

## Criando strings

Uma _string_ é simplesmente um texto entre aspas — pode ser aspas simples ou duplas, o Python trata as duas formas como equivalentes:

```py
nome = "Felipe"
sobrenome = 'Toscano'

print(nome)
print(sobrenome)
```

Pra strings de várias linhas, use aspas triplas (`"""` ou `'''`):

```py
texto = """
Esse é um texto
que ocupa
várias linhas.
"""
print(texto)
```

Internamente, o Python representa uma string como uma sequência de caracteres — e é justamente por ser uma sequência que dá pra indexar e fatiar ela, como você vai ver a seguir.

## Indexação: acessando caracteres individuais

Cada caractere de uma string tem uma posição (um índice), começando em `0` pro primeiro caractere. Pra acessar um caractere específico, use colchetes:

```py
palavra = "Python"
print(palavra[0])   # primeiro caractere
print(palavra[3])   # quarto caractere
```

```py
P
h
```

Índices negativos contam a partir do final da string, com `-1` sendo o último caractere:

```py
palavra = "Python"
print(palavra[-1])   # último caractere
print(palavra[-2])   # penúltimo caractere
```

```py
n
o
```

## Slicing: pegando pedaços da string

Além de acessar um caractere por vez, dá pra pegar um intervalo inteiro usando a notação `[inicio:fim]`. O caractere na posição `inicio` entra, o da posição `fim` não entra — é um intervalo "aberto" no final:

```py
frase = "Aprendendo Python"

print(frase[0:10])    # do índice 0 até o 9
print(frase[11:])     # do índice 11 até o final
print(frase[:10])     # do começo até o índice 9
print(frase[-6:])     # os 6 últimos caracteres
```

```py
Aprendendo
Python
Aprendendo
Python
```

Também dá pra passar um terceiro número, o "passo" (_step_), pra pular caracteres:

```py
alfabeto = "abcdefghij"
print(alfabeto[::2])    # pega de 2 em 2
print(alfabeto[::-1])   # passo negativo inverte a string
```

```py
acegi
jihgfedcba
```

> **Nota:** `texto[::-1]` é um truque bem conhecido pra inverter uma string em Python sem precisar escrever um loop.

## Strings são imutáveis

Diferente de listas, strings **não podem ser alteradas** depois de criadas. Se você tentar mudar um caractere pelo índice, o Python lança um erro:

```py
palavra = "Python"
palavra[0] = "J"
```

```py
TypeError: 'str' object does not support item assignment
```

Pra "modificar" uma string, o que você realmente faz é criar uma string nova a partir da original — seja concatenando pedaços, seja usando um dos métodos que a gente vê a seguir.

## Métodos úteis para modificar e inspecionar strings

O tipo `str` vem com dezenas de métodos prontos. Aqui vão os que mais aparecem no dia a dia:

### upper() e lower()

Convertem a string inteira pra maiúsculas ou minúsculas:

```py
texto = "Python é Divertido"
print(texto.upper())
print(texto.lower())
```

```py
PYTHON É DIVERTIDO
python é divertido
```

### strip()

Remove espaços em branco (ou outros caracteres, se especificado) do início e do fim da string — muito útil pra limpar texto vindo de input do usuário ou de um arquivo:

```py
texto = "   dados sujos   "
print(texto.strip())
print(f"'{texto.strip()}'")
```

```py
dados sujos
'dados sujos'
```

### replace()

Substitui todas as ocorrências de um trecho por outro:

```py
frase = "Eu gosto de Java"
print(frase.replace("Java", "Python"))
```

```py
Eu gosto de Python
```

### split()

Quebra a string em uma lista, usando um separador (o padrão é espaço em branco):

```py
frase = "Python,Java,JavaScript,Go"
linguagens = frase.split(",")
print(linguagens)
```

```py
['Python', 'Java', 'JavaScript', 'Go']
```

### Outros métodos comuns

```py
texto = "Tutorial de Python"

print(len(texto))              # tamanho da string (não é método, é função nativa)
print(texto.startswith("Tut")) # começa com esse prefixo?
print(texto.endswith("thon"))  # termina com esse sufixo?
print(texto.find("de"))        # posição da primeira ocorrência (-1 se não achar)
print(texto.count("t"))        # quantas vezes "t" aparece
print(texto.title())           # primeira letra de cada palavra maiúscula
```

```py
19
True
True
9
2
Tutorial De Python
```

> **Nota:** todo método de string retorna uma **string nova** — nenhum deles altera a string original, já que strings são imutáveis, como vimos acima.

## Concatenação de strings

A forma mais direta de juntar strings é com o operador `+`:

```py
nome = "Felipe"
sobrenome = "Toscano"
nome_completo = nome + " " + sobrenome
print(nome_completo)
```

```py
Felipe Toscano
```

Também dá pra usar `+=` pra ir concatenando aos poucos:

```py
mensagem = "Olá"
mensagem += ", "
mensagem += "mundo!"
print(mensagem)
```

```py
Olá, mundo!
```

> **Nota:** concatenar strings com `+` funciona bem pra poucos casos, mas fica ineficiente e difícil de ler quando você precisa misturar texto com várias variáveis. Pra isso, o Python tem uma ferramenta bem melhor: as f-strings, que a gente vê a seguir.

## Formatando strings com f-strings

Desde o Python 3.6, a forma recomendada de formatar strings é usando **f-strings** (_formatted string literals_). Basta colocar um `f` antes das aspas e usar chaves `{}` pra inserir variáveis ou expressões diretamente no texto:

```py
nome = "Felipe"
idade = 30

mensagem = f"Meu nome é {nome} e eu tenho {idade} anos"
print(mensagem)
```

```py
Meu nome é Felipe e eu tenho 30 anos
```

O que fica dentro das chaves não precisa ser só uma variável — pode ser qualquer expressão Python válida, incluindo contas e chamadas de função:

```py
preco = 49.9
quantidade = 3

print(f"Total: {preco * quantidade}")
print(f"Nome em maiúsculas: {nome.upper()}")
```

```py
Total: 149.7
Nome em maiúsculas: FELIPE
```

### Formatando números com f-strings

Depois de dois-pontos `:`, dá pra aplicar um modificador de formatação. O mais comum é controlar quantas casas decimais aparecem:

```py
preco = 49.9
print(f"O produto custa R$ {preco:.2f}")
```

```py
O produto custa R$ 49.90
```

Outros modificadores úteis incluem separador de milhar (`,`), formatação em porcentagem (`%`) e alinhamento de texto com largura fixa:

```py
populacao = 1500000
taxa = 0.153

print(f"População: {populacao:,}")
print(f"Taxa: {taxa:.1%}")
```

```py
População: 1,500,000
Taxa: 15.3%
```

## O método format()

Antes das f-strings existirem, o jeito recomendado de formatar strings era com o método `.format()`. Ele ainda funciona e aparece bastante em código mais antigo, mas hoje as f-strings são preferidas por serem mais diretas e mais rápidas:

```py
nome = "Felipe"
idade = 30

mensagem = "Meu nome é {} e eu tenho {} anos".format(nome, idade)
print(mensagem)
```

Dá pra usar índices ou nomes dentro das chaves pra deixar mais explícito qual valor vai em qual lugar:

```py
mensagem = "Meu nome é {0} e minha idade é {1}. {0} programa em Python.".format(nome, idade)
print(mensagem)
```

```py
Meu nome é Felipe e minha idade é 30. Felipe programa em Python.
```

## Caracteres de escape

Como strings são delimitadas por aspas, às vezes você precisa incluir dentro do texto um caractere que teria significado especial (como a própria aspa) — pra isso existe a barra invertida `\`, o caractere de escape:

```py
frase = "Ele disse \"Python é ótimo\""
print(frase)

caminho = "C:\\Users\\Felipe"
print(caminho)
```

```py
Ele disse "Python é ótimo"
C:\Users\Felipe
```

Alguns dos escapes mais usados:

| Escape | Significado |
|---|---|
| `\'` | Aspa simples |
| `\"` | Aspa dupla |
| `\\` | Barra invertida |
| `\n` | Quebra de linha |
| `\t` | Tabulação |

```py
print("Primeira linha\nSegunda linha")
print("Coluna1\tColuna2")
```

```py
Primeira linha
Segunda linha
Coluna1	Coluna2
```

E esse é o básico (bem completo, aliás) sobre strings em Python: dá pra indexar, fatiar, transformar com métodos prontos e formatar de um jeito bem legível com f-strings. No próximo post da série, a gente parte pros operadores.

**Fonte adaptada:** [Python Strings](https://www.w3schools.com/python/python_strings.asp), [Python - Slicing Strings](https://www.w3schools.com/python/python_strings_slicing.asp), [Python - Modify Strings](https://www.w3schools.com/python/python_strings_modify.asp), [Python - String Concatenation](https://www.w3schools.com/python/python_strings_concatenate.asp), [Python - String Format](https://www.w3schools.com/python/python_strings_format.asp), [Python - Escape Characters](https://www.w3schools.com/python/python_strings_escape.asp), [Python - String Methods](https://www.w3schools.com/python/python_strings_methods.asp), [Python String Formatting](https://www.w3schools.com/python/python_string_formatting.asp)
