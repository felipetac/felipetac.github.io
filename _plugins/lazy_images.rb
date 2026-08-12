# Adiciona os atributos nativos de carregamento lazy às tags <img> do HTML já
# renderizado de posts/páginas que ainda não os declaram: loading="lazy" e
# decoding="async". Cobre as imagens inseridas via Markdown no corpo dos posts
# (`![alt](src)`, locais ou hotlinked de CDNs externos), que não têm como
# receber o atributo direto na sintaxe do Kramdown. Tags que já definem loading
# explicitamente nos templates (post-cover, avatar do autor) não são tocadas,
# pois o regex só casa <img> sem esse atributo.
#
# Atenção: a primeira linha deste arquivo não pode conter o texto "coding="
# (ex.: "decoding=") — o parser do Ruby escaneia a 1ª linha de comentário
# atrás de um magic comment de encoding (`# coding: xxx`), acha "coding="
# dentro de "decoding=" e tenta usar o que vem depois como nome de encoding,
# quebrando o build com "unknown encoding name" antes mesmo de rodar o código.
module LazyImages
  IMG_WITHOUT_LOADING = /<img\b(?![^>]*\bloading=)([^>]*)>/i.freeze

  def self.add_lazy_loading(html)
    html.gsub(IMG_WITHOUT_LOADING) { %(<img#{Regexp.last_match(1)} loading="lazy" decoding="async">) }
  end
end

Jekyll::Hooks.register [:documents, :pages], :post_render do |item|
  next unless item.output_ext == '.html'

  item.output = LazyImages.add_lazy_loading(item.output)
end
