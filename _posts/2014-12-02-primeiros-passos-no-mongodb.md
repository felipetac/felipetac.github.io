---
layout: post
title: "#4 - Primeiros Passos no MongoDB"
description: Primeiras instruções de como usar o MongoDB.
image: 'https://res.cloudinary.com/felipetac/image/upload/v1514991637/first-steps_woqbil.png'
category: 'mongodb'
tags:
- Banco de dados
- MongoDB
- NoSQL
twitter_text: Primeiras instruções de como usar o MongoDB.
introduction: Primeiras instruções de como usar o MongoDB.
---
Este tutorial fornecerá uma introdução das operações básicas para usar o shell do MongoDB. O shell é parte padrão da distribuição do MongoDB e fornece uma completa interface JavaScript com acesso completo a linguagem JavaScript além de todas as funções padrões para melhor interfacear o MongoBD.

Este tutorial irá assumir que você esta rodando o MongoDB no Linux Ubuntu.

## Conectando ao MongoDB

No terminal, execute o comando:

```
mongo
```
Por padrão, o shell do mongo escuta o servidor de banco de dados na porta no domínio. Para conectar a um servidor ou porta diferente, use as opções ```--port``` e ```--host```.


## Listando os BDs existentes no Servidor

Segue o comando:

```
show dbs
```

## "Usando" um banco de dados

O termo "usando" entre aspas está referenciado assim porque o comando abaixo serve para usar/trocar e criar novos BDs. Segue exemplo do comando ```use```:

```
use mydb
```
	
## Exibindo BD corrente

Para saber em qual sessão de banco de dados você está trabalhando use o seguinte comando:

```
db
```

Este comando exibirá o nome do BD em uso no momento.


## Criando uma coleção

Por padrão quando inserimos um novo documento a uma coleção que não existe, o MongoDB cria esta e já insere o novo documento nela. Porém há uma forma de inserir uma coleção de forma explícita sem precisar efetuar operação de inserção. Segue o comando:

```js
db.createCollection("nomeDaColeção")
```
	
## Criando um documento

Segue um exemplo de inserção de documento:

```js
//Criando um bd
use exemplo

//Criando uma coleção
db.createCollection("usuarios")

//Criando um documento
db.usuarios.insert({nome: "Felipe", sexo: "Masculino", idade: 40, chefe: true })
```


## Listando as Coleções existentes no BD corrente

Para saber quais coleções o BD corrente possui, use o seguinte comando:

```
show collections
```
	
## Listando todos os documentos

Irei exemplificar a criação de mais alguns documentos, e logo após a listagem de todos os itens inseridos na coleção.

```js
//Criando outros documentos de usuários
db.usuarios.insert({nome: "Marcos", sexo: "Masculino"})
db.usuarios.insert({nome: "Júlio", sexo: "Masculino", idade: 25)

//Listando todos os usuários
db.usuarios.find()
```

Cadê o Delete!? Cadê o Update!? Calllllma... Estou seguindo a documentação do MongoDB e neste momento focamos só nas operações mais básicas mesmo. Mais pra frente irei aprofundar nas operações básicas de CRUD, Agregações, Map/Reduce... Por enquanto é só! Até o próximo tutorial!
