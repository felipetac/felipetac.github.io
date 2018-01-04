---
layout: post
title: Introdução MongoDB + PHP
date: 2015-02-10 12:30:00
description: Rápida exemplificação da integração do MongoDB com o PHP.
image: 'https://res.cloudinary.com/felipetac/image/upload/c_crop,h_315,w_600/v1514992727/planta-elefante.jpg'
category: 'mongodb'
tags:
- Banco de dados
- MongoDB
- NoSQL
- PHP
twitter_text: Rápida exemplificação da integração do MongoDB com o PHP.
introduction: Neste artigo exemplifico de forma sucinta a integração do MongoDB com o PHP.
---
Para usar o mongodb com o PHP vocẽ precisa usar o driver do mongodb para PHP. Baixe o driver da url 
[Download PHP Driver](https://s3.amazonaws.com/drivers.mongodb.org/php/index.html).Tenha certeza que baixou a última versão disponível. Agora descompacte o arquivo e coloque o arquivo php_mongo.dll no seu diretório de extensões PHP (“ext” por padrão) e adicione a seguinte linha no seu arquivo 
*:extension=php_mongo.dll*

## Fazer uma conexão e Selecionar uma base de dados

Para fazer uma conexão, você precisa especificar o nome do banco de dados, se a banco de dados não existir o mongodb criará um automaticamente.

Trecho de código para conetar a um banco de dados:

```php
<?php
   // conecta ao servidor mongodb
   $m = new MongoClient();
   echo "Conexao efetuada com sucesso";
   // seleciona/ou cria um banco de dados
   $db = $m->mydb;
   echo "Banco de dados mydb selecionado";
?>
```
Quando o programa for executado, este produzirá o seguinte resultado:

```bash
Conexao efetuada com sucesso
Banco de dados mydb selecionado
```

## Criar uma coleção

Trecho de código para criar uma coleção:

```php
<?php
   // cconecta ao servidor mongodb
   $m = new MongoClient();
   echo "Conexao efetuada com sucesso";
   // select a database
   $db = $m->mydb;
   echo "Banco de dados mydb selecionado";
   $collection = $db->createCollection("mycol");
   echo "Colecao criada com sucesso";
?>
```

Quando o programa é executado, este produzirá o seguinte resultado:

```bash
Conexao efetuada com sucesso
Banco de dados mydb selecionado
Colecao criada com sucesso
```

## Inserindo um Documento

Para inserir um documento dentro do mongodb, o método ```insert()``` é usado.

Trecho de código para inserir um documento:

```php
<?php
   // Conecta ao servidor mongodb
   $m = new MongoClient();
   echo "Banco de dados conectado com sucesso";
   // Seleciona um banco de dados
   $db = $m->mydb;
   echo "Banco de dados mydb selecionado";
   $collection = $db->mycol;
   echo "Colecao selecionada com sucesso";
   $document = array( 
      "title" => "MongoDB", 
      "description" => "database", 
      "likes" => 100,
      "url" => "http://www.felipetoscano.com/blog/category/mongodb/",
      "by", "felipe toscano"
   );
   $collection->insert($document);
   echo "Documento inserido com sucesso";
?>
```

Quando o programa é executado, este produzirá o seguinte resultado:

```bash
Banco de dados conectado com sucesso
Banco de dados mydb selecionado
Colecao selecionada com sucesso
Documento inserido com sucesso
```

## Retornando todos os documentos

Para retornar todos os documentos de uma coleção, o método ```find()``` é usado.

Trecho de código para retornar todos os documentos:

```php
<?php
   // Conecta ao servidor mongodb
   $m = new MongoClient();
   echo "Banco de dados conectado com sucesso";
   // Seleciona um banco de dados
   $db = $m->mydb;
   echo "Banco de dados mydb selecionado";
   $collection = $db->mycol;
   echo "Colecao selecionada com sucesso";

   $cursor = $collection->find();
   // iterando o cursor para exibir o titulo dos documentos
   foreach ($cursor as $document) {
      echo $document["title"] . "\n";
   }
?>
```

Quando o programa é executado, este produzirá o seguinte resultado:

```bash
Banco de dados conectado com sucesso
Banco de dados mydb selecionado
Colecao selecionada com sucesso

{
   "title": "MongoDB"
}
```

## Atualizar um documento

Para atualizar um documento, vocẽ precisa usar o método ```update()```.

No exemplo a seguir, nós veremos como atualizar o título de um documento inserido para MongoDB Tutorial. O trecho de código para atualizar um documento:

```php
<?php
   // conecta ao servidor mongodb
   $m = new MongoClient();
   echo "Banco de dados conectado com sucesso";
   // Seleciona um banco de dados
   $db = $m->mydb;
   echo "Banco de dados mydb selecionado";
   $collection = $db->mycol;
   echo "Colecao selecionada com sucesso";

   // atualizando o documento
   $collection->update(array("title"=>"MongoDB"),     array('$set'=>array("title"=>"MongoDB Tutorial")));
   echo "Documento atualizado com sucesso";
   // exibindo o documento atualizado
   $cursor = $collection->find();
   // iteracao no cursor para exibir o titulo dos documentos
   echo "Documento atualizado:";
   foreach ($cursor as $document) {
      echo $document["title"] . "\n";
   }
?>
```

Quando o programa é executado, este produzirá o seguinte resultado:

```bash
Banco de dados conectado com sucesso
Banco de dados mydb selecionado
Colecao selecionada com sucesso
Documento atualizado com sucesso
Documento atualizado:

{
   "title": "MongoDB Tutorial"
}
```

## Apagando um documento

Para apagar um documento, você precisa usar o método ```remove()```.

No exemplo a seguir, nós removeremos dos documentos aquele que tem o título MongoDB Tutorial. Trecho de código para apagar um documento:

```php
<?php
   // conecta ao servidor mongodb
   $m = new MongoClient();
   echo "Banco de dados conectado com sucesso";
   // Seleciona um banco de dados
   $db = $m->mydb;
   echo "Banco de dados mydb selecionado";
   $collection = $db->mycol;
   echo "Colecao selecionada com sucesso";
   
   // removendo um documento
   $collection->remove(array("title"=>"MongoDB Tutorial"),false);
   echo "Documentos apagados com sucesso";
   
   // exibindo os documentos disponiveis
   $cursor = $collection->find();
   // iterando no cursor para exibir o titulo dos documentos
   echo "Documento Atualizado:";
   foreach ($cursor as $document) {
      echo $document["title"] . "\n";
   }
?>
```

Quando o programa é executado, este produzirá o seguinte resultado:

```bash
Banco de dados conectado com sucesso
Banco de dados mydb selecionado
Colecao selecionada com sucesso
Documentos apagados com sucesso
```

No exemplo dados acima, o segundo parametro é do tipo *booleano* e usado para estabelecer se remove um único elemento encontrado no método ```remove()```.

Os métodos ```save()```, ```limit()```, ```skip()```, ```sort()``` e etc serão explicados em um tutorial subsequente.

Espero poder ter ajudado! Até o próximo tutorial! :)

**Fonte Traduzida:** [TutorialsPoint - MongoDB PHP](http://www.tutorialspoint.com/mongodb/mongodb_php.htm)
