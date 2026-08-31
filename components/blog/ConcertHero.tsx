'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

interface ConcertHeroProps {
  title: string
  subtitle: string
  image: string
  alt: string
}

export function ConcertHero({ title, subtitle, image, alt }: ConcertHeroProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden rounded-xl mb-10 bg-card border border-border"
    >
      <div className="grid lg:grid-cols-2 gap-8 p-6 lg:p-8">

        {/* Left: Text Content */}
        <div className="flex flex-col justify-center space-y-5">

          {/* Title */}
          <div>
            <h2 className="text-2xl lg:text-3xl font-bold leading-tight text-foreground mb-3">
              {title}
            </h2>
            <p className="text-sm lg:text-base text-muted-foreground">
              {subtitle}
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-3">
            <a
              href="#paises-confirmados-para-la-gira-2027"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-foreground text-background font-semibold text-sm hover:opacity-90 transition-opacity"
            >
              Ver Países
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
            <a
              href="#zonas-y-precios-probables"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-muted hover:bg-muted/80 font-semibold text-sm transition-colors"
            >
              Ver Precios
            </a>
          </div>
        </div>

        {/* Right: Image */}
        <div className="relative">
          <div className="relative aspect-[16/10] rounded-lg overflow-hidden">
            <Image
              src={image}
              alt={alt}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

            {/* Simple overlay text */}
            <div className="absolute bottom-4 left-4">
              <div className="text-white font-bold text-xl drop-shadow-lg">
                Bruno Mars 2027
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
