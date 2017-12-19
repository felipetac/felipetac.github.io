---
layout: post
title: "#8 - Tipos de Dados no MongoDB"
description: Apresenta os tipos de dados existentes no MongoDB.
image: '/assets/img/mongodb.png'
category: 'mongodb'
tags:
- Banco de dados
- MongoDB
- NoSQL
twitter_text: Apresenta os tipos de dados existentes no MongoDB.
introduction: Nesta parte do tutorial explico quais são so tipos de dados suportados no MongoDB.
---
MongoDB suporta vários tipos de dados, cuja lista é dada abaixo:

**String:** Este é o tipo de dados mais comumente usado para armazenar dados. String no mongodb deve ser um UTF-8 válido.

**Integer:** Este tipo é usado para armazenar um valor numérico. Integer pode ser 32 bits ou 64 bits dependendo do seu servidor.

**Boolean:** Este tipo é usado para armazenar um valor boleano (verdadeiro/falso).

**Double:** Este tipo é usado para armazenar valores de ponto flutuante.

**Min/ Max keys:** Este tipo é usado para comparar um valor contra os elementos mais baixos e mais altos de um BSON.

**Arrays:** Este tipo é usado para armazenar arrays, listas ou múltiplos valores dentro de uma chave(key).

**Timestamp:** ctimestamp. Isto pode ser útil para a gravação de quando um documento foi modificado ou acrescentado.

**Object:** Este tipo de dado é usado para incorporar documentos.

**Null:** Este tipo é usado para armazenar um valor nulo(null).

**Symbol:** Este tipo de dados é usado de forma idêntica ao String, porém ele é geralmente reservado para linguagens que usam um tipo de símbolo específico.

**Date:** Este tipo de dados é utilizado para armazenar a data ou a hora atual no formato de UNIX. Você pode especificar o seu próprio date_time através da criação do objeto Date e passando o dia, mês e ano para ele.

**Object ID:** Este tipo de dados é usado para armazenar os identificadores(ID) dos documentos.

**Binary data:** Este tipo de dados é usado para armazenar um dado binário.

**Code:** Este tipo de dados é usado para armazenar código javascript dentro do documento.

**Regular expression:** Este tipo de dados é usado para armazenar expressões regulares.


**Fonte parcialmente traduzida:** [Tutorials Point - MongoDB Data Types](http://www.tutorialspoint.com/mongodb/mongodb_datatype.htm)
