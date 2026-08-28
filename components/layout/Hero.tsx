'use client'

/**
 * Hero moderno asimétrico (no clásico)
 * - Composición asimétrica con imagen del artista
 * - Tipografía editorial grande superpuesta
 * - Tarjeta glass con cuenta regresiva
 * - Parallax sutil
 */

import { useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, MapPin, Ticket, Clock } from 'lucide-react'

interface HeroProps {
  title: string
  subtitle?: string
  date?: string
  location?: string
  ctaText?: string
  ctaHref?: string
  imageSrc?: string
}

export function Hero({
  title,
  subtitle = 'The Romantic Tour 2027',
  date,
  location,
  ctaText = 'Comprar Entradas',
  ctaHref = '#',
  imageSrc = '/images/hero-placeholder.jpg',
}: HeroProps) {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 500], [0, 150])
  const opacity = useTransform(scrollY, [0, 300], [1, 0])

  return (
    <section className="relative min-h-[85vh] md:min-h-[90vh] overflow-hidden bg-gradient-to-br from-background via-background to-muted">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)',
          backgroundSize: '32px 32px',
        }} />
      </div>

      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[70vh]">
          {/* Columna izquierda: Contenido */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="relative z-10 space-y-8"
            style={{ opacity }}
          >
            {/* Subtitle */}
            {subtitle && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="inline-block"
              >
                <span className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium backdrop-blur-sm border border-primary/20">
                  {subtitle}
                </span>
              </motion.div>
            )}

            {/* Title - Tipografía editorial grande */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold leading-[0.95] tracking-tight"
            >
              {title.split(' ').map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.1, duration: 0.6 }}
                  className="inline-block mr-4 bg-gradient-to-br from-foreground via-foreground to-primary bg-clip-text text-transparent"
                >
                  {word}
                </motion.span>
              ))}
            </motion.h1>

            {/* Info Cards */}
            {(date || location) && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="flex flex-wrap gap-4"
              >
                {date && (
                  <div className="flex items-center gap-2 px-4 py-2 glass rounded-lg">
                    <Calendar className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">{date}</span>
                  </div>
                )}
                {location && (
                  <div className="flex items-center gap-2 px-4 py-2 glass rounded-lg">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">{location}</span>
                  </div>
                )}
              </motion.div>
            )}

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              <Link
                href={ctaHref}
                className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-xl font-semibold text-lg shadow-2xl hover:shadow-primary/50 transition-all duration-300 relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <Ticket className="h-5 w-5" />
                  {ctaText}
                </span>
                <motion.div
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.6 }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                />
              </Link>
            </motion.div>
          </motion.div>

          {/* Columna derecha: Imagen asimétrica + Countdown Card */}
          <motion.div
            style={{ y }}
            className="relative h-[500px] md:h-[600px] lg:h-[700px]"
          >
            {/* Imagen del artista con efecto */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 1 }}
              className="absolute top-0 right-0 w-full h-full"
            >
              <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-primary/20 via-accent/10 to-primary/5">
                {/* Placeholder con gradiente y patrón */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <div className="text-8xl font-serif font-bold text-primary/20">
                      BM
                    </div>
                    <p className="text-muted-foreground/50">Hero Image</p>
                  </div>
                </div>
                {/* Pattern overlay */}
                <div className="absolute inset-0 opacity-10" style={{
                  backgroundImage: 'radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)',
                  backgroundSize: '24px 24px',
                }} />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />
              </div>
            </motion.div>

            {/* Tarjeta flotante con cuenta regresiva */}
            {date && (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="absolute bottom-8 left-0 right-0 md:left-8 md:right-auto md:w-80 z-20"
              >
                <CountdownCard targetDate={date} location={location} />
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Decorative elements */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute top-20 right-20 w-72 h-72 bg-primary rounded-full blur-3xl"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.05 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-20 left-20 w-96 h-96 bg-accent rounded-full blur-3xl"
      />
    </section>
  )
}

/**
 * Tarjeta con cuenta regresiva en vivo
 */
function CountdownCard({ targetDate, location }: { targetDate: string; location?: string }) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const calculateTimeLeft = () => {
      const target = new Date(targetDate).getTime()
      const now = new Date().getTime()
      const difference = target - now

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [targetDate])

  return (
    <div className="glass-solid p-6 rounded-2xl shadow-2xl backdrop-blur-xl">
      <div className="flex items-center gap-2 mb-4">
        <Clock className="h-5 w-5 text-primary" />
        <span className="text-sm font-semibold text-muted-foreground">
          Cuenta Regresiva
        </span>
      </div>

      <div className="grid grid-cols-4 gap-3 mb-4">
        {Object.entries(timeLeft).map(([unit, value]) => (
          <div key={unit} className="text-center">
            <div className="bg-primary/10 rounded-lg p-3 mb-1">
              <span className="text-2xl font-bold font-mono text-primary">
                {value.toString().padStart(2, '0')}
              </span>
            </div>
            <span className="text-xs text-muted-foreground capitalize">
              {unit === 'days' ? 'Días' : unit === 'hours' ? 'Hrs' : unit === 'minutes' ? 'Min' : 'Seg'}
            </span>
          </div>
        ))}
      </div>

      {location && (
        <div className="pt-4 border-t border-border/50">
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium">{location}</span>
          </div>
        </div>
      )}
    </div>
  )
}
