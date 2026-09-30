# MS Servicio PC — Soluciones Informáticas (La Plata)

Vidriera estática para servicio técnico de PC y notebooks: hardware + software. Objetivo: que te escriban por WhatsApp.

**Zona:** La Plata, Berisso, Ensenada y alrededores · **Horario:** Lun–Sáb 9–19h

## Estructura

```
./
├── index.html        # Landing completa (única página)
├── css/styles.css    # Estilos consolidados (mobile-first)
├── js/main.js        # SITE config + nav + filtros + form→WhatsApp
├── img/              # Logos y fotos
├── render.yaml       # Config Render Static Site
├── package.json      # Scripts dev (serve / lint / format)
└── AGENTS.md         # Guía para agentes IA
```

## Cambiar tus datos (importante)

Todo el contacto sale de `js/main.js` → objeto `SITE`:

```js
const SITE = {
  whatsapp: "542213592017",
  displayPhone: "+54 221 359 2017",
  email: "carlosmartin_sosapaez@hotmail.com",
  ...
};
```

Cambiá el número ahí y todos los botones/form/flotante se actualizan solos.

## Dev local

```bash
npx serve .
# o
python -m http.server 8000
# abrir http://localhost:8000
```

## Deploy en Render (Static Site, gratis)

Opción A — con `render.yaml`:
1. Subí el repo a GitHub.
2. Render → New → Blueprint → elegí el repo (lee `render.yaml`).
3. Deploy. Listo.

Opción B — manual:
1. Render → New → Static Site → conectar repo.
2. Branch: `main` · Build Command: *(vacío)* o `echo "Static site"` · Publish Directory: `./`.

## Git desde cero (este proyecto aún no estaba versionado)

```bash
cd "MS Servicio PC"
git init -b main
git add .
git commit -m "Vidriera MS Servicio PC: landing + contacto WhatsApp lista para Render"
git remote add origin https://github.com/TU_USUARIO/ms-servicio-pc.git
git push -u origin main
```

## Notas

- Sitio 100% estático, sin backend. El formulario arma un mensaje y abre WhatsApp.
- Precios en ARS orientativos, se confirman por chat.
- SEO básico + JSON-LD LocalBusiness incluidos.
