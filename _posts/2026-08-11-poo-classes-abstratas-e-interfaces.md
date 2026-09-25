---
layout: post
title: "Orientação a Objetos em Python #10 - Classes Abstratas e Interfaces"
date: 2026-08-11 15:30:00
image: '/assets/img/posts/poo-classes-abstratas-e-interfaces.webp'
description: O que são classes abstratas em Python (módulo abc, ABC e @abstractmethod) e como usá-las, já que a linguagem não tem uma palavra-chave interface própria, pra simular contratos que toda subclasse é obrigada a cumprir.
category: 'dev'
tags:
- Python
- Programação
- Interfaces
twitter_text: "Orientação a Objetos em Python #10 - Classes Abstratas e Interfaces"
introduction: "Nesta parte da série, você vai aprender o que são classes abstratas em Python, como usar o módulo abc pra criar métodos que toda subclasse é obrigada a implementar, e como esse recurso dá origem ao conceito de interface."
---

No post anterior, você viu que o princípio da Substituição de Liskov exige que toda subclasse cumpra o comportamento prometido pela classe pai — e viu o que acontece quando isso não é respeitado. Só que, até agora, esse "contrato" entre pai e filho era mais uma boa intenção do que uma regra imposta pelo Python: nada impedia uma subclasse de simplesmente esquecer de implementar um método esperado. As classes abstratas resolvem esse problema tornando o contrato obrigatório — e, usadas de um jeito específico, dão origem ao conceito de interface.

## Classes abstratas: um contrato que a subclasse é obrigada a seguir

Uma classe abstrata é uma classe que não pode ser instanciada sozinha — ela existe unicamente pra ser herdada. Em Python, isso é feito com o módulo `abc` (de *Abstract Base Classes*): a classe herda de `ABC`, e qualquer método marcado com o decorador `@abstractmethod` vira obrigatório pra toda subclasse.

```py
from abc import ABC, abstractmethod


class Pessoa(ABC):
    def correr(self):
        print("A pessoa está correndo.")

    @abstractmethod
    def trabalhar(self):
        pass
```

`correr()` é um método normal, com implementação completa. Já `trabalhar()` é abstrato: tem só um `pass` no corpo, porque a implementação de verdade fica por conta de quem herdar de `Pessoa`. Se você tentar criar um objeto `Pessoa` diretamente:

```py
p = Pessoa()
```

A saída é:

```py
TypeError: Can't instantiate abstract class Pessoa with abstract method trabalhar
```

O Python se recusa a instanciar a classe abstrata porque ela tem pelo menos um método abstrato sem implementação — e essa é exatamente a ideia: uma classe abstrata não representa nenhum objeto concreto por si só, ela só faz sentido como base de uma herança. Agora veja uma subclasse que implementa o método pendente:

```py
class Professor(Pessoa):
    def trabalhar(self):
        print("O professor está dando aula.")


professor = Professor()
professor.correr()
professor.trabalhar()
```

A saída é:

```py
A pessoa está correndo.
O professor está dando aula.
```

`correr()` veio de graça, por herança normal — `Professor` nem precisou tocar nele. Já `trabalhar()` teve que ser reescrito obrigatoriamente: se você esquecer de implementá-lo em `Professor`, o Python recusa a instanciação assim que você tentar criar o objeto, igual aconteceu com `Pessoa` sozinha — em vez de deixar o erro passar batido e só estourar lá na frente, quando alguém finalmente tentar chamar `trabalhar()`.

> **Nota:** é isso que diferencia uma classe abstrata de uma simples convenção de código. Você poderia, em teoria, só documentar "toda subclasse de Pessoa deve implementar trabalhar()" num comentário — mas nada garantiria que alguém realmente cumprisse isso. Com `@abstractmethod`, quem esquece descobre na hora, não meses depois em produção.

## Interfaces: um caso particular de classe abstrata

Python não tem uma palavra-chave `interface`, como Java ou C# têm. O que a comunidade Python faz, por convenção, é usar uma classe abstrata composta *só* por métodos abstratos, sem nenhuma implementação concreta — nesse caso especial, a classe abstrata passa a ser tratada como uma interface: uma lista de métodos que qualquer classe pode se comprometer a implementar.

```py
from abc import ABC, abstractmethod


class Trabalhador(ABC):
    @abstractmethod
    def trabalhar(self):
        pass

    @abstractmethod
    def ir_para_casa(self):
        pass

    @abstractmethod
    def horario_almoco(self):
        pass
```

`Trabalhador` não implementa nada sozinha — ela só declara três comportamentos que toda classe que "for um trabalhador" precisa ter. Agora duas classes bem diferentes podem implementar essa mesma interface, cada uma com seu próprio conteúdo:

```py
class Professor(Trabalhador):
    def trabalhar(self):
        print("O professor está trabalhando.")

    def ir_para_casa(self):
        print("O professor está indo para casa.")

    def horario_almoco(self):
        print("O professor está almoçando.")


class Engenheiro(Trabalhador):
    def trabalhar(self):
        print("O engenheiro está trabalhando.")

    def ir_para_casa(self):
        print("O engenheiro está indo para casa.")

    def horario_almoco(self):
        print("O engenheiro está almoçando.")
```

O ganho de ter essa interface fica claro numa função que recebe qualquer `Trabalhador`:

```py
def comunicar_trabalhador(trabalhador: Trabalhador):
    trabalhador.trabalhar()
    trabalhador.ir_para_casa()


p1 = Professor()
p2 = Engenheiro()

comunicar_trabalhador(p1)
comunicar_trabalhador(p2)
```

A saída é:

```py
O professor está trabalhando.
O professor está indo para casa.
O engenheiro está trabalhando.
O engenheiro está indo para casa.
```

`comunicar_trabalhador()` não sabe, nem precisa saber, se está lidando com um `Professor` ou um `Engenheiro` — ela só exige "qualquer coisa que implemente `Trabalhador`", e por isso os dois objetos passam sem problema. Essa é a ideia de interface: um contrato de métodos que garante que diferentes classes possam ser usadas de forma intercambiável em qualquer lugar do código que dependa só desse contrato — o mesmo polimorfismo do post anterior, agora com a garantia extra de que toda implementação segue exatamente a mesma assinatura de métodos. A anotação `trabalhador: Trabalhador` no parâmetro, aliás, ajuda seu editor a saber exatamente quais métodos sugerir no autocomplete, do mesmo jeito que você já viu no post sobre associação de classes.

Só que ter uma interface enxuta o bastante pra que toda classe que a implementa realmente use todos os métodos que ela exige — isso nem sempre acontece na prática. No próximo post da série você vai ver os dois últimos princípios do SOLID: a Segregação de Interfaces, que ataca exatamente esse problema, e a Inversão de Dependência.

**Fonte adaptada:** [Classes Abstratas - Programador Lhama](https://www.youtube.com/watch?v=wIiamrggWO8), [Interfaces - Programador Lhama](https://www.youtube.com/watch?v=kDbpC9vwYws)
