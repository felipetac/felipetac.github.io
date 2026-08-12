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

# Performance: pagina a home (site.posts crescia sem paginação, 88 posts numa página só)
gem 'jekyll-paginate-v2', '~> 3.0'
# Performance: adiciona loading="lazy" automaticamente em toda <img>/<iframe> gerada
gem 'jekyll-loading-lazy', '~> 0.1'

# Required for `jekyll serve` on Ruby >= 3.0, since webrick left the standard library
# and Jekyll 4 stopped bundling it.
gem 'webrick', '~> 1.8'
