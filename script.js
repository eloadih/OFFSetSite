/*
  PERSONALIZE AQUI:
  Edite os quatro projetos abaixo. O campo video deve ser o link direto do YouTube.
  Ao clicar em um cartão, o vídeo abre em uma nova aba; nenhum player é exibido no site.
  Se cover ficar vazio, o cartão usa o laranja da identidade visual.
*/
const projects = [
  { title: "POLLYANNA - É 1133, MINHA DEPUTADA FEDERAL", video: "https://www.youtube.com/watch?v=PY8XyDenqR0", cover: "https://i.ytimg.com/vi/PY8XyDenqR0/maxresdefault.jpg?sqp=-oaymwEmCIAKENAF8quKqQMa8AEB-AH-CYAC0AWKAgwIABABGH8gEyhRMA8=&rs=AOn4CLD5IzC31--SdElCcdCKj5rJc4IRrw" },
  { title: "VERSOS E PROMESSAS - FORRÓ DU MOMENTO | FEAT. ANA MÍRIAN (COVER)", video: "https://www.youtube.com/watch?v=qxMvhEtu1Mk", cover: "https://i.ytimg.com/vi_webp/qxMvhEtu1Mk/maxresdefault.webp" },
  { title: "CAVALO ALADO - EDY E NATHAN, MENINO DO IMBU (ACÚSTICO NA ROÇA)", video: "https://www.youtube.com/watch?v=xdvgd760C-o", cover: "https://i.ytimg.com/vi/xdvgd760C-o/maxresdefault.jpg?sqp=-oaymwEmCIAKENAF8quKqQMa8AEB-AH-CYAC0AWKAgwIABABGGUgTihBMA8=&rs=AOn4CLDihpFU6I69gk8wVHKSYVZIktCMaA" },
  { title: "BEDEU QUIRINO - CORAÇÃO QUE DÓI (CLIPE OFICIAL)", video: "https://www.youtube.com/watch?v=cqCQbdDygh0", cover: "https://i.ytimg.com/vi/cqCQbdDygh0/maxresdefault.jpg" }
];

const grid = document.querySelector("#video-grid");

function isValidYouTubeUrl(value) {
  try {
    const url = new URL(value);
    return ["youtube.com", "www.youtube.com", "m.youtube.com", "youtu.be", "www.youtu.be"].includes(url.hostname) && url.protocol === "https:";
  } catch {
    return false;
  }
}

projects.forEach((project) => {
  const card = document.createElement(project.video && isValidYouTubeUrl(project.video) ? "a" : "button");
  card.className = "video-card";
  if (card.tagName === "A") {
    card.href = project.video;
    card.target = "_blank";
    card.rel = "noopener noreferrer";
    card.setAttribute("aria-label", `Assistir ${project.title} no YouTube (abre em nova aba)`);
  } else {
    card.type = "button";
    card.setAttribute("aria-label", `${project.title} — link do YouTube ainda não configurado`);
    card.addEventListener("click", () => {
      alert("Este projeto ainda não tem um link do YouTube. Adicione a URL no arquivo script.js.");
    });
  }

  if (project.cover) {
    const safeCover = project.cover.replace(/["\\]/g, "");
    card.style.setProperty("--card-image", `url("${safeCover}")`);
  }

  const play = document.createElement("span");
  play.className = "play-icon";
  play.setAttribute("aria-hidden", "true");
  play.innerHTML = '<svg viewBox="0 0 24 24"><path d="M8 5.5c0-.8.9-1.3 1.6-.9l10 6.5a1.1 1.1 0 0 1 0 1.8l-10 6.5c-.7.4-1.6-.1-1.6-.9z"/></svg>';

  const name = document.createElement("span");
  name.className = "video-name";
  name.textContent = project.title;
  card.append(play, name);
  grid.append(card);
});

document.querySelector("#year").textContent = new Date().getFullYear();
