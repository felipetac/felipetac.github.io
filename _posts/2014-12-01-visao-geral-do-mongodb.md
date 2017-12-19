---
layout: post
title: "#1 - Visão Geral do MongoDB"
description: Lorem ipsum dolor sit amet, consectetur adipisicing elit.
image: '/assets/img/mongodb.png'
category: 'mongodb'
tags:
- Banco de dados
- MongoDB
- NoSQL
twitter_text: Lorem ipsum dolor sit amet, consectetur adipisicing elit.
introduction: Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
---

## O que é MongoDB?

MongoDB é um banco de dados multi-plataforma, orientado documentos que fornece, alto desempenho, alta disponibilidade e fácil escalabilidade. MongoDB funciona sobre o conceito de coleções e documentos.

## Banco de Dados

Banco de dados é um recipiente físico para coleções. Cada banco de dados recebe o seu próprio conjunto de arquivos no sistema de arquivos. Um único servidor MongoDB normalmente tem vários bancos de dados.

## Coleção

Coleção é um grupo de documentos. Este é o equivalente a uma tabela em banco de dados relacionais. Uma coleção existe dentro de um único banco de dados. Coleções não impõe um esquema. Documentos dentro de uma coleção podem ter diferentes campos. Normalmente, todos os documentos em uma coleção são semelhantes ou tem um relacionamento proposto.

## Documento

Um documento e formado por um conjunto de pares de chave/valor. Documentos tem esquema dinâmico, isso significa que estes documentos não tem a necessidade de ter os mesmos campos, ou ter a mesma estrutura, ou ter campos comuns. Uma mesma coleção pode armazenar documentos diferentes dados um do outro.

Abaixo mostra uma tabela com a relação das terminologias RDBMS equivalentes com o MongoDB

RDBMS

MongoDB

Banco de Dados

Banco de Dados

Tabela

Coleção

Tupla/Linha

Document

Coluna

Campo

de Tabelas

Documentos Incorporados

Chave Primária

Chave Primária (Chave padrão _id e provida pelo próprio mongod)

Servidor e Cliente de Banco de Dados

Mysqld/Oracle

mongod

mysql/sqlplus

mongo

## Exemplo de um Documento

Abaixo o exemplo mostra a estrutura do documento de um site de blog que é simplesmente par de valores/chave separados por vírgula.

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
Este tutorial mostrou uma visão rápida quanto alguns conceitos. Na próxima parte iremos ensinar como instalar o mongoDB no Ubuntu Linux. Até a próxima!


**Fonte traduzida:**
 
[Tutorials Point – MongoDB Overview](http://www.tutorialspoint.com/mongodb/mongodb_overview.htm)
