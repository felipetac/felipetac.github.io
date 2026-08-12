---
layout: post
title: "#10 - Decorators, Generators e Iterators"
date: 2026-08-11 11:00:00
image: '/assets/img/posts/tutorial-python-decorators-generators-e-iterators.webp'
description: Como funcionam decorators, generators (com yield) e iterators em Python, além de uma nota sobre o módulo array e sua diferença em relação às listas.
category: 'dev'
tags:
- Python
- Programação
- Funções Avançadas
twitter_text: Decorators, Generators e Iterators
introduction: "Nesta parte do tutorial, você vai conhecer três recursos mais avançados de funções em Python: decorators, generators e iterators."
---

Depois de dominar funções, argumentos e lambdas, é hora de subir um degrau. Os três recursos deste post — _decorators_, _generators_ e _iterators_ — não são exatamente iniciantes, mas aparecem o tempo todo em bibliotecas Python de verdade (o Flask usa decorators pra registrar rotas, praticamente todo código que processa grandes volumes de dados usa generators por baixo dos panos). Vale a pena entender como funcionam por dentro, mesmo que você não escreva um decorator do zero toda semana.

Vou fechar o post com uma observação rápida sobre o módulo `array`, que é frequentemente confundido com listas.

## Decorators

Um _decorator_ é uma função que recebe outra função como entrada, "embrulha" um comportamento extra em volta dela, e devolve uma nova função — tudo isso sem precisar alterar o código original da função decorada.

```py
def registrar_chamada(funcao):
    def envelope():
        print(f"Chamando {funcao.__name__}...")
        return funcao()
    return envelope

def saudacao():
    return "Olá!"

saudacao = registrar_chamada(saudacao)
print(saudacao())
```

A saída é:

```py
Chamando saudacao...
Olá!
```

Reatribuir `saudacao = registrar_chamada(saudacao)` manualmente funciona, mas o Python tem um açúcar sintático pra isso: o `@`.

### A sintaxe com @

```py
def registrar_chamada(funcao):
    def envelope():
        print(f"Chamando {funcao.__name__}...")
        return funcao()
    return envelope

@registrar_chamada
def saudacao():
    return "Olá!"

print(saudacao())
```

A saída é a mesma de antes. O `@registrar_chamada` colocado em cima de `def saudacao():` é exatamente equivalente a fazer `saudacao = registrar_chamada(saudacao)` logo depois de definir a função.

### Decorando funções com argumentos

O `envelope()` do exemplo acima não recebe argumento nenhum — o que quebra se a função decorada precisar de algum. A solução padrão é usar `*args` e `**kwargs` na função interna, repassando tudo pra função original.

```py
def registrar_chamada(funcao):
    def envelope(*args, **kwargs):
        print(f"Chamando {funcao.__name__} com {args} {kwargs}")
        return funcao(*args, **kwargs)
    return envelope

@registrar_chamada
def somar(a, b):
    return a + b

print(somar(3, 4))
```

A saída é:

```py
Chamando somar com (3, 4) {}
7
```

Assim o decorator funciona pra qualquer função, independente de quantos argumentos ela receba.

### Empilhando vários decorators

Dá pra aplicar mais de um decorator na mesma função. Eles são aplicados de baixo pra cima — o mais próximo da função roda primeiro.

```py
def caixa_alta(funcao):
    def envelope():
        return funcao().upper()
    return envelope

def com_exclamacao(funcao):
    def envelope():
        return funcao() + "!"
    return envelope

@caixa_alta
@com_exclamacao
def mensagem():
    return "python é ótimo"

print(mensagem())
```

A saída é:

```py
PYTHON É ÓTIMO!
```

Primeiro `com_exclamacao` adiciona o `!`, e só depois `caixa_alta` transforma tudo em maiúsculas.

> **Nota:** se você for escrever decorators com frequência, vale usar `functools.wraps` na função interna. Sem isso, o `__name__` e a docstring da função original se perdem, e a função decorada passa a "se apresentar" com o nome da função interna (`envelope`) em vez do nome real.

## Generators

Um _generator_ é uma função especial que, em vez de calcular e devolver todo o resultado de uma vez com `return`, vai produzindo valores um de cada vez, pausando a execução entre um valor e outro. Isso é feito com a palavra-chave `yield` no lugar de `return`.

```py
def contar_ate(n):
    contador = 1
    while contador <= n:
        yield contador
        contador += 1

for numero in contar_ate(5):
    print(numero)
```

A saída é:

```py
1
2
3
4
5
```

### A diferença entre yield e return

Quando o Python encontra um `yield`, ele salva o estado atual da função (variáveis locais, posição de execução) e devolve o valor pra quem chamou. Na próxima vez que alguém pedir o próximo valor, a função retoma exatamente de onde parou — em vez de começar do zero, como aconteceria com uma função comum.

```py
gerador = contar_ate(3)
print(next(gerador))
print(next(gerador))
print(next(gerador))
```

A saída é:

```py
1
2
3
```

Se você chamar `next()` de novo depois que o generator já produziu todos os valores, o Python lança um `StopIteration` — é justamente esse sinal que o `for` usa por baixo dos panos pra saber quando parar de pedir valores.

### Por que usar generators

A grande vantagem é economia de memória: um generator não guarda todos os valores numa lista na memória, ele calcula cada valor sob demanda, na hora que é pedido. Isso faz toda diferença ao lidar com sequências muito grandes (ou até infinitas).

```py
def numeros_pares():
    numero = 0
    while True:
        yield numero
        numero += 2

pares = numeros_pares()
for _ in range(5):
    print(next(pares))
```

A saída é:

```py
0
2
4
6
8
```

Uma lista com "todos os números pares" nunca caberia na memória — mas um generator infinito como esse não tem problema, porque só gera o próximo valor quando alguém pede.

### Expressões geradoras

Assim como listas têm as _list comprehensions_, generators têm uma versão parecida, só que usando parênteses em vez de colchetes.

```py
quadrados = (x * x for x in range(5))
print(list(quadrados))
```

A saída é:

```py
[0, 1, 4, 9, 16]
```

## Iterators

Um _iterator_ é um objeto que representa um fluxo de dados percorrível, um item de cada vez. Todo objeto que você percorre com `for` — listas, tuplas, strings, dicionários — é _iterável_, e o `for` obtém um iterator a partir dele usando `iter()`, chamando `next()` repetidamente até esgotar os valores.

```py
frutas = ("maçã", "banana", "cereja")
iterador = iter(frutas)

print(next(iterador))
print(next(iterador))
print(next(iterador))
```

A saída é:

```py
maçã
banana
cereja
```

Na prática, isso é exatamente o que o `for x in frutas:` faz por trás dos panos: chama `iter(frutas)` uma vez, e depois `next()` repetidas vezes até o `StopIteration`.

### O protocolo de iteradores

Pra um objeto se comportar como iterator, ele precisa implementar dois métodos especiais: `__iter__()`, que devolve o próprio objeto iterator, e `__next__()`, que devolve o próximo valor da sequência.

```py
class Contador:
    def __iter__(self):
        self.atual = 1
        return self

    def __next__(self):
        x = self.atual
        self.atual += 1
        return x

contador = Contador()
iterador = iter(contador)

print(next(iterador))
print(next(iterador))
print(next(iterador))
```

A saída é:

```py
1
2
3
```

Do jeito que está, esse `Contador` nunca para — cada chamada de `next()` sempre devolve o próximo número. Pra dar um fim à sequência, use `raise StopIteration` dentro do `__next__()` quando a condição de parada for atingida.

```py
class Contador:
    def __init__(self, limite):
        self.limite = limite

    def __iter__(self):
        self.atual = 1
        return self

    def __next__(self):
        if self.atual <= self.limite:
            x = self.atual
            self.atual += 1
            return x
        raise StopIteration

for numero in Contador(5):
    print(numero)
```

A saída é:

```py
1
2
3
4
5
```

Com o `StopIteration` implementado, o objeto `Contador` já funciona direitinho dentro de um `for`, exatamente como uma lista ou uma tupla.

## Um comentário sobre o módulo array

O Python não tem um tipo "array" nativo separado — na prática, você usa listas pra praticamente tudo que seria um array em outras linguagens. Existe, porém, um módulo chamado `array` na biblioteca padrão, útil quando você precisa de uma sequência de números do **mesmo tipo**, armazenada de forma mais compacta que uma lista comum.

```py
from array import array

numeros = array('i', [1, 2, 3, 4])
numeros.append(5)
print(numeros)
print(numeros[0])
```

A saída é:

```py
array('i', [1, 2, 3, 4, 5])
1
```

O primeiro argumento (`'i'`, nesse caso) é o _typecode_, que define o tipo dos elementos (inteiro, float, etc.) — diferente da lista, que aceita qualquer mistura de tipos sem restrição. Na prática, pra a maioria dos usos do dia a dia, listas resolvem bem; o módulo `array` (e ferramentas como o NumPy, que você já viu em outro post daqui do blog) só entram em cena quando desempenho e uso de memória com grandes volumes de números realmente importam.

E com isso você já tem decorators pra estender comportamento de funções sem tocar nelas, generators pra produzir sequências sob demanda sem estourar a memória, e iterators pra entender o mecanismo que faz o `for` funcionar por baixo dos panos.

**Fonte adaptada:** [Python Decorators](https://www.w3schools.com/python/python_decorators.asp), [Python Generators](https://www.w3schools.com/python/python_generators.asp), [Python Iterators](https://www.w3schools.com/python/python_iterators.asp), [Python Arrays](https://www.w3schools.com/python/python_arrays.asp)
