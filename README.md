# Site de portfólio OFFSET

Site estático em HTML, CSS e JavaScript, responsivo e inspirado no layout de referência enviado. Não usa framework, banco de dados ou sistema de pagamento.

## Como visualizar no computador
1. Descompacte o arquivo ZIP.
2. Abra `index.html` no navegador. Para um teste mais fiel, use a extensão **Live Server** no Visual Studio Code ou rode um servidor local simples.
3. Edite `index.html`, `styles.css` e `script.js` com um editor de texto ou o Visual Studio Code.

## Como colocar seus vídeos no portfólio
Abra `script.js` e edite a lista `projects` no começo do arquivo. Exemplo de YouTube:

```js
{ title: "Clipe da Banda", video: "https://www.youtube.com/watch?v=ID_DO_VIDEO", cover: "assets/capa-clipe.jpg", type: "youtube" }
```

Para um MP4 hospedado junto do site:

```js
{ title: "Campanha de verão", video: "assets/videos/campanha.mp4", cover: "assets/capa-campanha.jpg", type: "mp4" }
```

- Coloque as capas dentro da pasta `assets/`.
- Se `cover` ficar vazio, o cartão usa o laranja da identidade visual.
- Se `video` ficar vazio, o cartão abre uma mensagem explicando que falta configurar o link.
- Para vídeos longos ou muitos trabalhos, prefira YouTube/Vimeo não listado ou uma plataforma de vídeo. Evite enviar muitos arquivos MP4 pesados diretamente à hospedagem, pois podem consumir banda e espaço.

## Personalizações importantes antes de publicar
- Troque `assets/bastidores.jpg` pela foto real usada na seção “A OFFSET”. Se o arquivo não existir, aparece um fundo escuro.
- No botão “Confira mais do portfólio”, troque o endereço `https://www.instagram.com/` pelo link real do seu portfólio.
- Troque `https://wa.me/55SEUNUMERO` pelo WhatsApp da empresa, usando código do país + DDD + número, somente dígitos. Exemplo fictício: `https://wa.me/5511999999999`.
- Revise o texto institucional, título da página e descrição para mecanismos de busca.
- A fonte Montserrat é carregada do Google Fonts; se não houver internet, haverá fontes de substituição.

## Hospedagem
Como o projeto é estático, pode ser publicado em hospedagem estática gratuita, como Cloudflare Pages, Netlify, Vercel ou GitHub Pages. Para ligar domínio próprio, siga as instruções de DNS da plataforma escolhida. Confira os limites e termos atuais antes de publicar.

## Estrutura
- `index.html`: conteúdo e estrutura.
- `styles.css`: cores, layout, responsividade e aparência.
- `script.js`: cartões clicáveis, modal e reprodução de vídeos.
- `assets/`: fotos e capas.


## Fontes personalizadas
O site foi preparado para usar fontes locais, sem Google Fonts. A pasta `fonts/` contém as instruções e o CSS tem famílias tipográficas separadas por função. Para que as fontes apareçam exatamente como no seu design, coloque os arquivos de fonte licenciados na pasta usando os nomes listados em `fonts/LEIA-ME.txt`. Sem os arquivos reais, o navegador usa fontes de substituição.
