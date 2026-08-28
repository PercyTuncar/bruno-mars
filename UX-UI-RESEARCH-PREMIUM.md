# 🎨 Investigación UX/UI - Páginas de Venta de Entradas Premium

## Análisis de las Mejores Páginas

### 1. Ticketmaster (Líder Mundial)
**Navbar:**
- Logo izquierda (120px height)
- Links horizontales visibles SIEMPRE (Sports, Music, Arts, More)
- Búsqueda central prominente (400px width)
- Account + Cart derecha
- Sin hamburger hasta 768px
- Background: white con sombra sutil

**Espaciado:**
- Container: max-w-7xl (1280px)
- Padding lateral: 80px desktop, 40px tablet, 20px mobile
- Secciones: 120px padding vertical
- Entre elementos: 32px, 24px, 16px (scale perfecta)

**Hero:**
- Full bleed image (altura: 65vh)
- Overlay gradient oscuro (opacity 0.6)
- Título: 72px bold
- Precio desde: 96px ultra-bold, color accent
- CTA: 56px height, 24px padding horizontal

### 2. StubHub (Premium)
**Características:**
- Sticky header con blur backdrop
- Mega menu con imágenes
- Filtros siempre visibles (sidebar 280px)
- Cards con hover 3D lift
- Precios en negrita 36px
- Trust badges en footer

### 3. Eventbrite (Moderno)
**Diseño:**
- Hero asimétrico (60/40 split)
- Cards con aspect-ratio 16:9
- Botones con estados: idle, hover, active, disabled
- Microanimaciones en scroll
- Skeleton loaders

### 4. AXS (High-End)
**Premium Features:**
- Video background en hero
- Parallax scroll
- Glassmorphism en overlays
- Animated SVG icons
- Countdown timers prominentes

---

## Sistema de Espaciado Perfecto

### Base: 8px Unit System
```
xs:   4px   (0.5 unit)
sm:   8px   (1 unit)
md:   16px  (2 units)
lg:   24px  (3 units)
xl:   32px  (4 units)
2xl:  48px  (6 units)
3xl:  64px  (8 units)
4xl:  96px  (12 units)
5xl:  128px (16 units)
```

### Aplicación por Sección
```
Hero Section:
- Padding vertical: 128px (desktop), 96px (tablet), 64px (mobile)
- Padding horizontal: 80px (desktop), 40px (tablet), 24px (mobile)
- Gap entre elementos: 48px

Content Sections:
- Padding vertical: 96px
- Padding horizontal: 80px
- Margin entre secciones: 0 (background changes)

Components:
- Card padding: 32px
- Button padding: 16px 32px
- Input padding: 16px 24px
```

---

## Navbar Desktop Profesional

### Estructura (3 zonas)
```
[Logo + Nav Links] [Search] [Actions]
     40%              30%       30%
```

### Especificaciones
```css
height: 80px
background: rgba(255, 255, 255, 0.95)
backdrop-filter: blur(20px)
border-bottom: 1px solid rgba(0,0,0,0.06)
box-shadow: 0 1px 3px rgba(0,0,0,0.04)

Logo:
  height: 48px
  margin-right: 48px

Nav Links:
  gap: 32px
  font-size: 15px
  font-weight: 500
  padding: 8px 0
  hover: border-bottom 2px primary

Search:
  height: 48px
  width: 100%
  max-width: 400px
  border-radius: 24px
  padding: 0 24px 0 48px (icon left)

Actions:
  gap: 24px
  icon-size: 24px
  cart-badge: 20px circle
```

---

## Cards de Países - Diseño Premium

### Layout
```
Grid: 3 columns desktop, 2 tablet, 1 mobile
Gap: 32px
Aspect ratio: 4:3
```

### Especificaciones
```css
Card:
  padding: 40px
  border-radius: 24px
  background: white
  border: 2px solid transparent
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1)
  
  hover:
    transform: translateY(-8px)
    border-color: primary
    box-shadow: 0 24px 48px rgba(179,18,46,0.15)

Header:
  display: flex
  align-items: center
  gap: 24px
  margin-bottom: 32px

Icon Container:
  width: 72px
  height: 72px
  border-radius: 20px
  background: linear-gradient(135deg, primary/10, accent/10)
  display: flex
  align-items: center
  justify-content: center
  
Title:
  font-size: 36px
  font-weight: 700
  letter-spacing: -0.02em

Description:
  font-size: 16px
  line-height: 1.6
  color: muted-foreground
  margin-bottom: 32px

CTA:
  display: flex
  justify-content: space-between
  padding-top: 24px
  border-top: 1px solid border
  font-size: 18px
  font-weight: 600
  color: primary
```

---

## Página de Entradas - Layout Premium

### Estructura (Sidebar + Main)
```
[Filters Sidebar 320px] [Main Content]
        25%                    75%
```

### Sidebar (Sticky)
```
position: sticky
top: 100px
height: calc(100vh - 120px)
overflow-y: auto
padding: 32px
background: muted/30
border-radius: 24px

Filters:
  margin-bottom: 32px
  
  Title:
    font-size: 18px
    font-weight: 600
    margin-bottom: 16px
  
  Options:
    gap: 12px
    checkbox-size: 20px
    label-padding-left: 12px
```

### Zone Cards (Main)
```
Display: Grid
Columns: 2
Gap: 24px

Card:
  padding: 32px
  display: flex
  gap: 32px
  
  Left (Image/Icon):
    width: 120px
    flex-shrink: 0
  
  Right (Content):
    flex: 1
    
    Header:
      display: flex
      justify-content: space-between
      margin-bottom: 16px
      
      Title: 24px bold
      Badge: 12px uppercase, tracking-wide
    
    Price:
      font-size: 48px
      font-weight: 800
      color: primary
      letter-spacing: -0.03em
      margin-bottom: 8px
    
    Description:
      font-size: 14px
      color: muted-foreground
      margin-bottom: 24px
    
    Actions:
      display: flex
      gap: 16px
```

---

## Tipografía Premium

### Font Pairing
```
Display/Headlines: Playfair Display (Serif)
Body/UI: Inter (Sans-serif)
Monospace: JetBrains Mono (Prices/Codes)
```

### Scale (Perfect Fourth - 1.333)
```
xs:   12px  (0.75rem)
sm:   14px  (0.875rem)
base: 16px  (1rem)
lg:   18px  (1.125rem)
xl:   21px  (1.333rem)
2xl:  28px  (1.777rem)
3xl:  37px  (2.369rem)
4xl:  49px  (3.157rem)
5xl:  65px  (4.209rem)
6xl:  87px  (5.61rem)
7xl:  116px (7.478rem)
```

### Weights
```
light: 300
normal: 400
medium: 500
semibold: 600
bold: 700
extrabold: 800
black: 900
```

---

## Colores - Sistema Expandido

### Primary Palette
```
50:  #FFF5F5
100: #FFE3E3
200: #FFC9C9
300: #FFA8A8
400: #FF8787
500: #B3122E (base)
600: #991029
700: #800D23
800: #660A1C
900: #4D0815
```

### Semantic
```
success: #10B981
warning: #F59E0B
error: #EF4444
info: #3B82F6
```

### Neutrals (Perfect Gray Scale)
```
50:  #FAFAFA
100: #F5F5F5
200: #E5E5E5
300: #D4D4D4
400: #A3A3A3
500: #737373
600: #525252
700: #404040
800: #262626
900: #171717
```

---

## Animaciones y Transiciones

### Timing Functions
```
ease-smooth: cubic-bezier(0.4, 0, 0.2, 1)
ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55)
ease-sharp: cubic-bezier(0.4, 0, 0.6, 1)
```

### Duraciones
```
fast: 150ms
normal: 300ms
slow: 500ms
very-slow: 800ms
```

### Efectos Premium
```
Hover Lift:
  transform: translateY(-8px)
  box-shadow: 0 24px 48px rgba(0,0,0,0.15)
  transition: all 0.3s ease-smooth

Hover Glow:
  box-shadow: 0 0 0 4px primary/20,
              0 24px 48px primary/25

Shimmer:
  background: linear-gradient(90deg, ...)
  animation: shimmer 2s infinite

Pulse:
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite
```

---

## CTAs y Botones

### Primary CTA
```
height: 56px
padding: 0 48px
font-size: 18px
font-weight: 600
border-radius: 16px
background: linear-gradient(135deg, primary, accent)
box-shadow: 0 4px 16px primary/30,
            0 12px 32px primary/20
transition: all 0.3s ease-smooth

hover:
  transform: translateY(-2px)
  box-shadow: 0 8px 24px primary/35,
              0 16px 48px primary/25
```

### Secondary
```
Same dimensions
background: transparent
border: 2px solid border
color: foreground

hover:
  border-color: primary
  color: primary
```

---

**CONCLUSIÓN:** Necesito rediseñar COMPLETAMENTE con estos estándares profesionales.

