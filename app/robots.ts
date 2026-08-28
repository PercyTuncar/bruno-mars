import { MetadataRoute } from 'next'

export const dynamic = 'force-static'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://brunomars.lat'

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/*/entradas/checkout',
          '/*/ingressos/checkout',
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
