# Blog Felipe Toscano

## Bibliotecas Utilizadas

- Gulp
- Stylus
- Live Search
- Minutes to Read
- Reading Progress Bar
 
 ![Progress Bar](http://res.cloudinary.com/dm7h7e8xj/image/upload/v1505357769/jekflix-progress-bar_he7gqf.jpg)
- "New Post" tag
- Load images on demand
- Emojis 😎
- Push Menu
- SVG icons
- Shell Script to create drafts and posts
- Tags page
- About page
- Contact page
- Feed RSS
- Sitemap.xml
- Info Customization
- Disqus
- Google Analytics

## Instalação

1. Instale o Jekyll (instale o ruby e rubygems. Depois use o comando `gem install jekyll`)
1. Faça um "Fork" do [Jekflix Template](https://github.com/thiagorossener/jekflix-template/fork)
1. Clone o repositório local na sua máquina
1. Edite `_config.yml` para personalizar seu site
1. Verifique o exemplo de postagem em `_posts` para exemplificar como preencher as categorias, tags, imagem e outros atributos YAML
1. Lembre-se de compilar os seus arquivos com o Gulp


## Configurações

Você precisa preencher algumas informações no `_config.yml` para customizar seu site.

```
# Site Settings
title: Felipe Toscano | Diário de Bordo na Web
email: youremail@xyz.com
description: Some text about your blog.
baseurl: "" # the subpath of your site, e.g. /blog/ or empty.
url: "https://felipe.github.io" # the base hostname & protocol for your site
google_analytics: "UA-XXXXXXXX-X"

# User settings
username: Thiago Rossener # it will appear on each page title after '|'
user_description: Some text about you.
disqus_username: disqus_username

# Social Media settings
# Remove the item if you don't need it
github_username: github_username
facebook_username: facebook_username
twitter_username: twitter_username
instagram_username: instagram_username
linkedin_username: linkedin_username
medium_username: medium_username
```

## Customização de Cores

Todas as variáveis de cores estão em [src/styl/_variables.styl](src/styl/_variables.styl).

Cores padrões:

![#ff0a16](https://placehold.it/15/ff0a16/000000?text=+) `#FF0A16` Theme Color

![#141414](https://placehold.it/15/141414/000000?text=+) `#141414` Primary Dark

![#ffffff](https://placehold.it/15/ffffff/000000?text=+) `#FFFFFF` Accent Dark

![#f2f2f2](https://placehold.it/15/f2f2f2/000000?text=+) `#F2F2F2` Light Gray

![#333333](https://placehold.it/15/333333/000000?text=+) `#333333` Texts

## Criandos Rascunhos "Drafts"

Você pode usar o `initdraft.sh` para criar seus novos rascunhos. Segue o comando:

```
./initdraft.sh -c Post Title
```

O novo arquivo será criado em `_drafts` como este formato `date-title.md`.

## Criando Postagens "Posts"

Você pode usar o `initpost.sh` para criar seus novas postagens. Segue o comando:

```
./initpost.sh -c Post Title
```

O novo arquivo será criado em `_posts` como este formato `date-title.md`.

## Front-matter 

Quando você cria uma nova postagem, você precisa inserir informações no front-matter, de acordo com o exemplo:

```
---
layout: post
title: "Welcome"
description: Lorem ipsum dolor sit amet, consectetur adipisicing elit.
image: 'http://res.cloudinary.com/dm7h7e8xj/image/upload/c_scale,w_760/v1504807239/morpheus_xdzgg1.jpg'
category: 'blog'
tags:
- blog
- jekyll
twitter_text: Lorem ipsum dolor sit amet, consectetur adipisicing elit.
introduction: Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
---
```

**O tamanho da sua imagem deverá ter a proporção de 600x315 para ter um boa apresentação na página principal.**

## Executar Localmente

Para compilar os arquivos e executar o Jekyll localmente você precisa seguir os seguintes passos:

- Instale o [NodeJS](https://nodejs.org/) (lembre-se de usar a versão mais atualizada)
- Execute `sudo npm install`
- Execute `sudo npm install -g gulp gulp-cli`
- Execute `sudo gulp`
