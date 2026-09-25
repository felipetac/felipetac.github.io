---
layout: post
title: "#4 - Listas Encadeadas"
date: 2026-09-25 09:00:00
image: '/assets/img/posts/dsa-listas-encadeadas.webp'
description: O que são listas encadeadas (linked lists), como implementá-las em Python com classes, e como elas se comparam a arrays em memória e desempenho.
category: 'dev'
tags:
- Python
- Programação
- Listas Encadeadas
twitter_text: Listas Encadeadas em Python
introduction: "Nesta parte da série, você vai aprender o que são listas encadeadas, como implementá-las em Python, e como elas se comparam a arrays."
---

No post anterior você viu que pilhas e filas também podem ser implementadas com listas encadeadas em vez de listas comuns. Chegou a hora de entender essa estrutura por dentro: diferente da lista do Python, que já vem pronta na linguagem, uma **lista encadeada** (linked list) é algo que você constrói você mesmo, nó por nó.

## O que é uma lista encadeada

Uma lista encadeada é formada por **nós** (nodes) ligados entre si: cada nó guarda um dado e uma referência — um "link" — pra onde o próximo nó está na memória.

```py
class No:
    def __init__(self, dado):
        self.dado = dado
        self.proximo = None
```

## Listas encadeadas vs. arrays

A melhor forma de entender uma lista encadeada é comparando com um array:

| Característica | Array | Lista encadeada |
|---|---|---|
| É uma estrutura já pronta na linguagem | Sim | Não |
| Tem tamanho fixo na memória | Sim | Não |
| Elementos ficam lado a lado na memória | Sim | Não |
| Uso de memória por elemento é baixo | Sim | Não |
| Permite acesso direto (por índice) | Sim | Não |
| Inserir/remover em tempo constante, sem deslocar dados | Não | Sim |

Em resumo: uma lista encadeada não precisa realocar tudo pra um espaço maior quando enche (como um array precisa), e não precisa deslocar elementos vizinhos quando algo é inserido ou removido no meio. Em troca, cada nó gasta mais memória (por guardar a referência ao próximo), as operações costumam exigir mais código, e não existe acesso direto por índice — pra chegar num nó específico, é preciso percorrer a lista a partir do início.

## Tipos de lista encadeada

- **Lista ligada simples (singly linked list):** cada nó só guarda o endereço do próximo nó. É a que ocupa menos memória, e a que você vai usar no restante deste post.
- **Lista duplamente ligada (doubly linked list):** cada nó guarda o endereço do nó anterior _e_ do próximo, permitindo navegar nos dois sentidos, ao custo de mais memória.
- **Lista circular (circular linked list):** o último nó se conecta de volta ao primeiro, formando um ciclo — útil quando a lista precisa ser percorrida continuamente, em loop.

## Percorrendo a lista

Percorrer (traversal) significa seguir os links de um nó até o próximo, começando pela "cabeça" (head) da lista, até que o próximo endereço seja `None`.

```py
def percorrer_e_imprimir(cabeca):
    atual = cabeca
    while atual:
        print(atual.dado, end=" -> ")
        atual = atual.proximo
    print("nulo")

no1 = No(7)
no2 = No(11)
no3 = No(3)
no4 = No(2)
no5 = No(9)

no1.proximo = no2
no2.proximo = no3
no3.proximo = no4
no4.proximo = no5

percorrer_e_imprimir(no1)
```

A saída é:

```py
7 -> 11 -> 3 -> 2 -> 9 -> nulo
```

## Encontrando o menor valor

Assim como fizemos com arrays, dá pra escrever um algoritmo que percorre a lista encadeada procurando o menor valor — só que aqui, em vez de um índice, seguimos o link `proximo` a cada passo.

```py
def encontrar_menor_valor(cabeca):
    menor = cabeca.dado
    atual = cabeca.proximo
    while atual:
        if atual.dado < menor:
            menor = atual.dado
        atual = atual.proximo
    return menor

print("O menor valor da lista é:", encontrar_menor_valor(no1))
```

A saída é:

```py
O menor valor da lista é: 2
```

## Apagando um nó

Antes de apagar um nó, é preciso reconectar os nós dos dois lados dele — senão a lista quebra no meio. A estratégia é: primeiro conectar o nó anterior ao nó seguinte, e só depois "descartar" o nó do meio.

```py
def apagar_no_especifico(cabeca, no_para_apagar):
    if cabeca == no_para_apagar:
        return cabeca.proximo

    atual = cabeca
    while atual.proximo and atual.proximo != no_para_apagar:
        atual = atual.proximo

    if atual.proximo is None:
        return cabeca

    atual.proximo = atual.proximo.proximo

    return cabeca

print("Antes de apagar:")
percorrer_e_imprimir(no1)

no1 = apagar_no_especifico(no1, no4)

print("Depois de apagar:")
percorrer_e_imprimir(no1)
```

A saída é:

```py
Antes de apagar:
7 -> 11 -> 3 -> 2 -> 9 -> nulo
Depois de apagar:
7 -> 11 -> 3 -> 9 -> nulo
```

Repare que a função retorna a nova cabeça da lista — importante porque, se o nó apagado for justamente o primeiro, a cabeça muda.

## Inserindo um nó

Inserir é parecido com apagar: também é preciso cuidar dos links pra não quebrar a lista. Primeiro cria-se o novo nó; depois, ou ele vira a nova cabeça (se for inserido na posição 1), ou é encaixado entre dois nós existentes.

```py
def inserir_no_na_posicao(cabeca, novo_no, posicao):
    if posicao == 1:
        novo_no.proximo = cabeca
        return novo_no

    atual = cabeca
    for _ in range(posicao - 2):
        if atual.proximo is None:
            break
        atual = atual.proximo

    novo_no.proximo = atual.proximo
    atual.proximo = novo_no

    return cabeca

no1 = No(7)
no2 = No(3)
no3 = No(2)
no4 = No(9)

no1.proximo = no2
no2.proximo = no3
no3.proximo = no4

print("Lista original:")
percorrer_e_imprimir(no1)

novo_no = No(97)
no1 = inserir_no_na_posicao(no1, novo_no, 2)

print("Depois de inserir:")
percorrer_e_imprimir(no1)
```

A saída é:

```py
Lista original:
7 -> 3 -> 2 -> 9 -> nulo
Depois de inserir:
7 -> 97 -> 3 -> 2 -> 9 -> nulo
```

## Complexidade de tempo

A busca linear numa lista encadeada funciona igual à de um array, e tem a mesma complexidade: **O(n)**. A diferença importante é que **busca binária não é possível** numa lista encadeada — o algoritmo de busca binária depende de pular direto pra um índice específico, e listas encadeadas não têm acesso direto por índice, só percorrendo nó a nó a partir da cabeça.

Você já conhece arrays, pilhas, filas e listas encadeadas — as peças mais básicas do DSA. No próximo post, a gente muda de figura: em vez de percorrer elemento por elemento pra achar algo, você vai ver uma estrutura pensada pra ir direto ao ponto — a tabela hash.

**Fonte adaptada:** [Linked Lists with Python](https://www.w3schools.com/python/python_dsa_linkedlists.asp)
