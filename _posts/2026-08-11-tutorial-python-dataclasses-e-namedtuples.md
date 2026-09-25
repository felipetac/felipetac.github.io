---
layout: post
title: "Python #17 - Dataclasses e Namedtuples: Alternativas para Guardar Dados"
date: 2026-08-11 13:20:00
image: '/assets/img/posts/tutorial-python-dataclasses-e-namedtuples.webp'
description: Como usar o decorator @dataclass para criar classes que guardam dados com menos código repetitivo, e como namedtuple oferece uma alternativa ainda mais leve baseada em tuplas.
category: 'dev'
tags:
- Python
- Programação
- Orientação a Objetos
twitter_text: "Python #17 - Dataclasses e Namedtuples: Alternativas para Guardar Dados"
introduction: "Nesta parte do tutorial, você vai aprender a usar @dataclass e namedtuple para criar classes que guardam dados com bem menos código repetitivo."
---

No post sobre métodos mágicos, você escreveu `__init__`, `__repr__` e `__eq__` à mão pra fazer uma classe simples se comportar direito: receber valores no construtor, imprimir de um jeito legível e comparar por conteúdo. Pra uma classe que existe basicamente pra **guardar dados** — sem muita lógica de comportamento além disso — escrever esses três métodos toda vez é repetitivo. Este post mostra dois jeitos de evitar essa repetição: `@dataclass` e `namedtuple`.

## O problema: uma classe "manual" pra guardar dados

Relembrando o que já vimos: sem métodos mágicos, uma classe simples se comporta mal em quase tudo.

```py
class Produto:
    def __init__(self, nome, preco):
        self.nome = nome
        self.preco = preco

p1 = Produto("Teclado", 250.0)
p2 = Produto("Teclado", 250.0)

print(p1)
print(p1 == p2)
```

A saída é:

```py
<__main__.Produto object at 0x7f2e3c1a4d90>
p1 == p2 dá False, mesmo com os mesmos dados
```

Pra corrigir isso, você precisaria escrever `__repr__` e `__eq__` na mão, como fez no post de métodos mágicos. `@dataclass` faz exatamente isso pra você.

## @dataclass

O decorator `@dataclass`, do módulo `dataclasses` da biblioteca padrão, gera automaticamente `__init__`, `__repr__` e `__eq__` a partir dos atributos que você declara com type hints no corpo da classe.

```py
from dataclasses import dataclass

@dataclass
class Produto:
    nome: str
    preco: float

p1 = Produto("Teclado", 250.0)
p2 = Produto("Teclado", 250.0)

print(p1)
print(p1 == p2)
```

A saída é:

```py
Produto(nome='Teclado', preco=250.0)
True
```

Sem escrever um único `__init__`, `__repr__` ou `__eq__`, `Produto` já imprime de forma legível e compara por conteúdo — exatamente o comportamento que você teve que montar peça por peça no post anterior.

### Valores padrão

Uma dataclass aceita valores padrão do mesmo jeito que uma função comum.

```py
from dataclasses import dataclass

@dataclass
class Produto:
    nome: str
    preco: float
    em_estoque: bool = True

p1 = Produto("Mouse", 80.0)
print(p1)
```

A saída é:

```py
Produto(nome='Mouse', preco=80.0, em_estoque=True)
```

### Comparando e ordenando com order=True

Por padrão, `@dataclass` só gera `__eq__` — comparar com `<` ou usar `sorted()` numa lista de dataclasses dá erro, do mesmo jeito que aconteceria com uma classe comum sem `__lt__` (como você viu no post de métodos mágicos). Passando `order=True` pro decorator, o Python gera também `__lt__`, `__le__`, `__gt__` e `__ge__`, comparando os objetos campo a campo, na ordem em que foram declarados.

```py
from dataclasses import dataclass

@dataclass(order=True)
class Produto:
    preco: float
    nome: str

produtos = [Produto(80.0, "Mouse"), Produto(250.0, "Teclado"), Produto(15.0, "Cabo")]

for produto in sorted(produtos):
    print(produto)
```

A saída é:

```py
Produto(preco=15.0, nome='Cabo')
Produto(preco=80.0, nome='Mouse')
Produto(preco=250.0, nome='Teclado')
```

Repare que a ordenação usou `preco`, o primeiro campo declarado — se dois produtos tivessem o mesmo preço, o desempate seguiria pro próximo campo (`nome`), exatamente como comparar duas tuplas item a item.

### Dataclasses ainda são classes normais

Como `@dataclass` só adiciona métodos a uma classe comum, você continua podendo definir métodos próprios normalmente.

```py
from dataclasses import dataclass

@dataclass
class Produto:
    nome: str
    preco: float
    desconto: float = 0.0

    def preco_final(self):
        return self.preco * (1 - self.desconto)

p1 = Produto("Monitor", 1000.0, desconto=0.1)
print(p1.preco_final())
```

A saída é:

```py
900.0
```

> **Nota:** por padrão, uma dataclass ainda é **mutável** — dá pra fazer `p1.preco = 999` depois de criada. Se você quiser um objeto imutável (que gera erro ao tentar alterar um atributo depois de criado), use `@dataclass(frozen=True)`.

## namedtuple

`namedtuple`, do módulo `collections`, resolve um problema parecido de um jeito diferente: em vez de criar uma classe completa, ele cria uma **tupla** com campos nomeados — você ganha a leveza e a imutabilidade de uma tupla, mas pode acessar os valores pelo nome em vez de só pelo índice.

```py
from collections import namedtuple

Ponto = namedtuple("Ponto", ["x", "y"])

p1 = Ponto(3, 7)
print(p1)
print(p1.x, p1.y)
print(p1[0], p1[1])
```

A saída é:

```py
Ponto(x=3, y=7)
3 7
3 7
```

Repare que `p1` continua sendo, de fato, uma tupla — dá pra acessar por índice (`p1[0]`) ou por nome (`p1.x`), e ele já vem com `__repr__` legível de graça. Por ser uma tupla, um `namedtuple` também é **imutável** por padrão: não existe `p1.x = 5`.

```py
from collections import namedtuple

Ponto = namedtuple("Ponto", ["x", "y"])
p1 = Ponto(3, 7)
p1.x = 5
```

A saída é um erro:

```py
AttributeError: can't set attribute
```

## Convertendo de volta pra dicionário

Tanto `@dataclass` quanto `namedtuple` oferecem um jeito pronto de converter uma instância pra um dicionário comum — útil, por exemplo, na hora de transformar o objeto em JSON pra enviar numa API.

```py
from dataclasses import dataclass, asdict
from collections import namedtuple

@dataclass
class Produto:
    nome: str
    preco: float

Ponto = namedtuple("Ponto", ["x", "y"])

produto = Produto("Teclado", 250.0)
ponto = Ponto(3, 7)

print(asdict(produto))
print(ponto._asdict())
```

A saída é:

```py
{'nome': 'Teclado', 'preco': 250.0}
{'x': 3, 'y': 7}
```

Repare na diferença de convenção: a dataclass usa a função `asdict()` do módulo `dataclasses` (chamada de fora, passando o objeto), enquanto o namedtuple usa um método próprio, `_asdict()` (com um único underscore na frente — não é um método "privado" no sentido do post de encapsulamento, é só a convenção que o `namedtuple` usa pra não colidir com os nomes dos campos que você definiu).

## Dataclass ou namedtuple: quando usar cada um

Os dois resolvem o mesmo problema básico, com trade-offs diferentes:

- Use `namedtuple` quando os dados são realmente só dados — sem métodos próprios além dos que uma tupla já tem —, imutabilidade for desejada por padrão, e leveza importar mais que flexibilidade;
- Use `@dataclass` quando você quer adicionar métodos próprios à classe, precisa de mutabilidade (ou quer poder escolher entre mutável e `frozen=True`), ou quer aproveitar todo o poder de type hints mais elaborados (listas, `Optional`, etc.) nos campos.

Na prática, `@dataclass` tende a ser a escolha mais comum em código novo, justamente por ser mais flexível — mas `namedtuple` continua aparecendo bastante em código mais antigo, e ainda faz sentido pra estruturas de dados bem simples e imutáveis.

Com `@dataclass` e `namedtuple`, você tem duas formas de guardar dados estruturados sem reescrever `__init__`/`__repr__`/`__eq__` toda vez — cada uma com seu lugar. No próximo post, você volta pro terreno mais prático: tratar erros com `try`/`except`, capturar entrada do usuário e manipular arquivos.

**Fonte adaptada:** [Python Data Classes](https://www.tutorialspoint.com/python/python_dataclasses.htm), [Python Namedtuple](https://www.tutorialspoint.com/python/python_namedtuple.htm)
