# AGENTS.md — MS Servicio PC

> Guía viva para agentes IA y humanos que toquen este repo. Mantener actualizada en cada cambio.

## 1. Qué es
Vidriera estática de **Soluciones Informáticas MS** (Martín Sosapaez). Reparación PC/notebooks hardware + software en **La Plata, Berisso, Ensenada y alrededores**. Objetivo único: **conversión a WhatsApp / email**.

## 2. Stack real (no inventar otro)
- Estático puro: `index.html` + `css/styles.css` + `js/main.js`. Sin framework, sin build, sin backend.
- Deploy: **Render Static Site**, `staticPublishPath: ./`. `render.yaml` en raíz.
- Dev: `npx serve .` o `python -m http.server 8000`.
- Fuentes: Google Fonts (Poppins + Inter). Imágenes en `img/`.

## 3. Estructura vigente
```
index.html       # única página: header, hero, #servicios, #nosotros, #proceso, #opiniones, #zona, #faq, #contacto, footer, botón flotante
css/styles.css   # ÚNICO css usado. No usar css/estilos*.css, header.css, main.css (legacy, eliminar si reaparecen)
js/main.js       # ÚNICO js. Contiene SITE config. No usar app.js legacy.
img/             # logo3.svg (logo), foto1.png, arreglo1.png, etc.
render.yaml      # blueprint Render
package.json     # solo scripts dev/lint
README.md        # guía humana
```
- Archivos legacy eliminados: `admin.html`, `app.js`, `css/estilos.css`, `css/estilos2.css`, `css/header.css`, `css/main.css`. **No recrearlos.** Si un agente los ve en historial, ignorarlos.

## 4. Fuente de verdad de contacto (NO hardcodear en HTML)
`js/main.js` → `const SITE = { whatsapp, displayPhone, email, zona, horario }`.
- HTML usa atributos `data-wa="mensaje"` y `data-email`, `data-phone-display`. El JS genera los `https://wa.me/...`.
- Para cambiar número/email: editar SOLO `SITE`. Nunca esparcir el número a mano por el HTML.
- Actual: `whatsapp: 542213592017`, `email: carlosmartin_sosapaez@hotmail.com`, zona La Plata/Berisso/Ensenada, Lun–Sáb 9–19h.

## 5. Secciones y reglas de edición
- `#servicios`: cards con `data-cat="mantenimiento|software|hardware|armado|domicilio"`. Si agregás un servicio, poné categoría válida (filtros en `.filter-btn`) y `data-wa` con mensaje prellenado.
- Precios: texto simple en `.card-price`, formato `$XX.XXX ARS` o rango. Agregar nota en `.note` si son orientativos.
- `#contacto`: formulario SIN backend — arma texto y abre WhatsApp. No agregar fetch ni API sin pedirlo.
- Mapa: iframe Google embed `q=La+Plata`. No requiere API key.
- SEO: mantener `<title>`, meta description, OG y JSON-LD LocalBusiness sincronizados si cambia teléfono/zona.

## 6. Estilo / UX
- Paleta dark + acento verde `#00e676` (`css/styles.css :root`). Mobile-first. Breakpoints 900px y 560px.
- Clases: `.btn-whatsapp`, `.btn-ghost`, `.card`, `.panel`, `.reveal` (IntersectionObserver en main.js).
- Accesibilidad mínima: `alt` en imgs, `aria-label` en flotante/toggle, contraste en botones.

## 7. Comandos
```bash
npx serve .                    # dev
python -m http.server 8000     # dev alternativo
npm run build                  # no-op (echo), solo para Render si pide build
npx prettier --write "**/*.{html,css,js,json,md}"
```

## 8. Deploy Render
- Blueprint: Render → New → Blueprint → repo (lee `render.yaml`). O manual Static Site, Publish `./`, Build vacío.
- Verificar post-deploy: botones WhatsApp abren `wa.me/542213592017`, form arma mensaje, anclas `#servicios #contacto` funcionan, mapa carga.

## 9. Git
- Repo nuevo, rama `main`. Commits en español, concisos. No commitear `node_modules/`, `.env`, `*.drawio`, `*.pdf` (ver `.gitignore`).
- Remote esperado: `https://github.com/TU_USUARIO/ms-servicio-pc.git` — actualizar en `package.json` + `render.yaml:repo` cuando exista el real.

## 10. Qué NO hacer
- No agregar backend, npm start server, ni dependencias de runtime (solo devDeps `serve/prettier`).
- No duplicar CSS/JS (un solo styles.css / main.js).
- No exponer datos personales nuevos sin consentimiento. WhatsApp/email actuales son públicos por decisión del dueño.
- No cambiar precios sin confirmación: son orientativos y los define el dueño.
