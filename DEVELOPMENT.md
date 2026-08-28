# 📘 Guía de Desarrollo - Bruno Mars LATAM

Esta guía técnica explica cómo continuar el desarrollo del proyecto siguiendo la arquitectura establecida.

## 🏗️ Arquitectura del Proyecto

### Principio Fundamental: Independencia de Datos

**Regla de oro**: Cada país tiene sus propios archivos de datos. Nunca compartir un archivo único.

```typescript
// ✅ CORRECTO
data/countries/peru.ts      → Datos de Perú
data/countries/chile.ts     → Datos de Chile
data/zones/peru.zones.ts    → Zonas de Perú
data/zones/chile.zones.ts   → Zonas de Chile

// ❌ INCORRECTO
data/countries.json         → Todos los países en un archivo
data/zones.json            → Todas las zonas en un archivo
```

### Flujo de Datos

```
1. Usuario visita /peru
   ↓
2. generateStaticParams() valida país
   ↓
3. generateMetadata() lee data/countries/peru.ts
   ↓
4. Page component renderiza con datos de peru.ts
   ↓
5. JSON-LD se genera dinámicamente desde los mismos datos
```

## 📝 Cómo Agregar un Nuevo País

### 1. Crear archivo de datos del país

```typescript
// data/countries/nuevo-pais.ts
import type { CountryData } from './types'

export const nuevoPaisData: CountryData = {
  slug: 'nuevo-pais',
  name: 'Nuevo País',
  dates: [
    {
      date: '2027-10-15',
      time: '21:00',
      timezone: 'America/Timezone',
      dateDisplay: '15 de octubre de 2027',
    },
  ],
  venue: {
    name: 'Estadio Nacional',
    address: {
      streetAddress: 'Dirección completa',
      city: 'Ciudad',
      region: 'Región',
      postalCode: '00000',
      country: 'CC',
    },
    capacity: 50000,
  },
  seo: {
    landingTitle: 'Bruno Mars en Nuevo País',
    landingDescription: 'Descripción única de 140-160 caracteres...',
    ticketsTitle: 'Entradas Bruno Mars Nuevo País',
    ticketsDescription: 'Descripción única para página de entradas...',
    keywords: ['bruno mars nuevo pais', 'entradas', 'concierto'],
  },
  faqs: [
    // Mínimo 3-5 preguntas únicas del país
  ],
  content: {
    hero: {
      title: 'Bruno Mars en Nuevo País',
      subtitle: 'The Romantic Tour 2027',
      description: 'Descripción única del hero',
    },
    about: {
      title: 'Sobre el concierto en Nuevo País',
      paragraphs: [
        // Mínimo 2-3 párrafos únicos (300-500 palabras)
      ],
    },
  },
  images: {
    hero: '/images/countries/nuevo-pais/hero.jpg',
    og: '/images/countries/nuevo-pais/og.jpg',
    venue: '/images/countries/nuevo-pais/venue.jpg',
  },
  offersValidFrom: '2026-09-01T10:00:00-05:00',
}
```

### 2. Crear archivo de zonas

```typescript
// data/zones/nuevo-pais.zones.ts
import type { ZonesData } from '../countries/types'

export const nuevoPaisZones: ZonesData = {
  countrySlug: 'nuevo-pais',
  currency: 'USD', // Moneda del país
  zones: [
    {
      id: 'zona-1',
      name: 'ZONA 1',
      price: 100.00,
      currency: 'USD',
      category: 'numerada',
      available: true,
      description: 'Descripción de la zona',
    },
    // ... agregar las 10 zonas
  ],
}
```

### 3. Actualizar configuración central

```typescript
// data/countries.config.ts
export const COUNTRIES: Record<CountrySlug, CountryConfig> = {
  // ... países existentes
  'nuevo-pais': {
    slug: 'nuevo-pais',
    name: 'Nuevo País',
    language: 'es', // o 'pt' para portugués
    locale: 'es-XX',
    currency: 'USD',
    ticketsSlug: 'entradas',
    hreflangCode: 'es-XX',
  },
}
```

### 4. Exportar en índices

```typescript
// data/countries/index.ts
import { nuevoPaisData } from './nuevo-pais'

export const COUNTRY_DATA: Record<CountrySlug, CountryData> = {
  // ... países existentes
  'nuevo-pais': nuevoPaisData,
}

// data/zones/index.ts
import { nuevoPaisZones } from './nuevo-pais.zones'

export const ZONES_DATA: Record<CountrySlug, ZonesData> = {
  // ... países existentes
  'nuevo-pais': nuevoPaisZones,
}
```

### 5. Actualizar hreflang

Agregar el nuevo país en los mapas de hreflang:

```typescript
// lib/seo/metadata.ts
const languages: Record<string, string> = {
  'x-default': BASE_URL,
  // ... países existentes
  'es-XX': `${BASE_URL}/nuevo-pais`,
}
```

## 🎨 Cómo Agregar un Nuevo Componente UI

### 1. Componente de presentación (sin estado)

```typescript
// components/ejemplo/MiComponente.tsx
interface MiComponenteProps {
  countrySlug: CountrySlug
  data: SomeData
}

export function MiComponente({ countrySlug, data }: MiComponenteProps) {
  return (
    <div className="matte p-6 rounded-lg">
      {/* Contenido */}
    </div>
  )
}
```

### 2. Componente con estado (Client Component)

```typescript
'use client'

import { useState } from 'react'

export function MiComponenteInteractivo() {
  const [state, setState] = useState(false)

  return (
    <button onClick={() => setState(!state)}>
      {state ? 'Activo' : 'Inactivo'}
    </button>
  )
}
```

## 🔍 SEO: Agregar Nuevo Tipo de JSON-LD

```typescript
// lib/seo/jsonld.ts
export function buildNewSchema(countrySlug: CountrySlug) {
  const data = getCountryData(countrySlug)

  return {
    '@context': 'https://schema.org',
    '@type': 'NuevoTipo',
    name: data.name,
    // ... propiedades requeridas
  }
}
```

Luego inyectar en la página:

```typescript
// app/[pais]/nueva-pagina/page.tsx
import { JsonLd } from '@/components/seo/JsonLd'
import { buildNewSchema } from '@/lib/seo/jsonld'

export default function NuevaPagina({ params }) {
  return (
    <>
      <JsonLd data={buildNewSchema(params.pais)} />
      {/* Contenido */}
    </>
  )
}
```

## 🎯 Testing Checklist

### Antes de cada commit:

- [ ] `npm run build` completa sin errores
- [ ] `npm run lint` pasa sin warnings
- [ ] Verificar que todos los países compilen
- [ ] Probar modo claro y oscuro
- [ ] Verificar responsive en mobile/tablet/desktop
- [ ] Validar JSON-LD con [Rich Results Test](https://search.google.com/test/rich-results)

### Antes de deploy:

- [ ] Actualizar `sitemap.ts` si hay nuevas rutas
- [ ] Verificar que `robots.ts` permite rastreo
- [ ] Comprobar que `.env.local` tiene `NEXT_PUBLIC_BASE_URL` correcto
- [ ] Build de producción exitoso
- [ ] Lighthouse score > 90 en todas las métricas

## 🚀 Deploy Workflow

### Cloudflare Workers

```bash
# 1. Instalar adaptador
npm install -D @opennextjs/cloudflare wrangler

# 2. Crear wrangler.jsonc
# Ver: https://opennext.js.org/cloudflare/get-started

# 3. Build
npm run build

# 4. Deploy
npx wrangler deploy
```

### Verificación post-deploy

1. Verificar que todas las páginas carguen
2. Comprobar que el sitemap esté accesible: `/sitemap.xml`
3. Validar robots.txt: `/robots.txt`
4. Probar modo oscuro/claro
5. Enviar sitemap a Google Search Console

## 📊 Performance Optimization

### Core Web Vitals Targets

- **LCP** (Largest Contentful Paint): < 2.5s
- **FID/INP** (First Input Delay / Interaction to Next Paint): < 200ms
- **CLS** (Cumulative Layout Shift): < 0.1

### Tips de Optimización

1. **Imágenes**: Usar `next/image` con `priority` solo en LCP
2. **Fuentes**: Ya optimizadas con `next/font`
3. **CSS**: Tailwind purge automático
4. **JS**: Minimizar Client Components, preferir Server Components
5. **ISR**: Ajustar `revalidate` según necesidad real

## 🐛 Debug Common Issues

### Error: "país is not a valid country"

```typescript
// Verificar que el slug esté en COUNTRY_SLUGS
// data/countries.config.ts
export const COUNTRY_SLUGS = ['peru', 'chile', 'argentina', 'colombia', 'brasil']
```

### Error: "Cannot read property of undefined"

Significa que falta crear el archivo de datos del país:

```bash
# Crear archivos faltantes
touch data/countries/nuevo-pais.ts
touch data/zones/nuevo-pais.zones.ts
```

### Build falla en generateStaticParams

Verificar que todos los países en `COUNTRY_SLUGS` tengan:
- Archivo en `data/countries/`
- Archivo en `data/zones/`
- Exportados en los índices correspondientes

## 📚 Recursos

- [Next.js 15 Docs](https://nextjs.org/docs)
- [Tailwind CSS v4](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com)
- [Google Search Central](https://developers.google.com/search)
- [Schema.org](https://schema.org)

---

**¿Dudas?** Revisar el código existente en `/peru` como referencia.
