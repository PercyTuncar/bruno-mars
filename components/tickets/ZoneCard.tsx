'use client'

/**
 * Tarjeta de zona reutilizable
 * Recibe datos ya resueltos por país (no hace fetch cruzado)
 */

import { useState } from 'react'
import { Ticket, Info } from 'lucide-react'
import { formatCurrency } from '@/lib/format-currency'
import type { Zone } from '@/data/countries/types'
import type { CountrySlug } from '@/data/countries.config'
import { cn } from '@/lib/utils'

interface ZoneCardProps {
  zone: Zone
  countrySlug: CountrySlug
  locale: string
  language: 'es' | 'pt'
}

export function ZoneCard({ zone, countrySlug, locale, language }: ZoneCardProps) {
  const [quantity, setQuantity] = useState(0)

  const addToCart = () => {
    if (quantity > 0) {
      // TODO: Implementar lógica de carrito global
      console.log(`Agregando ${quantity} entradas de ${zone.name}`)
    }
  }

  const incrementQuantity = () => {
    if (quantity < 6) {
      setQuantity(quantity + 1)
    }
  }

  const decrementQuantity = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1)
    }
  }

  const categoryLabel = zone.category === 'stand_up'
    ? 'Stand Up'
    : (language === 'pt' ? 'Numerado' : 'Numerada')

  const addLabel = language === 'pt' ? 'Adicionar' : 'Agregar'
  const soldOutLabel = language === 'pt' ? 'Esgotado' : 'Agotado'

  return (
    <div
      id={zone.id}
      className={cn(
        'matte p-6 rounded-lg border-2 transition-all',
        zone.available
          ? 'border-transparent hover:border-primary/50'
          : 'opacity-60 cursor-not-allowed'
      )}
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Info de zona */}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <Ticket className="h-5 w-5 text-primary" />
            <h3 className="text-xl font-bold">{zone.name}</h3>
            <span className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground font-medium">
              {categoryLabel}
            </span>
          </div>

          {zone.description && (
            <p className="text-sm text-muted-foreground mb-3 flex items-start gap-2">
              <Info className="h-4 w-4 mt-0.5 flex-shrink-0" />
              <span>{zone.description}</span>
            </p>
          )}

          <p className="text-2xl font-bold text-primary">
            {formatCurrency(zone.price, zone.currency, locale)}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            {language === 'pt' ? 'por ingresso' : 'por entrada'}
          </p>
        </div>

        {/* Selector de cantidad y botón */}
        <div className="flex items-center gap-4">
          {zone.available ? (
            <>
              {/* Selector de cantidad */}
              <div className="flex items-center gap-2">
                <button
                  onClick={decrementQuantity}
                  disabled={quantity === 0}
                  className="w-10 h-10 rounded-md bg-muted hover:bg-muted/80 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center font-bold"
                  aria-label={language === 'pt' ? 'Diminuir quantidade' : 'Disminuir cantidad'}
                >
                  −
                </button>
                <span className="w-8 text-center font-bold text-lg">{quantity}</span>
                <button
                  onClick={incrementQuantity}
                  disabled={quantity >= 6}
                  className="w-10 h-10 rounded-md bg-muted hover:bg-muted/80 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center font-bold"
                  aria-label={language === 'pt' ? 'Aumentar quantidade' : 'Aumentar cantidad'}
                >
                  +
                </button>
              </div>

              {/* Botón agregar */}
              <button
                onClick={addToCart}
                disabled={quantity === 0}
                className={cn(
                  'px-6 py-3 rounded-md font-medium transition-colors',
                  quantity > 0
                    ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                    : 'bg-muted text-muted-foreground cursor-not-allowed'
                )}
              >
                {addLabel}
              </button>
            </>
          ) : (
            <div className="px-6 py-3 rounded-md bg-destructive/10 text-destructive font-medium">
              {soldOutLabel}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
