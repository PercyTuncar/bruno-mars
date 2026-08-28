import type { CountrySlug } from './countries.config'

export interface CountryData {
  name: string
  venue: {
    name: string
    capacity: number
    address: {
      streetAddress: string
      city: string
      region: string
      postalCode: string
      country: string
    }
  }
  dates: Array<{
    date: string
    time: string
    timezone: string
    dateDisplay: string
  }>
  images: {
    hero: string
    og: string
    venue: string
  }
  content: {
    hero: {
      title?: string
      subtitle?: string
      description: string
    }
  }
  seo: {
    landingTitle: string
    landingDescription: string
    ticketsTitle: string
    ticketsDescription: string
    keywords: string[]
  }
  faqs?: Array<{
    question: string
    answer: string
  }>
  offersValidFrom: string
}

const countryData: Record<CountrySlug, CountryData> = {
  peru: {
    name: 'Perú',
    venue: {
      name: 'Estadio Monumental',
      capacity: 80093,
      address: {
        streetAddress: 'Av. José Nicolás de Piérola',
        city: 'Lima',
        region: 'Ate',
        postalCode: '15012',
        country: 'PE',
      },
    },
    dates: [
      {
        date: '2027-09-12',
        time: '18:00',
        timezone: 'America/Lima',
        dateDisplay: 'Viernes 12 de Septiembre, 2027',
      },
    ],
    images: {
      hero: '/images/bruno-mars-peru.jpg',
      og: '/images/bruno-mars-peru-og.jpg',
      venue: '/images/estadio-monumental-peru.jpg',
    },
    content: {
      hero: {
        description:
          'Bruno Mars presenta The Romantic Tour en Perú. Más de 2 horas de espectáculo con todos los hits: Just the Way You Are, 24K Magic, Uptown Funk y canciones del nuevo álbum The Romantic. Viernes 12 de Septiembre, 2027 en el Estadio Monumental de Lima.',
      },
    },
    seo: {
      landingTitle: 'Bruno Mars en Perú',
      landingDescription: 'Bruno Mars en Perú llega con The Romantic Tour. Consulta fechas, zonas y compra tus entradas oficiales para el concierto.',
      ticketsTitle: 'Entradas Bruno Mars Perú',
      ticketsDescription: 'Compra entradas para Bruno Mars en Perú. The Romantic Tour 2027. Estadio Monumental, 12 de Septiembre. Todas las zonas disponibles: Occidente, Oriente, Cancha, Tribuna Norte.',
      keywords: ['bruno mars peru', 'entradas bruno mars lima', 'bruno mars estadio monumental', 'concierto bruno mars 2027', 'the romantic tour peru'],
    },
    offersValidFrom: '2027-01-15T00:00:00-05:00',
  },
  chile: {
    name: 'Chile',
    venue: {
      name: 'Estadio Nacional Julio Martínez Prádanos',
      capacity: 48665,
      address: {
        streetAddress: 'Av. Grecia 2001',
        city: 'Santiago',
        region: 'Ñuñoa',
        postalCode: '7800003',
        country: 'CL',
      },
    },
    dates: [
      {
        date: '2027-09-16',
        time: '19:00',
        timezone: 'America/Santiago',
        dateDisplay: 'Martes 16 de Septiembre, 2027',
      },
    ],
    images: {
      hero: '/images/bruno-mars-chile.jpg',
      og: '/images/bruno-mars-chile-og.jpg',
      venue: '/images/estadio-nacional-chile.jpg',
    },
    content: {
      hero: {
        description:
          'Bruno Mars presenta The Romantic Tour en Chile. Más de 2 horas de espectáculo con todos los hits: Just the Way You Are, 24K Magic, Uptown Funk y canciones del nuevo álbum The Romantic. Martes 16 de Septiembre, 2027 en el Estadio Nacional de Santiago.',
      },
    },
    seo: {
      landingTitle: 'Bruno Mars en Chile',
      landingDescription: 'Bruno Mars en Chile llega con The Romantic Tour. Consulta fechas, zonas y compra tus entradas oficiales para el concierto.',
      ticketsTitle: 'Entradas Bruno Mars Chile',
      ticketsDescription: 'Compra entradas para Bruno Mars en Chile. The Romantic Tour 2027. Estadio Nacional, 16 de Septiembre. Todas las zonas disponibles: Occidente, Oriente, Cancha, Tribuna Norte.',
      keywords: ['bruno mars chile', 'entradas bruno mars santiago', 'bruno mars estadio nacional', 'concierto bruno mars 2027', 'the romantic tour chile'],
    },
    offersValidFrom: '2027-01-15T00:00:00-03:00',
  },
  argentina: {
    name: 'Argentina',
    venue: {
      name: 'Estadio Monumental Antonio Vespucio Liberti',
      capacity: 83214,
      address: {
        streetAddress: 'Av. Pres. Figueroa Alcorta 7597',
        city: 'Buenos Aires',
        region: 'Belgrano',
        postalCode: 'C1428',
        country: 'AR',
      },
    },
    dates: [
      {
        date: '2027-09-20',
        time: '20:00',
        timezone: 'America/Argentina/Buenos_Aires',
        dateDisplay: 'Sábado 20 de Septiembre, 2027',
      },
    ],
    images: {
      hero: '/images/bruno-mars-argentina.jpg',
      og: '/images/bruno-mars-argentina-og.jpg',
      venue: '/images/monumental-river-argentina.jpg',
    },
    content: {
      hero: {
        description:
          'Bruno Mars presenta The Romantic Tour en Argentina. Más de 2 horas de espectáculo con todos los hits: Just the Way You Are, 24K Magic, Uptown Funk y canciones del nuevo álbum The Romantic. Sábado 20 de Septiembre, 2027 en el Estadio Monumental de Buenos Aires.',
      },
    },
    seo: {
      landingTitle: 'Bruno Mars en Argentina',
      landingDescription: 'Bruno Mars en Argentina llega con The Romantic Tour. Consulta fechas, zonas y compra tus entradas oficiales para el concierto.',
      ticketsTitle: 'Entradas Bruno Mars Argentina',
      ticketsDescription: 'Compra entradas para Bruno Mars en Argentina. The Romantic Tour 2027. Estadio Monumental, 20 de Septiembre. Todas las zonas disponibles: Occidente, Oriente, Cancha, Tribuna Norte.',
      keywords: ['bruno mars argentina', 'entradas bruno mars buenos aires', 'bruno mars monumental', 'concierto bruno mars 2027', 'the romantic tour argentina'],
    },
    offersValidFrom: '2027-01-15T00:00:00-03:00',
  },
  colombia: {
    name: 'Colombia',
    venue: {
      name: 'Estadio Nemesio Camacho El Campín',
      capacity: 39512,
      address: {
        streetAddress: 'Carrera 30 # 57-60',
        city: 'Bogotá',
        region: 'Teusaquillo',
        postalCode: '110231',
        country: 'CO',
      },
    },
    dates: [
      {
        date: '2027-09-24',
        time: '19:00',
        timezone: 'America/Bogota',
        dateDisplay: 'Miércoles 24 de Septiembre, 2027',
      },
    ],
    images: {
      hero: '/images/bruno-mars-colombia.jpg',
      og: '/images/bruno-mars-colombia-og.jpg',
      venue: '/images/el-campin-colombia.jpg',
    },
    content: {
      hero: {
        description:
          'Bruno Mars presenta The Romantic Tour en Colombia. Más de 2 horas de espectáculo con todos los hits: Just the Way You Are, 24K Magic, Uptown Funk y canciones del nuevo álbum The Romantic. Miércoles 24 de Septiembre, 2027 en el Estadio El Campín de Bogotá.',
      },
    },
    seo: {
      landingTitle: 'Bruno Mars en Colombia',
      landingDescription: 'Bruno Mars en Colombia llega con The Romantic Tour. Consulta fechas, zonas y compra tus entradas oficiales para el concierto.',
      ticketsTitle: 'Entradas Bruno Mars Colombia',
      ticketsDescription: 'Compra entradas para Bruno Mars en Colombia. The Romantic Tour 2027. Estadio El Campín, 24 de Septiembre. Todas las zonas disponibles: Occidente, Oriente, Cancha, Tribuna Norte.',
      keywords: ['bruno mars colombia', 'entradas bruno mars bogota', 'bruno mars el campin', 'concierto bruno mars 2027', 'the romantic tour colombia'],
    },
    offersValidFrom: '2027-01-15T00:00:00-05:00',
  },
  brasil: {
    name: 'Brasil',
    venue: {
      name: 'Allianz Parque',
      capacity: 43713,
      address: {
        streetAddress: 'Av. Francisco Matarazzo, 1705',
        city: 'São Paulo',
        region: 'Água Branca',
        postalCode: '05001-200',
        country: 'BR',
      },
    },
    dates: [
      {
        date: '2027-09-28',
        time: '19:00',
        timezone: 'America/Sao_Paulo',
        dateDisplay: 'Domingo, 28 de Setembro de 2027',
      },
    ],
    images: {
      hero: '/images/bruno-mars-brasil.jpg',
      og: '/images/bruno-mars-brasil-og.jpg',
      venue: '/images/allianz-parque-brasil.jpg',
    },
    content: {
      hero: {
        description:
          'Bruno Mars apresenta The Romantic Tour no Brasil. Mais de 2 horas de espetáculo com todos os sucessos: Just the Way You Are, 24K Magic, Uptown Funk e músicas do novo álbum The Romantic. Domingo, 28 de Setembro de 2027 no Allianz Parque em São Paulo.',
      },
    },
    seo: {
      landingTitle: 'Bruno Mars no Brasil',
      landingDescription: 'Bruno Mars no Brasil chega com The Romantic Tour. Consulte datas, setores e compre seus ingressos oficiais para o show.',
      ticketsTitle: 'Ingressos Bruno Mars Brasil',
      ticketsDescription: 'Compre ingressos para Bruno Mars no Brasil. The Romantic Tour 2027. Allianz Parque, 28 de Setembro. Todos os setores disponíveis: Oeste, Leste, Campo, Tribuna Norte.',
      keywords: ['bruno mars brasil', 'ingressos bruno mars sao paulo', 'bruno mars allianz parque', 'show bruno mars 2027', 'the romantic tour brasil'],
    },
    offersValidFrom: '2027-01-15T00:00:00-03:00',
  },
}

function getTimezoneOffset(timezone: string): string {
  const offsets: Record<string, string> = {
    'America/Lima': '-05:00',
    'America/Santiago': '-03:00',
    'America/Argentina/Buenos_Aires': '-03:00',
    'America/Bogota': '-05:00',
    'America/Sao_Paulo': '-03:00',
  }
  return offsets[timezone] || '-05:00'
}

export function getCountryData(slug: CountrySlug): CountryData {
  return countryData[slug]
}

export { getTimezoneOffset }
