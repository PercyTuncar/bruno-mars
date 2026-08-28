'use client'

/**
 * ZoneCard mejorada con diseño visual avanzado
 * - Mejor jerarquía visual
 * - Animaciones sutiles
 * - Estados claros
 */

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Minus, Users, MapPin } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ZoneCardProps {
  zone: {
    id: string
    name: string
    price: number
    currency: string
    category: string
    available: boolean
    description?: string
  }
  onQuantityChange?: (zoneId: string, quantity: number) => void
}

export function ZoneCard({ zone, onQuantityChange }: ZoneCardProps) {
  const [quantity, setQuantity] = useState(0)
  const maxQuantity = 6

  const handleIncrease = () => {
    if (quantity < maxQuantity && zone.available) {
      const newQuantity = quantity + 1
      setQuantity(newQuantity)
      onQuantityChange?.(zone.id, newQuantity)
    }
  }

  const handleDecrease = () => {
    if (quantity > 0) {
      const newQuantity = quantity - 1
      setQuantity(newQuantity)
      onQuantityChange?.(zone.id, newQuantity)
    }
  }

  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat('es', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'numerada':
        return 'bg-blue-500/10 text-blue-500 border-blue-500/20'
      case 'stand up':
        return 'bg-purple-500/10 text-purple-500 border-purple-500/20'
      default:
        return 'bg-muted text-muted-foreground'
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
      className={cn(
        'group relative overflow-hidden rounded-2xl border-2 transition-all duration-300',
        zone.available
          ? 'glass hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/20'
          : 'opacity-60 cursor-not-allowed border-border/50'
      )}
    >
      {/* Gradient overlay sutil */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="relative p-6">
        {/* Header con categoría */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="h-4 w-4 text-primary" />
              <span
                className={cn(
                  'px-2 py-1 rounded-md text-xs font-medium border',
                  getCategoryColor(zone.category)
                )}
              >
                {zone.category}
              </span>
            </div>
            <h3 className="text-2xl font-serif font-bold mb-1 group-hover:text-primary transition-colors">
              {zone.name}
            </h3>
            {zone.description && (
              <p className="text-sm text-muted-foreground line-clamp-2">
                {zone.description}
              </p>
            )}
          </div>

          {!zone.available && (
            <span className="px-3 py-1 bg-destructive/10 text-destructive text-xs font-semibold rounded-full border border-destructive/20">
              Agotado
            </span>
          )}
        </div>

        {/* Precio destacado */}
        <div className="mb-6">
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold text-primary">
              {formatPrice(zone.price, zone.currency)}
            </span>
            <span className="text-sm text-muted-foreground">por entrada</span>
          </div>
        </div>

        {/* Selector de cantidad */}
        <div className="space-y-4">
          {zone.available ? (
            <>
              <div className="flex items-center justify-between gap-4">
                <span className="text-sm font-medium text-muted-foreground">
                  Cantidad
                </span>
                <div className="flex items-center gap-3">
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={handleDecrease}
                    disabled={quantity === 0}
                    className={cn(
                      'h-10 w-10 rounded-xl flex items-center justify-center font-bold transition-all',
                      quantity === 0
                        ? 'bg-muted text-muted-foreground cursor-not-allowed'
                        : 'bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground'
                    )}
                    aria-label="Disminuir cantidad"
                  >
                    <Minus className="h-5 w-5" />
                  </motion.button>

                  <div className="w-16 text-center">
                    <span className="text-2xl font-bold font-mono">
                      {quantity}
                    </span>
                  </div>

                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={handleIncrease}
                    disabled={quantity >= maxQuantity}
                    className={cn(
                      'h-10 w-10 rounded-xl flex items-center justify-center font-bold transition-all',
                      quantity >= maxQuantity
                        ? 'bg-muted text-muted-foreground cursor-not-allowed'
                        : 'bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground'
                    )}
                    aria-label="Aumentar cantidad"
                  >
                    <Plus className="h-5 w-5" />
                  </motion.button>
                </div>
              </div>

              {/* Límite de entradas */}
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Users className="h-3 w-3" />
                <span>Máximo {maxQuantity} entradas por compra</span>
              </div>

              {/* Total si hay cantidad */}
              {quantity > 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="pt-4 border-t"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Subtotal</span>
                    <span className="text-xl font-bold text-primary">
                      {formatPrice(zone.price * quantity, zone.currency)}
                    </span>
                  </div>
                </motion.div>
              )}
            </>
          ) : (
            <div className="text-center py-4 text-sm text-muted-foreground">
              Esta zona está agotada
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}
