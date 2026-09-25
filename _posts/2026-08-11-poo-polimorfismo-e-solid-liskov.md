---
layout: post
title: "Orientação a Objetos #9 - Polimorfismo e SOLID: Substituição de Liskov"
date: 2026-08-11 15:29:00
image: '/assets/img/posts/poo-polimorfismo-e-solid-liskov.webp'
description: Diferença entre polimorfismo e o princípio da Substituição de Liskov (o L de SOLID) em Python - como garantir que subclasses respondam ao mesmo método sem quebrar o comportamento esperado pela classe pai.
category: 'dev'
tags:
- Python
- Programação
- Polimorfismo
twitter_text: "Orientação a Objetos #9 - Polimorfismo e SOLID: Substituição de Liskov"
introduction: "Nesta parte da série, você vai entender o que é polimorfismo em Python e como o princípio da Substituição de Liskov (o L de SOLID) garante que esse polimorfismo seja usado de forma segura."
---

No post anterior desta série, você viu como a herança deixa uma classe filha reaproveitar — e restringir, via encapsulamento protegido — o comportamento de uma classe pai. Um efeito colateral bastante útil da herança é que ela abre espaço pra um quarto pilar da orientação a objetos: o polimorfismo. Nesta parte você vai ver o que é polimorfismo na prática e, em seguida, o terceiro dos cinco princípios SOLID cobertos ao longo da série (depois da Responsabilidade Única, no post #3, e do Aberto/Fechado, no post #6) — a Substituição de Liskov, o "L" de SOLID, que existe justamente pra manter esse polimorfismo seguro.

## O que é polimorfismo

"Polimorfismo" quer dizer, literalmente, "muitas formas". No contexto de orientação a objetos, o nome descreve a capacidade de objetos de classes diferentes responderem ao mesmo método — com a mesma assinatura — cada um com seu próprio comportamento. Na prática, isso geralmente acontece através de sobrescrita de método: uma subclasse redefine um método que já existia na classe pai, e passa a executar algo diferente quando esse método é chamado.

Veja um exemplo com três classes que representam animais:

```py
class Animal:
    def fazer_som(self):
        print("Um animal genérico faz algum som.")


class Cachorro(Animal):
    def fazer_som(self):
        print("Au au!")


class Gato(Animal):
    def fazer_som(self):
        print("Miau!")
```

`Cachorro` e `Gato` herdam de `Animal`, mas os dois sobrescrevem `fazer_som()` com sua própria implementação. Agora veja o que acontece ao colocar objetos das três classes numa lista e chamar o mesmo método em cada um:

```py
animais = [Animal(), Cachorro(), Gato()]

for animal in animais:
    animal.fazer_som()
```

A saída é:

```py
Um animal genérico faz algum som.
Au au!
Miau!
```

Repare que o `for` não sabe (nem precisa saber) se está lidando com um `Animal`, um `Cachorro` ou um `Gato` — ele só chama `fazer_som()` em cada item da lista, e cada objeto responde do seu próprio jeito. É exatamente isso que o polimorfismo entrega: um código que trabalha com "qualquer coisa que saiba fazer_som()", sem precisar conhecer a classe concreta de cada objeto. Isso deixa o código bem mais fácil de estender — adicionar uma classe `Passaro` com seu próprio `fazer_som()` não exige tocar em uma linha sequer do `for`.

> **Nota:** cuidado pra não abusar do polimorfismo dando o mesmo nome a métodos que fazem coisas sem relação nenhuma entre si só porque "parece elegante" reaproveitar o nome. Se dois métodos com a mesma assinatura resolvem problemas completamente diferentes, nomes mais descritivos pra cada um deixam o código mais claro do que forçar um polimorfismo que não faz sentido ali.

## O princípio da Substituição de Liskov

SOLID é um acrônimo pra cinco princípios de bom design orientado a objetos, e cada letra representa um deles. A letra de hoje é o "L", que vem do princípio da Substituição de Liskov (formulado pela cientista da computação Barbara Liskov). A ideia central é simples de enunciar: em qualquer lugar do código que espera um objeto da classe pai, deve ser seguro passar um objeto de uma classe filha no lugar, sem que isso quebre o comportamento esperado.

Pense na hierarquia `Animal` → `Mamifero` → `Cachorro` vista no post sobre herança: em qualquer trecho de código que espera um `Mamifero` (por exemplo, chamando um método `andar()`), passar um `Cachorro` no lugar deve funcionar sem surpresas, porque `Cachorro` só estende o comportamento de `Mamifero`, nunca o contradiz. Isso é substituição de Liskov respeitada.

Agora veja um caso em que esse princípio é quebrado:

```py
class Animal:
    def alimentar(self):
        print("O animal está se alimentando.")


class Cachorro(Animal):
    def latir(self):
        print("O cachorro está latindo.")


class Peixe(Cachorro):
    def latir(self):
        raise Exception("Peixe não late.")
```

`Peixe` herda de `Cachorro` só pra reaproveitar `alimentar()` (que, na cadeia de herança, vem originalmente de `Animal`). O problema é que, ao herdar de `Cachorro`, `Peixe` também herda `latir()` — um método que não faz sentido nenhum pra um peixe. A solução usada aqui foi sobrescrever `latir()` pra lançar uma exceção, e é exatamente esse tipo de "solução" que viola o princípio de Liskov.

Veja o efeito prático disso numa função que espera poder chamar `latir()` em qualquer coisa que seja (na hierarquia atual) um `Cachorro`:

```py
def fazer_latir(animal):
    animal.latir()

for bicho in [Cachorro(), Peixe()]:
    fazer_latir(bicho)
```

A saída é:

```py
O cachorro está latindo.
Traceback (most recent call last):
  ...
Exception: Peixe não late.
```

`fazer_latir()` foi escrita esperando trabalhar com qualquer objeto que fosse, na prática, um `Cachorro` — e `Peixe`, tecnicamente, é um `Cachorro` nessa árvore de herança, então deveria conseguir substituí-lo sem drama. Só que substituir quebra o programa com uma exceção não tratada. Essa é a violação do princípio de Liskov na prática: a raiz do problema não é o `raise`, é a própria árvore de herança estar mal desenhada — `Peixe` nunca deveria ter herdado de `Cachorro` só pra ganhar de graça um método que não usa. Se ele só precisa de `alimentar()`, o lugar certo pra herdar seria diretamente de `Animal`.

É por isso que polimorfismo e Liskov andam juntos neste post: o polimorfismo só é seguro de usar quando toda subclasse realmente consegue substituir sua classe pai sem surpresas — é exatamente essa garantia que o princípio da Substituição de Liskov exige.

Mas como garantir, na prática, que uma subclasse implementa de verdade o que a classe pai promete, em vez de só fingir com um `raise` escondido? Um jeito e tanto de forçar isso desde o início é impedir que a própria classe pai seja usada sozinha — e é isso que as classes abstratas fazem, assunto do próximo post da série.

**Fonte adaptada:** [Polimorfismo - Programador Lhama](https://www.youtube.com/watch?v=cflwrEkQnQM), [SOLID (L) - Substituição de Liskov - Programador Lhama](https://www.youtube.com/watch?v=bMhELEHrIwE)
