'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Ticket, ArrowRight } from 'lucide-react'

interface Zone {
  name: string
  priceRange: string
  description: string
}

interface CountryTickets {
  country: string
  currency: string
  zones: Zone[]
  link: string
}

interface TicketZonesProps {
  countries?: CountryTickets[]
}

const defaultCountries: CountryTickets[] = [
  {
    country: 'Chile',
    currency: 'CLP',
    zones: [
      { name: 'Cancha VIP', priceRange: '$180,000 - $250,000', description: 'Acceso preferencial al campo, lo más cerca del escenario' },
      { name: 'Cancha General', priceRange: '$120,000 - $160,000', description: 'Campo standing, experiencia inmersiva' },
      { name: 'Tribuna Occidente/Oriente', priceRange: '$80,000 - $120,000', description: 'Vista frontal privilegiada con asiento numerado' },
      { name: 'Tribuna Norte', priceRange: '$60,000 - $80,000', description: 'Vista general del estadio' }
    ],
    link: '/chile'
  },
  {
    country: 'Perú',
    currency: 'PEN',
    zones: [
      { name: 'Campo VIP', priceRange: 'S/ 800 - S/ 1,200', description: 'Zona premium con servicios exclusivos' },
      { name: 'Campo General A/B', priceRange: 'S/ 500 - S/ 700', description: 'Standing en cancha' },
      { name: 'Occidente/Oriente', priceRange: 'S/ 350 - S/ 500', description: 'Tribunas laterales numeradas' },
      { name: 'Norte', priceRange: 'S/ 250 - S/ 350', description: 'Vista panorámica' }
    ],
    link: '/peru'
  },
  {
    country: 'Argentina',
    currency: 'ARS',
    zones: [
      { name: 'Campo VIP', priceRange: '$150,000 - $220,000', description: 'Máxima cercanía al escenario' },
      { name: 'Campo General', priceRange: '$90,000 - $130,000', description: 'De pie en el campo' },
      { name: 'Plateas', priceRange: '$60,000 - $90,000', description: 'Asientos numerados con excelente vista' },
      { name: 'Populares', priceRange: '$40,000 - $60,000', description: 'Acceso general a tribunas' }
    ],
    link: '/argentina'
  },
  {
    country: 'Brasil',
    currency: 'BRL',
    zones: [
      { name: 'Pista Premium', priceRange: 'R$ 900 - R$ 1,400', description: 'Área VIP com serviços exclusivos' },
      { name: 'Pista Inteira', priceRange: 'R$ 550 - R$ 800', description: 'Standing na pista' },
      { name: 'Cadeiras Numeradas', priceRange: 'R$ 380 - R$ 550', description: 'Assentos com vista frontal' },
      { name: 'Arquibancada', priceRange: 'R$ 280 - R$ 380', description: 'Vista geral do estádio' }
    ],
    link: '/brasil'
  },
  {
    country: 'Colombia',
    currency: 'COP',
    zones: [
      { name: 'Cancha Platinum', priceRange: '$800,000 - $1,200,000', description: 'Experiencia VIP exclusiva' },
      { name: 'Cancha General', priceRange: '$500,000 - $700,000', description: 'De pie cerca al escenario' },
      { name: 'Occidental/Oriental', priceRange: '$350,000 - $500,000', description: 'Sillas numeradas laterales' },
      { name: 'Tribuna Norte', priceRange: '$250,000 - $350,000', description: 'Vista panorámica del show' }
    ],
    link: '/colombia'
  }
]

export function TicketZones({ countries = defaultCountries }: TicketZonesProps) {
  return (
    <div id="precios" className="space-y-8 my-12">
      {countries.map((country, countryIndex) => (
        <motion.div
          key={country.country}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: countryIndex * 0.1, duration: 0.5 }}
          className="relative rounded-3xl p-8 backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 dark:from-white/5 dark:to-white/[0.02] border border-white/20 overflow-hidden"
        >
          {/* Animated background */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-0 left-1/4 w-64 h-64 bg-purple-500/20 rounded-full filter blur-3xl animate-pulse" />
            <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-pink-500/20 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          </div>

          <div className="relative z-10">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 pb-6 border-b border-border">
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                  {country.country}
                </h3>
                <p className="text-sm text-muted-foreground">
                  Precios en {country.currency}
                </p>
              </div>

              <Link
                href={country.link}
                className="group mt-4 md:mt-0 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-bold hover:bg-primary/90 transition-all duration-300 hover:scale-105"
              >
                Comprar Entradas
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Zones grid */}
            <div className="grid md:grid-cols-2 gap-4">
              {country.zones.map((zone, zoneIndex) => (
                <motion.div
                  key={zone.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: zoneIndex * 0.1, duration: 0.4 }}
                  className="group p-5 rounded-xl backdrop-blur-sm bg-card hover:bg-muted/50 border border-border hover:border-primary/50 transition-all duration-300"
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-all">
                      <Ticket className="w-5 h-5 text-primary" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                          {zone.name}
                        </h4>
                        <span className="text-sm font-bold text-primary whitespace-nowrap">
                          {zone.priceRange}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {zone.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
