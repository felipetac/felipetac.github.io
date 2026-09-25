---
layout: post
title: "Orientação a Objetos em Python #7 - Injeção de Dependência"
date: 2026-08-11 15:27:00
image: '/assets/img/posts/poo-injecao-de-dependencia.webp'
description: O que é injeção de dependência em Python, por que ela deixa o código mais flexível e testável, e um exemplo prático simulando uma conexão com banco de dados em camadas.
category: 'dev'
tags:
- Python
- Programação
- Dependência
twitter_text: "Orientação a Objetos em Python #7 - Injeção de Dependência"
introduction: "Nesta parte da série, você vai entender o que é injeção de dependência, como ela se diferencia da associação de classes mais simples, e vai ver um exemplo prático que simula camadas de acesso a um banco de dados."
---

No post anterior você viu o princípio Aberto/Fechado do SOLID sendo resolvido com associação de classes — uma classe delegando comportamento a outra em vez de decidir tudo sozinha. A **injeção de dependência** é, no fundo, a mesma ideia de associação, só que vista por outro ângulo: em vez de receber o objeto associado como parâmetro de um método pontual, a classe passa a exigir esse objeto logo na hora de ser criada, tornando a dependência entre as duas classes permanente.

## Associação opcional x dependência obrigatória

Pra entender a diferença, pense de novo no exemplo de `Pessoa` e `Interruptor` do post #5: ali, era perfeitamente possível criar um objeto `Pessoa` sem nunca usar um `Interruptor` — bastava não chamar `acender_luzes` nem `apagar_luzes`. A classe `Pessoa` existia de forma independente, e só precisava de um `Interruptor` no momento em que algum método específico era chamado.

Injeção de dependência é diferente: a classe só existe se a dependência for fornecida logo na criação do objeto, via construtor. Veja um exemplo com `Pessoa` e `Celular`:

```py
class Celular:
    def __init__(self, modelo):
        self.modelo = modelo

    def enviar_mensagem(self, mensagem):
        print(f"Enviando mensagem: {mensagem}")

    def abrir_emails(self):
        print("Abrindo os e-mails...")

    def abrir_youtube(self):
        print("Abrindo o YouTube...")
```

Essa classe `Celular` pode ser usada sozinha, sem problema nenhum — ela não depende de mais nada. Agora veja `Pessoa`:

```py
class Pessoa:
    def __init__(self, celular: Celular):
        self.celular = celular

    def pedir_pizza(self):
        print("Buscando o celular...")
        print("Definindo o sabor...")
        self.celular.enviar_mensagem("Quero uma de calabresa, aguardando a chegada.")

    def estudar(self):
        print("Sentando no computador...")
        self.celular.abrir_youtube()
        print("Anotando o conteúdo...")
```

Repare que o construtor de `Pessoa` exige um `Celular` como argumento obrigatório, e guarda esse objeto no atributo `self.celular`. A partir daí, os métodos `pedir_pizza` e `estudar` usam esse atributo internamente, sem precisar recebê-lo de novo a cada chamada.

```py
android = Celular("Samsung")
iphone = Celular("iPhone")

reginaldo = Pessoa(android)
marlene = Pessoa(iphone)

reginaldo.pedir_pizza()
marlene.estudar()
```

A saída é:

```py
Buscando o celular...
Definindo o sabor...
Enviando mensagem: Quero uma de calabresa, aguardando a chegada.
Sentando no computador...
Abrindo o YouTube...
Anotando o conteúdo...
```

Se você tentar criar um `Pessoa()` sem passar um `Celular`, o Python simplesmente recusa com um erro de argumento faltando — porque agora a dependência é obrigatória, não opcional. É essa obrigatoriedade, definida no construtor, que caracteriza a injeção de dependência.

> **Nota:** é comum, em livros e materiais mais formais sobre o assunto (o Clean Code é uma referência clássica aqui), recomendar que dependências injetadas fiquem como atributos privados (`self.__celular`, com dois underlines) em vez de públicos — reforçando que quem usa a classe `Pessoa` de fora não deveria mexer diretamente no celular guardado ali dentro, só através dos métodos da própria classe.

## Um exemplo mais realista: camadas de acesso a um banco de dados

Injeção de dependência aparece muito em cenários de conexão com banco de dados, exatamente porque ali faz sentido separar responsabilidades em camadas, cada uma dependendo da anterior. Veja uma versão simplificada disso:

```py
class ConectorBancoDeDados:
    def __init__(self):
        self.connection = False

    def conectar_ao_banco(self):
        self.connection = True


class RepositorioBanco:
    def __init__(self, conexao: ConectorBancoDeDados):
        self.conexao = conexao

    def buscar_dados(self):
        if self.conexao.connection:
            return [1, 2, 3, 4, 5]
        return None


class RegraDeNegocio:
    def __init__(self, repo: RepositorioBanco):
        self.repo = repo

    def calcular_resultados(self):
        dados = self.repo.buscar_dados()
        if not dados:
            print("Dados não encontrados, verifique sua conexão com o banco.")
        else:
            resposta = 0
            for dado in dados:
                resposta += dado
            print(f"O resultado é: {resposta}")
```

Cada classe aqui depende da anterior: `RegraDeNegocio` precisa de um `RepositorioBanco`, que por sua vez precisa de um `ConectorBancoDeDados`. Montando a cadeia toda:

```py
conector = ConectorBancoDeDados()
conector.conectar_ao_banco()

repositorio = RepositorioBanco(conector)
regra = RegraDeNegocio(repositorio)

regra.calcular_resultados()
```

A saída é:

```py
O resultado é: 15
```

Se você comentar a linha `conector.conectar_ao_banco()`, o resto do código continua rodando sem quebrar — só que `buscar_dados` retorna `None`, porque `connection` nunca virou `True`, e o resultado passa a ser a mensagem de aviso em vez do cálculo. Isso mostra bem a vantagem prática da injeção de dependência: cada camada só sabe da camada imediatamente anterior, e você consegue trocar, por exemplo, o `ConectorBancoDeDados` por uma versão de teste (que simula uma conexão sem precisar de um banco de verdade) sem tocar em `RepositorioBanco` nem em `RegraDeNegocio`. É isso que torna esse tipo de código mais fácil de testar e de manter.

O próximo post da série muda de assunto dentro da orientação a objetos: você vai ver herança de verdade — como uma classe reaproveita atributos e métodos de outra — e uma terceira forma de encapsulamento, o encapsulamento protegido.

**Fonte adaptada:** [Injeção de Dependência - Programador Lhama](https://www.youtube.com/watch?v=D6tI7CYWtj8), [Exercício Injeção de Dependência - Programador Lhama](https://www.youtube.com/watch?v=R4IEB-ylzx0)
