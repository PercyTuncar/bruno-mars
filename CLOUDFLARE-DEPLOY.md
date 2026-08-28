# Deploy en Cloudflare Pages

## 🔴 IMPORTANTE: Configuración para Static Export

Este proyecto usa **Next.js Static Export** (`output: 'export'`), NO OpenNext/Workers.

El archivo `.nopennext` le indica a Cloudflare que **NO use @opennextjs/cloudflare**.

## 📋 Pasos para Deploy

### 1. Conectar con GitHub

1. Ve a [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Selecciona tu cuenta
3. Ve a **Workers & Pages**
4. Click en **Create Application**
5. Selecciona **Pages** > **Connect to Git**
6. Autoriza Cloudflare a acceder a tu GitHub
7. Selecciona el repositorio: `PercyTuncar/bruno-mars`

### 2. Configuración del Build

**Framework preset:** Next.js (Static HTML Export)

**Build command:**
```bash
npm run build
```

**Build output directory:**
```
out
```

**Root directory:**
```
/
```

### 3. Variables de Entorno

Agrega estas variables en **Settings > Environment Variables**:

```env
NEXT_PUBLIC_BASE_URL=https://brunomars.lat
NODE_VERSION=20
```

### 4. ⚠️ Si sigue usando OpenNext

Si Cloudflare ignora el archivo `.nopennext` y sigue intentando usar OpenNext:

1. Ve a **Settings > Build & deployments**
2. En **Build configuration**, cambia:
   - Framework preset: **None** (en lugar de Next.js)
   - Build command: `npm run build`
   - Build output: `out`

Esto forzará a Cloudflare a usar el build estático sin detección automática.

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
