---
layout: post
title: "Python | #14 - Class Methods, Static Methods e Herança Múltipla"
date: 2026-08-11 12:20:00
image: '/assets/img/posts/tutorial-python-class-methods-static-methods-e-heranca-multipla.webp'
description: A diferença entre métodos de instância, class methods e static methods em Python, o decorator @property, e como funciona herança múltipla e multinível entre classes.
category: 'dev'
tags:
- Python
- Programação
- Orientação a Objetos
twitter_text: Class Methods, Static Methods e Herança Múltipla
introduction: "Nesta parte do tutorial, você vai aprender a diferença entre métodos de instância, class methods e static methods, e como funciona herança múltipla em Python."
---

Nos posts sobre orientação a objetos você criou classes, objetos e viu herança de uma classe pai pra uma classe filha. Esse post continua de onde aquele parou, com três assuntos que aparecem bastante em código Python mais maduro: métodos que não dependem de um objeto específico (`@classmethod` e `@staticmethod`), e classes que herdam de mais de uma classe pai ao mesmo tempo.

## Métodos de instância, de classe e estáticos

Todo método que você viu até agora recebe `self` como primeiro parâmetro — é um _método de instância_, que opera sobre um objeto específico. Python também permite dois outros tipos de método, cada um com um propósito diferente.

### Class methods

Um _class method_, marcado com o decorator `@classmethod`, recebe a própria classe como primeiro parâmetro (por convenção chamado `cls`, em vez de `self`) — não um objeto específico. É útil quando o método precisa acessar ou modificar algo que pertence à classe como um todo, não a um objeto individual.

```py
class Funcionario:
    total_contratados = 0

    def __init__(self, nome):
        self.nome = nome
        Funcionario.total_contratados += 1

    @classmethod
    def contratados(cls):
        return cls.total_contratados

Funcionario("Ana")
Funcionario("Bruno")

print(Funcionario.contratados())
```

A saída é:

```py
2
```

Um uso muito comum de class method é como uma **fábrica alternativa** de objetos — um jeito diferente de criar uma instância, além do `__init__` padrão.

```py
class Data:
    def __init__(self, dia, mes, ano):
        self.dia = dia
        self.mes = mes
        self.ano = ano

    @classmethod
    def de_texto(cls, texto):
        dia, mes, ano = texto.split("/")
        return cls(int(dia), int(mes), int(ano))

    def __str__(self):
        return f"{self.dia:02d}/{self.mes:02d}/{self.ano}"

data1 = Data.de_texto("25/12/2026")
print(data1)
```

A saída é:

```py
25/12/2026
```

`Data.de_texto(...)` chama `cls(...)`, que é o mesmo que chamar `Data(...)` — só que de um jeito que aceita um formato de entrada diferente do construtor original.

### Static methods

Um _static method_, marcado com `@staticmethod`, não recebe nem `self` nem `cls` — na prática, é uma função comum que só "mora" dentro da classe por organização, porque está logicamente relacionada a ela.

```py
class Temperatura:
    @staticmethod
    def celsius_para_fahrenheit(celsius):
        return celsius * 9 / 5 + 32

print(Temperatura.celsius_para_fahrenheit(30))
```

A saída é:

```py
86.0
```

Repare que `celsius_para_fahrenheit` não acessa nenhum atributo de instância nem de classe — é só uma função de conversão que faz sentido agrupar dentro de `Temperatura` por organização do código.

> **Nota:** a regra prática pra escolher entre os três: use método de instância quando precisar acessar/alterar dados de um objeto específico (a maioria dos casos); use `@classmethod` quando precisar acessar/alterar algo da classe como um todo, ou pra construtores alternativos; use `@staticmethod` quando o método não precisar de `self` nem de `cls`, e só estiver ali por organização.

## @property: getters e setters mais elegantes

Já que o assunto é decorator em método, vale a pena conhecer mais um: `@property`. No post sobre orientação a objetos, você escreveu getters e setters manuais (`get_saldo()`, `set_saldo()`) pra controlar o acesso a um atributo privado. `@property` faz a mesma coisa, mas deixando o acesso parecer um atributo comum, sem parênteses.

```py
class Conta:
    def __init__(self, titular, saldo):
        self.titular = titular
        self._saldo = saldo

    @property
    def saldo(self):
        return self._saldo

    @saldo.setter
    def saldo(self, valor):
        if valor >= 0:
            self._saldo = valor
        else:
            print("Saldo não pode ser negativo")

conta1 = Conta("Ana", 1000)
print(conta1.saldo)

conta1.saldo = 1500
print(conta1.saldo)

conta1.saldo = -50
```

A saída é:

```py
1000
1500
Saldo não pode ser negativo
```

Repare que `conta1.saldo` e `conta1.saldo = 1500` parecem acesso direto a um atributo comum — sem parênteses de chamada de método —, mas por trás dos panos cada leitura passa pelo método marcado com `@property`, e cada atribuição passa pelo método marcado com `@saldo.setter`. Isso é uma vantagem sobre `get_saldo()`/`set_saldo()`: você ganha a validação de um setter sem obrigar quem usa a classe a lembrar de chamar um método específico pra isso.

## Herança múltipla

Você já viu uma classe filha herdando de uma única classe pai. Python também permite herdar de **mais de uma** classe ao mesmo tempo, listando todas entre parênteses na definição da classe.

```py
class Voador:
    def mover(self):
        print("Voando")

class Nadador:
    def mover(self):
        print("Nadando")

class Pato(Voador, Nadador):
    pass

pato = Pato()
pato.mover()
```

A saída é:

```py
Voando
```

`Pato` herda de `Voador` e `Nadador`, que definem o mesmo método `mover()` de jeitos diferentes. Quando existe esse conflito, o Python segue uma ordem de resolução chamada **MRO** (Method Resolution Order): ele busca o método da esquerda pra direita, na ordem em que as classes pai foram listadas — por isso o método usado foi o de `Voador`, que veio primeiro.

```py
print(Pato.__mro__)
```

A saída é algo como:

```py
(<class '__main__.Pato'>, <class '__main__.Voador'>, <class '__main__.Nadador'>, <class 'object'>)
```

## Herança multinível

_Herança multinível_ é diferente de herança múltipla: em vez de uma classe herdar de várias ao mesmo tempo, é uma cadeia — uma classe herda de outra, que por sua vez já herda de uma terceira.

```py
class Animal:
    def __init__(self, nome):
        self.nome = nome

    def comer(self):
        print(f"{self.nome} está comendo")

class Mamifero(Animal):
    def amamentar(self):
        print(f"{self.nome} está amamentando os filhotes")

class Cachorro(Mamifero):
    def latir(self):
        print(f"{self.nome} está latindo")

rex = Cachorro("Rex")
rex.comer()
rex.amamentar()
rex.latir()
```

A saída é:

```py
Rex está comendo
Rex está amamentando os filhotes
Rex está latindo
```

`Cachorro` herda de `Mamifero`, que herda de `Animal` — então um objeto `Cachorro` tem acesso a métodos das três classes da cadeia inteira.

## Method overloading

Diferente de linguagens como Java, o Python **não tem** sobrecarga de métodos de verdade: se você definir dois métodos com o mesmo nome numa classe, o segundo simplesmente substitui o primeiro.

```py
class Calculadora:
    def somar(self, a, b):
        return a + b

    def somar(self, a, b, c):
        return a + b + c

calc = Calculadora()
print(calc.somar(1, 2, 3))
```

A saída é:

```py
6
```

Se você tentasse chamar `calc.somar(1, 2)` depois disso, receberia um `TypeError`, porque só existe a versão com três parâmetros — a primeira definição foi completamente sobrescrita. O jeito idiomático de simular sobrecarga em Python é usar valores padrão ou `*args`, como você já viu no post sobre funções.

```py
class Calculadora:
    def somar(self, a, b, c=0):
        return a + b + c

calc = Calculadora()
print(calc.somar(1, 2))
print(calc.somar(1, 2, 3))
```

A saída é:

```py
3
6
```

Com class methods e static methods pra organizar comportamentos que não dependem (ou dependem só parcialmente) de um objeto específico, e herança múltipla/multinível pra combinar comportamentos de mais de uma classe, você já tem ferramentas pra modelar relações bem mais ricas entre suas classes. No próximo post, você vai ver o outro lado da moeda: como garantir que uma classe **precisa** implementar certos métodos, com classes abstratas e interfaces.

**Fonte adaptada:** [Python Class Methods](https://www.tutorialspoint.com/python/python_class_methods.htm), [Python Static Methods](https://www.tutorialspoint.com/python/python_static_methods.htm), [Python Multiple Inheritance](https://www.tutorialspoint.com/python/python_multiple_inheritance.htm), [Python Multilevel Inheritance](https://www.tutorialspoint.com/python/python_multilevel_inheritance.htm), [Python Method Overloading](https://www.tutorialspoint.com/python/python_method_overloading.htm)
