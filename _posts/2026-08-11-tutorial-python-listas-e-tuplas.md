---
layout: post
title: "#5 - Listas e Tuplas"
date: 2026-08-11 09:20:00
image: '/assets/img/posts/tutorial-python-listas-e-tuplas.webp'
description: Como criar, acessar, modificar e percorrer listas e tuplas em Python, e a diferença fundamental entre essas duas estruturas de dados.
category: 'dev'
tags:
- Python
- Programação
- Listas
twitter_text: Listas e Tuplas em Python
introduction: "Nesta parte do tutorial, você vai aprender a trabalhar com listas e tuplas, duas das estruturas de dados mais usadas em Python."
---

Chegamos nas estruturas de dados de verdade. Esse post cobre duas delas: _listas_ e _tuplas_. As duas guardam coleções ordenadas de valores e se parecem bastante na sintaxe, mas têm uma diferença fundamental entre si — e é justamente essa diferença que define quando usar cada uma.

## Listas

Uma _lista_ é uma coleção ordenada e **mutável** de itens, criada com colchetes `[]`. Pode misturar tipos de dados diferentes dentro da mesma lista, embora na prática seja mais comum guardar itens do mesmo tipo:

```py
frutas = ["maçã", "banana", "laranja"]
numeros = [1, 2, 3, 4, 5]
misturada = ["Python", 3, True, 3.14]

print(frutas)
print(type(frutas))
```

```py
['maçã', 'banana', 'laranja']
<class 'list'>
```

### Acessando itens

Igual às strings, os itens de uma lista têm índice começando em `0`, e também aceitam índices negativos e slicing:

```py
frutas = ["maçã", "banana", "laranja", "uva", "manga"]

print(frutas[0])       # primeiro item
print(frutas[-1])      # último item
print(frutas[1:3])     # da posição 1 até a 2
print(frutas[:2])      # os dois primeiros
```

```py
maçã
manga
['banana', 'laranja']
['maçã', 'banana']
```

Pra verificar se um item está na lista, use o operador `in` que a gente já viu no post sobre operadores:

```py
print("banana" in frutas)
```

```py
True
```

### Alterando itens

Diferente das strings, listas são **mutáveis** — você pode alterar um item existente atribuindo um novo valor pelo índice:

```py
frutas = ["maçã", "banana", "laranja"]
frutas[1] = "morango"
print(frutas)
```

```py
['maçã', 'morango', 'laranja']
```

Também dá pra alterar um intervalo inteiro de uma vez, usando slicing na atribuição:

```py
numeros = [1, 2, 3, 4, 5]
numeros[1:3] = [20, 30]
print(numeros)
```

```py
[1, 20, 30, 4, 5]
```

### Adicionando itens

```py
frutas = ["maçã", "banana"]

frutas.append("laranja")          # adiciona no final
print(frutas)

frutas.insert(1, "morango")       # insere numa posição específica
print(frutas)

frutas.extend(["uva", "manga"])   # adiciona vários itens de uma vez
print(frutas)
```

```py
['maçã', 'banana', 'laranja']
['maçã', 'morango', 'banana', 'laranja']
['maçã', 'morango', 'banana', 'laranja', 'uva', 'manga']
```

### Removendo itens

```py
frutas = ["maçã", "banana", "laranja", "uva"]

frutas.remove("banana")   # remove pelo valor
print(frutas)

item = frutas.pop()       # remove e retorna o último item (ou pelo índice, se passado)
print(item, frutas)

del frutas[0]              # remove pelo índice
print(frutas)

frutas.clear()             # esvazia a lista inteira
print(frutas)
```

```py
['maçã', 'laranja', 'uva']
uva ['maçã', 'laranja']
['laranja']
[]
```

### Percorrendo listas com loop

```py
frutas = ["maçã", "banana", "laranja"]

for fruta in frutas:
    print(fruta)
```

```py
maçã
banana
laranja
```

Se você precisa também do índice de cada item, use `enumerate()`:

```py
for indice, fruta in enumerate(frutas):
    print(indice, fruta)
```

```py
0 maçã
1 banana
2 laranja
```

### List comprehension

_List comprehension_ é uma forma compacta e muito usada em Python de criar uma lista nova a partir de outra, aplicando uma transformação e opcionalmente um filtro, tudo em uma linha só:

```py
numeros = [1, 2, 3, 4, 5, 6]

# forma tradicional, com loop
dobrados = []
for n in numeros:
    dobrados.append(n * 2)

# a mesma coisa, com list comprehension
dobrados = [n * 2 for n in numeros]
print(dobrados)

# com um filtro (só os pares)
pares = [n for n in numeros if n % 2 == 0]
print(pares)
```

```py
[2, 4, 6, 8, 10, 12]
[2, 4, 6]
```

### Ordenando listas

```py
numeros = [5, 2, 8, 1, 9]
numeros.sort()                       # ordena a própria lista (in place)
print(numeros)

numeros.sort(reverse=True)           # ordem decrescente
print(numeros)

nomes = ["Carla", "ana", "Bruno"]
nomes.sort(key=str.lower)            # ordena ignorando maiúsculas/minúsculas
print(nomes)
```

```py
[1, 2, 5, 8, 9]
[9, 8, 5, 2, 1]
['ana', 'Bruno', 'Carla']
```

> **Nota:** `sort()` altera a lista original e não retorna nada (retorna `None`). Se você quiser uma lista nova, ordenada, sem mexer na original, use a função `sorted(lista)`.

### Copiando listas (cuidado com a referência)

Esse é um dos erros mais comuns de quem está começando com Python. Se você faz `lista2 = lista1`, **não está criando uma cópia** — as duas variáveis passam a apontar pra mesma lista na memória:

```py
original = [1, 2, 3]
copia_errada = original
copia_errada.append(4)

print(original)       # também foi alterada!
print(copia_errada)
```

```py
[1, 2, 3, 4]
[1, 2, 3, 4]
```

Pra criar uma cópia de verdade, independente, use o método `.copy()` ou a função `list()`:

```py
original = [1, 2, 3]
copia = original.copy()
copia.append(4)

print(original)   # não foi alterada
print(copia)
```

```py
[1, 2, 3]
[1, 2, 3, 4]
```

### Juntando listas

```py
lista1 = ["a", "b", "c"]
lista2 = [1, 2, 3]

lista3 = lista1 + lista2       # com o operador +
print(lista3)

lista1.extend(lista2)          # com extend(), altera lista1
print(lista1)
```

```py
['a', 'b', 'c', 1, 2, 3]
['a', 'b', 'c', 1, 2, 3]
```

### Principais métodos de lista

| Método | O que faz |
|---|---|
| `append(x)` | Adiciona `x` no final |
| `insert(i, x)` | Insere `x` na posição `i` |
| `remove(x)` | Remove a primeira ocorrência de `x` |
| `pop(i)` | Remove e retorna o item da posição `i` (padrão: último) |
| `sort()` | Ordena a lista |
| `reverse()` | Inverte a ordem dos itens |
| `count(x)` | Conta quantas vezes `x` aparece |
| `index(x)` | Retorna a posição da primeira ocorrência de `x` |
| `copy()` | Retorna uma cópia independente da lista |

## Tuplas

Uma _tupla_ é praticamente igual a uma lista — coleção ordenada de itens — só que criada com parênteses `()` e, principalmente, **imutável**. Depois de criada, você não pode adicionar, remover ou alterar itens diretamente.

```py
cores = ("vermelho", "verde", "azul")
print(cores)
print(type(cores))
```

```py
('vermelho', 'verde', 'azul')
<class 'tuple'>
```

> **Nota:** pra criar uma tupla com um único item, é obrigatório colocar a vírgula depois do valor: `(1,)`. Sem a vírgula, `(1)` é só o número `1` entre parênteses, não uma tupla.

### Acessando itens

O acesso funciona exatamente igual ao de listas — índice, índice negativo e slicing:

```py
cores = ("vermelho", "verde", "azul", "amarelo")
print(cores[0])
print(cores[-1])
print(cores[1:3])
```

```py
vermelho
amarelo
('verde', 'azul')
```

### "Atualizando" uma tupla

Como tuplas são imutáveis, não existe um jeito de alterar um item existente. O truque comum pra simular uma atualização é converter a tupla pra lista, alterar a lista, e converter de volta:

```py
cores = ("vermelho", "verde", "azul")

lista_temp = list(cores)
lista_temp[1] = "amarelo"
cores = tuple(lista_temp)

print(cores)
```

```py
('vermelho', 'amarelo', 'azul')
```

Você também pode "adicionar" itens concatenando com outra tupla (o que na verdade cria uma tupla nova):

```py
cores = ("vermelho", "verde")
cores = cores + ("azul",)
print(cores)
```

```py
('vermelho', 'verde', 'azul')
```

### Unpacking (desempacotamento)

Um dos usos mais elegantes de tupla é atribuir seus itens diretamente a várias variáveis de uma vez, na mesma ordem:

```py
coordenada = (10, 20)
x, y = coordenada

print(x)
print(y)
```

```py
10
20
```

Se a tupla tiver mais itens do que variáveis, dá pra usar `*` pra "sobrar" o restante numa lista:

```py
numeros = (1, 2, 3, 4, 5)
primeiro, *meio, ultimo = numeros

print(primeiro)
print(meio)
print(ultimo)
```

```py
1
[2, 3, 4]
5
```

### Percorrendo tuplas com loop

```py
cores = ("vermelho", "verde", "azul")

for cor in cores:
    print(cor)
```

```py
vermelho
verde
azul
```

### Juntando tuplas

```py
tupla1 = ("a", "b", "c")
tupla2 = (1, 2, 3)

tupla3 = tupla1 + tupla2
print(tupla3)
```

```py
('a', 'b', 'c', 1, 2, 3)
```

### Principais métodos de tupla

Como tuplas são imutáveis, elas têm bem menos métodos do que listas — só dois, na verdade:

| Método | O que faz |
|---|---|
| `count(x)` | Conta quantas vezes `x` aparece |
| `index(x)` | Retorna a posição da primeira ocorrência de `x` |

```py
numeros = (1, 2, 2, 3, 2, 4)
print(numeros.count(2))
print(numeros.index(3))
```

```py
3
3
```

## Lista ou tupla: quando usar cada uma

A diferença central entre as duas é **mutabilidade**: listas podem ser alteradas depois de criadas, tuplas não. Na prática, isso guia a escolha:

- Use **lista** quando a coleção vai crescer, encolher ou ter itens alterados ao longo do programa (ex: um carrinho de compras, um histórico que vai sendo preenchido).
- Use **tupla** quando os dados são fixos e não deveriam mudar (ex: coordenadas `(x, y)`, os dias da semana, valores de retorno de uma função que sempre tem o mesmo formato). Como bônus, tuplas ocupam menos memória e são um pouco mais rápidas de percorrer do que listas.

E essas são as duas estruturas de dados mais fundamentais do Python pra guardar coleções ordenadas de valores. No próximo post da série, vamos falar de duas outras estruturas de dados essenciais: sets e dicionários.

**Fonte adaptada:** [Python Lists](https://www.w3schools.com/python/python_lists.asp), [Python - Access List Items](https://www.w3schools.com/python/python_lists_access.asp), [Python - Change List Items](https://www.w3schools.com/python/python_lists_change.asp), [Python - Add List Items](https://www.w3schools.com/python/python_lists_add.asp), [Python - Remove List Items](https://www.w3schools.com/python/python_lists_remove.asp), [Python - Loop Lists](https://www.w3schools.com/python/python_lists_loop.asp), [Python - List Comprehension](https://www.w3schools.com/python/python_lists_comprehension.asp), [Python - Sort Lists](https://www.w3schools.com/python/python_lists_sort.asp), [Python - Copy Lists](https://www.w3schools.com/python/python_lists_copy.asp), [Python - Join Lists](https://www.w3schools.com/python/python_lists_join.asp), [Python List Methods](https://www.w3schools.com/python/python_lists_methods.asp), [Python Tuples](https://www.w3schools.com/python/python_tuples.asp), [Python - Access Tuple Items](https://www.w3schools.com/python/python_tuples_access.asp), [Python - Update Tuples](https://www.w3schools.com/python/python_tuples_update.asp), [Python - Unpack Tuples](https://www.w3schools.com/python/python_tuples_unpack.asp), [Python - Loop Tuples](https://www.w3schools.com/python/python_tuples_loop.asp), [Python - Join Tuples](https://www.w3schools.com/python/python_tuples_join.asp), [Python Tuple Methods](https://www.w3schools.com/python/python_tuples_methods.asp)
