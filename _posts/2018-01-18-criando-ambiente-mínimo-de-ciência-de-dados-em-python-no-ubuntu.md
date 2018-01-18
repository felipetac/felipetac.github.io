---
layout: post
title: "Criando ambiente mínimo de ciência de dados em Python no Ubuntu"
date: 2018-01-18 11:40:08
image: 'https://res.cloudinary.com/felipetac/image/upload/v1516283925/anaconda-min_rvrejw.png'
description: Aprenda a utilizar esse pacote de arquivos que contém os itens essenciais de todo Cientista de Dados
category: 'dev'
tags:
- Python
- Pyenv
- Jupyter
- Anaconda
- Ciência de Dados
- Ubuntu
twitter_text: Montando ambiente mínimo de ciência de dados em Python utilizando Anaconda
introduction: Montando um ambinente mínimo de ciência de dados em Python e Jupyter Notebook utilizando Anaconda 
---

## Introdução
 
Imagine que, para começar a utilizar as ferramentas para realizar seus projetos e estudos de Data Science você precisasse baixar e instalar o Python e cada uma de suas bibliotecas. A menos que você esteja procurando configurar seu computador especificamente, ou instalar as bibliotecas a medida que progride, utilizar o Anaconda é a forma mais rápida e eficaz para dar o pontapé inicial.

## Anaconda

O Anaconda é uma iniciativa que tem como objetivo agregar todas as ferramentas para análise de dados em um único arquivo. Resumidamente, é um arquivo que irá instalar em seu computador todas as bibliotecas e recursos necessários para você começar seus projetos de Data Science e Machine Learning, como o Python em si, Jupyter Notebook, a IDE Spyder, além de famosas bibliotecas, como NumPy, Pandas, Scikit-learn, etc.

### Instalação

1\. Instalar _pyenv_

Você precisa ter o pyenv instalado para poder controlar as versões do python e do anaconda no seu sistema operacional. Não conhece e/ou não instalou o _pyenv_ no linux? Leia este meu artigo: [Gerenciando versões Python com Pyenv no Ubuntu](/gerenciando-versões-python-com-pyenv-no-ubuntu/) processa com seus passos e depois volte a este tutorial.

2\. Instalar _Anaconda_

Vamos listar todas as versões que o _pyenv_ disponibiliza do Anaconda executando o comando:

```bash
pyenv install -l

...
anaconda3-4.2.0
anaconda3-4.3.0
anaconda3-4.3.1
anaconda3-4.4.0
anaconda3-5.0.0
anaconda3-5.0.1
ironpython-dev
ironpython-2.7.4
ironpython-2.7.5
...
```

Agora instalamos a versão mais recente do anaconda que no caso atual do tutorial é a ```anaconda3-5.0.1```:

```bash
pyenv install anaconda3-5.0.1
```

Feito isso o _pyenv_ instalará o Python3 e todas as denpendências mínimas para trabalhar com ciência de dados na liguagem. Entre ela está o _Jupyter Notebook_ que é uma aplicação de código aberto que permite você criar e compartilhar documentos com código dinâmico, visualizações de gráficos, limpeza de dados e até textos explicatórios. O melhor de tudo é que ele tem suporte a elementos HTML, o que vai deixar sua apresentação mais linda.

### Testando

Vamos ativar o ambiente que comtempla as bibliotecas _Anaconda_ com o seguinte comando:

```bash
pyenv activate anaconda3-5.0.1

(anaconda3-5.0.1) felipe@ubuntu-vm:~$
```

Com o ambiente ativado, vamos agora testar o _Jupyter Notebook_ subindo uma instância web dele:

```bash
(anaconda3-5.0.1) felipe@ubuntu-vm:~$ jupyter-notebook

[I 11:14:28.761 NotebookApp] JupyterLab alpha preview extension loaded from 
/home/felipe/.pyenv/versions/anaconda3-5.0.1/lib/python3.6/site-packages/jupyterlab
JupyterLab v0.27.0
Known labextensions:
[I 11:14:28.763 NotebookApp] Running the core application with no additional extensions or settings
[I 11:14:28.766 NotebookApp] Serving notebooks from local directory: /home/felipe
[I 11:14:28.766 NotebookApp] 0 active kernels 
[I 11:14:28.766 NotebookApp] The Jupyter Notebook is running at: 
http://localhost:8888/?token=003c2e5c4f3f0ad267af2675a35f29ecffc6e6631ab3a345
[I 11:14:28.766 NotebookApp] Use Control-C to stop this server and shut down 
all kernels (twice to skip confirmation).
[C 11:14:28.769 NotebookApp] Copy/paste this URL into your browser when you 
connect for the first time, to login with a token: 
http://localhost:8888/?token=003c2e5c4f3f0ad267af2675a35f29ecffc6e6631ab3a345
[I 11:14:29.081 NotebookApp] Accepting one-time-token-authenticated 
connection from 127.0.0.1
```

Pronto! Automaticamente ele abre o seu Web Browser padrão com a instância do _Jupyter Notebook_ aberta.

![Imagem do Jupyter Notebook Instanciado](https://res.cloudinary.com/felipetac/image/upload/v1516282621/jupyter-notebook-min_qitphg.png)

Legal né? Mais pra frente irei lançar tutoriais de como trabalhar com o _Jupyter Notebook_ e as principais bibliotecas python para ciência de dados! Aguadem... :)