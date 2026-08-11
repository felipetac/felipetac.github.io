# Blog do Felipe Toscano

Blog pessoal do [Felipe Toscano](https://www.linkedin.com/in/felipetac) — publicado em [felipetoscano.com.br](https://felipetoscano.com.br) — com conteúdo em português sobre desenvolvimento de software, banco de dados e ciência de dados.

Site estático gerado com Jekyll, baseado no [Jekflix Template](https://github.com/thiagorossener/jekflix-template) de Thiago Rossener.

## Stack

- **Jekyll ~> 4.4** (Ruby) — geração do site estático
- **Gulp 5 + Stylus** — pipeline de assets (CSS/JS), `gulpfile.mjs` (ESM)
- **GitHub Actions** (`.github/workflows/jekyll-gh-pages.yml`) — builda e publica no GitHub Pages a cada push em `master`
- **Disqus** — comentários nos posts
- **Google Analytics (GA4)** — métricas
- **Formspree** — envio do formulário de contato

## Dependências

Gemfile e `package.json` apontam para as últimas versões estáveis disponíveis (Jekyll 4.4, Gulp 5, browser-sync 3, etc.).

- A tarefa `imagemin` do Gulp foi removida: não havia nenhum arquivo em `src/img/` para ela processar (tarefa morta), e a cadeia de dependências do `gulp-imagemin` (via `bin-build`/`decompress`) tinha uma vulnerabilidade crítica de escrita arbitrária de arquivo. Se um dia for necessário otimizar imagens, prefira uma ferramenta mantida atualmente (ex: `sharp`) em vez de reintroduzir esse pacote.
- `npm audit` ainda acusa ~13 vulnerabilidades vindas de pacotes do ecossistema Stylus sem manutenção desde 2017-2019 (`kouto-swiss`, `autoprefixer-stylus`, o `accord` usado pelo `gulp-stylus`) e da UI opcional do `browser-sync`. Não são coisa que dá pra resolver trocando de versão — a própria "última versão" de cada um já carrega essas dependências antigas fixas. São todas `devDependencies` (uso só em build local, nunca vão para o site publicado); resolver de verdade exigiria trocar essas libs por alternativas mantidas, o que é uma migração maior, não um bump de versão.

## Estrutura

```
_config.yml          Configuração do site (título, autor, redes sociais, menu, analytics)
_posts/               Artigos publicados (AAAA-MM-DD-titulo.md)
_drafts/               Rascunhos, não versionados (ver .gitignore)
_layouts/, _includes/  Templates Liquid
_data/locales/pt.yml   Nomes de dias/meses em português (usado na formatação de datas)
src/styl/, src/js/     Fontes de estilo (Stylus) e script — compilados para assets/css e assets/js
assets/                 CSS/JS/imagens já compilados, versionados no git
bd.html, dev.html,     Páginas de arquivo por categoria
ciencia-de-dados.html,
github.html
tags.html               Página com todas as tags
about.md                Página "Sobre mim" (/sobre-mim/)
contact.md              Página "Contato" (/contato/)
initpost.sh, initdraft.sh  Scripts para criar novos posts/rascunhos
```

## Rodando localmente

Requer Ruby + Bundler e Node 18+ (testado com Node 22) + Gulp.

```bash
bundle install

npm install
npm install -g gulp-cli

gulp
```

`bundle install` sem um `Gemfile.lock` no repo vai resolver e criar um do zero na primeira vez — commite o resultado depois.

`gulp` compila Stylus e JS, builda o Jekyll e sobe um servidor local com live-reload (browser-sync). O gulpfile é `gulpfile.mjs` (ESM); o Gulp CLI descobre ele automaticamente, não precisa apontar o caminho.

Alternativamente, só o Jekyll, sem o pipeline de assets:

```bash
bundle exec jekyll serve
```

## Criando um post

```bash
./initpost.sh -c Título do Post
```

Cria `_posts/AAAA-MM-DD-titulo-do-post.md` com o front-matter padrão:

```yaml
---
layout: post
title: "Título do Post"
date: AAAA-MM-DD HH:MM:SS
image: ''
description:
category: ''
tags:
twitter_text:
introduction:
---
```

Use `./initdraft.sh -c Título` para criar em `_drafts/` em vez de `_posts/` (não é publicado até ser movido).

**Categoria**: o campo `category:` precisa bater exatamente (acentos e caixa incluídos) com uma das páginas de arquivo existentes: `bd`, `dev`, `ciência de dados` ou `github`. Um valor diferente faz o post não aparecer na respectiva página `/categoria/...`, embora ele continue aparecendo normalmente na home.

**Imagem de capa**: proporção recomendada de 600x315 para boa apresentação na página principal.

## Deploy

Publicação via GitHub Actions (`.github/workflows/jekyll-gh-pages.yml`): todo push em `master` builda o site com o Jekyll do `Gemfile` e publica no GitHub Pages. O domínio customizado vem do arquivo `CNAME`.

> **Passo único necessário no GitHub**: em Settings → Pages, o campo "Source" precisa estar em **"GitHub Actions"** (não "Deploy from a branch"). Sem isso o workflow builda mas o Pages continua servindo o build legado antigo.

Os arquivos em `assets/css/` e `assets/js/` (gerados a partir de `src/`) continuam versionados no git — o workflow de deploy não roda `gulp`, então eles precisam ser recompilados localmente com `gulp` e commitados sempre que algo em `src/styl/` ou `src/js/` mudar.

## Licença

[MIT](LICENSE). Baseado no [Jekflix Template](https://github.com/thiagorossener/jekflix-template) de Thiago Rossener.
