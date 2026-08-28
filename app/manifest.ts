import type { MetadataRoute } from 'next'

/**
 * Web App Manifest para PWA básico
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
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
