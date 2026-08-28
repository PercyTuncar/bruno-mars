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

