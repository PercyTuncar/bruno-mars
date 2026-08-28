'use client'

/**
 * Resumen de compra (carrito)
 * Muestra las zonas seleccionadas y el total
 * TODO: Conectar con estado global de carrito (Context/Zustand)
 */

import { ShoppingCart } from 'lucide-react'
import { formatCurrency } from '@/lib/format-currency'
import type { CountrySlug } from '@/data/countries.config'
import { getCountryConfig } from '@/data/countries.config'
import Link from 'next/link'

interface PriceSummaryProps {
  countrySlug: CountrySlug
  locale: string
  language: 'es' | 'pt'
}

export function PriceSummary({ countrySlug, locale, language }: PriceSummaryProps) {
  const config = getCountryConfig(countrySlug)

  // TODO: Obtener items del carrito desde estado global
  // Por ahora, mostramos estado vacío
  const cartItems: any[] = []
  const total = 0

  const emptyCartLabel = language === 'pt'
    ? 'Seu carrinho está vazio'
    : 'Tu carrito está vacío'
  const selectTicketsLabel = language === 'pt'
    ? 'Selecione os setores para adicionar ingressos'
    : 'Selecciona las zonas para agregar entradas'
  const summaryLabel = language === 'pt'
    ? 'Resumo da Compra'
    : 'Resumen de tu Compra'
  const totalLabel = language === 'pt' ? 'Total' : 'Total'
  const continueLabel = language === 'pt'
    ? 'Continuar para Pagamento'
    : 'Continuar al Pago'

  return (
    <div className="matte p-6 rounded-lg">
      <div className="flex items-center gap-2 mb-6">
        <ShoppingCart className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-bold">{summaryLabel}</h2>
      </div>

      {cartItems.length === 0 ? (
        <div className="text-center py-8">
          <ShoppingCart className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
          <p className="text-sm text-muted-foreground mb-2">{emptyCartLabel}</p>
          <p className="text-xs text-muted-foreground">{selectTicketsLabel}</p>
        </div>
      ) : (
        <>
          {/* Lista de items */}
          <div className="space-y-4 mb-6">
            {cartItems.map((item: any, index: number) => (
              <div key={index} className="flex justify-between items-start pb-4 border-b border-border">
                <div>
                  <p className="font-semibold text-sm">{item.zoneName}</p>
                  <p className="text-xs text-muted-foreground">
                    {item.quantity}x {formatCurrency(item.price, config.currency, locale)}
                  </p>
                </div>
                <p className="font-bold">
                  {formatCurrency(item.price * item.quantity, config.currency, locale)}
                </p>
              </div>
            ))}
          </div>

          {/* Total */}
          <div className="flex justify-between items-center mb-6 pt-4 border-t-2 border-border">
            <p className="text-lg font-bold">{totalLabel}</p>
            <p className="text-2xl font-bold text-primary">
              {formatCurrency(total, config.currency, locale)}
            </p>
          </div>

          {/* Botón continuar */}
          <Link
            href={`/${countrySlug}/${config.ticketsSlug}/checkout`}
            className="block w-full px-6 py-4 bg-primary text-primary-foreground rounded-md font-medium hover:bg-primary/90 transition-colors text-center"
          >
            {continueLabel}
          </Link>
        </>
      )}

      {/* Info adicional */}
      <div className="mt-6 pt-6 border-t border-border">
        <p className="text-xs text-muted-foreground text-center">
          {language === 'pt'
            ? '✓ Compra 100% segura'
            : '✓ Compra 100% segura'}
        </p>
        <p className="text-xs text-muted-foreground text-center mt-1">
          {language === 'pt'
            ? '✓ Ingressos enviados por e-mail'
            : '✓ Entradas enviadas por email'}
        </p>
      </div>
    </div>
  )
}
