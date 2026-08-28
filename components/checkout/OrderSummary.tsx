'use client'

/**
 * Resumen del pedido en checkout
 * Muestra los items seleccionados antes de pagar
 */

import { formatCurrency } from '@/lib/format-currency'
import type { CountrySlug } from '@/data/countries.config'
import { getCountryConfig } from '@/data/countries.config'
import { Ticket } from 'lucide-react'

interface OrderSummaryProps {
  countrySlug: CountrySlug
  locale: string
  language: 'es' | 'pt'
}

export function OrderSummary({ countrySlug, locale, language }: OrderSummaryProps) {
  const config = getCountryConfig(countrySlug)

  // TODO: Obtener items del carrito desde estado global
  const cartItems: any[] = []

  const emptyLabel = language === 'pt'
    ? 'Nenhum ingresso selecionado'
    : 'No hay entradas seleccionadas'
  const backLabel = language === 'pt'
    ? 'Voltar para selecionar ingressos'
    : 'Volver a seleccionar entradas'

  if (cartItems.length === 0) {
    return (
      <div className="matte p-8 rounded-lg text-center">
        <Ticket className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
        <p className="text-muted-foreground mb-4">{emptyLabel}</p>
        <a
          href={`/${countrySlug}/${config.ticketsSlug}`}
          className="inline-block px-6 py-3 bg-primary text-primary-foreground rounded-md font-medium hover:bg-primary/90 transition-colors"
        >
          {backLabel}
        </a>
      </div>
    )
  }

  return (
    <div className="matte p-6 rounded-lg">
      <div className="space-y-4">
        {cartItems.map((item: any, index: number) => (
          <div key={index} className="flex justify-between items-start pb-4 border-b border-border last:border-0">
            <div className="flex-1">
              <p className="font-semibold">{item.zoneName}</p>
              <p className="text-sm text-muted-foreground">
                {item.quantity}x {formatCurrency(item.price, config.currency, locale)}
              </p>
            </div>
            <p className="font-bold text-lg">
              {formatCurrency(item.price * item.quantity, config.currency, locale)}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
