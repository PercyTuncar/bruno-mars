# PRD — brunomars.lat
## Plataforma de venta de entradas "The Romantic Tour" para LATAM

**Versión:** 1.0
**Fecha:** Agosto 2026
**Dominio:** brunomars.lat
**Stack:** Next.js (App Router, última versión estable) + TypeScript + Tailwind CSS v4 + shadcn/ui + Radix UI + lucide-react, desplegado en Cloudflare Workers vía `@opennextjs/cloudflare`.

---

## 0. Resumen ejecutivo

Se construirá un sitio web multi-país 100% orientado a SEO para la venta de entradas del "The Romantic Tour" de Bruno Mars en LATAM (Perú, Chile, Argentina, Colombia y Brasil), con una Home global, una página por país (landing informativa), una página de venta de entradas por país (`/entradas` o `/ingressos` en Brasil) y un flujo de checkout preparado para integrarse con pasarela de pago en una fase posterior. El objetivo de posicionamiento es doble por país:

1. Búsqueda transaccional ("entradas bruno mars [país]") → debe rankear en primer lugar la página de venta de entradas del país.
2. Búsqueda informativa/marca ("bruno mars [país]") → debe rankear en primer lugar la landing del país, y en segundo lugar la página de entradas del mismo país.

Cada país debe comportarse como una unidad SEO independiente: metadatos, JSON-LD, contenido, idioma (portugués en Brasil) y estructura de precios/zonas propios, sin reutilizar datos de otro país, para evitar canibalización y contenido duplicado, y para permitir que cada país evolucione (nuevas zonas, cambios de nombre, nuevas fechas) sin afectar a los demás.

---

## 1. Investigación previa (resumen de hallazgos y fuentes que rigen las decisiones técnicas)

Antes de definir la arquitectura se investigó documentación oficial y fuentes técnicas actuales (2025-2026). Resumen de lo que rige el diseño técnico de este PRD:

### 1.1 Next.js Metadata API (App Router)
- Next.js (App Router) ofrece **Metadata API** basada en configuración (`export const metadata` o `export async function generateMetadata()`) en cada `page.tsx`/`layout.tsx`, y **Metadata basada en archivos** (`opengraph-image`, `favicon`, `sitemap.ts`, `robots.ts`, `manifest.ts`). Next.js genera automáticamente las etiquetas `<head>` correctas sin que el desarrollador manipule el DOM manualmente.
- `generateMetadata({ params })` es la forma correcta de producir metadatos **dinámicos por segmento de ruta** (título, descripción, canonical, OpenGraph, hreflang vía `alternates.languages`), leyendo datos desde un archivo de datos o CMS según el parámetro de la URL (país). Esto es exactamente lo que se necesita para que cada `/peru`, `/chile`, etc. tenga metadatos propios y no “herede” los de la Home (error común documentado: metadatos “atascados” en home cuando `params` no se maneja bien).
- El renderizado del `<head>` ocurre en el servidor (Server Components), por lo que los crawlers reciben el HTML final ya con título/descripción/JSON-LD correctos en la primera respuesta (sin depender de JS del cliente).

### 1.2 Sitemap y robots dinámicos
- Next.js App Router permite generar `sitemap.xml` de forma **dinámica y programática** mediante `app/sitemap.ts` (retornando un arreglo `MetadataRoute.Sitemap`), incluyendo soporte nativo para **sitemaps particionados** (`generateSitemaps()`) cuando el número de URLs crece (blog, futuras ciudades).
- De igual forma `app/robots.ts` permite generar `robots.txt` de forma programática y controlada por entorno (bloqueando staging, permitiendo producción).
- Google recomienda mantener el sitemap actualizado y enviarlo a Search Console tras cambios relevantes (fechas de concierto confirmadas, nuevas zonas, etc.).

### 1.3 Datos estructurados (JSON-LD) — Event / Offer
Según la documentación de Google Search Central para **Event structured data**:
- **Propiedades obligatorias:** `name`, `startDate`, `location` (tipo `Place`, con `name` y `address` de tipo `PostalAddress`, o `VirtualLocation` si aplica). Si el evento tiene entradas de pago, `offers` es obligatorio y dentro de `offers` son obligatorios: `url`, `price`, `priceCurrency`, `availability`.
- **Propiedades recomendadas:** `endDate`, `eventAttendanceMode`, `eventStatus`, `image` (idealmente 3 relaciones de aspecto: 1x1, 4x3, 16x9), `description`, `performer` (tipo `PerformingGroup`/`Person`), `organizer`, `offers.validFrom`, `offers.validThrough`, `offers.inventoryLevel`, `offers.name` (para diferenciar zonas).
- Para eventos con **múltiples entradas/zonas** (nuestro caso: 10 zonas), `offers` acepta un **arreglo de objetos `Offer`**, uno por zona, cada uno con su propio `price`, `priceCurrency`, `url`, `availability`, `name` (nombre de la zona) y `validFrom`.
- El tipo recomendado para conciertos es `MusicEvent` (subtipo de `Event`), que agrega semántica de `performer`.
- Es válida y recomendada la combinación `Event` + `Product`/`Offer` cuando la página vende entradas directamente (patrón `@graph` con múltiples entidades enlazadas), lo cual usaremos en `/entradas`.
- Debe validarse siempre con la **Rich Results Test** de Google antes de cada release y los valores del JSON-LD deben **coincidir exactamente** con lo visible en pantalla (precio, moneda, disponibilidad), condición indispensable para mantener elegibilidad a rich results.

### 1.4 Hreflang e indexación multi-país
- El atributo `hreflang` (vía `<link rel="alternate" hreflang="...">`, cabecera HTTP, o dentro del sitemap XML) resuelve dos problemas: (a) contenido duplicado/similar entre países con el mismo idioma (Perú, Chile, Argentina, Colombia — todos en español) y (b) indicarle a Google qué versión mostrar a qué usuario.
- Nuestro caso es **"mismo idioma, distinto país"** (es-PE, es-CL, es-AR, es-CO) más **"distinto idioma, distinto país"** (pt-BR). Cada URL del set debe declarar hreflang para **todas** las variantes, incluidas ella misma (self-referencing), más una versión **`x-default`** (recomendada por Google) que apunta a la Home global (selector de país).
- El sitemap.xml es el método recomendado para sitios grandes porque evita inflar el `<head>` de cada página con decenas de `<link>` cuando crecen los países; en nuestro caso (5 países) usaremos **ambos**: `<link>` en el `<head>` vía `alternates.languages` de la Metadata API (simple con 5 países) **y** anotación hreflang dentro del sitemap XML como refuerzo.
- Cada URL debe ser **completa y absoluta** (`https://brunomars.lat/peru/entradas`), y el hreflang debe ser **recíproco** entre todas las variantes.

### 1.5 Renderizado y cómo Google interpreta el sitio
- Google (Googlebot) ejecuta un proceso de **rendering en dos oleadas** (crawling → renderizado con Chromium headless en cola separada → indexación). Depender de renderizado 100% client-side introduce demoras y riesgo de indexación incompleta.
- Por eso las páginas críticas para SEO (`/`, `/[pais]`, `/[pais]/entradas`, `/blog/[slug]`) deben usar **SSG (Static Site Generation) con `generateStaticParams`** para los 5 países + **ISR (Incremental Static Regeneration)** con `revalidate` para permitir actualizar precios/disponibilidad sin rebuild completo. El checkout (`/[pais]/entradas/checkout`), al depender de estado de carrito, puede ser **SSR/dinámico** pero debe conservar metadatos y HTML base indexable (no bloquear el `<head>`).
- Esto garantiza que Googlebot reciba HTML completo en el primer *fetch*, sin depender de la segunda oleada de renderizado JS, acelerando la indexación.

### 1.6 Despliegue en Cloudflare (vigente a 2026)
- La vía **oficial y recomendada actualmente** para desplegar Next.js en Cloudflare es el **adaptador `@opennextjs/cloudflare`** (basado en el proyecto OpenNext), que transforma el build de Next.js en un paquete compatible con **Cloudflare Workers**. Cloudflare indica explícitamente que este adaptador **reemplaza** al enfoque anterior "Next on Pages", que ha quedado obsoleto.
- Este adaptador soporta App Router, Server Components, ISR, Middleware, Route Handlers y la mayoría de features de Next.js 14/15+ ejecutándose sobre el runtime de Workers (compatibilidad Node.js vía `nodejs_compat`).
- Se integra con Wrangler (`wrangler.jsonc`/`wrangler.toml`) para definir el binding del Worker, variables de entorno, KV/R2 si se requiere cache de assets, y con **Cloudflare Pages/Workers Assets** para servir los archivos estáticos generados.
- Se recomienda usar **Cloudflare Cache API / Cache Rules** para servir con máxima velocidad las páginas estáticas por país (TTFB bajo = factor de Core Web Vitals = señal de ranking).

### 1.7 Librerías de diseño investigadas
- **shadcn/ui** (sobre **Radix UI** + **Tailwind CSS**) es actualmente el estándar de facto para proyectos Next.js modernos: no es una dependencia de npm tradicional sino componentes "copiados" al proyecto (control total del código, cero lock-in, accesibilidad de Radix ya resuelta, 100% themable con variables CSS). Es compatible nativamente con Next.js App Router y TypeScript, ideal para dark/light mode mediante variables CSS.
- **Tailwind CSS v4** (motor CSS-first, variables nativas, mejor rendimiento de build) será la base de estilos.
- **lucide-react** como librería de iconos: set moderno, mantenido activamente, tree-shakeable, consistente en trazo, con cientos de iconos (calendario, ubicación, ticket, moneda, etc.), ideal para un diseño limpio tipo "editorial/romántico".
- Motion: **Framer Motion (Motion for React)** para las animaciones del navbar líquido/glass y transiciones del hero.

---

## 2. Objetivos del proyecto

1. Vender entradas del tour de Bruno Mars en 5 países de LATAM con una experiencia rápida, elegante y 100% responsive.
2. Posicionar en el **top 1 de Google** cada página de país para búsquedas de marca+país, y en **top 1** cada página de entradas para búsquedas transaccionales, en el idioma y país correspondiente.
3. Evitar contenido duplicado/canibalización entre países mediante arquitectura de datos independiente, hreflang correcto y metadatos únicos.
4. Preparar el checkout (UI completa) dejando el botón de pago deshabilitado, listo para conectar una pasarela de pago en una fase posterior.
5. Sentar una base de contenido (blog) que sostenga tráfico orgánico de cola larga (long tail) en cada país.
6. Lograr un diseño visualmente distintivo (no plantilla genérica), con identidad "The Romantic Tour": rojo rosa profundo, elegante, mate, con navbar "glass/liquid" moderno y hero no convencional.

## 3. Alcance

**Incluye:**
- Home (`/`) global multi-país.
- Página de país: `/peru`, `/chile`, `/argentina`, `/colombia`, `/brasil`.
- Página de entradas por país: `/peru/entradas`, `/chile/entradas`, `/argentina/entradas`, `/colombia/entradas`, y `/brasil/ingressos` (nomenclatura en portugués).
- Checkout por país: `/peru/entradas/checkout`, etc. (`/brasil/ingressos/checkout`).
- Blog con posts agregados manualmente desde código (MDX/archivo estático), con su propio SEO.
- robots.txt, sitemap.xml, JSON-LD, Open Graph, Twitter Cards, favicons, manifest PWA básico.
- Modo oscuro / modo claro con detección automática + toggle manual en navbar.

**No incluye (fase futura):**
- Integración real de pasarela de pago (Culqi, MercadoPago, Stripe, PagSeguro, etc.) — el botón "Pagar" queda deshabilitado.
- Backend de inventario en tiempo real (se usará data estática/mock por país, fácilmente migrable a base de datos).
- Panel de administración (CMS interno) — el blog se gestiona manualmente vía código en esta fase.

---

## 4. Arquitectura técnica

### 4.1 Stack
| Capa | Tecnología |
|---|---|
| Framework | Next.js (App Router, última versión estable) |
| Lenguaje | TypeScript |
| Estilos | Tailwind CSS v4 |
| Componentes UI | shadcn/ui + Radix UI |
| Iconos | lucide-react |
| Animaciones | Motion (Framer Motion) |
| Fuentes | `next/font` (auto-hospedadas, sin llamada externa a Google Fonts → mejora performance/CWV) |
| Hosting | Cloudflare Workers vía `@opennextjs/cloudflare` |
| Control de versiones | Git + GitHub |
| CI/CD | GitHub Actions → Wrangler deploy a Cloudflare |
| Contenido blog | MDX local (`content/blog/*.mdx`), sin CMS externo por ahora |
| Analítica | Cloudflare Web Analytics (sin cookies, no afecta CWV) + Google Search Console |

### 4.2 Estrategia de renderizado por tipo de página
| Página | Estrategia | Motivo |
|---|---|---|
| `/` (Home) | SSG + ISR (`revalidate: 3600`) | Contenido cambia poco, debe ser ultra rápida |
| `/[pais]` | SSG con `generateStaticParams` (5 países) + ISR | Info del concierto puede actualizarse (fechas confirmadas) sin rebuild |
| `/[pais]/entradas` (o `/ingressos`) | SSG + ISR (`revalidate: 300`) | Precios/disponibilidad cambian con más frecuencia |
| `/[pais]/entradas/checkout` | Dinámico (Server Component + Client Component para el carrito), sin `noindex` pero con contenido mínimo indexable + JSON-LD `BreadcrumbList` | Depende del estado del carrito (query params/localStorage), pero debe mantenerse crawleable en su versión base |
| `/blog` y `/blog/[slug]` | SSG (MDX compilado en build) | Contenido estático, ideal para máxima velocidad y SEO |
| `sitemap.xml`, `robots.txt` | File-based, generados en build (`app/sitemap.ts`, `app/robots.ts`) | Requisito de Next.js App Router |

### 4.3 Prevención de contenido duplicado / cruce de SEO entre países
1. **Datos 100% independientes por país**: cada país tiene su propio archivo de datos (`/data/countries/peru.ts`, `/data/countries/chile.ts`, etc.) con: nombre de zonas, precios, moneda, fechas, venue, textos de metadescripción, FAQ, JSON-LD. Ningún componente “mezcla” datos de dos países en una misma request.
2. **Canonical estricto**: cada página declara su propio `alternates.canonical` (nunca apunta a otra URL). Ej. `/peru/entradas` → canonical `https://brunomars.lat/peru/entradas`.
3. **Hreflang recíproco completo** en cada página (ver sección 7).
4. **Sin parámetros de query indexables**: filtros de zona/cantidad en `/entradas` deben ir por estado de cliente, no por querystring indexable, para no generar URLs duplicadas.
5. **Contenido único redactado por país**: no traducir/clonar el texto entre países (aunque compartan idioma). Cada país tiene su propia introducción, FAQ, y bloque "Sobre el concierto en `<País>`" con menciones locales (venue, ciudad, moneda, forma de pago habitual).
6. **`generateStaticParams` explícito** limitando las rutas válidas a los 5 países soportados (evita rutas fantasma indexables tipo `/xx` con contenido vacío que generarían *soft 404*).
7. **Middleware de país** (opcional, Fase 2): detectar país del visitante por IP/Accept-Language solo para **sugerir** redirección (banner, nunca redirect automático agresivo que dañe SEO), respetando que Googlebot siempre vea el contenido correspondiente a la URL solicitada.

---

## 5. Estructura de URLs

```
brunomars.lat/                                  → Home global (todos los conciertos LATAM)
brunomars.lat/peru                               → Landing informativa Perú   (title: "Bruno Mars en Perú")
brunomars.lat/peru/entradas                      → Venta de entradas Perú     (title: "Entradas Bruno Mars Perú")
brunomars.lat/peru/entradas/checkout             → Checkout Perú

brunomars.lat/chile                              → Landing informativa Chile
brunomars.lat/chile/entradas                     → Venta de entradas Chile
brunomars.lat/chile/entradas/checkout            → Checkout Chile

brunomars.lat/argentina                          → Landing informativa Argentina
brunomars.lat/argentina/entradas                 → Venta de entradas Argentina
brunomars.lat/argentina/entradas/checkout        → Checkout Argentina

brunomars.lat/colombia                           → Landing informativa Colombia
brunomars.lat/colombia/entradas                  → Venta de entradas Colombia
brunomars.lat/colombia/entradas/checkout         → Checkout Colombia

brunomars.lat/brasil                             → Landing informativa Brasil (en portugués)
brunomars.lat/brasil/ingressos                   → Venta de entradas Brasil (en portugués)
brunomars.lat/brasil/ingressos/checkout          → Checkout Brasil (en portugués)

brunomars.lat/blog                               → Índice del blog
brunomars.lat/blog/[slug]                        → Post individual
brunomars.lat/sitemap.xml
brunomars.lat/robots.txt
```

> Nota: se usa `/entradas` (ES) e `/ingressos` (PT-BR) como slug **por país**, no un slug fijo global, precisamente para que cada URL esté 100% en el idioma local — señal fuerte de relevancia semántica/local para Google.

---

## 6. Estructura de archivos y carpetas del proyecto

```
brunomars-lat/
├── app/
│   ├── layout.tsx                      # Root layout: fuentes, ThemeProvider (dark/light), navbar, footer globales
│   ├── globals.css                     # Variables CSS (paleta, tipografía, tokens light/dark)
│   ├── sitemap.ts                      # Genera sitemap.xml dinámico (incluye anotaciones hreflang)
│   ├── robots.ts                       # Genera robots.txt dinámico
│   ├── manifest.ts                     # Web App Manifest (PWA básico)
│   ├── opengraph-image.tsx             # OG image dinámica global (fallback)
│   ├── icon.tsx / favicon.ico          # Favicons
│   ├── page.tsx                        # Home global (/)
│   ├── loading.tsx                     # Skeleton de carga global
│   ├── not-found.tsx                   # 404 personalizada (con enlaces a los 5 países, buena para SEO)
│   ├── error.tsx                       # Error boundary
│   │
│   ├── [pais]/
│   │   ├── layout.tsx                  # Layout de país: valida país soportado, inyecta datos base + JSON-LD Event
│   │   ├── page.tsx                    # Landing del país (/peru, /chile, ...)
│   │   ├── generateStaticParams.ts     # (o dentro de page.tsx) Lista los 5 países válidos
│   │   │
│   │   ├── entradas/                   # (en Brasil este folder se resuelve como "ingressos", ver 6.1)
│   │   │   ├── page.tsx                # Página de venta de entradas del país
│   │   │   ├── zonas/                  # Componentes de zonas y precios (uno por país, ver 6.2)
│   │   │   └── checkout/
│   │   │       ├── page.tsx            # Resumen de pedido + botón "Pagar" (deshabilitado)
│   │   │       └── loading.tsx
│   │
│   └── blog/
│       ├── page.tsx                    # Índice del blog (listado + SEO)
│       └── [slug]/
│           └── page.tsx                # Post individual (MDX renderizado)
│
├── data/
│   ├── countries/
│   │   ├── peru.ts                     # Datos 100% independientes: fechas, venue, moneda, SEO copy, FAQ
│   │   ├── chile.ts
│   │   ├── argentina.ts
│   │   ├── colombia.ts
│   │   └── brasil.ts
│   │
│   ├── zones/
│   │   ├── peru.zones.ts               # 10 zonas + precios en PEN (independiente, no reutilizado)
│   │   ├── chile.zones.ts              # 10 zonas (mismos nombres) + precios en CLP
│   │   ├── argentina.zones.ts          # + precios en ARS
│   │   ├── colombia.zones.ts           # + precios en COP
│   │   └── brasil.zones.ts             # + precios en BRL (contenido en portugués)
│   │
│   └── countries.config.ts             # Registro central: slugs válidos, idioma, moneda, hreflang map (solo enrutamiento, NO precios/textos)
│
├── content/
│   └── blog/
│       ├── bruno-mars-the-romantic-tour-fechas-latam.mdx
│       ├── que-llevar-a-un-concierto-de-bruno-mars.mdx
│       └── ...                         # Se agregan manualmente, un archivo .mdx por post
│
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx                  # Navbar "glass/liquid" con blur, animación al hacer scroll
│   │   ├── Footer.tsx
│   │   ├── ThemeToggle.tsx             # Switch modo oscuro/claro
│   │   └── CountrySwitcher.tsx         # Selector de país (para x-default / navegación)
│   │
│   ├── home/
│   │   ├── HeroHome.tsx                # Hero moderno (no clásico) — ver sección 12
│   │   ├── TourDatesGrid.tsx           # Grilla de fechas por país
│   │   └── LatamMap.tsx                # Mapa/visual interactivo de conciertos LATAM
│   │
│   ├── country/
│   │   ├── HeroCountry.tsx             # Hero específico del país (imagen/fecha/venue)
│   │   ├── ConcertInfo.tsx             # Bloque informativo (fechas, venue, política de acceso)
│   │   ├── FaqSection.tsx
│   │   └── CtaBuyTickets.tsx           # CTA que redirige a /[pais]/entradas
│   │
│   ├── tickets/
│   │   ├── ZoneCard.tsx                # Tarjeta de zona reutilizable a NIVEL VISUAL (recibe props ya resueltas por país)
│   │   ├── ZoneCompareButton.tsx       # Botón "Comparar" por zona
│   │   ├── QuantitySelector.tsx        # Selector de cantidad de entradas
│   │   ├── PriceSummary.tsx            # Resumen dinámico del carrito
│   │   └── VenueMapSVG.tsx             # Mapa del estadio con zonas (SVG)
│   │
│   ├── checkout/
│   │   ├── OrderSummary.tsx
│   │   ├── BuyerForm.tsx               # Formulario de datos del comprador
│   │   └── PayButtonDisabled.tsx       # Botón de pago deshabilitado + tooltip "Próximamente"
│   │
│   ├── blog/
│   │   ├── PostCard.tsx
│   │   └── PostContent.tsx
│   │
│   ├── seo/
│   │   ├── JsonLd.tsx                  # Componente genérico para inyectar <script type="application/ld+json">
│   │   └── Breadcrumbs.tsx             # Breadcrumbs visuales + JSON-LD BreadcrumbList
│   │
│   └── ui/                             # Componentes shadcn/ui generados (button, card, dialog, sheet, tabs, etc.)
│
├── lib/
│   ├── seo/
│   │   ├── metadata.ts                 # Helpers para construir generateMetadata por tipo de página
│   │   ├── jsonld.ts                   # Builders de JSON-LD (Event, Offer, BreadcrumbList, FAQPage, Organization)
│   │   └── hreflang.ts                 # Genera el mapa de alternates.languages para cada país
│   ├── utils.ts
│   └── format-currency.ts              # Formateo de precios por locale/moneda (Intl.NumberFormat)
│
├── public/
│   ├── images/
│   │   ├── countries/                  # Fotos de cada venue/ciudad
│   │   └── og/                         # Imágenes Open Graph estáticas de respaldo
│   └── fonts/                          # (si no se usan Google Fonts vía next/font)
│
├── middleware.ts                       # (Fase 2) Sugerencia de país, nunca redirect forzado agresivo
├── wrangler.jsonc                      # Configuración de despliegue en Cloudflare Workers
├── open-next.config.ts                 # Configuración del adaptador @opennextjs/cloudflare
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

### 6.1 Cómo se resuelve `/entradas` vs `/ingressos` sin duplicar código de rutas
Se usará un **route group con slug de acción configurable por país**: la carpeta física se llama `entradas`, pero para Brasil el `layout.tsx` de `[pais]` hace un `rewrite` interno (`next.config.ts` → `rewrites()`) de `/brasil/ingressos` → `/brasil/entradas` a nivel de servidor. De cara al usuario y a Google, **la URL pública siempre es `/brasil/ingressos`** (esto es lo que importa para SEO); internamente el framework resuelve el mismo árbol de componentes. Esto evita duplicar toda la lógica de checkout/zonas solo por el nombre del slug, sin sacrificar que la URL indexada esté en portugués.

### 6.2 Independencia de datos de zonas (requisito explícito del cliente)
- Cada archivo `data/zones/<pais>.zones.ts` exporta su propio arreglo de objetos `Zone` con: `id`, `name` (idéntico entre países, ej. "OCCIDENTE 1"), `price` (número en moneda local), `currency` (`PEN`, `CLP`, `ARS`, `COP`, `BRL`), `category` (`stand_up` | `numerada`), `available` (boolean/stock).
- **No existe un archivo único "zonas.json" global** que todos los países lean; cada país tiene el suyo, así que renombrar o agregar zonas en Chile **no afecta ni recompila** los datos de Perú.
- El **componente visual** (`ZoneCard.tsx`) sí es compartido (esto es una buena práctica de UI, no de SEO/datos) para mantener consistencia de diseño, pero recibe todos sus valores por props ya resueltos desde el archivo de datos del país correspondiente — nunca hace fetch cruzado ni fallback a otro país.

---

## 7. Especificación SEO por tipo de página

### 7.1 Home (`/`)
- `<title>`: `Bruno Mars en LATAM 2027 | The Romantic Tour — Fechas y Entradas`
- `<meta name="description">`: resumen con las fechas/ciudades confirmadas y llamada a la acción, mencionando los 5 países.
- `<link rel="canonical" href="https://brunomars.lat/">`
- Hreflang: `x-default` → `/`, y no se listan variantes de país en la Home (la Home es agnóstica; cada país referencia la Home solo indirectamente vía navegación, no vía hreflang direccional, para no forzar a Google a intercambiar Home por landing de país).
- JSON-LD: `Organization` (marca del sitio/promotor) + `ItemList` con los 5 `MusicEvent` (uno por país) enlazados a su URL de país — permite a Google entender que la Home es un índice de eventos.
- H1 único: "Bruno Mars — The Romantic Tour en LATAM".
- Contenido: grilla de 5 tarjetas de país con fecha, ciudad, estadio, CTA "Ver entradas en `<país>`".

### 7.2 Página de país — ejemplo Perú (`/peru`)
- `<title>`: `Bruno Mars en Perú` *(tal como lo pide el cliente, exacto)*.
- `<meta name="description">`: Ejemplo: `Bruno Mars en Perú llega con The Romantic Tour. Consulta fechas, zonas y compra tus entradas oficiales para el concierto.`
- Canonical: `https://brunomars.lat/peru`
- Hreflang (declarado en `<head>` vía `alternates.languages`, recíproco en las 5 páginas de país):
  ```html
  <link rel="alternate" hreflang="es-PE" href="https://brunomars.lat/peru" />
  <link rel="alternate" hreflang="es-CL" href="https://brunomars.lat/chile" />
  <link rel="alternate" hreflang="es-AR" href="https://brunomars.lat/argentina" />
  <link rel="alternate" hreflang="es-CO" href="https://brunomars.lat/colombia" />
  <link rel="alternate" hreflang="pt-BR" href="https://brunomars.lat/brasil" />
  <link rel="alternate" hreflang="x-default" href="https://brunomars.lat/" />
  ```
- **Jerarquía HTML obligatoria** (orden y semántica que exige la documentación de accesibilidad/SEO on-page):
  ```
  <html lang="es-PE">
    <head> ... metadatos + JSON-LD ... </head>
    <body>
      <header> <!-- Navbar --> </header>
      <main>
        <h1>Bruno Mars en Perú</h1>                     <!-- único H1 de la página -->
        <section aria-label="Información del concierto">
          <h2>Fechas confirmadas en Perú</h2>
          <p>...</p>
        </section>
        <section aria-label="Detalles del recinto">
          <h2>Estadio Nacional de Lima</h2>
          ...
        </section>
        <section aria-label="Zonas y precios">
          <h2>Zonas y precios</h2>
          <!-- Tarjetas de zona con botón "Comparar" -> redirige a /peru/entradas -->
        </section>
        <section aria-label="Preguntas frecuentes">
          <h2>Preguntas frecuentes</h2>
          <!-- usa <h3> por pregunta + JSON-LD FAQPage -->
        </section>
        <nav aria-label="Breadcrumb"> <!-- Inicio > Perú --> </nav>
      </main>
      <footer> ... </footer>
    </body>
  </html>
  ```
- Etiquetas obligatorias adicionales: `<meta name="robots" content="index, follow">`, Open Graph completo (`og:title`, `og:description`, `og:image`, `og:url`, `og:type=website`, `og:locale=es_PE`), Twitter Card (`summary_large_image`), `<link rel="icon">`, `<meta name="viewport">`.
- **JSON-LD** (tipo `MusicEvent`, un objeto por fecha confirmada; si son 2 fechas, se listan 2 eventos dentro de un `@graph`, o se usa un solo evento con `subEvent` para cada fecha — se optará por **2 objetos `MusicEvent` independientes**, ya que cada fecha tiene su propia disponibilidad):

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "MusicEvent",
      "@id": "https://brunomars.lat/peru#evento-3-set",
      "name": "Bruno Mars - The Romantic Tour (Perú, 3 de setiembre)",
      "startDate": "2027-09-03T21:00:00-05:00",
      "endDate": "2027-09-04T00:00:00-05:00",
      "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
      "eventStatus": "https://schema.org/EventScheduled",
      "location": {
        "@type": "Place",
        "name": "Estadio Nacional de Lima",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Paseo de la República s/n",
          "addressLocality": "Lima",
          "addressRegion": "Lima",
          "postalCode": "15046",
          "addressCountry": "PE"
        }
      },
      "image": [
        "https://brunomars.lat/images/countries/peru/hero-1x1.jpg",
        "https://brunomars.lat/images/countries/peru/hero-4x3.jpg",
        "https://brunomars.lat/images/countries/peru/hero-16x9.jpg"
      ],
      "description": "Bruno Mars llega a Lima, Perú, con The Romantic Tour el 3 de setiembre de 2027 en el Estadio Nacional.",
      "performer": {
        "@type": "Person",
        "name": "Bruno Mars"
      },
      "organizer": {
        "@type": "Organization",
        "name": "brunomars.lat",
        "url": "https://brunomars.lat"
      },
      "offers": {
        "@type": "AggregateOffer",
        "url": "https://brunomars.lat/peru/entradas",
        "priceCurrency": "PEN",
        "lowPrice": "172.50",
        "highPrice": "793.50",
        "offerCount": "10",
        "availability": "https://schema.org/InStock",
        "validFrom": "2026-09-01T10:00:00-05:00"
      }
    },
    {
      "@type": "MusicEvent",
      "@id": "https://brunomars.lat/peru#evento-4-set",
      "name": "Bruno Mars - The Romantic Tour (Perú, 4 de setiembre)",
      "startDate": "2027-09-04T21:00:00-05:00",
      "...": "misma estructura que el evento anterior, con su propio @id"
    }
  ]
}
```

> Nota: para el evento del país se usa `AggregateOffer` (rango de precios, `lowPrice`/`highPrice`) porque la página `/peru` es informativa. El **detalle exacto por zona** (Offer individual) vive en el JSON-LD de `/peru/entradas` (ver 7.3).

### 7.3 Página de entradas — ejemplo Perú (`/peru/entradas`)
- `<title>`: `Entradas Bruno Mars Perú` *(tal como lo pide el cliente, exacto)*.
- `<meta name="description">`: Ejemplo: `Compra tus entradas oficiales para Bruno Mars en Perú. The Romantic Tour, 3 y 4 de setiembre de 2027, Estadio Nacional. Elige tu zona: Occidente, Oriente, Cancha o Tribuna Norte.`
- Canonical + hreflang recíproco igual que el país (mismo esquema, apuntando a `/entradas` de cada país y `/ingressos` en Brasil).
- Jerarquía HTML:
  ```
  <h1>Entradas Bruno Mars Perú</h1>
  <h2>Elige tu zona</h2>
    <h3>Occidente 1</h3> ... (una por zona, dentro de cada ZoneCard, o usar semántica de lista <ul>/<li> con encabezados visuales si se prioriza jerarquía de 2 niveles)
  <h2>Resumen de tu compra</h2>
  ```
- **JSON-LD** (Producto/Oferta por zona — se usa `@graph` combinando `MusicEvent` + un `Offer` por cada una de las 10 zonas):

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "MusicEvent",
      "@id": "https://brunomars.lat/peru/entradas#evento",
      "name": "Bruno Mars - The Romantic Tour (Perú)",
      "startDate": "2027-09-03T21:00:00-05:00",
      "location": {
        "@type": "Place",
        "name": "Estadio Nacional de Lima",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Lima",
          "addressCountry": "PE"
        }
      },
      "performer": { "@type": "Person", "name": "Bruno Mars" },
      "offers": [
        {
          "@type": "Offer",
          "name": "OCCIDENTE 1",
          "url": "https://brunomars.lat/peru/entradas#occidente-1",
          "price": "747.50",
          "priceCurrency": "PEN",
          "availability": "https://schema.org/InStock",
          "validFrom": "2026-09-01T10:00:00-05:00"
        },
        {
          "@type": "Offer",
          "name": "OCCIDENTE 2",
          "url": "https://brunomars.lat/peru/entradas#occidente-2",
          "price": "609.50",
          "priceCurrency": "PEN",
          "availability": "https://schema.org/InStock"
        },
        {
          "@type": "Offer",
          "name": "CANCHA 1 STAND UP",
          "url": "https://brunomars.lat/peru/entradas#cancha-1-standup",
          "price": "793.50",
          "priceCurrency": "PEN",
          "availability": "https://schema.org/InStock"
        },
        {
          "@type": "Offer",
          "name": "TRIBUNA NORTE",
          "url": "https://brunomars.lat/peru/entradas#tribuna-norte",
          "price": "172.50",
          "priceCurrency": "PEN",
          "availability": "https://schema.org/InStock"
        }
        /* ... continúa con las 10 zonas completas ... */
      ]
    }
  ]
}
```
- Este JSON-LD se genera de forma **programática** en `lib/seo/jsonld.ts` a partir de `data/zones/peru.zones.ts` (nunca hardcodeado a mano en el componente), de modo que si el precio o disponibilidad cambia, el JSON-LD se actualiza automáticamente y sigue coincidiendo con lo visible en pantalla (requisito de Google para rich results).

### 7.4 Checkout (`/peru/entradas/checkout`)
- `<title>`: `Resumen de tu compra — Entradas Bruno Mars Perú`
- `<meta name="robots" content="index, follow">` (se mantiene indexable porque es parte del embudo, pero con `noindex` condicional si el carrito está vacío, para no indexar estados vacíos sin valor — regla: si no hay ítems en el carrito, se agrega `noindex` vía `generateMetadata` dinámico).
- JSON-LD: `BreadcrumbList` (Inicio > Perú > Entradas > Checkout).
- Contenido: resumen de zonas seleccionadas + cantidades + total, formulario de datos del comprador, botón **"Pagar" deshabilitado** con texto "Próximamente" / tooltip explicando que los pagos se habilitarán pronto.
- H1: "Resumen de tu pedido".

### 7.5 Brasil — particularidades
- Todo el contenido (title, meta description, H1-H3, FAQ, botones, formularios, JSON-LD `inLanguage`, mensajes de checkout, `og:locale=pt_BR`) debe estar **100% en portugués**, sin mezclar español.
- Ejemplo de metadatos:
  - `/brasil` → title: `Bruno Mars no Brasil`
  - `/brasil/ingressos` → title: `Ingressos Bruno Mars Brasil`
  - `hreflang="pt-BR"` apuntando a estas URLs.
- Precios en `BRL`, formateados con `Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })`.

### 7.6 Blog
- Cada post: `title` único, `description`, `canonical`, JSON-LD `BlogPosting` (con `author`, `datePublished`, `dateModified`, `image`), breadcrumbs.
- Estructura: `/blog` (índice, con `<h1>Blog</h1>` y tarjetas) → `/blog/[slug]` (`<h1>` = título del post, jerarquía `h2`/`h3` según subtítulos del MDX).
- Objetivo: capturar búsquedas long-tail como "qué llevar a un concierto de Bruno Mars", "cómo llegar al Estadio Nacional", "setlist The Romantic Tour", etc., interlinkeando siempre hacia la página de entradas del país correspondiente.

---

## 8. Tabla de zonas y precios (ejemplo de arquitectura de datos independiente por país)

> **Importante:** los nombres de zona son **idénticos** en todos los países (mismo copy exacto: "OCCIDENTE 1", "CANCHA 1 STAND UP", etc.), pero cada país tiene su **propio archivo de datos**, su **propia moneda** y sus **propios valores**, sin relación de "fuente única" entre ellos. Los valores en monedas distintas a PEN mostrados abajo son **referenciales/ilustrativos** (a tasa de cambio aproximada de referencia) para poblar el mock inicial; en producción deben cargarse manualmente por el equipo comercial de cada país (o conectarse a una API de tipo de cambio, a definir en fase de pricing).

| Zona | Perú (PEN) | Chile (CLP) | Argentina (ARS) | Colombia (COP) | Brasil (BRL) |
|---|---|---|---|---|---|
| OCCIDENTE 1 | S/ 747.50 | $ 191.900 | $ 262.600 | $ 848.500 | R$ 1.111,20 |
| OCCIDENTE 2 | S/ 609.50 | $ 156.500 | $ 214.100 | $ 691.900 | R$ 906,00 |
| OCCIDENTE 3 | S/ 454.25 | $ 116.600 | $ 159.600 | $ 515.600 | R$ 675,20 |
| CANCHA 1 STAND UP | S/ 793.50 | $ 203.700 | $ 278.800 | $ 900.700 | R$ 1.179,50 |
| CANCHA 2 STAND UP | S/ 540.50 | $ 138.800 | $ 189.900 | $ 613.500 | R$ 803,40 |
| CANCHA 3 STAND UP | S/ 402.50 | $ 103.300 | $ 141.400 | $ 456.900 | R$ 598,30 |
| ORIENTE 1 | S/ 747.50 | $ 191.900 | $ 262.600 | $ 848.500 | R$ 1.111,20 |
| ORIENTE 2 | S/ 609.50 | $ 156.500 | $ 214.100 | $ 691.900 | R$ 906,00 |
| ORIENTE 3 | S/ 454.25 | $ 116.600 | $ 159.600 | $ 515.600 | R$ 675,20 |
| TRIBUNA NORTE | S/ 172.50 | $ 44.300 | $ 60.600 | $ 195.800 | R$ 256,40 |

Cada fila anterior corresponde, en código, a **objetos totalmente separados** dentro de cada `data/zones/<pais>.zones.ts` — no a una fila de una tabla compartida. Esto permite, por ejemplo, que en el futuro Chile agregue una zona "VIP Meet & Greet" sin tocar ni afectar el archivo de Perú, Argentina, Colombia o Brasil.

---

## 9. robots.txt y sitemap.xml

### 9.1 `app/robots.ts` (especificación funcional, sin código de implementación)
- Debe permitir el rastreo completo de: `/`, `/[pais]`, `/[pais]/entradas` (o `/ingressos`), `/blog`, `/blog/[slug]`.
- Debe **bloquear** rutas internas no útiles para SEO: `/api/`, `/_next/`, cualquier ruta de checkout con estado vacío si se decide excluirla, y entornos de preview/staging (usar variable de entorno para diferenciar producción vs. preview de Cloudflare).
- Debe declarar `Sitemap: https://brunomars.lat/sitemap.xml`.
- Un solo `User-agent: *` con reglas `Allow`/`Disallow`, sin reglas contradictorias.

### 9.2 `app/sitemap.ts` (especificación funcional)
- Debe listar **todas** las URLs indexables: Home, 5 páginas de país, 5 páginas de entradas, todos los posts del blog.
- Cada entrada debe incluir `lastModified`, `changeFrequency` (`daily` para `/entradas` por precios/disponibilidad, `weekly` para país, `monthly` para blog) y `priority` (Home 1.0, páginas de entradas 0.9, páginas de país 0.9, blog 0.6).
- Debe incorporar anotaciones de idioma alternativo (`languages`/`alternates`) por URL, replicando el mismo mapa de hreflang usado en `alternates.languages`, para reforzar la señal ante Google en sitios donde el `<head>` por sí solo no sea suficiente.
- Si el número de URLs crece (más ciudades, más blog), migrar a `generateSitemaps()` para partición automática (límite recomendado de 50.000 URLs por archivo de sitemap, aunque en nuestro caso no se acercará a ese volumen en el corto plazo).

---

## 10. 50 puntos clave de SEO técnico y de contenido para este proyecto

**Fundamentos técnicos (Next.js / rendering)**
1. Usar `generateMetadata` dinámico por país, nunca metadatos estáticos globales.
2. Usar `generateStaticParams` para pre-renderizar los 5 países en build time (SSG).
3. Habilitar ISR (`revalidate`) en páginas de entradas para reflejar cambios de precio/stock sin rebuild.
4. `<html lang="...">` correcto y dinámico por país (`es-PE`, `es-CL`, `es-AR`, `es-CO`, `pt-BR`).
5. Un único `<h1>` por página, con jerarquía `h2`→`h3` sin saltos.
6. Metadescripciones únicas por URL, entre 140-160 caracteres, con fecha, ciudad y CTA.
7. Titles únicos, ≤60 caracteres, con la keyword principal al inicio.
8. Canonical self-referencing obligatorio en cada URL.
9. Hreflang recíproco y con `x-default` en las 5 páginas de país y de entradas.
10. Sitemap.xml dinámico actualizado automáticamente en cada build/deploy.
11. Robots.txt sin bloqueos accidentales a CSS/JS ni a rutas indexables.
12. Evitar contenido duplicado: ningún texto copiado literal entre países.
13. URLs limpias, en minúsculas, sin guiones bajos, con slug en el idioma local (`/entradas` vs `/ingressos`).
14. Breadcrumbs visuales + JSON-LD `BreadcrumbList` en todas las páginas internas.
15. JSON-LD `MusicEvent` válido y verificado con Rich Results Test antes de cada release.
16. JSON-LD `Offer`/`AggregateOffer` con precios que coincidan exactamente con el HTML visible.
17. JSON-LD `FAQPage` en las secciones de preguntas frecuentes.
18. JSON-LD `Organization` en el layout raíz (marca/sitio).
19. JSON-LD `BlogPosting` en cada post.
20. Open Graph completo (`og:title`, `og:description`, `og:image` 1200x630, `og:locale`, `og:type`).
21. Twitter Card `summary_large_image` en todas las páginas.
22. Imágenes con `alt` descriptivo único (no genérico "imagen1.jpg").
23. Imágenes en formato moderno (`AVIF`/`WebP`) vía `next/image`, con `sizes` correctos.
24. Lazy loading nativo para imágenes below-the-fold; `priority` solo en el LCP (imagen del hero).
25. Fuentes auto-hospedadas con `next/font` (evita bloqueo de render por fuente externa).
26. Minimizar JS no crítico; usar Server Components por defecto y Client Components solo donde haya interactividad (carrito, tema, navbar).
27. Core Web Vitals objetivo: LCP < 2.5s, CLS < 0.1, INP < 200ms.
28. Preconnect/preload solo a orígenes realmente críticos (evitar exceso, que perjudica).
29. Evitar layout shift: dimensiones fijas (`width`/`height`) en imágenes y componentes de precio.
30. HTTPS forzado (gestionado por Cloudflare) + HSTS.
31. Redirects 301 (no 302) para cualquier cambio de URL futuro, para no perder equity de enlace.
32. Página 404 personalizada, útil, con enlaces a los 5 países (reduce rebote y ayuda a rastreo).
33. Evitar cadenas de redirección (>1 salto).
34. Enlazado interno cruzado: cada página de país enlaza a su `/entradas`, cada `/entradas` enlaza de vuelta a `/[pais]` y a 1-2 posts del blog relevantes.
35. Anchor text descriptivo en enlaces internos (nunca "click aquí").
36. Uso de `rel="noopener"` en enlaces externos con `target="_blank"`.
37. Datos estructurados de `AggregateOffer`/`Offer` reflejando disponibilidad real (`InStock`/`SoldOut`) — nunca mentir sobre stock (riesgo de penalización por Rich Results).
38. Contenido mínimo por página de país: al menos 300-500 palabras únicas y útiles (no relleno) sobre el show, venue y ciudad.
39. Uso correcto de `<strong>`/`<em>` para énfasis semántico (no solo negrita visual con CSS).
40. Tablas de precios accesibles semánticamente (uso de `<table>` real o `role="table"` si se maquetan con CSS Grid, para lectores de pantalla y para que Google entienda la relación zona-precio).
41. Idioma de la interfaz (`lang`) coherente en cada nodo mixto si aplica (ninguno en este caso, cada país es monolingüe puro).
42. Velocidad de servidor: TTFB bajo aprovechando el edge de Cloudflare Workers (contenido servido cerca del usuario en LATAM).
43. Cache-Control adecuado para assets estáticos (`immutable`, `max-age` largo) vía configuración de Cloudflare.
44. Evitar contenido oculto/cloaking: lo que ve Googlebot debe ser exactamente lo que ve el usuario (mismo HTML, sin trucos de user-agent).
45. Verificación de propiedad en Google Search Console **por país si se usa Search Console con segmentación de URL prefix** (se recomienda verificar el dominio completo y luego usar filtros de URL-path por país dentro de la misma propiedad).
46. Enviar el sitemap a Google Search Console y Bing Webmaster Tools tras el lanzamiento y tras cada actualización relevante de fechas.
47. Monitorear Core Web Vitals reales (CrUX) vía Search Console tras el lanzamiento, no solo Lighthouse de laboratorio.
48. Estrategia de contenido de blog para captar búsquedas informativas de cola larga y enlazar hacia `/entradas` (mejora autoridad temática del sitio, "topical authority").
49. Accesibilidad (WCAG AA): contraste de color suficiente (crítico dado el tema rojo/mate, ver sección 12), navegación por teclado, `aria-label` en botones icon-only (ej. "Comparar", toggle de tema) — la accesibilidad correlaciona con mejor SEO técnico y mejor UX medible.
50. Revisión periódica de "Cobertura" e "Indexación" en Search Console para detectar páginas excluidas por duplicado o canonicalización incorrecta apenas ocurran, antes de que afecten el ranking.

---

## 11. Datos estructurados adicionales (mínimo 10 tipos, más allá del Event/Offer)

1. **`Organization`** — en el layout raíz: nombre del sitio, logo, `sameAs` (redes sociales oficiales del tour si existen).
2. **`WebSite`** con `potentialAction` de tipo `SearchAction` — si se agrega buscador interno en el futuro (preparado desde ya en el schema aunque el buscador no exista en v1).
3. **`BreadcrumbList`** — en todas las páginas internas (país, entradas, checkout, blog).
4. **`FAQPage`** — en la sección de preguntas frecuentes de cada país (política de ingreso, edad mínima, forma de pago, etc.).
5. **`MusicEvent`** — página de país (evento informativo, `AggregateOffer`).
6. **`Offer`** (arreglo) — página de entradas (una por zona).
7. **`BlogPosting`** — cada post del blog.
8. **`Person`** — `performer` (Bruno Mars) reutilizado como referencia (`@id`) entre los distintos `MusicEvent` para reforzar la entidad.
9. **`Place`** — cada venue (Estadio Nacional de Lima, Estadio Nacional de Chile, River Plate, El Campín, Allianz Parque, etc., a confirmar por país), con `geo` (`GeoCoordinates`) cuando se tenga la ubicación exacta, útil para Google Maps/rich snippets de evento.
10. **`ImageObject`** — para las imágenes del hero de cada país (con `width`/`height`/`caption`), reforzando elegibilidad para Google Imágenes.
11. *(extra)* **`AggregateRating`/`Review`** — reservado para fase futura si se habilitan reseñas de compradores (no se implementa en v1 para no declarar datos falsos).
12. *(extra)* **`OfferCatalog`** — opcional en `/entradas` para agrupar visualmente las 10 zonas como catálogo de ofertas bajo el mismo evento, complementario al arreglo `offers`.

> Regla transversal: **todo JSON-LD se genera desde los mismos archivos de datos (`data/countries/*`, `data/zones/*`) que alimentan el HTML visible**, nunca se escribe a mano un JSON-LD "aparte" que pueda desincronizarse del contenido visual — condición indispensable para mantener validez ante Google y evitar penalizaciones por datos estructurados engañosos.

---

## 12. Diseño UX/UI — identidad "The Romantic Tour"

### 12.1 Dirección visual
- **Color predominante: rojo** en un tono profundo y aterciopelado ("rosa romántica", ni rojo-alerta ni rojo-corporativo). Sugerido: rojo base `#B3122E` / `#8E0E29` para acentos oscuros, con un rojo más vivo `#E11D48`–`#D9294A` para CTAs, sobre superficies **mate** (sin brillos ni gradientes plásticos).
- **Modo claro**: fondo mate cálido tipo "papel crema/marfil apagado" (`#F7F1EE`–`#FAF6F4`), texto casi-negro cálido (`#241315`), rojo como acento y CTA.
- **Modo oscuro**: fondo mate profundo casi-negro con tinte vino (`#150A0C`–`#1C0F12`), superficies elevadas en `#231317`, texto marfil suave (`#F3E9E7`), rojo como acento luminoso pero controlado (evitar rojo neón que rompa el "mate").
- Contraste: validar todas las combinaciones texto/fondo contra WCAG AA (mínimo 4.5:1 para texto normal), especialmente el rojo sobre mate oscuro, que es la combinación de mayor riesgo de bajo contraste.
- Jerarquía visual: tamaño y peso tipográfico (no solo color) para diferenciar H1/H2/CTA/body — nunca depender solo del rojo para transmitir jerarquía (regla de accesibilidad y de buen diseño editorial).
- Tipografía: combinar una serif editorial/expresiva para titulares (transmite "romántico", elegante, con carácter de gira/álbum) con una sans-serif limpia y muy legible para cuerpo de texto y UI (precios, formularios). Ambas auto-hospedadas vía `next/font`.

### 12.2 Modo oscuro / claro
- Detección automática por `prefers-color-scheme` al primer visit (sin flash de tema incorrecto — usar estrategia de script inline mínimo antes de hidratar, patrón estándar de "no-flash theme script").
- Toggle manual visible en el navbar (icono sol/luna de lucide-react), con persistencia de preferencia del usuario (cookie o localStorage) que sobreescribe la detección automática una vez que el usuario elige explícitamente.
- Todos los tokens de color deben definirse como **variables CSS** (no clases hardcodeadas dispersas) para que shadcn/ui y Tailwind hereden el tema de forma consistente en todos los componentes.

### 12.3 Navbar moderno (glass / liquid)
- Navbar flotante, con **efecto "glass" (fondo translúcido + `backdrop-filter: blur`)** sobre el hero, que se solidifica sutilmente (más opaco, sombra suave) al hacer scroll — patrón inspirado en las interfaces "liquid glass" actuales.
- Micro-animaciones: transición fluida de altura/padding al hacer scroll, subrayado animado en el ítem activo, transición suave del logo.
- Selector de país integrado (bandera/nombre) + toggle de tema + CTA principal "Comprar entradas" siempre visible (botón sólido en rojo, contraste alto, ancla a la acción de mayor prioridad de negocio).
- En mobile: menú tipo *sheet*/drawer con el mismo efecto glass, animación de entrada suave, foco atrapado (accesibilidad de teclado) mientras está abierto.

### 12.4 Hero moderno (no clásico)
- Se evita el hero "clásico" (imagen de fondo + título centrado + botón). En su lugar:
  - Composición **asimétrica** con imagen/recorte del artista a un costado, tipografía editorial grande superpuesta parcialmente, y un bloque de datos clave (fecha, ciudad, cuenta regresiva) como elemento flotante tipo "tarjeta glass".
  - **Cuenta regresiva en vivo** hasta la fecha del concierto (client component), reforzando urgencia sin ser agresiva.
  - Micro-interacciones al hacer scroll (parallax sutil, fade-in escalonado de elementos) usando Motion, siempre respetando `prefers-reduced-motion` (accesibilidad).
  - En la Home, el hero debe comunicar "multi-país" (mapa/selector visual de conciertos), mientras que en cada `/[pais]` el hero es 100% específico de ese país (imagen del venue/ciudad, no genérica).

### 12.5 Reglas de UX/UI y responsive design (30 reglas obligatorias)

**Layout y jerarquía**
1. Grid de 12 columnas responsivo (mobile-first) como base de todo el layout.
2. Mobile-first real: diseñar y maquetar primero el viewport de 375-390px, luego escalar.
3. Breakpoints consistentes (ej. Tailwind: `sm 640`, `md 768`, `lg 1024`, `xl 1280`, `2xl 1536`) usados de forma sistemática, no ad-hoc.
4. Un solo CTA primario visible "above the fold" por vista (evitar competencia de botones).
5. Jerarquía tipográfica clara y limitada (máx. 5-6 tamaños de texto en todo el sistema).
6. Espaciado consistente basado en una escala (múltiplos de 4px u 8px), nunca valores arbitrarios sueltos.
7. Ancho máximo de línea de texto (~65-75 caracteres) para legibilidad del cuerpo de texto.
8. Alineación consistente de elementos (grid real, no "ojo").

**Componentes de venta (crítico para conversión)**
9. Tarjetas de zona (`ZoneCard`) con jerarquía clara: nombre de zona → precio → CTA, en ese orden visual.
10. Precio siempre formateado con separador de miles y símbolo de moneda local correcto (`Intl.NumberFormat`).
11. Botón "Comparar" con estado hover/focus visible y accesible por teclado.
12. Selector de cantidad con límites claros (mínimo 1, máximo razonable por transacción, ej. 6-10).
13. Resumen de compra (carrito) siempre visible/accesible (sticky en desktop, botón flotante o sheet en mobile) mientras el usuario navega zonas.
14. Estados de "agotado" (`SoldOut`) visualmente distintos y deshabilitados, nunca ocultos (transparencia genera confianza).
15. Botón "Pagar" deshabilitado con explicación visible (no un botón simplemente "muerto" sin contexto).

**Responsive y dispositivos**
16. Áreas táctiles mínimas de 44x44px en mobile (botones, iconos interactivos).
17. Sin scroll horizontal accidental en ningún breakpoint (probar 320px como mínimo absoluto).
18. Imágenes con `srcset`/`sizes` correctos vía `next/image`, distintas resoluciones para mobile/desktop.
19. Formularios (checkout) con inputs de ancho completo en mobile, teclado numérico (`inputmode="numeric"`) en campos de tarjeta/cantidad.
20. Navbar y elementos flotantes no deben tapar contenido interactivo en mobile (safe areas, especialmente en iOS con notch/home indicator).

**Accesibilidad**
21. Contraste mínimo AA en todos los estados (normal, hover, disabled) y en ambos temas.
22. Navegación completa por teclado (tab order lógico) en navbar, tarjetas de zona y checkout.
23. `aria-label`/`aria-live` en el contador del carrito y en la cuenta regresiva (para lectores de pantalla).
24. Foco visible (`focus-visible`) estilizado acorde a la identidad, nunca eliminado.
25. Textos alternativos significativos en toda imagen decorativa vs. informativa (decorativas con `alt=""`).

**Consistencia y sistema**
26. Design tokens centralizados (color, tipografía, espaciado, radios, sombras) en `globals.css`/Tailwind config — ningún valor hardcodeado repetido en componentes.
27. Estados de carga (`loading.tsx`, skeletons) coherentes visualmente con el diseño final (evitar layout shift al cargar datos de zonas/precios).
28. Micro-copy (textos de botones, errores de formulario, vacíos) en el idioma y tono correctos por país, revisado uno por uno (nunca traducción automática sin revisión, especialmente en portugués de Brasil).
29. Animaciones con duración corta (150-300ms) y curva de easing consistente en todo el sitio; respeto estricto de `prefers-reduced-motion`.
30. Pruebas de UX en los tres tamaños de referencia (mobile 375px, tablet 768px, desktop 1440px+, y pantallas grandes 1920px+) antes de cada release, verificando que la jerarquía de lectura (F/Z pattern) se mantenga clara en pantallas grandes y no se vea contenido "flotando" sin estructura.

---

## 13. Fases de desarrollo

### Fase 0 — Fundación técnica
- Inicializar proyecto Next.js (App Router, TypeScript, Tailwind v4).
- Configurar shadcn/ui, lucide-react, Motion.
- Configurar `@opennextjs/cloudflare`, `wrangler.jsonc`, pipeline de deploy (preview y producción) en Cloudflare Workers.
- Definir design tokens (paleta rojo/mate, tipografía, espaciados) y `ThemeProvider` dark/light con detección automática + toggle.
- Estructurar `data/countries.config.ts` con los 5 países (slugs, idioma, moneda, hreflang map) — sin contenido real aún, solo el andamiaje.

### Fase 1 — Arquitectura SEO base
- Implementar `app/sitemap.ts`, `app/robots.ts`, `app/manifest.ts`.
- Implementar helpers `lib/seo/metadata.ts`, `lib/seo/jsonld.ts`, `lib/seo/hreflang.ts`.
- Implementar layout `[pais]/layout.tsx` con validación de país soportado (`generateStaticParams`) y `not-found.tsx` para países inválidos.
- Implementar componente genérico `JsonLd.tsx` y `Breadcrumbs.tsx`.

### Fase 2 — Home global
- Construir `HeroHome.tsx` (moderno, multi-país) y `TourDatesGrid.tsx`.
- Cargar datos reales de los 5 países (fechas, ciudades, venues) desde `data/countries/*`.
- JSON-LD `Organization` + `ItemList` de eventos.
- QA de metadatos, Open Graph, Lighthouse inicial.

### Fase 3 — Páginas de país (5 países, empezando por Perú como referencia)
- Construir `HeroCountry.tsx`, `ConcertInfo.tsx`, `FaqSection.tsx`, `CtaBuyTickets.tsx`.
- Cargar contenido único y redactado por país (nunca traducción cruzada).
- Implementar JSON-LD `MusicEvent` + `AggregateOffer` + `FAQPage` por país.
- Replicar para Chile, Argentina, Colombia y, por último, Brasil (con contenido 100% en portugués desde cero, no traducido del español).
- QA de hreflang recíproco entre las 5 páginas.

### Fase 4 — Páginas de entradas (venta) por país
- Construir `data/zones/<pais>.zones.ts` con las 10 zonas y precios/moneda propios de cada país.
- Construir `ZoneCard.tsx`, `QuantitySelector.tsx`, `PriceSummary.tsx`, `VenueMapSVG.tsx`.
- Implementar botón "Comparar" (desde `/[pais]` hacia `/[pais]/entradas`) y flujo de selección de cantidad → agregar al resumen.
- Implementar JSON-LD `Offer` (arreglo) generado programáticamente desde los datos de zonas.
- Replicar en los 5 países (Brasil con `/ingressos` y portugués completo).
- QA exhaustivo de que el precio visible = precio en JSON-LD, por país.

### Fase 5 — Checkout
- Construir `OrderSummary.tsx`, `BuyerForm.tsx`, `PayButtonDisabled.tsx`.
- Implementar `/[pais]/entradas/checkout` en los 5 países, con `noindex` condicional si el carrito está vacío.
- Validaciones de formulario (nombre, email, documento) sin conexión real de pago aún.
- JSON-LD `BreadcrumbList` en checkout.

### Fase 6 — Blog
- Estructurar `content/blog/*.mdx` y el renderer (`/blog`, `/blog/[slug]`).
- Publicar los primeros 3-5 posts (fechas del tour LATAM, guía de venue por país, preguntas frecuentes ampliadas) enlazando siempre a `/[pais]/entradas`.
- JSON-LD `BlogPosting` por post.

### Fase 7 — Optimización de performance y Core Web Vitals
- Auditoría Lighthouse/PageSpeed Insights en los 15 tipos de página (home, 5 países, 5 entradas, checkout, blog index, blog post, 404).
- Optimización de imágenes (`next/image`, AVIF/WebP, `priority` en LCP).
- Revisión de JS enviado al cliente (Client Components mínimos e indispensables).
- Verificación de Cache-Control/edge caching en Cloudflare.

### Fase 8 — QA de SEO, accesibilidad y responsive final
- Validación de las 30 reglas de UX/UI y responsive (sección 12.5) en mobile/tablet/desktop/pantallas grandes.
- Validación de las 50 reglas SEO (sección 10) página por página.
- Rich Results Test para cada tipo de JSON-LD en cada país.
- Auditoría de accesibilidad (contraste, teclado, `aria-*`) en ambos temas.
- Revisión final de hreflang cruzado (todas las combinaciones, sin huérfanos ni referencias rotas).

### Fase 9 — Lanzamiento
- Deploy a producción en Cloudflare Workers (dominio `brunomars.lat`).
- Alta y verificación en Google Search Console (dominio completo) y Bing Webmaster Tools.
- Envío manual del sitemap.xml.
- Monitoreo inicial de indexación y Core Web Vitals reales (CrUX) durante las primeras semanas.

### Fase 10 — Preparado para fase futura (fuera de alcance de este PRD, pero dejado listo en la arquitectura)
- Punto de integración de pasarela de pago (reemplazar `PayButtonDisabled.tsx`).
- Backend/API de inventario en tiempo real (reemplazar `data/zones/*.ts` estático por fetch a base de datos, manteniendo intacta la estructura de JSON-LD y metadatos).
- Panel de administración para gestión de contenido del blog y precios sin tocar código.

---

## 14. Criterios de éxito (KPIs)

- Top 1 en Google para `"entradas bruno mars [país]"` / `"ingressos bruno mars brasil"` en cada mercado, apuntando a `/[pais]/entradas` (o `/ingressos`).
- Top 1 para `"bruno mars [país]"` apuntando a `/[pais]`, con `/[pais]/entradas` en la 2ª posición dentro de los resultados propios del dominio.
- Core Web Vitals "Good" (verde) en los 5 países, medido en datos de campo (CrUX) tras el lanzamiento.
- 0 páginas excluidas por "duplicado sin canonical seleccionado por el usuario" en Search Console.
- Cobertura de indexación 100% de las URLs enviadas en el sitemap dentro de las primeras 2 semanas post-lanzamiento.
- Cumplimiento WCAG AA verificado en ambos temas (claro/oscuro) en todas las páginas de venta.

---

*Fin del documento.*
