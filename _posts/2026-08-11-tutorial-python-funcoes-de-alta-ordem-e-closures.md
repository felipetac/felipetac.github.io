---
layout: post
title: "Python #11 - Funções de Alta Ordem e Closures"
date: 2026-08-11 11:20:00
image: '/assets/img/posts/tutorial-python-funcoes-de-alta-ordem-e-closures.webp'
description: Como funções são tratadas como qualquer outro valor em Python, o uso de map(), filter() e reduce(), e o que são closures - funções que "lembram" do escopo onde foram criadas.
category: 'dev'
tags:
- Python
- Programação
- Funções Avançadas
twitter_text: "Python #11 - Funções de Alta Ordem e Closures"
introduction: "Nesta parte do tutorial, você vai aprender que funções em Python são valores como qualquer outro, conhecer map(), filter() e reduce(), e entender o que são closures."
---

Em Python, uma função não é um cidadão de segunda classe — ela é um valor como qualquer outro: pode ser guardada numa variável, passada como argumento pra outra função, e até devolvida como resultado de uma função. Esse comportamento tem nome: _funções de primeira classe_. É a partir dele que surgem dois recursos bastante usados no dia a dia: funções de alta ordem, que recebem ou devolvem outras funções, e closures, funções que "levam junto" um pedaço do escopo onde nasceram.

Entender closures também é pré-requisito pro próximo post, sobre decorators — então vale prestar atenção especial nessa parte.

## Funções como valores

Já que uma função é um valor, dá pra atribuí-la a outra variável (sem os parênteses, que executariam a função) e chamá-la a partir dali.

```py
def cumprimentar():
    return "Olá!"

outra_referencia = cumprimentar
print(outra_referencia())
```

A saída é:

```py
Olá!
```

`outra_referencia` e `cumprimentar` apontam pra exatamente a mesma função — não é uma cópia.

## Funções de alta ordem

Uma _função de alta ordem_ é uma função que recebe outra função como argumento, devolve uma função, ou as duas coisas. Você já usou uma sem perceber: `sorted()`, com o parâmetro `key`, recebe uma função (muitas vezes uma lambda) que diz como comparar os itens.

### map()

`map()` aplica uma função a cada item de um iterável, e devolve um objeto `map` (que você geralmente converte pra lista com `list()`).

```py
numeros = [1, 2, 3, 4, 5]
dobrados = map(lambda x: x * 2, numeros)

print(list(dobrados))
```

A saída é:

```py
[2, 4, 6, 8, 10]
```

### filter()

`filter()` também aplica uma função a cada item, mas usa o retorno dela como um teste: só os itens em que a função devolveu um valor "verdadeiro" sobrevivem no resultado.

```py
numeros = [1, 2, 3, 4, 5, 6, 7, 8]
pares = filter(lambda x: x % 2 == 0, numeros)

print(list(pares))
```

A saída é:

```py
[2, 4, 6, 8]
```

### reduce()

Diferente de `map()` e `filter()`, `reduce()` não é uma função embutida — precisa ser importada do módulo `functools`. Ela aplica uma função acumulando um resultado item a item, até sobrar um único valor final.

```py
from functools import reduce

numeros = [1, 2, 3, 4, 5]
soma = reduce(lambda acumulado, atual: acumulado + atual, numeros)

print(soma)
```

A saída é:

```py
15
```

A cada passo, `reduce()` chama a lambda com o resultado acumulado até ali e o próximo item da lista: primeiro `1 + 2`, depois `3 + 3`, depois `6 + 4`, depois `10 + 5`, chegando em `15`.

> **Nota:** hoje em dia, list comprehensions costumam ser preferidas a `map()`/`filter()` em código Python idiomático — `[x * 2 for x in numeros]` faz o mesmo que o exemplo de `map()` acima, e boa parte da comunidade considera mais legível. Vale conhecer `map()`/`filter()`/`reduce()` mesmo assim, porque aparecem com frequência em código de terceiros e em outras linguagens que você talvez use no futuro.

## Closures

Uma _closure_ acontece quando uma função interna, definida dentro de outra função, "lembra" do valor de uma variável do escopo externo — mesmo depois que a função externa já terminou de executar.

```py
def criar_multiplicador(fator):
    def multiplicar(numero):
        return numero * fator
    return multiplicar

triplicar = criar_multiplicador(3)
quadruplicar = criar_multiplicador(4)

print(triplicar(10))
print(quadruplicar(10))
```

A saída é:

```py
30
40
```

Repare que `criar_multiplicador(3)` já terminou de rodar quando você chama `triplicar(10)` — mas `multiplicar` ainda tem acesso ao valor de `fator` que existia naquele momento. É exatamente isso que caracteriza uma closure: a função interna "empacota" junto com ela as variáveis do escopo externo de que precisa, mesmo depois desse escopo ter deixado de existir formalmente.

### Cada closure guarda seu próprio estado

Como `triplicar` e `quadruplicar` vieram de chamadas diferentes de `criar_multiplicador()`, cada uma guarda seu próprio valor de `fator`, de forma completamente independente uma da outra.

```py
def criar_contador():
    contagem = 0
    def incrementar():
        nonlocal contagem
        contagem += 1
        return contagem
    return incrementar

contador_a = criar_contador()
contador_b = criar_contador()

print(contador_a())
print(contador_a())
print(contador_b())
```

A saída é:

```py
1
2
1
```

`contador_a` e `contador_b` são duas closures separadas, cada uma com sua própria variável `contagem` — chamar `contador_a()` não afeta `contador_b` em nada. Repare também no `nonlocal`: sem ele, a linha `contagem += 1` criaria uma variável local nova dentro de `incrementar()`, em vez de alterar o `contagem` da função externa (esse comportamento de escopo você já viu no post sobre funções).

### Um uso prático: cache simples com closure

Um uso comum de closure no dia a dia é guardar um "cache" de resultados já calculados, evitando refazer um cálculo caro mais de uma vez pros mesmos argumentos.

```py
def criar_calculadora_com_cache():
    cache = {}
    def calcular_quadrado(numero):
        if numero not in cache:
            print(f"Calculando o quadrado de {numero}...")
            cache[numero] = numero ** 2
        return cache[numero]
    return calcular_quadrado

quadrado = criar_calculadora_com_cache()

print(quadrado(5))
print(quadrado(5))
print(quadrado(8))
```

A saída é:

```py
Calculando o quadrado de 5...
25
25
Calculando o quadrado de 8...
64
```

Repare que "Calculando o quadrado de 5..." só aparece uma vez — na segunda chamada com `5`, a closure já tinha o resultado guardado no dicionário `cache`, que fica vivo entre uma chamada e outra exatamente pelo mesmo mecanismo do contador acima.

Esse é exatamente o mecanismo por trás dos decorators, que você vai ver no próximo post: um decorator nada mais é do que uma função que recebe outra função, cria uma closure em volta dela pra adicionar comportamento, e devolve essa closure no lugar da função original.

**Fonte adaptada:** [Python Higher Order Functions](https://www.tutorialspoint.com/python/python_higher_order_functions.htm), [Python Closures](https://www.tutorialspoint.com/python/python_closures.htm)
