---
layout: post
title: Exemplo - SQL vs MongoDB
description: Rápida exemplificação entre comandos SQL e comandos MongoDB.
image: '/assets/img/mongodb.png'
category: 'mongodb'
tags:
- Banco de dados
- MongoDB
- NoSQL
twitter_text: Rápida exemplificação entre comandos SQL e comandos MongoDB. 
introduction: Nesta postagem exemplifico como seria alguns comandos SQL na linguagem de consulta do MongoDB
---
Supondo que temos uma coleção de usuarios na base mydb do MongoDB, ex:

db.usuarios.insert([
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

Agora vamos para algumas comparações:

- Insert:

INSERT INTO usuarios(nome, idade, sexo, status, cidade)
VALUES ("Adriano Tavares", 34, "M", "D", "Recife")

db.usuarios.insert(
   { nome: "Adriano Tavares", age: 34, sexo: "M", status: "D", cidade: "Recife" }
)

- Select:

SELECT * FROM usuarios

db.usuarios.find()


SELECT id, nome, status FROM usuarios

db.usuarios.find(
    { },
    { nome: 1, status: 1 }
)
 

SELECT nome, sexo, status FROM usuarios

db.usuarios.find(
    { },
    { nome: 1, sexo: 1, status: 1, _id: 0 }
)
 

SELECT * FROM usuarios WHERE status = "A"

db.usuarios.find(
    { status: "A" }
)
 

SELECT nome, status FROM usuarios WHERE status = "A"

db.usuarios.find(
    { status: "A" },
    { nome: 1, status: 1, _id: 0 }
)
 

SELECT * FROM usuarios WHERE status != "A"

db.usuarios.find(
    { status: { $ne: "A" } }
)
 

SELECT * FROM usuarios WHERE status = "A" AND idade = 50

db.usuarios.find(
    { status: "A",
      idade: 50 }
)
 

SELECT * FROM usuarios WHERE status = "A" OR idade = 50

db.usuarios.find(
    { $or: [ { status: "A" } ,
             { idade: 50 } ] }
)
 

SELECT * FROM usuarios WHERE idade > 25

db.idade.find(
    { idade: { $gt: 25 } }
)
 

SELECT * FROM usuarios WHERE idade < 25

db.usuarios.find(
   { idade: { $lt: 25 } }
)
 

SELECT * FROM usuarios WHERE idade > 25 AND idade <= 50

db.usuarios.find(
   { idade: { $gt: 25, $lte: 50 } }
)
 

SELECT * FROM usuarios WHERE nome like "%Sa%"

db.usuarios.find( { nome: /Sa/ } )
 

SELECT * FROM usuarios WHERE nome like "Ro%"

db.usuarios.find( { nome: /^Ro/ } )
 

SELECT * FROM usuarios WHERE status = "A" ORDER BY nome ASC

db.usuarios.find( { status: "A" } ).sort( { nome: 1 } )
 

SELECT * FROM usuarios WHERE status = "A" ORDER BY nome DESC

db.usuarios.find( { status: "A" } ).sort( { nome: -1 } )
 

SELECT COUNT(*) FROM usuarios

db.usuarios.count()

//or

db.usuarios.find().count()
 

SELECT COUNT(cidade) FROM usuarios

db.usuarios.count( { cidade: { $exists: true } } )

//or

db.usuarios.find( { cidade: { $exists: true } } ).count()
 

SELECT COUNT(*) FROM usuarios WHERE idade > 30

db.usuarios.count( { idade: { $gt: 30 } } )

//or

db.usuarios.find( { idade: { $gt: 30 } } ).count()
 

SELECT DISTINCT(status) FROM usuarios

db.usuarios.distinct( "status" )
 

SELECT * FROM usuarios LIMIT 1

db.usuarios.findOne()

//or

db.usuarios.find().limit(1)
 

SELECT * FROM usuarios LIMIT 5 SKIP 10

db.usuarios.find().limit(5).skip(10)
 

EXPLAIN SELECT * FROM usuarios WHERE status = "A"

db.usuarios.find( { status: "A" } ).explain()
 

- Update

UPDATE usuarios SET status = "C" WHERE idade > 25

db.usuarios.update(
   { idade: { $gt: 25 } },
   { $set: { status: "C" } },
   { multi: true }
)
 

UPDATE usuarios SET age = age + 3 WHERE status = "A"

db.usuarios.update(
   { status: "A" } ,
   { $inc: { idade: 3 } },
   { multi: true }
)
 

- Delete

DELETE FROM usuarios WHERE status = "D"

db.usuarios.remove( { status: "D" } )
 

DELETE FROM usuarios

db.usuarios.remove({})
 

Podemos ver que a linguagem de consulta do MongoDB não tem muito segredo. Ela é de fácil compreensão. Quer saber mais? Acesse: 
[http://docs.mongodb.org/manual/crud/](http://docs.mongodb.org/manual/crud/)

 

Bom... é isso! Até a próxima pessoal! :)
