---
layout: post
title: "#10 - Tipos de Dados no MongoDB"
description: Apresentação dos tipos de dados existentes no MongoDB.
image: '/assets/img/mongodb.png'
category: 'mongodb'
tags:
- Banco de dados
- MongoDB
- NoSQL
twitter_text: Apresentação dos tipos de dados existentes no MongoDB.
introduction: Nesta parte do tutorial explico quais são so tipos de dados suportados no MongoDB.
---
MongoDB suporta vários tipos de dados, cuja lista é dada abaixo:

- **_String:_** Este é o tipo de dados mais comumente usado para armazenar dados. String no mongodb deve ser um UTF-8 válido.

- **_Integer:_** Este tipo é usado para armazenar um valor numérico. Integer pode ser 32 bits ou 64 bits dependendo do seu servidor.

- **_Boolean:_** Este tipo é usado para armazenar um valor boleano (verdadeiro/falso).

- **_Double:_** Este tipo é usado para armazenar valores de ponto flutuante.

- **_Min/ Max keys:_** Este tipo é usado para comparar um valor contra os elementos mais baixos e mais altos de um BSON.

- **_Arrays:_** Este tipo é usado para armazenar arrays, listas ou múltiplos valores dentro de uma chave(key).

- **_Timestamp:_** ctimestamp. Isto pode ser útil para a gravação de quando um documento foi modificado ou acrescentado.

- **_Object:_** Este tipo de dado é usado para incorporar documentos.

- **_Null:_** Este tipo é usado para armazenar um valor nulo(null).

- **_Symbol:_** Este tipo de dados é usado de forma idêntica ao String, porém ele é geralmente reservado para linguagens que usam um tipo de símbolo específico.

- **_Date:_** Este tipo de dados é utilizado para armazenar a data ou a hora atual no formato de UNIX. Você pode especificar o seu próprio date_time através da criação do objeto Date e passando o dia, mês e ano para ele.

- **_Object ID:_** Este tipo de dados é usado para armazenar os identificadores(ID) dos documentos.

- **_Binary data:_** Este tipo de dados é usado para armazenar um dado binário.

- **_Code:_** Este tipo de dados é usado para armazenar código javascript dentro do documento.

- **_Regular expression:_** Este tipo de dados é usado para armazenar expressões regulares.


**Fonte parcialmente traduzida:** [Tutorials Point - MongoDB Data Types](http://www.tutorialspoint.com/mongodb/mongodb_datatype.htm)
