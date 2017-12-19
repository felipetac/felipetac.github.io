---
layout: post
title: "Introdução ao MongoDB"
description: Lorem ipsum dolor sit amet, consectetur adipisicing elit.
image: '/assets/img/introduction.png'
category: 'mongodb'
tags:
- Banco de dados
- MongoDB
- NoSQL
twitter_text: Lorem ipsum dolor sit amet, consectetur adipisicing elit.
introduction: Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
---

Estudando sobre MongoDB, resolvi providenciar uma introdução sobre este banco de dados não relacional.

## O que é MongoDB

MongoDB é um banco de dados de código aberto orientado a documentos, que fornece alta performance, alta disponibilidade e escalabilidade automática.

### Banco de dados orientado a documentos

Um registro no MongoDB é considerado como um documento, que é composto por uma estrutura de pares de chave/valor. Os documentos do MongoDB são similares a objetos JSON. Os valores das chaves podem incluir um outro documento, arrays, e arrays de documentos.

{
  nome: "Felipe",
  idade: 40,
  status: "A"
  grupo: ["membro", "revisor"]
}

## As vantagens de usar documentos são:


*Documentos correspondem a tipos de dados nativos em diversas linguagens de programação.

	
*Documentos e arrays incorporados reduzem exponencialmente a necessidades de joins.

	
*Esquemas dinâmicos suportam polimorfismos flexíveis.

## Principais Características


### Alta performance

MongoDB fornece alta performance na persistência dos dados. Em particular,

*Suporte a incorporação de modelos de dados reduzindo as atividades de entrada/saída no banco de dados.

	
*Suporte a consultas rápidas por meio de índices e a capacidade de incluir chaves a documentos e arrays incorporados.

### Alta disponibilidade

Para fornecer alta disponibilidade, o MongoDB oferece nativamente facilidades para replicação, chamadas replica sets, oferecendo:

*Failover automático.

	
*Redundância de dados.

Um 
replica set é um grupo de servidores MongoDB que mantém réplicas dos dados, fornecendo redundância e aumentando a disponibilidade destes dados.

### Escalabilidade Automática

MongoDB fornece escalabilidade horizontal como uma parte das funcionalidades nativas dele.

*Sharding automático distribui/fatia os dados pelos diversos clusters.

	
*Replica sets podem fornecer leituras eventualmente consistentes para implantações de alto desempenho.
 

Enfim, busquei seguir um pouco a introdução da própria documentação do MongoDB, se tiver alguma dica, duvida ou correção para este post, comentem! Aguardem que irei comentar mais sobre este incrível banco de dados NoSQL. Até a próxima!
