# Fix: Error de Configuración MDX

## Problema
```
Error: loader undefined for match "{*,next-mdx-rule}" does not have serializable options.
```

## Causa
El uso de `@next/mdx` con `createMDX()` y `withMDX()` causaba conflictos con Turbopack en Next.js 15.5.24.

## Solución Implementada

### 1. Simplificado next.config.ts
```typescript
// ❌ ANTES (con error)
import createMDX from '@next/mdx'
const withMDX = createMDX({ extension: /\.mdx?$/ })
export default withMDX(nextConfig)

// ✅ DESPUÉS (funciona)
export default nextConfig
```

### 2. Creado mdx-components.tsx en raíz
```typescript
// Archivo requerido por Next.js 15 para MDX
import type { MDXComponents } from 'mdx/types'
import { MDXComponents as CustomMDXComponents } from '@/components/blog/MDXComponents'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...CustomMDXComponents,
    ...components,
  }
}
```

### 3. Mantenido en next.config.ts
```typescript
pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx']
```

## Resultado
✅ Build exitoso: 26 páginas generadas  
✅ Dev server funcionando sin errores  
✅ MDX sigue funcionando correctamente  
✅ Turbopack sin warnings

## Verificación
```bash
npm run build  # ✅ Compilación exitosa
npm run dev    # ✅ Sin errores
```

---

**Fix aplicado**: 27 de agosto de 2026  
**Archivos modificados**:
- `next.config.ts` (simplificado)
- `mdx-components.tsx` (nuevo, requerido)

**Status**: ✅ Resuelto
