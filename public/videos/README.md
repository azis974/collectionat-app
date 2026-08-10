# Video demo interactivo

`components/ui` ya no usa un video de fondo en el Hero (se reemplazó por el shader `Velaris`) — este folder ahora es para el video de la sección **"Ve Collectionat en acción"** (`VideoDemoSection` en `app/page.tsx`).

`collectionat-demo.mp4` ya está en este folder — ~1 minuto (medido vía `video.duration` en el navegador, no asumido). Sin capítulos por ahora: no tenemos la estructura real del video (qué se muestra en qué momento), así que en vez de inventar timestamps que no coincidan con el contenido, el botón de reproducir simplemente arranca desde el principio.

## Si querés agregar capítulos

Agregá botones con timestamps reales en `VideoDemoSection` (`app/page.tsx`) — pero solo con los momentos reales del video (ej. "arranca en el segundo 15 la parte de ventas"), no inventados. Si cambiás el video por uno de otra duración, actualizá también el copy ("Un recorrido de 1 minuto...") y la etiqueta del botón ("Reproducir demo (1:00)") para que coincidan con la duración real — medila con `video.duration`, no a ojo.

- Resolución 1920×1080, formato horizontal (16:9) — el contenedor usa `aspect-video`.
- Comprimir antes de subir:

```bash
ffmpeg -i original.mov -vf scale=1920:-2 -c:v libx264 -crf 23 -preset slow -c:a aac -b:a 128k collectionat-demo.mp4
```
