---
layout: post
title: "Estruturas de Dados | #1 - Introdução a Estruturas de Dados e Complexidade"
date: 2026-09-25 08:00:00
image: '/assets/img/posts/dsa-introducao-e-complexidade.webp'
description: Uma introdução a Estruturas de Dados e Algoritmos (DSA) em Python - o que são, por que importam, e como medir a eficiência de um algoritmo com complexidade de tempo e notação Big O.
category: 'dev'
tags:
- Python
- Programação
- Complexidade
twitter_text: Introdução a Estruturas de Dados e Complexidade
introduction: "Nesta parte da série, você vai entender o que são Estruturas de Dados e Algoritmos (DSA), e vai aprender a medir a eficiência de um algoritmo com complexidade de tempo e notação Big O."
---

Se você já passou pela série de introdução ao Python deste blog, já usou `list`, `dict` e `set` sem parar — são estruturas de dados prontas, embutidas na linguagem. Mas o que fazer quando o problema pede uma estrutura que o Python não tem de fábrica, tipo uma pilha ou uma árvore? E como saber se o código que você escreveu pra resolver um problema é rápido o bastante, ou se vai travar assim que a quantidade de dados crescer? É disso que trata **Estruturas de Dados e Algoritmos**, ou **DSA** (Data Structures and Algorithms) — o assunto desta nova série do blog.

Nesta primeira parte, você vai entender o que é DSA, o que vamos cobrir ao longo da série, e uma ferramenta essencial pra comparar algoritmos entre si: a complexidade de tempo.

## O que são Estruturas de Dados e Algoritmos

- **Estruturas de Dados** tratam de como os dados podem ser guardados em diferentes formatos.
- **Algoritmos** tratam de como resolver problemas, geralmente buscando e manipulando essas estruturas de dados.
- Entender DSA ajuda você a achar a melhor combinação de estrutura de dados e algoritmo pra escrever código mais eficiente.

Python já tem suporte nativo pra várias estruturas — listas, dicionários, sets — mas outras precisam ser construídas com classes e objetos: listas encadeadas, pilhas, filas, árvores e grafos. Ao longo desta série, você vai construir cada uma dessas na mão, e depois vai conhecer os algoritmos de busca e ordenação mais usados na prática: busca linear e binária, e os algoritmos de ordenação bubble, selection, insertion, quick, counting, radix e merge sort.

> **Nota:** por que aprender DSA se o Python já resolve a maioria das coisas com `list.sort()` ou `x in lista`? Porque entender o que acontece por baixo desses métodos prontos é o que te dá capacidade de escolher a ferramenta certa quando o problema fica grande ou específico o suficiente pra que a solução "óbvia" não seja rápida o bastante.

## Por que não medir só o tempo de execução real

Seria natural pensar: "pra saber se um algoritmo é rápido, só rodar ele e cronometrar". O problema é que o tempo real de execução depende de um monte de fatores que não têm nada a ver com a qualidade do algoritmo em si:

- a linguagem de programação usada;
- como a pessoa programadora escreveu o código;
- o compilador ou interpretador usado pra rodar o programa;
- o hardware do computador;
- o sistema operacional e outras tarefas rodando ao mesmo tempo;
- a quantidade de dados que o algoritmo está processando.

Com tantos fatores diferentes influenciando o tempo real, como saber se um algoritmo é mais rápido que outro de forma justa? É aí que entra a **complexidade de tempo**.

## Complexidade de tempo: uma medida mais justa

Complexidade de tempo é mais abstrata que o tempo real de execução — ela ignora fatores como linguagem ou hardware, e conta, em vez disso, o número de operações que o algoritmo precisa fazer pra rodar sobre uma certa quantidade de dados. Como cada operação consome um tempinho de processamento, esse número de operações pode ser tratado como uma aproximação de tempo.

Veja um algoritmo simples que encontra o menor valor de uma lista:

```py
minha_lista = [7, 12, 9, 4, 11, 8]
menor = minha_lista[0]

for valor in minha_lista:
    if valor < menor:
        menor = valor

print("Menor valor:", menor)
```

A saída é:

```py
Menor valor: 4
```

Pra achar o menor valor, o algoritmo precisa comparar cada elemento da lista uma vez — o loop roda 6 vezes porque há 6 valores. Se a lista tivesse 1000 valores, o loop rodaria 1000 vezes. O tempo que esse algoritmo leva pra rodar é, portanto, proporcional (linear) ao tamanho da lista.

Uma "operação", nesse contexto, é qualquer passo que leva um tempo constante — ou seja, o mesmo tempo independente de quantos dados o algoritmo está processando. Comparar dois elementos e trocá-los de posição, por exemplo, é considerado uma única operação, porque leva o mesmo tempo com uma lista de 10 ou de 1000 elementos.

## Notação Big O

**Big O** é a notação usada pra expressar a complexidade de tempo de um algoritmo no pior cenário possível (o _worst case_). Ela usa a letra O maiúscula seguida de parênteses, com uma expressão em função de `n` (o número de valores no conjunto de dados) dentro deles — por exemplo, `O(n)`.

Aqui estão as classes de complexidade mais comuns, com exemplos de onde aparecem:

| Complexidade | Onde aparece |
|---|---|
| `O(1)` | Acessar um elemento específico de uma lista pelo índice — não importa o tamanho da lista, o acesso é direto. |
| `O(n)` | Encontrar o menor valor numa lista, como no exemplo acima — o algoritmo precisa comparar cada um dos `n` valores. |
| `O(n²)` | Bubble sort, selection sort e insertion sort, que você vai ver mais adiante na série — um aumento de `n` de 100 pra 200 valores pode aumentar o número de operações em até 30 mil. |
| `O(n log n)` | Quicksort, no caso médio — mais rápido que os três algoritmos acima, e por isso um dos algoritmos de ordenação mais usados na prática. |

O acesso direto por índice, `O(1)`, é o exemplo mais simples:

```py
print(minha_lista[3])
```

Não importa se `minha_lista` tem 6 ou 6 milhões de elementos — acessar o índice 3 é sempre uma única operação.

## Melhor caso, médio caso e pior caso

Por que falamos especificamente em "pior caso" ao usar Big O? Porque, pra muitos algoritmos, o tempo de execução muda dependendo dos valores envolvidos, mesmo mantendo o tamanho `n` fixo.

Imagine que você precisa ordenar manualmente 20 valores embaralhados, do menor pro maior — isso leva um tempo considerável. Agora imagine que os 20 valores já estão quase ordenados, com só um fora do lugar — você resolve isso em segundos, só movendo aquele valor pra posição certa.

Algoritmos se comportam de forma parecida: pra uma mesma quantidade de dados, às vezes são rápidos, às vezes são lentos, dependendo de como os valores estão organizados. Por isso, pra poder comparar diferentes algoritmos de forma justa, normalmente se olha pro pior cenário possível usando a notação Big O — é a garantia de que o algoritmo nunca vai ser mais lento que aquilo, não importa o que aconteça.

Com essa régua em mãos, você já pode comparar algoritmos de forma justa — e é exatamente isso que vai fazer ao longo desta série, começando pela estrutura mais familiar de todas: arrays e listas.

**Fonte adaptada:** [DSA with Python](https://www.w3schools.com/python/python_dsa.asp), [Python Lists and Arrays](https://www.w3schools.com/python/python_dsa_lists.asp), [DSA Time Complexity](https://www.w3schools.com/dsa/dsa_timecomplexity_theory.php)
