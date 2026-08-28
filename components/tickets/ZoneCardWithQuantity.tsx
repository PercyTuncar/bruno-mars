'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Plus, Minus, ArrowRight, MapPin } from 'lucide-react'
import { formatCurrency } from '@/lib/format-currency'
import type { CountrySlug, Currency } from '@/data/countries.config'

interface Zone {
  id: string
  name: string
  price: number
  category: string
  available: boolean
  description?: string
}

interface ZoneCardProps {
  zone: Zone
  currency: Currency
  countrySlug: CountrySlug
}

export function ZoneCardWithQuantity({ zone, currency, countrySlug }: ZoneCardProps) {
  const [quantity, setQuantity] = useState(0)
  const maxQuantity = 6

  const handleIncrease = () => {
    if (quantity < maxQuantity) setQuantity(quantity + 1)
  }

  const handleDecrease = () => {
    if (quantity > 0) setQuantity(quantity - 1)
  }

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'numerada':
        return 'bg-blue-500/10 text-blue-500 border-blue-500/20'
      case 'stand_up':
      case 'stand up':
        return 'bg-purple-500/10 text-purple-500 border-purple-500/20'
      default:
        return 'bg-muted text-muted-foreground border-border'
    }
  }

  const total = zone.price * quantity

  return (
    <div className="group bg-card p-6 rounded-xl border border-border hover:border-primary/50 transition-all">
      <div className="flex flex-col lg:flex-row lg:items-center gap-6">
        {/* Left - Zone Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-2">
            <MapPin className="h-4 w-4 text-primary flex-shrink-0" />
            <span className={`px-2 py-0.5 rounded text-xs font-bold border ${getCategoryColor(zone.category)}`}>
              {zone.category.toUpperCase()}
            </span>
          </div>

          <h3 className="text-xl font-black mb-1 group-hover:text-primary transition-colors">
            {zone.name}
          </h3>

          {zone.description && (
            <p className="text-xs text-muted-foreground">{zone.description}</p>
          )}
        </div>

        {/* Center - Price */}
        <div className="flex items-center gap-6 lg:gap-8">
          <div>
            <div className="text-xs text-muted-foreground mb-0.5 uppercase tracking-wide">Precio</div>
            <div className="text-2xl font-black text-primary">
              {formatCurrency(zone.price, currency)}
            </div>
          </div>

          {/* Quantity Selector */}
          <div className="flex flex-col items-center gap-2">
            <div className="text-xs text-muted-foreground uppercase tracking-wide">Cantidad</div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleDecrease}
                disabled={quantity === 0}
                className={`h-10 w-10 rounded-lg flex items-center justify-center font-bold transition-all ${
                  quantity === 0
                    ? 'bg-muted text-muted-foreground cursor-not-allowed'
                    : 'bg-primary/10 text-primary hover:bg-primary hover:text-white'
                }`}
                aria-label="Disminuir cantidad"
              >
                <Minus className="h-4 w-4" />
              </button>

              <div className="w-12 text-center">
                <div className="text-3xl font-black font-mono">{quantity}</div>
              </div>

              <button
                onClick={handleIncrease}
                disabled={quantity >= maxQuantity}
                className={`h-10 w-10 rounded-lg flex items-center justify-center font-bold transition-all ${
                  quantity >= maxQuantity
                    ? 'bg-muted text-muted-foreground cursor-not-allowed'
                    : 'bg-primary/10 text-primary hover:bg-primary hover:text-white'
                }`}
                aria-label="Aumentar cantidad"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <div className="text-xs text-muted-foreground">Máx. {maxQuantity}</div>
          </div>
        </div>

        {/* Right - Total & CTA */}
        <div className="flex flex-col items-end gap-3 min-w-[180px]">
          {quantity > 0 ? (
            <>
              <div className="text-right">
                <div className="text-xs text-muted-foreground mb-0.5 uppercase tracking-wide">Total</div>
                <div className="text-3xl font-black text-primary">
                  {formatCurrency(total, currency)}
                </div>
              </div>

              <Link
                href={`/${countrySlug}/entradas/checkout?zone=${zone.id}&qty=${quantity}`}
                className="flex items-center gap-2 h-11 px-6 gradient-red text-white rounded-lg font-bold text-sm shadow-glow hover:shadow-glow-lg transition-all hover:scale-105 w-full justify-center"
              >
                Continuar
                <ArrowRight className="h-4 w-4" />
              </Link>
            </>
          ) : (
            <div className="text-center w-full py-4">
              <div className="text-xs text-muted-foreground">
                Selecciona una cantidad
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
