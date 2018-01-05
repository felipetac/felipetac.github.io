---
layout: post
title: "#9 - Apagar Coleção no MongoDB"
date: 2014-12-07 12:30:00
description: Rápida exemplificação de como apagar coleções no MongoDB.
image: 'https://res.cloudinary.com/felipetac/image/upload/v1515001827/delete2_p6xdmi.png'
category: 'bd'
tags:
- Banco de dados
- MongoDB
- NoSQL
twitter_text: Rápida exemplificação de como apagar coleções no MongoDB.
introduction: Nesta parte do tutorial expĺico como apagar coleções no MongoDB.
---

## O método ```drop()```

O método MongoDB ```db.collection.drop()``` é usado para apagar uma coleção do banco de dados.

### Sintaxe

A sintaxe básica do comando ```drop()``` será a seguinte

```js
db.COLLECTION_NAME.drop()
```

### Exemplo

Primeiramente, verifique a disponibilidade das coleções dentro do seu banco de dados **mydb**

```js
$ use mydb
switched to db mydb

$ show collections
mycol
mycollection
system.indexes
tutorialspoint
```

Agora, apague a coleção com o nome mycollection

```js
db.mycollection.drop()
true
```

Novamente verifique a lista de coleções no banco de dados

```js
$ show collections
mycol
system.indexes
tutorialspoint
```

O método ```drop()``` retornará *true*, se a coleção selecionada tiver sudo apagada com sucesso caso contrário retornará *false*.

**Fonte Traduzida:** [Tutorials Point - Drop Collection](http://www.tutorialspoint.com/mongodb/mongodb_drop_collection.htm)
