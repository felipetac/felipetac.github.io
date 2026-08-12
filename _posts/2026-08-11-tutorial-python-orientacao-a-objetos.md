---
layout: post
title: "#11 - Orientação a Objetos em Python"
date: 2026-08-11 11:20:00
image: '/assets/img/posts/tutorial-python-orientacao-a-objetos.webp'
description: Uma introdução prática à orientação a objetos em Python - classes, __init__, self, atributos, métodos, herança, polimorfismo, encapsulamento e classes internas.
category: 'dev'
tags:
- Python
- Programação
- Orientação a Objetos
twitter_text: Orientação a Objetos em Python
introduction: "Nesta parte do tutorial, você vai aprender orientação a objetos em Python - classes, objetos, herança, polimorfismo, encapsulamento e classes internas."
---

Você já usou orientação a objetos em Python sem necessariamente perceber: toda string, toda lista, todo dicionário que você criou até agora é, por baixo dos panos, um objeto — instância de uma classe (`str`, `list`, `dict`) que já vem pronta na linguagem. Quando você chama `minha_lista.append(1)`, está chamando um método de um objeto.

Neste post você vai aprender a criar suas próprias classes. É um post mais longo que os anteriores porque orientação a objetos é, de certa forma, um jeito diferente de organizar o raciocínio sobre um programa — vale a pena entender cada peça com calma: classes e objetos, o construtor `__init__`, o parâmetro `self`, atributos e métodos, herança, polimorfismo, encapsulamento e classes internas.

## O que é orientação a objetos

Orientação a objetos (OOP, na sigla em inglês) é um jeito de organizar código em torno de _classes_ e _objetos_, em vez de só funções soltas operando sobre dados soltos. Uma classe funciona como uma "planta" ou "molde" que descreve que atributos e comportamentos um tipo de objeto deve ter; um objeto é uma instância concreta construída a partir dessa planta.

Pense na classe `Carro` como o desenho técnico, e cada carro específico (seu Fusca vermelho, o Civic do seu vizinho) como um objeto — uma instância — construído a partir daquele desenho, cada um com sua própria cor, placa e quilometragem.

As vantagens de programar assim incluem:

- Deixa a estrutura do programa mais próxima de como pensamos sobre o problema do mundo real;
- Facilita manutenção, reuso e depuração de código;
- Segue o princípio DRY ("Don't Repeat Yourself" — não se repita);
- Permite construir aplicações complexas combinando peças menores e reutilizáveis.

## Criando classes e objetos

Uma classe é definida com a palavra-chave `class`. Por convenção, o nome da classe começa com letra maiúscula.

```py
class Pessoa:
    especie = "Homo sapiens"
```

Pra criar um objeto (uma instância) a partir dessa classe, você chama a classe como se fosse uma função:

```py
class Pessoa:
    especie = "Homo sapiens"

p1 = Pessoa()
print(p1.especie)
```

A saída é:

```py
Homo sapiens
```

`especie` aqui é um atributo de classe — compartilhado por todos os objetos criados a partir de `Pessoa`, a menos que um objeto específico sobrescreva o próprio valor.

### Classe vazia

Se você precisar de uma classe "esqueleto" por enquanto, sem nenhum atributo ainda, use `pass`:

```py
class Placeholder:
    pass
```

### Apagando um objeto

Um objeto pode ser removido da memória com `del`:

```py
p1 = Pessoa()
del p1
```

Depois disso, tentar usar `p1` gera um erro, já que o objeto não existe mais.

## O método __init__

Na prática, você quase nunca cria objetos com atributos totalmente fixos como no exemplo acima — o normal é que cada objeto tenha seus próprios valores, definidos no momento da criação. É pra isso que existe o `__init__`, o _construtor_ da classe: um método especial, chamado automaticamente toda vez que você cria um novo objeto.

```py
class Pessoa:
    def __init__(self, nome, idade):
        self.nome = nome
        self.idade = idade

p1 = Pessoa("Ana", 28)
print(p1.nome)
print(p1.idade)
```

A saída é:

```py
Ana
28
```

Sem o `__init__`, você precisaria atribuir cada atributo manualmente depois de criar o objeto (`p1.nome = "Ana"`, `p1.idade = 28`) — o que funciona, mas é repetitivo e fácil de esquecer.

### Valores padrão no construtor

Assim como em qualquer função, os parâmetros do `__init__` podem ter valores padrão.

```py
class Pessoa:
    def __init__(self, nome, idade=18):
        self.nome = nome
        self.idade = idade

p1 = Pessoa("Carlos")
p2 = Pessoa("Bia", 32)

print(p1.nome, p1.idade)
print(p2.nome, p2.idade)
```

A saída é:

```py
Carlos 18
Bia 32
```

## O parâmetro self

Repare que todo método da classe, incluindo o `__init__`, recebe `self` como primeiro parâmetro. `self` é uma referência à instância atual — é através dele que um método acessa e modifica os atributos daquele objeto específico, e não de outro.

```py
class Pessoa:
    def __init__(self, nome, idade):
        self.nome = nome
        self.idade = idade

    def apresentar(self):
        print(f"Eu sou {self.nome} e tenho {self.idade} anos.")

p1 = Pessoa("Ana", 28)
p2 = Pessoa("Bruno", 41)

p1.apresentar()
p2.apresentar()
```

A saída é:

```py
Eu sou Ana e tenho 28 anos.
Eu sou Bruno e tenho 41 anos.
```

Sem `self`, não haveria como o método `apresentar` saber se deve usar os dados de `p1` ou de `p2` — é o `self` que amarra a chamada ao objeto certo.

> **Nota:** o nome `self` não é uma palavra reservada, é só uma convenção fortíssima — tecnicamente você poderia chamar o primeiro parâmetro de qualquer coisa (`this`, `instancia`), mas praticamente todo código Python do mundo usa `self`, e fugir disso só confunde quem for ler seu código.

## Atributos (properties)

Atributos são as variáveis que guardam os dados de um objeto. Eles podem ser definidos no `__init__` (atributos de instância, próprios de cada objeto) ou diretamente no corpo da classe (atributos de classe, compartilhados).

### Acessando e modificando atributos

Atributos são acessados e alterados com a notação de ponto.

```py
class Carro:
    def __init__(self, marca, modelo):
        self.marca = marca
        self.modelo = modelo

meu_carro = Carro("Toyota", "Corolla")
print(meu_carro.marca, meu_carro.modelo)

meu_carro.modelo = "Corolla Cross"
print(meu_carro.modelo)
```

A saída é:

```py
Toyota Corolla
Toyota Corolla Cross
```

### Apagando um atributo

```py
del meu_carro.modelo
print(meu_carro.marca)
```

Depois do `del`, tentar acessar `meu_carro.modelo` de novo gera um `AttributeError` — o atributo simplesmente não existe mais naquele objeto.

### Adicionando atributos dinamicamente

Python permite adicionar um atributo novo a um objeto já criado, mesmo que ele não esteja no `__init__`. Isso afeta só aquele objeto específico, não a classe inteira nem os outros objetos.

```py
meu_carro.ano = 2022
print(meu_carro.ano)

outro_carro = Carro("Honda", "Civic")
print(hasattr(outro_carro, "ano"))
```

A saída é:

```py
2022
False
```

## Métodos

_Métodos_ são as funções definidas dentro de uma classe — eles descrevem o comportamento dos objetos. Você já viu um exemplo com `apresentar()` acima; vamos ver mais alguns padrões comuns.

### Métodos com parâmetros

Métodos aceitam argumentos como qualquer função, só que sempre com `self` na frente.

```py
class Calculadora:
    def somar(self, a, b):
        return a + b

    def multiplicar(self, a, b):
        return a * b

calc = Calculadora()
print(calc.somar(3, 4))
print(calc.multiplicar(3, 4))
```

A saída é:

```py
7
12
```

### Métodos que modificam o próprio objeto

```py
class Pessoa:
    def __init__(self, nome, idade):
        self.nome = nome
        self.idade = idade

    def fazer_aniversario(self):
        self.idade += 1

p1 = Pessoa("Ana", 28)
p1.fazer_aniversario()
print(p1.idade)
```

A saída é:

```py
29
```

### O método especial __str__

Por padrão, imprimir um objeto direto mostra algo pouco útil, tipo `<__main__.Pessoa object at 0x...>`. Definindo `__str__`, você controla o que aparece quando o objeto é convertido pra texto (por `print()`, por exemplo).

```py
class Pessoa:
    def __init__(self, nome, idade):
        self.nome = nome
        self.idade = idade

    def __str__(self):
        return f"{self.nome} ({self.idade} anos)"

p1 = Pessoa("Ana", 28)
print(p1)
```

A saída é:

```py
Ana (28 anos)
```

## Herança

_Herança_ permite criar uma classe nova a partir de uma classe já existente, reaproveitando (e podendo estender) tudo o que ela já tem. A classe original é chamada de _classe pai_ (ou classe base); a nova é a _classe filha_ (ou classe derivada).

```py
class Pessoa:
    def __init__(self, nome, sobrenome):
        self.nome = nome
        self.sobrenome = sobrenome

    def nome_completo(self):
        print(self.nome, self.sobrenome)
```

### Criando a classe filha

Basta colocar a classe pai entre parênteses na definição da classe filha. Se a classe filha não definir nada de novo, ela já herda tudo do pai.

```py
class Aluno(Pessoa):
    pass

aluno1 = Aluno("João", "Silva")
aluno1.nome_completo()
```

A saída é:

```py
João Silva
```

### Sobrescrevendo o __init__ com super()

Normalmente você quer que a classe filha tenha atributos próprios além dos herdados. Nesse caso, ela define seu próprio `__init__`, e usa `super()` pra chamar o `__init__` da classe pai, sem precisar repetir a lógica dele.

```py
class Aluno(Pessoa):
    def __init__(self, nome, sobrenome, ano_formatura):
        super().__init__(nome, sobrenome)
        self.ano_formatura = ano_formatura

aluno1 = Aluno("João", "Silva", 2027)
aluno1.nome_completo()
print(aluno1.ano_formatura)
```

A saída é:

```py
João Silva
2027
```

`super().__init__(nome, sobrenome)` delega a inicialização de `nome` e `sobrenome` pra classe `Pessoa`, deixando o `__init__` de `Aluno` responsável só pelo que é específico dele (`ano_formatura`).

### Adicionando e sobrescrevendo métodos

A classe filha pode adicionar métodos novos, ou redefinir um método herdado com um comportamento diferente — isso se chama _sobrescrita_ (override).

```py
class Aluno(Pessoa):
    def __init__(self, nome, sobrenome, ano_formatura):
        super().__init__(nome, sobrenome)
        self.ano_formatura = ano_formatura

    def nome_completo(self):
        print(f"{self.nome} {self.sobrenome} (turma {self.ano_formatura})")

aluno1 = Aluno("João", "Silva", 2027)
aluno1.nome_completo()
```

A saída é:

```py
João Silva (turma 2027)
```

Repare que `nome_completo()` aqui é uma versão nova, específica de `Aluno` — ela substitui, pra objetos dessa classe, o método original de `Pessoa`.

## Polimorfismo

_Polimorfismo_ significa "muitas formas": a mesma operação (o mesmo nome de método, ou a mesma função embutida) se comporta de maneira diferente dependendo do tipo do objeto envolvido.

### Polimorfismo em funções embutidas

Você já usa polimorfismo o tempo todo sem perceber. A função `len()`, por exemplo, funciona em tipos completamente diferentes, cada um com sua própria noção de "tamanho":

```py
print(len("Python"))
print(len([1, 2, 3, 4]))
print(len({"a": 1, "b": 2}))
```

A saída é:

```py
6
4
2
```

### Polimorfismo entre classes

Classes diferentes, sem relação de herança entre si, podem implementar um método de mesmo nome, cada uma com sua própria lógica.

```py
class Carro:
    def mover(self):
        print("Dirigindo pela estrada")

class Barco:
    def mover(self):
        print("Navegando pela água")

class Aviao:
    def mover(self):
        print("Voando pelo céu")

for veiculo in (Carro(), Barco(), Aviao()):
    veiculo.mover()
```

A saída é:

```py
Dirigindo pela estrada
Navegando pela água
Voando pelo céu
```

O `for` chama `veiculo.mover()` sem se importar com o tipo exato de `veiculo` — cada objeto responde da sua própria maneira à mesma chamada.

### Polimorfismo com herança

O caso mais comum na prática combina polimorfismo com herança: uma classe pai define um método, e cada classe filha sobrescreve esse método com seu próprio comportamento.

```py
class Veiculo:
    def __init__(self, marca, modelo):
        self.marca = marca
        self.modelo = modelo

    def mover(self):
        print("Se movendo...")

class Carro(Veiculo):
    def mover(self):
        print("Dirigindo!")

class Barco(Veiculo):
    def mover(self):
        print("Navegando!")

for veiculo in (Carro("Ford", "Ka"), Barco("Yamaha", "242X")):
    print(veiculo.marca, veiculo.modelo)
    veiculo.mover()
```

A saída é:

```py
Ford Ka
Dirigindo!
Yamaha 242X
Navegando!
```

## Encapsulamento

_Encapsulamento_ é o princípio de proteger os dados internos de um objeto, controlando como código de fora pode acessar ou modificar esses dados — em vez de deixar tudo livremente exposto e sujeito a alterações indevidas.

### Convenção de um underscore: atributo "protegido"

Um nome de atributo (ou método) começando com um único `_` é uma convenção que sinaliza "isso é detalhe interno, não mexa direto de fora" — mas o Python não impede o acesso, é só um combinado entre programadores.

```py
class Conta:
    def __init__(self, titular, saldo):
        self.titular = titular
        self._saldo = saldo
```

Nada impede tecnicamente que alguém escreva `conta._saldo = 999999` de fora da classe — é só uma convenção, não uma trava de verdade.

### Dois underscores: atributo "privado"

Já um nome começando com dois underscores (`__`) sofre _name mangling_: o Python renomeia o atributo internamente (de `__saldo` para `_Conta__saldo`, por exemplo), o que dificulta bastante o acesso acidental de fora da classe.

```py
class Conta:
    def __init__(self, titular, saldo):
        self.titular = titular
        self.__saldo = saldo

    def consultar_saldo(self):
        return self.__saldo

    def depositar(self, valor):
        if valor > 0:
            self.__saldo += valor
        else:
            print("Valor de depósito precisa ser positivo")

conta1 = Conta("Ana", 1000)
conta1.depositar(500)
print(conta1.consultar_saldo())
```

A saída é:

```py
1500
```

### Getters e setters

O padrão pra controlar o acesso a um atributo privado é expor métodos específicos pra ler (_getter_) e escrever (_setter_) o valor, aplicando validações no caminho.

```py
class Conta:
    def __init__(self, titular, saldo):
        self.titular = titular
        self.__saldo = saldo

    def get_saldo(self):
        return self.__saldo

    def set_saldo(self, valor):
        if valor >= 0:
            self.__saldo = valor
        else:
            print("Saldo não pode ser negativo")

conta1 = Conta("Ana", 1000)
conta1.set_saldo(-50)
print(conta1.get_saldo())
```

A saída é:

```py
Saldo não pode ser negativo
1000
```

> **Nota:** encapsulamento em Python é mais uma questão de convenção e boas práticas do que uma trava rígida imposta pela linguagem — bem diferente de linguagens como Java, onde `private` é reforçado pelo compilador. Mesmo assim, vale seguir o padrão: use `_` ou `__` pra deixar claro o que é implementação interna, e exponha só o que realmente faz parte da interface pública da sua classe.

## Classes internas (inner classes)

Uma _classe interna_ é uma classe definida dentro de outra classe. Ela costuma fazer sentido quando um conceito só existe no contexto da classe externa, e não faz sentido usá-lo isoladamente.

```py
class Carro:
    def __init__(self, marca, modelo):
        self.marca = marca
        self.modelo = modelo
        self.motor = self.Motor()

    class Motor:
        def ligar(self):
            print("Motor ligado")

        def desligar(self):
            print("Motor desligado")

meu_carro = Carro("Fiat", "Argo")
meu_carro.motor.ligar()
meu_carro.motor.desligar()
```

A saída é:

```py
Motor ligado
Motor desligado
```

Repare que, pra acessar a classe interna a partir de fora, você primeiro cria um objeto da classe externa (`Carro`) e depois acessa o atributo que guarda a instância da classe interna (`meu_carro.motor`).

### Múltiplas classes internas

Uma classe externa pode agrupar mais de uma classe interna, quando faz sentido organizar assim.

```py
class Computador:
    def __init__(self):
        self.cpu = self.CPU()
        self.memoria = self.Memoria()

    class CPU:
        def processar(self):
            print("Processando instruções")

    class Memoria:
        def armazenar(self):
            print("Armazenando dados")

pc = Computador()
pc.cpu.processar()
pc.memoria.armazenar()
```

A saída é:

```py
Processando instruções
Armazenando dados
```

Classes internas ajudam a organizar código relacionado, mas não abuse delas — na maioria dos casos, classes separadas no mesmo módulo já resolvem, e são mais simples de testar isoladamente.

E com isso você já tem a base de orientação a objetos em Python: classes e objetos, construtor e `self`, atributos e métodos, herança com `super()`, polimorfismo, encapsulamento e classes internas. É bastante conteúdo, mas é também a base de praticamente todo framework e biblioteca Python que você vai usar daqui pra frente.

**Fonte adaptada:** [Python OOP](https://www.w3schools.com/python/python_oop.asp), [Python Classes/Objects](https://www.w3schools.com/python/python_classes.asp), [Python __init__() Function](https://www.w3schools.com/python/python_class_init.asp), [Python self Parameter](https://www.w3schools.com/python/python_class_self.asp), [Python Class Properties](https://www.w3schools.com/python/python_class_properties.asp), [Python Class Methods](https://www.w3schools.com/python/python_class_methods.asp), [Python Inheritance](https://www.w3schools.com/python/python_inheritance.asp), [Python Polymorphism](https://www.w3schools.com/python/python_polymorphism.asp), [Python Encapsulation](https://www.w3schools.com/python/python_encapsulation.asp), [Python Inner Classes](https://www.w3schools.com/python/python_class_inner.asp)
