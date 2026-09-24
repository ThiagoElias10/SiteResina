# Encanto em Resina — Catálogo

Catálogo/vitrine de produtos artesanais em resina e cadernos Domino personalizados.

## Sobre

Loja de produtos artesanais feitos à mão: artigos em resina epóxi, cadernos Domino decorados, canetas e acessórios personalizados.

## Como usar

Abra o `html/index.html` no navegador. Não precisa de servidor.

## Funcionalidades

- Catálogo de produtos com busca
- Filtro por categoria (Resina, Cadernos Domino, Canetas e Marcadores, Acessórios, Personalizados)
- Detalhe do produto em modal
- Botão de pedido pelo WhatsApp
- Produtos salvos no navegador (localStorage)

## Como personalizar

### WhatsApp

Edite a constante `WHATSAPP` no `js/index.js` (formato: DDI + DDD + número, ex.: `5511999888777`).

### Cores e estilo

Altere as variáveis em `:root` no `css/style.css` (papel, café espresso, dourado, terracota).

### Produtos

Edite o array `PRODUTOS_BASE` no `js/index.js`. Cada produto tem: id, nome, categoria, descricao, preco, tags, emoji, `imagem` e opcionalmente `oldPreco` (para exibir preço riscado de oferta).

### Fotos dos produtos

As fotos ilustrativas ficam em `html/img/produtos/produto1.jpg` ... `produto13.jpg` (mesmo número do `id`). Para usar suas próprias fotos, sobrescreva os arquivos com o mesmo nome — o emoji aparece automaticamente como fallback se a foto não carregar.

### Fotos de fundo

As flores de fundo (cornflower azul e rosa) são carregadas do Wikimedia Commons via `--flor-azul` e `--flor-rosa` no CSS. Para usar imagens locais, baixe-as e aponte para `url('../img/...')`.

### Foto da autora

Coloque a foto em `html/img/autora.jpg`. Enquanto não houver foto, um placeholder é exibido automaticamente.

## Publicar

- GitHub Pages (branch `main`, pasta `/docs` ou root)
- Netlify, Vercel ou outra hospedagem estática

## Licença

Todos os direitos reservados.