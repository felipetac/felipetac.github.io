---
layout: post
title: "#6 - Criar Banco de Dados no MongoDB"
description: Criando banco de dados no MongoDB.
image: 'https://res.cloudinary.com/felipetac/image/upload/v1514991637/mongodb_iqnp0d.png'
category: 'mongodb'
tags:
- Banco de dados
- MongoDB
- NoSQL
twitter_text: Criando banco de dados no MongoDB.
introduction: Nesta parte do tutorial explico como criar um banco de dados no MongoDB.
---
## O comando ```use```

MongoDB use *DATABASE_NAME* é usado para criar banco de dados. O comando criará um novo banco de dados, se ele não existir. Caso ele já exista o MongoDB retornará o banco de dados existente.

### Sintaxe

A sintaxe básica de declaração ```use``` *DATABASE* é a seguinte:

```
use DATABASE_NAME
```

### Exemplo

Se você quiser criar um banco de dados com o nome <mydb>, então a declaração ```use``` *DATABASE* seria a seguinte:

```bash
$ use mydb
switched to db mydb
```

Para verificar se o banco de dados selecionado é o corrente use o comando ```db```

```
$ db
mydb
```

Se você quiser verificar sua lista de banco de dados, então use o comando ```show dbs```.

```
$ show dbs
local     0.78125GB
test      0.23012GB
```

Seu banco de dados criado(mydb) não está presente na lista. Para exibir o banco de dados é necessário ter, pelo menos, um documento inserido dentro dele.

```
$ db.movie.insert({name: "tutorials point"})
$ show dbs
local      0.78125GB
mydb       0.23012GB
test       0.23012GB
```

No MongoDB o banco de dados que vem por padrão é o test. Se você não tiver criado nenhum banco de dados, as coleções que forem criadas serão armazenadas no banco de dados test.

**Fonte traduzida:** [Tutorials Point - MongoDB Create Database](http://www.tutorialspoint.com/mongodb/mongodb_drop_database.htm)
