# 🎫 REDISEÑO PÁGINA DE ENTRADAS - Ticketera Premium

## Análisis de las mejores ticketeras

### Ticketmaster
- **Mapa interactivo** del venue con zonas clickeables
- **Vista de asientos** con zoom
- **Filtros laterales** (precio, categoría, disponibilidad)
- **Comparación de zonas** lado a lado
- **Precio destacado** grande
- **Urgencia** (X entradas quedan)
- **Sticky cart** con resumen

### StubHub
- **Grid de zonas** con thumbnails
- **Best value badge** en zonas recomendadas
- **Sorting** (precio, mejor vista, popularidad)
- **Quick view** modal para detalles
- **Delivery badges** (entrega inmediata)

### Dice.fm
- **Lista compacta** con scroll infinito
- **Categorías con colores** distintivos
- **Sold out** muy visible
- **Mobile-first** diseño

---

## ✅ NUEVO DISEÑO - Página de Entradas

### Layout Principal

```
[Navbar]
[Hero Compacto con info del evento]

[Filtros Sidebar]  |  [Mapa Visual del Venue]  |  [Zonas Grid/List]
     25%           |         30%               |        45%
```

### Componentes Clave

#### 1. Hero Compacto (150px)
- Título del evento
- Fecha, venue inline
- Badge de disponibilidad
- Trust indicators pequeños

#### 2. Sidebar de Filtros (Sticky)
```
┌─────────────────┐
│ FILTROS         │
├─────────────────┤
│ Precio          │
│ ━━━━━━━●────    │ (slider)
│ $50 - $500      │
├─────────────────┤
│ Categoría       │
│ ☑ Numerada      │
│ ☑ Stand Up      │
├─────────────────┤
│ Disponibilidad  │
│ ● Solo disponib.│
│ ○ Ver agotadas  │
├─────────────────┤
│ [Limpiar]       │
└─────────────────┘
```

#### 3. Mapa Visual del Venue
```
┌──────────────────────┐
│                      │
│    ┌──────────┐      │
│    │ ESCENARIO│      │
│    └──────────┘      │
│                      │
│  [VIP] [PLATEA]      │
│                      │
│  [GENERAL] [STAND]   │
│                      │
│  Click para ver →    │
└──────────────────────┘
```
- Clickeable zones
- Hover highlight
- Colores por categoría
- Labels claros

#### 4. Grid de Zonas (Principal)

**Vista Grid** (default)
```
┌────────────┐ ┌────────────┐ ┌────────────┐
│ VIP ZONE   │ │ PLATEA A   │ │ GENERAL    │
│            │ │            │ │            │
│ ⭐ BEST    │ │ 👁 VISTA   │ │ 💰 ECONÓMI.│
│            │ │            │ │            │
│ $250       │ │ $180       │ │ $80        │
│            │ │            │ │            │
│ [Ver +]    │ │ [Ver +]    │ │ [Ver +]    │
└────────────┘ └────────────┘ └────────────┘
```

**Vista Lista** (toggle)
```
┌──────────────────────────────────────────────┐
│ 🎯 VIP ZONE          $250    [+] 0 [-]   →  │
│ Frente al escenario                          │
│ ✓ Asientos numerados  ✓ Mejor vista         │
└──────────────────────────────────────────────┘
```

#### 5. Zone Card Expandido
```
┌─────────────────────────────────────────────┐
│ 🎯 VIP ZONE                    ⭐ BEST VALUE│
├─────────────────────────────────────────────┤
│                                              │
│ [Thumbnail del área]                         │
│                                              │
├─────────────────────────────────────────────┤
│ ✓ Frente al escenario                       │
│ ✓ Asientos numerados                        │
│ ✓ Acceso a bar VIP                          │
│ ✓ Mejor vista del show                      │
├─────────────────────────────────────────────┤
│ Precio por entrada:                          │
│ $250.00                                      │
│                                              │
│ Cantidad:  [-]  2  [+]                      │
│                                              │
│ Total: $500.00                               │
│                                              │
│ [Agregar al Carrito] →                       │
└─────────────────────────────────────────────┘
```

#### 6. Sticky Cart (Bottom)
```
┌─────────────────────────────────────────────┐
│ 🛒 2 entradas  |  $500.00  |  [Checkout] → │
└─────────────────────────────────────────────┘
```

---

## 🎨 Elementos de UX

### Badges
- ⭐ **BEST VALUE** - rojo, mejor relación precio/vista
- 🔥 **HOT** - casi agotadas
- ⚡ **ÚLTIMAS X** - urgencia
- 👁 **MEJOR VISTA** - vista premium
- 💰 **ECONÓMICO** - precio bajo

### Estados
- **Disponible** - border verde, hover lift
- **Pocas entradas** - border amarillo, badge urgencia
- **Agotado** - grayscale, no hover, badge rojo

### Micro-interacciones
- **Hover zone** → highlight en mapa
- **Click mapa** → scroll a zone card
- **Add to cart** → shake animation + número badge
- **Change quantity** → pulse en total

---

## 📱 Responsive

### Desktop (>1024px)
- 3 columnas: Filtros | Mapa | Zonas
- Grid 2 cols para zone cards
- Sticky sidebar

### Tablet (768-1024px)
- 2 columnas: Mapa/Filtros collapse | Zonas
- Grid 2 cols para zone cards
- Filtros en drawer

### Mobile (<768px)
- 1 columna
- Tabs: [Mapa] [Lista]
- Filtros en bottom sheet
- Lista vertical
- Sticky cart bottom

---

## 🚀 Implementación

1. **Filtros funcionales** con state
2. **Mapa SVG clickeable** o imagen con hotspots
3. **Toggle Grid/List view**
4. **Sort options** (precio, popularidad)
5. **Carrito global** con context
6. **Animaciones** con framer-motion
7. **Skeleton loaders** mientras carga

---

**Objetivo:** Experiencia premium tipo Ticketmaster pero más limpia y rápida.
