---
layout: post
title: "#12 - Tratamento de Erros, Entrada do Usuário e Arquivos"
date: 2026-08-11 11:40:00
image: '/assets/img/posts/tutorial-python-erros-input-e-arquivos.webp'
description: Como tratar exceções com try/except/else/finally, capturar entrada do usuário com input() e ler, escrever e apagar arquivos em Python.
category: 'dev'
tags:
- Python
- Programação
- Exceções
twitter_text: Tratamento de Erros, Input e Arquivos
introduction: "Nesta parte do tutorial, você vai aprender a tratar erros com try/except, capturar entrada do usuário e manipular arquivos em Python."
---

Todo programa que interage com o mundo real — seja lendo um arquivo, pedindo um dado pro usuário ou fazendo uma conta que pode dar zero de divisor — vai, mais cedo ou mais tarde, esbarrar num erro que não estava nos planos. A questão não é "se" isso vai acontecer, é "quando", e o que o seu programa faz nesse momento.

Neste post você vai ver como o Python lida com erros em tempo de execução usando `try`/`except`, como capturar entrada digitada pelo usuário com `input()`, e como abrir, ler, escrever e apagar arquivos — sempre recomendando o jeito mais seguro de fazer isso.

## Tratando erros com try e except

Quando um erro acontece dentro de um bloco `try`, o Python não deixa o programa quebrar na hora — ele desvia a execução pro bloco `except` correspondente.

```py
try:
    print(variavel_inexistente)
except:
    print("Algo deu errado")
```

A saída é:

```py
Algo deu errado
```

Sem o `try`/`except`, essa mesma linha (`print(variavel_inexistente)`) faria o programa inteiro parar com um `NameError` e um traceback na tela.

### Capturando tipos específicos de exceção

Um `except` sem tipo nenhum captura qualquer erro, mas isso costuma ser ruim: você acaba escondendo erros que não tinha previsto e que talvez precisassem de outro tratamento. O ideal é ser específico sobre qual erro você está esperando.

```py
try:
    print(variavel_inexistente)
except NameError:
    print("Essa variável não foi definida")
except Exception as erro:
    print(f"Outro erro aconteceu: {erro}")
```

A saída é:

```py
Essa variável não foi definida
```

Você pode empilhar quantos blocos `except` precisar, cada um tratando um tipo diferente de exceção. O Python testa cada um na ordem e executa só o primeiro que combinar com o erro levantado.

### O bloco else

Um `else` depois do `try`/`except` roda só quando **nenhum** erro acontece no bloco `try`.

```py
try:
    resultado = 10 / 2
except ZeroDivisionError:
    print("Não é possível dividir por zero")
else:
    print(f"Divisão feita com sucesso: {resultado}")
```

A saída é:

```py
Divisão feita com sucesso: 5.0
```

### O bloco finally

Já o `finally` roda sempre, aconteça erro ou não — é o lugar certo pra colocar código de limpeza que precisa rodar de qualquer jeito, como fechar uma conexão ou um arquivo.

```py
try:
    resultado = 10 / 0
except ZeroDivisionError:
    print("Não é possível dividir por zero")
finally:
    print("Bloco try/except finalizado")
```

A saída é:

```py
Não é possível dividir por zero
Bloco try/except finalizado
```

### Levantando exceções com raise

Além de capturar erros, você também pode lançar um erro de propósito com `raise`, quando alguma condição do seu próprio código não fizer sentido continuar.

```py
def definir_idade(idade):
    if idade < 0:
        raise ValueError("Idade não pode ser negativa")
    print(f"Idade definida: {idade}")

try:
    definir_idade(-5)
except ValueError as erro:
    print(f"Erro: {erro}")
```

A saída é:

```py
Erro: Idade não pode ser negativa
```

> **Nota:** prefira levantar (e capturar) tipos de exceção específicos e já existentes na linguagem (`ValueError`, `TypeError`, `FileNotFoundError`, etc.) sempre que fizerem sentido, em vez de sempre recorrer a `Exception` genérica — isso deixa claro pra quem for tratar o erro depois exatamente o que deu errado.

## Capturando entrada do usuário

A função `input()` interrompe a execução do programa e espera o usuário digitar algo no terminal, apertando Enter pra confirmar.

```py
nome = input("Digite seu nome: ")
print(f"Olá, {nome}!")
```

Se o usuário digitar "Felipe", a saída é:

```py
Olá, Felipe!
```

### Todo input é texto

Um detalhe importante: **tudo** que vem de `input()` chega como `str`, mesmo que o usuário digite só números. Se você precisa de um número de verdade, converta explicitamente com `int()` ou `float()`.

```py
idade_texto = input("Digite sua idade: ")
idade = int(idade_texto)
print(f"Ano que vem você terá {idade + 1} anos.")
```

Se o usuário digitar "30", a saída é:

```py
Ano que vem você terá 31 anos.
```

### Validando entrada com try/except

Juntando os dois assuntos deste post: como o usuário pode digitar qualquer coisa (inclusive algo que não é número), é comum combinar `input()` com `try`/`except` num loop, pedindo de novo até receber um valor válido.

```py
while True:
    entrada = input("Digite um número inteiro: ")
    try:
        numero = int(entrada)
        break
    except ValueError:
        print("Isso não é um número inteiro válido, tente de novo.")

print(f"Você digitou {numero}")
```

Se o usuário digitar "abc" e depois "42", a saída é:

```py
Isso não é um número inteiro válido, tente de novo.
Você digitou 42
```

## Manipulando arquivos

Python trabalha com arquivos através da função `open()`, que recebe o caminho do arquivo e um modo de abertura.

Os principais modos são:

- `"r"` — leitura (padrão). Dá erro se o arquivo não existir;
- `"w"` — escrita. Cria o arquivo se ele não existir, e **apaga todo o conteúdo anterior** se existir;
- `"a"` — acréscimo (append). Cria o arquivo se não existir, e adiciona conteúdo ao final se já existir;
- `"x"` — criação. Cria um arquivo novo, mas dá erro se ele já existir.

Também dá pra combinar com `"t"` (modo texto, o padrão) ou `"b"` (modo binário, pra arquivos que não são texto, como imagens).

### Abrindo e lendo um arquivo

```py
arquivo = open("notas.txt", "r")
conteudo = arquivo.read()
print(conteudo)
arquivo.close()
```

Repare no `arquivo.close()` no final — é essencial fechar um arquivo depois de usá-lo, pra liberar o recurso do sistema operacional. Mas é fácil esquecer isso, especialmente se um erro acontecer no meio do caminho e o `close()` nunca for executado.

### O jeito recomendado: with open()

Por isso, o jeito recomendado (e o que você deve usar sempre) é abrir arquivos com a instrução `with`. Ela garante que o arquivo é fechado automaticamente ao final do bloco, mesmo que um erro aconteça no meio.

```py
with open("notas.txt", "r") as arquivo:
    conteudo = arquivo.read()
    print(conteudo)
```

Não existe `arquivo.close()` nesse exemplo porque ele nem é necessário — o Python cuida disso sozinho assim que o bloco `with` termina.

> **Nota:** de agora em diante, prefira sempre `with open(...)` em vez de `open()`/`close()` manual. É mais seguro e é o padrão usado em praticamente todo código Python de verdade.

### Lendo parte do conteúdo

`read()` aceita um número como argumento, limitando quantos caracteres devem ser lidos.

```py
with open("notas.txt", "r") as arquivo:
    print(arquivo.read(10))
```

Isso devolve só os 10 primeiros caracteres do arquivo.

### Lendo linha por linha

`readline()` lê uma linha de cada vez — útil quando o arquivo é grande e você não quer (ou não pode) carregar tudo de uma vez na memória.

```py
with open("notas.txt", "r") as arquivo:
    print(arquivo.readline())
    print(arquivo.readline())
```

Isso imprime as duas primeiras linhas do arquivo, uma por chamada.

Pra percorrer o arquivo inteiro, linha por linha, o jeito mais comum é simplesmente iterar sobre o objeto arquivo com `for`:

```py
with open("notas.txt", "r") as arquivo:
    for linha in arquivo:
        print(linha.strip())
```

O `.strip()` aí remove a quebra de linha (`\n`) que vem no final de cada linha lida do arquivo — sem isso, o `print` acabaria duplicando as quebras de linha na saída.

### Escrevendo em um arquivo

Usando o modo `"a"`, o conteúdo escrito é adicionado ao final do que já existia no arquivo.

```py
with open("notas.txt", "a") as arquivo:
    arquivo.write("Nova linha adicionada ao final.\n")

with open("notas.txt", "r") as arquivo:
    print(arquivo.read())
```

Já com o modo `"w"`, o arquivo inteiro é sobrescrito — todo o conteúdo anterior é apagado antes de escrever o novo.

```py
with open("notas.txt", "w") as arquivo:
    arquivo.write("Esse é o único conteúdo que sobrou.\n")
```

> **Nota:** o modo `"w"` apaga o arquivo inteiro silenciosamente, sem pedir confirmação nenhuma. Tome cuidado redobrado antes de usá-lo — se você só queria adicionar conteúdo, o modo certo é `"a"`.

### Criando um arquivo novo

Os modos `"x"`, `"a"` e `"w"` criam o arquivo automaticamente se ele ainda não existir. A diferença do `"x"` é que ele dá erro se o arquivo **já** existir, o que é útil quando você quer ter certeza de que não vai sobrescrever nada por acidente.

```py
with open("arquivo_novo.txt", "x") as arquivo:
    arquivo.write("Primeira linha deste arquivo novo.\n")
```

Se `arquivo_novo.txt` já existir, essa chamada lança um `FileExistsError`.

## Apagando arquivos

Apagar arquivos não é responsabilidade do `open()` — pra isso, o Python usa o módulo `os`, que dá acesso a funcionalidades do sistema operacional.

```py
import os

os.remove("arquivo_novo.txt")
```

### Verificando se o arquivo existe antes de apagar

Chamar `os.remove()` num arquivo que não existe lança um erro. Pra evitar isso, é comum checar a existência do arquivo antes, com `os.path.exists()`.

```py
import os

if os.path.exists("arquivo_novo.txt"):
    os.remove("arquivo_novo.txt")
    print("Arquivo removido.")
else:
    print("O arquivo não existe.")
```

### Apagando uma pasta

Pra remover uma pasta inteira (e não um arquivo), o módulo `os` também oferece `os.rmdir()`.

```py
import os

os.rmdir("pasta_temporaria")
```

> **Nota:** `os.rmdir()` só remove pastas **vazias**. Se a pasta tiver arquivos ou subpastas dentro, você precisa esvaziá-la primeiro (ou usar `shutil.rmtree()`, que remove tudo recursivamente — mas com esse poder vem a responsabilidade de ter bastante certeza do que está apagando).

E com isso você já sabe blindar seu programa contra erros inesperados com `try`/`except`, conversar com quem está usando o programa via `input()`, e ler, escrever e apagar arquivos com segurança usando `with open(...)`.

**Fonte adaptada:** [Python Try Except](https://www.w3schools.com/python/python_try_except.asp), [Python User Input](https://www.w3schools.com/python/python_user_input.asp), [Python File Handling](https://www.w3schools.com/python/python_file_handling.asp), [Python File Open](https://www.w3schools.com/python/python_file_open.asp), [Python File Write](https://www.w3schools.com/python/python_file_write.asp), [Python Delete File](https://www.w3schools.com/python/python_file_remove.asp)
