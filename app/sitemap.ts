import { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/blog'

export const dynamic = 'force-static'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://brunomars.lat'

export default function sitemap(): MetadataRoute.Sitemap {
  const countries = [
    { slug: 'peru', locale: 'es-PE', tickets: 'entradas' },
    { slug: 'chile', locale: 'es-CL', tickets: 'entradas' },
    { slug: 'argentina', locale: 'es-AR', tickets: 'entradas' },
    { slug: 'colombia', locale: 'es-CO', tickets: 'entradas' },
    { slug: 'brasil', locale: 'pt-BR', tickets: 'ingressos' },
  ]

  const routes: MetadataRoute.Sitemap = []

  // Home
  routes.push({
    url: BASE_URL,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 1.0,
    alternates: {
      languages: {
        'x-default': BASE_URL,
        'es-PE': `${BASE_URL}/peru`,
        'es-CL': `${BASE_URL}/chile`,
        'es-AR': `${BASE_URL}/argentina`,
        'es-CO': `${BASE_URL}/colombia`,
        'pt-BR': `${BASE_URL}/brasil`,
      },
    },
  })

  // Páginas de países
  countries.forEach((country) => {
    routes.push({
      url: `${BASE_URL}/${country.slug}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
      alternates: {
        languages: {
          'x-default': BASE_URL,
          'es-PE': `${BASE_URL}/peru`,
          'es-CL': `${BASE_URL}/chile`,
          'es-AR': `${BASE_URL}/argentina`,
          'es-CO': `${BASE_URL}/colombia`,
          'pt-BR': `${BASE_URL}/brasil`,
        },
      },
    })
  })

  // Páginas de entradas/ingressos
  countries.forEach((country) => {
    const ticketsUrl = `${BASE_URL}/${country.slug}/${country.tickets}`

    routes.push({
      url: ticketsUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0, // Máxima prioridad para páginas transaccionales
      alternates: {
        languages: {
          'x-default': BASE_URL,
          'es-PE': `${BASE_URL}/peru/entradas`,
          'es-CL': `${BASE_URL}/chile/entradas`,
          'es-AR': `${BASE_URL}/argentina/entradas`,
          'es-CO': `${BASE_URL}/colombia/entradas`,
          'pt-BR': `${BASE_URL}/brasil/ingressos`,
        },
      },
    })
  })

  // Blog - Página principal
  routes.push({
    url: `${BASE_URL}/blog`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  })

  // Blog - Posts individuales
  const posts = getAllPosts()
  posts.forEach((post) => {
    routes.push({
      url: `${BASE_URL}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: 'monthly',
      priority: 0.7,
    })
  })

  return routes
}
