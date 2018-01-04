---
layout: post
title: "#12 - Consultar Documento no MongoDB"
date: 2014-12-10 12:30:00
description: Rápida exemplificação de como efetuar consultas no MongoDB.
image: 'https://res.cloudinary.com/felipetac/image/upload/v1515003384/search_k06jv2.png'
category: 'mongodb'
tags:
- Banco de dados
- MongoDB
- NoSQL
twitter_text: Rápida exemplificação de como efetuar consultas no MongoDB.
introduction: Nesta parte do tutorial explico como efetuar consultas nas coleções no MongoDB.
---
## O método ```find()```

Para consultar dados nas coleções do MongoDB, você precisa usar método ```find()```.

### Sintaxe

Sintaxe básica do método ```find()``` é a seguinte:

```js
db.COLLECTION_NAME.find()
```

o método **find()** exibirá todos os documentos de um modo não estruturado.

## O método ```pretty()```

Para exibir os resultados de um modo formatado, você pode usar o método ```pretty()```.

### Sintaxe

```js
db.mycol.find().pretty()
```

### Exemplo

```js
$ db.mycol.find().pretty()
{
   _id: ObjectId(7df78ad8902c),
   title: "MongoDB Overview",
   description: "MongoDB is no sql database",
   by: "tutorials point",
   url: "http://www.tutorialspoint.com",
   tags: ["mongodb", "database", "NoSQL"],
   likes: 100
}
```

Além do método ```find()``` há também o método ```findOne()```, que retorna apenas o primeiro resultado da consulta.

## Cláusulas Where de RDBMS equivalentes no MongoDB

Para consultar o documento com base em alguma condição, você pode usar seguintes operações

<table>
<tbody>
<tr>
<th>Operação</th>
<th>Sintaxe</th>
<th>Exemplo&gt;</th>
<th>RDBMS Equivalente</th>
</tr>
<tr>
<td>Igualdade</td>
<td>{&lt;key&gt;:&lt;value&gt;}</td>
<td>db.mycol.find({“by”:”tutorials point”}).pretty()</td>
<td>where by = ‘tutorials point’</td>
</tr>
<tr>
<td>Menor que</td>
<td>{&lt;key&gt;:{$lt:&lt;value&gt;}}</td>
<td>db.mycol.find({“likes”:{$lt:50}}).pretty()</td>
<td>where likes &lt; 50</td>
</tr>
<tr>
<td>Menor ou igual que</td>
<td>{&lt;key&gt;:{$lte:&lt;value&gt;}}</td>
<td>db.mycol.find({“likes”:{$lte:50}}).pretty()</td>
<td>where likes &lt;= 50</td>
</tr>
<tr>
<td>Maior que</td>
<td>{&lt;key&gt;:{$gt:&lt;value&gt;}}</td>
<td>db.mycol.find({“likes”:{$gt:50}}).pretty()</td>
<td>where likes &gt; 50</td>
</tr>
<tr>
<td>Maior ou igual que</td>
<td>{&lt;key&gt;:{$gte:&lt;value&gt;}}</td>
<td>db.mycol.find({“likes”:{$gte:50}}).pretty()</td>
<td>where likes &gt;= 50</td>
</tr>
<tr>
<td>Diferente</td>
<td>{&lt;key&gt;:{$ne:&lt;value&gt;}}</td>
<td>db.mycol.find({“likes”:{$ne:50}}).pretty()</td>
<td>where likes != 50</td>
</tr>
</tbody>
</table>

## AND no MongoDB


### Sintaxe

Dentro do método ```find()``` se você passar múltiplas chaves separados por ',' o MongoDB trata isso como uma condição de **_AND_**. Sintaxe básica de **_AND_** é exibida a seguir:

```js
db.mycol.find({key1:value1, key2:value2}).pretty()
```

### Exemplo

No exemplo a seguir mostraremos todos os tutoriais escritos por 'tutorials point' e que o título seja 'MongoDB Overview'

```js
$ db.mycol.find({by: "tutorials point", title: "MongoDB Overview"}).pretty()
{
   _id: ObjectId(7df78ad8902c),
   title: "MongoDB Overview",
   description: "MongoDB is no sql database",
   by: "tutorials point",
   url: "http://www.tutorialspoint.com",
   tags: ["mongodb", "database", "NoSQL"],
   likes: 100
}
```

Para o exemplo dado acima a clausa where equivalente será "**where by='tutorials point' AND title='MongoDB Overview' "**. Você pode passar qualquer número de pares de chave/valor dentro da cláusula de busca.

## OR no MongoDB

### Sintaxe

Para consultar documentos baseados na condicional **_OR_**, você precisa usar a palavra-chave **$or**. A sintaxe básica de OR é exibida a seguir:

```js
$ db.mycol.find(
   {
      $or: [
             {key1: value1}, {key2:value2}
      ]
   }
).pretty()
```

### Exemplo

O exemplo a seguir mostrará todos os tutoriais escritos por 'tutorials point' ou que possui o título 'MongoDB Overview'

```js
$ db.mycol.find({$or:[{by: "tutorials point"},{title: "MongoDB Overview"}]}).pretty()
{
   _id: ObjectId(7df78ad8902c),
   title: "MongoDB Overview",
   description: "MongoDB is no sql database",
   by: "tutorials point",
   url: "http://www.tutorialspoint.com",
   tags: ["mongodb", "database", "NoSQL"],
   likes: 100
}
```

## Usando AND e OR juntos

### Exemplo

O exemplo a seguir exibirá documentos que tem mais de 100 curtidas(likes) e que o título seja 'MongoDB Overview' ou que tenha sido escrito por 'tutorials point'. A cláusula SQL _WHERE_ equivalente é **'where likes>10 AND (by = 'tutorials point' OR title = 'MongoDB Overview')'**

```js
$ db.mycol.find(likes: {$gt:10}, $or: [{by: "tutorials point"}, {title: "MongoDB Overview"}] }).pretty()
{
   _id: ObjectId(7df78ad8902c),
   title: "MongoDB Overview",
   description: "MongoDB is no sql database",
   by: "tutorials point",
   url: "http://www.tutorialspoint.com",
   tags: ["mongodb", "database", "NoSQL"],
   likes: 100
}
```

**Fonte traduzida:** [Tutorials Point - MongoDB Query Document](http://www.tutorialspoint.com/mongodb/mongodb_query_document.htm)
