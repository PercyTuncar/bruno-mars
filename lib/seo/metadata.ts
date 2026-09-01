/**
 * Helpers para construir generateMetadata dinámicamente por tipo de página
 * Implementa las mejores prácticas de Next.js 15 Metadata API
 */

import type { Metadata } from 'next'
import { getCountryConfig, type CountrySlug } from '@/data/countries.config'
import { getCountryData } from '@/data/countries'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://brunomars.lat'

/**
 * Metadata para la Home global
 */
export function getHomeMetadata(): Metadata {
  return {
    title: 'Bruno Mars en LATAM 2027 | The Romantic Tour — Fechas y Entradas',
    description: 'Bruno Mars llega a Latinoamérica con The Romantic Tour 2027. Conciertos confirmados en Perú, Chile, Argentina, Colombia y Brasil. Compra tus entradas oficiales.',
    keywords: ['bruno mars latam', 'bruno mars 2027', 'the romantic tour', 'entradas bruno mars', 'conciertos latinoamérica'],

    other: {
      'geo.region': 'LATAM',
      'geo.placename': 'Latin America',
    },

    alternates: {
      canonical: BASE_URL,
      languages: {
        'x-default': BASE_URL,
        'es-PE': `${BASE_URL}/peru`,
        'es-CL': `${BASE_URL}/chile`,
        'es-AR': `${BASE_URL}/argentina`,
        'es-CO': `${BASE_URL}/colombia`,
        'pt-BR': `${BASE_URL}/brasil`,
      },
    },

    openGraph: {
      title: 'Bruno Mars en LATAM 2027 | The Romantic Tour',
      description: 'Bruno Mars llega a Latinoamérica con The Romantic Tour 2027. Conciertos en Perú, Chile, Argentina, Colombia y Brasil.',
      url: BASE_URL,
      siteName: 'Bruno Mars LATAM',
      locale: 'es_LA',
      type: 'website',
      images: [
        {
          url: `${BASE_URL}/images/og/home.jpg`,
          width: 1200,
          height: 630,
          alt: 'Bruno Mars - The Romantic Tour LATAM 2027',
          type: 'image/jpeg',
        },
      ],
    },

    twitter: {
      card: 'summary_large_image',
      site: '@BrunoMars',
      creator: '@BrunoMars',
      title: 'Bruno Mars en LATAM 2027 | The Romantic Tour',
      description: 'Bruno Mars llega a Latinoamérica con The Romantic Tour 2027. Conciertos en Perú, Chile, Argentina, Colombia y Brasil.',
      images: {
        url: `${BASE_URL}/images/og/home.jpg`,
        alt: 'Bruno Mars - The Romantic Tour LATAM 2027',
      },
    },

    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  }
}

/**
 * Metadata para la página de país (landing informativa)
 * Ejemplo: /peru, /chile, /brasil
 */
export function getCountryLandingMetadata(countrySlug: CountrySlug): Metadata {
  const config = getCountryConfig(countrySlug)
  const data = getCountryData(countrySlug)
  const url = `${BASE_URL}/${countrySlug}`

  // Geo coordinates por país
  const geoData: Record<CountrySlug, { region: string; placename: string; position?: string }> = {
    peru: { region: 'PE-LIM', placename: 'Lima, Peru', position: '-12.046374;-77.042793' },
    chile: { region: 'CL-RM', placename: 'Santiago, Chile', position: '-33.448890;-70.669265' },
    argentina: { region: 'AR-C', placename: 'Buenos Aires, Argentina', position: '-34.603722;-58.381592' },
    colombia: { region: 'CO-DC', placename: 'Bogotá, Colombia', position: '4.710989;-74.072092' },
    brasil: { region: 'BR-SP', placename: 'São Paulo, Brazil', position: '-23.550520;-46.633308' },
  }

  // Construir hreflang alternates para todas las variantes de país
  const languages: Record<string, string> = {
    'x-default': BASE_URL,
    'es-PE': `${BASE_URL}/peru`,
    'es-CL': `${BASE_URL}/chile`,
    'es-AR': `${BASE_URL}/argentina`,
    'es-CO': `${BASE_URL}/colombia`,
    'pt-BR': `${BASE_URL}/brasil`,
  }

  return {
    title: data.seo.landingTitle,
    description: data.seo.landingDescription,
    keywords: data.seo.keywords,

    other: {
      'geo.region': geoData[countrySlug].region,
      'geo.placename': geoData[countrySlug].placename,
      ...(geoData[countrySlug].position && { 'geo.position': geoData[countrySlug].position }),
    },

    alternates: {
      canonical: url,
      languages,
    },

    openGraph: {
      title: data.seo.landingTitle,
      description: data.seo.landingDescription,
      url,
      siteName: 'Bruno Mars LATAM',
      locale: config.locale.replace('-', '_'), // es-PE -> es_PE
      type: 'website',
      images: [
        {
          url: `${BASE_URL}${data.images.og}`,
          width: 1200,
          height: 630,
          alt: `Bruno Mars - The Romantic Tour ${data.name}`,
          type: 'image/jpeg',
        },
      ],
    },

    twitter: {
      card: 'summary_large_image',
      site: '@BrunoMars',
      creator: '@BrunoMars',
      title: data.seo.landingTitle,
      description: data.seo.landingDescription,
      images: {
        url: `${BASE_URL}${data.images.og}`,
        alt: `Bruno Mars - The Romantic Tour ${data.name}`,
      },
    },

    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  }
}

/**
 * Metadata para la página de entradas (venta de tickets)
 * Ejemplo: /peru/entradas, /brasil/ingressos
 */
export function getCountryTicketsMetadata(countrySlug: CountrySlug): Metadata {
  const config = getCountryConfig(countrySlug)
  const data = getCountryData(countrySlug)
  const url = `${BASE_URL}/${countrySlug}/${config.ticketsSlug}`

  // Geo data por país
  const geoData: Record<CountrySlug, { region: string; placename: string }> = {
    peru: { region: 'PE-LIM', placename: 'Lima, Peru' },
    chile: { region: 'CL-RM', placename: 'Santiago, Chile' },
    argentina: { region: 'AR-C', placename: 'Buenos Aires, Argentina' },
    colombia: { region: 'CO-DC', placename: 'Bogotá, Colombia' },
    brasil: { region: 'BR-SP', placename: 'São Paulo, Brazil' },
  }

  // Construir hreflang alternates para páginas de entradas
  const languages: Record<string, string> = {
    'x-default': BASE_URL,
    'es-PE': `${BASE_URL}/peru/entradas`,
    'es-CL': `${BASE_URL}/chile/entradas`,
    'es-AR': `${BASE_URL}/argentina/entradas`,
    'es-CO': `${BASE_URL}/colombia/entradas`,
    'pt-BR': `${BASE_URL}/brasil/ingressos`,
  }

  return {
    title: data.seo.ticketsTitle,
    description: data.seo.ticketsDescription,
    keywords: data.seo.keywords,

    other: {
      'geo.region': geoData[countrySlug].region,
      'geo.placename': geoData[countrySlug].placename,
    },

    alternates: {
      canonical: url,
      languages,
    },

    openGraph: {
      title: data.seo.ticketsTitle,
      description: data.seo.ticketsDescription,
      url,
      siteName: 'Bruno Mars LATAM',
      locale: config.locale.replace('-', '_'),
      type: 'website',
      images: [
        {
          url: `${BASE_URL}${data.images.og}`,
          width: 1200,
          height: 630,
          alt: `${data.seo.ticketsTitle}`,
          type: 'image/jpeg',
        },
      ],
    },

    twitter: {
      card: 'summary_large_image',
      site: '@BrunoMars',
      creator: '@BrunoMars',
      title: data.seo.ticketsTitle,
      description: data.seo.ticketsDescription,
      images: {
        url: `${BASE_URL}${data.images.og}`,
        alt: `${data.seo.ticketsTitle}`,
      },
    },

    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  }
}

/**
 * Metadata para checkout
 * Condicional: noindex si el carrito está vacío
 */
export function getCheckoutMetadata(countrySlug: CountrySlug, hasItems: boolean = false): Metadata {
  const config = getCountryConfig(countrySlug)
  const data = getCountryData(countrySlug)
  const ticketsLabel = config.language === 'pt' ? 'Ingressos' : 'Entradas'
  const checkoutLabel = config.language === 'pt' ? 'Finalização da Compra' : 'Resumen de tu compra'

  const url = `${BASE_URL}/${countrySlug}/${config.ticketsSlug}/checkout`

  return {
    title: `${checkoutLabel} — ${ticketsLabel} Bruno Mars ${data.name}`,
    description: config.language === 'pt'
      ? `Finalize a compra dos seus ingressos para Bruno Mars no Brasil.`
      : `Completa tu compra de entradas para Bruno Mars en ${data.name}.`,

    alternates: {
      canonical: url,
    },

    robots: {
      index: hasItems, // Solo indexar si hay items en el carrito
      follow: true,
    },
  }
}

/**
 * Metadata para blog posts individuales
 */
export function getBlogPostMetadata(params: {
  title: string
  description: string
  slug: string
  publishedDate: string
  modifiedDate?: string
  image?: string
  keywords?: string[]
}): Metadata {
  const { title, description, slug, publishedDate, modifiedDate, image, keywords } = params
  const url = `${BASE_URL}/blog/${slug}`
  const ogImage = image || `${BASE_URL}/images/og/blog-default.jpg`

  return {
    title: `${title} | Blog Bruno Mars LATAM`,
    description,
    keywords,

    alternates: {
      canonical: url,
    },

    openGraph: {
      title,
      description,
      url,
      siteName: 'Bruno Mars LATAM',
      locale: 'es_LA',
      type: 'article',
      publishedTime: publishedDate,
      modifiedTime: modifiedDate || publishedDate,
      authors: ['Bruno Mars LATAM'],
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
          type: 'image/jpeg',
        },
      ],
    },

    twitter: {
      card: 'summary_large_image',
      site: '@BrunoMars',
      creator: '@BrunoMars',
      title,
      description,
      images: {
        url: ogImage,
        alt: title,
      },
    },

    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  }
}

/**
 * Metadata para la página principal del blog
 */
export function getBlogIndexMetadata(): Metadata {
  const url = `${BASE_URL}/blog`

  return {
    title: 'Blog | Bruno Mars LATAM - Noticias y Guías',
    description: 'Últimas noticias, guías y actualizaciones sobre Bruno Mars The Romantic Tour 2027 en Latinoamérica. Todo lo que necesitas saber sobre los conciertos.',
    keywords: ['bruno mars blog', 'noticias bruno mars', 'guía conciertos', 'the romantic tour'],

    alternates: {
      canonical: url,
    },

    openGraph: {
      title: 'Blog | Bruno Mars LATAM',
      description: 'Noticias, guías y actualizaciones sobre Bruno Mars The Romantic Tour 2027 en Latinoamérica',
      url,
      siteName: 'Bruno Mars LATAM',
      locale: 'es_LA',
      type: 'website',
      images: [
        {
          url: `${BASE_URL}/images/og/blog.jpg`,
          width: 1200,
          height: 630,
          alt: 'Blog Bruno Mars LATAM',
          type: 'image/jpeg',
        },
      ],
    },

    twitter: {
      card: 'summary_large_image',
      site: '@BrunoMars',
      creator: '@BrunoMars',
      title: 'Blog | Bruno Mars LATAM',
      description: 'Noticias y guías sobre Bruno Mars The Romantic Tour 2027',
      images: {
        url: `${BASE_URL}/images/og/blog.jpg`,
        alt: 'Blog Bruno Mars LATAM',
      },
    },

    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  }
}

