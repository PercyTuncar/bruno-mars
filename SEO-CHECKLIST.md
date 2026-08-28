# ✅ CHECKLIST COMPLETO DE SEO - PRD

## Estado Actual vs Requerido

### ✅ YA IMPLEMENTADO
- [x] Metadata API de Next.js
- [x] JSON-LD Organization
- [x] JSON-LD MusicEvent en página de país
- [x] JSON-LD FAQPage (con validación si existen)
- [x] Breadcrumbs component
- [x] Open Graph básico
- [x] Twitter Cards básico

---

## ❌ FALTA IMPLEMENTAR

### 1. **Canonical URLs** (CRÍTICO)
- [ ] `<link rel="canonical">` en TODAS las páginas
- [ ] Home: `https://brunomars.lat/`
- [ ] País: `https://brunomars.lat/peru`
- [ ] Entradas: `https://brunomars.lat/peru/entradas`
- [ ] Checkout: NO indexar (robots noindex)

### 2. **hreflang Tags** (CRÍTICO para multi-país)
- [ ] En Home: apuntar a sí misma + 5 países
- [ ] En cada país: apuntar a otros 4 países + home
- [ ] En entradas: apuntar a `/entradas` de otros 4 + `/ingressos` Brasil
- [ ] Formato: `<link rel="alternate" hreflang="es-PE" href="...">`

### 3. **robots meta tag**
- [ ] Home: `index, follow`
- [ ] País: `index, follow`
- [ ] Entradas: `index, follow`
- [ ] Checkout: `noindex, nofollow`

### 4. **JSON-LD por Página**

#### Home (`/`)
- [x] Organization ✅
- [ ] ItemList (lista de países)

#### País (`/peru`)
- [x] MusicEvent con AggregateOffer ✅
- [ ] Múltiples MusicEvent si hay varias fechas (usar @graph)
- [x] FAQPage (si existe) ✅
- [ ] BreadcrumbList

#### Entradas (`/peru/entradas`)
- [ ] MusicEvent + @graph con Offer individual por zona
- [ ] BreadcrumbList
- [ ] AggregateOffer del evento

#### Checkout
- [ ] NO JSON-LD (noindex)

### 5. **Open Graph Completo**
Falta en TODAS las páginas:
- [ ] `og:locale` (es_PE, es_CL, es_AR, es_CO, pt_BR)
- [ ] `og:site_name` "Bruno Mars LATAM"
- [ ] `og:type` "website" o "music.event"
- [ ] `og:image:width` y `og:image:height`
- [ ] `og:image:alt`

### 6. **Twitter Cards Completo**
Falta:
- [ ] `twitter:card` "summary_large_image"
- [ ] `twitter:site` "@brunomars" (si existe)
- [ ] `twitter:image:alt`

### 7. **Imágenes Open Graph**
Crear por país:
- [ ] `/images/countries/peru/og-1200x630.jpg`
- [ ] `/images/countries/chile/og-1200x630.jpg`
- [ ] etc.

### 8. **Sitemap.xml** (CRÍTICO)
- [ ] `/sitemap.xml` dinámico
- [ ] Incluir: Home, 5 países, 5 entradas
- [ ] NO incluir: checkout, blog posts sin publicar
- [ ] Incluir anotaciones hreflang en sitemap

### 9. **robots.txt**
- [ ] `/robots.txt`
- [ ] Permitir todo excepto `/checkout`
- [ ] Apuntar a sitemap

### 10. **Jerarquía HTML Correcta**

#### Home
- [ ] Un solo `<h1>` "Bruno Mars Latinoamérica"
- [ ] `<h2>` por sección

#### País
- [x] `<h1>` "Bruno Mars en Perú" ✅
- [ ] `<h2>` "Fechas confirmadas"
- [ ] `<h2>` "Detalles del recinto"
- [ ] `<h2>` "Zonas y precios"
- [ ] `<h2>` "Preguntas frecuentes"

#### Entradas
- [ ] `<h1>` "Entradas Bruno Mars Perú"
- [ ] `<h2>` "Elige tu zona"
- [ ] `<h3>` por cada zona (o usar lista semántica)

### 11. **Lang Attribute**
- [ ] `<html lang="es">` en Home
- [ ] `<html lang="es-PE">` en Perú
- [ ] `<html lang="es-CL">` en Chile
- [ ] `<html lang="pt-BR">` en Brasil

### 12. **Favicons Completos**
- [ ] favicon.ico
- [ ] apple-touch-icon.png
- [ ] favicon-32x32.png
- [ ] favicon-16x16.png

### 13. **Manifest PWA**
- [ ] `/manifest.json` básico
- [ ] Íconos 192x192 y 512x512

### 14. **404 Page**
- [ ] `/not-found.tsx` personalizada
- [ ] Enlaces a los 5 países
- [ ] Buena para SEO (no redirect automático)

---

## 🎯 PRIORIDAD DE IMPLEMENTACIÓN

### FASE 1 - CRÍTICO (Hacer AHORA)
1. ✅ Canonical URLs en todas las páginas
2. ✅ hreflang tags en todas las páginas
3. ✅ robots meta tags
4. ✅ sitemap.xml
5. ✅ robots.txt
6. ✅ Lang attributes correctos

### FASE 2 - IMPORTANTE
7. JSON-LD completo por página
8. Open Graph completo
9. Twitter Cards completo
10. Jerarquía HTML correcta

### FASE 3 - NICE TO HAVE
11. Imágenes OG optimizadas
12. Favicons completos
13. Manifest PWA
14. 404 personalizada

---

## 📊 SCORE ACTUAL

**SEO Implementado:** ~40%
**SEO Requerido por PRD:** 100%

**Falta:** 60% - principalmente canonical, hreflang, sitemap, JSON-LD completo
