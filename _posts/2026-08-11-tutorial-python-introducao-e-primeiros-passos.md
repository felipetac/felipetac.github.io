---
layout: post
title: "#1 - Introdução ao Python e Primeiros Passos"
date: 2026-08-11 08:00:00
image: '/assets/img/posts/tutorial-python-introducao-e-primeiros-passos.webp'
description: Uma introdução ao Python, como instalar e rodar seus primeiros scripts, e as regras básicas de sintaxe, statements e comentários da linguagem.
category: 'dev'
tags:
- Python
- Programação
- Introdução
twitter_text: Introdução ao Python e Primeiros Passos
introduction: "Nesta parte do tutorial, você vai conhecer o Python, instalar o interpretador e escrever seus primeiros comandos."
---

Estou começando aqui uma série de posts com um tutorial de Python do zero. A ideia é cobrir, capítulo a capítulo, os fundamentos da linguagem: variáveis, tipos de dados, estruturas de controle, listas, dicionários e por aí vai. Se você nunca programou em _Python_ ou já mexeu um pouco e quer revisar a base, esse é o ponto de partida.

_Python_ é uma linguagem de programação de propósito geral, criada por Guido van Rossum no final dos anos 80 e lançada oficialmente em 1991. Hoje ela está em praticamente todo canto: desenvolvimento web (com frameworks como Django e Flask), ciência de dados e machine learning, automação de tarefas, scripts de sistema, análise de dados, e até no ensino de programação, já que sua sintaxe é bastante próxima da linguagem natural.

## Por que Python é tão popular

Alguns motivos costumam aparecer sempre que se fala sobre a popularidade do Python:

- **Sintaxe simples e legível** — o código Python se parece muito com pseudocódigo, o que reduz a curva de aprendizado.
- **Multiplataforma** — roda em Windows, Linux, macOS e até em dispositivos como Raspberry Pi.
- **Multiparadigma** — suporta programação orientada a objetos, procedural e, em menor grau, funcional.
- **Ecossistema gigante** — existe uma biblioteca (ou várias) pronta pra praticamente qualquer problema que você for resolver.
- **Interpretada** — o código é executado linha a linha por um interpretador, sem precisar de uma etapa de compilação separada antes de rodar.

## Instalando o Python

A maioria das distribuições Linux já vem com Python 3 instalado por padrão. Pra confirmar se você já tem e qual é a versão, abra o terminal e rode:

```bash
python3 --version
```

Se o comando não for reconhecido, no Ubuntu/Debian dá pra instalar assim:

```bash
sudo apt update
sudo apt install python3
```

No Windows e no macOS, o caminho mais simples é baixar o instalador direto do site oficial ([python.org/downloads](https://www.python.org/downloads/)) e seguir o assistente de instalação — só não esqueça de marcar a opção "Add Python to PATH" durante a instalação no Windows, senão o comando `python` não vai funcionar no terminal.

> **Nota:** esse tutorial usa sempre `python3` nos exemplos de linha de comando porque em muitos sistemas Linux o comando `python` sozinho ainda aponta pro Python 2 (ou nem existe). Se no seu sistema `python` já aponta pro Python 3, pode usar o que preferir.

## Duas formas de rodar código Python

### Modo interativo (REPL)

Se você digitar `python3` no terminal sem passar nenhum argumento, entra no modo interativo — também chamado de REPL (_Read-Eval-Print Loop_). Nele, cada linha que você digita é executada na hora, o que é ótimo pra testar coisas rapidamente:

```bash
python3
```

```py
Python 3.12.3 (main, Apr 10 2024, 05:33:47) [GCC 13.2.0] on linux
Type "help", "copyright", "credits" or "license" for more information.
>>> 2 + 2
4
>>> print("Olá, mundo!")
Olá, mundo!
>>> exit()
```

Repare no prompt `>>>` — é o sinal de que o interpretador está esperando um novo comando. Pra sair, digite `exit()` ou use o atalho `Ctrl + D`.

### Rodando um arquivo .py

Na prática, o dia a dia de programação em Python não é feito digitando linha por linha no REPL, e sim escrevendo scripts salvos em arquivos com a extensão `.py`. Crie um arquivo chamado `ola.py` com o seguinte conteúdo:

```py
print("Olá, mundo!")
```

E rode ele passando o caminho do arquivo pro interpretador:

```bash
python3 ola.py
```

A saída é:

```py
Olá, mundo!
```

Esse vai ser o fluxo padrão daqui em diante: escrever o código em um arquivo `.py` e executar com `python3 nome_do_arquivo.py`.

## A sintaxe do Python: indentação é tudo

Se você já programou em outras linguagens como Java, C ou JavaScript, provavelmente está acostumado a delimitar blocos de código com chaves `{ }` e terminar cada linha com ponto e vírgula `;`. Python não usa nada disso — os blocos de código são definidos pela **indentação** (os espaços no início da linha).

```py
idade = 20

if idade >= 18:
    print("Maior de idade")
else:
    print("Menor de idade")
```

Tudo que estiver indentado no mesmo nível depois de um `if`, `else`, `for`, `while`, `def` etc. (sempre seguidos de dois-pontos `:`) faz parte daquele bloco. Se a indentação estiver errada, o Python literalmente não entende o código e lança um erro:

```py
if idade >= 18:
print("Maior de idade")
```

```py
IndentationError: expected an indented block after 'if' statement on line 1
```

> **Nota:** o padrão adotado pela comunidade Python (documentado na PEP 8, o guia de estilo oficial) é usar **4 espaços** por nível de indentação, e não misturar espaços com tabs — misturar os dois pode gerar erros difíceis de enxergar, já que visualmente parecem iguais no editor.

### Statements (comandos)

Cada linha de código Python é, em geral, um _statement_ — um comando completo que o interpretador executa. Diferente de linguagens como C, você não precisa (e normalmente não deve) terminar a linha com ponto e vírgula:

```py
nome = "Felipe"
print(nome)
```

Ainda é possível colocar mais de um statement na mesma linha, separando com `;`, mas isso é raro de ver em código Python de verdade porque prejudica a leitura:

```py
x = 1; y = 2; z = 3
print(x + y + z)
```

Quando um statement é muito longo, dá pra quebrá-lo em várias linhas usando parênteses, colchetes ou chaves — o Python entende que a instrução continua até o fechamento:

```py
total = (1 + 2 + 3 +
         4 + 5)
print(total)
```

## Exibindo informações na tela com print()

A função `print()` é provavelmente a primeira coisa que você vai usar em qualquer script Python — ela serve pra mostrar valores na saída padrão (o terminal).

### Imprimindo texto

Textos em Python são chamados de _strings_ e precisam estar entre aspas, simples ou duplas:

```py
print("Olá, Felipe!")
print('Aspas simples também funcionam')
```

### Imprimindo números

Números não precisam de aspas, e o `print()` também consegue avaliar expressões antes de exibir o resultado:

```py
print(10)
print(3.14)
print(10 + 5)
```

A saída é:

```py
10
3.14
15
```

### Imprimindo múltiplos valores

Você pode passar vários valores pro `print()` separando por vírgula — ele junta tudo automaticamente com um espaço entre cada item:

```py
idade = 30
print("Eu tenho", idade, "anos")
```

```py
Eu tenho 30 anos
```

Isso é útil porque, diferente do operador `+`, o `print()` com vírgulas não exige que todos os valores sejam do mesmo tipo — não tem problema misturar texto e número dessa forma.

### Personalizando com sep e end

Por padrão, o `print()` separa os valores com espaço e termina a linha com uma quebra de linha. Dá pra mudar os dois comportamentos com os parâmetros `sep` e `end`:

```py
print("Python", "é", "divertido", sep="-")
print("Sem quebra de linha no final", end="")
print(" continua na mesma linha")
```

```py
Python-é-divertido
Sem quebra de linha no final continua na mesma linha
```

## Comentários em Python

Comentários são trechos de texto que o interpretador ignora — servem só pra documentar o código pra você mesmo (no futuro) ou pra quem for ler depois.

### Comentário de uma linha

Começam com `#`. Tudo que vier depois dele, até o fim da linha, é ignorado:

```py
# Isso é um comentário e não vai ser executado
print("Isso vai rodar normalmente")  # comentário no fim da linha também funciona
```

### "Comentário de bloco" com string solta

Python não tem uma sintaxe nativa de comentário de várias linhas (tipo `/* */` de outras linguagens). O jeito mais comum de comentar várias linhas é empilhando `#` em cada uma:

```py
# Este script calcula a média
# de uma lista de notas
# e exibe o resultado formatado
```

Mas existe outro truque bastante usado: uma string de várias linhas (entre `"""` ou `'''`) que não é atribuída a nenhuma variável e nem usada de outra forma. Como o Python avalia essa string, mas não faz nada com o resultado, ela acaba funcionando como um bloco de comentário:

```py
"""
Isso é uma string solta de várias linhas.
O Python interpreta como uma expressão válida,
mas como ela não é usada em lugar nenhum,
na prática funciona como um comentário de bloco.
"""
print("O código continua normalmente depois")
```

> **Nota:** essa mesma sintaxe de string de três aspas logo na primeira linha de uma função ou de um módulo tem um nome especial — _docstring_ — e é usada pra documentar o que aquele código faz. Isso é diferente de um comentário: a docstring fica acessível em tempo de execução (por exemplo, via `help()`), enquanto um comentário de verdade (`#`) é descartado assim que o código é lido.

E é assim que você dá os primeiros passos em Python: instala o interpretador, aprende a rodar código no modo interativo ou em arquivos `.py`, entende que indentação define blocos, e já sabe exibir informações na tela e comentar seu código. No próximo post da série, a gente entra em variáveis e nos tipos de dados nativos do Python.

**Fonte adaptada:** [Python Introduction](https://www.w3schools.com/python/python_intro.asp), [Python Get Started](https://www.w3schools.com/python/python_getstarted.asp), [Python Syntax](https://www.w3schools.com/python/python_syntax.asp), [Python Statements](https://www.w3schools.com/python/python_statements.asp), [Python Output](https://www.w3schools.com/python/python_output.asp), [Python Output Numbers](https://www.w3schools.com/python/python_output_numbers.asp), [Python Comments](https://www.w3schools.com/python/python_comments.asp)
