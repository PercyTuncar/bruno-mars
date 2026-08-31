'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { MapPin, Users, Calendar } from 'lucide-react'
import CL from 'country-flag-icons/react/3x2/CL'
import PE from 'country-flag-icons/react/3x2/PE'
import AR from 'country-flag-icons/react/3x2/AR'
import BR from 'country-flag-icons/react/3x2/BR'
import CO from 'country-flag-icons/react/3x2/CO'

interface Country {
  name: string
  city: string
  venue: string
  capacity: string
  dates: string
  link: string
  flag: string
}

interface CountryScheduleProps {
  countries?: Country[]
}

const defaultCountries: Country[] = [
  {
    name: 'Chile',
    city: 'Santiago',
    venue: 'Estadio Nacional (estimado)',
    capacity: '48,000',
    dates: 'Ago - Sep 2027 (probable)',
    link: '/chile',
    flag: 'CL'
  },
  {
    name: 'Perú',
    city: 'Lima',
    venue: 'Estadio Nacional (estimado)',
    capacity: '40,000',
    dates: 'Sep - Oct 2027 (probable)',
    link: '/peru',
    flag: 'PE'
  },
  {
    name: 'Argentina',
    city: 'Buenos Aires',
    venue: 'Estadio Monumental (estimado)',
    capacity: '70,000',
    dates: 'Oct - Nov 2027 (probable)',
    link: '/argentina',
    flag: 'AR'
  },
  {
    name: 'Brasil',
    city: 'São Paulo / Río de Janeiro',
    venue: 'Allianz Parque / Maracaná (estimado)',
    capacity: '43,000 / 78,000',
    dates: 'Noviembre 2027 (probable)',
    link: '/brasil',
    flag: 'BR'
  },
  {
    name: 'Colombia',
    city: 'Bogotá',
    venue: 'Estadio El Campín (estimado)',
    capacity: '45,000',
    dates: 'Nov - Dic 2027 (probable)',
    link: '/colombia',
    flag: 'CO'
  }
]

const FlagIcon = ({ code }: { code: string }) => {
  const flags: { [key: string]: React.ComponentType<{ className?: string }> } = {
    CL,
    PE,
    AR,
    BR,
    CO
  }

  const Flag = flags[code]
  return Flag ? <Flag className="w-12 h-8 rounded shadow-sm" /> : null
}

export function CountrySchedule({ countries = defaultCountries }: CountryScheduleProps) {
  return (
    <div id="paises-confirmados" className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 my-12">
      {countries.map((country, index) => (
        <motion.div
          key={country.name}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1, duration: 0.5 }}
        >
          <Link href={country.link} className="group block h-full">
            <div className="relative h-full p-6 rounded-2xl backdrop-blur-xl bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-primary/5 overflow-hidden">
              {/* Subtle gradient background on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full filter blur-3xl" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-accent/5 rounded-full filter blur-3xl" />
              </div>

              <div className="relative z-10 space-y-4">
                {/* Flag and country name */}
                <div className="flex items-center gap-3">
                  <FlagIcon code={country.flag} />
                  <div>
                    <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                      {country.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">{country.city}</p>
                  </div>
                </div>

                {/* Venue */}
                <div className="flex items-start gap-2 text-sm">
                  <MapPin className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-muted-foreground">{country.venue}</p>
                </div>

                {/* Capacity */}
                <div className="flex items-center gap-2 text-sm">
                  <Users className="w-4 h-4 text-accent flex-shrink-0" />
                  <p className="text-muted-foreground">
                    <span className="font-semibold">{country.capacity}</span> personas
                  </p>
                </div>

                {/* Dates */}
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="w-4 h-4 text-primary/70 flex-shrink-0" />
                  <p className="text-muted-foreground">{country.dates}</p>
                </div>

                {/* CTA */}
                <div className="pt-2">
                  <span className="inline-flex items-center text-sm font-semibold text-primary group-hover:gap-2 transition-all">
                    Más información
                    <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  )
}
