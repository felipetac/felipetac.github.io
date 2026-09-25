---
layout: post
title: "Estruturas de Dados #3 - Pilhas e Filas"
date: 2026-09-25 08:40:00
image: '/assets/img/posts/dsa-pilhas-e-filas.webp'
description: Como implementar pilhas (LIFO) e filas (FIFO) em Python, usando listas soltas e classes dedicadas, e onde cada uma é usada na prática.
category: 'dev'
tags:
- Python
- Programação
- Pilhas e Filas
twitter_text: Pilhas e Filas em Python
introduction: "Nesta parte da série, você vai aprender a implementar pilhas (LIFO) e filas (FIFO) em Python, e onde cada uma é usada na prática."
---

Depois de ver listas, vamos conhecer duas estruturas de dados lineares que só permitem adicionar e remover elementos por pontas específicas: a pilha e a fila. Apesar de parecidas — as duas guardam elementos numa sequência — cada uma organiza a saída dos dados de um jeito diferente.

## Pilhas: o princípio LIFO

Pense numa pilha de panquecas: você só consegue adicionar ou remover panquecas pelo topo. Isso significa que a última panqueca colocada é sempre a primeira a ser removida — esse comportamento se chama **LIFO** (Last In, First Out, ou "última a entrar, primeira a sair").

As operações básicas de uma pilha são:

- **Empilhar (push):** adiciona um novo elemento no topo.
- **Desempilhar (pop):** remove e retorna o elemento do topo.
- **Topo (peek):** retorna o elemento do topo, sem removê-lo.
- **Está vazia (isEmpty):** verifica se a pilha está vazia.
- **Tamanho (size):** retorna o número de elementos na pilha.

### Pilha usando uma lista

Como listas do Python já têm tudo que uma pilha precisa (`append()` pra adicionar no final, `pop()` pra remover do final), dá pra montar uma pilha funcional em poucas linhas:

```py
pilha = []

# Empilhar
pilha.append('A')
pilha.append('B')
pilha.append('C')
print("Pilha:", pilha)

# Topo
topo = pilha[-1]
print("Topo:", topo)

# Desempilhar
removido = pilha.pop()
print("Desempilhar:", removido)

print("Pilha após desempilhar:", pilha)

# Está vazia
vazia = not bool(pilha)
print("Está vazia:", vazia)

# Tamanho
print("Tamanho:", len(pilha))
```

A saída é:

```py
Pilha: ['A', 'B', 'C']
Topo: C
Desempilhar: C
Pilha após desempilhar: ['A', 'B']
Está vazia: False
Tamanho: 2
```

### Pilha usando uma classe

Usar uma lista solta funciona, mas criar uma classe `Pilha` dedicada encapsula melhor o comportamento e evita que alguém manipule a lista interna diretamente, fora das operações previstas.

```py
class Pilha:
    def __init__(self):
        self.pilha = []

    def empilhar(self, elemento):
        self.pilha.append(elemento)

    def desempilhar(self):
        if self.esta_vazia():
            return "A pilha está vazia"
        return self.pilha.pop()

    def topo(self):
        if self.esta_vazia():
            return "A pilha está vazia"
        return self.pilha[-1]

    def esta_vazia(self):
        return len(self.pilha) == 0

    def tamanho(self):
        return len(self.pilha)

minha_pilha = Pilha()
minha_pilha.empilhar('A')
minha_pilha.empilhar('B')
minha_pilha.empilhar('C')

print("Desempilhar:", minha_pilha.desempilhar())
print("Topo:", minha_pilha.topo())
print("Tamanho:", minha_pilha.tamanho())
```

A saída é:

```py
Desempilhar: C
Topo: B
Tamanho: 2
```

Pilhas são usadas pra implementar o "desfazer" (undo) de editores de texto, o histórico de navegação do navegador, a pilha de chamadas de função de uma linguagem de programação, e algoritmos de busca em profundidade em grafos (você vai ver mais sobre isso quando chegarmos em grafos, mais adiante na série).

## Filas: o princípio FIFO

Agora pense numa fila de supermercado: a primeira pessoa a entrar na fila também é a primeira a ser atendida e sair. Esse comportamento se chama **FIFO** (First In, First Out, ou "primeira a entrar, primeira a sair").

As operações básicas de uma fila são:

- **Enfileirar (enqueue):** adiciona um novo elemento no final da fila.
- **Desenfileirar (dequeue):** remove e retorna o primeiro elemento da fila.
- **Frente (peek):** retorna o primeiro elemento, sem removê-lo.
- **Está vazia (isEmpty):** verifica se a fila está vazia.
- **Tamanho (size):** retorna o número de elementos na fila.

### Fila usando uma lista

```py
fila = []

# Enfileirar
fila.append('A')
fila.append('B')
fila.append('C')
print("Fila:", fila)

# Frente
frente = fila[0]
print("Frente:", frente)

# Desenfileirar
removido = fila.pop(0)
print("Desenfileirar:", removido)

print("Fila após desenfileirar:", fila)
```

A saída é:

```py
Fila: ['A', 'B', 'C']
Frente: A
Desenfileirar: A
Fila após desenfileirar: ['B', 'C']
```

> **Nota:** usar uma lista é simples, mas `fila.pop(0)` remove o primeiro elemento, o que exige deslocar todos os elementos restantes uma posição pra trás — pra filas grandes, isso deixa a operação de desenfileirar menos eficiente do que parece.

### Fila usando uma classe

```py
class Fila:
    def __init__(self):
        self.fila = []

    def enfileirar(self, elemento):
        self.fila.append(elemento)

    def desenfileirar(self):
        if self.esta_vazia():
            return "A fila está vazia"
        return self.fila.pop(0)

    def frente(self):
        if self.esta_vazia():
            return "A fila está vazia"
        return self.fila[0]

    def esta_vazia(self):
        return len(self.fila) == 0

    def tamanho(self):
        return len(self.fila)

minha_fila = Fila()
minha_fila.enfileirar('A')
minha_fila.enfileirar('B')
minha_fila.enfileirar('C')

print("Desenfileirar:", minha_fila.desenfileirar())
print("Frente:", minha_fila.frente())
print("Tamanho:", minha_fila.tamanho())
```

A saída é:

```py
Desenfileirar: A
Frente: B
Tamanho: 2
```

Filas são usadas pra escalonar tarefas em sistemas operacionais (tipo a fila de impressão de uma impressora), pra processar pedidos na ordem em que chegam, e pra busca em largura em grafos — o contraponto da busca em profundidade que as pilhas ajudam a implementar.

## Arrays ou listas encadeadas?

Tanto pilhas quanto filas também podem ser implementadas usando **listas encadeadas** em vez de listas comuns. A vantagem de usar uma lista é a simplicidade — menos código, mais fácil de entender. Já uma lista encadeada evita o problema do deslocamento de elementos (como o do `pop(0)` visto acima), ao custo de gastar mais memória guardando referências entre os nós. É exatamente essa estrutura — a lista encadeada — que vem a seguir na série.

**Fonte adaptada:** [Stacks with Python](https://www.w3schools.com/python/python_dsa_stacks.asp), [Queues with Python](https://www.w3schools.com/python/python_dsa_queues.asp)
