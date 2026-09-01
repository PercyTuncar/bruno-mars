# ✅ SEO Validation Checklist - Bruno Mars LATAM

## 🔍 Pre-Launch Validation

### 1. Build & Deploy
- [ ] `npm run build` completa sin errores
- [ ] Todas las 24 páginas generadas correctamente
- [ ] Bundle size dentro de límites (103 KB shared JS)
- [ ] Middleware compilado correctamente (34.3 KB)
- [ ] No warnings críticos en build

### 2. Schema Validation

#### Google Rich Results Test
**URL**: https://search.google.com/test/rich-results

- [ ] **Home** (/) - Organization + WebSite + ItemList
- [ ] **/peru** - Person + MusicEvent + FAQPage + BreadcrumbList
- [ ] **/peru/entradas** - Person + MusicEvent (Offer[]) + BreadcrumbList
- [ ] **/blog** - Blog schema
- [ ] **/blog/bruno-mars-en-concierto** - Article + BreadcrumbList

#### Schema.org Validator
**URL**: https://validator.schema.org/

- [ ] Pegar HTML de cada página y validar 0 errores
- [ ] Verificar que todos los schemas tengan @context y @type
- [ ] Confirmar que las URLs en schemas sean absolutas

---

### 3. Meta Tags Validation

#### View Page Source
Verificar en cada tipo de página:

**Home (/)**
- [ ] `<title>` presente y único
- [ ] `<meta name="description">` presente
- [ ] `<link rel="canonical">` presente
- [ ] `<link rel="alternate" hreflang="x-default">`
- [ ] `<link rel="alternate" hreflang="es-PE">` (y 4 más)
- [ ] `<meta property="og:image" content="...">` (URL absoluta)
- [ ] `<meta property="og:image:width" content="1200">`
- [ ] `<meta property="og:image:height" content="630">`
- [ ] `<meta property="og:image:alt" content="...">`
- [ ] `<meta name="twitter:card" content="summary_large_image">`
- [ ] `<meta name="twitter:site" content="@BrunoMars">`

**País Landing (/peru)**
- [ ] Geo tags: `<meta name="geo.region" content="PE-LIM">`
- [ ] Geo tags: `<meta name="geo.placename" content="Lima, Peru">`
- [ ] Geo tags: `<meta name="geo.position" content="-12.046374;-77.042793">`
- [ ] Hreflang alternates (6 links)
- [ ] Canonical apuntando a URL correcta

**Tickets (/peru/entradas)**
- [ ] Geo tags presentes
- [ ] Hreflang alternates (6 links)
- [ ] MusicEvent schema con array de Offers

**Blog Post**
- [ ] `<meta property="article:published_time">`
- [ ] `<meta property="article:modified_time">`
- [ ] `<meta property="article:author">`
- [ ] Article schema con timeRequired

---

### 4. Performance Checks

#### Lighthouse (DevTools)
**Objetivo**: Score > 90 en todas las categorías

- [ ] **Performance**: > 90
  - [ ] LCP < 2.5s
  - [ ] CLS < 0.1
  - [ ] INP < 200ms
- [ ] **Accessibility**: > 90
- [ ] **Best Practices**: > 90
- [ ] **SEO**: 100 ✅

#### Core Web Vitals
**URL**: https://pagespeed.web.dev/

Test páginas críticas:
- [ ] Home (/)
- [ ] /peru
- [ ] /peru/entradas
- [ ] /blog/bruno-mars-en-concierto

Verificar:
- [ ] Largest Contentful Paint (LCP) < 2.5s
- [ ] Interaction to Next Paint (INP) < 200ms
- [ ] Cumulative Layout Shift (CLS) < 0.1
- [ ] First Contentful Paint (FCP) < 1.8s

#### Resource Hints
Ver Network tab en DevTools:
- [ ] Fonts.googleapis.com con preconnect
- [ ] Fonts.gstatic.com con preconnect
- [ ] Hero images con fetchpriority="high"
- [ ] CSS de Google Fonts con preload

---

### 5. Security Headers

#### SecurityHeaders.com
**URL**: https://securityheaders.com/

- [ ] Score mínimo: B+
- [ ] X-Content-Type-Options presente
- [ ] X-Frame-Options presente
- [ ] X-XSS-Protection presente
- [ ] Referrer-Policy presente
- [ ] Permissions-Policy presente

#### Browser DevTools
Network tab > Select any HTML page > Headers:

```
Response Headers debe incluir:
- X-Content-Type-Options: nosniff
- X-Frame-Options: SAMEORIGIN
- X-XSS-Protection: 1; mode=block
- Referrer-Policy: strict-origin-when-cross-origin
- Permissions-Policy: camera=(), microphone=(), geolocation=()
- Content-Security-Policy: (debe estar presente)
```

---

### 6. International SEO

#### Hreflang Validator
**URL**: https://technicalseo.com/tools/hreflang/

- [ ] Ingresar https://brunomars.lat/peru
- [ ] Verificar 0 errores
- [ ] Confirmar reciprocidad (cada página enlaza de vuelta)
- [ ] Verificar x-default presente en todas

#### Manual Check
Ver source de /peru:

```html
<link rel="alternate" hreflang="x-default" href="https://brunomars.lat" />
<link rel="alternate" hreflang="es-PE" href="https://brunomars.lat/peru" />
<link rel="alternate" hreflang="es-CL" href="https://brunomars.lat/chile" />
<link rel="alternate" hreflang="es-AR" href="https://brunomars.lat/argentina" />
<link rel="alternate" hreflang="es-CO" href="https://brunomars.lat/colombia" />
<link rel="alternate" hreflang="pt-BR" href="https://brunomars.lat/brasil" />
```

- [ ] 6 links presentes
- [ ] URLs absolutas (no relativas)
- [ ] Códigos de idioma correctos (ISO 639-1 + ISO 3166-1)

---

### 7. Social Media Previews

#### Facebook Debugger
**URL**: https://developers.facebook.com/tools/debug/

Test URLs:
- [ ] https://brunomars.lat
- [ ] https://brunomars.lat/peru
- [ ] https://brunomars.lat/peru/entradas
- [ ] https://brunomars.lat/blog/bruno-mars-en-concierto

Verificar:
- [ ] Imagen 1200x630 visible
- [ ] Título correcto
- [ ] Descripción correcta
- [ ] No warnings críticos

#### Twitter Card Validator
**URL**: https://cards-dev.twitter.com/validator

- [ ] Mismo test que Facebook
- [ ] Card type: summary_large_image
- [ ] @BrunoMars visible como site/creator

#### LinkedIn Post Inspector
**URL**: https://www.linkedin.com/post-inspector/

- [ ] Test al menos home y blog post
- [ ] Imagen visible
- [ ] Metadata correcta

---

### 8. Robots & Sitemap

#### Robots.txt
**URL**: https://brunomars.lat/robots.txt

```
User-agent: *
Allow: /
Disallow: /*/entradas/checkout
Disallow: /*/ingressos/checkout
Sitemap: https://brunomars.lat/sitemap.xml
```

- [ ] Accesible (200 OK)
- [ ] Sintaxis correcta
- [ ] Checkout páginas bloqueadas
- [ ] Sitemap URL presente

#### Sitemap.xml
**URL**: https://brunomars.lat/sitemap.xml

- [ ] Accesible (200 OK)
- [ ] Todas las 24 URLs presentes
- [ ] URLs absolutas (https://brunomars.lat/...)
- [ ] lastmod dates presente
- [ ] priority configurado
- [ ] changeFrequency configurado
- [ ] Hreflang alternates en cada <url>

---

### 9. Mobile Optimization

#### Mobile-Friendly Test
**URL**: https://search.google.com/test/mobile-friendly

- [ ] Home
- [ ] /peru
- [ ] /peru/entradas
- [ ] /blog

Verificar:
- [ ] "Page is mobile-friendly" ✅
- [ ] No errores de usabilidad
- [ ] Texto legible sin zoom
- [ ] Touch targets espaciados

#### Responsive Design
DevTools > Toggle device toolbar:

- [ ] 320px width (iPhone SE) - Sin scroll horizontal
- [ ] 375px width (iPhone 12) - Contenido legible
- [ ] 768px width (iPad) - Layout apropiado
- [ ] 1920px width (Desktop) - Sin elementos estirados

---

### 10. Accessibility (A11y)

#### axe DevTools
**Extension**: https://www.deque.com/axe/devtools/

- [ ] Run en Home
- [ ] Run en /peru
- [ ] Run en /peru/entradas
- [ ] 0 Critical issues
- [ ] 0 Serious issues

#### Manual Checks
- [ ] Tab navigation funciona
- [ ] Skip to content (opcional)
- [ ] Contrast ratio > 4.5:1 (texto normal)
- [ ] Contrast ratio > 3:1 (texto grande)
- [ ] Alt text en todas las imágenes
- [ ] ARIA labels en elementos interactivos
- [ ] Focus states visibles

---

### 11. Content Quality

#### Duplicate Content
- [ ] Cada país tiene contenido único
- [ ] Descripciones meta únicas por página
- [ ] Títulos únicos por página
- [ ] No contenido duplicado entre /peru y /chile

#### Keyword Optimization
**Home**:
- [ ] "Bruno Mars LATAM" en title
- [ ] "The Romantic Tour 2027" en H1
- [ ] Keywords naturales en contenido

**País**:
- [ ] "Bruno Mars [País]" en title
- [ ] Nombre del venue en contenido
- [ ] Fecha en formato local

**Tickets**:
- [ ] "Entradas Bruno Mars [País]" en title
- [ ] Zonas mencionadas en contenido
- [ ] Precios visibles

---

### 12. Analytics & Tracking Ready

#### Google Analytics
- [ ] Espacio para GA4 tracking ID
- [ ] gtag.js script location identificado

#### Google Tag Manager
- [ ] Container space preparado
- [ ] No conflictos con middleware

#### Google Search Console
- [ ] Sitio verificable vía HTML tag
- [ ] Sitemap URL para submit: /sitemap.xml

---

## 🎯 Critical Path (Mínimo antes de Launch)

### Must Have ✅
1. ✅ Build exitoso sin errores
2. ✅ Schema validation (Rich Results Test)
3. ✅ Meta tags presentes (view source)
4. ✅ Hreflang correcto (validator)
5. ✅ Sitemap.xml accesible
6. ✅ Robots.txt accesible
7. ✅ Mobile-friendly (Google test)

### Should Have ⚠️
8. ⏳ Security headers (Score B+)
9. ⏳ Core Web Vitals < límites
10. ⏳ Lighthouse Score > 90
11. ⏳ Social previews correctos
12. ⏳ 0 accessibility critical issues

### Nice to Have 💚
13. Legal pages (Privacy, Terms)
14. Google Analytics integrado
15. Search Console conectado
16. CDN configurado

---

## 📊 Launch Checklist

### Pre-Deploy
- [ ] npm run build success
- [ ] All validation tests passed
- [ ] DNS records configured
- [ ] SSL certificate ready
- [ ] .env.local variables set

### Post-Deploy
- [ ] Site accessible at brunomars.lat
- [ ] All pages loading correctly
- [ ] No 404 errors
- [ ] HTTPS redirects working
- [ ] Sitemap accessible publicly

### Post-Launch (Week 1)
- [ ] Submit sitemap to Google Search Console
- [ ] Request indexing for key pages
- [ ] Monitor Core Web Vitals
- [ ] Check for crawl errors
- [ ] Verify rich results appearing

---

## 🔗 Quick Test URLs

```bash
# Schema Validation
https://search.google.com/test/rich-results?url=https://brunomars.lat
https://validator.schema.org/

# Performance
https://pagespeed.web.dev/analysis?url=https://brunomars.lat

# Social
https://developers.facebook.com/tools/debug/?q=https://brunomars.lat
https://cards-dev.twitter.com/validator

# Mobile
https://search.google.com/test/mobile-friendly?url=https://brunomars.lat

# Security
https://securityheaders.com/?q=https://brunomars.lat

# Hreflang
https://technicalseo.com/tools/hreflang/
```

---

**Status**: Ready for validation ✅  
**Estimated validation time**: 2-3 hours  
**Priority**: Complete "Must Have" section before launch
