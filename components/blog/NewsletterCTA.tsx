'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, CheckCircle2, ArrowRight } from 'lucide-react'

export function NewsletterCTA() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    // Simular envío
    await new Promise(resolve => setTimeout(resolve, 1500))
    setStatus('success')
    setEmail('')

    // Reset después de 3 segundos
    setTimeout(() => setStatus('idle'), 3000)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="mt-20"
    >
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 p-1">
        {/* Animated background */}
        <div className="absolute inset-0 opacity-50">
          <motion.div
            className="absolute top-0 left-1/4 w-96 h-96 bg-white/20 rounded-full filter blur-3xl"
            animate={{
              x: [0, 100, 0],
              y: [0, 50, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </div>

        <div className="relative bg-card/95 backdrop-blur-sm rounded-3xl p-8 md:p-12">
          <div className="max-w-3xl mx-auto text-center">
            {/* Icon */}
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 mb-6 shadow-lg">
              <Mail className="w-8 h-8 text-white" />
            </div>

            {/* Title */}
            <h2 className="text-3xl md:text-4xl font-black mb-4">
              No te pierdas ninguna{' '}
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                novedad
              </span>
            </h2>

            {/* Description */}
            <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
              Suscríbete al newsletter y recibe las últimas noticias, preventa exclusivas y contenido especial del tour.
            </p>

            {/* Form */}
            {status === 'success' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center justify-center gap-3 text-green-600 dark:text-green-400"
              >
                <CheckCircle2 className="w-6 h-6" />
                <span className="font-semibold">¡Suscripción exitosa! Revisa tu email.</span>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@email.com"
                  required
                  disabled={status === 'loading'}
                  className="flex-1 h-14 px-6 rounded-full bg-background border border-border focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="group h-14 px-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {status === 'loading' ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      Suscribirse
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>
            )}

            {/* Privacy note */}
            <p className="mt-4 text-xs text-muted-foreground">
              🔒 Tu privacidad es importante. No compartimos tu información.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
