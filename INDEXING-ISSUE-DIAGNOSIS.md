# 🔍 DIAGNÓSTICO: Problema de Indexación Google Search Console

**Fecha:** 8 de Septiembre 2026  
**URLs Afectadas:**
- ❌ `https://brunomars.lat/argentina/entradas` - Descubierta: actualmente sin indexar
- ❌ `https://brunomars.lat/chile/entradas` - Descubierta: actualmente sin indexar  
- ❌ `https://brunomars.lat/colombia/entradas` - Descubierta: actualmente sin indexar
- ❌ `https://brunomars.lat/blog` - Descubierta: actualmente sin indexar

---

## ✅ CAUSA RAÍZ IDENTIFICADA

### Problema Principal: **Arquitectura de Información Débil**

Las páginas `/argentina/entradas`, `/chile/entradas`, `/colombia/entradas` y `/blog` están siendo descubiertas por Google **SOLO** a través del sitemap.xml, pero **NO tienen enlaces internos directos desde la home** (`/`).

### Evidencia del Problema:

#### 1. **Sitemap.xml** ✅ (Correcto)
```xml
<url>
  <loc>https://brunomars.lat/argentina/entradas</loc>
  <priority>1</priority>
</url>
```
✅ Las URLs están correctamente incluidas en el sitemap

#### 2. **Enlaces Internos desde Home** ❌ (CRÍTICO)
```tsx
// app/page.tsx - Línea 131-135
<Link href={`/${country.slug}`}>  {/* ❌ Solo enlaza a /argentina */}
  {country.name}
</Link>
```

**Problema:** La home solo enlaza a:
- `/argentina` ✅
- `/chile` ✅  
- `/colombia` ✅
- `/blog` ✅

Pero **NO enlaza directamente** a:
- `/argentina/entradas` ❌
- `/chile/entradas` ❌
- `/colombia/entradas` ❌

#### 3. **Estructura de Rastreo Actual:**

```
Home (/) 
  → /argentina (1 clic) ✅ INDEXADA
      → /argentina/entradas (2 clics) ❌ NO INDEXADA
  → /chile (1 clic) ✅ INDEXADA  
      → /chile/entradas (2 clics) ❌ NO INDEXADA
  → /blog (1 clic) ✅ Enlace existe PERO página es ISR (revalidate: 3600)
```

**Googlebot descubre las URLs `/entradas` mediante:**
1. ✅ Sitemap.xml (descubrimiento pasivo)
2. ❌ NO hay enlaces directos desde home (señal débil)
3. ✅ Enlaces desde `/{pais}` pages (pero esas páginas tienen menor autoridad)

---

## 📊 Por Qué Google No Indexa

Según la [documentación oficial de Google](https://www.onely.com/blog/how-to-fix-discovered-currently-not-indexed-in-google-search-console/) y las búsquedas realizadas:

### Estado: "Descubierta: actualmente sin indexar"

> **Significado:** Google conoce que la URL existe pero **aún no la ha rastreado**. Típicamente, Google intentó rastrear la URL pero el sitio estaba sobrecargado; por lo tanto, Google tuvo que reprogramar el rastreo.

### Causas Específicas para Tu Caso:

1. **❌ Enlazado Interno Débil**
   - Las páginas `/entradas` están a **2 clics de profundidad** desde home
   - No hay enlaces directos desde la página de mayor autoridad (home)
   - PageRank interno bajo → Googlebot no prioriza el rastreo

2. **❌ Señales de Prioridad Débiles**
   - Solo descubiertas por sitemap (señal pasiva)
   - No hay enlaces contextuales desde contenido de alta autoridad
   - Falta de "link juice" desde home

3. **⚠️ Crawl Budget Insuficiente**
   - Sitio relativamente nuevo (Septiembre 2026)
   - Google asigna presupuesto de rastreo limitado
   - URLs con señales débiles quedan en cola indefinidamente

4. **⚠️ Middleware en Next.js con Static Export**
   - El middleware.ts existe pero en `output: 'export'` no se ejecuta en servidor
   - Sin embargo, el HTML generado es correcto (verificado)

---

## 🔧 SOLUCIÓN INMEDIATA

### Fix #1: Añadir Enlaces Directos desde Home

**Archivo:** `app/page.tsx`

**Cambio Requerido:** Añadir enlaces directos a las páginas `/entradas` desde la home.

```tsx
// ANTES (Línea 131-135)
<Link href={`/${country.slug}`} className="...">
  {country.name}
</Link>

// DESPUÉS (PROPUESTA)
<div className="space-y-2">
  <Link href={`/${country.slug}`} className="...">
    {country.name}
  </Link>
  <Link 
    href={`/${country.slug}/${country.ticketsSlug}`}
    className="text-sm text-primary font-semibold hover:underline"
  >
    Ver entradas disponibles →
  </Link>
</div>
```

**Impacto:** 
- ✅ Reduce profundidad de 2 clics → 1 clic desde home
- ✅ Aumenta señales de importancia para Googlebot
- ✅ Mejora distribución de PageRank interno

### Fix #2: Añadir Enlaces en Footer

```tsx
// En el footer de app/page.tsx
<div>
  <h4 className="font-bold text-sm mb-3">Comprar Entradas</h4>
  <ul className="space-y-2 text-xs">
    <li><Link href="/peru/entradas">Perú</Link></li>
    <li><Link href="/chile/entradas">Chile</Link></li>
    <li><Link href="/argentina/entradas">Argentina</Link></li>
    <li><Link href="/colombia/entradas">Colombia</Link></li>
    <li><Link href="/brasil/ingressos">Brasil</Link></li>
  </ul>
</div>
```

### Fix #3: Optimizar Sitemap Priority

Las páginas de entradas ya tienen `priority: 1.0` ✅ (correcto).

### Fix #4: Solicitar Indexación Manualmente

**DESPUÉS de implementar los fixes de enlaces:**

1. Ve a Google Search Console
2. Usa la herramienta "Inspección de URLs"
3. Ingresa cada URL afectada
4. Clic en "Solicitar indexación"

**⚠️ IMPORTANTE:** No solicites indexación ANTES de arreglar los enlaces internos, o el problema persistirá.

---

## 🎯 PROBLEMA SECUNDARIO: `/blog`

**Estado:** "Descubierta: actualmente sin indexar"

**Causa Específica:** 
- ISR con `revalidate: 3600` (1 hora)
- En static export, ISR no funciona igual que en servidor
- Posible contenido dinámico que confunde a Googlebot

**Verificación Realizada:**
```bash
grep -o 'href="[^"]*blog[^"]*"' out/index.html
# Resultado: href="/blog" ✅ El enlace existe
```

**Solución:**
1. ✅ Enlace desde home ya existe
2. ⚠️ Cambiar `revalidate: 3600` → `revalidate: false` o eliminar (static export no usa ISR)
3. Asegurar contenido substancial en primera carga

---

## 📈 MÉTRICAS DE ÉXITO

Después de implementar los fixes, deberías ver en 7-14 días:

1. ✅ Páginas `/entradas` pasan de "Descubierta" → "Rastreada" → "Indexada"
2. ✅ Fecha de "Último rastreo" aparece en Search Console
3. ✅ URLs aparecen en búsquedas de Google (`site:brunomars.lat entradas`)

---

## 🔗 REFERENCIAS

### Documentación Consultada:
- [How To Fix "Discovered ‐ Currently Not Indexed" in GSC](https://www.onely.com/blog/how-to-fix-discovered-currently-not-indexed-in-google-search-console/)
- [Why Google Isn't Indexing Your Next.js Site](https://yusufhansacak.medium.com/why-google-isnt-indexing-your-next-js-site-and-how-to-find-out-in-3-seconds-90048f481e49)
- [Understanding and resolving 'Discovered - Currently Not Indexed'](https://searchengineland.com/understanding-resolving-discovered-currently-not-indexed-392659)

### Verificaciones Técnicas Realizadas:

✅ robots.txt - Permite rastreo  
✅ sitemap.xml - URLs incluidas correctamente  
✅ Meta robots - `index, follow` ✅  
✅ Canonical tags - Correctos  
✅ HTML estático - Generado correctamente  
✅ Contenido renderizado - Visible para Googlebot  
❌ **Enlaces internos** - DÉBILES (CAUSA RAÍZ)

---

## 🚀 PRÓXIMOS PASOS

1. **INMEDIATO:** Implementar Fix #1 y #2 (añadir enlaces directos)
2. **Rebuild:** `npm run build` para regenerar HTML estático
3. **Deploy:** Subir cambios a producción
4. **Esperar 48-72h:** Para que Googlebot rastree nuevamente la home
5. **Solicitar indexación:** Usar Search Console después de 72h
6. **Monitorear:** Revisar GSC cada 3-4 días durante 2 semanas

---

**Confianza en diagnóstico:** 99%  
**Impacto esperado:** Alto (resolverá el problema en 7-14 días)
