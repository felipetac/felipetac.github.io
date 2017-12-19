---
layout: post
title: "#6 - Criar Coleção no MongoDB"
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

## O método createCollection()

O método MongoDB 
db.createCollection(name, options) é usado para criar uma coleção.

### Sintaxe:

A sintaxe básica do comando 
**createCollection()**
 é a seguinte

db.createCollection(name, options)
Neste comando, 
name é o nome da coleção a ser criada. 
Options é um documento e é usado para especificar a configuração da coleção

Parametro

Tipo

Descrição

Name

String

Nome da coleção a ser criada

<Options>

Document

(Opcional) Especifica as opções sobre o tamanho da memória e indexação
Segue a lista de opções que você pode usar:

Campo

Tipo

Descrição

capped

Boolean

(Opcional) Se verdadeiro(true), habilita o

autoIndexID

Boolean

(Opcional) Se verdadeiro(true), automaticamente criará um índice para o campo _id. Valor padrão é falso.

size

number

(Opcional) Especifica um tamanho maximo em bytes para o capped collection. 
Se o capped for verdadeiro, então é necessário também especificar este campo.

max

number

(Opcional) Especifica o número máximo de documentos permitidos no 
.
Quando se vai inserir um documento, o MongoDB verifica primeiro campo de tamanho da 
, e então verifica o campo (max).

###Exemplos:

A sintaxe básica do método 
**createCollection()**
 sem opções será o seguinte

>use test
switched to db test
>db.createCollection("mycollection")
{ ok : 1 }
>
Você pode verificar a coleção criada por meio do uso do comando 
**show collections**


>show collections
mycollection
system.indexes
O exemplo a seguir mostra a sintaxe do método 
**createCollection()**
 com algumas importantes opções:

>db.createCollection("mycol", { capped: true, autoIndexID : true, size: 6142800, max: 10000 })
{"ok": 1}
>
No mongoDB você não precisa criar a coleção. MongoDB cria a coleção automaticamente quando você insere algum documento.

>db.tutorialspoint.insert({name: "tutorialspoint"})
>show collections
mycol
mycollection
system.indexes
tutorialspoint
>
 


**Fonte traduzida:**
 
[Tutorials Point - MongoDB Create Collection](http://www.tutorialspoint.com/mongodb/mongodb_create_collection.htm)
