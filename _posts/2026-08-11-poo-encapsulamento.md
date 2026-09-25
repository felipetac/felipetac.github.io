---
layout: post
title: "Orientação a Objetos em Python #2 - Encapsulamento"
date: 2026-08-11 15:22:00
image: '/assets/img/posts/poo-encapsulamento.webp'
description: Como proteger o estado interno de uma classe em Python com encapsulamento - a convenção de atributos e métodos privados com underscore, name mangling, e getters/setters com @property.
category: 'dev'
tags:
- Python
- Programação
- Encapsulamento
twitter_text: "Orientação a Objetos em Python #2 - Encapsulamento"
introduction: "Nesta parte da série, você vai aprender o que é encapsulamento, como marcar atributos e métodos como privados em Python, e como usar getters e setters para controlar o acesso ao estado de um objeto."
---

No post anterior, você criou sua primeira classe `Pessoa`, com atributos `nome` e `idade` totalmente abertos: qualquer código que tivesse um objeto `Pessoa` em mãos podia ler ou sobrescrever esses valores livremente, sem passar por nenhuma verificação. Isso funciona bem pra um exemplo pequeno, mas conforme uma classe cresce e passa a guardar informação mais sensível — o saldo de uma conta, o CPF de alguém — esse acesso livre começa a ser um problema. É aí que entra o **encapsulamento**, um dos pilares clássicos da Orientação a Objetos.

Nesta parte, você vai entender o que é encapsulamento, a convenção Python pra marcar atributos e métodos como privados, e como usar getters e setters pra controlar esse acesso de forma mais segura.

## O que é encapsulamento

Encapsulamento é a ideia de proteger o estado interno de um objeto, expondo pra fora da classe só o que realmente precisa ser público. Tudo que é detalhe de implementação — como um cálculo é feito, como um dado é validado antes de ser aceito — fica escondido dentro da classe; só a interface necessária fica visível pra quem usa o objeto de fora.

Python não tem um jeito de declarar `private`/`public` explicitamente como algumas outras linguagens. Em vez disso, usa uma convenção baseada em underscore no início do nome.

## Um underscore: "isso é privado, por favor não mexa"

Prefixar um atributo ou método com um único underscore (`_saldo`, por exemplo) é um sinal — só uma convenção, sem nenhuma trava real do interpretador — dizendo "isso é detalhe interno, não deveria ser usado por fora da classe". Ainda dá pra acessar `objeto._saldo` de fora sem erro nenhum, mas quem faz isso está avisado de que está pisando em território que não é dele.

## Dois underscores: privado de verdade (via name mangling)

Quando você usa dois underscores na frente (`__saldo`), o Python vai além da convenção e aplica uma técnica chamada **name mangling**: por trás dos panos, o nome do atributo é reescrito internamente para algo como `_NomeDaClasse__saldo`. Na prática, isso torna o acesso direto por fora da classe bem mais difícil:

```py
class ContaBancaria:
    def __init__(self, saldo):
        self.__saldo = saldo

    def mostrar_saldo(self):
        print(f"Saldo atual: R$ {self.__saldo}")

conta = ContaBancaria(150)
conta.mostrar_saldo()
print(conta.__saldo)
```

A saída é:

```py
Saldo atual: R$ 150
Traceback (most recent call last):
  ...
AttributeError: 'ContaBancaria' object has no attribute '__saldo'
```

`mostrar_saldo()` acessa `self.__saldo` sem problema nenhum, porque está rodando de dentro da própria classe. Já a tentativa de acessar `conta.__saldo` direto de fora falha, porque esse nome simplesmente não existe naquele formato lá fora — foi reescrito. O mesmo vale pra métodos: um método com dois underscores na frente só pode ser chamado de dentro da própria classe, nunca a partir de um objeto por fora dela.

> **Nota:** o duplo underscore não deixa o dado 100% inacessível — ainda dá pra chegar nele usando o nome reescrito (`conta._ContaBancaria__saldo`), mas isso já é claramente forçar a barra contra a intenção da classe. Na prática, o objetivo do name mangling não é criar um cofre inquebrável, e sim deixar bem claro, e um pouco mais difícil, que aquele acesso não deveria acontecer.

## Métodos privados para organizar lógica interna

Além de esconder dados, é comum usar métodos privados pra quebrar uma lógica maior em passos menores que só fazem sentido internamente. Veja uma classe `Pedido` que separa a parte de calcular o total da parte de mostrar o resumo pro usuário:

```py
class Pedido:
    def __init__(self, itens):
        self.itens = itens

    def __calcular_total(self):
        return sum(self.itens)

    def resumo(self):
        total = self.__calcular_total()
        print(f"Total do pedido: R$ {total}")

pedido = Pedido([50, 30, 20])
pedido.resumo()
```

A saída é:

```py
Total do pedido: R$ 100
```

Quem usa a classe `Pedido` só precisa saber que existe um método `resumo()` — não precisa (e não deveria) se preocupar em como o total é calculado por dentro. Se um dia a lógica de cálculo mudar (por exemplo, pra incluir desconto), só `__calcular_total` muda; ninguém que depende de `Pedido` de fora é afetado.

## Getters e setters

Se um atributo é privado, como alguém de fora consegue ler ou atualizar esse valor de forma controlada? A resposta clássica são os métodos **getter** (pra ler) e **setter** (pra escrever), e Python tem duas formas comuns de escrever isso.

A mais direta é criar métodos comuns:

```py
class ContaBancaria:
    def __init__(self, saldo):
        self.__saldo = saldo

    def obter_saldo(self):
        return self.__saldo

    def definir_saldo(self, valor):
        if valor < 0:
            print("Saldo não pode ser negativo.")
            return
        self.__saldo = valor

conta = ContaBancaria(150)
conta.definir_saldo(300)
print(conta.obter_saldo())
```

A saída é:

```py
300
```

A vantagem aqui é dar pra colocar uma verificação dentro de `definir_saldo` — nesse caso, recusar um valor negativo — algo que não seria possível se `saldo` fosse só um atributo público qualquer.

A segunda forma usa os decoradores `@property` e `@<atributo>.setter`, que fazem um método se comportar como se fosse um atributo comum, sem precisar de parênteses pra chamar:

```py
class ContaBancaria:
    def __init__(self, saldo):
        self.__saldo = saldo

    @property
    def saldo(self):
        return self.__saldo

    @saldo.setter
    def saldo(self, valor):
        if valor < 0:
            raise ValueError("Saldo não pode ser negativo.")
        self.__saldo = valor

conta = ContaBancaria(150)
conta.saldo = 300
print(conta.saldo)
```

A saída é:

```py
300
```

Repare que `conta.saldo = 300` parece uma atribuição direta a um atributo comum, mas por baixo dos panos está chamando o método marcado com `@saldo.setter` — incluindo a validação que ele contém. Vale usar com moderação: como esconde o fato de que existe um método rodando ali, algumas pessoas preferem manter getters e setters como métodos explícitos (`obter_saldo`/`definir_saldo`) justamente pra deixar claro, só de olhar o código, que aquilo é uma chamada de método, não um atributo puro. Nenhuma das duas formas está errada — é uma questão de preferência e de convenção do time.

Com encapsulamento, você já sabe proteger o estado de uma classe e controlar como ele é acessado. No próximo post, vamos usar métodos privados de novo — mas dessa vez com outro objetivo: separar responsabilidades diferentes dentro de uma mesma classe, o primeiro dos princípios de SOLID, o Princípio da Responsabilidade Única.

**Fonte adaptada:** [Orientação a Objetos em Python (Remake) Aula 4 - Métodos Privados](https://www.youtube.com/watch?v=PF0XlWzGtHI), [Aula 5 - Getters/Setters e Encapsulamento](https://www.youtube.com/watch?v=AF_OrvHpqlU)
