---
layout: post
title: "#6 - Árvores e Árvores Binárias"
date: 2026-09-25 09:40:00
image: '/assets/img/posts/dsa-arvores-e-arvores-binarias.webp'
description: O que são árvores como estrutura de dados hierárquica, o que diferencia uma árvore binária, seus tipos (balanceada, completa, cheia, perfeita) e as três formas de percorrê-la - pré-ordem, em ordem e pós-ordem.
category: 'dev'
tags:
- Python
- Programação
- Árvores
twitter_text: Árvores e Árvores Binárias em Python
introduction: "Nesta parte da série, você vai conhecer as árvores - uma estrutura de dados hierárquica - e as árvores binárias, com suas três formas de percorrer os nós."
---

Todas as estruturas que você viu até agora — arrays, pilhas, filas, listas encadeadas — são **lineares**: cada elemento vem diretamente depois do anterior, numa sequência só. A árvore é diferente: é uma estrutura **hierárquica**, onde um único elemento pode se ramificar em várias direções ao mesmo tempo — por isso o nome, já que a forma lembra os galhos de uma árvore.

## O que é uma árvore

Uma árvore é formada por **nós** (nodes) conectados por **arestas** (edges); cada nó guarda um valor e referências pros seus nós filhos (child nodes). O nó do topo se chama **raiz** (root), e cada nó pode ter zero ou mais filhos.

Árvores aparecem em vários lugares:

- **Dados hierárquicos:** sistemas de arquivos, organogramas de empresas.
- **Bancos de dados:** usadas pra buscar dados rapidamente.
- **Tabelas de roteamento:** usadas por algoritmos de roteamento de rede.
- **Ordenação e busca:** como você vai ver já no próximo post, com as árvores de busca binária.
- **Filas de prioridade:** costumam ser implementadas usando árvores, como heaps binários.

## Árvores binárias

Uma **árvore binária** é um tipo de árvore em que cada nó tem, no máximo, dois filhos — um filho esquerdo e um filho direito. Essa restrição de "no máximo dois" traz vantagens:

- Algoritmos de percurso, busca, inserção e remoção ficam mais fáceis de entender, implementar, e rodam mais rápido.
- Manter os dados ordenados numa árvore de busca binária (assunto do próximo post) torna a busca muito eficiente.
- Balancear a árvore é mais simples com um número limitado de filhos por nó.
- Árvores binárias podem ser representadas até como arrays, economizando memória.

### Implementando uma árvore binária

A implementação lembra bastante a de uma lista encadeada — só que, em vez de um único `proximo`, cada nó tem uma referência pro filho esquerdo e outra pro filho direito.

```py
class NoArvore:
    def __init__(self, dado):
        self.dado = dado
        self.esquerda = None
        self.direita = None

raiz = NoArvore('R')
noA = NoArvore('A')
noB = NoArvore('B')
noC = NoArvore('C')
noD = NoArvore('D')
noE = NoArvore('E')
noF = NoArvore('F')
noG = NoArvore('G')

raiz.esquerda = noA
raiz.direita = noB

noA.esquerda = noC
noA.direita = noD

noB.esquerda = noE
noB.direita = noF

noF.esquerda = noG

# Teste
print("raiz.direita.esquerda.dado:", raiz.direita.esquerda.dado)
```

A saída é:

```py
raiz.direita.esquerda.dado: E
```

## Tipos de árvore binária

- **Balanceada (balanced):** a diferença de altura entre as subárvores esquerda e direita de qualquer nó é, no máximo, 1.
- **Completa (complete):** todos os níveis estão cheios de nós, exceto talvez o último, que é preenchido da esquerda pra direita. Toda árvore completa também é balanceada.
- **Cheia (full):** todo nó tem exatamente 0 ou 2 filhos — nunca só 1.
- **Perfeita (perfect):** todas as folhas estão no mesmo nível, o que significa que todo nó interno tem dois filhos e todos os níveis estão completamente preenchidos. Toda árvore perfeita também é cheia, balanceada e completa.

## Percorrendo uma árvore binária

Percorrer (traversal) uma árvore significa visitar cada um dos seus nós, um de cada vez. Em arrays e listas encadeadas isso é óbvio — só existe um caminho, do primeiro elemento ao último. Numa árvore, que se ramifica em direções diferentes, existem várias formas de fazer esse percurso, divididas em duas categorias:

- **Busca em largura (Breadth First Search, BFS):** visita todos os nós de um nível antes de passar pro próximo — o percurso avança "de lado".
- **Busca em profundidade (Depth First Search, DFS):** desce pela árvore até chegar nas folhas, explorando um ramo inteiro antes do outro — o percurso avança "pra baixo". Existem três variações de DFS: pré-ordem, em ordem, e pós-ordem.

### Pré-ordem (pre-order)

Visita a raiz primeiro, depois percorre recursivamente a subárvore esquerda, e por fim a direita. É usado, por exemplo, pra criar uma cópia da árvore.

```py
def percorrer_pre_ordem(no):
    if no is None:
        return
    print(no.dado, end=", ")
    percorrer_pre_ordem(no.esquerda)
    percorrer_pre_ordem(no.direita)

percorrer_pre_ordem(raiz)
```

A saída é:

```py
R, A, C, D, B, E, F, G,
```

### Em ordem (in-order)

Percorre recursivamente a subárvore esquerda, visita a raiz, e por fim percorre a subárvore direita. É a mais usada em árvores de busca binária, porque retorna os valores em ordem crescente — você vai ver isso no próximo post.

```py
def percorrer_em_ordem(no):
    if no is None:
        return
    percorrer_em_ordem(no.esquerda)
    print(no.dado, end=", ")
    percorrer_em_ordem(no.direita)

percorrer_em_ordem(raiz)
```

A saída é:

```py
C, A, D, R, E, B, G, F,
```

### Pós-ordem (post-order)

Percorre recursivamente as subárvores esquerda e direita, e só então visita a raiz. É usado, por exemplo, pra apagar uma árvore inteira nó por nó, sem perder a referência dos filhos antes de apagar o pai.

```py
def percorrer_pos_ordem(no):
    if no is None:
        return
    percorrer_pos_ordem(no.esquerda)
    percorrer_pos_ordem(no.direita)
    print(no.dado, end=", ")

percorrer_pos_ordem(raiz)
```

A saída é:

```py
C, D, A, E, G, F, B, R,
```

Repare no padrão: pré-ordem imprime a raiz primeiro; em ordem imprime a raiz no meio de cada subárvore; pós-ordem imprime a raiz por último — os nomes "pré", "em" e "pós" se referem exatamente a quando a raiz é visitada em relação às suas subárvores.

## Árvores vs. arrays e listas encadeadas

- **Arrays** são rápidos pra acessar um elemento direto por índice, mas inserir ou remover exige deslocar outros elementos na memória.
- **Listas encadeadas** são rápidas pra inserir e remover, sem deslocamento, mas pra acessar um elemento específico é preciso percorrer a lista inteira.
- **Árvores** (pelo menos as balanceadas) conseguem o melhor dos dois mundos: acesso rápido _e_ inserção/remoção rápida, sem precisar deslocar nada na memória.

Isso parece bom demais pra ser verdade — e de fato tem uma pegadinha: essas vantagens só valem se a árvore estiver balanceada. No próximo post você vai ver exatamente o que acontece quando ela não está, e como uma árvore de busca binária organiza os valores pra tornar a busca rápida de verdade.

**Fonte adaptada:** [Trees with Python](https://www.w3schools.com/python/python_dsa_trees.asp), [Binary Trees with Python](https://www.w3schools.com/python/python_dsa_binarytrees.asp)
