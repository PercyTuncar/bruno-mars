/**
 * Datos 100% independientes de Colombia
 */

import type { CountryData } from './types'

export const colombiaData: CountryData = {
  slug: 'colombia',
  name: 'Colombia',
  dates: [
    {
      date: '2027-09-24',
      time: '20:00',
      timezone: 'America/Bogota',
      dateDisplay: '24 de septiembre de 2027',
    },
    {
      date: '2027-09-25',
      time: '20:00',
      timezone: 'America/Bogota',
      dateDisplay: '25 de septiembre de 2027',
    },
  ],
  venue: {
    name: 'Estadio Nemesio Camacho El Campín',
    address: {
      streetAddress: 'Calle 57 # 30-90',
      city: 'Bogotá',
      region: 'Cundinamarca',
      postalCode: '110231',
      country: 'CO',
    },
    capacity: 45000,
  },
  seo: {
    landingTitle: 'Bruno Mars en Colombia',
    landingDescription: 'Bruno Mars llega a Colombia con The Romantic Tour. Conciertos confirmados el 24 y 25 de septiembre de 2027 en el Estadio El Campín, Bogotá. Consulta fechas, zonas y compra tus entradas oficiales.',
    ticketsTitle: 'Entradas Bruno Mars Colombia',
    ticketsDescription: 'Compra tus entradas oficiales para Bruno Mars en Colombia. The Romantic Tour, 24 y 25 de septiembre de 2027, Estadio El Campín. Elige tu zona: Occidente, Oriente, Cancha o Tribuna Norte.',
    keywords: ['bruno mars colombia', 'entradas bruno mars bogotá', 'concierto bruno mars 2027', 'estadio el campín', 'the romantic tour colombia'],
  },
  faqs: [
    {
      question: '¿Dónde se realizará el concierto de Bruno Mars en Colombia?',
      answer: 'El concierto se realizará en el Estadio Nemesio Camacho El Campín, ubicado en la Calle 57 # 30-90, Bogotá.',
    },
    {
      question: '¿Cuáles son las fechas confirmadas?',
      answer: 'Bruno Mars se presentará el 24 y 25 de septiembre de 2027, ambas fechas a las 20:00 horas.',
    },
    {
      question: '¿Cuál es la edad mínima para ingresar?',
      answer: 'El evento es apto para todo público. Menores de 10 años deben ingresar acompañados de un adulto responsable.',
    },
    {
      question: '¿Qué métodos de pago están disponibles?',
      answer: 'Aceptamos tarjetas de crédito y débito (Visa, Mastercard, American Express), PSE, Nequi, Daviplata y pagos en efectivo en puntos autorizados.',
    },
    {
      question: '¿Las entradas son reembolsables?',
      answer: 'Las entradas solo son reembolsables en caso de cancelación oficial del evento. Los cambios están sujetos a disponibilidad.',
    },
  ],
  content: {
    hero: {
      title: 'Bruno Mars en Colombia',
      subtitle: 'The Romantic Tour 2027',
      description: 'El fenómeno global del pop llega a Bogotá con un show inolvidable.',
    },
    about: {
      title: 'Sobre el concierto en Colombia',
      paragraphs: [
        'Bruno Mars vuelve a Colombia después de varios años con The Romantic Tour, una gira que celebra el amor y la música. El Estadio El Campín de Bogotá será el epicentro de dos noches mágicas llenas de sus mayores éxitos.',
        'Ganador de múltiples premios Grammy y reconocido como uno de los mejores performers en vivo, Bruno Mars promete un espectáculo con producción de primer nivel, coreografías impresionantes y los hits que han conquistado al mundo entero.',
        'El Estadio El Campín, uno de los recintos deportivos más emblemáticos de Colombia, ha sido sede de los conciertos más importantes del país. Su ubicación céntrica en Bogotá y excelentes instalaciones garantizan comodidad y seguridad para todos los asistentes.',
      ],
    },
  },
  images: {
    hero: '/images/countries/colombia/hero.jpg',
    og: '/images/countries/colombia/og.jpg',
    venue: '/images/countries/colombia/venue.jpg',
  },
  offersValidFrom: '2026-09-01T10:00:00-05:00',
}
