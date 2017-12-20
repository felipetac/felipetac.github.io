---
layout: post
title: "#14 - Limitando Registros no MongoDB"
description: Breve explicação de como limitar quantidade de registros no MongoDB.
image: '/assets/img/mongodb.png'
category: 'mongodb'
tags:
- Banco de dados
- MongoDB
- NoSQL
twitter_text: Limitando a quantidade de registros no MongoDB.
introduction: Neste parte do tutorial explico como limitar a quantidade de registros advindos do MongoDB.
---
## O método Limit()

Para limitar os registros no MongoDB, você precisa usar o método **limit()**. Este método aceita um tipo numérico como argumento, o qual é o número de documentos que você deseja ser exibido.

### Sintaxe

A sintaxe básica do método **limit()** é a seguinte:

>db.COLLECTION_NAME.find().limit(NUMBER)

### Exemplo

Considere a coleção  mycol tendo os seguintes dados

{ _id: ObjectId(5983548781331adf45ec5), title: "MongoDB Overview"}
{ _id: ObjectId(5983548781331adf45ec6), title: "NoSQL Overview"}
{ _id: ObjectId(5983548781331adf45ec7), title: "Tutorials Point Overview"}

O exemplo a seguir exibirá somente 2 documentos quando executado a consulta.

>db.mycol.find({},{title: 1, _id: 0}).limit(2)
{title: "MongoDB Overview"}
{title: "NoSQL Overview"}
>

Se não especificar o argumento numérico no método limit() então este exibirá todos os documentos da coleção.

## O método Skip()

Além do método limit() existe mais um método, o **skip()**. Este também aceita um argumento numérico porém é usado para pular a exibição do numero de documentos.

### Sintaxe

A sintaxe básica do método **skip()** é a seguinte:

>db.COLLECTION_NAME.find().limit(NUMBER).skip(NUMBER)

### Exemplo

O exemplo a seguir exibirá somente o segundo documento da coleção.

>db.mycol.find({},{title: 1, _id: 0}).limit(1).skip(1)
{title: "NoSQL Overview"}
>

Obs: O valor padrão no método skip() é 0.

**Fonte traduzida:** [Tutorials Point - MongoDB Limit Records](http://www.tutorialspoint.com/mongodb/mongodb_limit_record.htm)
