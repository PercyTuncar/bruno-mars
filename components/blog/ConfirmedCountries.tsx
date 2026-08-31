'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { CheckCircle2, MapPin, Users, Calendar, ArrowRight } from 'lucide-react'
import CL from 'country-flag-icons/react/3x2/CL'
import PE from 'country-flag-icons/react/3x2/PE'
import AR from 'country-flag-icons/react/3x2/AR'
import BR from 'country-flag-icons/react/3x2/BR'
import CO from 'country-flag-icons/react/3x2/CO'

interface Country {
  name: string
  code: string
  city: string
  venue: string
  capacity: string
  dates: string
  link: string
}

const countries: Country[] = [
  {
    name: 'Chile',
    code: 'CL',
    city: 'Santiago',
    venue: 'Estadio Nacional (estimado)',
    capacity: '48,000',
    dates: 'Ago - Sep 2027',
    link: '/chile',
  },
  {
    name: 'Perú',
    code: 'PE',
    city: 'Lima',
    venue: 'Estadio Nacional (estimado)',
    capacity: '40,000',
    dates: 'Sep - Oct 2027',
    link: '/peru',
  },
  {
    name: 'Argentina',
    code: 'AR',
    city: 'Buenos Aires',
    venue: 'Estadio Monumental (estimado)',
    capacity: '70,000',
    dates: 'Oct - Nov 2027',
    link: '/argentina',
  },
  {
    name: 'Brasil',
    code: 'BR',
    city: 'São Paulo / Río',
    venue: 'Allianz / Maracaná (estimado)',
    capacity: '43k / 78k',
    dates: 'Noviembre 2027',
    link: '/brasil',
  },
  {
    name: 'Colombia',
    code: 'CO',
    city: 'Bogotá',
    venue: 'Estadio El Campín (estimado)',
    capacity: '45,000',
    dates: 'Nov - Dic 2027',
    link: '/colombia',
  }
]

const FlagIcon = ({ code }: { code: string }) => {
  const flags: { [key: string]: React.ComponentType<{ className?: string }> } = {
    CL, PE, AR, BR, CO
  }
  const Flag = flags[code]
  return Flag ? <Flag className="w-full h-full object-cover" /> : null
}

export function ConfirmedCountries() {
  return (
    <div className="my-12">
      {/* Header con estadísticas */}
      <div className="text-center mb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-700 mb-6"
        >
          <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />
          <span className="font-bold text-green-800 dark:text-green-200">Países Confirmados</span>
        </motion.div>

        <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto mb-8">
          <div className="p-4 rounded-xl bg-card border">
            <div className="text-3xl font-black text-primary">5</div>
            <div className="text-xs text-muted-foreground mt-1">Países</div>
          </div>
          <div className="p-4 rounded-xl bg-card border">
            <div className="text-3xl font-black text-primary">10+</div>
            <div className="text-xs text-muted-foreground mt-1">Fechas Estimadas</div>
          </div>
          <div className="p-4 rounded-xl bg-card border">
            <div className="text-3xl font-black text-primary">365k+</div>
            <div className="text-xs text-muted-foreground mt-1">Capacidad Total</div>
          </div>
        </div>
      </div>

      {/* Introducción de la tabla (SEO requirement) */}
      <p className="text-muted-foreground mb-6 text-center max-w-3xl mx-auto">
        La siguiente tabla resume los países confirmados para la gira de Bruno Mars en 2027,
        incluyendo ciudades, venues estimados, capacidades y fechas probables para cada presentación.
      </p>

      {/* Tabla HTML Semántica - Desktop */}
      <div className="hidden lg:block overflow-x-auto">
        <table
          className="w-full border-collapse bg-card rounded-2xl overflow-hidden shadow-lg"
          role="table"
          aria-label="Países confirmados para la gira de Bruno Mars 2027"
        >
          <caption className="sr-only">
            Países confirmados para la gira de Bruno Mars en Latinoamérica 2027 con venues, capacidades y fechas probables
          </caption>

          {/* Table Header */}
          <thead>
            <tr className="bg-gradient-to-r from-primary/10 to-accent/10 border-b-2 border-primary/20">
              <th scope="col" className="px-6 py-4 text-left font-bold text-sm uppercase tracking-wide">
                País
              </th>
              <th scope="col" className="px-6 py-4 text-left font-bold text-sm uppercase tracking-wide">
                Ciudad
              </th>
              <th scope="col" className="px-6 py-4 text-left font-bold text-sm uppercase tracking-wide">
                Venue Estimado
              </th>
              <th scope="col" className="px-6 py-4 text-left font-bold text-sm uppercase tracking-wide">
                Capacidad
              </th>
              <th scope="col" className="px-6 py-4 text-left font-bold text-sm uppercase tracking-wide">
                Fecha Probable
              </th>
              <th scope="col" className="px-6 py-4 text-left font-bold text-sm uppercase tracking-wide">
                Información
              </th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {countries.map((country, index) => (
              <motion.tr
                key={country.code}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="border-b border-border hover:bg-muted/50 transition-colors group"
              >
                {/* País */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-8 rounded shadow-sm overflow-hidden flex-shrink-0 ring-2 ring-background">
                      <FlagIcon code={country.code} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span className="font-bold text-foreground">{country.name}</span>
                      </div>
                    </div>
                  </div>
                </td>

                {/* Ciudad */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="text-sm font-medium">{country.city}</span>
                  </div>
                </td>

                {/* Venue */}
                <td className="px-6 py-4">
                  <span className="text-sm">{country.venue}</span>
                </td>

                {/* Capacidad */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-accent flex-shrink-0" />
                    <span className="text-sm font-semibold">{country.capacity}</span>
                  </div>
                </td>

                {/* Fecha */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-amber-600 dark:text-amber-500 flex-shrink-0" />
                    <span className="text-sm font-medium text-amber-700 dark:text-amber-400">{country.dates}</span>
                  </div>
                </td>

                {/* Link */}
                <td className="px-6 py-4">
                  <Link
                    href={country.link}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-bold hover:bg-primary hover:text-primary-foreground transition-all group-hover:shadow-md"
                  >
                    Ver más
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </td>
              </motion.tr>
            ))}
          </tbody>

          {/* Table Footer */}
          <tfoot>
            <tr className="bg-muted/30">
              <td colSpan={6} className="px-6 py-4 text-center text-sm text-muted-foreground">
                <strong>Nota:</strong> Los venues y fechas exactas serán confirmados por las productoras oficiales próximamente.
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* Vista Mobile - Cards (Responsive) */}
      <div className="lg:hidden space-y-4">
        {countries.map((country, index) => (
          <motion.div
            key={country.code}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="p-6 rounded-2xl bg-card border border-border shadow-lg"
          >
            {/* Header con bandera */}
            <div className="flex items-center gap-3 mb-4 pb-4 border-b">
              <div className="w-16 h-11 rounded-lg shadow-md overflow-hidden ring-2 ring-background">
                <FlagIcon code={country.code} />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  <h3 className="text-xl font-black text-foreground">{country.name}</h3>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{country.city}</span>
                </div>
              </div>
            </div>

            {/* Info grid */}
            <div className="space-y-3 mb-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-4 h-4 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-muted-foreground mb-1">Venue Estimado</div>
                  <div className="text-sm font-semibold">{country.venue}</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <Users className="w-4 h-4 text-accent" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-muted-foreground mb-1">Capacidad</div>
                  <div className="text-sm font-semibold">{country.capacity} personas</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-4 h-4 text-amber-600 dark:text-amber-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-muted-foreground mb-1">Fecha Probable</div>
                  <div className="text-sm font-semibold text-amber-700 dark:text-amber-400">{country.dates}</div>
                </div>
              </div>
            </div>

            {/* CTA */}
            <Link
              href={country.link}
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-primary text-primary-foreground font-bold text-sm hover:bg-primary/90 transition-all"
            >
              Ver más información
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Nota final */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mt-8 p-4 rounded-xl bg-muted/50 border text-center"
      >
        <p className="text-sm text-muted-foreground">
          <strong>Actualización:</strong> Esta tabla se actualizará inmediatamente cuando se anuncien las fechas oficiales.
        </p>
      </motion.div>
    </div>
  )
}
