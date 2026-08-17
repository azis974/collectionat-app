# ICP de Collectionat — a quién buscar, a quién no

Documento comercial (no técnico). Define el perfil de cliente ideal, los verticales
priorizados y cómo armar la búsqueda de leads. Sirve como referencia para prospección,
para escribir copy y para decidir qué rubros mostrar en la sección **Industrias** de la
landing (`components/pages/landing-*.tsx`).

---

## El criterio de fondo

**Collectionat encaja donde el caos es documental y de plazos, no productivo.**
La app no maneja stock, producción ni logística: maneja información, documentos,
vencimientos y personas. El cliente ideal es una empresa que **administra obligaciones**
(contratos, expedientes, habilitaciones, cobranzas) más que una que **fabrica o mueve
cosas**.

Este criterio filtra mejor que cualquier vertical: si una empresa no entra acá, no entra
aunque su rubro figure en la tabla de abajo.

## Los cuatro filtros que definen el fit real

| # | Filtro | Por qué |
|---|---|---|
| 1 | **8 a 150 empleados** | Menos de 8 no justifican los $4.500 USD (usan Drive y sobreviven). Más de 150 ya suelen tener ERP y comité de compras. |
| 2 | **Ya usan Microsoft 365** | Es el diferencial entero. Una empresa 100% Google Workspace no es lead: es una migración, y ahí se pierde. |
| 3 | **Tienen vencimientos que duelen si se pasan** | Contratos, matrículas, habilitaciones, plazos procesales, expensas, pólizas. Sin dolor de fecha, el módulo de alertas no vende. |
| 4 | **Hay un dueño del desorden identificable** | Alguien cuyo día se arruina cuando falta un papel: socio administrador, gerente de administración, jefa de operaciones. Si no existe ese cargo, no hay comprador. |

---

## Verticales A — atacar estos primero

| Rubro | Cargos a buscar | Tamaño | Dolor que compra |
|---|---|---|---|
| **Inmobiliarias** (alquileres, no solo venta) | Director/a Comercial, Gerente de Administración, Dueño | 10–60 | Vencimientos de contratos, comisiones, actualizaciones de alquiler |
| **Estudios jurídicos** | Socio Administrador, Gerente del Estudio | 8–50 | Plazos procesales, expedientes dispersos, honorarios |
| **Administradoras de consorcios** | Gerente de Operaciones, Dueño | 10–60 | Expensas, reclamos, pólizas, proveedores por edificio |
| **Escribanías / notarías** | Escribano/a Titular | 5–20 | Trámites en curso, documentación de partes, folios |
| **Estudios contables** | Socio, Gerente de Operaciones | 10–80 | Vencimientos AFIP por cliente, documentación, legajos |
| **Distribuidoras / mayoristas** | Gerente de Administración y Finanzas | 20–120 | Cuentas por cobrar, contratos con clientes, cobranza en calle |

**Estudios contables** merece atención aparte: es el vertical con más densidad de
vencimientos por empleado del mercado y además son **multiplicadores** — un contador que
usa Collectionat lo recomienda a veinte PyMEs.

> Hoy la landing sólo muestra **Inmobiliarias** y **Estudios jurídicos** como verticales
> con módulos propios (más el genérico "Tu rubro también"). Los otros cuatro son
> candidatos naturales a sumarse a esa sección cuando haya un caso real que mostrar.

## Verticales B — funcionan, pero con más fricción

- Clínicas y centros médicos
- Aseguradoras y brokers de seguros
- Constructoras y desarrolladoras
- Agencias de RRHH y consultoras de selección
- Importadoras / despachantes de aduana
- Colegios e institutos privados

Problema común del grupo: o el decisor está oculto detrás de un director técnico
(clínicas), o ya compraron software específico del rubro (constructoras con software de
obra), o el ciclo de venta pasa por un consejo directivo (colegios).

## Dónde no perder tiempo

| Segmento | Por qué no |
|---|---|
| Comercios minoristas y gastronomía | Su dolor es punto de venta y stock, no documentación. |
| Industria y manufactura | Necesitan ERP/MRP: se compite de frente y se pierde. |
| Agencias creativas, software factories, startups | Viven en Notion, Slack y Google. La integración con Microsoft les es indiferente o directamente negativa. |
| Freelancers y micro-estudios (menos de 5) | No hay presupuesto. |
| Corporativos de +300 | Ciclo de 9 meses compitiendo con Dynamics y SAP. |

---

## Cómo armar la búsqueda

### LinkedIn Sales Navigator

El filtro más rentable no es industria sino **título + tamaño**, porque las inmobiliarias
y estudios chicos suelen tener mal cargada la industria.

- **Títulos**: `"Socio Administrador" OR "Gerente de Administración" OR "Gerente de Operaciones" OR "Directora de Administración" OR "Administrador"`
- **Empleados**: 11–50, 51–200
- **Geografía**: La Plata / Gran Buenos Aires / CABA

### Google Maps

Para inmobiliarias, escribanías y administradoras, sub-representadas en LinkedIn: buscar
por rubro + ciudad y filtrar los que tengan sitio web propio y más de 30 reseñas. El sitio
web es el proxy de "empresa formalizada con presupuesto".

### Señal de Microsoft 365 (el filtro de mayor impacto)

El dominio del mail que figura en su web. Si el contacto es `info@empresa.com.ar` y el MX
apunta a Outlook, es lead A. Se verifica gratis:

```bash
nslookup -type=mx empresa.com.ar   # o MXToolbox
```

Este filtro sube la tasa de conversión más que cualquier mejora del copy.

---

## Recomendación de foco

**No buscar leads en las seis verticales a la vez.** Elegir una, hacer 100 contactos,
medir. Con seis rubros en paralelo no se puede afinar el mensaje ni interpretar por qué no
responden — y los aprendizajes de una inmobiliaria no sirven para un contador.

Punto de partida sugerido: **estudios jurídicos en La Plata**. Ya hay producto pensado
para ese rubro (módulos de causas, agenda, portales oficiales), el mercado es
geográficamente denso y los socios se conocen entre sí, así que el boca a boca compensa el
ciclo de venta.
