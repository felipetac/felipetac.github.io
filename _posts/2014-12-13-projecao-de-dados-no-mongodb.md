---
layout: post
title: "#15 - Projeção de Dados no MongoDB"
description: Breve exemplificação de como selecionar dados no MongoDB.
image: 'https://res.cloudinary.com/felipetac/image/upload/v1514998932/projection_py1ngi.png'
category: 'mongodb'
tags:
- Banco de dados
- MongoDB
- NoSQL
twitter_text: Breve exemplificação de como selecionar dados no MongoDB.
introduction: Nesta parte do tutorial explico como selecionar apenas os dados necessários à consulta.
---
Projeção de dados no mongodb significa selecionar apenas os dados necessários ao invés de selecionar todo os dados de um documento. Se um documento tem cinco campos e você precisa mostrar apenas 3, selecione então selecione somente os 3 campos dele.

## O método ```find()```

Como explicado anteriormente no tópico de consultar documentos, o método ```find()``` aceita como segundo parâmetro opcional esta lista de campos a qual você deseja retornar. No MongoDB quando você executa o método ```find()```, este exibe todos os campos de um documento. Para limitar quais os campos que deseja exibir você precisa setar a lista de campos com os valores 1 ou 0. 1 é usado para mostrar o campo enquanto o 0 é usado para esconder o campo.

### Sintaxe

Sintaxe básica para o método ```find()``` com projeção é a seguinte:

```js
db.COLLECTION_NAME.find({},{KEY:1})
```
### Exemplo

Considere que a coleção *mycol* tenha os seguintes dados:

```js
{ _id: ObjectId(5983548781331adf45ec5), title: "MongoDB Overview"}
{ _id: ObjectId(5983548781331adf45ec6), title: "NoSQL Overview"}
{ _id: ObjectId(5983548781331adf45ec7), title: "Tutorials Point Overview"}
```

O exemplo a seguir exibirá o título do documento quando executada a consulta.

```js
$ db.mycol.find({},{title: 1,_id: 0})
{title: "MongoDB Overview"}
{title: "NoSQL Overview"}
{title: "Tutorials Point Overview"}
```

> O campo *_id* é sempre exibido quando executado o método ```find()```, se você não deseja mostrar este campo, então você precisa setar *_id* como 0.

**Fonte traduzida:** [Tutorials Point - MongoDB Projection](http://www.tutorialspoint.com/mongodb/mongodb_projection.htm)
