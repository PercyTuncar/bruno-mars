/**
 * Dados 100% independentes do Brasil
 * TODO EM PORTUGUÊS - nunca misturar espanhol
 */

import type { CountryData } from './types'

export const brasilData: CountryData = {
  slug: 'brasil',
  name: 'Brasil',
  dates: [
    {
      date: '2027-10-01',
      time: '21:00',
      timezone: 'America/Sao_Paulo',
      dateDisplay: '1º de outubro de 2027',
    },
    {
      date: '2027-10-02',
      time: '21:00',
      timezone: 'America/Sao_Paulo',
      dateDisplay: '2 de outubro de 2027',
    },
  ],
  venue: {
    name: 'Allianz Parque',
    address: {
      streetAddress: 'Av. Francisco Matarazzo, 1705',
      city: 'São Paulo',
      region: 'SP',
      postalCode: '05001-200',
      country: 'BR',
    },
    capacity: 43000,
  },
  seo: {
    landingTitle: 'Bruno Mars no Brasil',
    landingDescription: 'Bruno Mars chega ao Brasil com The Romantic Tour. Shows confirmados nos dias 1º e 2 de outubro de 2027 no Allianz Parque, São Paulo. Confira datas, setores e compre seus ingressos oficiais.',
    ticketsTitle: 'Ingressos Bruno Mars Brasil',
    ticketsDescription: 'Compre seus ingressos oficiais para Bruno Mars no Brasil. The Romantic Tour, 1º e 2 de outubro de 2027, Allianz Parque. Escolha seu setor: Occidente, Oriente, Pista ou Tribuna Norte.',
    keywords: ['bruno mars brasil', 'ingressos bruno mars são paulo', 'show bruno mars 2027', 'allianz parque', 'the romantic tour brasil'],
  },
  faqs: [
    {
      question: 'Onde será realizado o show do Bruno Mars no Brasil?',
      answer: 'O show será realizado no Allianz Parque, localizado na Av. Francisco Matarazzo, 1705, São Paulo.',
    },
    {
      question: 'Quais são as datas confirmadas?',
      answer: 'Bruno Mars se apresentará nos dias 1º e 2 de outubro de 2027, ambas as datas às 21:00 horas.',
    },
    {
      question: 'Qual é a idade mínima para entrar?',
      answer: 'O evento é para todos os públicos. Menores de 10 anos devem entrar acompanhados de um adulto responsável.',
    },
    {
      question: 'Quais métodos de pagamento estão disponíveis?',
      answer: 'Aceitamos cartões de crédito e débito (Visa, Mastercard, Elo), PIX, boleto bancário e pagamentos em pontos autorizados.',
    },
    {
      question: 'Os ingressos são reembolsáveis?',
      answer: 'Os ingressos só são reembolsáveis em caso de cancelamento oficial do evento. Trocas estão sujeitas à disponibilidade.',
    },
  ],
  content: {
    hero: {
      title: 'Bruno Mars no Brasil',
      subtitle: 'The Romantic Tour 2027',
      description: 'O ícone do pop mundial volta a São Paulo com o show mais esperado do ano.',
    },
    about: {
      title: 'Sobre o show no Brasil',
      paragraphs: [
        'Bruno Mars retorna ao Brasil com The Romantic Tour, uma turnê espetacular que percorre seus maiores sucessos. O Allianz Parque será palco de duas noites inesquecíveis que reunirão milhares de fãs brasileiros.',
        'Reconhecido mundialmente por sua voz única e energia no palco, Bruno Mars vendeu mais de 200 milhões de discos e ganhou 15 prêmios Grammy. Esta turnê promete ser sua produção mais ambiciosa até hoje.',
        'O Allianz Parque, com capacidade para 43.000 pessoas, é um dos estádios mais modernos do Brasil e oferece acústica excepcional. Todos os setores foram projetados para garantir uma experiência inesquecível.',
      ],
    },
  },
  images: {
    hero: '/images/countries/brasil/hero.jpg',
    og: '/images/countries/brasil/og.jpg',
    venue: '/images/countries/brasil/venue.jpg',
  },
  offersValidFrom: '2026-09-01T10:00:00-03:00',
}
