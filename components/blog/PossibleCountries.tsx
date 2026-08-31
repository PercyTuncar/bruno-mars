'use client'

import BO from 'country-flag-icons/react/3x2/BO'
import EC from 'country-flag-icons/react/3x2/EC'
import PY from 'country-flag-icons/react/3x2/PY'
import UY from 'country-flag-icons/react/3x2/UY'

export function PossibleCountries() {
  const countries = [
    { code: 'BO', name: 'Bolivia', cities: 'Santa Cruz de la Sierra o La Paz', Flag: BO },
    { code: 'EC', name: 'Ecuador', cities: 'Quito o Guayaquil', Flag: EC },
    { code: 'PY', name: 'Paraguay', cities: 'Asunción', Flag: PY },
    { code: 'UY', name: 'Uruguay', cities: 'Estadio Centenario (Montevideo)', Flag: UY },
  ]

  return (
    <div className="grid md:grid-cols-2 gap-4 my-8">
      {countries.map(({ code, name, cities, Flag }) => (
        <div
          key={code}
          className="p-6 rounded-xl bg-muted/50 border-2 border-dashed border-border hover:border-primary/30 transition-all"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-8 rounded shadow-sm overflow-hidden flex-shrink-0">
              <Flag className="w-full h-full object-cover" />
            </div>
            <h3 className="text-xl font-bold">{name}</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-2">
            <strong>{name === 'Uruguay' ? 'Venue probable:' : name === 'Paraguay' ? 'Ciudad probable:' : 'Ciudades probables:'}</strong> {cities}
          </p>
          <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-200 text-xs font-medium">
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            En evaluación
          </div>
        </div>
      ))}
    </div>
  )
}
