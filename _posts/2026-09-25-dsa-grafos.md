---
layout: post
title: "Estruturas de Dados #8 - Grafos"
date: 2026-09-25 10:20:00
image: '/assets/img/posts/dsa-grafos.webp'
description: O que são grafos, onde essa estrutura de dados não linear aparece no dia a dia, e como representá-los em Python com matriz de adjacência e lista de adjacência.
category: 'dev'
tags:
- Python
- Programação
- Grafos
twitter_text: "Estruturas de Dados #8 - Grafos"
introduction: "Nesta parte da série, você vai conhecer os grafos - uma estrutura de dados não linear - e duas formas de representá-los em Python."
---

Árvores, do post anterior, têm uma raiz única e uma hierarquia clara. Grafos são mais soltos: qualquer nó pode se conectar a qualquer outro, sem uma ordem hierárquica fixa — o que os torna a estrutura ideal pra modelar relações do tipo "quem se conecta com quem".

## O que é um grafo

Um grafo é formado por **vértices** (também chamados de nós) e **arestas** (edges) que conectam pares de vértices entre si. Diferente das estruturas lineares que você viu até agora — arrays, listas encadeadas — um grafo permite caminhos diferentes entre dois vértices, por isso é chamado de estrutura **não linear**.

Grafos aparecem em situações bem comuns:

- **Redes sociais:** cada pessoa é um vértice, e amizades ou conexões são as arestas — é assim que algoritmos sugerem novas amizades.
- **Mapas e navegação:** cidades ou pontos de ônibus são vértices, ruas são arestas — é assim que um app de rotas acha o caminho mais curto.
- **Internet:** páginas web como vértices, links entre elas como arestas.
- **Biologia:** usados pra modelar redes neurais ou a propagação de doenças.

## Como representar um grafo

A forma como um grafo é guardado na memória — sua **representação** — afeta o quanto de espaço ele ocupa, e o quão rápido é buscar ou manipular seus dados. Duas vértices são **adjacentes** (vizinhas) quando existe uma aresta entre elas. As duas representações mais comuns são a matriz de adjacência e a lista de adjacência.

## Matriz de adjacência

Uma matriz de adjacência é um array bidimensional onde cada célula no índice `(i, j)` guarda informação sobre a aresta entre o vértice `i` e o vértice `j`.

```py
#                  A  B  C  D
matriz_adjacencia = [
    [0, 1, 1, 0],  # A
    [1, 0, 0, 1],  # B
    [1, 0, 0, 1],  # C
    [0, 1, 1, 0],  # D
]

print("A e B são adjacentes?", matriz_adjacencia[0][1] == 1)
```

A saída é:

```py
A e B são adjacentes? True
```

Como esse grafo é não direcionado, a matriz é simétrica: se A se conecta com B, B também se conecta com A, então `matriz_adjacencia[0][1]` e `matriz_adjacencia[1][0]` guardam o mesmo valor.

Pra um grafo direcionado (onde a aresta só vale num sentido) ou ponderado (onde a aresta tem um "peso" associado), basta guardar outros valores na matriz em vez de só 0 e 1:

```py
#                  A  B  C  D
matriz_ponderada = [
    [0, 3, 0, 0],  # A -> B, peso 3
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
]

print("Peso da aresta de A para B:", matriz_ponderada[0][1])
```

A saída é:

```py
Peso da aresta de A para B: 3
```

Como o grafo agora é direcionado, a matriz não precisa mais ser simétrica — só a posição `(0, 1)` (A para B) tem valor, não a `(1, 0)` (B para A).

## Lista de adjacência

Quando um grafo é **esparso** — cada vértice só se conecta a uma pequena parte dos demais — a matriz de adjacência desperdiça memória guardando um monte de zeros pra arestas que não existem. Nesses casos, uma **lista de adjacência** é mais econômica: um array (ou dicionário) com todos os vértices, e cada vértice aponta pra uma lista com só as arestas que ele realmente tem.

```py
lista_adjacencia = {
    "A": ["B", "C"],
    "B": ["A", "D"],
    "C": ["A", "D"],
    "D": ["B", "C"],
}

print("Vizinhos de A:", lista_adjacencia["A"])
```

A saída é:

```py
Vizinhos de A: ['B', 'C']
```

Pra um grafo direcionado e ponderado, cada aresta na lista guarda o vértice de destino junto com o peso:

```py
lista_ponderada = {
    "A": [("B", 3)],
    "B": [],
    "C": [],
    "D": [("A", 4)],
}

print("Arestas saindo de D:", lista_ponderada["D"])
```

A saída é:

```py
Arestas saindo de D: [('A', 4)]
```

Aqui, `("A", 4)` significa que existe uma aresta de D pra A com peso 4.

> **Nota:** não existe uma representação "certa" pra todo grafo — a matriz de adjacência é mais simples de implementar e funciona bem pra grafos densos (com muitas conexões); a lista de adjacência economiza memória em grafos esparsos (com poucas conexões por vértice). A escolha depende do grafo que você está modelando e do que precisa fazer com ele.

Com estruturas de dados cobertas — arrays, pilhas, filas, listas encadeadas, tabelas hash, árvores e grafos — a série muda de foco a partir daqui: os próximos posts tratam dos algoritmos que resolvem dois problemas clássicos sobre esses dados, busca e ordenação, começando pela busca.

**Fonte adaptada:** [Graphs with Python](https://www.w3schools.com/python/python_dsa_graphs.asp)
