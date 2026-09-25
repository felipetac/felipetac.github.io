---
layout: post
title: "Orientação a Objetos em Python #6 - SOLID: Princípio Aberto/Fechado"
date: 2026-08-11 15:26:00
image: '/assets/img/posts/poo-solid-aberto-fechado.webp'
description: O segundo princípio do SOLID explicado na prática - por que uma classe deve estar aberta para extensão mas fechada para modificação, e como associação de classes resolve isso em Python.
category: 'dev'
tags:
- Python
- Programação
- SOLID
twitter_text: "Orientação a Objetos em Python #6 - SOLID: Princípio Aberto/Fechado"
introduction: "Nesta parte da série, você vai entender o princípio Aberto/Fechado do SOLID - o que significa uma classe estar aberta pra extensão mas fechada pra modificação - e como resolver isso na prática usando associação de classes."
---

No post anterior você conheceu a associação de classes: uma classe usando o objeto de outra pra realizar alguma ação, sem recorrer a herança. Esse conceito vai ser a peça central de hoje, porque é a ferramenta que resolve o segundo princípio do SOLID — o "O", de **Open/Closed**, ou Aberto/Fechado. Se você lembra do post #3 desta série, já viu o primeiro princípio, o "S" de Responsabilidade Única; o Aberto/Fechado segue a mesma lógica de deixar o código mais fácil de manter conforme o projeto cresce, só que atacando outro tipo de problema.

## O que diz o princípio Aberto/Fechado

Em poucas palavras: uma classe (ou módulo, ou função) deve estar **aberta para extensão**, mas **fechada para modificação**. Isso não quer dizer que o código nunca pode mudar — quer dizer que, quando você precisa adicionar um novo comportamento, o ideal é conseguir fazer isso sem alterar o código já existente e testado. Em vez de editar uma classe toda vez que surge uma necessidade nova, você estende o comportamento dela por fora.

Parece abstrato, então o melhor jeito de entender é ver o princípio sendo quebrado primeiro.

## Um exemplo que quebra o princípio

Imagine uma classe `Circo` com um método `apresentar`, que decide qual show mostrar de acordo com um comando recebido:

```py
class Circo:
    def apresentar(self, comando):
        if comando == 1:
            print("O palhaço está apresentando seu show.")
        elif comando == 2:
            print("O malabarista está apresentando seu show.")
```

Funciona bem enquanto só existem esses dois shows. O problema aparece quando você precisa adicionar um terceiro, digamos um mágico: a única forma de fazer isso, do jeito que a classe está escrita, é abrir o código de `Circo` e acrescentar mais um `elif`:

```py
class Circo:
    def apresentar(self, comando):
        if comando == 1:
            print("O palhaço está apresentando seu show.")
        elif comando == 2:
            print("O malabarista está apresentando seu show.")
        elif comando == 3:
            print("O mágico está apresentando seu show.")
```

O código continua rodando normalmente, mas a cada novo tipo de artista, essa classe cresce um pouco mais. Com o tempo, `Circo` acumula uma sequência enorme de `if`/`elif`, um método gigante, e qualquer alteração nessa lista vira um risco de quebrar comportamento que já funcionava — exatamente o tipo de fragilidade que o princípio Aberto/Fechado tenta evitar. `Circo` deveria estar fechada pra esse tipo de modificação, e não está.

## Resolvendo com associação de classes

A saída é lembrar do post anterior: em vez de a classe `Circo` conhecer cada tipo de artista, ela pode simplesmente associar-se a um objeto genérico de artista, que sabe se apresentar sozinho. Para isso, criamos uma classe `Artista`:

```py
class Artista:
    def __init__(self, tipo):
        self.tipo = tipo

    def apresentar_show(self):
        print(f"O artista do tipo {self.tipo} vai apresentar o seu show.")
```

E `Circo` deixa de precisar saber quantos ou quais tipos de artista existem — ela só recebe um `Artista` qualquer e delega a apresentação pra ele:

```py
class Circo:
    def apresentar(self, artista: Artista):
        print("O circo está abrindo.")
        artista.apresentar_show()
        print("O público aplaude.")
```

Agora, criar um novo tipo de show é só instanciar `Artista` com um tipo diferente — sem tocar em `Circo`:

```py
palhaco = Artista("palhaço")
magico = Artista("mágico")
malabarista = Artista("malabarista")

circo = Circo()
circo.apresentar(palhaco)
```

A saída é:

```py
O circo está abrindo.
O artista do tipo palhaço vai apresentar o seu show.
O público aplaude.
```

Trocar `palhaco` por `magico` ou `malabarista` na chamada de `apresentar` muda o show sem que uma única linha de `Circo` precise ser editada. É isso que significa estar aberta para extensão (você pode criar quantos tipos novos de `Artista` quiser) e fechada para modificação (o código de `Circo` nunca muda por causa disso).

> **Nota:** essa solução não é a única forma de aplicar o princípio Aberto/Fechado — herança e polimorfismo também resolvem esse mesmo problema, e você vai ver isso mais adiante na série. Associação de classes é só a ferramenta mais direta pra esse caso específico, onde uma classe delega comportamento a outra em vez de decidir tudo internamente.

O princípio Aberto/Fechado vai aparecer de novo, de outra forma, quando falarmos de injeção de dependência — que é justamente o assunto do próximo post desta série: uma maneira mais estruturada de fazer uma classe depender de outra sem perder essa flexibilidade.

**Fonte adaptada:** [SOLID (O) - Aberto/Fechado - Programador Lhama](https://www.youtube.com/watch?v=pKWmUuAVLDs)
