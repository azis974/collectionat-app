# Collectionat — Landing Page

Landing page en Next.js (App Router) + TypeScript + Tailwind CSS para **Collectionat**: una plataforma SaaS que centraliza toda la información crítica de una empresa (ventas, finanzas, operaciones) en un solo lugar, elimina el uso de hojas de cálculo dispersas, y se integra de forma nativa con Microsoft 365 (Outlook, Teams, SharePoint, OneDrive). Con módulos que se adaptan por industria (inmobiliarias, estudios jurídicos, y más a futuro).

## Poda de secciones + reordenamiento por prioridad de venta

El usuario pidió eliminar 4 secciones: "Tu empresa, bajo la lupa" (la lupa/LensCard con KPIs de ejemplo), "Cómo funciona" (los 4 pasos clicables), "Explora cada página de Collectionat" (los mockups de tablet por scroll) y la Calculadora de productividad — y, en el mismo pedido, reordenar las secciones restantes según qué tan importantes le parecerían a un comprador potencial.

**Qué se borró, y por qué quedó limpio:** las 4 secciones no compartían casi nada con el resto de la página excepto un puñado de datos de ejemplo (`DATA_PREVIEW`, `HOW_IT_WORKS`, `CRM_PREVIEW`, `REPORT_BARS`, `AUTOMATION_RULES`, `PRODUCT_PAGES`) y dos componentes (`TabletScreen`, `ListPreview`) que **solo** esas secciones consumían. Se borraron junto con las secciones en vez de dejarlos como código muerto — confirmado con `tsc` y un grep final de que no quedó ninguna referencia colgante. El botón secundario del Hero ("Ver cuánto puedes ahorrar") apuntaba a la Calculadora eliminada; en vez de borrarlo, se re-apuntó a la nueva sección `#simulador` ("Ver la app en vivo"), ya que sigue teniendo sentido como CTA secundario.

**Orden nuevo** (Hero primero, todo lo demás reordenado de mayor a menor peso para alguien evaluando comprar):

1. **Hero** — la propuesta de valor.
2. **`#simulador` "Producto real"** — subido justo después del Hero, antes de Características. Ver la app interactiva de verdad (el mockup de tablet) es más persuasivo que leer bullets de features, así que se prioriza por sobre explicarla primero.
3. **Características** — qué hace la plataforma.
4. **Industrias** — para que el comprador se identifique con su rubro.
5. **Demo (video)** — refuerzo en video de lo que ya vio interactivo.
6. **Ventas** (bento grid) — profundidad en un módulo específico.
7. **Chat AI** — diferenciador puntual.
8. **Confianza** (testimonios) — prueba social, justo antes de pedir la decisión de compra.
9. **Planes** — el cierre.
10. **Footer**.

El nav (desktop y mobile) se reordenó igual: **La aplicación → Características → Industrias → Planes**, para que los links sigan el mismo orden en que aparecen al hacer scroll.

## Rediseño fiel de la pantalla "home" de la tablet (captura real de Inmobiliaria)

El usuario compartió una captura de la app real (sidebar con grupos — Inicio y control / Equipo y acceso / Gestión comercial / Contratos y administración — y una pantalla de "Alertas generales" que en realidad combina tabla de alertas + dashboard de KPIs + ficha de RRHH) y pidió que `components/ui/app-simulator.tsx` reflejara eso exactamente, además de actualizar el título/subtítulo de la sección `#simulador` en `app/page.tsx`.

- **Sidebar agrupado**: `INMOBILIARIA_GROUPS` reemplaza la lista plana de 12 módulos por 4 grupos con encabezado, en el mismo orden que la captura. Legal quedó como un solo grupo ("Gestión del estudio") ya que el pedido no especificaba agrupamiento para ese lado.
- **`AlertasHomeScreen`**: un solo componente compartido entre ambas verticales (recibe `vertical` y bifurca colores/íconos/copy adentro) en vez de duplicar todo el layout — así "estructura idéntica, tema distinto" (pedido explícito) queda garantizado por construcción, no por disciplina manual. Es ahora el `defaultModule` de las dos verticales (antes era "resumen"/"panel").
  - Tabla de alertas con filtros ("Tipo de alerta"/"Prioridad"), contador "N activas" y botón "Resolver" por fila.
  - Tarjeta de dashboard con badge de marca ("Gestión inmobiliaria" / "Gestión Legal") y 4 KPIs.
  - Tarjeta de RRHH con avatar de iniciales (sin inventar una foto real), badge "Activo", panel de documento digital (Cargar PDF / Ver PDF / Descargar) y 2 chips de estado.
- **Variante Gestión Legal**: mismo componente, `isLegal` cambia el header/badges a `slate-900` (negro elegante) en vez del petróleo cyan, el ícono de marca a `Scale` en vez de `Home`, tipografía `font-serif` en los títulos (ya usada en el resto de la sección legal), el stat "Propiedades" se reemplaza por "Expedientes", y los datos de alertas/empleado son 100% legales (vencimientos de causas, honorarios, un abogado asociado en vez de un agente inmobiliario) — no se reutilizó texto inmobiliario con una capa de pintura encima.
- El primer módulo del sidebar de Legal pasó de "Panel Principal" (`LayoutGrid`) a "Alertas generales" (`AlertTriangle`), para que ambas verticales arranquen en la misma pantalla conceptual.
- Verificado interactivamente en el navegador: cambiar de Inmobiliaria a Gestión Legal recolorea todo, cambia los íconos y los datos, sin recargar la tablet.

## Fidelidad total a 8 capturas más de la app real (lado Inmobiliaria)

El usuario compartió 8 capturas más de pantallas específicas de la app real y pidió calcarlas exactamente ("que sea todo igual a las imágenes"). Se reescribieron 6 módulos de `InmobiliariaContent` en `components/ui/app-simulator.tsx`:

- **Recursos humanos**: ahora una sola ficha (Mariana López, antes había 2 empleados genéricos de una iteración anterior) con avatar de iniciales, badge "Activo", panel "DNI digital" con Cargar/Ver/Descargar, chips "Clientes: 1"/"DNI: Pendiente", y debajo una tabla de 5 documentos (Contrato laboral, Tarjeta médica, Renovación, Expediente de trabajo, Contratos y anexos) con ícono propio por tipo (`Pencil`, `Heart`, `RefreshCw`, `FolderInput`, `FileText`) y badge de estado — se agregaron dos tonos de badge nuevos (`solid` = navy sólido, `solidRed` = rojo sólido) para diferenciar "Vigente"/"Renovar" (sólidos) de "Pendiente" (pastel), como en la captura.
- **Login y password → "Login y password por roles"**: selector de "Rol de acceso" + tarjeta destacada con la descripción del rol y sus permisos como chips, y debajo dos fichas de cuentas de empleado (Ana Torres, Bruno Herrera) con login/password/rol asignado y un aviso "Permisos aplicados por sector y prioridad de cliente original" (ícono `ShieldCheck`).
- **Metas → "Panel de metas mensuales"**: dos barras de progreso (Ventas / Rentas) con montos reales en pesos, más un formulario de carga (Mes, Meta ventas, Meta rentas, Avance ventas, Avance rentas, Empleado) — reemplaza el viejo formato de "% de objetivos genéricos".
- **Email corporativo**: pasó de dos tarjetas lado a lado ("Nuevo mensaje" / "Bandeja") a una sola tarjeta apilada (formulario arriba, bandeja abajo), que es como se ve en la captura real.
- **Propiedades → "Lista de propiedades"**: de tarjetas genéricas a filas con borde izquierdo de color por estado (`Disponible` = navy, `Alquilada` = rojo, `Reservada` = celeste), con tipo/superficie/responsable/fecha/valor — 5 propiedades con datos reales de la captura (Amenábar 2100 3C, Av. Rivadavia 5400 Local 3, etc.).
- **Contratos y trámites**: el texto de acceso pasó de "Acceso restringido por rol" a "Acceso bloqueado" con la explicación completa del semáforo (rojo/amarillo/verde). El formulario de alta pasó de 4 campos a los 14 reales (Propiedad, Cliente, Semáforo, Tipo trámite, Estado, Etapa del proceso, Entidad, fechas, Valor contrato, Documentación requerida, Notas). Debajo se agregó una sección nueva, "Expedientes en curso", con 4 expedientes reales (trámite municipal, boleto de venta, escritura, renovación) mostrados como tarjetas con borde de color, tags de estado y grilla de Vence/Valor/Etapa/Entidad.

Verificado módulo por módulo en el navegador (simulando los clics del sidebar vía evento nativo, ya que el entorno de preview no compone frames para captura visual) — el texto de cada pantalla coincide palabra por palabra con las capturas compartidas.

## Planes y Precios: 3 planes reales (Plan A / Plan B / Plan C a medida)

El usuario reemplazó por completo el modelo de precios ficticio (Starter $0, Business $12/mes) por su estructura de precios real, en dólares, con capacidad en "solapas" en vez de suscripción mensual:

- **`PRICING_PLANS`** (nuevo array de datos en `app/page.tsx`): Plan A (20 solapas, 2 usuarios, $4.500 USD), Plan B (50 solapas, 3 usuarios, $9.000 USD, marcado `highlight: true`), Plan C (sin capacidad fija — "a medida", cotización personalizada, sin precio numérico).
- **Plan B** es la tarjeta destacada: sigue el mismo patrón visual que ya existía (degradado cyan sólido, `DonutRing`, elevada `lg:-mt-4` sobre las otras dos), pero la insignia pasó de "Más Popular" a **"Plan recomendado"** y ahora dice explícitamente por qué en el copy.
- Cada tarjeta de Plan A/B muestra dos chips con ícono (`Layers` para solapas, `Users` para usuarios) antes del precio — Plan C, al no tener capacidad fija, muestra en su lugar un aviso: "Capacidad y usuarios definidos según tu operación."
- Las 3 tarjetas comparten el mismo CTA (`setDemoModalOpen(true)`, el formulario real que ya existía) con texto distinto por plan ("Solicitar Plan A" / "Elegir Plan B" / "Solicitar cotización") — no se inventó un flujo de pago nuevo, se reutilizó el único formulario de contacto funcional del sitio.
- Debajo de las 3 tarjetas se agregó un aviso de **"Opciones de pago flexibles"** (ícono `CreditCard`) con el texto pedido, en una barra centrada con blur, no como una 4ª tarjeta — para no competir visualmente con los 3 planes.
- Se agregó `FloatingOrbs` a la sección (antes no tenía, solo el degradado de fondo) para que la sección de cierre tenga el mismo nivel de "vida" que el resto de la página.

Verificado en el navegador: el texto de las 3 tarjetas coincide con la estructura pedida, y el botón "Elegir Plan B" abre el modal de solicitud de demo real.

## Chat con IA real + robot mascota interactivo

El usuario preguntó si el chat "Pregúntale a Collectionat" podía usar IA de verdad en vez de las respuestas enlatadas (`CANNED_RESPONSES`) que tenía desde el principio, y pidió sumar un robot animado al lado, "como si te estuviera ayudando".

**Primera vuelta:** implementé el endpoint apuntando a Anthropic (Claude), ya que no respondió mi pregunta inicial sobre proveedor/alcance, avancé con esa opción por defecto y lo documenté. El usuario volvió con "¿no podés generar una IA que funcione de verdad?", frustrado por tener que configurar algo antes de que funcione.

**Le expliqué la restricción real** (no es falta de esfuerzo, es cómo funcionan estos servicios): ninguna IA conversacional hosteada (ChatGPT, Gemini, Claude, Groq) funciona sin que alguien tenga una cuenta/API key ahí — yo no puedo crear ni pagar una cuenta en su nombre. Le di dos caminos honestos: (1) conseguir una API key **gratis** de Google Gemini (sin tarjeta, ~2 minutos) y yo conecto el endpoint ahí, o (2) un modelo chico corriendo 100% en el navegador del visitante (sin cuentas, pero con una descarga de varios cientos de MB y respuestas notablemente más débiles). Eligió la opción 1.

**Vuelta 2 — el key de Gemini no funcionaba:** el usuario pegó dos veces la misma credencial (con prefijo `AQ.`), que no es el formato de una API key de Gemini (esas siempre arrancan `AIzaSy`). Probándola en vivo contra la API real de Google, confirmé que efectivamente fallaba — primero con cuota "0" en el tier gratis para `gemini-2.0-flash`, y con una segunda key distinta, con `401 ACCESS_TOKEN_TYPE_UNSUPPORTED` ("esperaba un token OAuth2"). El usuario insistió en que era el formato que Google le estaba dando y me pidió que la aceptara igual — en vez de discutir el formato, agregué un reintento automático con `Authorization: Bearer` (por si de verdad era un token OAuth2 en vez de una API key clásica) y volví a probar: cambió a `API_KEY_SERVICE_BLOCKED`, que apunta a que la Generative Language API no estaba habilitada en el proyecto de Google Cloud del usuario, o la key tenía restricciones de API. Le di los pasos exactos en Cloud Console para habilitarla — el usuario no podía/quería hacerlos ("no lo puedo hacer").

**Vuelta 3 — cambio a Groq:** le ofrecí dos alternativas que no pasan por Google Cloud Console: Groq (key gratis con un flujo de registro mucho más simple, sin paso de "habilitar servicio") o el modelo 100% en el navegador sin ninguna cuenta. Eligió Groq.

- **Proveedor: Groq, modelo `llama-3.1-8b-instant`** — rápido y con tier gratis generoso, sin necesidad de "habilitar" nada como en Google Cloud: generás la key en `console.groq.com/keys` y ya está lista para usar. Para respuestas de mayor calidad (a costa de velocidad), cambiá `GROQ_MODEL` en `app/api/chat/route.ts` a `llama-3.3-70b-versatile`.
- **Alcance: asistente de ventas honesto sobre Collectionat**, no "acceso a tus datos reales" (eso sería inventado, no hay ningún backend detrás de esta landing). El system prompt en `app/api/chat/route.ts` solo conoce lo que está realmente en la página — los 3 planes, los 2 rubros con implementación real, permisos por rol, integraciones — y tiene instrucción explícita de admitir cuando no sabe algo y sugerir pedir una demo, en vez de inventar.

**`app/api/chat/route.ts`** — un Route Handler real que llama a `https://api.groq.com/openai/v1/chat/completions` server-side con `fetch` (API compatible con el formato de OpenAI, sin agregar ningún SDK como dependencia nueva). **Como no tengo tu API key, hasta que la cargues el endpoint responde con un error claro** ("El asistente de IA todavía no está configurado…", HTTP 503) en vez de fallar en silencio o inventar una respuesta — probado en este entorno, que no tiene la key, y efectivamente devuelve ese error.

**Para activarlo de verdad (2 minutos, gratis, sin tarjeta, sin Google Cloud Console):**
1. Andá a [console.groq.com/keys](https://console.groq.com/keys), registrate con tu email y creá una API key con el botón "Create API Key".
2. Creá `.env.local` en la raíz del proyecto (ya está en `.gitignore`, no se sube al repo) con:
   ```
   GROQ_API_KEY=tu-key-de-groq
   ```
3. Reiniciá `npm run dev`.

**✅ Confirmado funcionando en vivo** con una key real de Groq: `POST /api/chat` devolvió `200` con respuestas correctas y ancladas a los datos reales (los 3 planes con sus precios exactos, y una respuesta afirmativa y precisa sobre el rubro inmobiliario) tanto por request directo como haciendo clic en las acciones rápidas de la UI — robot reaccionando ("pensando") incluido.

**`components/ui/ruixen-moon-chat.tsx`**: el `send()` ahora hace un `fetch` real a `/api/chat` (antes era un `setTimeout` con texto fijo), con manejo de error real (una caja roja distinta a la de respuesta normal). Las acciones rápidas cambiaron de preguntas sobre "datos de negocio" ficticios (Resumen de ventas, Cuentas por cobrar) a preguntas reales que el prompt puede responder de verdad (planes, integraciones, industrias, permisos por rol).

## Camino a "nivel PRO" — paso 1: rate limiting en /api/chat

Con la IA ya funcionando de verdad, el usuario pidió una revisión de qué le faltaba a la landing para sentirse "nivel PRO". El primer riesgo real identificado: `/api/chat` es un endpoint público que llama a una API externa medida por uso (Groq) — sin límite, cualquiera puede hacer un script que la golpee en loop y agotar la cuota (o generar costos si en algún momento pasa a un plan pago).

**Solución implementada en `app/api/chat/route.ts`**: un rate limiter en memoria, por IP, con ventana deslizante (`RATE_LIMIT_MAX = 8` mensajes cada `RATE_LIMIT_WINDOW_MS = 5` minutos). Cuando se supera, responde `429` con un mensaje claro ("Estás enviando mensajes muy rápido...") en vez de dejar pasar la request. Es en memoria (un `Map`), lo cual alcanza para una sola instancia de servidor — si en algún momento el sitio corre en múltiples instancias/regiones, hay que migrar a algo compartido como Upstash Redis, porque cada instancia tendría su propio contador.

**Probado en vivo**: disparé 10 requests seguidos contra el endpoint real. Las primeras 7 respondieron `200` con contenido real; la 8ª chocó contra el límite de tokens por minuto de *Groq* (esperable, por la ráfaga sintética — no pasa con tráfico real de visitantes), y la 9ª y 10ª fueron bloqueadas por nuestro rate limiter con `429`, confirmando que corta antes de que se pueda abusar del endpoint.

**Robot mascota (`ChatRobot`)**: SVG animado con `framer-motion`, sin librerías nuevas — flota y se balancea todo el tiempo (`y` + `rotate` en loop), parpadea cada tanto (`scaleY` en los ojos), y mientras el bot está "pensando" el antenna-light pasa a dorado y pulsa más rápido y los brazos se agitan — para que se sienta como que está ayudando activamente, no solo decorativo. Después de que el usuario pidiera "que esté más feliz", se le sumaron cachetes sonrosados, un brillito en cada ojo y una sonrisa grande (antes tenía una carita neutra con una barra por boca).

**Fix: insignia "Plan recomendado" cortada.** El usuario mandó una captura mostrando solo una tira amarilla en el borde superior de la tarjeta de Plan B — la insignia (posicionada con `-top-3.5`, a propósito sobresaliendo del borde de la tarjeta) vivía *adentro* del mismo `<div>` que tenía `overflow-hidden` (necesario para recortar el `DonutRing` decorativo a las esquinas redondeadas), así que quedaba tapada. Se resolvió separando en dos capas: un `<div>` exterior sin `overflow-hidden` que contiene la insignia, y un `<div>` interior con `overflow-hidden` que contiene el degradado, el `DonutRing` y el contenido — la insignia ahora sobresale limpiamente sin que nada la recorte.

**Efecto al presionar cada plan.** Los 3 botones de CTA pasaron de `<button>` a `motion.button` con `whileHover`/`whileTap` (mismo patrón que `GlowButton` en el Hero) — al presionar, el botón se achica ligeramente (`scale: 0.94`) con resorte, dando feedback táctil real en vez de solo el cambio de color que ya tenían.

## Camino a "nivel PRO" — paso 2: el formulario de demo ahora entrega el lead de verdad

El segundo riesgo del checklist: `app/api/demo-request/route.ts` validaba todo correctamente pero terminaba en un `console.log` — en producción (por ejemplo en Vercel, donde los logs de funciones serverless no son permanentes) cada solicitud de demo real se hubiera perdido para siempre sin que nadie se enterara.

**Solución**: el endpoint ahora envía un email de verdad vía la API de [Resend](https://resend.com) (`fetch` directo, sin agregar su SDK como dependencia nueva) cuando están configuradas `RESEND_API_KEY` y `DEMO_REQUEST_TO_EMAIL`. Usa el remitente compartido `onboarding@resend.dev` de Resend, que **funciona sin verificar un dominio propio** — ideal para arrancar ya mismo; el `reply_to` queda seteado al email de quien pidió la demo, así se le puede responder directo desde el emerging cliente de correo.

**Degradación honesta, pero sin romper la experiencia del visitante**: si falta cualquiera de las dos variables, el endpoint sigue devolviendo `{ ok: true }` al visitante (su envío nunca falla ni se ve raro) pero deja un `console.warn` bien visible en el servidor — "NOT DELIVERED — falta RESEND_API_KEY y/o DEMO_REQUEST_TO_EMAIL" — para que quien esté probando/desplegando se entere de que falta terminar la configuración, en vez de asumir en silencio que ya está andando. Mismo criterio si la llamada a Resend falla por algún motivo (log de error, pero la solicitud del visitante igual se considera exitosa porque ya quedó registrada arriba).

**Para activarlo de verdad:**
1. Creá una cuenta gratis en [resend.com](https://resend.com/api-keys) y generá una API key.
2. En `.env.local`, agregá:
   ```
   RESEND_API_KEY=tu-key-de-resend
   DEMO_REQUEST_TO_EMAIL=el-email-donde-quieras-recibir-los-leads
   ```
3. Reiniciá `npm run dev`.

**Probado en vivo sin las variables configuradas**: el endpoint respondió `200 { ok: true }` al visitante como siempre, y el log del servidor mostró exactamente el aviso de "NOT DELIVERED" esperado — confirmando que el modo degradado funciona como se diseñó.

**✅ Confirmado con envío real**: el usuario dio su propia `RESEND_API_KEY` y un email de destino. Con ambas configuradas, el mismo request devolvió `200 { ok: true }` pero esta vez **sin** el aviso de "NOT DELIVERED" ni errores de Resend en el log — la llamada a la API se completó bien. El destino se puede cambiar en cualquier momento editando `DEMO_REQUEST_TO_EMAIL` en `.env.local`, no queda hardcodeado en ningún lado del código.

## Camino a "nivel PRO" — paso 3: SEO

El tercer riesgo del checklist: la landing no tenía nada de lo que Google/redes sociales necesitan para indexarla y mostrarla bien — sin `<title>`/`<meta description>` reales, sin imagen de preview al compartir un link (Open Graph/Twitter Card), sin `robots.txt` ni `sitemap.xml`, y sin datos estructurados para que un buscador entienda qué es "CollectionatApp" más allá del texto suelto.

**Solución, usando solo primitivas nativas de Next.js (cero dependencias nuevas):**

- **`app/layout.tsx`**: se agregó el objeto `metadata` (API de Next.js `Metadata`) con título y descripción reales orientados a venta ("CollectionatApp — Dile adiós a Excel. Centraliza tu empresa."), `robots: {index: true, follow: true}`, `alternates.canonical`, y los objetos completos `openGraph`/`twitter` (tipo `website`, locale `es_AR`, imagen de preview). También se agregó un `<script type="application/ld+json">` en el body con schema.org `SoftwareApplication`, incluyendo los 3 planes reales (`Plan A` USD 4500, `Plan B` USD 9000, `Plan C` cotización a medida) como `offers` — así un buscador puede mostrar precio/producto directamente en resultados enriquecidos.
- **`app/opengraph-image.tsx`** (nuevo): genera la imagen de preview (1200×630) al vuelo con `next/og` (`ImageResponse`, edge runtime) — nada de mantener un PNG estático a mano que se desactualiza; el diseño (wordmark + headline + acentos cyan/dorado radiales) sale del mismo código, así que cambiar el copy del layout no rompe la imagen.
- **`app/robots.ts`** (nuevo): permite indexar todo (`allow: "/"`) salvo `/dna-erp` (`disallow`), que es un demo estructural interno clonado de otra app de referencia, no contenido pensado para aparecer en buscadores. Apunta a `sitemap.xml`.
- **`app/sitemap.ts`** (nuevo): un único `<url>` — la raíz del sitio — con la misma exclusión deliberada de `/dna-erp`.
- Ambos (`robots.ts` y `sitemap.ts`) y el `metadataBase` del layout usan `NEXT_PUBLIC_SITE_URL` (con fallback a `http://localhost:3000` en dev), así que para producción alcanza con setear esa única variable de entorno al dominio real y se propaga a las 3 piezas (canonical, Open Graph, robots, sitemap) sin tocar código.

**Probado en vivo**: `GET /robots.txt` devolvió exactamente las reglas esperadas (`Allow: /`, `Disallow: /dna-erp`, línea `Sitemap:`); `GET /sitemap.xml` devolvió el XML válido con la única URL de la raíz y `lastmod` actual; `GET /opengraph-image` devolvió una imagen PNG de 1200×630 sin errores de build ni de runtime en el servidor.

## Rediseño visual: tema claro con paleta de marca (cyan/petróleo + vino + dorado)

El usuario compartió una paleta de marca oficial (franjas negro / gris pizarra / gris claro / blanco / cyan / azul petróleo / vino / rojo / dorado / crema) y pidió abandonar por completo el tema oscuro de toda la landing y la tablet interactiva por uno claro, luminoso y corporativo. Esto tocó prácticamente todos los archivos visuales del proyecto:

- **Paleta aplicada** (con clases default de Tailwind, sin tocar `tailwind.config.ts`): fondos `white`/`slate-50` alternados por sección + `amber-50` como cierre cálido en Planes; texto `slate-900` (títulos) / `slate-600` (cuerpo) / `slate-500` (muted); **cyan-600/700/950** como acento principal (botones, links activos, ícono de marca, bordes del mockup de tablet); **rose-800** como "vino/borgoña" y **amber-400/500** como "dorado", usados puntualmente en insignias, badges de testimonios y anillos decorativos — nunca como color de fondo dominante.
- **`app/globals.css`**: tokens `--motiq-*` (usados por `LensCard`) y los HSL de shadcn (`--background`, `--border`, `--ring`, etc.) pasaron de un esquema negro/azul a uno blanco/cyan. `body` ahora es `bg-white text-slate-900`. `.bg-grid` (textura de cuadrícula) pasó de líneas blancas casi invisibles sobre negro a líneas oscuras muy sutiles sobre blanco.
- **`app/page.tsx`**: reescritura completa. Se **eliminaron los shaders WebGL de Velaris** en Hero y Planes (una animación de "cintas de luz" en movimiento no se traduce bien a un fondo blanco/luminoso; se reemplazaron por gradientes CSS suaves cyan→blanco y blanco→crema) y el componente `SectionSeam` (blend negro↔blanco entre secciones) — ya no hace falta con toda la página en tonos claros, el ritmo ahora lo da alternar `bg-white`/`bg-slate-50`. `Eyebrow` se simplificó a una sola variante (ya no necesita un modo "dark"/"light" distinto).
- **Mockup de tablet** (`#simulador`): el bisel oscuro ahora usa `cyan-950` (un petróleo muy oscuro) en vez de un gris neutro, así el "borde destacado" pedido usa el color de marca en vez de un tono genérico.
- **`components/ui/app-simulator.tsx`**: sidebar de `#0b1730` (navy) a `#083344` (cyan-950, mismo tono que el bisel de la tablet, para que se sientan como una sola pieza); acentos internos (botones, iconos, "hoy" del calendario, barra de progreso) a cyan-600/950; badge azul → cyan.
- **`components/ui/bento.tsx`** (Ventas) y **`components/ui/ruixen-moon-chat.tsx`** (Chat AI): de tarjetas/paneles oscuros a blancos con sombra suave y anillos decorativos recoloreados a cyan/vino/dorado.
- **`components/ui/orbiting-circles-02.tsx`** y su **`particalsphear.tsx`**: los íconos orbitando el Hero y los puntos de la esfera de partículas centrales usaban azules muy claros (pensados para fondo negro) — invisibles sobre blanco. Recoloreados a cyan/vino/dorado con suficiente contraste, más una sombra sutil en cada burbuja de ícono.
- **No se tocaron** `tailwind.config.ts` (la paleta default de Tailwind ya cubre cyan/rose/amber/slate, no hizo falta declarar colores nuevos) ni el contenido/copy de ninguna sección — este cambio es puramente visual.
- `components/ui/velaris.tsx` y `components/ui/aurora-shader-bg.tsx` quedan en el repo sin usarse (mismo criterio que ya se venía aplicando con Aurora): son shaders pensados para fondos oscuros que no encajan con el nuevo tema claro, pero se dejan por si se quieren retomar en algún fondo puntual más adelante.

## Sección "Industrias"

El usuario compartió capturas de dos apps reales hechas en Power Apps: una de gestión **inmobiliaria** (Propiedades, Contratos y trámites, Email corporativo, RRHH, Chat AI, Alertas) y una de gestión **legal/estudio jurídico** (Causas, Clientes, Agenda, Documentos, portales oficiales AFIP/ANSES/Boletín Oficial). Con eso arme una sección nueva, `#industrias` (entre Características y "Cómo funciona"):

- Selector de pestañas (`INDUSTRIES`) con los módulos reales de cada vertical, no genéricos.
- Panel con transición (`AnimatePresence` + `key={activeIndustry}`) que muestra ícono, descripción y grid de módulos de la industria seleccionada.
- Mismo lenguaje visual del resto de la página (insignias circulares, `FloatingOrbs` de fondo, tipografía `font-black tracking-tighter`).

No reemplacé ningún mockup existente (Dashboard/Ventas/Reportes en "Cómo funciona" y "Explora cada página" siguen siendo genéricos) — esto se sumó como una sección nueva que dice explícitamente para qué rubros sirve Collectionat, que era lo que pediste.

**Aclaración importante (el usuario avisó que esas dos capturas eran solo un ejemplo, no los únicos rubros que cubren):** agregué una 3ª pestaña, "Tu rubro también" (ícono `Building2`), que no es una industria específica sino la aclaración explícita de que cada implementación se arma a medida — sus "módulos" son genéricos por diseño (Dashboard a medida, Automatización, Permisos por rol, Integración Microsoft), a diferencia de las otras dos que listan módulos reales y específicos. También sumé una frase en el subtítulo de la sección ("Estos son solo algunos ejemplos reales de implementación; ya trabajamos con empresas de varios rubros") para que no se lea como una lista cerrada de 2 industrias soportadas.

## Estructura

La página (`app/page.tsx`, `CollectionatLanding`) usa dos componentes de UI reutilizables desde `components/ui/`, más helpers internos (spotlight cards, texto en degradado, botón con brillo) definidos en el propio archivo.

**Pasada de cohesión** (después de acumular 11 secciones con estilos ad-hoc, la página empezaba a sentirse como piezas pegadas por separado en vez de un solo diseño):
- `ScrollProgressBar` — barra de degradado fija arriba de todo (`z-[60]`, por encima del header), se llena según el progreso de scroll (`useScroll` de framer-motion). Sencillo de implementar, pero une visualmente toda la página como una sola pieza continua.
- `Eyebrow` — la etiqueta pequeña en mayúsculas que va arriba de cada título de sección estaba resuelta de 3 formas distintas (texto plano, con ícono, sin nada). Ahora es un solo componente con dos tonos (`dark`/`light`), usado en las 7 secciones que tienen encabezado — incluida Precios, que antes no tenía ninguna.
- `SectionSeam` — franja de 64–80px con degradado `from-black to-white` (o al revés) entre cada sección oscura y las 2 secciones blancas, en vez del corte duro que había antes. Se agregaron 4, una a cada lado de "Explora cada página" y de "Confianza".

> La sección de video (`VideoDemoSection`) era la única sin ningún fondo animado. Primero le puse `AuroraShaderBackground` (cintas de luz), pero no gustó ese estilo — quedó con `FloatingOrbs` (índigo/turquesa/ámbar) como las demás. También arreglé un bug real: pausar el video ocultaba los controles nativos y volvía a mostrar el botón grande de reproducir encima — ya no pasa.

## Estilo "mosaico bento" (referencia visual del usuario)

El usuario compartió una imagen de referencia (mockup estilo agencia creativa: grid de tarjetas bento con círculos/medallones geométricos, tarjetas sólidas de color de acento mezcladas con tarjetas oscuras, tipografía condensada muy bold). Pidió aplicarlo a **toda la página**, pero adaptado a los colores de Collectionat (azul/violeta/negro) en vez de la paleta coral/crema original de la referencia. Alcance real entregado, para no reescribir las 13 secciones existentes sin poder probarlas:

- **[`components/ui/bento.tsx`](components/ui/bento.tsx)** (sección "Ventas") — rediseño completo del mosaico, que es donde más sentido tiene este estilo:
  - Una tarjeta **sólida** con degradado azul→índigo (equivalente a la tarjeta coral de la referencia), en vez de todas las tarjetas del mismo tono oscuro.
  - **`DonutRing`** — nuevo componente decorativo: un anillo/medallón hecho con `conic-gradient` recortado en forma de dona vía `mask`, imitando los círculos geométricos de la referencia. Dos tarjetas lo usan de fondo.
  - Una tarjeta **de estadística** con un número grande dentro de un círculo (como el "4" de la referencia), en vez de ícono + texto como las demás.
  - Íconos en insignias **circulares** (antes eran cuadradas con esquinas redondeadas).
  - Tipografía de tarjetas más bold (`font-black` en vez de `font-medium`).
- **Tipografía sitewide más bold**: los 9 encabezados `<h2>`/`<h3>` de toda la página (antes `font-semibold tracking-tight`) y el `<h1>` del Hero pasaron a `font-black tracking-tighter` — más parecido a la tipografía condensada de alto impacto de la referencia ("Modern Effective"). No toqué el logo del nav, valores de KPI, ni los nombres de la pared de empresas — esos no son títulos de sección.

**Extendido a las demás secciones con grid de tarjetas** (el usuario confirmó que le gustaba y pidió aplicarlo en todas):
- **Características**: la 4ª tarjeta ("Integración con Microsoft") ahora es sólida violeta→azul con su propio `DonutRing`, mezclada con las otras 3 que quedaron oscuras (cada una con su propio anillo de color); íconos pasaron de cuadrados a insignias circulares.
- **Precios**: el plan "Business" (antes solo un borde/gradiente sutil) ahora es una tarjeta 100% sólida azul→índigo con `DonutRing`, igual que la tarjeta destacada de "Ventas" — el plan "Starter" se queda oscuro para mantener el contraste de dos tonos.
- **Calculadora**: ícono cuadrado → circular; la tarjeta de resultado ahora tiene su propio `DonutRing` de fondo.
- **Confianza**: cada testimonio suma una insignia circular con ícono de comilla (`Quote`), rotando azul/índigo/violeta por tarjeta — no usé iniciales ni avatares con nombres inventados, para no dar la impresión de que son personas reales específicas.

No toqué "Cómo funciona" (los números de paso ya eran circulares), el video, el chat de IA, "Explora cada página" ni el footer — no son grids de tarjetas con el mismo patrón, o ya tenían elementos circulares. Si querés el tratamiento ahí también, decime cuál puntualmente.

## Video interactivo y funcionalidad real

- **`VideoDemoSection`** (entre "Cómo funciona" y "Explora cada página") — video con reproducción bajo demanda y **capítulos clicables** que saltan a un timestamp exacto (`video.currentTime`, no decorativo). No hay footage real todavía — ver [`public/videos/README.md`](public/videos/README.md) para dónde poner el archivo y cómo ajustar los timestamps de `VIDEO_CHAPTERS`. Sin el archivo, la sección no se rompe, solo se ve el video en negro.
- **`DemoRequestModal` + `app/api/demo-request/route.ts`** — a diferencia de todo lo demás en esta página (que es visual/simulado), esto es un **formulario que funciona de verdad**: envía un `POST` real a un Route Handler de Next.js, que valida los campos server-side y responde éxito/error real (no un `setTimeout` fingiendo que algo pasó). Se abre desde "Solicitar demo" en el Hero y "Obtener Business" en Precios.
  > ⚠️ El endpoint valida y **registra la solicitud en el log del servidor**, pero no envía el lead a ningún lado todavía (no tengo tus credenciales de Resend/Formspree/CRM). El archivo de la ruta tiene comentado exactamente qué agregar y dónde — es la única pieza que falta para que sea 100% funcional en producción.

- `public/logo.jpg` — logo mostrado en el header.
- [`components/ui/velaris.tsx`](components/ui/velaris.tsx) — fondo animado con un fragment shader WebGL propio (simplex-noise + mezcla de colores + grano de película). Usado en Hero (`colors={["#2563eb","#a855f7","#ec4899","#f97316"]}`, azul/violeta/rosa/naranja) y en Planes (`colors={["#10b981","#f59e0b","#f43f5e","#000000"]}`, esmeralda/ámbar/rosa) — dos combinaciones distintas para que no se sientan repetidas.
- [`components/ui/orbiting-circles-02.tsx`](components/ui/orbiting-circles-02.tsx) — globo con anillos de íconos orbitando, usado como visual decorativo bajo los botones del Hero. Los íconos representan lo que Collectionat centraliza: Outlook, Teams, SharePoint, OneDrive, hojas de cálculo, datos, conectividad y rendimiento (íconos de lucide-react, ya no las marcas genéricas del demo original — no había relación con el producto). Depende de `components/ui/orbiting-circles-02-utils/particalsphear.tsx`.
  > ⚠️ Ese archivo de la esfera de partículas **no vino incluido** cuando pegaste el componente — lo reconstruí con un canvas 2D (sin dependencias nuevas) para que el componente no se rompa. Si tienes la implementación original, reemplázalo.
  > Nota: usa clases `bg-background`/`border-border` de shadcn; por eso agregué los tokens `--background`/`--foreground`/`--border` en `globals.css` + `tailwind.config.ts` (ver más abajo). Sin esos tokens esas clases no generan ningún estilo y el globo se vería sin bordes ni fondo en sus burbujas de íconos.
  > ~~El shader de Velaris no pausa con `prefers-reduced-motion` ni cuando la pestaña está oculta~~ — corregido: ahora sí respeta ambos (como Aurora) y renderiza a resolución reducida, ya que corre dos instancias simultáneas (Hero + Planes).
- [`components/ui/aurora-shader-bg.tsx`](components/ui/aurora-shader-bg.tsx) — sigue existiendo en el repo (shader WebGL de bandas de luz fluidas), pero **ya no se usa en `app/page.tsx`**: al usuario no le gustó ese estilo de "cintas/líneas onduladas" (lo probé en Características, Calculadora y la sección de video) y pidió sacarlo de todos lados. Las 3 quedaron con `FloatingOrbs` (blobs difusos, más calmo) en su lugar. Si en algún momento quieren ese efecto de vuelta, el componente sigue intacto, solo no está importado.
- [`components/ui/lens-card.tsx`](components/ui/lens-card.tsx) — componente de terceros (Motiq, MIT) sin modificar: una lupa de cristal que sigue el cursor, magnifica el contenido debajo y dobla una grilla de fondo alrededor del borde. Usa `clsx`/`tailwind-merge` (ya instalados). Se usa en la nueva sección "Tu empresa, bajo la lupa" (entre el Hero y Características) envolviendo una grilla de 6 KPIs de ejemplo (hojas migradas, integraciones activas, ahorro semanal, etc.).
  > El componente trae sus propios tokens `--motiq-*` por defecto (navy/teal) dentro de `@layer motiq`. Los sobreescribí como reglas **sin capa** en `globals.css` (ver el bloque `:root` antes de los `@layer`) para que ganen siempre y usen el negro/azul/violeta de Collectionat — si se hubieran puesto dentro de `@layer base` como el resto de tokens del archivo, el resultado habría dependido de en qué momento se monta el componente.
- [`components/ui/bento.tsx`](components/ui/bento.tsx) — grid tipo "bento" con tarjetas que reaccionan al hover (`framer-motion`), sección "Ventas" entre Características y la Calculadora.
  > ⚠️ **No copié el contenido del componente pegado tal cual.** El demo original era para un producto ficticio "PerkAI" con copy que bromeaba sobre "ingeniería social" para conseguir el número de seguro social de tus leads, "evadir leyes de privacidad" y vender a países bajo embargo internacional — no es apropiado para un proyecto real, así que reescribí las 5 tarjetas con beneficios legítimos de ventas/CRM de Collectionat (mismo patrón Insight/Análisis/Velocidad/Alcance/Escala, contenido distinto).
  > También reemplacé las imágenes de fondo (hotlinkeadas desde `framerusercontent.com`, assets de otro proyecto sin relación con Collectionat) por gradientes CSS + íconos de lucide-react — consistente con el resto del sitio, que no depende de imágenes externas.
  > Corregí clases de Tailwind inválidas del original (`bg-[#]`, `min-w-screen`, `text-gray-150`, `rounded-4xl` — este último no existe en la escala default de Tailwind v3) y quité el sistema de alternancia `dark:`/`data-dark` del componente, ya que este sitio no tiene modo claro/oscuro conmutable.
- [`components/ui/textarea.tsx`](components/ui/textarea.tsx) y [`components/ui/button.tsx`](components/ui/button.tsx) — primitivos de shadcn/ui copiados sin modificar (`Button` usa `@radix-ui/react-slot` + `class-variance-authority`, agregados a `package.json` — **corre `npm install` de nuevo**, son dependencias nuevas que antes no estaban).
  > `Button` usa clases de tokens de shadcn (`bg-primary`, `bg-secondary`, `bg-destructive`, `bg-accent`, `bg-muted`, `border-input`, `ring-ring`, etc.) que el proyecto no tenía definidas — solo existían `background`/`foreground`/`border`. Completé el set estándar de shadcn en `tailwind.config.ts` + `globals.css` (paleta negro con acento azul `#3b82f6` como `--primary`/`--ring`), para que el componente funcione igual de bien en usos futuros donde no se sobreescriban todas las clases a mano.
- [`components/ui/ruixen-moon-chat.tsx`](components/ui/ruixen-moon-chat.tsx) — sección "Pregúntale a Collectionat" (chat de IA sobre tus datos centralizados), entre "Ventas" y la Calculadora.
  > ⚠️ **Rebrandeado por completo, no es una copia literal.** El original era "Ruixen AI", una landing de chat de IA para *generar código y apps* (acciones rápidas tipo "Generate Code", "Launch App", "UI Components") — no tiene nada que ver con Collectionat. Reescribí las 8 acciones rápidas para reflejar lo que Collectionat realmente hace (resumen de ventas, buscar cliente, cuentas por cobrar, sincronizar Outlook, migrar hoja de cálculo, aprobaciones, tendencias, conectar SharePoint), y añadí una función `send()` con respuestas simuladas por acción (con un pequeño delay de "pensando") — el original tenía el botón de enviar permanentemente `disabled`, aquí sí funciona.
  > También reemplacé el fondo del original (una imagen de luna hotlinkeada desde un bucket R2 de terceros, `pub-940ccf6255b54fa799a9b01050e6c227.r2.dev`) por un resplandor radial + grid en CSS puro, igual que el resto del sitio — y cambié el layout de `h-screen` (pensado para ser una landing completa por sí sola) a una tarjeta de sección normal, ya que aquí vive en medio de la página junto a otras secciones.

**Pasada de color vivo (toda la página tiene ahora un fondo):** Hero y Planes usan Velaris (WebGL), Características y Calculadora usan Aurora (WebGL), y el chat de IA + Footer usan gradientes radiales multicolor en CSS puro (sin WebGL adicional, para no sumar más canvases de los necesarios). Paletas distintas por sección para que no se vean repetidas: azul/violeta/rosa/naranja, esmeralda/ámbar/rosa, rosa/esmeralda/naranja, cian/violeta/rosa.

- [`components/ui/floating-orbs.tsx`](components/ui/floating-orbs.tsx) — segundo tipo de efecto, deliberadamente distinto a los shaders: blobs de color borrosos que flotan/laten con CSS puro (reutiliza los keyframes `float`/`pulse-glow` que ya existían en `tailwind.config.ts`, sin código nuevo de animación). Usado en la sección "Tu empresa, bajo la lupa" y en "Ventas", que eran las únicas dos secciones que hasta ahora no tenían ningún fondo ambiental.
- **Sección "Confianza"** (entre la Calculadora y Planes) — **fondo blanco**, quiebra a propósito el ritmo oscuro. Nombres de empresa y testimonios son de ejemplo (genéricos, sin nombres propios ni empresas reales) — no representan clientes reales de Collectionat.
- **Sección "Explora cada página de Collectionat"** (nueva, entre "Cómo funciona" y "Ventas") — **segunda sección en blanco**. 4 filas alternadas (texto a la izquierda/derecha, según `index % 2`) que revelan un "tablet" — bisel gris claro tipo iPad con la pantalla oscura real de la app adentro — al hacer scroll hasta cada una (`whileInView`, una por una). Las 4 páginas mostradas (Panel principal, Ventas y CRM, Reportes, Automatización) reutilizan los mismos datos de ejemplo que la sección "Cómo funciona" (`DATA_PREVIEW`, `REPORT_BARS`, `AUTOMATION_RULES`) más una lista de CRM nueva (`CRM_PREVIEW`), para que la información se sienta consistente en toda la página en vez de inventada por sección.

**Contenido de la página** (5 beneficios clave en `FEATURES`): Adiós a Excel, Gestión Centralizada Total, Alto Rendimiento, Integración con Microsoft, **Permisos por Rol** (nuevo). Este último refleja lo que el usuario describió del funcionamiento real de la app: cada persona ve/edita solo su área (ej. una sola persona a cargo de "manejo administrativo", otra de "propiedades"), mientras que el dueño o administrador general puede ver y modificar todas las áreas. Se agregó como 5ª tarjeta (`Lock`, tono `teal`, nuevo en `FEATURE_ICON_STYLES`/`FEATURE_RINGS`) y el grid pasó de 4 columnas iguales a un mosaico asimétrico `lg:grid-cols-6 lg:grid-rows-2` (2 tarjetas grandes arriba, 3 abajo) para acomodarla sin romper el estilo bento del resto de la página. La calculadora simula ahorro de tiempo según "hojas de cálculo activas", y los planes (Starter / Business) usan lenguaje de SaaS empresarial en vez de coleccionismo.

**Sección "Cómo funciona"** (`#como-funciona`, entre Características y Ventas) — 4 pasos clicables (Exploración del Dashboard, Gestión de Operaciones, Automatización de Flujos, Reportes Dinámicos) con un panel de vista previa a la derecha que cambia según el paso seleccionado (`activeStep`, transición con `AnimatePresence`): KPIs en vivo, un formulario simulado con dropzone, una lista de reglas de automatización con toggles, y un gráfico de barras. Todo con datos de ejemplo, sin lógica real detrás. El copy del Hero y el `<meta description>` ahora también reflejan el posicionamiento completo de "CollectionatApp": gestión todo en uno, base de datos inteligente integrada con Microsoft, automatización de flujos, interfaz de alto rendimiento.

> `components/sections/*` y `components/ui/container-scroll-animation.tsx` son una versión modular anterior de la landing, ya no referenciada por `app/page.tsx`. `public/videos/` tampoco se usa ya (el hero usaba un `<video>` de fondo, reemplazado por Velaris). Se dejaron sin borrar por si quieres retomarlos; si no, se pueden eliminar sin afectar la app actual.

## Sección "Producto real" — la app embebida directamente en la landing

Esto pasó por 3 iteraciones en la misma conversación, vale la pena dejar el rastro:

1. Primero: una sección "Simulador" con un rol-switcher (Dueño/Administración/Propiedades) dentro de una ventanita con marco de navegador falso (puntitos + barra de URL), usando los mismos mockups genéricos del resto de la página.
2. El usuario pidió algo mucho más real, calcado de las capturas de Power Apps que compartió — pero como ruta separada `/simulador`, a pantalla completa, con un botón "Abrir simulador a pantalla completa" para llegar y un link "Volver a Collectionat" para salir.
3. **Versión final (esta):** el usuario pidió eliminar el concepto de "Simulador" por completo — nada de ventanita, nada de página separada, nada de botones para "entrar" o "volver". La app-shell tenía que ser parte directa de la página principal.

Lo que quedó: [`components/ui/app-simulator.tsx`](components/ui/app-simulator.tsx) exporta `AppSimulator`, un componente cliente con el sidebar + contenido (sin ningún marco ni barra de URL alrededor), montado directamente dentro de `app/page.tsx` en la sección `id="simulador"` (nav: "La aplicación"), con `h-screen` para que al llegar a esa sección ocupe toda la pantalla del usuario — pero sin salir de la landing ni requerir un clic previo para "abrir" nada. La ruta `app/simulador/` (page + layout) se borró por completo.

- **Sidebar fijo a la izquierda, ancho completo**: azul marino oscuro (`#0b1730`), con un switcher arriba para elegir qué app real estás viendo (Inmobiliaria / Gestión Legal) — cada una con su propio logo, subtítulo, lista de módulos y nota al pie (`Acceso prioritario` vs `Estudio Jurídico`), igual que en las capturas de Power Apps compartidas.
- **Inmobiliaria** — 12 módulos del sidebar real: Login y password, Chat AI, Alertas generales, Resumen, Propiedades, Nueva propiedad, Metas, Contratos y trámites, Email corporativo, Recursos humanos, Actividades, Administración. Cada uno con contenido propio (tarjetas, listas, un formulario, una bandeja de email) — no son pantallas vacías.
- **Gestión Legal** — 5 módulos: Panel Principal, Causas, Clientes, Agenda (con calendario real de agosto 2026), Documentos (con el mismo aviso de "tablas de prueba" de la captura). Tipografía `font-serif` en los títulos, imitando el estilo serif bold de esas pantallas. Nombres de clientes/causas inventados, no los de las capturas originales.
- **Interactividad real**: `useState` para la app activa y el módulo activo — clickear cualquier ítem del sidebar cambia el contenido principal al instante. Inputs de formularios son `readOnly`: es un walkthrough de UI, no un backend funcional.
- Como consecuencia de este cambio quedaron sin uso `SIM_MODULES`/`SIM_ROLES`/`AppSimulatorSection` (el rol-switcher de la iteración 1) y las branches `administracion`/`propiedades` de `TabletScreen` — se borraron de `app/page.tsx` en vez de dejarlas como código muerto.
- Se inicializó un repo Git local antes de este cambio (no existía) con commits de cada iteración grande, para poder revertir si hacía falta.

**Ajuste final: mockup de tablet.** El `h-screen` de la iteración anterior hacía que la sección se pisara con el header sticky. Se cambió por un marco de tablet física centrado (`max-w-[1200px]`, borde `border-[12px] border-slate-900`, esquinas `rounded-[36px]`, sombra `shadow-2xl shadow-indigo-500/10`, un anillo interior con degradé simulando el bisel pulido, y una pantalla `overflow-hidden` de alto fijo — `480px`/`560px`/`720px` según breakpoint — en vez de 100vh). `AppSimulator` sigue totalmente interactivo desde el primer clic, ahora contenido dentro de esa pantalla en vez de ocupar todo el viewport.

## Página adicional: /dna-erp

[`app/dna-erp/page.tsx`](app/dna-erp/page.tsx) es una página **separada e independiente** de la landing de Collectionat — no toca `app/page.tsx` ni sus estilos.

Es un **clon estructural** de [dna.systems](https://www.dna.systems/) (un ERP real de otra empresa), inspeccionado con el navegador y reconstruido sección por sección: mismo tipo de secciones, mismo orden, mismo ritmo visual oscuro tipo AI-SaaS. **No es una copia literal**: los logos de clientes, testimonios con nombres reales, copy de marketing exacto y artículos de blog reales se reemplazaron por contenido genérico/placeholder — esa marca es real y tiene clientes, empleados y textos con derechos, así que solo se replicó la arquitectura, no el contenido.

Secciones, cada una en `components/dna-erp/`:

| Componente | Qué hace | Interactividad |
|---|---|---|
| `Nav.tsx` | Header + mega-menú de "Apps" (9 módulos) | Menú desplegable en hover/click, menú móvil |
| `Hero.tsx` | Titular + etiqueta rotativa + dashboard flotante | La etiqueta ("Next-Generation ERP", etc.) rota sola cada ~2s |
| `DashboardMockup.tsx` | El panel de dashboard (del turno anterior) reutilizado como visual del hero | Ver detalle abajo |
| `LogoWall.tsx` | Marquesina de empresas (genéricas) | Auto-scroll infinito, se pausa en hover |
| `AppsGrid.tsx` | Lista de 9 módulos + panel de detalle | Click/hover en un módulo cambia el panel de la derecha |
| `AiShowcase.tsx` | Demo de "preguntar a la IA" | Click en una pregunta sugerida muestra una respuesta simulada (con delay de "pensando") |
| `Testimonial.tsx` | Cita destacada | — |
| `FeaturesCarousel.tsx` | 8 tarjetas de features con scroll horizontal | Botones prev/next, scroll-snap |
| `Showreel.tsx` | Placeholder de video | Abre un lightbox modal (sin video real) |
| `Results.tsx` | Estadísticas + testimonios | Los contadores animan de 0 al valor real cuando entran al viewport (`IntersectionObserver`) |
| `Pricing.tsx` | 2 planes | Toggle Mensual/Anual recalcula precios y muestra el descuento |
| `Faq.tsx` | Acordeón de 6 preguntas | Expandir/colapsar |
| `Blog.tsx` | Grid de artículos (títulos genéricos) | — |
| `FinalCta.tsx` | Banner de cierre | — |
| `Footer.tsx` | Enlaces + newsletter | Formulario de newsletter con estado de éxito simulado |

`DashboardMockup.tsx` (ya construido en el turno anterior) mantiene su interactividad: toggle Monthly/Quarterly/Yearly en Revenue, tareas marcables, barras con hover, leyenda que oculta/muestra series, widget cerrable/restaurable, aprobaciones que se resuelven, sidebar/notificaciones/perfil funcionales. Todos los gráficos (sparkline, barras, dona) son SVG hechos a mano — cero dependencias nuevas en toda la página.

## Cómo ejecutar

Este entorno no tiene Node.js instalado, así que no pude levantar el servidor de desarrollo ni probar los cambios en vivo aquí. Para correrlo localmente:

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Notas

- **Tipografía**: `Inter` cargada vía `next/font/google` en `app/layout.tsx` (variable `--font-sans`, referenciada por `tailwind.config.ts`). *Antes había un bug: el config apuntaba a `var(--font-sans)` sin que esa variable existiera en ningún lado — un `var()` no resuelto invalida toda la propiedad `font-family`, así que el navegador caía a su serif por defecto. Ya está corregido.*
- Estilo: fondo `black` real (no `slate-950`) con grises `neutral-*`, acento único azul/violeta reservado para CTAs y resplandores — paleta más monocromática, al estilo Vercel/Linear.
- **`AmbientGlow`**: resplandor radial sutil azul/violeta arriba de la página + textura de grid (`bg-grid`, definida en `globals.css`) con fade hacia abajo. 100% CSS, sin canvas ni WebGL — reemplaza el fondo de malla animada por shader de la iteración anterior, que era más pesado y menos "sutil" de lo pedido.
- **`SpotlightCard`**: el resplandor de iluminación sigue al cursor en hover (variables CSS `--spot-x/--spot-y` actualizadas directamente en el DOM, sin re-render de React). Bordes semitransparentes `border-white/10` que se iluminan a `border-blue-500/30` en hover. Se usa en las 3 tarjetas de características, el resultado de la calculadora y los 2 planes.
- **`GlowButton`**: CTA primario con sombra de brillo (`shadow-blue-500/20` → más intensa en hover) y un barrido diagonal de brillo (shine sweep) al pasar el mouse.
- **`GradientText`**: degradado estático de dos tonos (azul → violeta), sin animación — más "sutil" y menos "efecto arcoíris" que la versión anterior.
- **Transiciones con `framer-motion`**: fade-up al hacer scroll en cada sección/tarjeta (`whileInView`), menú móvil animado con `AnimatePresence`, micro-interacciones `whileHover`/`whileTap`. Todo respeta `prefers-reduced-motion` vía `MotionConfig reducedMotion="user"`.
- Calculadora: slider nativo (`<input type="range">`) que recalcula horas ahorradas e índice de control en tiempo real.
- Todo el contenido (precios, métricas) es de ejemplo — conecta tu propio backend antes de producción.
