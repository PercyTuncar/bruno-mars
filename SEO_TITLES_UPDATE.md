# Actualización de Títulos y Meta Descripciones SEO

## Cambios Implementados según PRD

### ✅ Títulos Cortos y Concisos

**Antes:**
- ❌ "Bruno Mars en Perú 2027 | The Romantic Tour — Estadio Monumental Lima"
- ❌ "Entradas Bruno Mars Perú 2027 | Estadio Monumental Lima — The Romantic Tour"

**Ahora (según PRD):**
- ✅ **Landing**: "Bruno Mars en Perú" (corto, exacto)
- ✅ **Entradas**: "Entradas Bruno Mars Perú" (intención de compra)

### 📊 Títulos Actualizados por País

#### 🇵🇪 Perú
- **Landing** (`/peru`): `Bruno Mars en Perú`
- **Entradas** (`/peru/entradas`): `Entradas Bruno Mars Perú`
- **Meta Description**: "Compra entradas para Bruno Mars en Perú. The Romantic Tour 2027. Estadio Monumental, 12 de Septiembre. Todas las zonas disponibles: Occidente, Oriente, Cancha, Tribuna Norte."

#### 🇨🇱 Chile
- **Landing** (`/chile`): `Bruno Mars en Chile`
- **Entradas** (`/chile/entradas`): `Entradas Bruno Mars Chile`
- **Meta Description**: "Compra entradas para Bruno Mars en Chile. The Romantic Tour 2027. Estadio Nacional, 16 de Septiembre. Todas las zonas disponibles: Occidente, Oriente, Cancha, Tribuna Norte."

#### 🇦🇷 Argentina
- **Landing** (`/argentina`): `Bruno Mars en Argentina`
- **Entradas** (`/argentina/entradas`): `Entradas Bruno Mars Argentina`
- **Meta Description**: "Compra entradas para Bruno Mars en Argentina. The Romantic Tour 2027. Estadio Monumental, 20 de Septiembre. Todas las zonas disponibles: Occidente, Oriente, Cancha, Tribuna Norte."

#### 🇨🇴 Colombia
- **Landing** (`/colombia`): `Bruno Mars en Colombia`
- **Entradas** (`/colombia/entradas`): `Entradas Bruno Mars Colombia`
- **Meta Description**: "Compra entradas para Bruno Mars en Colombia. The Romantic Tour 2027. Estadio El Campín, 24 de Septiembre. Todas las zonas disponibles: Occidente, Oriente, Cancha, Tribuna Norte."

#### 🇧🇷 Brasil
- **Landing** (`/brasil`): `Bruno Mars no Brasil`
- **Entradas** (`/brasil/ingressos`): `Ingressos Bruno Mars Brasil`
- **Meta Description**: "Compre ingressos para Bruno Mars no Brasil. The Romantic Tour 2027. Allianz Parque, 28 de Setembro. Todos os setores disponíveis: Oeste, Leste, Campo, Tribuna Norte."

## 🎯 Estrategia SEO

### Intención de Búsqueda

**Búsquedas Informativas** (Landing `/pais`):
- "bruno mars en perú"
- "bruno mars chile"
- "concierto bruno mars argentina"

**Búsquedas Transaccionales** (Página de Entradas `/pais/entradas`):
- ✅ **"entradas bruno mars perú"** ← Título exacto
- ✅ **"entradas bruno mars chile"** ← Título exacto
- ✅ **"entradas bruno mars argentina"** ← Título exacto

### Beneficios SEO

1. ✅ **Títulos cortos** (< 60 caracteres) - Se ven completos en SERP
2. ✅ **Match exacto con búsquedas** - "Entradas Bruno Mars Perú"
3. ✅ **Sin distractores** - No hay año, estadio o tour en título
4. ✅ **Intención clara** - Palabra "Entradas" al inicio
5. ✅ **Meta descriptions optimizadas** - Call-to-action + info relevante
6. ✅ **Consistencia** - Mismo patrón en todos los países

### Meta Descriptions Optimizadas

Estructura consistente:
1. **CTA**: "Compra entradas para..."
2. **Tour**: "The Romantic Tour 2027"
3. **Venue + Fecha**: "Estadio X, DD de Mes"
4. **Zonas**: "Todas las zonas disponibles: X, Y, Z"

**Beneficios:**
- Incluye palabras clave secundarias
- Llamada a la acción clara
- Información práctica (fecha, lugar, zonas)
- Long-tail keywords naturales

## 📈 Mejoras Esperadas

### Ranking
- **Búsquedas transaccionales** ("entradas bruno mars [país]") → Primera posición
- **Búsquedas informativas** ("bruno mars en [país]") → Top 3

### CTR (Click-Through Rate)
- Títulos más cortos y claros = Mayor CTR
- Meta descriptions con CTA = Mayor conversión

### Rich Results
- Títulos limpios mejoran la elegibilidad para rich snippets
- JSON-LD ya implementado con todos los campos requeridos

## 🗂️ Archivo Modificado

- ✅ `data/countries.ts` - Todos los títulos y descripciones actualizados

## 🧪 Testing Recomendado

1. **Google Search Console**
   - Verificar indexación de nuevos títulos
   - Monitorear CTR por página
   - Revisar posiciones de palabras clave

2. **Herramientas**
   - [Google Rich Results Test](https://search.google.com/test/rich-results)
   - Verificar cada URL: `/peru`, `/peru/entradas`, etc.

3. **Búsquedas manuales**
   - "entradas bruno mars peru"
   - "entradas bruno mars chile"
   - "entradas bruno mars argentina"

## 📊 KPIs a Monitorear

- Posición para "entradas bruno mars [país]"
- CTR de páginas `/[pais]/entradas`
- Tráfico orgánico por país
- Conversiones desde búsqueda orgánica

---

**Fecha de actualización:** 2026-08-28  
**Archivo modificado:** `data/countries.ts`  
**Build status:** ✅ Compilación exitosa  
**Estado:** Listo para deploy y monitoreo en GSC
