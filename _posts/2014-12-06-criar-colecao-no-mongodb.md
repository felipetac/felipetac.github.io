---
layout: post
title: "#6 - Criar Coleção no MongoDB"
description: Rápida exemplificação de como criar coleções no MongoDB.
image: '/assets/img/mongodb.png'
category: 'mongodb'
tags:
- Banco de dados
- MongoDB
- NoSQL
twitter_text: Rápida exemplificação de como criar coleções no MongoDB.
introduction: Nesta parte do tutorial explico como criar coleções no MongoDB.
---

## O método ```createCollection()```

O método MongoDB ```db.createCollection(name, options)``` é usado para criar uma coleção.

### Sintaxe

A sintaxe básica do comando ```createCollection()``` é a seguinte:

```js
db.createCollection(name, options)
```

Neste comando, Name é o nome da coleção a ser criada. Options é um documento e é usado para especificar a configuração da coleção

<table>
<tbody>
<tr>
<th>Parametro</th>
<th>Tipo</th>
<th>Descrição</th>
</tr>
<tr>
<td>Name</td>
<td>String</td>
<td>Nome da coleção a ser criada</td>
</tr>
<tr>
<td>&lt;Options&gt;</td>
<td>Document</td>
<td>(Opcional) Especifica as opções sobre o tamanho da memória e indexação</td>
</tr>
</tbody>
</table>

Segue a lista de opções que você pode usar:

<table>
<tbody>
<tr>
<th>Campo</th>
<th>Tipo</th>
<th>Descrição</th>
</tr>
<tr>
<td>capped</td>
<td>Boolean</td>
<td>(Opcional) Se verdadeiro(true), habilita o <i>capped collection é uma coleção de tamanho fixo estabelecido, o qual sobrescreve as entradas mais antigas quando se é atingido o tamanho máximo. </i><i><b>Se você especificar verdadeiro, você também precisa especificar tamanho como parâmetro.</b></i></td>
</tr>
<tr>
<td>autoIndexID</td>
<td>Boolean</td>
<td>(Opcional) Se verdadeiro(true), automaticamente criará um índice para o campo _id. Valor padrão é falso.</td>
</tr>
<tr>
<td>size</td>
<td>number</td>
<td>(Opcional) Especifica um tamanho maximo em bytes para o capped collection. <b>Se o capped for verdadeiro, então é necessário também especificar este campo.</b></td>
</tr>
<tr>
<td>max</td>
<td>number</td>
<td>(Opcional) Especifica o número máximo de documentos permitidos no <i>capped collection</i>.</td>
</tr>
</tbody>
</table>

Quando se vai inserir um documento, o MongoDB verifica primeiro campo de tamanho da capped collection, e então verifica o campo (max).

### Exemplos

A sintaxe básica do método ```createCollection()``` sem opções será o seguinte:

```js
$ use test
switched to db test

$ db.createCollection("mycollection")
{ ok : 1 }
```

Você pode verificar a coleção criada por meio do uso do comando ```show collections```

```js
$ show collections
mycollection
system.indexes
```

O exemplo a seguir mostra a sintaxe do método ```createCollection()``` com algumas importantes opções:

```js
$ db.createCollection("mycol", { capped: true, autoIndexID : true, size: 6142800, max: 10000 })
{"ok": 1}
```

No mongoDB você não precisa criar a coleção. MongoDB cria a coleção automaticamente quando você insere algum documento.

```js
$ db.tutorialspoint.insert({name: "tutorialspoint"})

$ show collections
mycol
mycollection
system.indexes
tutorialspoint
```

**Fonte traduzida:** [Tutorials Point - MongoDB Create Collection](http://www.tutorialspoint.com/mongodb/mongodb_create_collection.htm)
