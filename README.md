# Storyboard AI Studio

App web (**PWA**) para crear storyboards con IA: personajes con seed fija, paneles con anotaciones, generación vía [pollinations.ai](https://pollinations.ai). Guarda el proyecto en `localStorage` / JSON. No requiere backend.

## Demo

https://raw.githack.com/SIUL667766/storyboard-ai-studio/main/index.html

Para PWA / service worker usa un servidor estático (raw.githack, GitHub Pages, etc.). Abrir por `file://` no registra el SW.

## Instalar como app (PWA)

### Android (Chrome)
1. Abre la URL en Chrome.
2. Menú **⋮** → **Instalar aplicación** / **Añadir a la pantalla de inicio**, o pulsa **Instalar app** en la barra superior si aparece.

### iPhone / iPad (Safari)
1. Abre la URL en Safari.
2. Botón **Compartir** → **Añadir a pantalla de inicio**.
3. Confirma y pulsa **Añadir**.

La app abre en modo standalone con tema `#ff7a2f`.

## Personaje por defecto: Elena

En la primera carga (sin `localStorage` clave `storyboardAI.v1`) se crea **Elena** (seed `667766`) con descripción visual bloqueada y avatar. Formato por defecto en proyectos nuevos: **9:16** (shorts/reels).

## Archivos PWA

- `manifest.webmanifest` — nombre, iconos, `theme_color`, `display: standalone`, `lang: es`
- `sw.js` — cache-first para assets locales; red para pollinations / imágenes externas (`storyboard-ai-v5`)
- `icons/icon-192.svg`, `icons/icon-512.svg`
- `index.html` loader: junta `app.0`–`app.2.b64` + `app.3a/3b.hex`, gunzip y ejecuta la app
- `chars/elena-avatar.svg` — avatar de Elena (offline)

## Despliegue

Hosting estático (GitHub Pages, Netlify, Render Static, etc.). HTTPS (o localhost) requerido para el service worker.
