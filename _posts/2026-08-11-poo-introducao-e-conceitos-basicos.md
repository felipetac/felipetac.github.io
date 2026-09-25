---
layout: post
title: "Orientação a Objetos #1 - Introdução e Conceitos Básicos"
date: 2026-08-11 15:21:00
image: '/assets/img/posts/poo-introducao-e-conceitos-basicos.webp'
description: Uma introdução a Orientação a Objetos (POO) em Python - o que é esse paradigma, a diferença entre classe e objeto, e como criar sua primeira classe com atributos e métodos.
category: 'dev'
tags:
- Python
- Programação
- Introdução
twitter_text: "Orientação a Objetos #1 - Introdução e Conceitos Básicos"
introduction: "Nesta parte da série, você vai entender o que é Orientação a Objetos (POO), a diferença entre classe e objeto, e vai criar sua primeira classe em Python com atributos e métodos."
---

Pensa em como você descreveria uma pessoa pra alguém que nunca a conheceu: idade, altura, cor dos olhos — características dela. E depois o que ela faz no dia a dia: anda, corre, come, trabalha — ações dela. Separar "o que uma coisa é" do "o que uma coisa faz" é uma forma bem natural de organizar informação, e é exatamente essa lógica que está por trás da **Orientação a Objetos** (POO), um dos paradigmas de programação mais usados no mundo — não é novidade nenhuma, mas continua firme depois de décadas justamente porque essa forma de organizar código funciona bem pra sistemas grandes.

Nesta primeira parte da série, você vai entender o que é POO e por que ela importa, a diferença entre classe e objeto, e vai criar sua primeira classe em Python.

## O que é Orientação a Objetos e por que ela existe

POO é um paradigma — um jeito de programar — baseado na interação entre unidades chamadas de **objetos**. Em vez de espalhar dados e funções soltas pelo código, você agrupa características e comportamentos relacionados dentro de uma mesma estrutura. Isso já é uma pista de por que ela existe: conforme um programa cresce, funções soltas mexendo em dados soltos viram uma bagunça difícil de rastrear — quem usa o quê, e onde. Amarrar dado e comportamento numa mesma unidade ajuda a manter essa relação organizada.

Isso não é só um detalhe de sintaxe. POO está diretamente ligada à arquitetura de software: conceitos bem conhecidos como MVC (Model-View-Controller), separação em camadas e componentização normalmente são implementados usando objetos. Boa parte da literatura clássica sobre boas práticas de código — livros como *Clean Code*, *Clean Architecture* e o catálogo de *Design Patterns* — parte do princípio de que você já entende os fundamentos de POO. Ao longo desta série, você também vai conhecer os princípios de SOLID (cinco regras de design que ajudam a manter classes organizadas e fáceis de mudar) e, mais pra frente, diagramas UML, que são uma forma visual de representar classes e como elas se relacionam.

> **Nota:** você não precisa gostar de POO pra tirar proveito dela — precisa entender. Mesmo que no seu dia a dia você acabe usando outro estilo, os conceitos que essa série cobre aparecem o tempo todo em código de terceiros, em bibliotecas e em discussões de arquitetura.

## Classe vs. objeto

Uma **classe** é um molde: um conjunto de **atributos** (características, tipo substantivos) e **métodos** (ações, tipo verbos) que descreve um tipo de "coisa". Uma classe `Pessoa`, por exemplo, poderia ter atributos como altura e idade, e métodos como correr e comer.

Só que uma classe sozinha não faz nada — ela só descreve o formato. Pra realmente usar isso, você precisa de um **objeto**, que é uma instância concreta criada a partir da classe. Se a classe é a planta de uma casa, o objeto é a casa construída de acordo com aquela planta — e você pode construir várias casas diferentes a partir da mesma planta.

## Criando sua primeira classe

### Exemplo 1 - uma classe com um método simples

Em Python, você define uma classe com a palavra-chave `class`. Veja um primeiro exemplo, sem atributo nenhum ainda, só pra entender a mecânica básica de um método:

```py
class Pessoa:
    def cumprimentar(self):
        print("Oi, tudo bem?")

pessoa = Pessoa()
pessoa.cumprimentar()
```

A saída é:

```py
Oi, tudo bem?
```

Repare em dois detalhes. Primeiro, `pessoa = Pessoa()` cria um objeto — uma instância da classe `Pessoa`. Segundo, o método `cumprimentar` recebe um parâmetro chamado `self`, que é a forma da classe se referir a si mesma; é por causa dele que o método sabe que está "dentro" da classe `Pessoa`. Quando você chama `pessoa.cumprimentar()`, não precisa passar nada no lugar de `self` — o Python cuida disso sozinho, passando o próprio objeto `pessoa`. Se você tentasse chamar esse método direto pela classe, sem antes criar um objeto, ele não teria uma instância pra usar como `self` e o código quebraria — é o objeto que efetivamente "roda" a ação, a classe é só o molde.

### Exemplo 2 - atributos e o método construtor

Um método sem atributo nenhum não aproveita muito da ideia de POO. Pra dar características a uma classe, você usa um método especial chamado `__init__`, conhecido como **método construtor**:

```py
class Pessoa:
    def __init__(self, nome, idade):
        self.nome = nome
        self.idade = idade

    def apresentar(self):
        return f"Oi, eu sou {self.nome} e tenho {self.idade} anos."

pessoa = Pessoa("Marina", 29)
print(pessoa.apresentar())
```

A saída é:

```py
Oi, eu sou Marina e tenho 29 anos.
```

O `__init__` é o primeiro método a rodar, automaticamente, assim que você cria um objeto — é ele que constrói os atributos daquele objeto específico. Aqui, `nome` e `idade` chegam como parâmetros normais (igual em qualquer função) e são guardados em `self.nome` e `self.idade`: é esse `self.` na frente que transforma um valor comum num atributo que fica "grudado" no objeto, disponível pra qualquer outro método da classe usar depois — foi assim que `apresentar` conseguiu acessar `self.nome` e `self.idade` sem precisar recebê-los de novo.

### Exemplo 3 - um método chamando outro método

Dentro de uma classe, um método pode perfeitamente chamar outro — de novo, usando `self` pra indicar que ambos pertencem ao mesmo objeto:

```py
class Pessoa:
    def __init__(self, nome, idade):
        self.nome = nome
        self.idade = idade

    def apresentar(self):
        return f"Oi, eu sou {self.nome} e tenho {self.idade} anos."

    def correr(self, distancia):
        return f"{self.nome} correu {distancia}km."

    def resumo(self):
        print(self.apresentar())
        print(self.correr(5))

pessoa = Pessoa("Marina", 29)
pessoa.resumo()
```

A saída é:

```py
Oi, eu sou Marina e tenho 29 anos.
Marina correu 5km.
```

O método `resumo` não faz nada sozinho — ele só organiza chamadas pra `apresentar` e `correr`, os dois já usando os mesmos atributos definidos lá no construtor. Isso é bem comum em POO: quebrar um comportamento maior em pedaços menores e reutilizáveis, todos operando sobre o mesmo estado do objeto.

Com classes, objetos, atributos e métodos na mão, você já tem o vocabulário básico de POO. O próximo passo é entender que nem tudo dentro de uma classe precisa (ou deve) ficar livremente acessível por fora dela — é aí que entra o encapsulamento, tema do próximo post da série.

**Fonte adaptada:** [Orientação a Objetos em Python (Remake) Aula 1 - Introdução](https://www.youtube.com/watch?v=iCaB60i9hrg), [Aula 2 - Introdução Teórica](https://www.youtube.com/watch?v=d6mXFH9C4LY), [Aula 3 - Conceitos Básicos](https://www.youtube.com/watch?v=nI25IY7vC6c)
