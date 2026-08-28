/**
 * Configuración central de países soportados
 * Solo contiene enrutamiento, idioma, moneda y mapeo hreflang
 * NO contiene precios, textos SEO ni zonas (eso vive en archivos separados por país)
 */

export type CountrySlug = 'peru' | 'chile' | 'argentina' | 'colombia' | 'brasil'

export type Currency = 'PEN' | 'CLP' | 'ARS' | 'COP' | 'BRL'

export interface CountryConfig {
  slug: CountrySlug
  name: string
  language: 'es' | 'pt'
  locale: string // es-PE, es-CL, pt-BR, etc.
  currency: Currency
  ticketsSlug: string // 'entradas' para español, 'ingressos' para portugués
  hreflangCode: string // es-PE, es-CL, es-AR, es-CO, pt-BR
}

export const COUNTRIES: Record<CountrySlug, CountryConfig> = {
  peru: {
    slug: 'peru',
    name: 'Perú',
    language: 'es',
    locale: 'es-PE',
    currency: 'PEN',
    ticketsSlug: 'entradas',
    hreflangCode: 'es-PE',
  },
  chile: {
    slug: 'chile',
    name: 'Chile',
    language: 'es',
    locale: 'es-CL',
    currency: 'CLP',
    ticketsSlug: 'entradas',
    hreflangCode: 'es-CL',
  },
  argentina: {
    slug: 'argentina',
    name: 'Argentina',
    language: 'es',
    locale: 'es-AR',
    currency: 'ARS',
    ticketsSlug: 'entradas',
    hreflangCode: 'es-AR',
  },
  colombia: {
    slug: 'colombia',
    name: 'Colombia',
    language: 'es',
    locale: 'es-CO',
    currency: 'COP',
    ticketsSlug: 'entradas',
    hreflangCode: 'es-CO',
  },
  brasil: {
    slug: 'brasil',
    name: 'Brasil',
    language: 'pt',
    locale: 'pt-BR',
    currency: 'BRL',
    ticketsSlug: 'ingressos',
    hreflangCode: 'pt-BR',
  },
}

export const COUNTRY_SLUGS = Object.keys(COUNTRIES) as CountrySlug[]

/**
 * Valida si un slug es un país soportado
 */
export function isValidCountry(slug: string): slug is CountrySlug {
  return COUNTRY_SLUGS.includes(slug as CountrySlug)
}

/**
 * Obtiene la configuración de un país por slug
 */
export function getCountryConfig(slug: CountrySlug): CountryConfig {
  return COUNTRIES[slug]
}

/**
 * Genera el mapa de hreflang para una página específica
 * Devuelve todas las variantes de idioma/país + x-default
 */
export function getHreflangMap(
  baseUrl: string,
  currentPath: string
): Record<string, string> {
  const map: Record<string, string> = {}

  // Agregar x-default apuntando a la home
  map['x-default'] = baseUrl

  // Agregar cada país
  COUNTRY_SLUGS.forEach((slug) => {
    const config = COUNTRIES[slug]

    // Para landing de país
    if (currentPath === `/${slug}`) {
      map[config.hreflangCode] = `${baseUrl}/${slug}`
    }

    // Para página de entradas
    if (currentPath.includes('/entradas') || currentPath.includes('/ingressos')) {
      map[config.hreflangCode] = `${baseUrl}/${slug}/${config.ticketsSlug}`
    }
  })

  return map
}
