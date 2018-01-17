---
layout: post
title: "Ambientes Virtuais em Python com Pyenv-virtualenv no Ubuntu"
date: 2018-01-17 16:02:00
image: 'https://res.cloudinary.com/felipetac/image/upload/v1516206004/virtualenv_ghwzdi.png'
description: Demonstração de como criar ambientes virtuais em Python com o plugin virtualenv do Pyenv no Ubuntu
category: 'dev'
tags:
- Python
- Pyenv
- Virtualenv
- Ubuntu
twitter_text: Ambientes Virtuais em Python com Pyenv-virtualenv no Ubuntu
introduction: Demonstração de como criar ambientes virtuais em Python com o plugin virtualenv do Pyenv no Ubuntu
---
Quero criar um ambiente virtual com a versão do Python 2.7.6 e um outro com a versão 3.6.2. E ai, como faço? É ai que entra o _pyenv_ + _pyenv-virtualenv_, pois com o _pyenv_ conseguimos instalar facilmente versões diferentes do _python_ na mesma máquina e alternar entre elas apenas com um simples comando. Já o _pyenv-virtualenv_ é um plugin do pyenv que nos permite criar ambientes isolados escolhendo a versão do _Python_ antes de criá-los.Chique né e como começar?

1. Instale do Pyenv

É preciso ter o _pyenv_ instalado para utilizar seus plugins. Se ainda não tiver instalado o pyenv, entre neste link: [Gerenciando versões Python com Pyenv no Ubuntu](/gerenciando-versões-python-com-pyenv-no-ubuntu/).

2. Instale do plugin _pyenv-virtualenv_

```bash
$ git clone https://github.com/pyenv/pyenv-virtualenv.git $(PYENV_ROOT)/plugins/pyenv-virtualenv
```

3. E para surtir efeito das alterações, rode:

```bash	
$ source ~/.bashrc
```

Enfim vamos criar nosso primeiro virtualenv (Ambiente Virtual):

```bash	
$ pyenv virtualenv system my_venv_2.7.x
```

Ative-o digitando:

```bash	
$ pyenv activate my_venv_2.7.x
```

Agora digite _python_ e você verá que a versão usada para criar o _virtualenv_ foi a padrão que veio instalada no sistema antes mesmo de você instalar o _pyenv_. No meu caso foi a 2.7.6

Para criar com outra versão do python, basta digitar por exemplo:

```bash	
$ pyenv vistualenv 3.6.2 my_env_3.6.2
```

Agora podemos criar ambientes virtuais isolados como o _virtualenv_ fazia mas com uma vantagem, ainda podemos escolher qual versão do _python_ usar, legal né.
