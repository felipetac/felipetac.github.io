---
layout: post
title: Introdução MongoDB + Java
description: Rápida exemplificação da integração do MongoDB com o Java.
image: 'https://res.cloudinary.com/felipetac/image/upload/v1514992555/mint-coffee.jpg'
category: 'mongodb'
tags:
- Banco de dados
- MongoDB
- NoSQL
- Java
twitter_text: Rápida exemplificação da integração do MongoDB com o Java.
introduction: Neste artigo exemplifico de forma sucinta a integração do MongoDB com o Java.
---
Antes de começarmos usando o MongoDB nos seus programas java, nós precisamos ter certeza que o driver JDBC do MongoDB e o Java estão configurados na sua máquina. Você pode verificar o tutorial java para instalação java na sua máquina. Agora, vamos verificar com configurar o driver JDBC do MongoDB.*Você precisa baixar o jar do caminho: [Download mongo.jar](https://github.com/mongodb/mongo-java-driver/downloads). Tenha certeza de que está baixando a última versão deste.

* Você precisa incluir o mongo.jar dentro do seu projeto.

## Conectando a base de dados

Para conectar a base de dados, você precisa especificar o nome do banco de dados, se o banco de dados não existir o mongodb cria este automaticamente.

Trecho de código para conectar o banco de dados pode ser o seguinte:

```java
import com.mongodb.MongoClient;
import com.mongodb.MongoException;
import com.mongodb.WriteConcern;
import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.BasicDBObject;
import com.mongodb.DBObject;
import com.mongodb.DBCursor;
import com.mongodb.ServerAddress;
import java.util.Arrays;

public class MongoDBJDBC{
   public static void main( String args[] ){
      try{   
         // Conectando ao servidor mongodb
         MongoClient mongoClient = new MongoClient( "localhost" , 27017 );
         // Conecta ao banco de dados test
         DB db = mongoClient.getDB( "test" );
                 System.out.println("Banco de dados conectado com sucesso");
         boolean auth = db.authenticate(myUserName, myPassword);
                 System.out.println("Autenticacao: "+auth);
      }catch(Exception e){
             System.err.println( e.getClass().getName() + ": " + e.getMessage() );
          }
   }
}
```

Agora, vamos compilar e executar o programa a seguir para criar nosso banco de dados.
Você pode mudar o caminho de acordo com sua necessidade. Nos vamos assumir que a versão corrente do driver JDBC **mongo-2.10.1.jar** é a disponível no nosso caminho corrente.

```bash
$ javac MongoDBJDBC.java
$ java -classpath ".:mongo-2.10.1.jar" MongoDBJDBC
Banco de dados conectado com sucesso
Autenticacao: true
```

Se estiver usando em uma máquina Windows, então você pode compilar e executar seu código da forma a seguir:

```bash
$ javac MongoDBJDBC.java
$ java -classpath ".;mongo-2.10.1.jar" MongoDBJDBC
Banco de dados conectado com sucesso
Autenticacao: true
```

O valor de authdeverá ser se o nome de usuário e senha estão válidos e ativos para o banco de dados selecionado.

## Criando uma coleção

Para criar uma coleção, o método ```createCollection()``` da classe *com.mongodb.DB* é usado.

Trecho de código para criar uma coleção:

```java
import com.mongodb.MongoClient;
import com.mongodb.MongoException;
import com.mongodb.WriteConcern;
import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.BasicDBObject;
import com.mongodb.DBObject;
import com.mongodb.DBCursor;
import com.mongodb.ServerAddress;
import java.util.Arrays;

public class MongoDBJDBC{
   public static void main( String args[] ){
      try{   
         // Conectar ao servidor mongodb
         MongoClient mongoClient = new MongoClient( "localhost" , 27017 );
         // Conecta ao banco de dados test
         DB db = mongoClient.getDB( "test" );
         System.out.println("Banco de dados conectado com sucesso");
         boolean auth = db.authenticate(myUserName, myPassword);
         System.out.println("Autenticacao: "+auth);
         DBCollection coll = db.createCollection("mycol");
         System.out.println("Colecao criada com sucesso");
      }catch(Exception e){
             System.err.println( e.getClass().getName() + ": " + e.getMessage() );
          }
   }
}
```

Quando o programa é compilado e executado, este produzirá o seguinte resultado:

```bash
Banco de dados conectado com sucesso
Autenticacao: true
Colecao criada com sucesso
```

## Obtendo/Selecionando uma coleção

Para obter/selecionar uma coleção de uma base de dados, o método ```getCollection()``` da classe *com.mongodb.DBCollection* é usado.

Trecho de código para obter/selecionar uma coleção:

```java
import com.mongodb.MongoClient;
import com.mongodb.MongoException;
import com.mongodb.WriteConcern;
import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.BasicDBObject;
import com.mongodb.DBObject;
import com.mongodb.DBCursor;
import com.mongodb.ServerAddress;
import java.util.Arrays;

public class MongoDBJDBC{
   public static void main( String args[] ){
      try{   
         // Conecta ao servidor mongodb
         MongoClient mongoClient = new MongoClient( "localhost" , 27017 );
         // Conecta ao banco de dados test
         DB db = mongoClient.getDB( "test" );
         System.out.println("Banco de dados conectado com sucesso");
         boolean auth = db.authenticate(myUserName, myPassword);
         System.out.println("Autenticacao: "+auth);
         DBCollection coll = db.createCollection("mycol");
         System.out.println("Colecao criada com sucesso");
         DBCollection coll = db.getCollection("mycol");
         System.out.println("Colecao mycol selecionada com sucesso");
      }catch(Exception e){
             System.err.println( e.getClass().getName() + ": " + e.getMessage() );
          }
   }
}
```

Quando o programa é compilado e executado, este produzirá o seguinte resultado:

```bash
Banco de dados conectado com sucesso
Autenticacao: true
Colecao criada com sucesso
Colecao mycol selecionada com sucesso
```

## Inserindo um documento

Para inserir um documento dentro do mongodb, o método ```insert()``` da classe *com.mongodb.DBCollection* é usado.

Trecho de código para inserir um documento:

```java
import com.mongodb.MongoClient;
import com.mongodb.MongoException;
import com.mongodb.WriteConcern;
import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.BasicDBObject;
import com.mongodb.DBObject;
import com.mongodb.DBCursor;
import com.mongodb.ServerAddress;
import java.util.Arrays;

public class MongoDBJDBC{
   public static void main( String args[] ){
      try{   
         // Conecta ao servidor mongodb
         MongoClient mongoClient = new MongoClient( "localhost" , 27017 );
         // Conecta ao banco de dados test
         DB db = mongoClient.getDB( "test" );
         System.out.println("Banco de dados conectado com sucesso");
         boolean auth = db.authenticate(myUserName, myPassword);
         System.out.println("Autenticacao: "+auth);         
         DBCollection coll = db.getCollection("mycol");
         System.out.println("Colecao mycol selecionada com sucesso");
         BasicDBObject doc = new BasicDBObject("title", "MongoDB").
            append("description", "database").
            append("likes", 100).
            append("url", "http://www.tutorialspoint.com/mongodb/").
            append("by", "tutorials point");
         coll.insert(doc);
         System.out.println("Documento inserido com sucesso");
      }catch(Exception e){
             System.err.println( e.getClass().getName() + ": " + e.getMessage() );
          }
   }
}
```

Quando o programa é compilado e executado, este produzirá o seguinte resultado:

```bash
Banco de dados conectado com sucesso
Autenticacao: true
Colecao mycol selecionada com sucesso
Documento inserido com sucesso
```

## Retornar todos os documentos

Para obter todos os documentos de uma coleção, o método ```find()``` da classe *com.mongodb.DBCollection* é usado. Este método retorna um array o qual você precisa percorrer.

Trecho de código para retornar todos os documentos:

```java
import com.mongodb.MongoClient;
import com.mongodb.MongoException;
import com.mongodb.WriteConcern;
import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.BasicDBObject;
import com.mongodb.DBObject;
import com.mongodb.DBCursor;
import com.mongodb.ServerAddress;
import java.util.Arrays;

public class MongoDBJDBC{
   public static void main( String args[] ){
      try{   
         // Conecta ao servidor mongodb
         MongoClient mongoClient = new MongoClient( "localhost" , 27017 );
         // Conecta ao banco de dados test
         DB db = mongoClient.getDB( "test" );
         System.out.println("Banco de dados conectado com sucesso");
         boolean auth = db.authenticate(myUserName, myPassword);
         System.out.println("Autenticacao: "+auth);         
         DBCollection coll = db.getCollection("mycol");
         System.out.println("Colecao mycol selecionada com sucesso");
         DBCursor cursor = coll.find();
         int i=1;
         while (cursor.hasNext()) { 
            System.out.println("Documento inserido: "+i); 
            System.out.println(cursor.next()); 
            i++;
         }
      }catch(Exception e){
             System.err.println( e.getClass().getName() + ": " + e.getMessage() );
          }
   }
}
```

Quando o programa é compilado e executado, este produzirá o seguinte resultado:

```bash
Banco de dados conectado com sucesso
Autenticacao: true
Colecao mycol selecionada com sucesso
Documento inserido: 1
{
   "_id" : ObjectId(7df78ad8902c),
   "title": "MongoDB",
   "description": "database",
   "likes": 100,
   "url": "http://www.tutorialspoint.com/mongodb/",
   "by": "tutorials point"
}
```

## Atualizando documentos

Para atualizar um documento da coleção, o método ```update()``` da classe *com.mongodb.DBCollection* é usado.

Trecho do código para atualizar um documento:

```java
import com.mongodb.MongoClient;
import com.mongodb.MongoException;
import com.mongodb.WriteConcern;
import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.BasicDBObject;
import com.mongodb.DBObject;
import com.mongodb.DBCursor;
import com.mongodb.ServerAddress;
import java.util.Arrays;

public class MongoDBJDBC{
   public static void main( String args[] ){
      try{   
         // Conecta ao servidor mongodb
         MongoClient mongoClient = new MongoClient( "localhost" , 27017 );
         // Conecta ao bando de dados test
         DB db = mongoClient.getDB( "test" );
         System.out.println("Banco de dados conectado com sucesso");
         boolean auth = db.authenticate(myUserName, myPassword);
         System.out.println("Autenticacao: "+auth);         
         DBCollection coll = db.getCollection("mycol");
         System.out.println("Colecao mycol selecionada com sucesso");
         DBCursor cursor = coll.find();
         while (cursor.hasNext()) { 
            DBObject updateDocument = cursor.next();
            updateDocument.put("likes","200")
            col1.update(updateDocument); 
         }
         System.out.println("Documento atualizado com sucesso");
         cursor = coll.find();
         int i=1;
         while (cursor.hasNext()) { 
            System.out.println("Documento atualizado: "+i); 
            System.out.println(cursor.next()); 
            i++;
         }
      }catch(Exception e){
             System.err.println( e.getClass().getName() + ": " + e.getMessage() );
          }
   }
}
```

Quando o programa é compilado e executado, este produzirá o seguinte resultado:

```bash
Banco de dados conectado com sucesso
Autenticacao: true
Colecao mycol selecionada com sucesso
Documento atualizado com sucesso
Documento atualizado: 1

{
   "_id" : ObjectId(7df78ad8902c),
   "title": "MongoDB",
   "description": "database",
   "likes": 100,
   "url": "http://www.tutorialspoint.com/mongodb/",
   "by": "tutorials point"
}
```

## Apagando o primeiro documento

Para apagar o primeiro documento de uma coleção, você precisa primeiro selecionar os documentos usando o método ```findOne()``` e depois usar o método remove da classe *com.mongodb.DBCollection*.

Trecho do código para deletar o primeiro documento:

```java
import com.mongodb.MongoClient;
import com.mongodb.MongoException;
import com.mongodb.WriteConcern;
import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.BasicDBObject;
import com.mongodb.DBObject;
import com.mongodb.DBCursor;
import com.mongodb.ServerAddress;
import java.util.Arrays;

public class MongoDBJDBC{
   public static void main( String args[] ){
      try{   
         // Conecta ao servidor mongodb
         MongoClient mongoClient = new MongoClient( "localhost" , 27017 );
         // Conecta ao banco de dados test
         DB db = mongoClient.getDB( "test" );
         System.out.println("Banco de dados conectado com sucesso");
         boolean auth = db.authenticate(myUserName, myPassword);
         System.out.println("Autenticacao: "+auth);         
         DBCollection coll = db.getCollection("mycol");
         System.out.println("Colecao mycol selecionada com sucesso");
         DBObject myDoc = coll.findOne();
         col1.remove(myDoc);
         DBCursor cursor = coll.find();
         int i=1;
         while (cursor.hasNext()) { 
            System.out.println("Documento inserido: "+i); 
            System.out.println(cursor.next()); 
            i++;
         }
         System.out.println("Documento apagado com sucesso");
      }catch(Exception e){
             System.err.println( e.getClass().getName() + ": " + e.getMessage() );
          }
   }
}
```

Quando o programa é compilado e executado, este produzirá o seguinte resultado:

```bash
Banco de dados conectado com sucesso
Autenticacao: true
Colecao mycol selecionada com sucesso
Documento apagado com sucesso
```

Os métodos ```save()```, ```limit()```, ```skip()```, ```sort()``` e etc serão explicados em um tutorial subsequente.

Espero poder ter ajudado! Até o próximo tutorial! :)

**Fonte Traduzida:** [TutorialsPoint - MongoDB Java](http://www.tutorialspoint.com/mongodb/mongodb_java.htm)
