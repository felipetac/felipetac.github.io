---
layout: post
title: "#3 - Instalação MongoDB no Ubuntu"
date: 2014-12-01 12:30:00
description: Processo de instalação do MongoDB no Ubuntu.
image: 'https://res.cloudinary.com/felipetac/image/upload/c_crop,h_315,w_600,x_0,y_80/v1514992059/install2_okjvxy.jpg'
category: 'bd'
tags:
- Banco de dados
- MongoDB
- NoSQL
twitter_text: Processo de instalação do MongoDB no Ubuntu.
introduction: Nesta parte do tutorial explico como instalar o MongoDB no Ubuntu Linux.
---

> **Atualizado (15/02/2018):** A forma de instalação mudou. Segue a forma do prórpio portal do MongoDB para instalação no Ubuntu 16.04.

## Importe a chave pública usada pelo gerenciador de pacote do sistema operacional

As ferramentas de gerenciamento de pacotes (dpkg e apt) precisa garantir a consistência e autenticidade por meio da requisição desta assinatura do pacote com chaves GPG. Use do seguinte comando para importar a chave pública do MongoDB:

```bash
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 2930ADAE8CAF5059EE73BB4B58712A2291FA4AD5
```
## Crie uma lista de repositórios

Crie a lista de repositórios em **_/etc/apt/sources.list.d/mongodb-org-3.6.list_** com o seguinte comando:

```bash
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/3.6 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.6.list
```

## Recarregue a base de dados de pacotes

Execute o seguinte comando para recarregar o banco de dados do pacote:

```bash
sudo apt-get update
```

## Instale a versão mais estável do MongoDB

```bash
sudo apt-get install -y mongodb-org
```

## Serviço Mongod


### Iniciando o serviço

```bash
sudo service mongod start
```

### Parando o serviço

```bash
sudo service mongod stop
```

### Reiniciando o serviço

```bash
sudo service mongod restart
```

## Iniciando o do Banco de dados

Para conectar ao banco de dados e iniciar o terminal JavaScript do MongoDB, execute o seguinte comando:

```bash
mongo --host 127.0.0.1:27017
```
