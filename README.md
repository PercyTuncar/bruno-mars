# Bruno Mars LATAM - The Romantic Tour 2027

Sitio web oficial de venta de entradas para The Romantic Tour de Bruno Mars en Latinoamérica.

## 🌎 Países

- **Perú** - Estadio Monumental, Lima (12 Sept 2027)
- **Chile** - Estadio Nacional, Santiago (16 Sept 2027)
- **Argentina** - Estadio Monumental, Buenos Aires (20 Sept 2027)
- **Colombia** - Estadio El Campín, Bogotá (24 Sept 2027)
- **Brasil** - Allianz Parque, São Paulo (28 Sept 2027)

## 🚀 Tecnologías

- **Next.js 15** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **React 19**
- Optimización SEO completa
- JSON-LD Schemas
- OpenGraph & Twitter Cards
- Multi-idioma (Español/Portugués)

## 📦 Instalación

```bash
npm install
```

## 🛠️ Desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000)

## 🏗️ Build

```bash
npm run build
npm start
```

## 📁 Estructura

```
/app
  /[pais]           - Páginas de país dinámicas
    /entradas       - Página de venta
      /checkout     - Checkout
  /blog             - Blog posts
/components         - Componentes reutilizables
/data
  /content          - Contenido por país (único)
  /zones            - Zonas y precios por país
/lib/seo            - Metadatos y JSON-LD
```

## 🌐 SEO

Cada país tiene:
- Metadatos únicos
- JSON-LD completo (MusicEvent, Organization, Breadcrumbs)
- OpenGraph tags
- Twitter Cards
- Hreflang tags
- Contenido diferenciado (sin duplicación)

## 📱 Deploy

Optimizado para:
- Cloudflare Pages
- Vercel
- Netlify

## 📄 Licencia

© 2027 Bruno Mars LATAM
