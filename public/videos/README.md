# Video demo interactivo

`components/ui` ya no usa un video de fondo en el Hero (se reemplazó por el shader `Velaris`) — este folder ahora es para el video de la sección **"Ve Collectionat en acción"** (`VideoDemoSection` en `app/page.tsx`).

Coloca aquí:

- `collectionat-demo.mp4`

Sin este archivo, la sección funciona igual (el botón de reproducir y los capítulos son reales) pero el video se ve en negro — no rompe la página.

## Capítulos

El componente tiene botones que saltan a un timestamp exacto del video (`video.currentTime`). Ajusta estos valores en `VIDEO_CHAPTERS` (`app/page.tsx`) para que coincidan con tu edición real:

```ts
const VIDEO_CHAPTERS = [
  { label: "Dashboard", time: 0 },
  { label: "Ventas y CRM", time: 32 },
  { label: "Automatización", time: 65 },
  { label: "Reportes", time: 100 },
];
```

## Recomendaciones

- Duración sugerida: 1:30–2:30. Con audio esta vez (a diferencia del video de fondo que existía antes, este sí lleva controles nativos y el usuario elige reproducir con sonido).
- Resolución 1920×1080, formato horizontal (16:9) — el contenedor usa `aspect-video`.
- Comprime antes de subir:

```bash
ffmpeg -i original.mov -vf scale=1920:-2 -c:v libx264 -crf 23 -preset slow -c:a aac -b:a 128k collectionat-demo.mp4
```
