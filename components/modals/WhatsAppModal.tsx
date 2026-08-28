'use client'

import { useEffect, useState } from 'react'
import { X, MessageCircle, Users, Bell, Zap } from 'lucide-react'
import type { CountrySlug } from '@/data/countries.config'
import { getWhatsAppGroupUrl } from '@/data/whatsapp.config'

interface WhatsAppModalProps {
  countrySlug: CountrySlug
  countryName: string
  language: 'es' | 'pt'
}

export function WhatsAppModal({ countrySlug, countryName, language }: WhatsAppModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isClosing, setIsClosing] = useState(false)

  const whatsappUrl = getWhatsAppGroupUrl(countrySlug)

  // Textos por idioma
  const content = language === 'pt' ? {
    title: 'Junte-se ao Grupo VIP',
    subtitle: `Comunidade oficial de fãs do Bruno Mars no ${countryName}`,
    benefits: [
      { icon: Bell, text: 'Atualizações em primeira mão' },
      { icon: Zap, text: 'Promoções exclusivas' },
      { icon: Users, text: 'Conecte-se com outros fãs' },
    ],
    button: 'Entrar no Grupo',
    later: 'Talvez depois',
  } : {
    title: 'Únete al Grupo VIP',
    subtitle: `Comunidad oficial de fans de Bruno Mars en ${countryName}`,
    benefits: [
      { icon: Bell, text: 'Actualizaciones de primera mano' },
      { icon: Zap, text: 'Promociones exclusivas' },
      { icon: Users, text: 'Conecta con otros fans' },
    ],
    button: 'Unirme al Grupo',
    later: 'Tal vez después',
  }

  useEffect(() => {
    // Mostrar el modal después de 5 segundos si no se ha cerrado antes
    const hasSeenModal = localStorage.getItem(`whatsapp-modal-${countrySlug}`)

    if (!hasSeenModal) {
      const timer = setTimeout(() => {
        setIsOpen(true)
      }, 5000)

      return () => clearTimeout(timer)
    }
  }, [countrySlug])

  const handleClose = () => {
    setIsClosing(true)
    setTimeout(() => {
      setIsOpen(false)
      setIsClosing(false)
      localStorage.setItem(`whatsapp-modal-${countrySlug}`, 'true')
    }, 200)
  }

  const handleJoinClick = () => {
    localStorage.setItem(`whatsapp-modal-${countrySlug}`, 'true')
    window.open(whatsappUrl, '_blank')
    handleClose()
  }

  if (!isOpen) return null

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity duration-200 ${
        isClosing ? 'opacity-0' : 'opacity-100'
      }`}
      onClick={handleClose}
    >
      <div
        className={`relative w-full max-w-md bg-gradient-to-br from-card via-card to-card/80 border border-border rounded-2xl shadow-2xl transform transition-all duration-200 ${
          isClosing ? 'scale-95 opacity-0' : 'scale-100 opacity-100'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-full transition-colors"
          aria-label="Cerrar"
        >
          <X className="h-5 w-5 text-white/70" />
        </button>

        {/* Header con gradiente */}
        <div className="relative overflow-hidden rounded-t-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 via-primary/20 to-green-600/20" />
          <div className="relative px-6 pt-8 pb-6 text-center">
            {/* WhatsApp icon con efecto glow */}
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500 shadow-lg shadow-green-500/50 mb-4">
              <MessageCircle className="h-8 w-8 text-white fill-white" />
            </div>

            <h2 className="text-2xl font-black text-white mb-2">
              {content.title}
            </h2>
            <p className="text-sm text-white/70">
              {content.subtitle}
            </p>
          </div>
        </div>

        {/* Body */}
        <div className="px-6 py-6">
          {/* Beneficios */}
          <div className="space-y-3 mb-6">
            {content.benefits.map((benefit, index) => {
              const Icon = benefit.icon
              return (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 bg-muted/30 rounded-xl border border-border/50"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <span className="text-sm font-semibold text-white/90">
                    {benefit.text}
                  </span>
                </div>
              )
            })}
          </div>

          {/* Buttons */}
          <div className="space-y-3">
            <button
              onClick={handleJoinClick}
              className="w-full flex items-center justify-center gap-2 h-12 px-6 bg-green-500 hover:bg-green-600 text-white rounded-xl font-bold text-base shadow-lg shadow-green-500/30 hover:shadow-green-500/50 transition-all hover:scale-105"
            >
              <MessageCircle className="h-5 w-5" />
              {content.button}
            </button>

            <button
              onClick={handleClose}
              className="w-full h-10 px-6 text-white/50 hover:text-white/70 text-sm font-medium transition-colors"
            >
              {content.later}
            </button>
          </div>
        </div>

        {/* Footer trust badge */}
        <div className="px-6 pb-6">
          <div className="flex items-center justify-center gap-2 text-xs text-white/40">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span>+1,000 fans activos</span>
          </div>
        </div>
      </div>
    </div>
  )
}
