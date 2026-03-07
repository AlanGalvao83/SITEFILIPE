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

const formOrcamento = document.getElementById("formOrcamento");
const formStatus = document.getElementById("formStatus");

if (formOrcamento) {
  formOrcamento.addEventListener("submit", (event) => {
    event.preventDefault();

    const nome = document.getElementById("nome")?.value.trim() ?? "";
    const telefone = document.getElementById("telefone")?.value.trim() ?? "";
    const servico = document.getElementById("servico")?.value.trim() ?? "";
    const mensagem = document.getElementById("mensagem")?.value.trim() ?? "";

    if (!nome || !telefone || !mensagem) {
      if (formStatus) {
        formStatus.textContent = "Preencha nome, telefone e mensagem para enviar.";
        formStatus.classList.add("erro");
      }
      return;
    }

    const assunto = "Solicitação de orçamento - PROTEGE engenharia de incêndio";
    const texto = [
      "Olá, equipe PROTEGE engenharia de incêndio.",
      "",
      "Gostaria de solicitar um orçamento com os dados abaixo:",
      `Nome: ${nome}`,
      `Telefone: ${telefone}`,
      `Serviço de interesse: ${servico}`,
      `Mensagem: ${mensagem}`
    ].join("\n");

    const emailUrl = `mailto:protege.incendiodf@gmail.com?subject=${encodeURIComponent(assunto)}&body=${encodeURIComponent(texto)}`;
    const whatsappUrl = `https://wa.me/556183521104?text=${encodeURIComponent(texto)}`;

    if (formStatus) {
      formStatus.textContent = "Abrindo envio por WhatsApp e e-mail...";
      formStatus.classList.remove("erro");
    }

    window.open(whatsappUrl, "_blank", "noopener");
    window.location.href = emailUrl;
  });
}
