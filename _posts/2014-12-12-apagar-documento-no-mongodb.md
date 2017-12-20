---
layout: post
title: "#12 - Apagar Documento no MongoDB"
description: Breve exemplificação de como apagar documentos no MongoDB.
image: '/assets/img/mongodb.png'
category: 'mongodb'
tags:
- Banco de dados
- MongoDB
- NoSQL
twitter_text: Breve exemplificação de como apagar documentos no MongoDB.
introduction: Nesta parte do tutorial explico como remover um documento de uma coleção no MongoDB.
---
## O método remove()

O método **remove()** é usado para remover documento da coleção. Este método aceita dois parâmetros. O primeiro é o critério de exclusão e o segundo é a flag justOne

1. **critério de exclusão:** (Opcional) critérios de exclusão de acordo com documentos serão removidos.

2. **justOne:** (Opcional) se tiver setado como true ou 1, o método removerá apenas um documento.

### Sintaxe

A sintaxe básica do método **remove()** é a seguinte:

>db.COLLECTION_NAME.remove(DELLETION_CRITTERIA)

### Exemplo

Considerando que a coleção mycol tenha os seguintes dados.

{ _id: ObjectId(5983548781331adf45ec5), title: "MongoDB Overview"}
{ _id: ObjectId(5983548781331adf45ec6), title: "NoSQL Overview"}
{ _id: ObjectId(5983548781331adf45ec7), title: "Tutorials Point Overview"}

O exemplo a seguir removerá todos os documentos que tenha como título a string 'MongoDB Overview'

>db.mycol.remove(title: 'MongoDB Overview'})
>db.mycol.find()
{ _id: ObjectId(5983548781331adf45ec6), title: "NoSQL Overview"}
{ _id: ObjectId(5983548781331adf45ec7), title: "Tutorials Point Overview"}
>

## Remover apenas um

Se tiver múltiplos registros que batem com o critério e você deseja deletar somente o primeiro registro encontrado, sete o parâmetro **justOne** dentro do método remove()

>db.COLLECTION_NAME.remove(DELETION_CRITERIA,1)

## Remover todos os documentos

Se você não quiser especificar um crierio de exclusão, o mongodb deletará todos os documentos da coleção. 
**Isto é o equivalente do comando de SQL truncate.**


>db.mycol.remove()
>db.mycol.find()

**Fonte traduzida**
:
[Tutorials Point - MongoDB Delete Document](http://www.tutorialspoint.com/mongodb/mongodb_delete_document.htm)
