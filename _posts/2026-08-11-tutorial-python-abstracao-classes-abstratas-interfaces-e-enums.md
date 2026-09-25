---
layout: post
title: "Python | #15 - Abstração com Classes Abstratas, Interfaces e Enums"
date: 2026-08-11 12:40:00
image: '/assets/img/posts/tutorial-python-abstracao-classes-abstratas-interfaces-e-enums.webp'
description: O que é abstração em orientação a objetos, como criar classes abstratas com o módulo abc, o conceito de interfaces informais em Python e como usar a classe Enum.
category: 'dev'
tags:
- Python
- Programação
- Orientação a Objetos
twitter_text: Abstração com Classes Abstratas, Interfaces e Enums
introduction: "Nesta parte do tutorial, você vai aprender sobre abstração em Python usando classes abstratas, interfaces informais e a classe Enum."
---

Você já viu encapsulamento (esconder os detalhes internos de um objeto) e polimorfismo (a mesma operação se comportando de forma diferente pra cada tipo). Falta o último pilar clássico da orientação a objetos: _abstração_ — a ideia de definir **o que** uma classe deve fazer, sem se comprometer, naquele ponto, com **como** ela faz. Neste post você vai ver como o Python implementa isso com classes abstratas e interfaces informais, e vai fechar conhecendo `Enum`, útil pra representar um conjunto fixo de opções.

## Classes abstratas

Uma _classe abstrata_ é uma classe que não pode ser instanciada diretamente — ela existe só pra ser herdada, e obriga as classes filhas a implementarem certos métodos. Em Python, isso é feito com o módulo `abc` (de _Abstract Base Classes_).

```py
from abc import ABC, abstractmethod

class FormaGeometrica(ABC):
    @abstractmethod
    def area(self):
        pass

forma = FormaGeometrica()
```

A saída é um erro:

```py
TypeError: Can't instantiate abstract class FormaGeometrica with abstract method area
```

O Python impede a criação do objeto porque `FormaGeometrica` tem um método marcado com `@abstractmethod` que nunca foi implementado. Uma classe filha só pode ser instanciada se implementar **todos** os métodos abstratos da classe pai.

```py
from abc import ABC, abstractmethod

class FormaGeometrica(ABC):
    @abstractmethod
    def area(self):
        pass

class Retangulo(FormaGeometrica):
    def __init__(self, largura, altura):
        self.largura = largura
        self.altura = altura

    def area(self):
        return self.largura * self.altura

retangulo = Retangulo(4, 5)
print(retangulo.area())
```

A saída é:

```py
20
```

Se `Retangulo` não implementasse `area()`, tentar criar um objeto dela geraria o mesmo `TypeError` de antes — o Python garante, em tempo de execução, que toda subclasse concreta cumpre o "contrato" definido pela classe abstrata.

> **Nota:** uma classe abstrata pode ter métodos normais (com implementação) além dos abstratos — o requisito de implementar é só pros métodos marcados com `@abstractmethod`. Isso permite compartilhar comportamento comum entre as subclasses, e ainda assim forçar cada uma a definir as partes que realmente variam.

### Combinando abstração com polimorfismo

A vantagem de garantir que toda subclasse implementa `area()` aparece com força quando você tem várias formas diferentes e quer tratá-las de forma uniforme — exatamente o polimorfismo que você já viu em outro post.

```py
from abc import ABC, abstractmethod

class FormaGeometrica(ABC):
    @abstractmethod
    def area(self):
        pass

class Retangulo(FormaGeometrica):
    def __init__(self, largura, altura):
        self.largura = largura
        self.altura = altura

    def area(self):
        return self.largura * self.altura

class Circulo(FormaGeometrica):
    def __init__(self, raio):
        self.raio = raio

    def area(self):
        return 3.14159 * self.raio ** 2

formas = [Retangulo(4, 5), Circulo(3)]

for forma in formas:
    print(f"{type(forma).__name__}: {forma.area():.2f}")
```

A saída é:

```py
Retangulo: 20.00
Circulo: 28.27
```

O `for` chama `forma.area()` sem se importar com o tipo exato de cada forma — e como `FormaGeometrica` é abstrata, você tem a garantia, em tempo de execução, de que qualquer forma nessa lista realmente tem um método `area()` funcional, por mais tipos de forma que você adicione no futuro.

## Interfaces

Diferente de linguagens como Java, o Python não tem uma palavra-chave `interface` dedicada — o conceito existe de forma mais informal, apoiado em _duck typing_ ("se anda como um pato e grasna como um pato, é um pato"): qualquer objeto que implemente os métodos esperados pode ser usado no lugar de outro, independente de herança.

```py
class ImpressoraPDF:
    def imprimir(self, documento):
        print(f"Imprimindo '{documento}' como PDF")

class ImpressoraTermica:
    def imprimir(self, documento):
        print(f"Imprimindo '{documento}' numa impressora térmica")

def processar_impressao(impressora, documento):
    impressora.imprimir(documento)

processar_impressao(ImpressoraPDF(), "Relatório")
processar_impressao(ImpressoraTermica(), "Recibo")
```

A saída é:

```py
Imprimindo 'Relatório' como PDF
Imprimindo 'Recibo' numa impressora térmica
```

`processar_impressao()` não se importa com a classe exata do objeto recebido — só que ele tenha um método `imprimir()`. Quando você quer deixar esse "contrato" explícito (em vez de só torcer pra quem implementar a classe lembrar de incluir o método certo), uma classe abstrata do `abc` — como a `FormaGeometrica` do exemplo anterior — funciona como uma interface formal: qualquer classe que herdar dela é obrigada a implementar os métodos exigidos.

## Enums

Um `Enum` (enumeração) representa um conjunto fixo e nomeado de valores relacionados — como os dias da semana, os naipes de um baralho, ou os possíveis estados de um pedido. Em vez de usar strings ou números soltos (e correr o risco de digitar `"pendente"` de um jeito num lugar do código e `"Pendente"` de outro), você define cada opção como um membro de uma classe `Enum`.

```py
from enum import Enum

class StatusPedido(Enum):
    PENDENTE = 1
    ENVIADO = 2
    ENTREGUE = 3
    CANCELADO = 4

pedido_status = StatusPedido.ENVIADO
print(pedido_status)
print(pedido_status.name)
print(pedido_status.value)
```

A saída é:

```py
StatusPedido.ENVIADO
ENVIADO
2
```

Comparar membros de um `Enum` é direto, e muito mais seguro do que comparar strings soltas:

```py
from enum import Enum

class StatusPedido(Enum):
    PENDENTE = 1
    ENVIADO = 2
    ENTREGUE = 3
    CANCELADO = 4

pedido_status = StatusPedido.ENVIADO

if pedido_status == StatusPedido.ENVIADO:
    print("O pedido já está a caminho")
```

A saída é:

```py
O pedido já está a caminho
```

Também dá pra percorrer todos os membros de um `Enum` com um `for`:

```py
from enum import Enum

class StatusPedido(Enum):
    PENDENTE = 1
    ENVIADO = 2
    ENTREGUE = 3
    CANCELADO = 4

for status in StatusPedido:
    print(status.name, status.value)
```

A saída é:

```py
PENDENTE 1
ENVIADO 2
ENTREGUE 3
CANCELADO 4
```

> **Nota:** o valor associado a cada membro (`1`, `2`, `3`...) raramente importa por si só — o que você compara no código é o membro em si (`StatusPedido.ENVIADO`), não o número. O valor existe principalmente pra identificar o membro de forma única e, às vezes, pra serializar o Enum (salvar num banco de dados ou num JSON, por exemplo).

Com classes abstratas garantindo que um "contrato" seja cumprido, interfaces informais aproveitando o duck typing do Python, e Enums deixando um conjunto fixo de opções mais seguro de usar, você fecha os quatro pilares clássicos de orientação a objetos: encapsulamento, herança, polimorfismo e abstração. No próximo post, você vai ver um jeito de escrever classes que guardam dados com bem menos código repetitivo: as dataclasses.

**Fonte adaptada:** [Python Abstraction](https://www.tutorialspoint.com/python/python_abstraction.htm), [Python Abstract Base Classes](https://www.tutorialspoint.com/python/python_abstract_base_classes.htm), [Python Interfaces](https://www.tutorialspoint.com/python/python_interfaces.htm), [Python Enums](https://www.tutorialspoint.com/python/python_enums.htm)
