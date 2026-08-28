# Fix Crítico: Títulos Duplicados y Metadata Incorrecta

## 🚨 Problema Identificado

### Issue #1: Títulos Duplicados
**Problema:** Las páginas `/peru` y `/peru/entradas` compartían el mismo título "Bruno Mars en Perú"

**Causa:** La página `/[pais]/entradas/page.tsx` estaba usando incorrectamente `getCountryLandingMetadata()` en lugar de `getCountryTicketsMetadata()`

**Impacto SEO:**
- ❌ Google no puede diferenciar las páginas
- ❌ Canibalización de keywords
- ❌ Ambas páginas compiten por la misma posición
- ❌ Pérdida de ranking para búsquedas transaccionales

### Issue #2: Verificación de Indexación
**Verificado:** ✅ Las páginas de entradas SÍ están configuradas para indexarse

## ✅ Solución Implementada

### Archivo Corregido: `app/[pais]/entradas/page.tsx`

**Antes:**
```typescript
import { getCountryLandingMetadata } from '@/lib/seo/metadata'

export async function generateMetadata({ params }: { params: Promise<{ pais: string }> }) {
  const { pais } = await params
  if (!isValidCountry(pais)) return {}
  return getCountryLandingMetadata(pais as CountrySlug) // ❌ INCORRECTO
}
```

**Después:**
```typescript
import { getCountryTicketsMetadata } from '@/lib/seo/metadata'

export async function generateMetadata({ params }: { params: Promise<{ pais: string }> }) {
  const { pais } = await params
  if (!isValidCountry(pais)) return {}
  return getCountryTicketsMetadata(pais as CountrySlug) // ✅ CORRECTO
}
```

## 📊 Títulos Ahora Diferenciados

### 🇵🇪 Perú
- **Landing** (`/peru`): `Bruno Mars en Perú`
- **Entradas** (`/peru/entradas`): `Entradas Bruno Mars Perú` ✅

### 🇨🇱 Chile
- **Landing** (`/chile`): `Bruno Mars en Chile`
- **Entradas** (`/chile/entradas`): `Entradas Bruno Mars Chile` ✅

### 🇦🇷 Argentina
- **Landing** (`/argentina`): `Bruno Mars en Argentina`
- **Entradas** (`/argentina/entradas`): `Entradas Bruno Mars Argentina` ✅

### 🇨🇴 Colombia
- **Landing** (`/colombia`): `Bruno Mars en Colombia`
- **Entradas** (`/colombia/entradas`): `Entradas Bruno Mars Colombia` ✅

### 🇧🇷 Brasil
- **Landing** (`/brasil`): `Bruno Mars no Brasil`
- **Entradas** (`/brasil/ingressos`): `Ingressos Bruno Mars Brasil` ✅

## 🔍 Verificación de Indexación

### Robots.txt ✅
```javascript
// app/robots.ts
{
  userAgent: '*',
  allow: '/',
  disallow: [
    '/*/entradas/checkout',  // ✅ Solo checkout bloqueado
    '/*/ingressos/checkout',
  ],
}
```

**Resultado:** Las páginas `/[pais]/entradas` NO están bloqueadas ✅

### Meta Robots Tags ✅

**Landing (`/pais`):**
```typescript
robots: {
  index: true,
  follow: true,
  'max-video-preview': -1,
  'max-image-preview': 'large',
  'max-snippet': -1,
}
```

**Entradas (`/pais/entradas`):**
```typescript
robots: {
  index: true,  // ✅ Indexable
  follow: true,
  'max-video-preview': -1,
  'max-image-preview': 'large',
  'max-snippet': -1,
}
```

**Checkout (`/pais/entradas/checkout`):**
```typescript
robots: {
  index: hasItems, // ✅ Solo si hay items
  follow: true,
}
```

## 🎯 Estrategia SEO Correcta

### Búsquedas Informativas → Landing
**Query:** "bruno mars en perú"  
**Target:** `/peru`  
**Title:** "Bruno Mars en Perú"  
**Intent:** Usuario busca información general

### Búsquedas Transaccionales → Entradas
**Query:** "entradas bruno mars perú"  
**Target:** `/peru/entradas`  
**Title:** "Entradas Bruno Mars Perú"  
**Intent:** Usuario quiere comprar

## 📈 Beneficios del Fix

1. ✅ **Sin canibalización**: Cada página tiene su propio título único
2. ✅ **Match exacto**: "Entradas Bruno Mars Perú" = título de `/peru/entradas`
3. ✅ **Intención clara**: Google sabe qué página mostrar según la búsqueda
4. ✅ **Indexación completa**: Todas las páginas de entradas son indexables
5. ✅ **Rich snippets**: Cada página puede tener su propio rich result

## 🧪 Testing Recomendado Post-Deploy

### 1. Verificar en Google
```
site:brunomars.lat/peru
site:brunomars.lat/peru/entradas
```
Ambas deben aparecer con títulos diferentes.

### 2. Google Search Console
- Inspeccionar URL: `/peru` y `/peru/entradas`
- Verificar que ambas estén indexadas
- Confirmar títulos diferentes

### 3. Rich Results Test
- https://search.google.com/test/rich-results
- Probar ambas URLs
- Verificar que el título sea correcto en cada una

## 📊 Monitoreo

**Métricas a seguir:**
- Impresiones para "bruno mars en [país]" → `/[pais]`
- Impresiones para "entradas bruno mars [país]" → `/[pais]/entradas`
- CTR de cada página
- Posiciones independientes

**Expectativa:**
- `/peru` debe rankear para búsquedas informativas
- `/peru/entradas` debe rankear para búsquedas transaccionales
- Sin competencia entre ellas

---

**Fecha del fix:** 2026-08-28  
**Archivo modificado:** `app/[pais]/entradas/page.tsx`  
**Build status:** ✅ Compilación exitosa  
**Estado:** Listo para deploy inmediato  
**Prioridad:** 🔴 CRÍTICO - Deploy urgente
