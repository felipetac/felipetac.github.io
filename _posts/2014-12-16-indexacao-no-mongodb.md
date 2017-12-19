---
layout: post
title: "#16 - Indexação no MongoDB"
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

Índices vem de apoio para aumentar a eficiência das consultas. Sem índices, o MongoDB deverá percorrer todos os documentos de uma coleção para selecionar os documentos que correspondem a instrução de consulta. Essa verificação é altamente ineficiente e exige que mongod processe um grande volume de dados.

Índices são estruturas de dados especiais que armazenam uma pequena porção de conjuntos de dados facilitando o processamento da consulta. O índice armazena o valor de um campo específico ou um conjunto de campos, ordenado pelo valor do campo, tal como especificado no índice.##O método ensureIndex()

Para criar um índice você precisa usar o método **ensureIndex()**.

### Sintaxe:

A sintaxe básica do método ensureIndex() é a seguinte:

>db.COLLECTION_NAME.ensureIndex({KEY:1})

Esta chave(KEY) é o nome do campo o qual você deseja criar o índice e o 1 é para estabelecer ordenação crescente. Para criar índice em ordem decrescente você precisa o -1.

### Exemplo

```js
db.mycol.ensureIndex({title: 1})
```

Dentro do método **ensureIndex()** você pode passar múltiplos campos para criar índices sobre estes múltiplos campos.

```js
db.mycol.ensureIndex({title: 1, description: -1})
```

O método ensureIndex() também aceita uma lista de opções (Opcionais). Estas opções seguem na lista a seguir:

<table>
<tbody>
<tr>
<th>Parâmetro</th>
<th>Tipo</th>
<th>Descrição</th>
</tr>
<tr>
<td>background</td>
<td>Boolean</td>
<td>Constrói o índice em segundo plano para que a construção deste índice não bloquei outras atividades do banco de dados. Especifique como <i>true</i> para construir em plano de fundo. O valor padrão é <i><b>false</b></i>.</td>
</tr>
<tr>
<td>unique</td>
<td>Boolean</td>
<td>Cria um índice exclusivo para que a coleção não aceite a inserção de documentos em que a chave(s) de índice corresponda(m) a um valor existente no índice. Especifique <i>true</i> para criar um índice exclusivo. O valor padrão é <i><b>false</b></i>.</td>
</tr>
<tr>
<td>name</td>
<td>string</td>
<td>O nome do índice. Se não tiver especificado o MongoDB gera um nome para o índice através da concatenação dos nomes dos campos indexados e da ordenação.</td>
</tr>
<tr>
<td>dropDups</td>
<td>Boolean</td>
<td>Cria um índice exclusivo em um campo que pode ter duplicatas. MongoDB índices apenas a primeira ocorrência de uma chave e remove todos os documentos da coleção que contêm as próximas ocorrências dessa chave. Especifique <i>true</i> para criar um índice único. O valor padrão é <i><b>false</b></i>.</td>
</tr>
<tr>
<td>sparse</td>
<td>Boolean</td>
<td>Se for <i>true</i>, o índice só faz referência a documentos com o campo especificado. Esses índices usam menos espaço, mas se comportam de forma diferente em algumas situações (particularmente em ordenações). O valor padrão é <i><b>false</b></i>.</td>
</tr>
<tr>
<td>expireAfterSeconds</td>
<td>integer</td>
<td>
Especifica um valor, em segundos, como um TTL para controlar quanto tempo MongoDB retém documentos nesta coleção.
</td>
</tr>
<tr>
<td>v</td>
<td>index version</td>
<td>O número da versão do índice. A versão padrão do índice depende da versão do <i>mongod</i> em execução na criação deste.</td>
</tr>
<tr>
<td>weights</td>
<td>document</td>
<td>O peso(weights) e um número entre <b>1</b> a <b>99,999</b> e denota a relevância do campo em relação aos outros campos indexados no termo de armazenamento.</td>
</tr>
<tr>
<td>default_language</td>
<td>string</td>
<td>Para um índice textual, a linguagem que determina a lista de <i>stop words </i>e as regras para o <i>stemmer</i> e <i>tokenizer</i>. O valor padrão é <b>english</b>.</td>
</tr>
<tr>
<td>language_override</td>
<td>string</td>
<td>Para um índice textual, especifique o nome do campo no documento que contém, a linguagem para substituir o idioma padrão. O valor padrão é o <i>language</i>.</td>
</tr>
</tbody>
</table>  
 
**Fonte Traduzida:** [Tutorials Point - MongoDB Indexing](http://www.tutorialspoint.com/mongodb/mongodb_indexing.htm)
