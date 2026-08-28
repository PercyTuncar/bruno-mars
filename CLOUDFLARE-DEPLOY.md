# Deploy en Cloudflare Pages - Next.js Static Export

## 🔴 PROBLEMA IDENTIFICADO

Cloudflare detecta automáticamente Next.js y trata de usar **@opennextjs/cloudflare** (Workers).

Para un sitio 100% estático con `output: 'export'`, esto causa errores.

## ✅ SOLUCIÓN CORRECTA

### Opción 1: Usar Framework Preset "None" (RECOMENDADO)

1. Ve a [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. **Workers & Pages** > Tu proyecto > **Settings** > **Builds & deployments**
3. Click en **Edit configurations**
4. Configura:
   ```
   Framework preset: None
   Build command: npm run build
   Build output directory: out
   Root directory: (leave empty)
   ```
5. **Save**
6. Ve a **Deployments** y click en **Retry deployment**

### Opción 2: Variables de Entorno (Alternativa)

Si la Opción 1 no funciona, agrega esta variable en **Settings > Environment variables**:

```
DISABLE_OPENNEXT=1
```

O usa el build command completo:

```
npm run build && echo "Static export - no OpenNext"
```

### Variables de Entorno Requeridas

```env
NEXT_PUBLIC_BASE_URL=https://brunomars.lat
NODE_VERSION=20
```

## 📚 Referencias

- [Cloudflare Pages - Static Next.js](https://developers.cloudflare.com/pages/framework-guides/nextjs/deploy-a-static-nextjs-site/)
- [Build Configuration](https://developers.cloudflare.com/pages/configuration/build-configuration/)

---

**Última actualización:** La clave es usar Framework preset "None" para evitar la detección automática de OpenNext.

### 4. Build Settings

**Node.js version:** 20.x

**Install command (opcional):**
```bash
npm ci
```

### 5. Deploy

1. Click en **Save and Deploy**
2. Espera a que termine el build (2-3 minutos)
3. Tu sitio estará disponible en: `https://bruno-mars-xxx.pages.dev`

### 6. Dominio Personalizado

1. Ve a **Custom domains**
2. Click en **Set up a custom domain**
3. Ingresa: `brunomars.lat`
4. Sigue las instrucciones para configurar los DNS

**Registros DNS necesarios:**

```
Type: CNAME
Name: brunomars.lat
Target: bruno-mars-xxx.pages.dev
Proxy: Yes (naranja)

Type: CNAME
Name: www
Target: bruno-mars-xxx.pages.dev
Proxy: Yes (naranja)
```

## ✅ Verificación Post-Deploy

Una vez deployado, verifica:

- ✅ Home: `https://brunomars.lat`
- ✅ Perú: `https://brunomars.lat/peru`
- ✅ Chile: `https://brunomars.lat/chile`
- ✅ Argentina: `https://brunomars.lat/argentina`
- ✅ Colombia: `https://brunomars.lat/colombia`
- ✅ Brasil: `https://brunomars.lat/brasil` (en portugués)
- ✅ Entradas Perú: `https://brunomars.lat/peru/entradas`
- ✅ Ingressos Brasil: `https://brunomars.lat/brasil/ingressos`
- ✅ Blog: `https://brunomars.lat/blog`
- ✅ Sitemap: `https://brunomars.lat/sitemap.xml`
- ✅ Robots: `https://brunomars.lat/robots.txt`

## 🚀 Optimizaciones de Cloudflare

### Cache Rules (Opcional)

1. Ve a **Caching** > **Cache Rules**
2. Crea regla para páginas estáticas:

```
If URI Path contains /blog
Then Cache Everything, Edge TTL: 1 hour
```

### Speed Optimizations

Habilita en **Speed > Optimization**:

- ✅ Auto Minify (HTML, CSS, JS)
- ✅ Brotli
- ✅ Early Hints
- ✅ HTTP/3 (with QUIC)

## 📊 Analytics

Habilita **Web Analytics** para monitorear:
- Visitas por país
- Páginas más vistas
- Performance metrics

## 🔄 Auto-Deploy

Cada push a `main` triggerea un nuevo deploy automáticamente.

Para ver el build log:
1. Ve a **Deployments**
2. Click en el deployment
3. Ve a **Build log**

## 🌐 URLs Finales

**Producción:**
- Main: `https://brunomars.lat`
- Preview: `https://bruno-mars-xxx.pages.dev`

**Por País:**
- 🇵🇪 Perú: `/peru` y `/peru/entradas`
- 🇨🇱 Chile: `/chile` y `/chile/entradas`
- 🇦🇷 Argentina: `/argentina` y `/argentina/entradas`
- 🇨🇴 Colombia: `/colombia` y `/colombia/entradas`
- 🇧🇷 Brasil: `/brasil` y `/brasil/ingressos`

¡Listo para producción! 🎉
