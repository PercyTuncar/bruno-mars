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
- ✅ Diseño moderno consistente con el sistema de diseño
- ✅ Animaciones suaves (fade in/out, scale)
- ✅ Backdrop blur para enfocar la atención
- ✅ Gradientes y efectos glow en el ícono de WhatsApp
- ✅ Responsive y adaptable a móviles

#### Funcionalidad
- ✅ **Auto-show**: Aparece automáticamente después de 5 segundos
- ✅ **localStorage**: Solo se muestra una vez por país (no molesta al usuario)
- ✅ **Bilingüe**: Textos en español y portugués según el país
- ✅ **Click fuera para cerrar**: UX intuitiva
- ✅ **Botón "Tal vez después"**: Opción no invasiva

#### Beneficios Mostrados
1. 🔔 Actualizaciones de primera mano
2. ⚡ Promociones exclusivas
3. 👥 Conecta con otros fans

## Archivos Modificados

### 3. `app/[pais]/page.tsx`
- Importa y renderiza `<WhatsAppModal />`
- Se muestra en todas las páginas landing de países

### 4. `app/[pais]/entradas/page.tsx`
- Importa y renderiza `<WhatsAppModal />`
- Se muestra en todas las páginas de entradas/tickets

## Comportamiento del Modal

### Cuándo se muestra
- ✅ Primera visita a `/peru` o `/peru/entradas`
- ✅ Después de 5 segundos de cargar la página
- ✅ Solo una vez por país (guarda en localStorage)

### Cuándo NO se muestra
- ❌ Si el usuario ya lo vio anteriormente (localStorage)
- ❌ Si el usuario lo cerró (guarda preferencia)

### Cómo se cierra
1. Click en el botón "×" (esquina superior derecha)
2. Click fuera del modal (en el backdrop)
3. Click en "Tal vez después"
4. Click en "Unirme al Grupo" (abre WhatsApp y cierra)

## localStorage Keys

El modal guarda la preferencia del usuario con esta clave:
```
whatsapp-modal-{pais}
```

Ejemplos:
- `whatsapp-modal-peru`
- `whatsapp-modal-chile`
- `whatsapp-modal-argentina`
- `whatsapp-modal-colombia`
- `whatsapp-modal-brasil`

## Personalización

### Cambiar el delay de aparición
Edita `components/modals/WhatsAppModal.tsx`:
```typescript
setTimeout(() => {
  setIsOpen(true)
}, 5000) // Cambiar 5000 (5 segundos) al valor deseado
```

### Cambiar los textos
Los textos están en el objeto `content` dentro del componente:
- `title`: Título del modal
- `subtitle`: Subtítulo descriptivo
- `benefits`: Lista de beneficios
- `button`: Texto del botón principal
- `later`: Texto del botón secundario

### Forzar que aparezca nuevamente
Para testing o para que vuelva a aparecer, ejecuta en la consola del navegador:
```javascript
localStorage.removeItem('whatsapp-modal-peru')
```

## Análisis y Métricas Recomendadas

Para trackear la efectividad del modal, considera agregar:
1. **Click en "Unirme al Grupo"** - Tasa de conversión
2. **Click en "Tal vez después"** - Tasa de rechazo suave
3. **Click en cerrar (X)** - Tasa de rechazo total
4. **Tiempo hasta conversión** - ¿Cuándo hacen click?

## Testing

### Verificar en desarrollo
```bash
npm run dev
```

Visita:
- http://localhost:3000/peru
- http://localhost:3000/chile/entradas

El modal debe aparecer después de 5 segundos.

### Verificar en producción
```bash
npm run build
npm run start
```

### Limpiar localStorage para testing
```javascript
// En la consola del navegador
localStorage.clear()
```

## Próximas Mejoras Opcionales

1. **A/B Testing**: Probar diferentes textos y tiempos de aparición
2. **Analytics**: Integrar con Google Analytics o similar
3. **Variantes**: Diferentes beneficios según la página (landing vs tickets)
4. **Exit Intent**: Mostrar al intentar salir de la página
5. **Scroll Trigger**: Mostrar después de cierto % de scroll

## Estado del Build

✅ **Build exitoso** - El proyecto compila sin errores  
✅ **TypeScript válido** - Sin errores de tipos  
✅ **Responsive** - Funciona en móviles y desktop  
✅ **Accesibilidad** - Botones con aria-label

---

**Fecha de implementación:** 2026-08-28  
**Estado:** Listo para deploy ✅
