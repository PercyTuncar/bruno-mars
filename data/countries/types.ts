/**
 * Tipos TypeScript para los datos de países y zonas
 */

import type { CountrySlug, Currency } from '../countries.config'

export interface CountryDate {
  date: string // ISO format: '2027-09-03'
  time: string // '21:00'
  timezone: string // 'America/Lima'
  dateDisplay: string // '3 de setiembre de 2027'
}

export interface VenueAddress {
  streetAddress: string
  city: string
  region: string
  postalCode: string
  country: string // ISO code: 'PE', 'CL', etc.
}

export interface Venue {
  name: string
  address: VenueAddress
  capacity: number
}

export interface CountrySEO {
  landingTitle: string
  landingDescription: string
  ticketsTitle: string
  ticketsDescription: string
  keywords: string[]
}

export interface FAQ {
  question: string
  answer: string
}

export interface CountryContent {
  hero: {
    title: string
    subtitle: string
    description: string
  }
  about: {
    title: string
    paragraphs: string[]
  }
}

export interface CountryImages {
  hero: string
  og: string
  venue: string
}

export interface CountryData {
  slug: CountrySlug
  name: string
  dates: CountryDate[]
  venue: Venue
  seo: CountrySEO
  faqs: FAQ[]
  content: CountryContent
  images: CountryImages
  offersValidFrom: string // ISO datetime with timezone
}

// Tipos para zonas
export type ZoneCategory = 'stand_up' | 'numerada'

export interface Zone {
  id: string // 'occidente-1', 'cancha-1-standup', etc.
  name: string // 'OCCIDENTE 1', 'CANCHA 1 STAND UP'
  price: number // Precio en moneda local
  currency: Currency
  category: ZoneCategory
  available: boolean
  description?: string
}

export interface ZonesData {
  countrySlug: CountrySlug
  currency: Currency
  zones: Zone[]
}
