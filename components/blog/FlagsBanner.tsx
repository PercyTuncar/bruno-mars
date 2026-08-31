'use client'

import CL from 'country-flag-icons/react/3x2/CL'
import PE from 'country-flag-icons/react/3x2/PE'
import AR from 'country-flag-icons/react/3x2/AR'
import BR from 'country-flag-icons/react/3x2/BR'
import CO from 'country-flag-icons/react/3x2/CO'

export function FlagsBanner() {
  const countries = [
    { code: 'CL', name: 'Chile', Flag: CL },
    { code: 'PE', name: 'Perú', Flag: PE },
    { code: 'AR', name: 'Argentina', Flag: AR },
    { code: 'BR', name: 'Brasil', Flag: BR },
    { code: 'CO', name: 'Colombia', Flag: CO },
  ]

  return (
    <div className="my-8 p-6 rounded-2xl bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 border border-primary/20">
      <div className="flex flex-col items-center gap-4">
        <div className="flex items-center gap-2 text-sm font-bold text-muted-foreground uppercase tracking-wide">
          <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          5 Países Confirmados
        </div>
        <div className="flex flex-wrap items-center justify-center gap-4">
          {countries.map(({ code, name, Flag }) => (
            <div key={code} className="group relative">
              <div className="w-20 h-14 rounded-lg overflow-hidden shadow-lg ring-2 ring-background hover:ring-primary transition-all duration-300 hover:scale-110">
                <Flag className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                <span className="text-xs font-semibold">{name}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="text-xs text-muted-foreground mt-2">
          + 4 países adicionales en evaluación
        </div>
      </div>
    </div>
  )
}
