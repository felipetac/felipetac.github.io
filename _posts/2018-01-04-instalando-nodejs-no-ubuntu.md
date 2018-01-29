---
layout: post
title: "Instalando NodeJS no Ubuntu"
date: 2018-01-04 11:25:44
image: 'https://res.cloudinary.com/felipetac/image/upload/v1515068858/node-js-and-npm_jlvzql.png'
description: "Instalando o NodeJS via Package Manager e configurando para instalar seus pacotes sem a necessidade de sudo."
category: 'dev'
tags:
- NodeJS
- Ubuntu
- NPM
- Javascript
twitter_text: "Instalando NodeJS no Ubuntu e configurando a instalação dos pacotes sem sudo"
introduction: "Instalando NodeJS no Ubuntu e configurando a instalação dos pacotes sem sudo."
---

Durante meus estudos de NodeJS passei por uma pedra no caminho muito chata... Não foi nem a instalação do NodeJS em si, mas sim a instalação dos pacotes via npm que estava gerando dores de cabeça pois me pedia previlégios de administrador para tal operação. Fora que quando tentava usar alguns destes pacotes "zaralhava" tudo por conta tambem de problemas de permissão. Pesquisando um pouco na web vi que há 3 opções de configurações para o NPM sanando este problema. Irei explicar a que eu efetuei e utilizo atualmente por achar esta configuração a mais encontrada e utilizada nos exemplos na web. Vamos lá!

## Instalação do NodeJS via Package Manager no Ubuntu

Para este tutorial utilizei a versão 8.x do NodeJS. Caso queira uma versão mais atual, acesse [NodeJS](https://nodejs.org/en/download/package-manager/#debian-and-ubuntu-based-linux-distributions) e pegue o link da versão mais estável corrente.

Voltando... Execute no terminal:

```bash
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
sudo apt-get install -y nodejs
```

> **Opcional**: Instalar _build tools_

Para compilar e instalar _addons_ nativos do npm você talvez precise instalar também o _build tools_:

```bash
sudo apt-get install -y build-essential
```

Feito isso o NodeJS e o NPM serão instalados no seu Ubuntu.

## Configurando NPM para previnir erros de permissão

1\. Criando diretório para instalações globais:

```bash
mkdir ~/.npm-global
```

2\. Configurando npm para usar o caminho do novo diretório:

```bash
npm config set prefix '~/.npm-global'
```

3\. Abra ou crie o arquivo ```~/.profile``` e adicione esta linha no final do arquivo:

```bash
export PATH=~/.npm-global/bin:$PATH
```

4\. Volte para linha de comando e atualize as variáveis do sistema:

```bash
source ~/.profile
```

 Pronto! NodeJS e NPM instalados e configurados.

> Teste: Baixe um pacote globalmente sem utilizar **sudo**.

```bash
npm install -g jshint
```

Feito isso o NPM irá instalar o pacote _jshint_ globalmente sem a necessidade de sudo e automaticamente seu _bin_ estará disponível na linha de comando para execução.