# Actualización de Schema JSON-LD y SEO - Bruno Mars LATAM

## Resumen de Cambios Implementados

### 1. Schema JSON-LD Mejorado (Completado ✅)

Se actualizaron los schemas para cumplir con **todas las propiedades requeridas y recomendadas de Google 2026** según la documentación oficial.

#### Archivo actualizado: `lib/seo/jsonld.ts`

**Campos agregados en `buildCountryEventSchema` y `buildTicketsEventSchema`:**

✅ **description** - Descripción clara del evento  
✅ **endDate** - Fecha de finalización realista (22:30 en lugar de 23:59)  
✅ **performer.@type** - Cambiado de `Person` a `MusicGroup` (más apropiado)  
✅ **performer.sameAs** - Enlaces a fuentes autoritativas (Wikipedia, Wikidata, redes sociales)  
✅ **location.maximumAttendeeCapacity** - Capacidad del venue  
✅ **typicalAgeRange** - Rango de edad recomendado (13+)  
✅ **inLanguage** - Idioma del evento (es o pt-BR según país)  
✅ **offerCount** - Número de ofertas (como número, no string)  
✅ **Todas las direcciones completas** - streetAddress, city, region, postalCode, country

**Propiedades mejoradas:**
- `name` simplificado: "Bruno Mars - The Romantic Tour {País}" (sin redundancia de fechas)
- `image[]` - Array con múltiples imágenes (hero, og, venue)
- `eventAttendanceMode` - Presencial (OfflineEventAttendanceMode)
- `eventStatus` - Estado del evento (EventScheduled)

### 2. Robots.txt Actualizado (Completado ✅)

#### Archivo actualizado: `app/robots.ts`

**Cambios realizados:**
- ✅ Removidas restricciones innecesarias de `/api/` y `/_next/`
- ✅ Eliminada regla específica para Googlebot (ya no necesaria)
- ✅ Solo se bloquean las páginas de checkout (sensibles)
- ✅ Todos los crawlers pueden indexar libremente

**Nota importante sobre Cloudflare:**
El contenido adicional restrictivo que aparece en producción (Content-Signal, bloqueo de bots AI) **lo está inyectando Cloudflare automáticamente**. Para desactivarlo:

1. Dashboard de Cloudflare → Tu dominio
2. **Security** → **Bots** 
3. Desactivar "AI Scrapers and Crawlers" o "Cloudflare Managed robots.txt"

### 3. Jerarquía HTML Verificada (✅ Óptima)

#### Página de País (`app/[pais]/page.tsx`):
```
H1 - Título principal del evento (Bruno Mars en {País})
  H2 - "Sobre el Concierto"
    H3 - "El Espectáculo"
    H3 - "Qué Esperar"
    H3 - "Setlist Confirmado"
  H2 - CTA Final
```

#### Página de Entradas (`app/[pais]/entradas/page.tsx`):
```
H1 - "Entradas Bruno Mars {País}"
  H2 - "Elige tu zona"
    H3 - Nombre de cada zona (múltiples)
  H2 - "Zonas Agotadas"
    H3 - Zonas sin stock
  H2 - "Resumen de tu compra"
    H3 - Items del carrito
  H2 - "Todo sobre The Romantic Tour"
    H3 - "El Espectáculo"
    H3 - "Información del Evento"
    H3 - "Canciones Confirmadas"
  H2 - "Preguntas Frecuentes"
```

**Evaluación:** ✅ Jerarquía perfecta, sin saltos ni duplicaciones.

## Beneficios SEO Implementados

### Para Google Search
1. ✅ **Rich Results elegibles** - Eventos ahora pueden aparecer con cards enriquecidas
2. ✅ **Event Experience** - Formato especial de Google para eventos con logo, descripción, precios
3. ✅ **Knowledge Graph** - Enlaces a Wikidata y Wikipedia ayudan a Google a entender la entidad
4. ✅ **Breadcrumbs** - Ya implementados correctamente
5. ✅ **FAQ Schema** - Ya implementado para preguntas frecuentes

### Para AI Search (ChatGPT, Perplexity, Google AI Overviews)
1. ✅ **Datos estructurados completos** - Mayor probabilidad de citación precisa
2. ✅ **sameAs links** - Las IAs pueden verificar información en fuentes autoritativas
3. ✅ **Descripciones claras** - Facilita la comprensión del contexto

## Recomendaciones Adicionales

### 1. Imágenes (Prioridad: ALTA)
Según Google, las imágenes deben cumplir:
- ✅ Mínimo 720px de ancho (recomendado 1920px)
- ✅ Múltiples aspect ratios: 16:9, 4:3, 1:1
- ⚠️ Mínimo 50,000 pixels (ancho × alto)

**Acción requerida:** Verificar que las imágenes en `/images/` cumplan estos requisitos.

### 2. URLs de Offers (Prioridad: MEDIA)
Google requiere que `offers.url`:
- ✅ Enlace directo a la página de compra (cumplido)
- ✅ Sea rastreable (cumplido)
- ⚠️ Debe mostrar claramente la oportunidad de compra

**Acción requerida:** Asegurar que cada zona tenga un anchor `#${zone.id}` visible en la página.

### 3. Testing y Validación (Prioridad: ALTA)

**Herramientas para validar:**
1. [Google Rich Results Test](https://search.google.com/test/rich-results)
2. [Schema.org Validator](https://validator.schema.org/)
3. Google Search Console - Informe de "Experiencia de eventos"

**Comando para generar el build:**
```bash
npm run build
```

**URLs a validar:**
- `https://brunomars.lat/peru`
- `https://brunomars.lat/peru/entradas`
- `https://brunomars.lat/chile`
- `https://brunomars.lat/chile/entradas`
- (y así para cada país)

### 4. Monitoreo Post-Deploy (Prioridad: ALTA)

Después del deploy, verificar en **Google Search Console**:
1. ✅ Las páginas se están indexando correctamente
2. ✅ No hay errores de datos estructurados
3. ✅ Los eventos aparecen en "Experiencia de eventos"

Tiempo estimado para ver resultados: **2-4 semanas**

## Archivos Modificados

1. ✅ `app/robots.ts` - Robots.txt más permisivo
2. ✅ `lib/seo/jsonld.ts` - Schemas completos según Google 2026
   - `buildCountryEventSchema()` - Actualizado
   - `buildTicketsEventSchema()` - Actualizado

## Próximos Pasos

1. **Deploy inmediato** - Los cambios están listos para producción
2. **Desactivar filtros de Cloudflare** - Para robots.txt limpio
3. **Validar schemas** - Usar herramientas de Google
4. **Monitorear Search Console** - Verificar indexación en 48-72 horas
5. **Verificar imágenes** - Confirmar que cumplen requisitos de tamaño

## Fuentes y Referencias

- [Google Event Structured Data (2026)](https://developers.google.com/search/docs/appearance/structured-data/event)
- [Schema.org MusicEvent](https://schema.org/MusicEvent)
- [What Is Event Schema and How Do You Add It?](https://www.greadme.com/blog/schemas/what-is-event-schema-complete-guide)
- [Schema.org Structured Data Cheatsheet (2026)](https://www.lawrencehitches.com/schema-cheatsheet/)

---

**Fecha de actualización:** 2026-08-28  
**Build status:** ✅ Compilación exitosa  
**Estado:** Listo para deploy
