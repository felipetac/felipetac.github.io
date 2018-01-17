---
layout: post
title: "Gerenciando versões Python com Pyenv no Ubuntu"
date: 2018-01-16 12:57:09
image: 'https://res.cloudinary.com/felipetac/image/upload/v1516206003/python-2-vs-python-3_e37ck9.png'
description: Demonstração de como gerenciar versões Python em um mesmo ambiente Ubuntu utilizando Pyenv
category: 'dev'
tags:
- Python
- Pyenv
- Ubuntu
twitter_text: Gerenciando versões Python com Pyenv no Ubuntu
introduction: Demonstração de como gerenciar versões Python em um mesmo ambiente Ubuntu utilizando Pyenv
---
O _pyenv_ é um gerenciador de versões do _Python_. Ele permite que se instale e gerencie várias versões do _Python_ usando a conta de usuário normal e permite manter várias versões isoladas umas das outras.

1\. Instalando as Dependências

```bash
sudo apt-get install -y make build-essential libssl-dev && 
sudo apt-get install -y zlib1g-dev libbz2-dev libreadline-dev && 
sudo apt-get install -y libsqlite3-dev wget curl llvm libncurses5-dev git
```

2\. Utilizando o _git_ baixe a versão corrente do pyenv aonde desejar instalar. Um bom lugar para escolher é ```$HOME/.pyenv``` (mas você pode instalar em outro lugar que desejar).

```bash
git clone https://github.com/pyenv/pyenv.git ~/.pyenv
```

3\. Defina uma variável de ambiente ```PYENV_ROOT``` para apontar o caminho onde o repositório do _pyenv_ foi clonado e adicione ```$PYENV_ROOT/bin``` ao seu ```$PATH``` para acessar/utilizar o pyenv via linha de comando.

```bash
echo 'export PYENV_ROOT="$HOME/.pyenv"' >> ~/.bashrc
echo 'export PATH="$PYENV_ROOT/bin:$PATH"' >> ~/.bashrc
```

>Proxy note: Se você usa um proxy, ```export http_proxy and HTTPS_PROXY``` também.

4\. Adicione o _pyenv init_ no seu _shell_ para hbilitar _shims_ e auto-completar. Por favor tenha certeza que o valor ```$(pyenv init -)``` é colocado no final do arquivo de configuração do shell, pois ele manipula o _PATH_ durante a inicialização.

```bash
echo -e 'if command -v pyenv 1>/dev/null 2>&1; then\n  eval "$(pyenv init -)"\nfi' >> ~/.bashrc
```

5\. E para surtir efeito as linhas adicionadas acima, rode:

```bash
source ~/.bashrc
```

Com isso o pyenv está instalado e se digitarmos _pyenv_ na _console_ veremos:

```bash
pyenv

pyenv 1.2.1-1-g6f27c91
Usage: pyenv <command> [<args>]

Some useful pyenv commands are:
   commands    List all available pyenv commands
   local       Set or show the local application-specific Python version
   global      Set or show the global Python version
   shell       Set or show the shell-specific Python version
   install     Install a Python version using python-build
   uninstall   Uninstall a specific Python version
   rehash      Rehash pyenv shims (run this after installing executables)
   version     Show the current Python version and its origin
   versions    List all Python versions available to pyenv
   which       Display the full path to an executable
   whence      List all Python versions that contain the given executable

See `pyenv help <command>' for information on a specific command.
For full documentation, see: https://github.com/pyenv/pyenv#readme
```

Agora podemos listar as versões do python instaladas, digitando:

```bash
pyenv versions

* system (set by /home/felipe/.pyenv/version)
```

Para listar as versões python disponíveis:

```bash
pyenv install -l
```

E assim podemos escolher qual versão do python instalar, vou escolher a 3.6.2

```bash
pyenv install 3.6.2
```

Agora digite novamente:

```bash
pyenv versions

* system (set by /home/mateus/.pyenv/version)
  3.6.2
```

Você verá que existem duas versões instaladas. E para escolher a versão 3.6.2, basta digitar:

```bash
pyenv global 3.6.2
```

Agora digite python na console e você verá que a versão global do python no sistema é a 3.6.2:

```bash
python

Python 3.6.2 (default, Jan  17 2018, 12:12:41)
[GCC 5.4.0 20160609] on linux
Type "help", "copyright", "credits" or "license" for more information.
>>> import sys
>>> sys.path
['', '/home/felipe/.pyenv/versions/3.6.2/lib/python36.zip',
'/home/felipe/.pyenv/versions/3.6.2/lib/python3.6',
'/home/felipe/.pyenv/versions/3.6.2/lib/python3.6/plat-linux',
'/home/felipe/.pyenv/versions/3.6.2/lib/python3.6/lib-dynload',
'/home/felipe/.pyenv/versions/3.6.2/lib/python3.6/site-packages']
>>>
```

Pronto! Você agora gerência duas versões do Python no Ubuntu, podendo gerenciar muitas outras seguindo o mesmo fluxo.
