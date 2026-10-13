/* =========================================================
   OFFSET — interações e conteúdo do portfólio
   ========================================================= */

/* Edite os projetos aqui: use o link do YouTube e a URL da capa. */
const projects = [
  { title: "POLLYANNA - É 1133, MINHA DEPUTADA FEDERAL", video: "https://www.youtube.com/watch?v=PY8XyDenqR0", cover: "https://i.ytimg.com/vi/PY8XyDenqR0/maxresdefault.jpg" },
  { title: "VERSOS E PROMESSAS - FORRÓ DU MOMENTO | FEAT. ANA MÍRIAN (COVER)", video: "https://www.youtube.com/watch?v=qxMvhEtu1Mk", cover: "https://i.ytimg.com/vi/qxMvhEtu1Mk/maxresdefault.jpg" },
  { title: "CAVALO ALADO - EDY E NATHAN, MENINO DO IMBU (ACÚSTICO NA ROÇA)", video: "https://www.youtube.com/watch?v=xdvgd760C-o", cover: "https://i.ytimg.com/vi/xdvgd760C-o/maxresdefault.jpg" },
  { title: "BEDEU QUIRINO - CORAÇÃO QUE DÓI (CLIPE OFICIAL)", video: "https://www.youtube.com/watch?v=cqCQbdDygh0", cover: "https://i.ytimg.com/vi/cqCQbdDygh0/maxresdefault.jpg" }
];

document.addEventListener("DOMContentLoaded", () => {
  initIntroAnimation();
  initHorizontalCatalogs();
  initSectionGifs();
  initIntroScrollHint();
  renderProjects();
  setCurrentYear();
});

/* Abertura: a logo some, THIS IS OFFSET aparece e, ao fim, a página continua. */
function initIntroAnimation() {
  const intro = document.getElementById("inicio") || document.getElementById("offset-intro");
  const logo = document.getElementById("intro-logo");
  const title = document.getElementById("intro-title");

  if (!intro || !logo || !title) return;

  let frameRequested = false;

  function updateIntro() {
    const introTop = intro.getBoundingClientRect().top + window.scrollY;
    const scrollDistance = Math.max(1, intro.offsetHeight - window.innerHeight);
    const progress = Math.min(1, Math.max(0, (window.scrollY - introTop) / scrollDistance));

    // A logo desaparece nos primeiros 30% da rolagem da abertura.
    const logoProgress = Math.min(1, progress / 0.30);
    const logoOpacity = 1 - logoProgress;
    logo.style.opacity = String(logoOpacity);
    logo.style.transform = `scale(${1 + logoProgress * 0.10})`;
    logo.style.filter = `blur(${logoProgress * 2}px)`;
    logo.style.visibility = logoOpacity <= 0.01 ? "hidden" : "visible";

    // O título entra logo depois da logo e permanece até o fim da abertura.
    const titleProgress = Math.min(1, Math.max(0, (progress - 0.18) / 0.28));
    title.style.opacity = String(titleProgress);
    title.style.transform = `translateY(${(1 - titleProgress) * 32}px)`;
    title.style.visibility = titleProgress <= 0.01 ? "hidden" : "visible";
    title.setAttribute("aria-hidden", titleProgress < 0.5 ? "true" : "false");

    frameRequested = false;
  }

  function scheduleUpdate() {
    if (frameRequested) return;
    frameRequested = true;
    window.requestAnimationFrame(updateIntro);
  }

  window.addEventListener("scroll", scheduleUpdate, { passive: true });
  window.addEventListener("resize", scheduleUpdate);
  window.addEventListener("load", scheduleUpdate, { once: true });
  updateIntro();
}

/* Botões de navegação dos catálogos horizontais. */
function initHorizontalCatalogs() {
  bindCatalog("#photo-track", ".photo-prev", ".photo-next");
  bindCatalog("#political-video-track", ".video-prev", ".video-next");
}

function bindCatalog(trackSelector, previousSelector, nextSelector) {
  const track = document.querySelector(trackSelector);
  const previous = document.querySelector(previousSelector);
  const next = document.querySelector(nextSelector);
  if (!track || !previous || !next) return;

  const amount = () => Math.max(track.clientWidth * 0.8, 180);
  const behavior = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";

  previous.addEventListener("click", () => track.scrollBy({ left: -amount(), behavior: behavior() }));
  next.addEventListener("click", () => track.scrollBy({ left: amount(), behavior: behavior() }));
}

/* Carrega os GIFs quando a seção entra na tela e reinicia ao sair dela. */
function initSectionGifs() {
  const sections = [
    document.getElementById("videos-politicos"),
    document.getElementById("after")
  ].filter(Boolean);

  if (!("IntersectionObserver" in window)) {
    document.querySelectorAll("img[data-gif]").forEach((image) => {
      image.src = image.dataset.gif;
    });
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      entry.target.querySelectorAll("img[data-gif]").forEach((image) => {
        if (entry.isIntersecting) {
          if (!image.getAttribute("src")) image.src = image.dataset.gif;
        } else if (image.hasAttribute("src")) {
          image.removeAttribute("src");
        }
      });
    });
  }, { threshold: 0.12, rootMargin: "80px 0px" });

  sections.forEach((section) => observer.observe(section));
}

/* Esconde a instrução de rolagem com fade quando A OFFSET aparece. */
function initIntroScrollHint() {
  const hint = document.querySelector(".intro-scroll");
  const about = document.getElementById("sobre");
  if (!hint || !about || !("IntersectionObserver" in window)) return;

  const observer = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
      hint.classList.add("is-hidden");
      observer.disconnect();
    }
  }, { threshold: 0.08 });

  observer.observe(about);
}

/* Renderiza os cartões de videoclipes a partir do array projects. */
function renderProjects() {
  const grid = document.querySelector("#video-grid");
  if (!grid) return;

  const fragment = document.createDocumentFragment();

  projects.forEach((project) => {
    const validUrl = isValidYouTubeUrl(project.video);
    const card = document.createElement(validUrl ? "a" : "button");
    card.className = "video-card";

    if (validUrl) {
      card.href = project.video;
      card.target = "_blank";
      card.rel = "noopener noreferrer";
      card.setAttribute("aria-label", `Assistir ${project.title} no YouTube (abre em nova aba)`);
    } else {
      card.type = "button";
      card.setAttribute("aria-label", `${project.title} — link do YouTube não configurado`);
      card.addEventListener("click", () => window.alert("Adicione um link válido do YouTube no arquivo script.js."));
    }

    if (project.cover && isSafeImageUrl(project.cover)) {
      card.style.setProperty("--card-image", `url("${project.cover.replace(/["\\\\]/g, "")}")`);
    }

    const play = document.createElement("span");
    play.className = "play-icon";
    play.setAttribute("aria-hidden", "true");
    play.innerHTML = '<svg viewBox="0 0 24 24" focusable="false"><path d="M8 5.5c0-.8.9-1.3 1.6-.9l10 6.5a1.1 1.1 0 0 1 0 1.8l-10 6.5c-.7.4-1.6-.1-1.6-.9z"/></svg>';

    const name = document.createElement("span");
    name.className = "video-name";
    name.textContent = project.title;

    card.append(play, name);
    fragment.append(card);
  });

  grid.replaceChildren(fragment);
}

function isValidYouTubeUrl(value) {
  try {
    const url = new URL(value);
    const hosts = ["youtube.com", "www.youtube.com", "m.youtube.com", "youtu.be", "www.youtu.be"];
    return url.protocol === "https:" && hosts.includes(url.hostname);
  } catch {
    return false;
  }
}

function isSafeImageUrl(value) {
  try {
    return new URL(value).protocol === "https:";
  } catch {
    return false;
  }
}

function setCurrentYear() {
  const year = document.querySelector("#year");
  if (year) year.textContent = String(new Date().getFullYear());
}
