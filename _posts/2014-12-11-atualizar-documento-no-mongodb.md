---
layout: post
title: "#13 - Atualizar Documento no MongoDB"
description: Breve exemplificação de como alterar um documento no MongoDB.
image: '/assets/img/mongodb.png'
category: 'mongodb'
tags:
- Banco de dados
- MongoDB
- NoSQL
twitter_text: Breve exemplificação de como alterar um documento no MongoDB.
introduction: Nesta parte do tutorial explico como atualizar documentos dentro de uma coleção no MongoDB.
---
Os métodos ```update()``` e ```save()``` são usados para atualizar documentos dentro da coleção. O método ```update()``` atualiza valores em um documento existente, enquanto o método ```save()``` substitui o documento existente em si pelo documento passado dentro do método dele.

## O método ```Update()```

O método ```update()``` atualiza valores dentro de um documento existente.

### Sintaxe

A sintaxe básica do método ```update()``` é a seguinte:

```js
db.COLLECTION_NAME.update(SELECTIOIN_CRITERIA, UPDATED_DATA)
```

### Exemplo

Considerando a coleção *mycol* tem os seguintes dados.

```js
{ _id: ObjectId(5983548781331adf45ec5), title: "MongoDB Overview"}
{ _id: ObjectId(5983548781331adf45ec6), title: "NoSQL Overview"}
{ _id: ObjectId(5983548781331adf45ec7), title: "Tutorials Point Overview"}
```

Dando seguimento ao exemplo, setaremos o novo valor 'New MongoDB Tutorial' no documento o qual seu título é 'MongoDB Overview'

```js
$ db.mycol.update({title: 'MongoDB Overview'},{$set:{title: 'New MongoDB Tutorial'}})

$ db.mycol.find()
{ _id: ObjectId(5983548781331adf45ec5), title: "New MongoDB Tutorial"}
{ _id: ObjectId(5983548781331adf45ec6), title: "NoSQL Overview"}
{ _id: ObjectId(5983548781331adf45ec7), title: "Tutorials Point Overview"}
```

Por padrão, o mongodb atualizará somente o primeiro documento que bate com o critério de busca. Para atualizar todos os documentos que batem com o critério de consulta, sete o parâmetro *'multi'* como *true*.

```js
$ db.mycol.update({title: 'MongoDB Overview'},{$set:{title: 'New MongoDB Tutorial'}},{multi:true})
```
## O método ```Save()```

O método substitui o documento existente por um novo documento passado dentro do método ```save()```

### Sintaxe

A sintaxe básica do método ```save()``` é exibida a seguir:

```js
db.COLLECTION_NAME.save({_id:ObjectId(),NEW_DATA})
```

### Exemplo

O exemplo a seguir irá substituirá o documento com o _id '5983548781331adf45ec7'

```js
$ db.mycol.save({_id: ObjectId(5983548781331adf45ec7), title: "Tutorials Point New Topic", by: "Tutorials Point"})

$ db.mycol.find()
{ _id: ObjectId(5983548781331adf45ec5), title: "New MongoDB Tutorial"}
{ _id: ObjectId(5983548781331adf45ec6), title: "NoSQL Overview"}
{ _id: ObjectId(5983548781331adf45ec7), title: "Tutorials Point New Topic", by: "Tutorials Point"}
```

**Fonte traduzida:** [Tutorials Point - MongoDB Update Document](w.tutorialspoint.com/mongodb/mongodb_update_document.htm)
