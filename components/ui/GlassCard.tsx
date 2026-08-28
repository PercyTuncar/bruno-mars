'use client'

/**
 * Glass Card - Card con glassmorphism perfecto
 */

import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface GlassCardProps {
  children: ReactNode
  className?: string
  hover?: boolean
  variant?: 'default' | 'solid' | 'matte'
}

export function GlassCard({
  children,
  className = '',
  hover = true,
  variant = 'default',
}: GlassCardProps) {
  const variants = {
    default: 'glass',
    solid: 'glass-solid',
    matte: 'bg-card shadow-lg',
  }

  return (
    <div
      className={cn(
        'rounded-2xl p-6 border border-border/50',
        variants[variant],
        hover && 'hover-lift cursor-pointer',
        className
      )}
    >
      {children}
    </div>
  )
}
