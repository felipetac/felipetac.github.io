---
layout: post
title: "Estruturas de Dados #5 - Tabelas Hash"
date: 2026-09-25 09:20:00
image: '/assets/img/posts/dsa-tabelas-hash.webp'
description: Como construir uma tabela hash do zero em Python - função hash, inserção, busca rápida, e como lidar com colisões usando chaining.
category: 'dev'
tags:
- Python
- Programação
- Hash Tables
twitter_text: "Estruturas de Dados #5 - Tabelas Hash"
introduction: "Nesta parte da série, você vai aprender a construir uma tabela hash do zero em Python, e como ela consegue buscar dados muito mais rápido que uma lista."
---

Nas listas encadeadas do post anterior, achar um valor específico significa percorrer nó por nó até encontrar o que procura — o mesmo vale pra uma busca comum numa lista. Uma **tabela hash** (hash table) resolve esse problema de outro jeito: em vez de percorrer tudo, ela calcula diretamente _onde_ um valor deveria estar.

## Por que tabelas hash são rápidas

Imagine procurar "Bob" numa lista encadeada de nomes: sem saber a posição exata, é preciso ir nó a nó comparando até achar. Numa tabela hash, encontrar "Bob" é rápido porque existe uma forma de ir direto até onde "Bob" está guardado — usando algo chamado **função hash**.

Vamos construir uma tabela hash do zero, em 5 passos.

## Passo 1: uma lista vazia

Começamos com uma lista de 10 posições, todas vazias. Cada posição é chamada de **bucket** (compartimento).

```py
minha_lista = [None, None, None, None, None, None, None, None, None, None]
```

## Passo 2: a função hash

Uma função hash converte um valor em um número que corresponda a um dos índices da tabela — nesse caso, de 0 a 9. Uma forma simples de fazer isso é somar o código Unicode de cada caractere do texto, e aplicar o resto da divisão por 10 (o operador `%`).

```py
def funcao_hash(valor):
    soma_caracteres = 0
    for caractere in valor:
        soma_caracteres += ord(caractere)

    return soma_caracteres % 10

print("'Bob' tem hash code:", funcao_hash('Bob'))
```

A saída é:

```py
'Bob' tem hash code: 5
```

`ord()` retorna o número Unicode de um caractere (`B` é 66, `o` é 111, `b` é 98). Somando os três dá 275, e o resto de `275 % 10` é 5 — por isso `"Bob"` deveria ficar guardado no índice 5. Esse número retornado pela função hash é chamado de **hash code**.

## Passo 3: inserindo um elemento

Segundo a função hash, "Bob" deve ficar no índice 5:

```py
def adicionar(nome):
    indice = funcao_hash(nome)
    minha_lista[indice] = nome

adicionar('Bob')
print(minha_lista)
```

A saída é:

```py
[None, None, None, None, None, 'Bob', None, None, None, None]
```

Adicionando mais alguns nomes com a mesma função:

```py
adicionar('Pete')
adicionar('Jones')
adicionar('Lisa')
adicionar('Siri')
print(minha_lista)
```

A saída é:

```py
[None, 'Jones', None, 'Lisa', None, 'Bob', None, 'Siri', 'Pete', None]
```

## Passo 4: buscando um elemento

Pra achar "Pete", basta passar o nome pra função hash, que devolve o índice 8 — e ir direto lá, sem percorrer a lista inteira.

```py
def contem(nome):
    indice = funcao_hash(nome)
    return minha_lista[indice] == nome

print("'Pete' está na tabela:", contem('Pete'))
```

A saída é:

```py
'Pete' está na tabela: True
```

## Passo 5: tratando colisões

O que acontece se dois nomes diferentes derem o mesmo hash code? Ao tentar adicionar "Stuart", a função hash retorna 3 — mas "Lisa" já está no índice 3. Isso é uma **colisão**.

Uma forma comum de resolver colisões é o **chaining**: em vez de cada bucket guardar um único valor, cada bucket vira uma lista, capaz de guardar mais de um elemento.

```py
minha_lista = [[], [], [], [], [], [], [], [], [], []]

def adicionar(nome):
    indice = funcao_hash(nome)
    minha_lista[indice].append(nome)

adicionar('Bob')
adicionar('Pete')
adicionar('Jones')
adicionar('Lisa')
adicionar('Siri')
adicionar('Stuart')
print(minha_lista)
```

A saída é:

```py
[[], ['Jones'], [], ['Lisa', 'Stuart'], [], ['Bob'], [], ['Siri'], ['Pete'], []]
```

Agora "Stuart" também cabe no índice 3, junto com "Lisa". Buscar "Stuart" fica um pouquinho mais lento, porque é preciso checar os elementos daquele bucket um a um — mas ainda assim é muito mais rápido do que procurar em todos os 10 buckets da tabela.

## Resumindo

- Elementos de uma tabela hash ficam guardados em compartimentos chamados **buckets**.
- Uma **função hash** transforma a chave de um elemento num **hash code**.
- O hash code indica em qual bucket o elemento está, permitindo ir direto até ele.
- Uma **colisão** acontece quando dois elementos diferentes têm o mesmo hash code, e por isso caem no mesmo bucket.
- Colisões podem ser resolvidas com **chaining**, guardando mais de um elemento por bucket.

## Complexidade de tempo

Arrays e listas encadeadas têm complexidade **O(n)** pra buscar e remover um elemento — no pior caso, é preciso passar por todos eles. Tabelas hash, em média, resolvem isso em **O(1)**: essa é a razão principal pela qual tabelas hash são tão úteis, especialmente com grandes volumes de dados. É basicamente o mesmo princípio por trás do `dict` do Python, que você já usa desde a série de introdução à linguagem.

Tabelas hash são ótimas pra verificar se algo existe numa coleção, guardar itens únicos com busca rápida, ou ligar valores a chaves — como um número de telefone a um nome. No próximo post, você conhece uma estrutura bem diferente, que organiza dados de forma hierárquica em vez de numa sequência: as árvores.

**Fonte adaptada:** [Hash Tables with Python](https://www.w3schools.com/python/python_dsa_hashtables.asp)
