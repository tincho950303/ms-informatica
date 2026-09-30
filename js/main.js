// MS Servicio PC — config + interacciones (estático, sin backend)
//
// ANTI-SPAM: el número y el email están fragmentados y se ensamblan
// en tiempo de ejecución. Nunca aparecen completos en el HTML ni en
// una sola línea del código, para frenar scrapers básicos.
// Para cambiarlos, editá solo los fragmentos de abajo.
const _WA = ["54", "22", "13", "592", "017"]; // se une → número wa.me
const _MAIL_U = ["carlosmartin", "_sosapa", "ez"]; // usuario
const _MAIL_D = ["hot", "mail", ".com"]; // dominio

const SITE = {
  get whatsapp() { return _WA.join(""); },
  get displayPhone() {
    const w = _WA.join("");
    return `+${w.slice(0, 2)} ${w.slice(2, 5)} ${w.slice(5, 8)} ${w.slice(8)}`;
  },
  get email() { return _MAIL_U.join("") + "@" + _MAIL_D.join(""); },
  zona: "La Plata, Berisso, Ensenada y alrededores",
  horario: "Lun a Sáb · 9:00 a 19:00",
};

function waLink(texto) {
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(texto)}`;
}

document.addEventListener("DOMContentLoaded", () => {
  // Año dinámico
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // Links configurables
  document.querySelectorAll("[data-wa]").forEach((a) => {
    const msg = a.getAttribute("data-wa") || "Hola, quiero un presupuesto para mi PC.";
    a.href = waLink(msg);
    a.target = "_blank";
    a.rel = "noopener";
  });
  document.querySelectorAll("[data-email]").forEach((a) => {
    a.href = `mailto:${SITE.email}?subject=${encodeURIComponent("Presupuesto — MS Servicio PC")}`;
  });
  document.querySelectorAll("[data-email-text]").forEach((el) => {
    el.textContent = SITE.email;
  });
  document.querySelectorAll("[data-phone-display]").forEach((el) => {
    el.textContent = SITE.displayPhone;
  });

  // Nav mobile
  const toggle = document.getElementById("navToggle");
  const nav = document.getElementById("nav");
  if (toggle && nav) {
    toggle.addEventListener("click", () => nav.classList.toggle("open"));
    nav.querySelectorAll("a").forEach((l) => l.addEventListener("click", () => nav.classList.remove("open")));
  }

  // Filtros de servicios
  const btns = document.querySelectorAll(".filter-btn");
  const cards = document.querySelectorAll(".card[data-cat]");
  btns.forEach((b) =>
    b.addEventListener("click", () => {
      btns.forEach((x) => x.classList.remove("active"));
      b.classList.add("active");
      const f = b.dataset.filter;
      cards.forEach((c) => {
        c.style.display = f === "todos" || c.dataset.cat === f ? "" : "none";
      });
    })
  );

  // Formulario → abre WhatsApp con mensaje armado (no requiere backend)
  const form = document.getElementById("contactForm");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const nombre = document.getElementById("f-nombre").value.trim();
      const tel = document.getElementById("f-tel").value.trim();
      const serv = document.getElementById("f-serv").value;
      const msg = document.getElementById("f-msg").value.trim();
      const texto = `Hola, soy ${nombre} (${tel}). Me interesa: ${serv}. Detalle: ${msg}`;
      window.open(waLink(texto), "_blank", "noopener");
    });
  }

  // Reveal on scroll
  const io = new IntersectionObserver(
    (entries) => entries.forEach((en) => en.isIntersecting && en.target.classList.add("visible")),
    { threshold: 0.12 }
  );
  document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
});
