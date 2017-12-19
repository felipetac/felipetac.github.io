---
layout: post
title: "#17 - Agregação Básica no MongoDB"
description: Breve explicação sobre agregações no MongoDB.
image: '/assets/img/mongodb.png'
category: 'mongodb'
tags:
- Banco de dados
- MongoDB
- NoSQL
twitter_text: Breve explicação sobre agregações no MongoDB.
introduction: Neste tutorial explico brevemente o uso de agregações no MongoDB.
---
Operações de agregações processam os dados registrados e retornam um resultado agregado. Agregações agrupam valores vindos de múltiplos documentos reunidos, e podem estabelecer uma variedade de operações sobre esta agrupação de dados para retornar um resultado único. O sql **count(*)** e **group by** são equivalentes a uma agregação no MongoDB.

## O método aggregate()

Para agregar valores do MongoDB você precisa usar o método aggregate().

### Syntax

A sintaxe básica do método aggregate() é a seguinte:

>db.COLLECTION_NAME.aggregate(AGGREGATE_OPERATION)

### Exemplo

Suponha que dentro da coleção **mycol** você tem os seguintes dados:

{
  _id: ObjectId(7df78ad8902c)
  title: 'MongoDB Overview',
  description: 'MongoDB is no sql database',
  by_user: 'tutorials point',
  url: 'http://www.tutorialspoint.com',
  tags: ['mongodb', 'database', 'NoSQL'],
  likes: 100
},
{
  _id: ObjectId(7df78ad8902d)
  title: 'NoSQL Overview',
  description: 'No sql database is very fast',
  by_user: 'tutorials point',
  url: 'http://www.tutorialspoint.com',
  tags: ['mongodb', 'database', 'NoSQL'],
  likes: 10
},
{
  _id: ObjectId(7df78ad8902e)
  title: 'Neo4j Overview',
  description: 'Neo4j is no sql database',
  by_user: 'Neo4j',
  url: 'http://www.neo4j.com',
  tags: ['neo4j', 'database', 'NoSQL'],
  likes: 750
},

Dada a coleção acima se você quiser exibir uma lista de quantos tutoriais são escritos por cada usuário, então você usará o método aggregate() mostrado a seguir:

> db.mycol.aggregate([{$group: {_id: "$by_user", num_tutorial: {$sum: 1}}}])

{
  result: [
    {
      _id: "tutorials point",
      num_tutorial: 2
    },
    {
      _id: "Neo4j",
      num_tutorial: 1
    }
  ],
  ok: 1
}

A consulta SQL equivalente para o caso de uso acima deverá ser **select by_user, count(*) from mycol group by by_user**

No exemplo acima temos um agrupamento de documentos por meio do campo by_user e sobre cada ocorrência deste campo um valor prévio de soma é incrementado.

Esta é a lista de expressões de agregações disponíveis.

Expressão

Descrição

Exemplo

$sum

Soma o valor definido a partir de todos os documentos da coleção.

db.mycol.aggregate([{$group:{_id : "$by_user", num_tutorial : {$sum : "$likes"}}}])

$avg

Calcula a média de todos os valores dados de todos os documentos da coleção.

db.mycol.aggregate([{$group:{_id : "$by_user", num_tutorial : {$avg : "$likes"}}}])

$min

Obtém o mínimo dos valores correspondentes de todos os documentos da coleção.

db.mycol.aggregate([{$group:{_id : "$by_user", num_tutorial : {$min : "$likes"}}}])

$max

Obtém o máximo dos valores correspondentes de todos os documentos da coleção.

db.mycol.aggregate([{$group:{_id : "$by_user", num_tutorial : {$max : "$likes"}}}])

$push

Insere o valor para um array no documento resultante.

db.mycol.aggregate([{$group:{_id : "$by_user", url : {$push: "$url"}}}])

$addToSet

Insere o valor para um array no documento resultante mas não faz criações duplicadas.

db.mycol.aggregate([{$group:{_id : "$by_user", url : {$addToSet : "$url"}}}])

$first

Obtém o primeiro documento vindo de conjunto de documentos da agregação. Tipicamente isto só faz sentido quando vem junto de aplicação prévia de alguma ordenação “$sort”.

db.mycol.aggregate([{$group:{_id : "$by_user", first_url : {$first : "$url"}}}])

$last

Obtém o último documento vindo de conjunto de documentos da agregação. Tipicamente isto só faz sentido quando vem junto de aplicação prévia de alguma ordenação “$sort”.

db.mycol.aggregate([{$group:{_id : "$by_user", last_url : {$last : "$url"}}}])

**Fonte Traduzida:** [Tutorials Point – MongoDB Agregation](http://www.tutorialspoint.com/mongodb/mongodb_aggregation.htm)
