/**
 * Configuración de grupos de WhatsApp por país
 */

import type { CountrySlug } from './countries.config'

export const WHATSAPP_GROUPS: Record<CountrySlug, string> = {
  peru: 'https://chat.whatsapp.com/EFmFkmSxX3c3NvB6nWxoHH',
  chile: 'https://chat.whatsapp.com/In4ttT9d9qa8DGo7neWW0D',
  argentina: 'https://chat.whatsapp.com/GZpppHkAQ0UL4ltIfVgrlD',
  colombia: 'https://chat.whatsapp.com/DI3CQQwlSHjFEhBeyR8Ior',
  brasil: 'https://chat.whatsapp.com/H47iywDGxZR3euHBljzo7k',
}

export function getWhatsAppGroupUrl(countrySlug: CountrySlug): string {
  return WHATSAPP_GROUPS[countrySlug]
}
