---
layout: post
title: "Orientação a Objetos em Python #3 - SOLID: Responsabilidade Única"
date: 2026-08-11 15:23:00
image: '/assets/img/posts/poo-solid-responsabilidade-unica.webp'
description: Uma introdução aos cinco princípios de SOLID em Python, com foco no primeiro deles - o Princípio da Responsabilidade Única - e como usar métodos privados para separar responsabilidades dentro de uma classe.
category: 'dev'
tags:
- Python
- Programação
- SOLID
twitter_text: "Orientação a Objetos em Python #3 - SOLID: Responsabilidade Única"
introduction: "Nesta parte da série, você vai conhecer os cinco princípios de SOLID e vai se aprofundar no primeiro deles - o Princípio da Responsabilidade Única - refatorando uma classe que fazia coisa demais."
---

No post anterior, você usou métodos privados pra esconder detalhes de implementação de fora da classe — o objetivo ali era proteger o estado do objeto. Agora você vai usar essa mesma ferramenta, métodos privados, só que com um objetivo diferente: separar responsabilidades distintas que estavam misturadas dentro de uma única classe. É esse o assunto da primeira letra de **SOLID**.

Nesta parte da série, você vai conhecer rapidamente o que é o acrônimo SOLID e vai se aprofundar no seu primeiro princípio: o da Responsabilidade Única.

## O que é SOLID

SOLID é um acrônimo que reúne cinco princípios de design de código orientado a objetos, cada um representado por uma letra: **S**ingle Responsibility, **O**pen/Closed, **L**iskov Substitution, **I**nterface Segregation e **D**ependency Inversion. A ideia surgiu associada ao trabalho de Robert C. Martin — o "Uncle Bob" —, autor de livros como *Clean Architecture*, onde o assunto é discutido em detalhe. O objetivo comum dos cinco princípios é o mesmo: ajudar a escrever classes mais fáceis de entender, de estender e de manter conforme o sistema cresce, evitando aquele tipo de código onde mexer numa parte pequena acaba quebrando outra parte que, em teoria, nem deveria ter relação com a que você alterou. Ao longo desta série, cada uma das outras quatro letras vai ganhar seu próprio post — por hora, o foco é só no "S".

## Princípio da Responsabilidade Única (SRP)

A formulação clássica desse princípio diz que **um módulo (uma classe, na prática, na maior parte dos casos) deve ter um, e apenas um, motivo para mudar**. Dito de outro jeito: cada classe deveria ser responsável por uma única parte da funcionalidade do sistema. Uma forma mais direta de lembrar disso é a frase "faça uma coisa, e faça bem feito".

Na prática, isso significa identificar as diferentes responsabilidades que uma classe está carregando e separá-las, de forma que uma mudança em uma delas não arrisque quebrar as outras sem querer.

### Exemplo - antes do SRP

Veja um sistema de cadastro simplificado, que recebe nome e idade, valida esses dados e "cadastra" o usuário (aqui, só simulado com um `print`):

```py
class SistemaCadastro:
    def cadastrar(self, nome, idade):
        if isinstance(nome, str) and isinstance(idade, int):
            print(f"Cadastrando usuário {nome}, idade {idade}.")
        else:
            print("Dados inválidos.")
```

Esse código funciona, mas olhando com atenção ele está fazendo três coisas ao mesmo tempo, todas dentro do mesmo método: validar os dados de entrada, acessar uma fonte de dados pra registrar o usuário, e decidir o que fazer quando a validação falha. Se amanhã a forma de validar mudar (por exemplo, aceitar `idade` como string também), ou se a forma de registrar o usuário mudar (trocar de um `print` por uma chamada de banco de dados de verdade), você vai precisar mexer nesse mesmo método — e corre o risco de, ao editar uma responsabilidade, acabar afetando sem querer outra que estava funcionando bem.

### Exemplo - aplicando o SRP com métodos privados

Uma forma de resolver isso, usando o que você já viu sobre métodos privados, é separar cada responsabilidade em um método próprio, deixando o método público só como um orquestrador dos passos:

```py
class SistemaCadastro:
    def cadastrar(self, nome, idade):
        if self.__validar_dados(nome, idade):
            self.__registrar_usuario(nome, idade)
        else:
            self.__tratar_erro()

    def __validar_dados(self, nome, idade):
        return isinstance(nome, str) and isinstance(idade, int)

    def __registrar_usuario(self, nome, idade):
        print(f"Cadastrando usuário {nome}, idade {idade}.")

    def __tratar_erro(self):
        print("Dados inválidos.")

sistema = SistemaCadastro()
sistema.cadastrar("Ana", 28)
sistema.cadastrar("Ana", "28")
```

A saída é:

```py
Cadastrando usuário Ana, idade 28.
Dados inválidos.
```

Repare que o resultado final é o mesmo de antes, mas agora cada responsabilidade mora no seu próprio método: `__validar_dados` só valida, `__registrar_usuario` só registra, `__tratar_erro` só trata o erro. Se a validação precisar aceitar outro formato de idade, você mexe só em `__validar_dados`, sem tocar no jeito como o usuário é registrado. Se o cadastro passar a usar um banco de dados real em vez de um `print`, a mudança fica isolada dentro de `__registrar_usuario`. Cada método virou, na prática, o "módulo com um único motivo pra mudar" que o princípio pede.

Esse tipo de separação também ajuda bastante na hora de testar o código. Testar `__validar_dados` isoladamente é simples: basta chamar o método com combinações diferentes de nome e idade e conferir o retorno. Quando tudo estava misturado no método `cadastrar` original, não dava pra testar só a validação sem também disparar (ou simular) o registro do usuário — os dois vinham sempre juntos, mesmo quando o teste só queria checar um deles.

> **Nota:** separar responsabilidades usando métodos privados dentro da mesma classe é só uma das formas de aplicar SRP — funciona bem quando as responsabilidades ainda são pequenas e intimamente ligadas. Nada impede (e às vezes faz mais sentido) mover cada responsabilidade pra uma classe própria — uma classe só pra validação, outra só pra persistência — e deixar a classe original apenas orquestrando o uso delas. A escolha entre "métodos privados na mesma classe" ou "classes separadas" depende do tamanho do sistema e da arquitetura que você está seguindo.

Com o Princípio da Responsabilidade Única, você já entende por que vale a pena resistir à tentação de colocar tudo dentro de um único método gigante. No próximo post, a série muda de assunto por um momento pra explorar uma outra distinção importante dentro de uma classe: atributos e métodos de instância versus atributos e métodos de classe, compartilhados entre todos os objetos criados a partir dela.

**Fonte adaptada:** [Orientação a Objetos em Python (Remake) Aula 6 - SOLID (S) - Responsabilidade Única](https://www.youtube.com/watch?v=MdTs8Kpy0ps) — o livro *Clean Architecture*, de Robert C. Martin, também é citado na aula como uma das origens do princípio.
