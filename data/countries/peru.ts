/**
 * Datos 100% independientes de Perú
 * Cambios aquí NO afectan a otros países
 */

import type { CountryData } from './types'

export const peruData: CountryData = {
  slug: 'peru',
  name: 'Perú',

  // Fechas del concierto
  dates: [
    {
      date: '2027-09-03',
      time: '21:00',
      timezone: 'America/Lima',
      dateDisplay: '3 de setiembre de 2027',
    },
    {
      date: '2027-09-04',
      time: '21:00',
      timezone: 'America/Lima',
      dateDisplay: '4 de setiembre de 2027',
    },
  ],

  // Información del venue
  venue: {
    name: 'Estadio Nacional de Lima',
    address: {
      streetAddress: 'Paseo de la República s/n',
      city: 'Lima',
      region: 'Lima',
      postalCode: '15046',
      country: 'PE',
    },
    capacity: 40000,
  },

  // Metadatos SEO únicos para Perú
  seo: {
    landingTitle: 'Bruno Mars en Perú',
    landingDescription: 'Bruno Mars llega a Perú con The Romantic Tour. Conciertos confirmados el 3 y 4 de setiembre de 2027 en el Estadio Nacional, Lima. Consulta fechas, zonas y compra tus entradas oficiales.',
    ticketsTitle: 'Entradas Bruno Mars Perú',
    ticketsDescription: 'Compra tus entradas oficiales para Bruno Mars en Perú. The Romantic Tour, 3 y 4 de setiembre de 2027, Estadio Nacional. Elige tu zona: Occidente, Oriente, Cancha o Tribuna Norte.',
    keywords: ['bruno mars perú', 'entradas bruno mars lima', 'concierto bruno mars 2027', 'estadio nacional lima', 'the romantic tour perú'],
  },

  // Preguntas frecuentes únicas por país
  faqs: [
    {
      question: '¿Dónde se realizará el concierto de Bruno Mars en Perú?',
      answer: 'El concierto se realizará en el Estadio Nacional de Lima, ubicado en el Paseo de la República s/n, Lima.',
    },
    {
      question: '¿Cuáles son las fechas confirmadas?',
      answer: 'Bruno Mars se presentará el 3 y 4 de setiembre de 2027, ambas fechas a las 21:00 horas.',
    },
    {
      question: '¿Cuál es la edad mínima para ingresar?',
      answer: 'El evento es apto para todo público. Menores de 12 años deben ingresar acompañados de un adulto responsable.',
    },
    {
      question: '¿Qué métodos de pago están disponibles?',
      answer: 'Aceptamos tarjetas de crédito y débito (Visa, Mastercard), transferencias bancarias y pagos en efectivo en puntos autorizados.',
    },
    {
      question: '¿Puedo cambiar o devolver mi entrada?',
      answer: 'Las entradas no son reembolsables excepto en caso de cancelación del evento. Los cambios de zona están sujetos a disponibilidad.',
    },
  ],

  // Contenido único del país
  content: {
    hero: {
      title: 'Bruno Mars en Perú',
      subtitle: 'The Romantic Tour 2027',
      description: 'El artista más romántico de nuestra era llega a Lima con un espectáculo inolvidable.',
    },
    about: {
      title: 'Sobre el concierto en Perú',
      paragraphs: [
        'Bruno Mars regresa a Lima después de 5 años con The Romantic Tour, su gira más ambiciosa hasta la fecha. El Estadio Nacional será testigo de dos noches mágicas donde el artista interpretará sus mayores éxitos.',
        'Con más de 15 premios Grammy y éxitos que marcaron una generación como "Just The Way You Are", "Uptown Funk" y "Leave The Door Open", Bruno Mars promete un show lleno de energía, romance y música de clase mundial.',
        'El Estadio Nacional de Lima ha sido elegido por su capacidad y excelente acústica, garantizando una experiencia única para todos los asistentes. Las zonas han sido diseñadas para ofrecer diferentes experiencias visuales y de sonido.',
      ],
    },
  },

  // Imágenes específicas del país
  images: {
    hero: '/images/countries/peru/hero.jpg',
    og: '/images/countries/peru/og.jpg',
    venue: '/images/countries/peru/venue.jpg',
  },

  // Validez de las ofertas
  offersValidFrom: '2026-09-01T10:00:00-05:00',
}
