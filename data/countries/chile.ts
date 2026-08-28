/**
 * Datos 100% independientes de Chile
 * Cambios aquí NO afectan a otros países
 */

import type { CountryData } from './types'

export const chileData: CountryData = {
  slug: 'chile',
  name: 'Chile',

  // Fechas del concierto
  dates: [
    {
      date: '2027-09-10',
      time: '21:00',
      timezone: 'America/Santiago',
      dateDisplay: '10 de septiembre de 2027',
    },
    {
      date: '2027-09-11',
      time: '21:00',
      timezone: 'America/Santiago',
      dateDisplay: '11 de septiembre de 2027',
    },
  ],

  // Información del venue
  venue: {
    name: 'Estadio Nacional Julio Martínez Prádanos',
    address: {
      streetAddress: 'Av. Grecia 2001',
      city: 'Ñuñoa',
      region: 'Santiago',
      postalCode: '7750000',
      country: 'CL',
    },
    capacity: 48000,
  },

  // Metadatos SEO únicos para Chile
  seo: {
    landingTitle: 'Bruno Mars en Chile',
    landingDescription: 'Bruno Mars llega a Chile con The Romantic Tour. Conciertos confirmados el 10 y 11 de septiembre de 2027 en el Estadio Nacional, Santiago. Consulta fechas, zonas y compra tus entradas oficiales.',
    ticketsTitle: 'Entradas Bruno Mars Chile',
    ticketsDescription: 'Compra tus entradas oficiales para Bruno Mars en Chile. The Romantic Tour, 10 y 11 de septiembre de 2027, Estadio Nacional. Elige tu zona: Occidente, Oriente, Cancha o Tribuna Norte.',
    keywords: ['bruno mars chile', 'entradas bruno mars santiago', 'concierto bruno mars 2027', 'estadio nacional chile', 'the romantic tour chile'],
  },

  // Preguntas frecuentes únicas por país
  faqs: [
    {
      question: '¿Dónde se realizará el concierto de Bruno Mars en Chile?',
      answer: 'El concierto se realizará en el Estadio Nacional Julio Martínez Prádanos, ubicado en Av. Grecia 2001, Ñuñoa, Santiago.',
    },
    {
      question: '¿Cuáles son las fechas confirmadas?',
      answer: 'Bruno Mars se presentará el 10 y 11 de septiembre de 2027, ambas fechas a las 21:00 horas.',
    },
    {
      question: '¿Cuál es la edad mínima para ingresar?',
      answer: 'El evento es para todo público. Menores de 10 años deben ingresar acompañados de un adulto responsable.',
    },
    {
      question: '¿Qué métodos de pago están disponibles?',
      answer: 'Aceptamos tarjetas de crédito y débito chilenas (Visa, Mastercard, Redcompra), transferencias bancarias y pagos en puntos autorizados.',
    },
    {
      question: '¿Las entradas son reembolsables?',
      answer: 'Las entradas solo son reembolsables en caso de cancelación del evento. Los cambios están sujetos a disponibilidad y cargo administrativo.',
    },
  ],

  // Contenido único del país
  content: {
    hero: {
      title: 'Bruno Mars en Chile',
      subtitle: 'The Romantic Tour 2027',
      description: 'El ícono del pop regresa a Santiago con el show más esperado del año.',
    },
    about: {
      title: 'Sobre el concierto en Chile',
      paragraphs: [
        'Bruno Mars vuelve a Chile con The Romantic Tour, una producción espectacular que recorre sus mayores éxitos. El Estadio Nacional será el escenario de dos noches memorables que reunirán a miles de fanáticos.',
        'Reconocido mundialmente por su voz única y su energía en el escenario, Bruno Mars ha vendido más de 200 millones de discos y ganado 15 premios Grammy. Este tour promete ser su producción más ambiciosa hasta la fecha.',
        'El Estadio Nacional de Chile, con su capacidad para 48.000 personas, ofrece una acústica excepcional y ha sido sede de los conciertos más importantes del país. Todas las zonas están diseñadas para garantizar una experiencia inolvidable.',
      ],
    },
  },

  // Imágenes específicas del país
  images: {
    hero: '/images/countries/chile/hero.jpg',
    og: '/images/countries/chile/og.jpg',
    venue: '/images/countries/chile/venue.jpg',
  },

  // Validez de las ofertas
  offersValidFrom: '2026-09-01T10:00:00-04:00',
}
