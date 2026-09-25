---
layout: post
title: "Orientação a Objetos #8 - Herança e Encapsulamento Protegido"
date: 2026-08-11 15:28:00
image: '/assets/img/posts/poo-heranca-e-encapsulamento-protegido.webp'
description: Como funciona herança de classes em Python, o uso de super().__init__(), e o terceiro tipo de encapsulamento - o protegido - em contraste com o encapsulamento privado.
category: 'dev'
tags:
- Python
- Programação
- Herança
twitter_text: "Orientação a Objetos #8 - Herança e Encapsulamento Protegido"
introduction: "Nesta parte da série, você vai aprender como funciona herança em Python, como reaproveitar o construtor da classe mãe com super().__init__(), e o que é o encapsulamento protegido."
---

No post anterior você viu injeção de dependência — uma classe que só existe se receber, no construtor, um objeto de outra classe da qual depende. Herança é um tipo diferente de relação entre classes: em vez de uma classe usar um objeto de outra como atributo, ela passa a *ser* um tipo daquela outra classe, herdando tudo que ela tem de público. É um dos pilares clássicos da orientação a objetos, junto com o encapsulamento que você já viu nos posts iniciais desta série.

## O que é herança

Herança é o mecanismo pelo qual uma classe (chamada de classe filha, ou subclasse) reaproveita atributos e métodos de outra classe (a classe mãe, ou superclasse), sem precisar reescrever nada. Em Python, isso é declarado colocando a classe mãe entre parênteses na definição da classe filha.

Veja uma classe `Mamifero` bem simples:

```py
class Mamifero:
    def __init__(self):
        self.localizacao = "Brasil"

    def andar(self):
        print(f"O animal está andando pelo {self.localizacao}.")
```

Agora, uma classe `Cachorro` que herda de `Mamifero`:

```py
class Cachorro(Mamifero):
    pass
```

Repare que `Cachorro` não tem nenhum atributo nem método próprio — só a palavra `pass`, indicando um corpo vazio. Ainda assim, por causa da herança, tudo que é público em `Mamifero` passa a existir também em `Cachorro`:

```py
dog = Cachorro()
dog.andar()

print(dog.localizacao)
```

A saída é:

```py
O animal está andando pelo Brasil.
Brasil
```

Mesmo sem nenhum código próprio, `dog` consegue chamar `andar()` e acessar `localizacao`, porque essas duas coisas vêm da classe mãe. É essa transferência automática de comportamento público que define a herança.

## Estendendo a classe filha com métodos próprios

Uma classe filha não precisa ficar vazia — ela pode ter seus próprios métodos, além dos que herda, e pode até chamar métodos da classe mãe internamente através de `self`:

```py
class Cachorro(Mamifero):
    def latir(self):
        print("O animal está latindo.")
        self.andar()
```

```py
dog = Cachorro()
dog.latir()
```

A saída é:

```py
O animal está latindo.
O animal está andando pelo Brasil.
```

`latir` é um método que só existe em `Cachorro`, mas dentro dele conseguimos chamar `self.andar()` normalmente, porque esse método veio herdado de `Mamifero`. A herança vale numa única direção: a classe filha acessa tudo que é público na classe mãe, mas o contrário não é verdade — um objeto `Mamifero` não teria acesso a `latir()`, que existe só em `Cachorro`.

### Usando super().__init__() para reaproveitar o construtor da classe mãe

Se a classe mãe exige algum parâmetro no construtor, a classe filha também precisa lidar com isso — e é aí que entra `super()`. Imagine que `Mamifero` passe a receber a localização como parâmetro, em vez de fixar "Brasil":

```py
class Mamifero:
    def __init__(self, localizacao):
        self.localizacao = localizacao

    def andar(self):
        print(f"O animal está andando pelo {self.localizacao}.")
```

Se `Cachorro` continuar vazia, criar um objeto dela vai dar erro, porque o construtor de `Mamifero` agora exige um argumento que ninguém está passando. A solução é dar a `Cachorro` seu próprio construtor, que chama o construtor da classe mãe através de `super().__init__()`:

```py
class Cachorro(Mamifero):
    def __init__(self, localizacao):
        super().__init__(localizacao)

    def latir(self):
        print("O animal está latindo.")
```

```py
dog = Cachorro("Chile")
dog.andar()
```

A saída é:

```py
O animal está andando pelo Chile.
```

`super().__init__(localizacao)` é a forma de dizer "execute o construtor da classe mãe, passando esse valor pra ele" — sem isso, `Cachorro` teria que reimplementar a lógica de guardar `localizacao` sozinha, duplicando código que já existe em `Mamifero`. O mesmo padrão vale pra quantas classes filhas você quiser: uma classe `Gato(Mamifero)`, por exemplo, teria seu próprio `__init__` chamando `super().__init__(localizacao)` e um método `miar` só dela, seguindo exatamente a mesma lógica de `Cachorro`.

> **Nota:** herança não se limita a uma única classe filha por classe mãe — várias classes diferentes podem herdar da mesma superclasse (como `Cachorro` e `Gato`, ambas herdando de `Mamifero`), cada uma acrescentando seu próprio comportamento específico por cima do que já vem herdado.

## Encapsulamento protegido

Nos primeiros posts desta série você viu dois níveis de encapsulamento: público (sem underline) e privado (dois underlines, `__atributo`), que só é acessível dentro da própria classe onde foi definido — nem uma classe filha consegue acessar um atributo ou método privado da classe mãe. Existe um terceiro nível, intermediário entre os dois: o **encapsulamento protegido**, marcado com um único underline (`_atributo`).

Veja a diferença na prática. Primeiro, um método privado dentro de `Mamifero`, chamado por um método de `Gato`:

```py
class Mamifero:
    def __init__(self, localizacao):
        self.localizacao = localizacao

    def __dormir(self):
        print("O animal está dormindo.")


class Gato(Mamifero):
    def miar(self):
        print("O gato está miando.")
        self.__dormir()
```

Chamar `Gato("Argentina").miar()` termina em erro: `__dormir`, com dois underlines, não é visível nem mesmo pra `Gato`, que é uma classe filha de `Mamifero`. Agora troque para um único underline:

```py
class Mamifero:
    def __init__(self, localizacao):
        self.localizacao = localizacao

    def _dormir(self):
        print("O animal está dormindo.")


class Gato(Mamifero):
    def miar(self):
        print("O gato está miando.")
        self._dormir()
```

```py
cat = Gato("Argentina")
cat.miar()
```

A saída é:

```py
O gato está miando.
O animal está dormindo.
```

Com um único underline, o método passa a ser acessível pela classe filha — essa é justamente a proposta do encapsulamento protegido: visível pra própria classe e pras suas classes filhas, mas não pensado pra ser chamado por fora dessa hierarquia.

> **Nota:** em outras linguagens, um atributo ou método protegido realmente barra o acesso vindo de fora da hierarquia de classes. Em Python isso não é imposto pelo interpretador — `cat._dormir()`, chamado diretamente de fora das classes, funciona sem erro nenhum. O único underline é uma convenção, um aviso pra quem está lendo o código de que aquele elemento não deveria ser usado por ali, mesmo sendo tecnicamente possível.

Com os três níveis de encapsulamento — público, protegido e privado — e a herança que você viu hoje, fecha-se um conjunto de ferramentas bem sólido pra modelar relações entre classes. No próximo post da série, esses dois conceitos se encontram: você vai ver polimorfismo e o princípio de Substituição de Liskov do SOLID, que trata justamente de como classes filhas devem se comportar em relação às suas classes mãe.

**Fonte adaptada:** [Herança - Programador Lhama](https://www.youtube.com/watch?v=2oy76Qf_YRs), [Encapsulamento Protegido - Programador Lhama](https://www.youtube.com/watch?v=DSi0xR9Xz9M)
