# CRM de leads — Collectionat

CRM mínimo en CSV, pensado para importarse a Google Sheets y trabajarse ahí.
Los criterios de calificación salen de [`docs/icp.md`](../icp.md).

- **`leads.csv`** — la base de leads. Una fila por empresa.
- **`../../scripts/crm-mx-check.py`** — completa el proveedor de correo de cada dominio
  (el filtro nº 2 del ICP: ¿usan Microsoft 365?) y asigna el grado.

## Importarlo a Google Sheets

1. Google Sheets → **Archivo › Importar › Subir** → `leads.csv`.
2. Tipo de separador: **coma**. Codificación UTF-8 (viene así).
3. Congelá la fila 1 y creá listas desplegables en `estado` y `grado`
   (Datos › Validación de datos) para que el pipeline se mantenga limpio.

Si preferís trabajar al revés — editar en Sheets y volver al repo — exportá como CSV
sobre el mismo archivo y commiteá: así queda el historial de cómo evolucionó la base.

## Columnas

| Columna | Qué va |
|---|---|
| `id` | Correlativo, no se reutiliza. |
| `vertical` | Uno de los verticales A de `docs/icp.md`. |
| `empresa`, `ciudad`, `sitio_web`, `dominio` | Identidad del lead. `dominio` es lo que consulta el script de MX. |
| `proveedor_mail` | Lo completa el script: `Microsoft 365`, `Google Workspace`, `GoDaddy`, `sin MX`, etc. |
| `ms365` | `si` / `no` / `revisar`. Filtro nº 2 del ICP. |
| `tamano_estimado` | Empleados. Filtro nº 1: fuera de 8–150, descartar. |
| `cargo_objetivo` | El cargo que hay que buscar en esa empresa (filtro nº 4). |
| `contacto_nombre`, `contacto_email`, `telefono` | **Solo datos verificados.** Ver la advertencia de abajo. |
| `grado` | `A` = usa M365 y entra en tamaño. `B` = otro proveedor, sirve pero cuesta más. `C` = descartado o Google Workspace. |
| `estado` | `nuevo` → `verificado` → `contactado` → `respondió` → `demo agendada` → `propuesta` → `ganado` / `perdido`. |
| `proxima_accion`, `ultimo_contacto` | Para que el pipeline no se muera en silencio. |
| `fuente` | De dónde salió el lead. |
| `notas` | Todo lo demás. |

> **Los datos de contacto no se inventan.** Las filas que ya están traen empresa, sitio y
> dominio tomados de resultados de búsqueda públicos; `contacto_nombre`, `contacto_email` y
> `telefono` van vacíos a propósito. Un CRM con un teléfono inventado es peor que un CRM
> vacío: quema el lead y no te enterás hasta que llamás.

## Verificar Microsoft 365

```bash
python3 scripts/crm-mx-check.py              # completa las filas sin verificar
python3 scripts/crm-mx-check.py --dry-run    # muestra qué haría, sin escribir
python3 scripts/crm-mx-check.py --domain menacho.com.ar   # consulta suelta
```

Sin dependencias: usa DNS-over-HTTPS y cae a `dig`/`nslookup`. Necesita red sin
restricciones — si un dominio no responde, el script lo dice y **deja la fila sin tocar**
en lugar de marcarla como "sin MX".

Cómo leer el resultado: un MX que termina en `mail.protection.outlook.com` es Microsoft
365 → lead A. `aspmx.l.google.com` es Google Workspace → grado C, no insistas.

## Cómo expandir la base

Los verticales A de La Plata están sub-representados en LinkedIn, así que el volumen sale
de directorios. Fuentes útiles encontradas hasta ahora:

| Vertical | Directorios |
|---|---|
| Estudios jurídicos | [legal.com.ar](https://www.legal.com.ar/abogados/estudios-juridicos/la-plata) (31 estudios en La Plata), [abogadosde.com.ar](https://abogadosde.com.ar/buenos-aires/la-plata-147) |
| Inmobiliarias | [Zonaprop](https://www.zonaprop.com.ar/inmobiliarias-la-plata.html) (181 inmobiliarias en La Plata), [inmobusqueda.com.ar](https://www.inmobusqueda.com.ar/inmobiliarias-la-plata.html), [Índice La Plata](https://comercios.indicelaplata.com.ar/inmobiliarias.php) |
| Escribanías | [Colegio de Escribanos PBA](https://www.colescba.org.ar/portal/), [escribaniasargentinas.com.ar](https://escribaniasargentinas.com.ar/localidad/la-plata/), [argentino.com.ar](https://www.argentino.com.ar/la-plata/escribanias) |
| Administradoras de consorcios | Cámara de Administradores de La Plata, [registro provincial de administradores](https://www.gba.gob.ar/dppj/administracion-consorcios) |
| Estudios contables | Consejo Profesional de Ciencias Económicas PBA, delegación La Plata |

Flujo recomendado por lote:

1. Sacá 30–50 empresas del directorio con **sitio web propio** (el sitio es el proxy de
   "empresa formalizada con presupuesto"; en Google Maps, sumá el filtro de +30 reseñas).
2. Cargalas en `leads.csv` con `estado=nuevo` y el `dominio` completo.
3. Corré `crm-mx-check.py`. Todo lo que dé grado C sale del lote.
4. Sobre los grado A, buscá el `cargo_objetivo` en LinkedIn Sales Navigator con la query de
   `docs/icp.md` (título + tamaño, no industria) y completá el contacto.
5. Recién ahí contactás. 100 contactos de un solo vertical antes de abrir el segundo.
