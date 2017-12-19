---
layout: post
title: "#7 - Apagar Coleção no MongoDB"
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

## O método drop()

O método MongoDB db.collection.drop() é usado para apagar uma coleção do banco de dados.

### Sintaxe:

A sintaxe básica do comando **drop()** será a seguinte

db.COLLECTION_NAME.drop()

### Exemplo:

Primeiramente, verifique a disponibilidade das coleções dentro do seu banco de dados **mydb**

>use mydb
switched to db mydb
>show collections
mycol
mycollection
system.indexes
tutorialspoint
>
Agora, apague a coleção com o nome 
mycollection

>db.mycollection.drop()
true
>
Novamente verifique a lista de coleções no banco de dados

>show collections
mycol
system.indexes
tutorialspoint
>
O método 
**drop()** retornará 
true, se a coleção selecionada tiver sudo apagada com sucesso caso contrário retornará 
false.

 


**Fonte Traduzida:**
 
[Tutorials Point - Drop Collection](http://www.tutorialspoint.com/mongodb/mongodb_drop_collection.htm)
