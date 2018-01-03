---
layout: post
title: "#1 - Visão Geral do MongoDB"
description: Introdução sobre o MongoDB.
image: 'https://res.cloudinary.com/felipetac/image/upload/v1514991637/introduction_owvolo.png'
category: 'mongodb'
tags:
- Banco de dados
- MongoDB
- NoSQL
twitter_text: Introdução sobre o MongoDB.
introduction: Nesta parte do tutorial faço uma breve introdução sobre o MongoDB.
---
## O que é MongoDB

MongoDB é um banco de dados de código aberto orientado a documentos, que fornece alta performance, alta disponibilidade e escalabilidade automática.

### Banco de dados orientado a documentos

Um registro no MongoDB é considerado como um documento, que é composto por uma estrutura de pares de chave/valor. Os documentos do MongoDB são similares a objetos JSON. Os valores das chaves podem incluir um outro documento, arrays, e arrays de documentos.

```js
{
  nome: "Felipe",
  idade: 40,
  status: "A"
  grupo: ["membro", "revisor"]
}
```

## As vantagens de usar documentos são:


- Documentos correspondem a tipos de dados nativos em diversas linguagens de programação.

	
- Documentos e arrays incorporados reduzem exponencialmente a necessidades de joins.

	
- Esquemas dinâmicos suportam polimorfismos flexíveis.

## Principais Características


### Alta performance

MongoDB fornece alta performance na persistência dos dados. Em particular,

- Suporte a incorporação de modelos de dados reduzindo as atividades de entrada/saída no banco de dados.

	
- Suporte a consultas rápidas por meio de índices e a capacidade de incluir chaves a documentos e arrays incorporados.

### Alta disponibilidade

Para fornecer alta disponibilidade, o MongoDB oferece nativamente facilidades para replicação, chamadas replica sets, oferecendo:

- Failover automático.

	
- Redundância de dados.

Um replica set é um grupo de servidores MongoDB que mantém réplicas dos dados, fornecendo redundância e aumentando a disponibilidade destes dados.

### Escalabilidade Automática

MongoDB fornece escalabilidade horizontal como uma parte das funcionalidades nativas dele.

- Sharding automático distribui/fatia os dados pelos diversos clusters.

	
- Replica sets podem fornecer leituras eventualmente consistentes para implantações de alto desempenho.

## Composição 

### Banco de Dados

Banco de dados é um recipiente físico para coleções. Cada banco de dados recebe o seu próprio conjunto de arquivos no sistema de arquivos. Um único servidor MongoDB normalmente tem vários bancos de dados.

### Coleção

Coleção é um grupo de documentos. Este é o equivalente a uma tabela em banco de dados relacionais. Uma coleção existe dentro de um único banco de dados. Coleções não impõe um esquema. Documentos dentro de uma coleção podem ter diferentes campos. Normalmente, todos os documentos em uma coleção são semelhantes ou tem um relacionamento proposto.

### Documento

Um documento e formado por um conjunto de pares de chave/valor. Documentos tem esquema dinâmico, isso significa que estes documentos não tem a necessidade de ter os mesmos campos, ou ter a mesma estrutura, ou ter campos comuns. Uma mesma coleção pode armazenar documentos diferentes dados um do outro.

Abaixo mostra uma tabela com a relação das terminologias RDBMS equivalentes com o MongoDB

<table>
<tbody>
<tr>
<th>RDBMS</th>
<th>MongoDB</th>
</tr>
<tr>
<td>Banco de Dados</td>
<td>Banco de Dados</td>
</tr>
<tr>
<td>Tabela</td>
<td>Coleção</td>
</tr>
<tr>
<td>Tupla/Linha</td>
<td>Document</td>
</tr>
<tr>
<td>Coluna</td>
<td>Campo</td>
</tr>
<tr>
<td><i>Join</i> de Tabelas</td>
<td>Documentos Incorporados</td>
</tr>
<tr>
<td>Chave Primária</td>
<td>Chave Primária (Chave padrão _id e provida pelo próprio mongod)</td>
</tr>
<tr>
<th colspan="2">Servidor e Cliente de Banco de Dados</th>
</tr>
<tr>
<td>Mysqld/Oracle</td>
<td>mongod</td>
</tr>
<tr>
<td>mysql/sqlplus</td>
<td>mongo</td>
</tr>
</tbody>
</table>

## Exemplo de um Documento

Abaixo o exemplo mostra a estrutura do documento de um site de blog que é simplesmente par de valores/chave separados por vírgula.

```js
{
   _id: ObjectId(7df78ad8902c)
   title: 'MongoDB Overview', 
   description: 'MongoDB is no sql database',
   by: 'Marcos Silva',
   url: 'http://www.marcossilexample.com',
   tags: ['mongodb', 'database', 'NoSQL'],
   likes: 100, 
   comments: [  
      {
         user:'user1',
         message: 'My first comment',
         dateCreated: new Date(2011,1,20,2,15),
         like: 0 
      },
      {
         user:'user2',
         message: 'My second comments',
         dateCreated: new Date(2011,1,25,7,45),
         like: 5
      }
   ]
}
```

Este tutorial mostrou uma visão rápida quanto alguns conceitos. Na próxima parte iremos ensinar como instalar o mongoDB no Ubuntu Linux. Até a próxima!

**Fonte traduzida com adaptações:** [Tutorials Point – MongoDB Overview](http://www.tutorialspoint.com/mongodb/mongodb_overview.htm)
