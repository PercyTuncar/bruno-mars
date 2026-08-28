/**
 * Datos 100% independientes de Argentina
 */

import type { CountryData } from './types'

export const argentinaData: CountryData = {
  slug: 'argentina',
  name: 'Argentina',
  dates: [
    {
      date: '2027-09-17',
      time: '21:00',
      timezone: 'America/Argentina/Buenos_Aires',
      dateDisplay: '17 de septiembre de 2027',
    },
    {
      date: '2027-09-18',
      time: '21:00',
      timezone: 'America/Argentina/Buenos_Aires',
      dateDisplay: '18 de septiembre de 2027',
    },
  ],
  venue: {
    name: 'Estadio Monumental de River Plate',
    address: {
      streetAddress: 'Av. Pres. Figueroa Alcorta 7597',
      city: 'Buenos Aires',
      region: 'CABA',
      postalCode: 'C1428',
      country: 'AR',
    },
    capacity: 70000,
  },
  seo: {
    landingTitle: 'Bruno Mars en Argentina',
    landingDescription: 'Bruno Mars llega a Argentina con The Romantic Tour. Conciertos confirmados el 17 y 18 de septiembre de 2027 en el Estadio Monumental. Consulta fechas, zonas y comprá tus entradas oficiales.',
    ticketsTitle: 'Entradas Bruno Mars Argentina',
    ticketsDescription: 'Comprá tus entradas oficiales para Bruno Mars en Argentina. The Romantic Tour, 17 y 18 de septiembre de 2027, Estadio Monumental. Elegí tu zona: Occidente, Oriente, Cancha o Tribuna Norte.',
    keywords: ['bruno mars argentina', 'entradas bruno mars buenos aires', 'concierto bruno mars 2027', 'estadio monumental', 'the romantic tour argentina'],
  },
  faqs: [
    {
      question: '¿Dónde se realizará el concierto de Bruno Mars en Argentina?',
      answer: 'El concierto se realizará en el Estadio Monumental de River Plate, ubicado en Av. Pres. Figueroa Alcorta 7597, Buenos Aires.',
    },
    {
      question: '¿Cuáles son las fechas confirmadas?',
      answer: 'Bruno Mars se presentará el 17 y 18 de septiembre de 2027, ambas fechas a las 21:00 horas.',
    },
    {
      question: '¿Cuál es la edad mínima para ingresar?',
      answer: 'El evento es apto para todo público. Menores de 12 años deben ingresar acompañados de un adulto responsable.',
    },
    {
      question: '¿Qué métodos de pago están disponibles?',
      answer: 'Aceptamos tarjetas de crédito y débito (Visa, Mastercard, American Express), Mercado Pago y transferencias bancarias.',
    },
    {
      question: '¿Puedo cambiar o devolver mi entrada?',
      answer: 'Las entradas no son reembolsables excepto en caso de cancelación o reprogramación del evento.',
    },
  ],
  content: {
    hero: {
      title: 'Bruno Mars en Argentina',
      subtitle: 'The Romantic Tour 2027',
      description: 'El rey del pop romántico vuelve a Buenos Aires con su show más espectacular.',
    },
    about: {
      title: 'Sobre el concierto en Argentina',
      paragraphs: [
        'Bruno Mars regresa a Argentina con The Romantic Tour, llevando su magia al icónico Estadio Monumental. Dos noches épicas que prometen reunir a más de 140.000 fanáticos en uno de los estadios más emblemáticos de Latinoamérica.',
        'Con una trayectoria repleta de éxitos y una conexión especial con el público argentino, Bruno Mars interpretará sus clásicos y nuevos temas en una producción de clase mundial que incluye efectos visuales de última generación.',
        'El Estadio Monumental, hogar del Club Atlético River Plate, ha sido testigo de los conciertos más importantes de la historia. Su capacidad y excelente infraestructura garantizan una experiencia inolvidable para todos los asistentes.',
      ],
    },
  },
  images: {
    hero: '/images/countries/argentina/hero.jpg',
    og: '/images/countries/argentina/og.jpg',
    venue: '/images/countries/argentina/venue.jpg',
  },
  offersValidFrom: '2026-09-01T10:00:00-03:00',
}
