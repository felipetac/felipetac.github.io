---
layout: post
title: Exemplo - SQL vs MongoDB
date: 2015-04-22 12:30:00
description: Rápida exemplificação entre comandos SQL e comandos MongoDB.
image: 'https://res.cloudinary.com/felipetac/image/upload/b_rgb:dedede/v1514993301/sql-database_i0tlr1.png'
category: 'mongodb'
tags:
- Banco de dados
- MongoDB
- NoSQL
twitter_text: Rápida exemplificação entre comandos SQL e comandos MongoDB. 
introduction: Neste artigo exemplifico como seria alguns comandos SQL na linguagem de consulta do MongoDB
---
Supondo que temos uma coleção de usuarios na base mydb do MongoDB, ex:

```js
$ db.usuarios.insert([
    {"nome":"Felipe Toscano", "idade": "29", "sexo":"M", "status":"A"},
    {"nome":"Marcio Azevedo", "idade": "70", "sexo":"M", "status":"P"},
    {"nome":"Gustavo Sampaio", "idade": "80", "sexo":"M", "status":"F"},
    {"nome":"Marina Azevedo", "idade": "18", "sexo":"F", "status":"A"},
    {"nome":"Carlos Silva", "idade": "22", "sexo":"M", "status":"A"},
    {"nome":"Ronaldo Portela", "idade": "31", "sexo":"M", "status":"P"},
    {"nome":"Fabiana Santos", "idade": "70", "sexo":"F", "status":"P"},
    {"nome":"Rosi Campos", "idade": "40", "sexo":"F", "status":"A"},
    {"nome":"Fabio Pacheco", "idade": "45", "sexo":"M", "status":"A"},
    {"nome":"Marlene Tavares", "idade": "55", "sexo":"F", "status":"F"}
])
```

Agora vamos para algumas comparações:

- Insert:

```sql
INSERT INTO usuarios(nome, idade, sexo, status, cidade)
VALUES ("Adriano Tavares", 34, "M", "D", "Recife")
```
```js
db.usuarios.insert(
   { nome: "Adriano Tavares", age: 34, sexo: "M", status: "D", cidade: "Recife" }
)
```

- Select:

```sql
SELECT * FROM usuarios
```
```js
db.usuarios.find()
```
<br />

```sql
SELECT id, nome, status FROM usuarios
```
```js
db.usuarios.find(
    { },
    { nome: 1, status: 1 }
)
```

<br />
 

```sql
SELECT nome, sexo, status FROM usuarios
```

```js
db.usuarios.find(
    { },
    { nome: 1, sexo: 1, status: 1, _id: 0 }
)
```

<br />


```sql
SELECT * FROM usuarios WHERE status = "A"
```

```js
db.usuarios.find(
    { status: "A" }
)
```

<br />
 

```sql
SELECT nome, status FROM usuarios WHERE status = "A"
```

```js
db.usuarios.find(
    { status: "A" },
    { nome: 1, status: 1, _id: 0 }
)
```

<br />

```sql
SELECT * FROM usuarios WHERE status != "A"
```

```js
db.usuarios.find(
    { status: { $ne: "A" } }
)
```

<br />
 

```sql
SELECT * FROM usuarios WHERE status = "A" AND idade = 50
```

```js
db.usuarios.find(
    { status: "A",
      idade: 50 }
)
```

<br />

```sql
SELECT * FROM usuarios WHERE status = "A" OR idade = 50
```

```js
db.usuarios.find(
    { $or: [ { status: "A" } ,
             { idade: 50 } ] }
)
```

<br />


```sql
SELECT * FROM usuarios WHERE idade > 25
```

```js
db.idade.find(
    { idade: { $gt: 25 } }
)
```

<br />
 

```sql
SELECT * FROM usuarios WHERE idade < 25
```
```js
db.usuarios.find(
   { idade: { $lt: 25 } }
)
```

<br />
 

```sql
SELECT * FROM usuarios WHERE idade > 25 AND idade <= 50
```

```js
db.usuarios.find(
   { idade: { $gt: 25, $lte: 50 } }
)
```

<br />
 

```sql
SELECT * FROM usuarios WHERE nome like "%Sa%"
```
```js
db.usuarios.find( { nome: /Sa/ } )
```

<br />
 

```sql
SELECT * FROM usuarios WHERE nome like "Ro%"
```

```js
db.usuarios.find( { nome: /^Ro/ } )
```

<br />
 

```sql
SELECT * FROM usuarios WHERE status = "A" ORDER BY nome ASC
```

```js
db.usuarios.find( { status: "A" } ).sort( { nome: 1 } )
```

<br />
 

```sql
SELECT * FROM usuarios WHERE status = "A" ORDER BY nome DESC
```

```js
db.usuarios.find( { status: "A" } ).sort( { nome: -1 } )
```

<br />

 
```sql
SELECT COUNT(*) FROM usuarios
```
```js
db.usuarios.count()

//or

db.usuarios.find().count()
```

<br />

 
```sql
SELECT COUNT(cidade) FROM usuarios
```

```js
db.usuarios.count( { cidade: { $exists: true } } )

//or

db.usuarios.find( { cidade: { $exists: true } } ).count()
```

<br />


```sql
SELECT COUNT(*) FROM usuarios WHERE idade > 30
```
```js
db.usuarios.count( { idade: { $gt: 30 } } )

//or

db.usuarios.find( { idade: { $gt: 30 } } ).count()
```

<br />
 

```sql
SELECT DISTINCT(status) FROM usuarios
```
```js
db.usuarios.distinct( "status" )
```

<br />
 

```sql
SELECT * FROM usuarios LIMIT 1
```
```js
db.usuarios.findOne()

//or

db.usuarios.find().limit(1)
```

<br />
 

```sql
SELECT * FROM usuarios LIMIT 5 SKIP 10
```

```js
db.usuarios.find().limit(5).skip(10)
```

<br />

```sql
EXPLAIN SELECT * FROM usuarios WHERE status = "A"
```

```js
db.usuarios.find( { status: "A" } ).explain()
```

- Update

```sql
UPDATE usuarios SET status = "C" WHERE idade > 25
```

```js
db.usuarios.update(
   { idade: { $gt: 25 } },
   { $set: { status: "C" } },
   { multi: true }
)
```

<br />


```sql
UPDATE usuarios SET age = age + 3 WHERE status = "A"
```

```js
db.usuarios.update(
   { status: "A" } ,
   { $inc: { idade: 3 } },
   { multi: true }
)
```

- Delete

```sql
DELETE FROM usuarios WHERE status = "D"
```

```js
db.usuarios.remove( { status: "D" } )
```

<br />


```sql
DELETE FROM usuarios
```

```js
db.usuarios.remove({})
```

Podemos ver que a linguagem de consulta do MongoDB não tem muito segredo. Ela é de fácil compreensão. Quer saber mais? Acesse: 
[http://docs.mongodb.org/manual/crud/](http://docs.mongodb.org/manual/crud/)

Bom... é isso! Até a próxima pessoal! :)
