import type { MetadataRoute } from 'next'

export const dynamic = 'force-static'

/**
 * Web App Manifest para PWA
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Bruno Mars LATAM - The Romantic Tour 2027',
    short_name: 'Bruno Mars LATAM',
    description: 'Entradas oficiales para Bruno Mars The Romantic Tour 2027 en Latinoamérica',
    start_url: '/',
    display: 'standalone',
    background_color: '#150A0C',
    theme_color: '#B3122E',
    icons: [
      {
        src: '/favicon-16x16.png',
        sizes: '16x16',
        type: 'image/png',
      },
      {
        src: '/favicon-32x32.png',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        src: '/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  }
}
