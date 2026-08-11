---
layout: post
title: "#13 - Módulos, PIP e Ambientes Virtuais"
date: 2026-08-11 12:00:00
image: '/assets/img/posts/tutorial-python-modulos-pip-e-ambientes-virtuais.png'
description: Como criar e importar módulos em Python, gerenciar pacotes com o PIP e isolar dependências de projeto usando o módulo nativo venv.
category: 'dev'
tags:
- Python
- Programação
- Módulos
twitter_text: Módulos, PIP e Ambientes Virtuais
introduction: "Nesta parte do tutorial, você vai aprender a organizar código em módulos, instalar pacotes com o PIP e isolar dependências com ambientes virtuais."
---

Conforme um programa cresce, colocar tudo num arquivo `.py` só vira uma bagunça rapidamente. É aí que entram os _módulos_: um jeito de organizar código em arquivos separados e reutilizáveis. E assim que você começa a depender de código de terceiros — bibliotecas prontas pra não reinventar a roda — entra em cena o PIP, o gerenciador de pacotes do Python, e os ambientes virtuais, que evitam que as dependências de um projeto bagunçem as de outro.

Neste post você vai ver os três assuntos: como criar e importar seus próprios módulos, como usar o PIP pra instalar bibliotecas de terceiros, e como isolar tudo isso por projeto com o módulo `venv`.

## Criando e importando módulos

Um _módulo_ é, na prática, simplesmente um arquivo `.py` com código Python — funções, classes, variáveis — que pode ser importado e reaproveitado em outro arquivo.

Imagine um arquivo `saudacoes.py` com o seguinte conteúdo:

```py
# saudacoes.py
def bom_dia(nome):
    print(f"Bom dia, {nome}!")

def boa_noite(nome):
    print(f"Boa noite, {nome}!")
```

Em outro arquivo, no mesmo diretório, você importa esse módulo com `import` e acessa o conteúdo dele prefixando com o nome do módulo:

```py
import saudacoes

saudacoes.bom_dia("Felipe")
saudacoes.boa_noite("Felipe")
```

A saída é:

```py
Bom dia, Felipe!
Boa noite, Felipe!
```

### Variáveis em módulos

Um módulo também pode guardar variáveis — inclusive estruturas mais complexas, como dicionários e listas — que ficam disponíveis pra quem importar o módulo.

```py
# config.py
idioma_padrao = "pt-BR"
usuarios_ativos = ["ana", "bruno", "carla"]
```

```py
import config

print(config.idioma_padrao)
print(config.usuarios_ativos)
```

A saída é:

```py
pt-BR
['ana', 'bruno', 'carla']
```

### Importando com apelido (as)

Quando o nome do módulo é longo ou você só quer economizar digitação, dá pra dar um apelido com `as`.

```py
import config as cfg

print(cfg.idioma_padrao)
```

A saída é:

```py
pt-BR
```

### Importando itens específicos com from...import

Se você só precisa de uma função ou variável específica de um módulo, não precisa importar o módulo inteiro — dá pra importar só o que interessa com `from ... import ...`, e nesse caso você usa o nome direto, sem prefixar com o nome do módulo.

```py
from saudacoes import bom_dia

bom_dia("Marcos")
```

A saída é:

```py
Bom dia, Marcos!
```

> **Nota:** use `from ... import ...` com moderação em módulos grandes. Importar tudo (`from modulo import *`) polui o namespace do seu arquivo e dificulta saber de onde cada função veio — prefira importar só o que você realmente usa, ou importar o módulo inteiro e usar o prefixo.

### Explorando um módulo com dir()

A função `dir()` lista todos os nomes (funções, classes, variáveis) definidos dentro de um módulo — útil pra explorar rapidamente o que uma biblioteca oferece sem precisar abrir a documentação.

```py
import platform

print(dir(platform))
```

A saída é uma lista grande com todos os nomes definidos no módulo `platform`, incluindo funções como `system`, `release`, `version`, entre várias outras.

### Módulos embutidos

O Python já vem com uma boa quantidade de módulos prontos na biblioteca padrão, sem precisar instalar nada — `platform`, `math`, `random`, `datetime`, `os` e `json` são alguns exemplos que você vai ver ao longo deste tutorial.

```py
import platform

print(platform.system())
```

Rodando num Linux, a saída é:

```py
Linux
```

## O gerenciador de pacotes PIP

A biblioteca padrão do Python é ótima, mas cobre só uma fração do que existe pronto pra usar. Pra tudo que não vem embutido — frameworks web, bibliotecas de análise de dados, clientes de API — você recorre ao PIP, o gerenciador de pacotes do Python. Ele já vem instalado por padrão a partir do Python 3.4.

_Pacote_, aqui, é praticamente sinônimo de módulo (ou de um conjunto de módulos), só que empacotado de um jeito que pode ser publicado, versionado e instalado via PIP a partir do PyPI (Python Package Index, o repositório oficial de pacotes Python).

### Verificando se o PIP está instalado

```bash
pip --version
```

A saída é algo parecido com:

```bash
pip 24.0 from /usr/lib/python3/dist-packages/pip (python 3.12)
```

### Instalando um pacote

```bash
pip install requests
```

Depois de instalado, o pacote fica disponível pra importar normalmente, como qualquer módulo:

```py
import requests

resposta = requests.get("https://exemplo.com")
print(resposta.status_code)
```

### Listando pacotes instalados

```bash
pip list
```

A saída mostra o nome e a versão de cada pacote instalado no ambiente atual, algo como:

```bash
Package    Version
---------- -------
pip        24.0
requests   2.32.3
```

### Removendo um pacote

```bash
pip uninstall requests
```

O PIP pede confirmação antes de remover o pacote de fato.

> **Nota:** você encontra praticamente qualquer pacote publicado em [pypi.org](https://pypi.org/) — dá pra pesquisar por nome ou por funcionalidade antes de instalar.

## Ambientes virtuais

Imagine que você tem dois projetos: um usa a versão 1.0 de uma biblioteca, o outro precisa da versão 2.0 da mesma biblioteca. Se você instalar pacotes globalmente na sua máquina, essas versões vão colidir. É exatamente esse problema que os _ambientes virtuais_ resolvem: cada ambiente virtual é uma instalação isolada do Python, com seu próprio conjunto de pacotes, independente de qualquer outro ambiente (ou da instalação global).

O Python já vem com um módulo nativo pra isso, o `venv` — não é preciso instalar nada a mais.

### Criando um ambiente virtual

```bash
python3 -m venv meuprojeto
```

Isso cria uma pasta chamada `meuprojeto` com uma cópia isolada do interpretador Python e uma estrutura própria de diretórios (`bin`, `lib`, além de arquivos de configuração como `pyvenv.cfg`).

### Ativando o ambiente

No Linux e no macOS:

```bash
source meuprojeto/bin/activate
```

Depois de ativado, o prompt do terminal passa a mostrar o nome do ambiente entre parênteses, algo como `(meuprojeto) usuario@maquina:~$`, indicando que qualquer `pip install` ou `python` a partir dali vai usar esse ambiente isolado.

### Instalando pacotes dentro do ambiente

Com o ambiente ativado, `pip install` instala o pacote só ali dentro — sem afetar o Python "global" do sistema, nem outros ambientes virtuais.

```bash
pip install requests
```

### Desativando o ambiente

Pra sair do ambiente virtual e voltar ao Python padrão do sistema:

```bash
deactivate
```

### Removendo um ambiente virtual

Como um ambiente virtual é só uma pasta, apagá-lo é literalmente apagar a pasta:

```bash
rm -rf meuprojeto
```

> **Nota:** é comum (e recomendado) adicionar a pasta do ambiente virtual ao `.gitignore` do projeto — ela não deve ser versionada no git, só as dependências que o projeto precisa (geralmente listadas num arquivo `requirements.txt`, gerado com `pip freeze > requirements.txt`).

Este blog já tem posts específicos sobre gerenciar várias versões do Python e ambientes virtuais usando pyenv/virtualenv, que é outra ferramenta popular pra resolver um problema parecido (e complementar ao `venv`): [Gerenciando versões Python com Pyenv no Ubuntu](/gerenciando-versoes-python-com-pyenv-no-ubuntu/) e [Ambientes virtuais em Python com Pyenv-Virtualenv no Ubuntu](/ambientes-virtuais-em-python-com-pyenv-virtualenv-no-ubuntu/).

E assim você tem os três pilares de organização de um projeto Python de verdade: módulos pra estruturar seu próprio código, PIP pra usar código de terceiros, e ambientes virtuais pra manter tudo isso isolado por projeto.

**Fonte adaptada:** [Python Modules](https://www.w3schools.com/python/python_modules.asp), [Python PIP](https://www.w3schools.com/python/python_pip.asp), [Python Virtual Environment](https://www.w3schools.com/python/python_virtualenv.asp)
