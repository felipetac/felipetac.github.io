---
layout: post
title: "#15 - Ordenando Registros no MongoDB"
description: Breve explicação de como ordenar registros no MongoDB.
image: '/assets/img/mongodb.png'
category: 'mongodb'
tags:
- Banco de dados
- MongoDB
- NoSQL
twitter_text: Breve explicação de como ordenar registros no MongoDB.
introduction: Nesta parte do tutorial explico como ordenar registros no MongoDB.
---
## O método sort()

Para ordenar documentos no MongoDB, você precisa usar o método **sort()**. Este método aceita um documento contendo uma lista de campos acompanhado do seu valor de ordenação. Para especificar o tipo de ordenação, 1 e -1 são usados. 1 é usado para estabelecer uma ordenação crescente enquanto -1 é usado para estabelecer a ordem decrescente.

### Sintaxe

A sintaxe básica do método sort() é a seguinte:

>db.COLLECTION_NAME.find().sort({KEY:1})

### Exemplo

Considere a coleção mycol tendo os seguintes dados:

{ _id: ObjectId(5983548781331adf45ec5), title: "MongoDB Overview"}
{ _id: ObjectId(5983548781331adf45ec6), title: "NoSQL Overview"}
{ _id: ObjectId(5983548781331adf45ec7), title: "Tutorials Point Overview"}

O exemplo a seguir exibirá os documentos ordenados por título de forma decrescente.

>db.mycol.find({},{title: 1, _id: 0}).sort({title: -1})
{title: "Tutorials Point Overview"}
{title: "NoSQL Overview"}
{title: "MongoDB Overview"}
>

Obs: Se você não tiver especificado a preferência de ordenação, então o método **sort()** exibirá os documentos em ordem crescente.

**Fonte traduzida:** [Tutorials Point - MongoDB Sort Documents](http://www.tutorialspoint.com/mongodb/mongodb_sort_record.htm)
