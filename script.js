const menuMobile = document.getElementById("menuMobile");
const menu = document.getElementById("menu");
const anoAtual = document.getElementById("anoAtual");

if (menuMobile && menu) {
  menuMobile.addEventListener("click", () => {
    menu.classList.toggle("ativo");
  });

  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menu.classList.remove("ativo");
    });
  });
}

if (anoAtual) {
  anoAtual.textContent = String(new Date().getFullYear());
}

const carroceis = document.querySelectorAll("[data-carrocel]");

carroceis.forEach((carrocel) => {
  const trilha = carrocel.querySelector(".carrocel-trilha");
  const slides = Array.from(carrocel.querySelectorAll(".carrocel-slide"));
  const botaoPrev = carrocel.querySelector(".carrocel-prev");
  const botaoNext = carrocel.querySelector(".carrocel-next");
  const indicadores = carrocel.querySelector(".carrocel-indicadores");

  if (!trilha || !slides.length || !botaoPrev || !botaoNext || !indicadores) {
    return;
  }

  let indiceAtual = 0;
  let intervalo = null;

  const atualizarCarrocel = () => {
    trilha.style.transform = `translateX(-${indiceAtual * 100}%)`;
    indicadores.querySelectorAll(".carrocel-indicador").forEach((item, indice) => {
      item.classList.toggle("ativo", indice === indiceAtual);
    });
  };

  const irPara = (indice) => {
    indiceAtual = (indice + slides.length) % slides.length;
    atualizarCarrocel();
  };

  slides.forEach((_, indice) => {
    const indicador = document.createElement("button");
    indicador.type = "button";
    indicador.className = "carrocel-indicador";
    indicador.ariaLabel = `Ir para imagem ${indice + 1}`;
    indicador.addEventListener("click", () => irPara(indice));
    indicadores.append(indicador);
  });

  botaoPrev.addEventListener("click", () => irPara(indiceAtual - 1));
  botaoNext.addEventListener("click", () => irPara(indiceAtual + 1));

  const iniciarAutoplay = () => {
    if (intervalo) {
      clearInterval(intervalo);
    }
    intervalo = window.setInterval(() => {
      irPara(indiceAtual + 1);
    }, 4500);
  };

  const pararAutoplay = () => {
    if (intervalo) {
      clearInterval(intervalo);
    }
  };

  carrocel.addEventListener("mouseenter", pararAutoplay);
  carrocel.addEventListener("mouseleave", iniciarAutoplay);

  atualizarCarrocel();
  iniciarAutoplay();
});
