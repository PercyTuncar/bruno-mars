# 🎨 Sistema de Diseño Profesional - Bruno Mars LATAM

## 50 Mejores Prácticas UX/UI para Venta de Entradas

### 1. Above the Fold (0-800px)
1. ✅ Hero con CTA visible sin scroll
2. ✅ Precio mínimo visible inmediatamente
3. ✅ Fechas prominentes
4. ✅ Contador de urgencia (scarcity)
5. ✅ Trust badges (SSL, pagos seguros)

### 2. Navegación
6. ✅ Navbar sticky con progreso de compra
7. ✅ Breadcrumbs en cada paso
8. ✅ Carrito siempre visible
9. ✅ Búsqueda de eventos
10. ✅ Selector de país/idioma

### 3. Visual Hierarchy
11. ✅ Tipografía con 6 niveles máximo
12. ✅ Contraste AAA en precios
13. ✅ Botones primarios vs secundarios claros
14. ✅ Grid de 12 columnas
15. ✅ Espaciado en múltiplos de 8px

### 4. Trust & Security
16. ✅ Logos de métodos de pago
17. ✅ Certificados SSL visible
18. ✅ Testimonios/reviews
19. ✅ "X personas viendo esto"
20. ✅ Política de reembolso clara

### 5. Product Display
21. ✅ Mapa de asientos interactivo
22. ✅ Vista 360° del venue
23. ✅ Comparación de zonas lado a lado
24. ✅ Filtros por precio/categoría
25. ✅ "Mejores asientos disponibles"

### 6. Urgencia y Escasez
26. ✅ Countdown timer
27. ✅ "Solo X entradas quedan"
28. ✅ "Y personas compraron hoy"
29. ✅ Barra de disponibilidad visual
30. ✅ Alertas de precio dinámico

### 7. Checkout Optimization
31. ✅ Proceso en 3 pasos máximo
32. ✅ Progreso visual claro
33. ✅ Auto-fill de formularios
34. ✅ Validación en tiempo real
35. ✅ Resumen sticky del pedido

### 8. Mobile Optimization
36. ✅ Touch targets > 44px
37. ✅ One-thumb navigation
38. ✅ Bottom sheet para acciones
39. ✅ Native scroll, no custom
40. ✅ Apple/Google Pay integrado

### 9. Performance
41. ✅ LCP < 2.5s
42. ✅ Skeleton screens
43. ✅ Lazy loading imágenes
44. ✅ Preload recursos críticos
45. ✅ Service Worker para offline

### 10. Conversión
46. ✅ Exit-intent popup con descuento
47. ✅ Upsells relevantes
48. ✅ "Completa tu experiencia"
49. ✅ Recuperación de carritos abandonados
50. ✅ Share/referral incentives

---

## Elementos Navbar SEO-Optimized

### Elementos Críticos
1. **Logo + Schema Markup** (Organization)
2. **Selector de País** (Hreflang signals)
3. **Búsqueda de Eventos** (Internal search)
4. **Fechas Próximas** (Event schema)
5. **Teléfono de Soporte** (LocalBusiness)
6. **Carrito con Badge** (E-commerce signals)
7. **Login/Account** (User engagement)
8. **Idioma/Moneda** (International SEO)

### Estructura SEO
```html
<nav itemscope itemtype="https://schema.org/SiteNavigationElement">
  <a itemprop="url" href="/"><span itemprop="name">Inicio</span></a>
  <a itemprop="url" href="/eventos"><span itemprop="name">Eventos</span></a>
  ...
</nav>
```

---

## Glassmorphism & Liquid Effects

### CSS Variables Necesarias
```css
--glass-bg: rgba(255, 255, 255, 0.05);
--glass-border: rgba(255, 255, 255, 0.1);
--glass-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
--backdrop-blur: 40px;
--liquid-speed: 0.6s;
```

### Liquid Effect Implementation
- Blob shapes con border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%
- Animation con @keyframes morphing
- filter: blur() para efecto gota
- backdrop-filter: blur() para glass
- box-shadow con múltiples capas para depth

---

## Tipografía Profesional

### Font Stack
```
Headings: Playfair Display (Serif editorial)
Body: Inter (Sans moderna)
Mono: JetBrains Mono (Precios/códigos)
```

### Scale (Type System)
```
xs:  12px / 0.75rem
sm:  14px / 0.875rem
base: 16px / 1rem
lg:  18px / 1.125rem
xl:  20px / 1.25rem
2xl: 24px / 1.5rem
3xl: 30px / 1.875rem
4xl: 36px / 2.25rem
5xl: 48px / 3rem
6xl: 60px / 3.75rem
7xl: 72px / 4.5rem
8xl: 96px / 6rem
9xl: 128px / 8rem
```

### Line Heights
```
tight:   1.25
normal:  1.5
relaxed: 1.75
loose:   2
```

---

## Espaciado Perfecto (8px System)

```
0:   0px
1:   8px
2:   16px
3:   24px
4:   32px
5:   40px
6:   48px
8:   64px
10:  80px
12:  96px
16:  128px
20:  160px
24:  192px
32:  256px
```

---

## Color System Extended

### Primary Palette
```
primary-50:  #fef2f2
primary-100: #fee2e2
primary-500: #B3122E (base)
primary-600: #991029
primary-700: #800d23
primary-900: #4d0815
```

### Semantic Colors
```
success:  #22c55e
warning:  #f59e0b
error:    #ef4444
info:     #3b82f6
```

---

## Animaciones Avanzadas

### Framer Motion Variants
```typescript
fadeInUp: {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0 }
}

stagger: {
  visible: {
    transition: { staggerChildren: 0.1 }
  }
}

scale: {
  hover: { scale: 1.05 },
  tap: { scale: 0.95 }
}

liquid: {
  animate: {
    borderRadius: [
      "30% 70% 70% 30% / 30% 30% 70% 70%",
      "70% 30% 30% 70% / 70% 70% 30% 30%",
      "30% 70% 70% 30% / 30% 30% 70% 70%"
    ]
  },
  transition: {
    duration: 8,
    repeat: Infinity,
    ease: "easeInOut"
  }
}
```

---

## Componentes a Crear

1. **LiquidBlob** - Formas líquidas animadas
2. **GlassCard** - Cards con glassmorphism
3. **FloatingCTA** - Botón flotante sticky
4. **ProgressBar** - Indicador de checkout
5. **TrustBadges** - Íconos de confianza
6. **LiveCounter** - Personas viendo/comprando
7. **SeatMap** - Mapa interactivo de zonas
8. **ComparisonTable** - Comparar zonas
9. **UrgencyBanner** - Escasez/urgencia
10. **MicroAnimations** - Feedback visual

---

**Estado**: ✅ Investigación completada  
**Próximo**: Implementar sistema completo
