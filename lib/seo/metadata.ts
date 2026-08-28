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
        },
      ],
    },

    twitter: {
      card: 'summary_large_image',
      title: 'Bruno Mars en LATAM 2027 | The Romantic Tour',
      description: 'Bruno Mars llega a Latinoamérica con The Romantic Tour 2027. Conciertos en Perú, Chile, Argentina, Colombia y Brasil.',
      images: [`${BASE_URL}/images/og/home.jpg`],
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
        },
      ],
    },

    twitter: {
      card: 'summary_large_image',
      title: data.seo.landingTitle,
      description: data.seo.landingDescription,
      images: [`${BASE_URL}${data.images.og}`],
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
        },
      ],
    },

    twitter: {
      card: 'summary_large_image',
      title: data.seo.ticketsTitle,
      description: data.seo.ticketsDescription,
      images: [`${BASE_URL}${data.images.og}`],
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
