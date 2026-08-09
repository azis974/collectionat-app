# Video demo interactivo

`components/ui` ya no usa un video de fondo en el Hero (se reemplazó por el shader `Velaris`) — este folder ahora es para el video de la sección **"Ve Collectionat en acción"** (`VideoDemoSection` en `app/page.tsx`).

`collectionat-demo.mp4` ya está en este folder — un teaser de 10 segundos. Al ser tan corto, la sección ya no tiene capítulos con `video.currentTime` (no tenía sentido saltar a un timestamp en un clip de 10s); el botón de reproducir simplemente arranca el video desde el principio.

## Si en el futuro subís un video más largo

Volvé a agregar botones de capítulo con timestamps reales en `VideoDemoSection` (`app/page.tsx`), y ajustá el copy ("Un vistazo rápido de 10 segundos...") para que describa la duración real.

- Resolución 1920×1080, formato horizontal (16:9) — el contenedor usa `aspect-video`.
- Comprimir antes de subir:

```bash
ffmpeg -i original.mov -vf scale=1920:-2 -c:v libx264 -crf 23 -preset slow -c:a aac -b:a 128k collectionat-demo.mp4
```
