---
layout: post
title: "Orientação a Objetos #5 - Associação de Classes"
date: 2026-08-11 15:25:00
image: '/assets/img/posts/poo-associacao-de-classes.webp'
description: Como uma classe pode usar objetos de outra classe como atributo para modelar relações do mundo real em Python, sem recorrer a herança - o conceito de associação de classes.
category: 'dev'
tags:
- Python
- Programação
- Associação
twitter_text: "Orientação a Objetos #5 - Associação de Classes"
introduction: "Nesta parte da série, você vai entender o que é associação de classes, como usar o objeto de uma classe como atributo de outra, e como isso ajuda a modelar relações do mundo real em Python."
---

No post anterior desta série, você viu como funcionam variáveis e métodos de classe — recursos que pertencem à classe como um todo, em vez de pertencer a cada objeto individualmente. Até aqui, porém, sempre trabalhamos com uma única classe por vez. Na prática, um sistema raramente é feito de classes isoladas: elas conversam entre si. Nesta parte você vai ver a primeira forma — e a mais simples — de fazer duas classes se relacionarem: a **associação de classes**.

## O que é associação de classes

Associação é o nome que se dá quando uma classe usa um objeto de outra classe como parte de si mesma, geralmente guardando esse objeto como atributo. Não é herança — a classe não "vira um tipo" da outra, ela só depende de um objeto dela pra funcionar. Em diagramas UML, esse tipo de relação costuma ser representado por uma seta cheia, indicando que uma classe se associa diretamente com a outra (existem outros tipos de seta, pra outros tipos de relação, mas essa é a mais comum no dia a dia).

Pense em situações do mundo real: um carro tem um motor, uma pessoa tem um endereço, um pedido tem um cliente. Em todos esses casos, um objeto guarda uma referência a outro objeto e usa os métodos dele pra realizar alguma ação. É exatamente isso que a associação de classes representa em código.

## Um exemplo prático: pessoa e interruptor

Imagine uma classe `Interruptor`, que representa o interruptor de luz de um cômodo da casa. Ela sabe acender e apagar a luz daquele cômodo:

```py
class Interruptor:
    def __init__(self, comodo):
        self.comodo = comodo

    def acender(self):
        print(f"Estou acendendo a luz do cômodo: {self.comodo}")

    def apagar(self):
        print(f"Estou apagando a luz do cômodo: {self.comodo}")
```

Até aqui, nada de novo: um construtor guarda o nome do cômodo, e dois métodos imprimem uma mensagem usando esse atributo. A parte interessante vem agora, com uma classe `Pessoa` que consegue acender e apagar luzes usando um interruptor:

```py
class Pessoa:
    def acender_luzes(self, interruptor: Interruptor):
        interruptor.acender()

    def apagar_luzes(self, interruptor: Interruptor):
        interruptor.apagar()

    def dormir(self):
        print("A pessoa foi dormir.")
```

Repare na anotação de tipo `interruptor: Interruptor` nos parâmetros — ela não é obrigatória pro código funcionar (Python não obriga tipagem), mas é o que estabelece a relação entre as duas classes pro seu editor: ao digitar `interruptor.`, o autocomplete já sabe sugerir `acender`, `apagar` e `comodo`, porque reconhece que aquele parâmetro é do tipo `Interruptor`. Sem essa anotação, o editor não tem como saber a que classe aquele objeto pertence.

Agora é só criar os objetos e usá-los juntos:

```py
agnaldo = Pessoa()
interruptor_sala = Interruptor("sala")

agnaldo.acender_luzes(interruptor_sala)
```

A saída é:

```py
Estou acendendo a luz do cômodo: sala
```

O `agnaldo` é um objeto `Pessoa`, e `interruptor_sala` é um objeto `Interruptor` independente. Quando chamamos `acender_luzes`, passamos o interruptor como argumento, e é dentro desse método que a `Pessoa` usa o `Interruptor` pra executar a ação. Se você trocar o interruptor passado — por exemplo, criar um `interruptor_quarto = Interruptor("quarto")` e usá-lo em `apagar_luzes` — o mesmo `agnaldo` consegue controlar cômodos diferentes, porque cada chamada recebe seu próprio objeto `Interruptor`:

```py
interruptor_quarto = Interruptor("quarto")
agnaldo.apagar_luzes(interruptor_quarto)
```

A saída é:

```py
Estou apagando a luz do cômodo: quarto
```

## Associação via parâmetro x associação via atributo

Repare que, nesse exemplo, o `Interruptor` chega à `Pessoa` como parâmetro de método, não como atributo guardado no construtor — ou seja, o `agnaldo` não "tem" um interruptor fixo, ele só usa um interruptor qualquer no momento em que precisa. Essa é a forma mais simples de associação: passar um objeto de outra classe como entrada de um método, usá-lo, e pronto.

> **Nota:** existe uma variação mais forte dessa mesma ideia, em que o objeto associado é guardado como atributo já na criação do objeto (no `__init__`), tornando a dependência entre as classes permanente em vez de pontual. Essa variação tem nome próprio — injeção de dependência — e é assunto pra mais adiante nesta série.

De qualquer forma, o ponto central da associação de classes é esse: uma classe passa a usar funcionalidades de outra classe sem herdar dela. `Pessoa` não é um tipo de `Interruptor`, nem o contrário — as duas são independentes, mas colaboram entre si. Esse tipo de relação vai aparecer o tempo todo conforme os sistemas crescem, e é a base pra entender o próximo assunto da série: o segundo princípio do SOLID, o princípio Aberto/Fechado, que usa associação de classes pra deixar o código mais fácil de estender sem precisar mexer no que já existe.

**Fonte adaptada:** [Associação de Classes - Programador Lhama](https://www.youtube.com/watch?v=LZG2E2BMJwc)
