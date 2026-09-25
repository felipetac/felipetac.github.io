---
layout: post
title: "Orientação a Objetos em Python #12 - Agregação e Composição"
date: 2026-08-11 15:32:00
image: '/assets/img/posts/poo-agregacao-e-composicao.webp'
description: A diferença entre agregação e composição em Python - duas formas de uma classe conter objetos de outra classe - e como elas se comparam com associação de classes num espectro de vínculo mais fraco a mais forte. Post final da série de Orientação a Objetos.
category: 'dev'
tags:
- Python
- Programação
- Composição
twitter_text: "Orientação a Objetos em Python #12 - Agregação e Composição"
introduction: "Nesta última parte da série, você vai entender a diferença entre agregação e composição - duas formas de uma classe conter objetos de outra - e como elas se encaixam ao lado da associação de classes num espectro de vínculo entre objetos."
---

No post anterior, você viu os dois últimos princípios do SOLID e fechou, com eles, os cinco pilares que dão nome ao acrônimo. Pra encerrar esta série, faltam dois conceitos que você já usou sem nome próprio em alguns exemplos anteriores: agregação e composição. Os dois descrevem formas de uma classe conter objetos de outra classe — só que com graus bem diferentes de vínculo entre elas.

## Do vínculo mais fraco ao mais forte

Lá no post #5, você conheceu a associação de classes: uma classe usa um objeto de outra, geralmente recebido como parâmetro de método, sem guardar nenhum vínculo permanente com ele — é o tipo de relação mais solta que existe entre duas classes. Agregação e composição são as próximas paradas nesse mesmo espectro, cada uma com um vínculo um pouco mais forte que o anterior: associação → agregação → composição.

## Agregação: contém, mas não é dono do ciclo de vida

Agregação é quando uma classe guarda objetos de outra classe como atributo — geralmente numa lista —, mas esses objetos são criados de forma independente, fora da classe que os contém, e continuam existindo mesmo que o container seja destruído. Veja um carrinho de compras que agrega produtos:

```py
class Produto:
    def __init__(self, nome, valor):
        self.__nome = nome
        self.__valor = valor

    def informar_dados(self):
        print(f"Produto: {self.__nome} - Valor: {self.__valor}")


class CarrinhoDeCompras:
    def __init__(self):
        self.__produtos = []

    def adicionar_produto(self, produto: Produto):
        self.__produtos.append(produto)

    def finalizar_compra(self):
        print("Compra finalizada. Produtos:")
        for produto in self.__produtos:
            produto.informar_dados()
```

Repare que `CarrinhoDeCompras` nasce vazio — ele não cria nenhum `Produto` sozinho. Os produtos são criados por fora e só depois adicionados:

```py
banana = Produto("Banana", 3)
pera = Produto("Pera", 2)
uva = Produto("Uva", 4)

carrinho = CarrinhoDeCompras()
carrinho.adicionar_produto(banana)
carrinho.adicionar_produto(pera)
carrinho.adicionar_produto(uva)

carrinho.finalizar_compra()
```

A saída é:

```py
Compra finalizada. Produtos:
Produto: Banana - Valor: 3
Produto: Pera - Valor: 2
Produto: Uva - Valor: 4
```

`banana`, `pera` e `uva` existem como objetos `Produto` totalmente independentes, criados antes mesmo do carrinho existir. O carrinho só agrega referências a esses objetos numa lista interna — se o carrinho fosse descartado agora, os três produtos continuariam existindo normalmente em qualquer outra variável que ainda apontasse pra eles. Esse é o traço que define agregação: o container guarda os objetos, mas não é dono exclusivo do ciclo de vida deles. Pense numa universidade e seus alunos: a universidade reúne (agrega) os alunos matriculados, mas cada aluno continua existindo como pessoa — e, tecnicamente, poderia se matricular em outra instituição — mesmo que a universidade em questão feche as portas.

## Composição: contém e é dono do ciclo de vida

Composição é um vínculo mais forte: a classe container cria os objetos que ela contém internamente — normalmente dentro do próprio construtor — e esses objetos não têm existência independente. Nascem junto com o container e são destruídos junto com ele. Veja um repositório composto por dois objetos auxiliares, `Select` e `Insert`:

```py
class Select:
    def selecionar_por_id(self, id):
        print("Selecionando um elemento no banco de dados.")


class Insert:
    def inserir_valor(self, valor):
        print("Inserindo um valor no banco de dados.")


class Repositorio:
    def __init__(self):
        self.__select = Select()
        self.__insert = Insert()

    def selecionar_por_id(self, id):
        self.__select.selecionar_por_id(id)
```

```py
repositorio = Repositorio()
repositorio.selecionar_por_id(45)
```

A saída é:

```py
Selecionando um elemento no banco de dados.
```

Diferente do carrinho de compras, aqui não existe nenhum `Select` ou `Insert` criado do lado de fora e passado pro `Repositorio` — ele mesmo instancia os dois, dentro do próprio construtor. Não existe (nem faz sentido existir) um `Select` "solto" pertencente a esse `Repositorio` específico: ele nasce quando o repositório nasce, e desaparece quando o repositório desaparece. Essa é a marca registrada da composição: posse total sobre o ciclo de vida do objeto contido. É a mesma lógica de uma casa e seus cômodos — os cômodos não fazem sentido fora da casa que os contém, e se a casa for demolida, eles vão junto.

> **Nota:** a diferença entre agregação e composição não está numa sintaxe especial do Python — as duas usam atributos e listas comuns, e a linguagem não tem uma palavra-chave que marque isso. A diferença é semântica: onde e quando o objeto contido é criado, e se ele sobrevive independentemente do container. Cabe a quem projeta as classes decidir qual das duas relações reflete melhor o problema modelado.

## Fechando a série

E é assim que chegamos ao fim desta série de Orientação a Objetos em Python. Começamos entendendo os pilares clássicos — encapsulamento, herança e polimorfismo —, passamos pelos cinco princípios do SOLID (responsabilidade única, aberto/fechado, Substituição de Liskov, Segregação de Interfaces e Inversão de Dependência) e fechamos com estas duas últimas formas de relacionar classes entre si, ao lado da associação vista lá no post #5: associação, agregação e composição. Com esse vocabulário todo — e, principalmente, com o raciocínio por trás de cada conceito — você já tem o que precisa pra modelar sistemas orientados a objetos em Python de um jeito organizado, flexível e fácil de manter. Valeu por acompanhar a série até aqui!

**Fonte adaptada:** [Agregação - Programador Lhama](https://www.youtube.com/watch?v=pIlK2QllzQ4), [Composição - Programador Lhama](https://www.youtube.com/watch?v=Iaps6Of-Mlo)
