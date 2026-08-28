/**
 * Índice central de datos de países
 * Exporta los datos de cada país de forma independiente
 */

import { peruData } from './peru'
import { chileData } from './chile'
import { argentinaData } from './argentina'
import { colombiaData } from './colombia'
import { brasilData } from './brasil'
import type { CountryData } from './types'
import type { CountrySlug } from '../countries.config'

export const COUNTRY_DATA: Record<CountrySlug, CountryData> = {
  peru: peruData,
  chile: chileData,
  argentina: argentinaData,
  colombia: colombiaData,
  brasil: brasilData,
}

/**
 * Obtiene los datos de un país por slug
 */
export function getCountryData(slug: CountrySlug): CountryData {
  return COUNTRY_DATA[slug]
}

// Re-exportar tipos
export * from './types'
