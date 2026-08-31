'use client'

import { motion } from 'framer-motion'
import { Sparkles, TrendingUp, Bell } from 'lucide-react'

export function BlogHero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-20">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-orange-500/10" />
        <motion.div
          className="absolute top-20 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full filter blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-20 right-1/4 w-96 h-96 bg-pink-500/20 rounded-full filter blur-3xl"
          animate={{
            x: [0, -50, 0],
            y: [0, -30, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-sm border border-white/10 mb-6"
          >
            <Sparkles className="w-4 h-4 text-purple-500" />
            <span className="text-sm font-semibold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Actualizado Diariamente
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight"
          >
            <span className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 dark:from-white dark:via-gray-100 dark:to-white bg-clip-text text-transparent">
              Blog
            </span>
            <br />
            <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent">
              Bruno Mars LATAM
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed max-w-2xl mx-auto"
          >
            Noticias exclusivas, guías completas y toda la información sobre{' '}
            <span className="font-semibold text-foreground">The Romantic Tour 2027</span>
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-6 md:gap-8"
          >
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <div className="text-left">
                <div className="text-2xl font-bold">1</div>
                <div className="text-xs text-muted-foreground">Artículo</div>
              </div>
            </div>

            <div className="w-px h-10 bg-border" />

            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-orange-500 flex items-center justify-center">
                <Bell className="w-5 h-5 text-white" />
              </div>
              <div className="text-left">
                <div className="text-2xl font-bold">5</div>
                <div className="text-xs text-muted-foreground">Países</div>
              </div>
            </div>

            <div className="w-px h-10 bg-border" />

            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-xl">
                🎤
              </div>
              <div className="text-left">
                <div className="text-2xl font-bold">2027</div>
                <div className="text-xs text-muted-foreground">Año del Tour</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
