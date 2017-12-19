---
layout: post
title: "#5 - Apagar Banco de Dados no MongoDB"
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

## O método dropDatabase()

O comando MongoDB db.dropDatabase() é usado para apagar um banco de dados existente.

### Sintaxe

A sintaxe básica de declaração dropDatabase() é a seguinte:

db.dropDatabase()

Como isso apagará o banco de dados selecionado. Se não tiver selecionado nenhum banco de dados, o mongo apagará o banco de dados padrão (test).

### Exemplo

Primeiramente, verifique a lista de banco de dados disponíveis usando o comando show dbs

>show dbs
local      0.78125GB
mydb       0.23012GB
test       0.23012GB
>

Se você deseja apagar o novo banco de dados <mydb>, então o comando dropDatabase() será o seguinte:

>use mydb
switched to db mydb
>db.dropDatabase()
>{ "dropped" : "mydb", "ok" : 1 }
>

Agora verifique a lista de banco de dados

>show dbs
local      0.78125GB
test       0.23012GB
>

**Fonte traduzida:** [Tutorials Point - MongoDB Drop Database](http://www.tutorialspoint.com/mongodb/mongodb_drop_database.htm)
