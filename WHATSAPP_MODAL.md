# Modal de WhatsApp - Documentación

## Implementación Completada ✅

Se ha agregado un modal popup atractivo que invita a los visitantes a unirse al grupo de WhatsApp específico de cada país.

## Archivos Creados

### 1. `data/whatsapp.config.ts`
Configuración centralizada de los enlaces de WhatsApp por país:
- 🇵🇪 Perú: https://chat.whatsapp.com/JJ1UsJddCcuKJMho1l6mau
- 🇨🇱 Chile: https://chat.whatsapp.com/Ku57tClqYi98jOEHVLgbXZ
- 🇦🇷 Argentina: https://chat.whatsapp.com/HsRE3Iw4K8tJaJO0w3fovp
- 🇨🇴 Colombia: https://chat.whatsapp.com/Ebyp5j4Tcm0AhknIpoA8Sh
- 🇧🇷 Brasil: https://chat.whatsapp.com/Isc5FaiAzUMJwlV4dHZwQx

### 2. `components/modals/WhatsAppModal.tsx`
Componente modal con las siguientes características:

#### Diseño
- ✅ **Ícono Real de WhatsApp** (SVG oficial del logo)
- ✅ **Diseño limpio y directo** - Sin distracciones
- ✅ **Mensaje claro**: "Únete a nuestro grupo de WhatsApp"
- ✅ **Color oficial de WhatsApp** (#25D366)
- ✅ Animaciones suaves (fade in/out, scale)
- ✅ Backdrop blur para enfocar la atención
- ✅ Responsive y adaptable a móviles

#### Funcionalidad
- ✅ **Auto-show**: Aparece automáticamente después de 2 segundos
- ✅ **SIEMPRE se muestra**: NO usa localStorage (aparece en cada visita)
- ✅ **Bilingüe**: Textos en español y portugués según el país
- ✅ **Click fuera para cerrar**: UX intuitiva
- ✅ **Botón "Ahora no"**: Opción para cerrar

#### Mensaje
**Español:**
- Título: "Únete a nuestro grupo de WhatsApp"
- Subtítulo: "Recibe actualizaciones exclusivas sobre el show de Bruno Mars en {País}"

**Portugués (Brasil):**
- Título: "Junte-se ao nosso grupo do WhatsApp"
- Subtítulo: "Receba atualizações exclusivas sobre o show do Bruno Mars no Brasil"

## Archivos Modificados

### 3. `app/[pais]/page.tsx`
- Importa y renderiza `<WhatsAppModal />`
- Se muestra en todas las páginas landing de países

### 4. `app/[pais]/entradas/page.tsx`
- Importa y renderiza `<WhatsAppModal />`
- Se muestra en todas las páginas de entradas/tickets

## Comportamiento del Modal

### Cuándo se muestra
- ✅ **SIEMPRE** en cada visita a `/peru` o `/peru/entradas`
- ✅ Después de **2 segundos** de cargar la página
- ✅ **NO usa localStorage** - se muestra cada vez

### Cómo se cierra
1. Click en el botón "×" (esquina superior derecha)
2. Click fuera del modal (en el backdrop)
3. Click en "Ahora no"
4. Click en "Unirme al Grupo" (abre WhatsApp y cierra)

### ⚠️ Importante
**El modal NO guarda preferencias**. Se mostrará en cada visita a las páginas de país o entradas, independientemente de si el usuario lo cerró anteriormente o se unió al grupo.

## Personalización

### Cambiar el delay de aparición
Edita `components/modals/WhatsAppModal.tsx`:
```typescript
setTimeout(() => {
  setIsOpen(true)
}, 2000) // Cambiar 2000 (2 segundos) al valor deseado
```

### Cambiar los textos
Los textos están en el objeto `content` dentro del componente:
- `title`: Título del modal
- `subtitle`: Subtítulo descriptivo
- `button`: Texto del botón principal
- `later`: Texto del botón secundario

### Debugging
El modal incluye console.logs para debugging:
- País actual
- URL del grupo de WhatsApp
- Estado de apertura del modal

Revisa la consola del navegador para ver estos logs.

## Testing

### Verificar en desarrollo
```bash
npm run dev
```

Visita:
- http://localhost:3000/peru (modal aparece a los 2 segundos)
- http://localhost:3000/chile/entradas (modal aparece a los 2 segundos)

### Verificar en producción
```bash
npm run build
npm run start
```

El modal debe aparecer **cada vez** que visitas cualquiera de estas páginas:
- `/peru`, `/chile`, `/argentina`, `/colombia`, `/brasil`
- `/peru/entradas`, `/chile/entradas`, etc.

## Rutas donde aparece el modal

✅ `/peru` → Modal con grupo de Perú  
✅ `/peru/entradas` → Modal con grupo de Perú  
✅ `/chile` → Modal con grupo de Chile  
✅ `/chile/entradas` → Modal con grupo de Chile  
✅ `/argentina` → Modal con grupo de Argentina  
✅ `/argentina/entradas` → Modal con grupo de Argentina  
✅ `/colombia` → Modal con grupo de Colombia  
✅ `/colombia/entradas` → Modal con grupo de Colombia  
✅ `/brasil` → Modal con grupo de Brasil  
✅ `/brasil/ingressos` → Modal con grupo de Brasil  

❌ NO aparece en:
- Home (`/`)
- Blog (`/blog`)
- Checkout (`/[pais]/entradas/checkout`)

## Estado del Build

✅ **Build exitoso** - El proyecto compila sin errores  
✅ **TypeScript válido** - Sin errores de tipos  
✅ **Responsive** - Funciona en móviles y desktop  
✅ **Accesibilidad** - Botones con aria-label  
✅ **Ícono oficial de WhatsApp** - SVG del logo real  
✅ **NO usa localStorage** - Se muestra siempre

---

**Fecha de implementación:** 2026-08-28  
**Última actualización:** 2026-08-28  
**Estado:** Listo para deploy ✅
