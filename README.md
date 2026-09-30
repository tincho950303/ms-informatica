# MS Servicio PC — La Plata

Vidriera estática del servicio técnico de PC y notebooks. HTML + CSS + JS, sin backend.

## Dev local

```bash
npx serve .
# o
python -m http.server 8000
```

## Deploy

Render → New → Blueprint → elegir este repo. Lee el `render.yaml` (Static Site, sin build).

## Notas

- Los datos de contacto del sitio se configuran en `js/main.js`.
- Sitio estático: el formulario de contacto abre WhatsApp con el mensaje armado.
