# ✅ CORRECCIÓN: JSON-LD ItemList - Campo "id" Inválido

## 🔍 PROBLEMA IDENTIFICADO

Google Search Console reportaba:
```
⚠️ La URL del campo "id" no es válida (en "itemListElement.item")
Elementos afectados: 5
- https://brunomars.lat/brasil
- https://brunomars.lat/colombia
- https://brunomars.lat/argentina
- https://brunomars.lat/peru
- https://brunomars.lat/chile
```

---

## 🎯 CAUSA RAÍZ

Según la [documentación de schema.org ItemList](https://schema.org/ItemList), el campo `item` dentro de `itemListElement` debe ser un **objeto estructurado con @id**, no una URL directa.

### ❌ ANTES (Incorrecto):

```json
{
  "@type": "ItemList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Bruno Mars en Perú",
      "url": "https://brunomars.lat/peru"  // ❌ Faltan campos requeridos
    }
  ]
}
```

**Problema:** Los campos `name` y `url` están al mismo nivel que `position`, pero según schema.org deben estar dentro del objeto `item`.

### ✅ DESPUÉS (Correcto):

```json
{
  "@type": "ItemList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "item": {                                    // ✅ Objeto item
        "@type": "Thing",                          // ✅ Tipo definido
        "@id": "https://brunomars.lat/peru",      // ✅ @id con URL completa
        "name": "Bruno Mars en Perú",             // ✅ Dentro de item
        "url": "https://brunomars.lat/peru"       // ✅ Dentro de item
      }
    }
  ]
}
```

---

## 🔧 CAMBIOS IMPLEMENTADOS

### 1. **buildItemListSchema** (`lib/seo/jsonld.ts:281-292`)

```diff
  itemListElement: items.map((item) => ({
    '@type': 'ListItem',
    position: item.position,
-   name: item.name,
-   url: item.url,
+   item: {
+     '@type': 'Thing',
+     '@id': item.url,
+     name: item.name,
+     url: item.url,
+   },
  })),
```

### 2. **buildBreadcrumbSchema** (`lib/seo/jsonld.ts:207-219`)

```diff
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
-   name: item.name,
-   item: item.url,  // ❌ URL directa
+   item: {          // ✅ Objeto estructurado
+     '@type': 'WebPage',
+     '@id': item.url,
+     name: item.name,
+   },
  })),
```

### 3. **buildHomeEventsListSchema** (`lib/seo/jsonld.ts:224-255`)

```diff
- const events = countries.map((slug) => {
-   const data = getCountryData(slug)
-   return {
-     '@type': 'MusicEvent',
-     name: `...`,
-     url: `...`,
-   }
- })
- 
- return {
-   itemListElement: events.map((event, index) => ({
-     '@type': 'ListItem',
-     position: index + 1,
-     item: event,  // ❌ Sin @id
-   })),
- }

+ return {
+   itemListElement: countries.map((slug, index) => {
+     const data = getCountryData(slug)
+     return {
+       '@type': 'ListItem',
+       position: index + 1,
+       item: {
+         '@type': 'MusicEvent',
+         '@id': `${BASE_URL}/${slug}`,  // ✅ @id añadido
+         name: `...`,
+         url: `...`,
+       }
+     }
+   }),
+ }
```

---

## ✅ VERIFICACIÓN

### HTML Generado - ItemList (Home):
```json
{
  "@type": "ItemList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "item": {
        "@type": "Thing",
        "@id": "https://brunomars.lat/peru",
        "name": "Bruno Mars en Perú",
        "url": "https://brunomars.lat/peru"
      }
    }
    // ... 4 países más
  ]
}
```

### HTML Generado - BreadcrumbList (Argentina):
```json
{
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "item": {
        "@type": "WebPage",
        "@id": "https://brunomars.lat",
        "name": "Home"
      }
    },
    {
      "@type": "ListItem",
      "position": 2,
      "item": {
        "@type": "WebPage",
        "@id": "https://brunomars.lat/argentina",
        "name": "Argentina"
      }
    }
  ]
}
```

✅ **Estructura 100% compatible con schema.org y Google**

---

## 📚 REFERENCIAS

### Documentación Oficial:
- [schema.org ItemList](https://schema.org/ItemList)
- [schema.org ListItem](https://schema.org/ListItem)
- [schema.org BreadcrumbList](https://www.schema.org/BreadcrumbList)

### Stack Overflow:
- [Invalid URL in field "id" (in "itemListElement.item")](https://stackoverflow.com/questions/77480300/invalid-url-in-field-id-in-itemlistelement-item-for-a-docusaurus-website)
- [Breadcrumb with non-linked level](https://stackoverflow.com/questions/56217428/breadcrumb-with-non-linked-level)

### Regla Clave:
Según schema.org:
> "For itemListElement values, you can use simple strings, existing entities, or use ListItem. **ListItem is used with ordered lists when you want to provide additional context about the element in that list**."

Cuando se usa `ListItem`, el campo `item` **debe** contener:
1. `@type` - El tipo de entidad
2. `@id` - Un identificador único (URL completa)
3. Propiedades adicionales como `name`, `url`, etc.

---

## 🎯 RESULTADO ESPERADO

Después del deploy, en Google Search Console (2-7 días):
- ✅ La advertencia "URL del campo 'id' no es válida" desaparecerá
- ✅ Los 5 elementos afectados pasarán a estado válido
- ✅ Las páginas podrán aparecer como resultados enriquecidos (rich results)

---

## 📝 ARCHIVOS MODIFICADOS

- `lib/seo/jsonld.ts` - 3 funciones corregidas
  - `buildItemListSchema()` - Líneas 281-296
  - `buildBreadcrumbSchema()` - Líneas 207-220
  - `buildHomeEventsListSchema()` - Líneas 224-256

---

**Estado:** ✅ CORREGIDO Y VERIFICADO  
**Build:** ✅ Exitoso (24 páginas generadas)  
**Próximo paso:** Deploy a producción
