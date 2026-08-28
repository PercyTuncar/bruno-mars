'use client'

/**
 * Liquid Blob - Formas líquidas animadas
 * Efecto de gota de agua con morphing
 */

export function LiquidBlob({
  color = 'primary',
  size = 'lg',
  className = '',
}: {
  color?: 'primary' | 'accent' | 'muted'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}) {
  const sizeClasses = {
    sm: 'w-32 h-32',
    md: 'w-48 h-48',
    lg: 'w-64 h-64',
    xl: 'w-96 h-96',
  }

  const colorClasses = {
    primary: 'bg-primary/20',
    accent: 'bg-accent/20',
    muted: 'bg-muted/20',
  }

  return (
    <div
      className={`liquid-blob ${sizeClasses[size]} ${colorClasses[color]} ${className}`}
      style={{
        filter: 'blur(40px)',
      }}
    />
  )
}

/**
 * Animated Gradient Blob
 */
export function GradientBlob({
  className = '',
}: {
  className?: string
}) {
  return (
    <div
      className={`absolute liquid-blob ${className}`}
      style={{
        background: 'linear-gradient(45deg, rgba(179, 18, 46, 0.3), rgba(225, 29, 72, 0.2))',
        filter: 'blur(60px)',
      }}
    />
  )
}
