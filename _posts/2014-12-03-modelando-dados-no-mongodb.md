---
layout: post
title: "#5 - Modelando Dados no MongoDB"
date: 2014-12-03 12:30:00
description: Introdução a modelagem de dados no MongoDB.
image: 'https://res.cloudinary.com/felipetac/image/upload/c_crop,h_315,w_600/v1514996820/modeling-database_wpr5f7.jpg'
category: 'mongodb'
tags:
- Banco de dados
- MongoDB
- NoSQL
twitter_text: Modelando Dados no MongoDB.
introduction: Nesta parte do tutorial dou dicas de como modelar dados no MongoDB.
---
Dados no MongoDB tem documentos de esquemas flexíveis em uma mesma coleção. Isso quer dizer que não há necessidade ter o mesmo conjunto de campos ou estrutura e campos comuns. Documentos de uma coleção podem conter diferentes tipos de dados.

## Algumas considerações quando for modelar esquemas no MongoDB


- Projete seu esquema de acordo com as necessidades dos usuários.

	
- Combine os objetos em um documento, se você vai usá-los juntos. Caso contrário separe-os (mas certifique-se que não será necessários joins).

	
- Duplique os dados (com limites), porque o espaço em disco é barato como comparar a calcular o tempo.

	
- Faça joins durante a escrita, e não na leitura.

	
- Otimize seu esquema para os casos de uso mais frequentes.

	
- Faça agregações complexas no esquema

## Exemplo

Supondo que um cliente necessite de um projeto de banco de dados para seu site de blog, veja as diferenças entre projetos de esquemas em banco de dados relacionais e em banco de dados MongoDB. O blog tem os seguintes requisitos.

- Cada postagem(post) tem um único título(title), descrição(description) e url.

	
- Cada postagem(post) pode ter um ou mais tags.

	
- Cada postagem(post) tem um nome do seu publicador e o total de número de curtidas(likes).

	
- Cada postagem(post) pode ter comentários(comments) fornecidos pelos usuários acompanhado de seus nomes(by_user), mensagens(message), hora de gravação(data-time) e curtidas(likes).

	
- Cada postagem(post) pode ter 0 ou mais comentários(comments).

Para os requisitos acima, projetos de esquemas em BD's relacionais devem ter no mínimo 3 tabelas

[![RDBMS](http://res.cloudinary.com/felipetac/image/upload/v1514991637/RDBMS_lcmhs4.png)](http://res.cloudinary.com/felipetac/image/upload/v1514991637/RDBMS_lcmhs4.png)

Enquanto que em projetos de esquemas no MongoDB devemos ter uma única coleção de postagem(post) tendo a seguinte estrutura:

```js
{
   _id: POST_ID
   title: TITLE_OF_POST, 
   description: POST_DESCRIPTION,
   by: POST_BY,
   url: URL_OF_POST,
   tags: [TAG1, TAG2, TAG3],
   likes: TOTAL_LIKES, 
   comments: [  
      {
         user: COMMENT_BY,
         message: TEXT,
         dateCreated: DATE_TIME,
         like: LIKES 
      },
      {
         user: COMMENT_BY,
         message: TEXT,
         dateCreated: DATE_TIME,
         like: LIKES
      }
   ]
}
```

Assim, ao mostrar os dados, em banco de dados relacionais você precisará efetuar *joins* das três tabelas e em banco de dados MongoDB seus dados serão mostrados usando apenas uma coleção.


**Fonte traduzida:** [Tutorials Point - MongoDB Data Modeling](http://www.tutorialspoint.com/mongodb/mongodb_data_modeling.htm)
