---
layout: post
title: "Perguntas Frequentes sobre MongoDB"
description: Lorem ipsum dolor sit amet, consectetur adipisicing elit.
image: '/assets/img/faq.png'
category: 'mongodb'
tags:
- Banco de dados
- MongoDB
- NoSQL
twitter_text: Lorem ipsum dolor sit amet, consectetur adipisicing elit.
introduction: Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
---

## Que tipo de banco de dados é o MongoDB?

MongoDB é um SGBD orientados a documentos. Pense em MySQL, mas com objetos do tipo JSON compondo o modelo de dados ao invés de tabelas RDBMS. Significativamente, MongoDB não suporta 
joins nem transações. No entanto, oferece índices secundários, uma expressiva linguagem de consulta, escritas atômicas a nível de documento, e leituras totalmente consistentes.

Operacionalmente falando, MongoDB possui replicação 
master-slave com 
failover automatizado e escalabilidade horizontal embutida através de particionamento baseado em intervalos automatizado.


Nota:
MongoDB usa BSON, um formato binário semelhante ao JSON, porém mais expressivo que ele.

## O banco de dados MongoDB possui tabelas?

Em vez de tabelas, um banco de dados MongoDB armazena seus dados em coleções, que são a grosso modo, semelhantes a tabelas RDBMS. A coleção contém um ou mais documentos, que correspondem a um registro ou uma linha em uma tabela de banco de dados relacional, e cada documento tem um ou mais campos, que correspondem a uma coluna em uma tabela de banco de dados relacional.

Coleções têm diferenças importantes em comparação as tabelas de RDBMS. Documentos em uma única coleção podem ter uma combinação única e também conjuntos de campos. Documentos não precisam ter campos idênticos. Você pode adicionar um campo a alguns documentos em uma coleção sem adicionar esse mesmo campo para todos os documentos da coleção.

## O banco de dados MongoDB possui esquemas?

MongoDB usa esquemas dinâmicos. Você pode criar coleções, sem a definição da estrutura, ou seja, não precisa definir os campos ou os tipos de valores dos documentos na coleção. Você pode alterar a estrutura dos documentos, simplesmente adicionando novos campos ou removendo os existentes. Documentos em uma coleção não precisa ter um conjunto idêntico de campos.

Na prática, é muito comum que os documentos em uma coleção tenham uma estrutura bastante homogénea; No entanto, este não é um requisito. Esquemas flexíveis no MongoDB significa que a migração do esquema e o aumento deste são muito fáceis na prática, e você raramente, ou nunca, precisará escrever scripts que realizam operações do tipo "ALTER TABLE", o que simplifica e facilita o desenvolvimento de software iterativo com MongoDB.

## Quais linguagens eu posso trabalhar com o MongoDB?

Existem drivers do MongoDB para todos as linguagens de programação mais populares, além de muitos outros.

## MongoDB tem suporte a SQL?

Não. Entretanto, o MongoDB tem uma linguagem própria de consulta muito rica e 
ad-hoc.

## Quais são os usos mais comuns para o MongoDB?

MongoDB é um projeto de uso geral, tornando-o adequado para um grande número de casos de uso. Seu uso se inclui em sistemas de gerenciamento de conteúdo, aplicativos móveis, jogos, 
e-commerce, analytics, arquivamento e 
logging.

Não use MongoDB para sistemas que requerem forte dependência de SQL,
joins, e transações de múltiplos objetos.

## O MongoDB suporta transações ACID?

Não. O MongoDB não suporta transações multi-documentos.

No entanto, MongoDB fornece operações atômicas em um único documento. Muitas vezes, essas operações atômicas em nível de documento são suficientes para resolver os problemas que exigiriam transações ACID em um banco de dados relacional.

Por exemplo, no MongoDB, você pode inserir dados relacionados em 
arrays ou documentos estruturados dentro de um único documento e atualizar o documento inteiro em uma única operação atômica. Bancos de dados relacionais podem representar o mesmo tipo de dados por meio de várias tabelas e linhas, o que exigiria suporte a transações para atualizar os dados atomicamente.

MongoDB permite que os clientes possam ler documentos inseridos ou modificados antes mesmo dessas modificações irem para o disco, independentemente do nível de escrita ou configuração de 
journaling. Como resultado, as aplicações podem observar duas classes de comportamentos:

Para sistemas com vários leitores e escritores simultâneos , o MongoDB vai permitir que os clientes possam ler os resultados de uma operação de escrita antes mesmo da operação de gravação ser efetuada.
Se o mongod termina antes do 
journal commit, mesmo que uma gravação retornar com êxito, as consultas devem ter lido os dados que não vai existir depois que os mongod for reiniciado.

Outros sistemas de banco de dados referem-se a essa semântica de isolamento como 
read uncommited. Para todas as inserções e atualizações, o MongoDB modifica cada documento isoladamente: os clientes nunca irão ver os documentos em estados intermediários. Para as operações de multi-documentos, MongoDB não fornece quaisquer transações ou isolamento multi-documentos.
Quando mongod retorna uma 
journaled write concern bem sucedida, os dados estão totalmente salvos no disco e estarão disponível logo após mongod ser reiniciado.
Para conjuntos de réplicas, as operações de gravação são duráveis somente depois de ter efetuada as gravações na maioria dos membros do conjunto de réplicas. MongoDB regularmente salva os dados no journal independentemente do 
journaled write concern: usam os 
commitIntervalMs para controlar quantas vezes um mongod salva no 
journal.

## O MongoDB requer quantidade alta de RAM?

Não necessariamente. É certamente possível executar MongoDB em uma máquina com uma pequena quantidade de RAM livre. O MongoDB usa automaticamente toda a memória livre na máquina como seu cache. Monitores de recursos do sistema mostram que o MongoDB usa muita memória, mas o seu uso é dinâmico. Se outro processo, de repente precisar de metade da RAM do servidor, MongoDB irá virtualizar memória cache para outros processo.

Tecnicamente, o subsistema de memória virtual do sistema operacional gerência a memória do MongoDB. Isto significa que MongoDB vai usar tanta memória livre quanto possível, trocando para o disco, se necessário. Implantações com memória suficiente para ajustar o funcionamento da aplicação quantos aos dados em memoria RAM podem alcançar uma melhoria de performance. aplicativo definidos na memória RAM vai alcançar o melhor desempenho.

## Como faço para configurar o tamanho do cache?

MongoDB não tem cache configurável. MongoDB usa automaticamente toda a memória livre no sistema por meio de arquivos de memória mapeada. Os sistemas operacionais utilizam a mesma abordagem nos seus sistemas de arquivo de cache.

## O MongoDB requer uma camada de cache separada para fazer cacheamento em nível de aplicação?

Não. No MongoDB, uma representação de documento no banco de dados é similar a representação na memória da aplicação. Insto significa que o banco de dados já armazena os dados de forma utilizável, fazendo com que estes dados possam ser usados tanto na persistência quanto para cache da aplicação. Isso elimina a necessidade de ter uma camada separada de cacheamento na aplicação.

Isso é diferente em banco de dados relacionais, onde o cacheamento de dados é mais caro. Banco de dados relacionais precisam transformar dados em representação de objetos para estas aplicações conseguirem ler, e precisam armazenar os dados transformados em um cache separado: se esta transformação dos dados para objetos da aplicação requerer 
joins, este processo aumenta o 
overhead relacionado ao uso do banco de dados o qual aumenta a importância de uma camada de cacheamento.

## O MongoDB lida com o cache?

Sim. O MongoDB mantém todos os dados mais recentes usados na RAM. Se você criou índices para suas consultas e seu conjunto de dados de trabalho se encaixa na RAM, MongoDB serve todas as consultas de memória.
O MongoDB não implementa cache de consulta: MongoDB serve todas as consultas diretamente dos índices e / ou arquivos de dados.

## As Escritas são gravadas imediatamente no disco ou são gravadas posteriormente?

As escritas são fisicamente gravadas no 
journal dentro de 100 milissegundos, por padrão. Nesse ponto, a escrita é "durável" no sentido de que, após um evento de 
pull-plug-from-wall, os dados ainda poderão ser recuperados após um reinício longo.

Enquanto a submissão do 
journal é quase instantânea, o MongoDB posteriormente escreve para os arquivos de dados. O MongoDB por padrão pode esperar mais de 1 minuto para escrever o dado para os arquivos de dados. Isso não afeta a durabilidade, já que o 
journal tem dados suficientes para assegurar a recuperação de falhas. Para mudar o intervalo de escrita no arquivo de dados, veja syncPeriodSecs.

## Em qual linguagem o MongoDB é implementado?

MongoDB é implementado em C++. 
Drivers e bibliotecas de terceiros são tipicamente escritas em suas respectivas linguagens, entretanto alguns 
drivers usam extensões em C para obter melhor performance.

## Quais são as limitações das versões do MongoDB 32-bits?

MongoDB usa arquivos de memória mapeada. Ao executar uma compilação 32 bits do MongoDB, o tamanho total de armazenamento para o servidor, incluindo os dados e os índices, é de 2 gigabytes. Por esta razão, não deve implantar MongoDB em produção em máquinas de 32 bits.

Se você estiver executando uma versão do MongoDB de 64 bits, não há praticamente nenhum limite para o tamanho de armazenamento. Para implantações em produção, compilações e sistemas operacionais em 64 bits são fortemente recomendados.

 

Bom, fiz esta tradução com pouco tempo, então desculpa se tiver alguma coisa traduzida estranhamente. Se tiver alguma sugestão de melhora, podem me enviar mensagens com correções/melhorias. Abraços e até a próxima!
