---
layout: post
title: "Orientação a Objetos em Python #4 - Atributos e Métodos de Classe"
date: 2026-08-11 15:24:00
image: '/assets/img/posts/poo-atributos-e-metodos-de-classe.webp'
description: A diferença entre atributos de instância e atributos de classe em Python, o decorador @classmethod e o parâmetro cls, com exemplos práticos de contador de instâncias e alteração de estado compartilhado.
category: 'dev'
tags:
- Python
- Programação
- Classes
twitter_text: "Orientação a Objetos em Python #4 - Atributos e Métodos de Classe"
introduction: "Nesta parte da série, você vai aprender a diferença entre atributos de instância e atributos de classe, o decorador @classmethod e o parâmetro cls, e vai aplicar tudo isso em um exemplo prático."
---

No post anterior, você separou responsabilidades dentro de uma classe usando métodos privados, seguindo o Princípio da Responsabilidade Única. Todos os atributos e métodos que você usou até agora na série, porém, tinham uma coisa em comum: pertenciam a um objeto específico — cada `Pessoa` tinha seu próprio `nome`, cada `ContaBancaria` seu próprio `saldo`. Mas existe também outro tipo de atributo, que não pertence a nenhum objeto em particular, e sim à classe como um todo, compartilhado por todas as instâncias dela.

Nesta parte da série, você vai entender a diferença entre atributos de instância e atributos de classe, o decorador `@classmethod`, e vai aplicar tudo isso em um exemplo prático.

## Atributos de instância vs. atributos de classe

Um **atributo de instância** é definido dentro do `__init__`, usando `self.`, e cada objeto criado a partir da classe recebe sua própria cópia independente — foi o que você viu em toda a série até aqui. Um **atributo de classe**, por outro lado, é definido diretamente no corpo da classe, fora de qualquer método, e é compartilhado por todos os objetos daquela classe — como se fosse um valor único, acessível tanto pela classe quanto por qualquer instância dela.

```py
class Produto:
    imposto = 1.15  # atributo de classe

    def __init__(self, valor_bruto):
        self.valor_bruto = valor_bruto  # atributo de instância

    def consultar_valor(self):
        valor = self.valor_bruto * self.imposto
        print(f"Valor final: R$ {valor:.2f}")

produto_a = Produto(30)
produto_b = Produto(10)

produto_a.consultar_valor()
produto_b.consultar_valor()
```

A saída é:

```py
Valor final: R$ 34.50
Valor final: R$ 11.50
```

Repare que `valor_bruto` é diferente em cada objeto (30 e 10), enquanto `imposto` é o mesmo valor `1.15` usado pelos dois — nenhum dos dois objetos declarou seu próprio `imposto`, ambos estão lendo o mesmo valor guardado na classe `Produto`.

### O efeito de alterar um atributo de classe

A parte interessante — e um pouco traiçoeira — acontece quando você altera um atributo de classe depois que já existem objetos criados:

```py
Produto.imposto = 1.20

produto_a.consultar_valor()
produto_b.consultar_valor()
```

A saída é:

```py
Valor final: R$ 36.00
Valor final: R$ 12.00
```

Mesmo `produto_a` e `produto_b` já existindo antes da mudança, os dois passaram a usar o novo valor de `imposto` automaticamente. Isso acontece porque nenhum dos dois tem sua própria cópia de `imposto` — os dois continuam consultando o valor guardado na classe.

> **Nota:** se em vez de alterar via `Produto.imposto` você fizer `produto_a.imposto = 1.30` (atribuindo direto numa instância específica), o Python cria uma cópia própria desse atributo só pra `produto_a`, sem afetar `produto_b` nem a classe — é como se aquele objeto "se desligasse" das próximas mudanças no valor compartilhado. As outras instâncias continuam seguindo o valor da classe normalmente. Por isso, quando a intenção é mudar o valor pra todo mundo, o caminho mais confiável é sempre alterar pela classe, não por uma instância específica.

## Métodos de classe: @classmethod e cls

Alterar um atributo de classe direto de fora (`Produto.imposto = 1.20`) funciona, mas expõe demais o funcionamento interno da classe. Uma forma mais controlada é criar um método específico pra isso, usando o decorador `@classmethod`. A diferença em relação a um método comum é o primeiro parâmetro: em vez de `self` (que representa uma instância específica), um `classmethod` recebe `cls`, que representa a classe como um todo:

```py
class Produto:
    imposto = 1.15

    def __init__(self, valor_bruto):
        self.valor_bruto = valor_bruto

    def consultar_valor(self):
        valor = self.valor_bruto * self.imposto
        print(f"Valor final: R$ {valor:.2f}")

    @classmethod
    def alterar_imposto(cls, novo_valor):
        cls.imposto = novo_valor

produto_a = Produto(30)
produto_b = Produto(10)

Produto.alterar_imposto(1.20)

produto_a.consultar_valor()
produto_b.consultar_valor()
```

A saída é:

```py
Valor final: R$ 36.00
Valor final: R$ 12.00
```

`cls.imposto = novo_valor` tem o mesmo efeito de escrever `Produto.imposto = novo_valor`, só que de forma encapsulada dentro de um método — quem usa a classe não precisa saber que existe um atributo chamado `imposto` por trás, só precisa chamar `alterar_imposto`. E como `cls` sempre aponta pra classe (nunca pra uma instância isolada), esse método sempre altera o valor compartilhado de verdade, sem risco de cair naquele efeito de "cópia isolada" que aconteceria se você tentasse fazer `self.imposto = novo_valor` dentro de um método comum.

## Um caso de uso prático: contando instâncias

Atributos e métodos de classe são úteis sempre que você precisa de um estado compartilhado entre todos os objetos de uma classe — um exemplo clássico é contar quantas instâncias já foram criadas:

```py
class Produto:
    total_criados = 0

    def __init__(self, valor_bruto):
        self.valor_bruto = valor_bruto
        Produto.total_criados += 1

    @classmethod
    def quantidade_criada(cls):
        return cls.total_criados

Produto(30)
Produto(10)
Produto(20)

print(Produto.quantidade_criada())
```

A saída é:

```py
3
```

Cada vez que o `__init__` roda, ele incrementa `Produto.total_criados` — um atributo de classe, então o incremento é visto por todos. O `classmethod` `quantidade_criada` só devolve esse total, sem precisar de nenhum objeto específico pra ser chamado.

## Exercício prático: aplicando tudo numa rede de lojas

Pra fechar, veja um cenário que junta os dois conceitos: imagine uma rede de lojas onde cada loja vende o mesmo tipo de produto, com seu próprio valor bruto, mas todas compartilham a mesma taxa de imposto — e essa taxa pode ser reajustada pra rede inteira de uma vez:

```py
class Loja:
    taxa = 1.15  # compartilhada por toda a rede

    def __init__(self, valor_produto_bruto):
        self.valor_produto_bruto = valor_produto_bruto

    def consultar_valor_produto(self):
        valor = self.valor_produto_bruto * self.taxa
        print(f"Valor do produto: R$ {valor:.2f}")

    @classmethod
    def editar_taxa(cls, novo_valor):
        cls.taxa = novo_valor

loja_praia = Loja(30.50)
loja_shopping = Loja(10.39)
loja_rua = Loja(20.33)

loja_praia.consultar_valor_produto()
loja_shopping.consultar_valor_produto()
loja_rua.consultar_valor_produto()

Loja.editar_taxa(1.35)

loja_praia.consultar_valor_produto()
loja_shopping.consultar_valor_produto()
loja_rua.consultar_valor_produto()
```

A saída é:

```py
Valor do produto: R$ 35.07
Valor do produto: R$ 11.95
Valor do produto: R$ 23.38
Valor do produto: R$ 41.18
Valor do produto: R$ 14.03
Valor do produto: R$ 27.45
```

As três lojas foram criadas com seu próprio `valor_produto_bruto`, mas nenhuma delas tem sua própria cópia de `taxa` — todas consultam o valor guardado na classe `Loja`. Quando `Loja.editar_taxa(1.35)` é chamado, a rede inteira sente o efeito da mudança de uma vez, sem precisar atualizar loja por loja. É esse tipo de situação — um valor que deveria ser sempre o mesmo pra todos os objetos de uma classe, e alterado de forma centralizada — que atributos e métodos de classe resolvem bem.

Até aqui você viu como organizar dados e comportamento dentro de uma única classe, de várias formas diferentes. No próximo post da série, o assunto passa a ser como fazer classes diferentes se relacionarem entre si: Associação de Classes.

**Fonte adaptada:** [Orientação a Objetos em Python (Remake) Aula 7 - Variáveis de Classe](https://www.youtube.com/watch?v=sKpvoIsLUeY), [Aula 8 - Métodos de Classe](https://www.youtube.com/watch?v=aFrx1TQ8DNk), [Aula 9 - Exercício Método de Classe](https://www.youtube.com/watch?v=r1Hus6487bk)
