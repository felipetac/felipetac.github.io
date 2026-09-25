---
layout: post
title: "Python | #22 - Argumentos de Linha de Comando e Serialização com Pickle"
date: 2026-08-11 15:00:00
image: '/assets/img/posts/tutorial-python-argumentos-de-linha-de-comando-e-pickle.webp'
description: Como ler argumentos passados na linha de comando com sys.argv e argparse, e como salvar e carregar objetos Python inteiros em disco usando o módulo pickle.
category: 'dev'
tags:
- Python
- Programação
- Scripts
twitter_text: Argumentos de Linha de Comando e Pickle
introduction: "Nesta parte do tutorial, você vai aprender a receber argumentos na linha de comando e a salvar objetos Python em disco com o módulo pickle."
---

Depois de organizar código em módulos e instalar pacotes com PIP no post anterior, chegou a hora de deixar seus scripts mais parecidos com ferramentas de linha de comando de verdade: capazes de receber parâmetros na hora de rodar, em vez de valores fixos no código. Você também vai ver `pickle`, um jeito de salvar objetos Python inteiros em disco — e como ele se compara com o `json`, que você vai rever com calma no próximo (e último) post desta introdução.

## sys.argv

O jeito mais básico de acessar argumentos de linha de comando é através de `sys.argv`, uma lista onde o primeiro item é sempre o nome do script, e os demais são os argumentos passados depois dele.

```py
# script.py
import sys

print(sys.argv)
```

Rodando `python script.py ana 28` no terminal, a saída é:

```py
['script.py', 'ana', '28']
```

Repare que **tudo** em `sys.argv` chega como string — se você passou `28` esperando um número, precisa converter com `int()` explicitamente, do mesmo jeito que já viu com `input()`.

```py
# script.py
import sys

nome = sys.argv[1]
idade = int(sys.argv[2])
print(f"{nome} tem {idade} anos")
```

Rodando `python script.py Ana 28`, a saída é:

```py
Ana tem 28 anos
```

`sys.argv` funciona, mas escala mal: não valida nada, não gera mensagem de ajuda, e um script com muitos parâmetros vira uma lista de índices numéricos difícil de acompanhar.

## argparse

O módulo `argparse`, da biblioteca padrão, resolve esses problemas: você declara cada argumento esperado (nome, tipo, se é obrigatório, texto de ajuda), e ele cuida de validar a entrada e até gerar uma mensagem de `--help` automaticamente.

```py
# script.py
import argparse

parser = argparse.ArgumentParser(description="Cumprimenta alguém pelo nome")
parser.add_argument("nome", help="Nome da pessoa a cumprimentar")
parser.add_argument("--idade", type=int, help="Idade da pessoa")

argumentos = parser.parse_args()

print(f"Olá, {argumentos.nome}!")
if argumentos.idade:
    print(f"Você tem {argumentos.idade} anos")
```

Rodando `python script.py Ana --idade 28`, a saída é:

```py
Olá, Ana!
Você tem 28 anos
```

`nome` foi declarado como argumento posicional (obrigatório, sem `--` na frente), enquanto `--idade` é opcional e já vem com `type=int`, então `argumentos.idade` chega como número de verdade, sem você precisar converter manualmente.

Rodando o mesmo script com `python script.py --help`, a saída é uma mensagem de ajuda gerada automaticamente:

```py
usage: script.py [-h] [--idade IDADE] nome

Cumprimenta alguém pelo nome

positional arguments:
  nome            Nome da pessoa a cumprimentar

options:
  -h, --help      show this help message and exit
  --idade IDADE   Idade da pessoa
```

Se você rodar o script sem o argumento obrigatório `nome`, `argparse` já mostra uma mensagem de erro clara e encerra o programa sozinho — sem precisar de nenhum `try`/`except` extra da sua parte.

> **Nota:** `argparse` também valida o tipo automaticamente. Rodando `python script.py Ana --idade trinta`, o `type=int` faz o `argparse` recusar o valor e mostrar um erro, em vez de deixar o programa quebrar mais adiante com um `ValueError` inesperado.

## Serialização com pickle

_Serializar_ um objeto é convertê-lo pra um formato que pode ser salvo em disco ou enviado pela rede, e depois reconstruído. O formato mais conhecido pra isso é o JSON, que você vai ver em detalhes no próximo post — mas JSON só entende um conjunto limitado de tipos (números, texto, listas, dicionários, booleanos, `None`). O módulo `pickle`, também da biblioteca padrão, serializa praticamente **qualquer** objeto Python, incluindo instâncias de classes suas.

```py
import pickle

class Produto:
    def __init__(self, nome, preco):
        self.nome = nome
        self.preco = preco

produto = Produto("Teclado", 250.0)

with open("produto.pkl", "wb") as arquivo:
    pickle.dump(produto, arquivo)
```

O modo `"wb"` (escrita binária) é obrigatório aqui — pickle não gera texto legível, gera bytes.

### Carregando de volta com pickle.load()

```py
import pickle

class Produto:
    def __init__(self, nome, preco):
        self.nome = nome
        self.preco = preco

with open("produto.pkl", "rb") as arquivo:
    produto_carregado = pickle.load(arquivo)

print(produto_carregado.nome, produto_carregado.preco)
```

A saída é:

```py
Teclado 250.0
```

`pickle.load()` reconstrói o objeto `Produto` inteiro — com o tipo certo e todos os atributos — exatamente como ele estava antes de ser salvo. Repare que a classe `Produto` precisa existir (com a mesma definição) no código que carrega o arquivo; o `pickle` guarda os dados do objeto, não a definição da classe em si.

> **Nota:** nunca use `pickle.load()` em um arquivo que veio de uma fonte não confiável. Diferente do `json`, que só descreve dados, um arquivo pickle pode ser construído pra executar código arbitrário no momento em que é carregado — é um formato pensado pra troca de dados **entre partes do seu próprio sistema**, não pra receber de fora.

## pickle ou json: qual usar

- Use `json` quando o dado precisa ser lido por humanos, trocado com sistemas fora do Python (uma API, um front-end em JavaScript), ou vem de uma fonte que você não controla totalmente;
- Use `pickle` quando o dado fica só dentro do seu próprio sistema Python, e você precisa salvar objetos mais complexos que o JSON não sabe representar sozinho — como instâncias de classes, ou tipos como `datetime` sem conversão manual.

Com `argparse` transformando seus scripts em ferramentas de linha de comando de verdade, e `pickle` guardando objetos Python complexos em disco (com a ressalva de segurança sobre confiar na origem do arquivo), você fecha o assunto de scripts práticos do dia a dia. No próximo e último post desta introdução, você vai dar uma volta por mais quatro módulos essenciais: `datetime`, `math`, `json` e `re`.

**Fonte adaptada:** [Python Command-Line Arguments](https://www.tutorialspoint.com/python/python_command_line_arguments.htm), [Python Serialization](https://www.tutorialspoint.com/python/python_serialization.htm)
