source 'https://rubygems.org'

gem 'jekyll', '~> 4.4'
gem 'jemoji', '~> 0.13'
gem 'rouge', '~> 4.0' # jekyll ~> 4.4 exige rouge >= 3.0, < 5.0 — não subir para 5.x

# SEO: title/description, Open Graph, Twitter Cards, canonical e JSON-LD via {% seo %}
gem 'jekyll-seo-tag', '~> 2.8'
# SEO: gera /sitemap.xml a partir de site.posts/site.pages
gem 'jekyll-sitemap', '~> 1.4'
# SEO: gera /feed.xml (Atom) e a tag {% feed_meta %}
gem 'jekyll-feed', '~> 0.17'

# Performance: pagina a home (site.posts crescia sem paginação, 88 posts numa página só).
# jekyll-paginate (clássico, não o -v2) de propósito: é o único gem de paginação na
# whitelist de plugins do build legado do GitHub Pages (pages.github.com/versions) — enquanto
# Settings → Pages → Source não virar "GitHub Actions" (ver CLAUDE.md), esse build legado ainda
# roda em paralelo ao nosso e ignora silenciosamente qualquer plugin fora da whitelist.
gem 'jekyll-paginate', '~> 1.1'
# Performance: adiciona loading="lazy" automaticamente em toda <img>/<iframe> gerada.
# Não está na whitelist acima — no build legado essa gem é ignorada (sem erro, só sem o
# atributo loading="lazy"); some de verdade só depois da troca manual do Source.
gem 'jekyll-loading-lazy', '~> 0.1'

# Required for `jekyll serve` on Ruby >= 3.0, since webrick left the standard library
# and Jekyll 4 stopped bundling it.
gem 'webrick', '~> 1.8'
