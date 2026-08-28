/**
 * Setores e preços 100% independentes do Brasil
 * TODO EM PORTUGUÊS
 */

import type { ZonesData } from '../countries/types'

export const brasilZones: ZonesData = {
  countrySlug: 'brasil',
  currency: 'BRL',
  zones: [
    {
      id: 'occidente-1',
      name: 'OCCIDENTE 1',
      price: 1111.20,
      currency: 'BRL',
      category: 'numerada',
      available: true,
      description: 'Vista frontal privilegiada do palco',
    },
    {
      id: 'occidente-2',
      name: 'OCCIDENTE 2',
      price: 906.00,
      currency: 'BRL',
      category: 'numerada',
      available: true,
      description: 'Excelente vista lateral do palco',
    },
    {
      id: 'occidente-3',
      name: 'OCCIDENTE 3',
      price: 675.20,
      currency: 'BRL',
      category: 'numerada',
      available: true,
      description: 'Boa vista do palco',
    },
    {
      id: 'cancha-1-standup',
      name: 'PISTA 1 STAND UP',
      price: 1179.50,
      currency: 'BRL',
      category: 'stand_up',
      available: true,
      description: 'O mais perto do palco, em pé',
    },
    {
      id: 'cancha-2-standup',
      name: 'PISTA 2 STAND UP',
      price: 803.40,
      currency: 'BRL',
      category: 'stand_up',
      available: true,
      description: 'Zona central da pista, em pé',
    },
    {
      id: 'cancha-3-standup',
      name: 'PISTA 3 STAND UP',
      price: 598.30,
      currency: 'BRL',
      category: 'stand_up',
      available: true,
      description: 'Zona posterior da pista, em pé',
    },
    {
      id: 'oriente-1',
      name: 'ORIENTE 1',
      price: 1111.20,
      currency: 'BRL',
      category: 'numerada',
      available: true,
      description: 'Vista frontal privilegiada do palco',
    },
    {
      id: 'oriente-2',
      name: 'ORIENTE 2',
      price: 906.00,
      currency: 'BRL',
      category: 'numerada',
      available: true,
      description: 'Excelente vista lateral do palco',
    },
    {
      id: 'oriente-3',
      name: 'ORIENTE 3',
      price: 675.20,
      currency: 'BRL',
      category: 'numerada',
      available: true,
      description: 'Boa vista do palco',
    },
    {
      id: 'tribuna-norte',
      name: 'TRIBUNA NORTE',
      price: 256.40,
      currency: 'BRL',
      category: 'numerada',
      available: true,
      description: 'Vista geral do estádio',
    },
  ],
}
