'use client'

/**
 * Zone Card Premium - Diseño profesional para venta de entradas
 * Inspirado en Ticketmaster/StubHub
 */

import { useState } from 'react'
import Link from 'next/link'
import { Plus, Minus, ArrowRight, MapPin, Info } from 'lucide-react'
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

interface ZoneCardPremiumProps {
  zone: Zone
  currency: Currency
  countrySlug: CountrySlug
}

export function ZoneCardPremium({ zone, currency, countrySlug }: ZoneCardPremiumProps) {
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
        return 'bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800'
      case 'stand up':
        return 'bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800'
      default:
        return 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700'
    }
  }

  const total = zone.price * quantity

  return (
    <div className="group bg-white dark:bg-card p-8 rounded-2xl border-2 border-border/50 hover:border-primary/50 shadow-sm hover:shadow-lift transition-all duration-300">
      <div className="grid md:grid-cols-[1fr_auto] gap-8">
        {/* Left - Zone Info */}
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <MapPin className="h-5 w-5 text-primary flex-shrink-0" />
                <span className={`px-3 py-1 rounded-lg text-xs font-bold border ${getCategoryColor(zone.category)}`}>
                  {zone.category.toUpperCase()}
                </span>
              </div>
              <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
                {zone.name}
              </h3>
              {zone.description && (
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {zone.description}
                </p>
              )}
            </div>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3">
            <div className="text-4xl font-black text-primary">
              {formatCurrency(zone.price, currency)}
            </div>
            <span className="text-sm text-muted-foreground">por entrada</span>
          </div>

          {/* Features */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Info className="h-4 w-4" />
            <span>Incluye cargo por servicio</span>
          </div>
        </div>

        {/* Right - Quantity Selector */}
        <div className="flex flex-col justify-between min-w-[200px]">
          {/* Quantity */}
          <div className="space-y-4">
            <div className="text-sm font-medium text-muted-foreground">Cantidad</div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleDecrease}
                disabled={quantity === 0}
                className={`h-12 w-12 rounded-xl flex items-center justify-center font-bold transition-all ${
                  quantity === 0
                    ? 'bg-muted text-muted-foreground cursor-not-allowed'
                    : 'bg-primary/10 text-primary hover:bg-primary hover:text-white'
                }`}
              >
                <Minus className="h-5 w-5" />
              </button>

              <div className="flex-1 text-center">
                <div className="text-4xl font-bold font-mono">{quantity}</div>
              </div>

              <button
                onClick={handleIncrease}
                disabled={quantity >= maxQuantity}
                className={`h-12 w-12 rounded-xl flex items-center justify-center font-bold transition-all ${
                  quantity >= maxQuantity
                    ? 'bg-muted text-muted-foreground cursor-not-allowed'
                    : 'bg-primary/10 text-primary hover:bg-primary hover:text-white'
                }`}
              >
                <Plus className="h-5 w-5" />
              </button>
            </div>

            <div className="text-xs text-center text-muted-foreground">
              Máximo {maxQuantity} entradas
            </div>
          </div>

          {/* Total & CTA */}
          {quantity > 0 && (
            <div className="space-y-4 pt-6 border-t mt-6">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Subtotal</span>
                <span className="text-2xl font-black text-primary">
                  {formatCurrency(total, currency)}
                </span>
              </div>

              <Link
                href={`/${countrySlug}/entradas/checkout?zone=${zone.id}&qty=${quantity}`}
                className="flex items-center justify-center gap-2 h-12 px-6 bg-gradient-to-r from-primary to-accent text-white rounded-xl font-bold shadow-lift hover:shadow-lift-lg transition-all hover:-translate-y-1 w-full"
              >
                Continuar
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
