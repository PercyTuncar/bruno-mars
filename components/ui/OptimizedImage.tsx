/**
 * Componente de imagen optimizada con next/image
 * Wrapper que asegura LCP y lazy loading correcto
 */

import Image from 'next/image'
import type { ImageProps } from 'next/image'

interface OptimizedImageProps extends Omit<ImageProps, 'src'> {
  src: string
  alt: string
  priority?: boolean
  className?: string
}

export function OptimizedImage({
  src,
  alt,
  priority = false,
  className,
  ...props
}: OptimizedImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      priority={priority}
      className={className}
      loading={priority ? 'eager' : 'lazy'}
      quality={85}
      placeholder="blur"
      blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNzAwIiBoZWlnaHQ9IjQ3NSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4="
      {...props}
    />
  )
}
