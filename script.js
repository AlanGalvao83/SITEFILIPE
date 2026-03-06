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
