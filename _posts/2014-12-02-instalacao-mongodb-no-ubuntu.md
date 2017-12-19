---
layout: post
title: "#2 - Instalação MongoDB no Ubuntu"
description: Lorem ipsum dolor sit amet, consectetur adipisicing elit.
image: '/assets/img/mongodb.png'
category: 'mongodb'
tags:
- Banco de dados
- MongoDB
- NoSQL
twitter_text: Lorem ipsum dolor sit amet, consectetur adipisicing elit.
introduction: Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
---

## Importe a chave pública usada pelo gerenciador de pacote do sistema operacional

As ferramentas de gerenciamento de pacotes (dpkg e apt) precisa garantir a consistência e autenticidade por meio da requisição desta assinatura do pacote com chaves GPG. Use do seguinte comando para importar a chave pública do MongoDB:

sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10

## Crie uma lista de repositórios

Crie a lista de repositórios em /etc/apt/sources.list.d/mongodb.list com o seguinte comando:

echo 'deb http://downloads-distro.mongodb.org/repo/ubuntu-upstart dist 10gen' | sudo tee /etc/apt/sources.list.d/mongodb.list

## Recarregue a base de dados de pacotes

Execute o seguinte comando para recarregar o banco de dados do pacote:

sudo apt-get update

## Instale a versão mais estável do MongoDB


sudo apt-get install -y mongodb-org

## Serviço Mongod


### Iniciando o serviço


sudo service mongod start

### Parando o serviço


sudo service mongod stop

### Reiniciando o serviço


sudo service mongod restart

## Iniciando o do Banco de dados

Para conectar ao banco de dados e iniciar o terminal JavaScript do MongoDB, execute o seguinte comando:

mongo
Por padrão, o mongo escuta o banco de dados em 
localhost na porta 27017. Para conectar e uma interfa e porta diferente, use as opções 
--port e 
--host.

**Fonte traduzida e adaptada:**
 
[Tutorials Point – MongoDB Enviroment](http://www.tutorialspoint.com/mongodb/mongodb_environment.htm)