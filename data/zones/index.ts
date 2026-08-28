/**
 * Índice central de zonas por país
 * Cada país tiene su propio archivo de zonas independiente
 */

import { peruZones } from './peru.zones'
import { chileZones } from './chile.zones'
import { argentinaZones } from './argentina.zones'
import { colombiaZones } from './colombia.zones'
import { brasilZones } from './brasil.zones'
import type { ZonesData } from '../countries/types'
import type { CountrySlug } from '../countries.config'

export const ZONES_DATA: Record<CountrySlug, ZonesData> = {
  peru: peruZones,
  chile: chileZones,
  argentina: argentinaZones,
  colombia: colombiaZones,
  brasil: brasilZones,
}

/**
 * Obtiene las zonas y precios de un país por slug
 */
export function getCountryZones(slug: CountrySlug): ZonesData {
  return ZONES_DATA[slug]
}

/**
 * Obtiene el rango de precios de un país (mínimo y máximo)
 */
export function getPriceRange(slug: CountrySlug): { min: number; max: number; currency: string } {
  const zonesData = ZONES_DATA[slug]
  const prices = zonesData.zones.map((z) => z.price)
  return {
    min: Math.min(...prices),
    max: Math.max(...prices),
    currency: zonesData.currency,
  }
}
