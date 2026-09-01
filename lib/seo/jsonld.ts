/**
 * Builders de JSON-LD (Schema.org structured data)
 * Genera datos estructurados válidos según Google Search Central
 */

import type { CountrySlug } from '@/data/countries.config'
import { getCountryData, getTimezoneOffset } from '@/data/countries'
import { getCountryZones } from '@/data/zones'
import { getCountryConfig } from '@/data/countries.config'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://brunomars.lat'

/**
 * JSON-LD de Organization (para el layout raíz)
 */
export function buildOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'brunomars.lat',
    url: BASE_URL,
    logo: `${BASE_URL}/images/logo.png`,
    sameAs: [
      // Agregar redes sociales oficiales si existen
    ],
  }
}

/**
 * JSON-LD de MusicEvent para la página de país (informativa)
 * Usa AggregateOffer con rango de precios
 * Cumple con todas las propiedades requeridas y recomendadas de Google (2026)
 */
export function buildCountryEventSchema(countrySlug: CountrySlug) {
  const data = getCountryData(countrySlug)
  const config = getCountryConfig(countrySlug)
  const zones = getCountryZones(countrySlug)

  const prices = zones.zones.map(z => z.price)
  const minPrice = Math.min(...prices)
  const maxPrice = Math.max(...prices)

  // Construir un MusicEvent por cada fecha
  const events = data.dates.map((dateInfo, index) => ({
    '@type': 'MusicEvent',
    '@id': `${BASE_URL}/${countrySlug}#evento-${index + 1}`,
    name: `Bruno Mars - The Romantic Tour ${data.name}`,
    description: data.content.hero.description,
    startDate: `${dateInfo.date}T${dateInfo.time}:00${getTimezoneOffset(dateInfo.timezone)}`,
    endDate: `${dateInfo.date}T22:30:00${getTimezoneOffset(dateInfo.timezone)}`,
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    eventStatus: 'https://schema.org/EventScheduled',
    image: [
      `${BASE_URL}${data.images.hero}`,
      `${BASE_URL}${data.images.og}`,
      `${BASE_URL}${data.images.venue}`,
    ],
    location: {
      '@type': 'Place',
      name: data.venue.name,
      address: {
        '@type': 'PostalAddress',
        streetAddress: data.venue.address.streetAddress,
        addressLocality: data.venue.address.city,
        addressRegion: data.venue.address.region,
        postalCode: data.venue.address.postalCode,
        addressCountry: data.venue.address.country,
      },
      maximumAttendeeCapacity: data.venue.capacity,
    },
    performer: {
      '@type': 'MusicGroup',
      name: 'Bruno Mars',
      sameAs: [
        'https://www.wikidata.org/wiki/Q1450',
        'https://en.wikipedia.org/wiki/Bruno_Mars',
        'https://www.instagram.com/brunomars/',
        'https://www.facebook.com/brunomars',
      ],
    },
    organizer: {
      '@type': 'Organization',
      name: 'brunomars.lat',
      url: BASE_URL,
    },
    offers: {
      '@type': 'AggregateOffer',
      url: `${BASE_URL}/${countrySlug}/${config.ticketsSlug}`,
      priceCurrency: zones.currency,
      lowPrice: minPrice.toFixed(2),
      highPrice: maxPrice.toFixed(2),
      offerCount: zones.zones.length,
      availability: 'https://schema.org/InStock',
      validFrom: data.offersValidFrom,
    },
    typicalAgeRange: '13+',
    inLanguage: config.language === 'pt' ? 'pt-BR' : 'es',
  }))

  return {
    '@context': 'https://schema.org',
    '@graph': events,
  }
}

/**
 * JSON-LD de MusicEvent + Offer[] para la página de entradas (venta)
 * Un Offer por cada zona, con precio específico
 * Cumple con todas las propiedades requeridas y recomendadas de Google (2026)
 */
export function buildTicketsEventSchema(countrySlug: CountrySlug) {
  const data = getCountryData(countrySlug)
  const config = getCountryConfig(countrySlug)
  const zones = getCountryZones(countrySlug)

  // Crear un Offer por cada zona
  const offers = zones.zones.map((zone) => ({
    '@type': 'Offer',
    name: zone.name,
    url: `${BASE_URL}/${countrySlug}/${config.ticketsSlug}#${zone.id}`,
    price: zone.price.toFixed(2),
    priceCurrency: zone.currency,
    availability: zone.available ? 'https://schema.org/InStock' : 'https://schema.org/SoldOut',
    validFrom: data.offersValidFrom,
  }))

  const event = {
    '@type': 'MusicEvent',
    '@id': `${BASE_URL}/${countrySlug}/${config.ticketsSlug}#evento`,
    name: `Bruno Mars - The Romantic Tour ${data.name}`,
    description: data.content.hero.description,
    startDate: `${data.dates[0].date}T${data.dates[0].time}:00${getTimezoneOffset(data.dates[0].timezone)}`,
    endDate: `${data.dates[0].date}T22:30:00${getTimezoneOffset(data.dates[0].timezone)}`,
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    eventStatus: 'https://schema.org/EventScheduled',
    image: [
      `${BASE_URL}${data.images.hero}`,
      `${BASE_URL}${data.images.og}`,
      `${BASE_URL}${data.images.venue}`,
    ],
    location: {
      '@type': 'Place',
      name: data.venue.name,
      address: {
        '@type': 'PostalAddress',
        streetAddress: data.venue.address.streetAddress,
        addressLocality: data.venue.address.city,
        addressRegion: data.venue.address.region,
        postalCode: data.venue.address.postalCode,
        addressCountry: data.venue.address.country,
      },
      maximumAttendeeCapacity: data.venue.capacity,
    },
    performer: {
      '@type': 'MusicGroup',
      name: 'Bruno Mars',
      sameAs: [
        'https://www.wikidata.org/wiki/Q1450',
        'https://en.wikipedia.org/wiki/Bruno_Mars',
        'https://www.instagram.com/brunomars/',
        'https://www.facebook.com/brunomars',
      ],
    },
    organizer: {
      '@type': 'Organization',
      name: 'brunomars.lat',
      url: BASE_URL,
    },
    offers,
    typicalAgeRange: '13+',
    inLanguage: config.language === 'pt' ? 'pt-BR' : 'es',
  }

  return {
    '@context': 'https://schema.org',
    '@graph': [event],
  }
}

/**
 * JSON-LD de FAQPage para la sección de preguntas frecuentes
 */
export function buildFAQSchema(countrySlug: CountrySlug) {
  const data = getCountryData(countrySlug)

  // Si no hay FAQs, retornar null
  if (!data.faqs || data.faqs.length === 0) {
    return null
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: data.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

/**
 * JSON-LD de BreadcrumbList
 */
export function buildBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

/**
 * JSON-LD de ItemList para la Home (listado de eventos)
 */
export function buildHomeEventsListSchema() {
  const countries: CountrySlug[] = ['peru', 'chile', 'argentina', 'colombia', 'brasil']

  const events = countries.map((slug) => {
    const data = getCountryData(slug)
    return {
      '@type': 'MusicEvent',
      name: `Bruno Mars - The Romantic Tour (${data.name})`,
      url: `${BASE_URL}/${slug}`,
      startDate: `${data.dates[0].date}T${data.dates[0].time}:00${getTimezoneOffset(data.dates[0].timezone)}`,
      location: {
        '@type': 'Place',
        name: data.venue.name,
        address: {
          '@type': 'PostalAddress',
          addressLocality: data.venue.address.city,
          addressCountry: data.venue.address.country,
        },
      },
    }
  })

  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: events.map((event, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: event,
    })),
  }
}

/**
 * JSON-LD de Blog para la página index del blog
 */
export function buildBlogSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Blog - Bruno Mars LATAM',
    description: 'Noticias, guías y actualizaciones sobre Bruno Mars The Romantic Tour 2027 en Latinoamérica',
    url: `${BASE_URL}/blog`,
    publisher: {
      '@type': 'Organization',
      name: 'brunomars.lat',
      logo: {
        '@type': 'ImageObject',
        url: `${BASE_URL}/images/logo.png`,
      },
    },
  }
}

/**
 * JSON-LD ItemList para listados
 */
export function buildItemListSchema(items: Array<{ position: number; name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: items.map((item) => ({
      '@type': 'ListItem',
      position: item.position,
      name: item.name,
      url: item.url,
    })),
  }
}

/**
 * JSON-LD de WebSite con SearchAction para búsqueda
 * Permite que Google muestre un search box en los resultados
 */
export function buildWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Bruno Mars LATAM',
    url: BASE_URL,
    description: 'Entradas oficiales para Bruno Mars The Romantic Tour 2027 en Latinoamérica',
    inLanguage: ['es', 'pt-BR'],
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${BASE_URL}/blog?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }
}

/**
 * JSON-LD de Person para Bruno Mars
 * Establece autoridad y E-E-A-T
 */
export function buildPersonSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': 'https://www.wikidata.org/wiki/Q1450',
    name: 'Bruno Mars',
    alternateName: 'Peter Gene Hernandez',
    jobTitle: 'Singer, Songwriter, Record Producer',
    url: 'https://www.brunomars.com',
    image: 'https://www.brunomars.com/sites/g/files/g2000021861/files/2026-04/romtr_hdr.png',
    sameAs: [
      'https://www.wikidata.org/wiki/Q1450',
      'https://en.wikipedia.org/wiki/Bruno_Mars',
      'https://www.instagram.com/brunomars/',
      'https://www.facebook.com/brunomars',
      'https://twitter.com/BrunoMars',
      'https://www.youtube.com/user/brunomars',
      'https://open.spotify.com/artist/0du5cEVh5yTK9QJze8zA0C',
    ],
    description: 'Grammy Award-winning singer, songwriter, and record producer known for hits like "Just the Way You Are", "Uptown Funk", and "24K Magic"',
    awards: [
      '15 Grammy Awards',
      '11 American Music Awards',
      '4 Brit Awards',
      'Diamond certifications',
    ],
  }
}

/**
 * JSON-LD de Article para posts del blog
 */
export function buildArticleSchema(params: {
  title: string
  description: string
  slug: string
  publishedDate: string
  modifiedDate?: string
  author?: string
  image?: string
  readingTime?: number
}) {
  const {
    title,
    description,
    slug,
    publishedDate,
    modifiedDate,
    author = 'Bruno Mars LATAM',
    image = `${BASE_URL}/images/og/blog-default.jpg`,
    readingTime,
  } = params

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    url: `${BASE_URL}/blog/${slug}`,
    datePublished: publishedDate,
    dateModified: modifiedDate || publishedDate,
    image: {
      '@type': 'ImageObject',
      url: image,
      width: 1200,
      height: 630,
    },
    author: {
      '@type': 'Organization',
      name: author,
      url: BASE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Bruno Mars LATAM',
      url: BASE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${BASE_URL}/images/logo.png`,
        width: 512,
        height: 512,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${BASE_URL}/blog/${slug}`,
    },
    ...(readingTime && {
      timeRequired: `PT${readingTime}M`,
    }),
  }
}

/**
 * JSON-LD de ImageObject para imágenes principales
 */
export function buildImageObjectSchema(params: {
  url: string
  width: number
  height: number
  caption?: string
  description?: string
}) {
  const { url, width, height, caption, description } = params

  return {
    '@context': 'https://schema.org',
    '@type': 'ImageObject',
    contentUrl: url,
    url,
    width,
    height,
    ...(caption && { caption }),
    ...(description && { description }),
    encodingFormat: url.endsWith('.jpg') || url.endsWith('.jpeg') ? 'image/jpeg' : url.endsWith('.png') ? 'image/png' : 'image/webp',
  }
}

/**
 * JSON-LD de AggregateRating (para cuando tengamos reviews)
 */
export function buildAggregateRatingSchema(params: {
  ratingValue: number
  reviewCount: number
  bestRating?: number
  worstRating?: number
}) {
  const { ratingValue, reviewCount, bestRating = 5, worstRating = 1 } = params

  return {
    '@context': 'https://schema.org',
    '@type': 'AggregateRating',
    ratingValue: ratingValue.toFixed(1),
    reviewCount,
    bestRating,
    worstRating,
  }
}

