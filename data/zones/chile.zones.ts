/**
 * Zonas y precios 100% independientes de Chile
 * Cambios aquí NO afectan a otros países
 */

import type { ZonesData } from '../countries/types'

export const chileZones: ZonesData = {
  countrySlug: 'chile',
  currency: 'CLP',
  zones: [
    {
      id: 'occidente-1',
      name: 'OCCIDENTE 1',
      price: 191900,
      currency: 'CLP',
      category: 'numerada',
      available: true,
      description: 'Vista frontal privilegiada del escenario',
    },
    {
      id: 'occidente-2',
      name: 'OCCIDENTE 2',
      price: 156500,
      currency: 'CLP',
      category: 'numerada',
      available: true,
      description: 'Excelente vista lateral del escenario',
    },
    {
      id: 'occidente-3',
      name: 'OCCIDENTE 3',
      price: 116600,
      currency: 'CLP',
      category: 'numerada',
      available: true,
      description: 'Buena vista del escenario',
    },
    {
      id: 'cancha-1-standup',
      name: 'CANCHA 1 STAND UP',
      price: 203700,
      currency: 'CLP',
      category: 'stand_up',
      available: true,
      description: 'Lo más cerca del escenario, de pie',
    },
    {
      id: 'cancha-2-standup',
      name: 'CANCHA 2 STAND UP',
      price: 138800,
      currency: 'CLP',
      category: 'stand_up',
      available: true,
      description: 'Zona central de cancha, de pie',
    },
    {
      id: 'cancha-3-standup',
      name: 'CANCHA 3 STAND UP',
      price: 103300,
      currency: 'CLP',
      category: 'stand_up',
      available: true,
      description: 'Zona posterior de cancha, de pie',
    },
    {
      id: 'oriente-1',
      name: 'ORIENTE 1',
      price: 191900,
      currency: 'CLP',
      category: 'numerada',
      available: true,
      description: 'Vista frontal privilegiada del escenario',
    },
    {
      id: 'oriente-2',
      name: 'ORIENTE 2',
      price: 156500,
      currency: 'CLP',
      category: 'numerada',
      available: true,
      description: 'Excelente vista lateral del escenario',
    },
    {
      id: 'oriente-3',
      name: 'ORIENTE 3',
      price: 116600,
      currency: 'CLP',
      category: 'numerada',
      available: true,
      description: 'Buena vista del escenario',
    },
    {
      id: 'tribuna-norte',
      name: 'TRIBUNA NORTE',
      price: 44300,
      currency: 'CLP',
      category: 'numerada',
      available: true,
      description: 'Vista general del estadio',
    },
  ],
}
