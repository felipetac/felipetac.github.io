---
layout: post
title: "#12 - Métodos Mágicos (Dunder Methods)"
date: 2026-08-11 11:40:00
image: '/assets/img/posts/tutorial-python-metodos-magicos.webp'
description: Como personalizar o comportamento de print(), comparações, operadores, len() e chamadas de objetos em Python usando métodos mágicos como __str__, __repr__, __eq__, __add__, __len__, __lt__, __contains__ e __call__.
category: 'dev'
tags:
- Python
- Programação
- Métodos Mágicos
twitter_text: Métodos Mágicos (Dunder Methods) em Python
introduction: "Nesta parte do tutorial, você vai conhecer os métodos mágicos (dunder methods) do Python — funções especiais que o interpretador chama automaticamente por trás dos panos, como __str__, __eq__ e __call__."
---

No post anterior, você criou sua primeira classe e já deu uma espiada rápida no `__str__`, aquele método que troca `<__main__.Pessoa object at 0x...>` por um texto legível quando você dá `print()` num objeto. Só que `__str__` é só a ponta do iceberg: Python tem uma família inteira de métodos especiais — os **métodos mágicos**, ou _dunder methods_ (de "double underscore") — que o interpretador chama sozinho em situações específicas, sem você precisar pedir.

Neste post você vai aprofundar `__str__` e conhecer seu parceiro `__repr__`, além de ver como fazer `==`, `+`, `len()`, `<`, `in` e até a chamada `objeto()` funcionarem em cima das suas próprias classes.

## O que são métodos mágicos

Métodos mágicos são métodos com nomes que começam e terminam com dois underscores, como `__init__()` ou `__str__()` — daí o apelido _dunder_. Você não chama esses métodos diretamente; o Python chama por conta própria, em resposta a alguma ação: criar um objeto, imprimir, comparar dois objetos, somar, medir o tamanho...

Você já usou um deles sem perceber: `__init__()`, visto no post anterior, roda automaticamente toda vez que você cria um objeto. Os métodos deste post seguem a mesma lógica, só que cada um reage a uma situação diferente:

| Método | É chamado quando... |
|---|---|
| `__str__` | `print(obj)`, `str(obj)` |
| `__repr__` | `repr(obj)`, ou ao imprimir sem `__str__` definido |
| `__eq__` | `obj1 == obj2` |
| `__add__` | `obj1 + obj2` |
| `__len__` | `len(obj)` |
| `__lt__` | `obj1 < obj2`, `sorted(lista)` |
| `__contains__` | `valor in obj` |
| `__call__` | `obj()` |

## __str__ e __repr__: a versão legível e a versão técnica

Sem nenhum dos dois definidos, imprimir um objeto mostra o endereço dele na memória:

```py
class Pessoa:
    def __init__(self, nome, idade):
        self.nome = nome
        self.idade = idade

p1 = Pessoa("Ana", 28)
print(p1)
```

A saída é algo como:

```py
<__main__.Pessoa object at 0x7f2e3c1a4d90>
```

O `__repr__` já resolve isso, retornando uma representação pensada pra quem programa — geralmente parecida com o código necessário pra recriar o objeto:

```py
class Pessoa:
    def __init__(self, nome, idade):
        self.nome = nome
        self.idade = idade

    def __repr__(self):
        return f"Pessoa(nome='{self.nome}', idade={self.idade})"

p1 = Pessoa("Ana", 28)
print(p1)
```

A saída é:

```py
Pessoa(nome='Ana', idade=28)
```

Repare que `print()` usou o `__repr__` mesmo sem você pedir — é o comportamento padrão quando não existe `__str__`. Se os dois estiverem definidos, cada um assume seu papel: `__str__` é a versão legível pro usuário final, `__repr__` é a versão técnica pro desenvolvedor (usada por `repr()`, e também no console interativo).

```py
class Pessoa:
    def __init__(self, nome, idade):
        self.nome = nome
        self.idade = idade

    def __str__(self):
        return f"{self.nome} ({self.idade} anos)"

    def __repr__(self):
        return f"Pessoa(nome='{self.nome}', idade={self.idade})"

p1 = Pessoa("Ana", 28)
print(p1)
print(repr(p1))
```

A saída é:

```py
Ana (28 anos)
Pessoa(nome='Ana', idade=28)
```

> **Nota:** `__str__()` precisa retornar uma string — se você retornar outra coisa (um número, por exemplo), o Python levanta um `TypeError`.

## __eq__: comparando objetos pelo conteúdo

Ao contrário de strings, números e listas, dois objetos de uma classe sua não são considerados iguais só por terem os mesmos dados — por padrão, `==` compara a identidade (se é o mesmo objeto na memória), não o conteúdo:

```py
class Pessoa:
    def __init__(self, nome, idade):
        self.nome = nome
        self.idade = idade

p1 = Pessoa("Ana", 28)
p2 = Pessoa("Ana", 28)

print(p1 == p2)
```

A saída é:

```py
False
```

Definindo `__eq__`, você decide o que conta como "igual" pra sua classe. O parâmetro `other` representa o objeto do lado direito da comparação:

```py
class Pessoa:
    def __init__(self, nome, idade):
        self.nome = nome
        self.idade = idade

    def __eq__(self, other):
        return self.nome == other.nome and self.idade == other.idade

p1 = Pessoa("Ana", 28)
p2 = Pessoa("Ana", 28)

print(p1 == p2)
```

A saída é:

```py
True
```

## __add__: sobrecarga do operador +

Sem `__add__`, somar dois objetos da sua classe com `+` gera um `TypeError` — o Python não tem como adivinhar o que "somar duas pessoas" deveria significar. Definindo `__add__`, você decide: essa técnica se chama _sobrecarga de operadores_ (operator overloading), e o mesmo padrão vale pra outros operadores (`__sub__` pra `-`, `__mul__` pra `*`, e assim por diante).

```py
class Pessoa:
    def __init__(self, nome, idade):
        self.nome = nome
        self.idade = idade

    def __add__(self, other):
        return self.idade + other.idade

p1 = Pessoa("Ana", 28)
p2 = Pessoa("Bruno", 34)

print(p1 + p2)
```

A saída é:

```py
62
```

## __len__: personalizando o retorno de len()

```py
class Empresa:
    def __init__(self, nome, funcionarios):
        self.nome = nome
        self.funcionarios = funcionarios

    def __len__(self):
        return len(self.funcionarios)

empresa1 = Empresa("Acme", ["Ana", "Bruno", "Carla"])
print(len(empresa1))
```

A saída é:

```py
3
```

Sem `__len__`, chamar `len()` num objeto `Empresa` levantaria `TypeError` — a função embutida `len()` não sabe, por conta própria, o que deveria contar num objeto seu.

## __lt__: comparando com < e ordenando com sorted()

```py
class Pessoa:
    def __init__(self, nome, idade):
        self.nome = nome
        self.idade = idade

    def __lt__(self, other):
        return self.idade < other.idade

p1 = Pessoa("Ana", 28)
p2 = Pessoa("Bruno", 34)

print(p1 < p2)
```

A saída é:

```py
True
```

A vantagem de definir `__lt__` vai além do `<` isolado: é ele que `sorted()` usa por baixo dos panos pra decidir a ordem de uma lista de objetos.

```py
pessoas = [Pessoa("Carla", 41), Pessoa("Ana", 28), Pessoa("Bruno", 34)]
pessoas_ordenadas = sorted(pessoas)

for pessoa in pessoas_ordenadas:
    print(pessoa.nome, pessoa.idade)
```

A saída é:

```py
Ana 28
Bruno 34
Carla 41
```

Sem `__lt__`, chamar `sorted()` numa lista de objetos `Pessoa` também levantaria `TypeError` — `sorted()` precisa de algum jeito de comparar dois itens entre si.

## __contains__: personalizando o operador in

```py
class Empresa:
    def __init__(self, nome, funcionarios):
        self.nome = nome
        self.funcionarios = funcionarios

    def __contains__(self, nome_funcionario):
        return nome_funcionario in self.funcionarios

empresa1 = Empresa("Acme", ["Ana", "Bruno", "Carla"])
print("Ana" in empresa1)
print("Daniel" in empresa1)
```

A saída é:

```py
True
False
```

## __call__: tornando um objeto chamável como função

Por fim, `__call__` permite que um objeto seja "chamado" com parênteses, `objeto()`, igual você faria com uma função:

```py
class ContadorDeCliques:
    def __init__(self):
        self.cliques = 0

    def __call__(self):
        self.cliques += 1
        return self.cliques

contador = ContadorDeCliques()
print(contador())
print(contador())
print(contador())
```

A saída é:

```py
1
2
3
```

`contador()` parece uma chamada de função comum, mas é o `__call__` do objeto rodando por trás. A diferença pra uma função de verdade é que o objeto guarda seu próprio estado entre uma chamada e outra — aqui, o valor de `self.cliques` — algo que uma função sozinha não tem como fazer.

> **Nota:** você não precisa implementar todos esses métodos em toda classe que criar. Use-os quando fizerem sentido pro comportamento do objeto: um `Ponto(x, y)` se beneficia bastante de `__eq__` e `__repr__`, por exemplo, mas `__call__` só costuma fazer sentido pra objetos que representam "algo que pode ser executado", como o contador acima.

Com `__str__`, `__repr__`, `__eq__`, `__add__`, `__len__`, `__lt__`, `__contains__` e `__call__`, suas classes passam a se comportar como qualquer tipo nativo do Python — imprimem de forma legível, comparam, somam, têm tamanho e participam de `sorted()`, `in` e chamadas, exatamente como `str`, `list` e `dict` já fazem por baixo dos panos. No próximo post, você volta pro terreno mais prático: tratar erros com `try`/`except`, capturar entrada do usuário e manipular arquivos.

**Fonte adaptada:** [Python Magic Methods](https://www.w3schools.com/python/python_magic_methods.asp), [Python __str__()](https://www.w3schools.com/python/python_magic_str.asp), [Python __repr__()](https://www.w3schools.com/python/python_magic_repr.asp), [Python __eq__()](https://www.w3schools.com/python/python_magic_eq.asp), [Python __add__()](https://www.w3schools.com/python/python_magic_add.asp), [Python __len__()](https://www.w3schools.com/python/python_magic_len.asp), [Python __lt__()](https://www.w3schools.com/python/python_magic_lt.asp), [Python __contains__()](https://www.w3schools.com/python/python_magic_contains.asp), [Python __call__()](https://www.w3schools.com/python/python_magic_call.asp)
