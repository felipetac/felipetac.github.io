---
layout: post
title: "#11 - Inserir Documento no MongoDB"
date: 2014-12-09 12:30:00
description: Rápida exemplificação de como inserir dados em uma coleção no MongoDB.
image: 'https://res.cloudinary.com/felipetac/image/upload/v1515004137/write_data_lhjmxh.png'
category: 'bd'
tags:
- Banco de dados
- MongoDB
- NoSQL
twitter_text: Rápida exemplificação de como inserir dados em uma coleção no MongoDB.
introduction: Nesta parte do tutorial explico como inserir dados em uma coleção no MongoDB.
---

## O método ```insert()```

Para inserir um dado dentro de uma coleção no MongoDB, você precisa usar métodos ```insert()``` ou ```save()```.

### Sintaxe

A sintaxe básica do comando ```insert()``` é a seguinte:

```js
db.COLLECTION_NAME.insert(document)
```

### Exemplo

```js
$ db.mycol.insert({
  _id: ObjectId(7df78ad8902c),
  title: 'MongoDB Overview',
  description: 'MongoDB is no sql database',
  by: 'tutorials point',
  url: 'http://www.tutorialspoint.com',
  tags: ['mongodb', 'database', 'NoSQL'],
  likes: 100
})
```

Neste ponto o *mycol* é a nosso nome de coleção, ele foi criado no tutorial anterior. Se a coleção não existir no banco de dados, então o MongoDB criará esta coleção e então inserirá o documento dentro dela.

No documento inserido se nós não tivermos especificado o parâmetro *_id*, o MongoDB criará uma assinatura única do objeto(*ObjectId*) para este documento. *_id* é um número hexadecimal único de 12 bytes para todos os documentos em uma coleção. Este 12 bytes são divididos da seguinte forma:

*_id*: ObjectId(4 bytes timestamp, 3 bytes machine id, 2 bytes process id, 3 bytes incrementer)

Para inserir múltiplos documentos em uma única query , você pode passar um array de documentos dentro do comando ```insert()```.

### Exemplo

```js
$ db.post.insert([
{
  title: 'MongoDB Overview',
  description: 'MongoDB is no sql database',
  by: 'tutorials point',
  url: 'http://www.tutorialspoint.com',
  tags: ['mongodb', 'database', 'NoSQL'],
  likes: 100
},
{
  title: 'NoSQL Database',
  description: 'NoSQL database doesn't have tables',
  by: 'tutorials point',
  url: 'http://www.tutorialspoint.com',
  tags: ['mongodb', 'database', 'NoSQL'],
  likes: 20,
  comments: [
  {
    user: 'user1',
    message: 'My first comment',
    dateCreated: new Date(2013,11,10,2,35),
    like: 0
  }]
}
])
```

Para inserir o documento você também pode usar o ```db.post.save(document)```. Se você não especificar o *_id* dentro do documento, o método ```save()``` trabalhará da mesma forma do método ```insert()```. Se você especificar o *_id*, ele substituirá os dados do documento que contêm o *_id* especificado no método ```save()```.

**Fonte traduzida:** [Tutorials Point - MongoDB Insert Document](http://www.tutorialspoint.com/mongodb/mongodb_insert_document.htm)
