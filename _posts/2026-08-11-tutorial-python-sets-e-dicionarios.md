---
layout: post
title: "#6 - Sets e Dicionários"
date: 2026-08-11 09:40:00
image: '/assets/img/posts/tutorial-python-sets-e-dicionarios.webp'
description: Como criar e manipular sets e dicionários em Python, incluindo frozenset, dicionários aninhados e os principais métodos de cada estrutura.
category: 'dev'
tags:
- Python
- Programação
- Dicionários
twitter_text: Sets e Dicionários em Python
introduction: "Nesta parte do tutorial, você vai aprender a trabalhar com sets e dicionários, fechando o conjunto de estruturas de dados nativas do Python."
---

Fechando o bloco de estruturas de dados nativas do Python, esse post cobre _sets_ e _dicionários_. São duas estruturas bem diferentes entre si — set é uma coleção sem ordem definida e sem duplicados, dicionário guarda pares chave-valor — mas ambas extremamente úteis no dia a dia.

## Sets

Um _set_ é uma coleção **não-ordenada** e **sem itens duplicados**, criada com chaves `{}`:

```py
frutas = {"maçã", "banana", "laranja"}
print(frutas)
print(type(frutas))
```

```py
{'banana', 'maçã', 'laranja'}
<class 'set'>
```

Repare que a ordem de exibição não necessariamente é a mesma ordem em que os itens foram inseridos — sets não garantem ordem. E se você tentar colocar um valor duplicado, ele simplesmente é ignorado:

```py
numeros = {1, 2, 3, 2, 1}
print(numeros)
```

```py
{1, 2, 3}
```

> **Nota:** pra criar um set vazio, use `set()`, e não `{}` — `{}` sozinho cria um dicionário vazio, não um set.

### Acessando itens

Como sets não têm índice (afinal, não há ordem garantida), não dá pra acessar um item pela posição como em listas. O jeito de verificar se um valor está presente é com `in`, e pra percorrer todos os itens, um loop:

```py
frutas = {"maçã", "banana", "laranja"}

print("banana" in frutas)

for fruta in frutas:
    print(fruta)
```

```py
True
maçã
banana
laranja
```

### Adicionando itens

```py
frutas = {"maçã", "banana"}

frutas.add("laranja")                  # adiciona um item
print(frutas)

frutas.update(["uva", "manga"])        # adiciona vários itens de uma vez
print(frutas)
```

```py
{'maçã', 'banana', 'laranja'}
{'maçã', 'banana', 'laranja', 'uva', 'manga'}
```

### Removendo itens

```py
frutas = {"maçã", "banana", "laranja"}

frutas.remove("banana")   # lança erro se o item não existir
print(frutas)

frutas.discard("uva")     # não lança erro se o item não existir
print(frutas)

item = frutas.pop()        # remove um item arbitrário (sets não têm ordem)
print(item, frutas)

frutas.clear()             # esvazia o set
print(frutas)
```

```py
{'maçã', 'laranja'}
{'maçã', 'laranja'}
laranja {'maçã'}
set()
```

### Juntando sets

Além de `update()`, sets têm operações inspiradas direto na matemática de conjuntos:

```py
a = {1, 2, 3}
b = {3, 4, 5}

print(a.union(b))          # união: todos os itens dos dois
print(a.intersection(b))   # interseção: só o que está nos dois
print(a.difference(b))     # diferença: o que está em a mas não em b
```

```py
{1, 2, 3, 4, 5}
{3}
{1, 2}
```

### frozenset

_frozenset_ é a versão imutável de um set — depois de criado, não dá pra adicionar ou remover itens. É útil, por exemplo, quando você precisa de um conjunto que sirva como chave de dicionário (sets normais não podem ser chave, porque são mutáveis):

```py
cores = frozenset(["vermelho", "verde", "azul"])
print(cores)

cores.add("amarelo")
```

```py
frozenset({'vermelho', 'verde', 'azul'})
```

```py
AttributeError: 'frozenset' object has no attribute 'add'
```

### Principais métodos de set

| Método | O que faz |
|---|---|
| `add(x)` | Adiciona um item |
| `update(iteravel)` | Adiciona vários itens |
| `remove(x)` | Remove `x` (erro se não existir) |
| `discard(x)` | Remove `x` (sem erro se não existir) |
| `union(outro)` | Retorna a união com outro set |
| `intersection(outro)` | Retorna a interseção com outro set |
| `difference(outro)` | Retorna a diferença com outro set |
| `clear()` | Remove todos os itens |

## Dicionários

Um _dicionário_ guarda dados em pares **chave-valor**, criado com chaves `{}` no formato `chave: valor`. É provavelmente a estrutura de dados mais usada em Python depois das listas:

```py
pessoa = {
    "nome": "Felipe",
    "idade": 30,
    "cidade": "São Paulo"
}

print(pessoa)
print(type(pessoa))
```

```py
{'nome': 'Felipe', 'idade': 30, 'cidade': 'São Paulo'}
<class 'dict'>
```

> **Nota:** desde o Python 3.7, dicionários mantêm a ordem de inserção dos itens — diferente de sets, que não garantem ordem nenhuma.

### Acessando itens

O acesso é feito pela chave, entre colchetes, ou pelo método `.get()` (que é mais seguro, porque não lança erro se a chave não existir):

```py
pessoa = {"nome": "Felipe", "idade": 30}

print(pessoa["nome"])
print(pessoa.get("idade"))
print(pessoa.get("profissao"))            # chave inexistente: retorna None
print(pessoa.get("profissao", "não informado"))  # com valor padrão
```

```py
Felipe
30
None
não informado
```

### Alterando itens

```py
pessoa = {"nome": "Felipe", "idade": 30}
pessoa["idade"] = 31
print(pessoa)

pessoa.update({"idade": 32, "cidade": "São Paulo"})
print(pessoa)
```

```py
{'nome': 'Felipe', 'idade': 31}
{'nome': 'Felipe', 'idade': 32, 'cidade': 'São Paulo'}
```

### Adicionando itens

Adicionar um item novo é igual a alterar um existente: se a chave não existe ainda, o Python cria ela:

```py
pessoa = {"nome": "Felipe"}
pessoa["profissao"] = "Desenvolvedor"
print(pessoa)
```

```py
{'nome': 'Felipe', 'profissao': 'Desenvolvedor'}
```

### Removendo itens

```py
pessoa = {"nome": "Felipe", "idade": 30, "cidade": "São Paulo"}

pessoa.pop("idade")           # remove pela chave e retorna o valor
print(pessoa)

del pessoa["cidade"]           # remove pela chave
print(pessoa)

pessoa.clear()                 # esvazia o dicionário
print(pessoa)
```

```py
{'nome': 'Felipe', 'cidade': 'São Paulo'}
{'nome': 'Felipe'}
{}
```

### Percorrendo dicionários com loop

```py
pessoa = {"nome": "Felipe", "idade": 30, "cidade": "São Paulo"}

for chave in pessoa:                 # por padrão, itera sobre as chaves
    print(chave)

for valor in pessoa.values():        # itera sobre os valores
    print(valor)

for chave, valor in pessoa.items():  # itera sobre chave e valor juntos
    print(chave, "->", valor)
```

```py
nome
idade
cidade
Felipe
30
São Paulo
nome -> Felipe
idade -> 30
cidade -> São Paulo
```

### Copiando dicionários

Assim como listas, atribuir `dict2 = dict1` não cria uma cópia — cria só uma segunda referência pro mesmo dicionário. Pra copiar de verdade, use `.copy()`:

```py
original = {"nome": "Felipe"}
copia_errada = original
copia_errada["nome"] = "Outro nome"
print(original)   # também mudou!

original = {"nome": "Felipe"}
copia = original.copy()
copia["nome"] = "Outro nome"
print(original)   # não mudou
print(copia)
```

```py
{'nome': 'Outro nome'}
{'nome': 'Felipe'}
{'nome': 'Outro nome'}
```

### Dicionários aninhados

Um dicionário pode ter outro dicionário como valor — isso é bem comum quando você está modelando dados mais complexos, como um registro com sub-registros:

```py
familia = {
    "filho1": {"nome": "Emília", "idade": 8},
    "filho2": {"nome": "Tobias", "idade": 5}
}

print(familia["filho2"]["nome"])
```

```py
Tobias
```

Percorrer um dicionário aninhado normalmente exige um loop dentro de outro:

```py
for filho, dados in familia.items():
    print(filho)
    for chave, valor in dados.items():
        print(f"  {chave}: {valor}")
```

```py
filho1
  nome: Emília
  idade: 8
filho2
  nome: Tobias
  idade: 5
```

### Principais métodos de dicionário

| Método | O que faz |
|---|---|
| `get(chave, padrao)` | Retorna o valor da chave (ou o padrão, se não existir) |
| `keys()` | Retorna todas as chaves |
| `values()` | Retorna todos os valores |
| `items()` | Retorna pares (chave, valor) |
| `update(outro_dict)` | Mescla outro dicionário no atual |
| `pop(chave)` | Remove a chave e retorna o valor |
| `clear()` | Remove todos os itens |

E com isso você fecha o quarteto de estruturas de dados nativas mais usadas em Python: listas, tuplas, sets e dicionários. No próximo post da série, a gente entra nas estruturas condicionais — `if`, `elif`, `else` e companhia.

**Fonte adaptada:** [Python Sets](https://www.w3schools.com/python/python_sets.asp), [Python - Access Set Items](https://www.w3schools.com/python/python_sets_access.asp), [Python - Add Set Items](https://www.w3schools.com/python/python_sets_add.asp), [Python - Remove Set Items](https://www.w3schools.com/python/python_sets_remove.asp), [Python - Loop Sets](https://www.w3schools.com/python/python_sets_loop.asp), [Python - Join Sets](https://www.w3schools.com/python/python_sets_join.asp), [Python - Frozenset](https://www.w3schools.com/python/python_frozenset.asp), [Python Set Methods](https://www.w3schools.com/python/python_sets_methods.asp), [Python Dictionaries](https://www.w3schools.com/python/python_dictionaries.asp), [Python - Access Dictionary Items](https://www.w3schools.com/python/python_dictionaries_access.asp), [Python - Change Dictionary Items](https://www.w3schools.com/python/python_dictionaries_change.asp), [Python - Add Dictionary Items](https://www.w3schools.com/python/python_dictionaries_add.asp), [Python - Remove Dictionary Items](https://www.w3schools.com/python/python_dictionaries_remove.asp), [Python - Loop Dictionaries](https://www.w3schools.com/python/python_dictionaries_loop.asp), [Python - Copy Dictionaries](https://www.w3schools.com/python/python_dictionaries_copy.asp), [Python - Nested Dictionaries](https://www.w3schools.com/python/python_dictionaries_nested.asp), [Python Dictionary Methods](https://www.w3schools.com/python/python_dictionaries_methods.asp)
