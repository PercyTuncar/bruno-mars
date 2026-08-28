/**
 * Zonas y precios 100% independientes de Perú
 * Cambios aquí NO afectan a otros países
 */

import type { ZonesData } from '../countries/types'

export const peruZones: ZonesData = {
  countrySlug: 'peru',
  currency: 'PEN',
  zones: [
    {
      id: 'occidente-1',
      name: 'OCCIDENTE 1',
      price: 747.50,
      currency: 'PEN',
      category: 'numerada',
      available: true,
      description: 'Vista frontal privilegiada del escenario',
    },
    {
      id: 'occidente-2',
      name: 'OCCIDENTE 2',
      price: 609.50,
      currency: 'PEN',
      category: 'numerada',
      available: true,
      description: 'Excelente vista lateral del escenario',
    },
    {
      id: 'occidente-3',
      name: 'OCCIDENTE 3',
      price: 454.25,
      currency: 'PEN',
      category: 'numerada',
      available: true,
      description: 'Buena vista del escenario',
    },
    {
      id: 'cancha-1-standup',
      name: 'CANCHA 1 STAND UP',
      price: 793.50,
      currency: 'PEN',
      category: 'stand_up',
      available: true,
      description: 'Lo más cerca del escenario, de pie',
    },
    {
      id: 'cancha-2-standup',
      name: 'CANCHA 2 STAND UP',
      price: 540.50,
      currency: 'PEN',
      category: 'stand_up',
      available: true,
      description: 'Zona central de cancha, de pie',
    },
    {
      id: 'cancha-3-standup',
      name: 'CANCHA 3 STAND UP',
      price: 402.50,
      currency: 'PEN',
      category: 'stand_up',
      available: true,
      description: 'Zona posterior de cancha, de pie',
    },
    {
      id: 'oriente-1',
      name: 'ORIENTE 1',
      price: 747.50,
      currency: 'PEN',
      category: 'numerada',
      available: true,
      description: 'Vista frontal privilegiada del escenario',
    },
    {
      id: 'oriente-2',
      name: 'ORIENTE 2',
      price: 609.50,
      currency: 'PEN',
      category: 'numerada',
      available: true,
      description: 'Excelente vista lateral del escenario',
    },
    {
      id: 'oriente-3',
      name: 'ORIENTE 3',
      price: 454.25,
      currency: 'PEN',
      category: 'numerada',
      available: true,
      description: 'Buena vista del escenario',
    },
    {
      id: 'tribuna-norte',
      name: 'TRIBUNA NORTE',
      price: 172.50,
      currency: 'PEN',
      category: 'numerada',
      available: true,
      description: 'Vista general del estadio',
    },
  ],
}
