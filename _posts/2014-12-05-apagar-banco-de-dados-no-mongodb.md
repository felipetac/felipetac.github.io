---
layout: post
title: "#7 - Apagar Banco de Dados no MongoDB"
description: Apagando um banco dados no MongoDB.
image: 'https://res.cloudinary.com/felipetac/image/upload/v1515001629/macbook-delete_kpd2zw.png'
category: 'mongodb'
tags:
- Banco de dados
- MongoDB
- NoSQL
twitter_text: Apagando um banco dados no MongoDB.
introduction: Nesta parte do tutorial explico como apagar um banco de dados no MongoDB.
---

## O método ```dropDatabase()```

O comando MongoDB ```db.dropDatabase()``` é usado para apagar um banco de dados existente.

### Sintaxe

A sintaxe básica de declaração ```dropDatabase()``` é a seguinte:

```js
db.dropDatabase()
```

Como isso apagará o banco de dados selecionado. Se não tiver selecionado nenhum banco de dados, o mongo apagará o banco de dados padrão (test).

### Exemplo

Primeiramente, verifique a lista de banco de dados disponíveis usando o comando show dbs

```bash
$ show dbs
local      0.78125GB
mydb       0.23012GB
test       0.23012GB
```

Se você deseja apagar o novo banco de dados <mydb>, então o comando ```dropDatabase()``` será o seguinte:

```js
$ use mydb
switched to db mydb

$ db.dropDatabase()
{ "dropped" : "mydb", "ok" : 1 }
```

Agora verifique a lista de banco de dados

```bash
$ show dbs
local      0.78125GB
test       0.23012GB
```

**Fonte traduzida:** [Tutorials Point - MongoDB Drop Database](http://www.tutorialspoint.com/mongodb/mongodb_drop_database.htm)
