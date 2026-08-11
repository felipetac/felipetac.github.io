# CLAUDE.md

Site estático Jekyll — blog pessoal do Felipe Toscano, conteúdo em português (pt-BR), publicado em https://felipetoscano.com.br via GitHub Pages. Ver README.md para visão geral de stack e estrutura.

## Ambiente

Ruby/Bundler normalmente **não** está instalado neste tipo de sandbox — rode `ruby -v` antes de tentar buildar, em vez de assumir; sem sudo sem senha e sem headers de build (libssl-dev etc.) não dá pra compilar um Ruby aqui. Node **pode** ser obtido sem root via tarball portátil oficial (`nodejs.org/dist/`) — assim dá pra rodar `npm install`/`npx gulp <task>` de verdade para validar mudanças no gulpfile. Não há suíte de testes (`npm test` é um placeholder no-op). CI/deploy roda via `.github/workflows/jekyll-gh-pages.yml` (GitHub Actions) a cada push em `master`.

## Comandos

- `bundle exec jekyll serve` — build + servidor local, só o Jekyll (precisa da gem `webrick` no Gemfile em Ruby >= 3.0; já está lá)
- `gulp` — pipeline completo: compila Stylus (`src/styl` → `assets/css/main.css`), compila/concatena JS (`src/js` → `assets/js/main.js`), builda o Jekyll e sobe browser-sync com live-reload. Config em `gulpfile.mjs` (ESM, API do Gulp 5 — `gulp.series`/`gulp.parallel`, sem arrays de dependência do Gulp 3)
- `./initpost.sh -c Título` — cria `_posts/AAAA-MM-DD-titulo.md` com o front-matter padrão
- `./initdraft.sh -c Título` — mesma coisa em `_drafts/` (não publicado, ignorado pelo git)

## Estado das dependências (atualizado nesta sessão)

Gemfile e `package.json` foram levados às últimas versões disponíveis (Jekyll 4.4, Gulp 5, browser-sync 3, gulp-stylus 3 etc.) e o `gulpfile.js` (API do Gulp 3) foi reescrito como `gulpfile.mjs` (ESM, API do Gulp 5) — testado de ponta a ponta com Node 22 portátil (`js`, `stylus`, API do browser-sync). O lado Ruby **não foi testado localmente** (sem Ruby/sudo nesta sandbox) — `Gemfile.lock` foi removido de propósito porque um lock hand-crafted seria pouco confiável; `bundle install` (local ou no Actions via `ruby/setup-ruby` com `bundler-cache: true`) gera um novo do zero na próxima execução. Rode `bundle install && bundle exec jekyll build` localmente antes de confiar cegamente nisso.

- Jekyll 4 muda o parser padrão do Kramdown para GFM (tabelas, strikethrough, autolink de URLs cru). Não deve quebrar os 55 posts existentes (markdown simples), mas vale conferir visualmente alguns posts após o primeiro deploy.
- A tarefa `imagemin` do Gulp foi **removida** (não `gulpfile.mjs`): não processava nada (não existe `src/img/`) e sua cadeia de dependências (`gulp-imagemin` → `bin-build` → `decompress`) carregava uma vulnerabilidade crítica de escrita arbitrária de arquivo (Zip Slip). Não reintroduzir sem trocar por algo mantido (ex: `sharp`).
- `npm audit` ainda acusa ~13 vulnerabilidades (nenhuma crítica) presas em pacotes do ecossistema Stylus abandonados desde 2017-2019 (`kouto-swiss`, `autoprefixer-stylus`, `accord` do `gulp-stylus`) e na UI opcional do `browser-sync`. Isso não é bug de versão errada — a última versão publicada de cada um já carrega essas sub-dependências antigas fixas; só migrar para outra lib resolveria, o que é maior que um bump de dependências.
- Deploy só passa a usar o Jekyll novo depois que Settings → Pages → Source estiver em "GitHub Actions" no repositório (passo manual único, feito fora do git).

## Pontos de atenção (já causaram bugs reais neste repo)

- **`_config.yml` → `url:`**: precisa ficar descomentada, apontando para `https://felipetoscano.com.br`. Ficou comentada por acidente a partir de um commit de teste em 2019 e nunca foi revertida — quebrou silenciosamente `sitemap.xml`, `feed.xml`, as tags `canonical`/`og:url`/`twitter:image` e os botões de compartilhar (Twitter/Facebook), que dependem de `site.url`. Corrigido nesta sessão; não comentar essa linha de novo.
- **Front-matter `category:` dos posts**: as páginas de arquivo (`bd.html`, `dev.html`, `ciencia-de-dados.html`, `github.html`) filtram com `{% if post.category == page.category %}` — comparação exata e sensível a maiúsculas/acentos/whitespace. Um post com `category: 'Ciência de Dados'` (maiúsculo) já ficou de fora da listagem porque a página usa `'ciência de dados'` minúsculo. Usar sempre um destes valores exatos: `bd`, `dev`, `ciência de dados`, `github`.
- **Final de linha (CRLF) em posts antigos**: 11 posts da série MongoDB (2014-2015) tinham o arquivo inteiro em CRLF, o que contaminava o valor de `category:` com um `\r` invisível e os sumia da respectiva página de arquivo — mesmo efeito do bug acima, só que invisível ao abrir o arquivo. Já normalizados para LF nesta sessão. Manter LF em posts novos/editados.
- **`assets/css/` e `assets/js/` são compilados a partir de `src/` e versionados no git.** O workflow de deploy builda só o Jekyll — nunca roda `gulp`. Depois de editar `src/styl/` ou `src/js/`, rodar `gulp` localmente e commitar os arquivos gerados em `assets/`, senão o site publicado não reflete a mudança.
- **Gems fixadas no Gemfile precisam respeitar os `depends_on` das gems que já as puxam transitivamente.** `jekyll ~> 4.4` já depende de `rouge >= 3.0, < 5.0`; fixar `gem 'rouge', '~> 5.1'` no Gemfile (feito sem `bundle install` local para validar, já que não há Ruby na sandbox) quebrou `bundle lock` no CI com "Could not find compatible versions" — corrigido para `~> 4.0`. Antes de fixar/subir a versão de uma gem que outra gem do Gemfile já depende transitivamente (hoje: `rouge` via `jekyll`), conferir a constraint da gem "pai" (`gem info <gem> --remote` ou a página da gem no RubyGems) em vez de só pegar a última versão publicada.
- Dependências (Gemfile e `package.json`) foram atualizadas para as últimas versões em 2026-08 — ver seção "Estado das dependências" acima antes de propor outro bump.

## Estrutura

- `_config.yml` — config central (título, autor, redes sociais, menu de navegação, Analytics)
- `_posts/` — posts publicados · `_drafts/` — rascunhos (gitignored)
- `_layouts/`, `_includes/` — templates Liquid
- `_data/locales/pt.yml` — nomes de dias/meses em pt-BR, usado por `_includes/date.html`
- `src/styl/`, `src/js/` — fontes do pipeline Gulp/Stylus (ver ponto de atenção acima)
- `bd.html` / `dev.html` / `ciencia-de-dados.html` / `github.html` / `tags.html` — páginas de arquivo por categoria/tag
- `about.md` (`/sobre-mim/`) — bio pessoal, `contact.md` (`/contato/`) — formulário via Formspree
- `.github/workflows/jekyll-gh-pages.yml` — build (Jekyll) + deploy (GitHub Pages) via Actions

## Idioma

Conteúdo do blog é 100% em português (pt-BR); layouts usam `lang="pt-BR"`. Texto gerado para o site (posts, mensagens de UI, commits de conteúdo) deve ser em português.
