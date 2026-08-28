/**
 * Configuración de grupos de WhatsApp por país
 */

import type { CountrySlug } from './countries.config'

export const WHATSAPP_GROUPS: Record<CountrySlug, string> = {
  peru: 'https://chat.whatsapp.com/JJ1UsJddCcuKJMho1l6mau',
  chile: 'https://chat.whatsapp.com/Ku57tClqYi98jOEHVLgbXZ',
  argentina: 'https://chat.whatsapp.com/HsRE3Iw4K8tJaJO0w3fovp',
  colombia: 'https://chat.whatsapp.com/Ebyp5j4Tcm0AhknIpoA8Sh',
  brasil: 'https://chat.whatsapp.com/Isc5FaiAzUMJwlV4dHZwQx',
}

export function getWhatsAppGroupUrl(countrySlug: CountrySlug): string {
  return WHATSAPP_GROUPS[countrySlug]
}
