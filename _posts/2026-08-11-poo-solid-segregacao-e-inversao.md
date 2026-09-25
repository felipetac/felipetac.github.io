---
layout: post
title: "Orientação a Objetos #11 - SOLID: Segregação de Interfaces e Inversão de Dependência"
date: 2026-08-11 15:31:00
image: '/assets/img/posts/poo-solid-segregacao-e-inversao.webp'
description: Os dois últimos princípios do SOLID em Python - Segregação de Interfaces (ISP), que evita interfaces genéricas demais, e Inversão de Dependência (DIP), que usa abstrações pra reduzir o acoplamento entre classes.
category: 'dev'
tags:
- Python
- Programação
- SOLID
twitter_text: "Orientação a Objetos #11 - SOLID: Segregação de Interfaces e Inversão de Dependência"
introduction: "Nesta parte da série, você vai aprender os dois últimos princípios do SOLID - Segregação de Interfaces e Inversão de Dependência - e fechar, com eles, a cobertura completa dos cinco princípios ao longo da série."
---

No post anterior, você viu como transformar uma classe abstrata numa interface: um conjunto de métodos abstratos que qualquer classe pode implementar pra se tornar intercambiável com as demais. Só que uma interface mal desenhada pode acabar causando o próprio problema que ela deveria evitar. Nesta parte você vai ver os dois últimos princípios do SOLID: a Segregação de Interfaces, que ataca justamente esse problema, e a Inversão de Dependência, o último e talvez o mais poderoso dos cinco.

## Segregação de Interfaces (o "I" de SOLID)

O princípio da Segregação de Interfaces (*Interface Segregation Principle*, ISP) diz que nenhuma classe deveria ser forçada a depender de — ou implementar — métodos que ela não usa. Na prática, isso significa preferir várias interfaces pequenas e específicas a uma única interface genérica que tenta cobrir todo mundo.

Veja essa interface `Trabalhador`, parecida com a do post anterior, só que agora com um terceiro método:

```py
from abc import ABC, abstractmethod


class Trabalhador(ABC):
    @abstractmethod
    def trabalhar(self):
        pass

    @abstractmethod
    def ir_para_casa(self):
        pass

    @abstractmethod
    def consultar_beneficios(self):
        pass
```

Pra um `Professor` efetivo, os três métodos fazem sentido. Mas agora imagine um `ProfessorSubstituto`, que também implementa essa interface:

```py
class ProfessorSubstituto(Trabalhador):
    def trabalhar(self):
        print("O professor substituto está trabalhando.")

    def ir_para_casa(self):
        print("O professor substituto está indo para casa.")

    def consultar_beneficios(self):
        raise Exception("Professor substituto não tem benefícios.")
```

Tecnicamente, isso satisfaz a interface — todos os três métodos abstratos foram implementados, então o Python deixa a classe ser instanciada sem reclamar. O problema é semântico: um professor substituto, no mundo real, não tem benefícios pra consultar. A "solução" encontrada foi lançar uma exceção dentro de `consultar_beneficios()`, disfarçando de implementação algo que, na prática, é uma recusa. Se isso soa familiar, é porque é exatamente o mesmo problema do `Peixe.latir()` que quebrou a Substituição de Liskov no post #9 — só que, dessa vez, a causa raiz não é a hierarquia de herança, é a própria interface exigir mais do que todo mundo precisa.

A correção é segregar a interface em duas menores:

```py
class Trabalhador(ABC):
    @abstractmethod
    def trabalhar(self):
        pass

    @abstractmethod
    def ir_para_casa(self):
        pass

    @abstractmethod
    def consultar_beneficios(self):
        pass


class TrabalhadorTemporario(ABC):
    @abstractmethod
    def trabalhar(self):
        pass

    @abstractmethod
    def ir_para_casa(self):
        pass
```

Agora `ProfessorSubstituto` implementa `TrabalhadorTemporario`, que só exige os dois métodos que realmente fazem sentido pra ele — sem `consultar_beneficios()` e sem exceção disfarçada de implementação. Cada classe passa a depender só do que efetivamente usa, que é exatamente o que o ISP pede.

## Inversão de Dependência (o "D" de SOLID)

O princípio da Inversão de Dependência (*Dependency Inversion Principle*, DIP) diz que módulos de alto nível (a lógica principal do seu programa) não deveriam depender diretamente de módulos de baixo nível (detalhes de implementação) — os dois deveriam depender de abstrações. Veja primeiro um exemplo sem esse princípio aplicado:

```py
class Elemento:
    def executar(self):
        print("Estou executando o elemento.")


class Principal:
    def __init__(self):
        self.__elemento = Elemento()

    def rodar(self):
        self.__elemento.executar()
```

`Principal` cria o próprio `Elemento` dentro do construtor — ou seja, depende diretamente da classe concreta `Elemento`. Se `Elemento` for renomeado, tiver sua assinatura alterada ou simplesmente deixar de existir, `Principal` quebra junto, mesmo não tendo relação nenhuma com esse detalhe. É exatamente esse acoplamento forte entre alto e baixo nível que o DIP recomenda evitar.

A correção passa por introduzir uma abstração no meio do caminho e aplicar a injeção de dependência que você já viu no post #7 — só que, dessa vez, usando uma interface como abstração:

```py
from abc import ABC, abstractmethod


class ElementoInterface(ABC):
    @abstractmethod
    def executar(self):
        pass


class Elemento(ElementoInterface):
    def executar(self):
        print("Estou executando o elemento.")


class Principal:
    def __init__(self, elemento: ElementoInterface):
        self.__elemento = elemento

    def rodar(self):
        self.__elemento.executar()
```

Agora `Principal` não cria mais o `Elemento` sozinho — ele recebe, de fora, qualquer objeto que implemente `ElementoInterface`:

```py
elemento = Elemento()
principal = Principal(elemento)
principal.rodar()
```

A saída é:

```py
Estou executando o elemento.
```

A diferença pode parecer sutil, mas é o cerne do princípio: `Principal` não depende mais de `Elemento`, depende de `ElementoInterface` — e `Elemento` também depende dessa mesma abstração, só que do outro lado. Se amanhã você criar um `ElementoDoBancoDeDados` que também implemente `ElementoInterface`, ele entra em `Principal` sem alterar uma linha sequer dessa classe. É a injeção de dependência do post #7 sendo usada especificamente pra cumprir o DIP: em vez de uma classe concreta depender de outra classe concreta, as duas passam a depender de uma abstração comum entre elas.

Com este post, os cinco princípios do SOLID que abrem essa sigla já apareceram ao longo da série: o "S" (responsabilidade única) lá no post #3, o "O" (aberto/fechado) no post #6, o "L" (Substituição de Liskov) no post #9, e agora o "I" (Segregação de Interfaces) e o "D" (Inversão de Dependência) juntos aqui.

Pra fechar a série, falta só um assunto: duas formas de uma classe conter objetos de outra classe, com graus diferentes de vínculo entre elas — agregação e composição, tema do último post desta série.

**Fonte adaptada:** [SOLID (I) - Segregação de Interfaces - Programador Lhama](https://www.youtube.com/watch?v=Da3-YfGz_D8), [SOLID (D) - Inversão de Dependência - Programador Lhama](https://www.youtube.com/watch?v=T8fgi96toNo)
