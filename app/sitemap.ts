import { MetadataRoute } from 'next'

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

  // Páginas de país
  countries.forEach((country) => {
    const countryUrl = `${BASE_URL}/${country.slug}`

    routes.push({
      url: countryUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
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

  // Páginas de entradas
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

  // Blog (opcional - agregar cuando existan posts)
  routes.push({
    url: `${BASE_URL}/blog`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.5,
  })

  return routes
}
