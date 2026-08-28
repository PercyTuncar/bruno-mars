'use client'

import { useEffect, useState } from 'react'
import { X } from 'lucide-react'
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
    title: 'Junte-se ao nosso grupo do WhatsApp',
    subtitle: `Receba atualizações exclusivas sobre o show do Bruno Mars no ${countryName}`,
    button: 'Entrar no Grupo',
    later: 'Agora não',
  } : {
    title: 'Únete a nuestro grupo de WhatsApp',
    subtitle: `Recibe actualizaciones exclusivas sobre el show de Bruno Mars en ${countryName}`,
    button: 'Unirme al Grupo',
    later: 'Ahora no',
  }

  useEffect(() => {
    // Mostrar el modal después de 2 segundos SIEMPRE (sin localStorage)
    console.log('WhatsApp Modal - País:', countrySlug)
    console.log('WhatsApp Modal - URL:', whatsappUrl)
    console.log('WhatsApp Modal - Programando apertura en 2 segundos...')

    const timer = setTimeout(() => {
      console.log('WhatsApp Modal - Abriendo modal!')
      setIsOpen(true)
    }, 2000)

    return () => clearTimeout(timer)
  }, [countrySlug, whatsappUrl])

  const handleClose = () => {
    setIsClosing(true)
    setTimeout(() => {
      setIsOpen(false)
      setIsClosing(false)
      // NO guardar en localStorage - el modal siempre se mostrará
    }, 200)
  }

  const handleJoinClick = () => {
    // NO guardar en localStorage - el modal siempre se mostrará
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
          className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-full transition-colors z-10"
          aria-label="Cerrar"
        >
          <X className="h-5 w-5 text-white/70" />
        </button>

        {/* Header con gradiente */}
        <div className="relative overflow-hidden rounded-t-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 via-green-400/20 to-green-600/20" />
          <div className="relative px-6 pt-8 pb-6 text-center">
            {/* WhatsApp icon real con SVG */}
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#25D366] shadow-lg shadow-green-500/50 mb-4">
              <svg viewBox="0 0 32 32" className="h-12 w-12 fill-white">
                <path d="M27.281 4.65C24.351 1.656 20.381 0 16.105 0h-.028C7.321 0 .203 7.118.203 15.902c0 2.801.733 5.535 2.127 7.948L.117 32l8.355-2.193c2.315 1.263 4.92 1.93 7.573 1.93h.007c8.777 0 15.902-7.118 15.902-15.902 0-4.248-1.652-8.239-4.673-11.235zm-11.176 24.42c-2.368 0-4.689-.637-6.71-1.837l-.482-.286-4.998 1.31 1.333-4.872-.314-.499c-1.319-2.095-2.014-4.515-2.014-7.018 0-7.258 5.905-13.164 13.164-13.164 3.516 0 6.817 1.37 9.295 3.86 2.478 2.489 3.841 5.797 3.841 9.313-.001 7.258-5.905 13.163-13.115 13.163zm7.214-9.848c-.395-.197-2.343-1.156-2.707-1.288-.364-.132-.628-.197-.892.197-.264.395-1.024 1.288-1.256 1.553-.232.264-.463.297-.858.099-.395-.197-1.669-.615-3.178-1.96-1.175-1.047-1.968-2.34-2.199-2.735-.232-.395-.025-.608.173-.805.177-.177.395-.463.593-.694.197-.232.264-.395.395-.66.132-.264.066-.495-.033-.693-.099-.198-.892-2.152-1.223-2.947-.321-.777-.647-.671-.892-.684-.232-.013-.495-.013-.759-.013s-.694.099-1.057.495c-.364.395-1.387 1.355-1.387 3.309s1.42 3.838 1.617 4.103c.197.264 2.786 4.256 6.751 5.968.943.407 1.679.65 2.252.832.946.3 1.805.257 2.486.156.758-.113 2.343-.958 2.673-1.882.33-.924.33-1.717.232-1.882-.099-.165-.363-.264-.759-.462z"/>
              </svg>
            </div>

            <h2 className="text-2xl font-black text-white mb-2">
              {content.title}
            </h2>
            <p className="text-sm text-white/80 leading-relaxed">
              {content.subtitle}
            </p>
          </div>
        </div>

        {/* Body */}
        <div className="px-6 py-6">
          {/* Buttons */}
          <div className="space-y-3">
            <button
              onClick={handleJoinClick}
              className="w-full flex items-center justify-center gap-2 h-12 px-6 bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-xl font-bold text-base shadow-lg shadow-green-500/30 hover:shadow-green-500/50 transition-all hover:scale-105"
            >
              <svg viewBox="0 0 32 32" className="h-5 w-5 fill-white">
                <path d="M27.281 4.65C24.351 1.656 20.381 0 16.105 0h-.028C7.321 0 .203 7.118.203 15.902c0 2.801.733 5.535 2.127 7.948L.117 32l8.355-2.193c2.315 1.263 4.92 1.93 7.573 1.93h.007c8.777 0 15.902-7.118 15.902-15.902 0-4.248-1.652-8.239-4.673-11.235zm-11.176 24.42c-2.368 0-4.689-.637-6.71-1.837l-.482-.286-4.998 1.31 1.333-4.872-.314-.499c-1.319-2.095-2.014-4.515-2.014-7.018 0-7.258 5.905-13.164 13.164-13.164 3.516 0 6.817 1.37 9.295 3.86 2.478 2.489 3.841 5.797 3.841 9.313-.001 7.258-5.905 13.163-13.115 13.163zm7.214-9.848c-.395-.197-2.343-1.156-2.707-1.288-.364-.132-.628-.197-.892.197-.264.395-1.024 1.288-1.256 1.553-.232.264-.463.297-.858.099-.395-.197-1.669-.615-3.178-1.96-1.175-1.047-1.968-2.34-2.199-2.735-.232-.395-.025-.608.173-.805.177-.177.395-.463.593-.694.197-.232.264-.395.395-.66.132-.264.066-.495-.033-.693-.099-.198-.892-2.152-1.223-2.947-.321-.777-.647-.671-.892-.684-.232-.013-.495-.013-.759-.013s-.694.099-1.057.495c-.364.395-1.387 1.355-1.387 3.309s1.42 3.838 1.617 4.103c.197.264 2.786 4.256 6.751 5.968.943.407 1.679.65 2.252.832.946.3 1.805.257 2.486.156.758-.113 2.343-.958 2.673-1.882.33-.924.33-1.717.232-1.882-.099-.165-.363-.264-.759-.462z"/>
              </svg>
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
      </div>
    </div>
  )
}
