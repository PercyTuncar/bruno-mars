'use client'

/**
 * Checkout Page - Wizard de 3 pasos profesional
 * Paso 1: Datos personales
 * Paso 2: Método de pago
 * Paso 3: Confirmación
 *
 * Soporta rutas dinámicas: /[pais]/entradas/checkout o /[pais]/ingressos/checkout
 */

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import { Navbar } from '@/components/layout/Navbar'
import { CheckCircle2, User, CreditCard, ShieldCheck, ArrowRight, ArrowLeft, Clock, MessageCircle } from 'lucide-react'
import { isValidCountry, type CountrySlug, getCountryConfig } from '@/data/countries.config'
import { getWhatsAppGroupUrl } from '@/data/whatsapp.config'

const STEPS = [
  { id: 1, name: 'Datos', namePt: 'Dados', icon: User },
  { id: 2, name: 'Pago', namePt: 'Pagamento', icon: CreditCard },
  { id: 3, name: 'Confirmación', namePt: 'Confirmação', icon: ShieldCheck },
]

function CheckoutContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const [currentStep, setCurrentStep] = useState(1)
  const [timeLeft, setTimeLeft] = useState(600) // 10 minutos

  // Obtener el país desde la URL
  const countrySlug = pathname.split('/')[1] as CountrySlug
  const isPortuguese = isValidCountry(countrySlug) && getCountryConfig(countrySlug).language === 'pt'
  const whatsappUrl = isValidCountry(countrySlug) ? getWhatsAppGroupUrl(countrySlug) : ''

  // Timer de reserva
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          router.push('/')
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [router])

  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60

  const zoneName = searchParams.get('zone') || 'General'
  const quantity = searchParams.get('quantity') || '1'
  const price = searchParams.get('price') || '0'

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-6">

          {/* Timer de Reserva */}
          <div className="mb-8 p-4 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-amber-600 dark:text-amber-500" />
                <span className="font-semibold text-amber-900 dark:text-amber-100">
                  {isPortuguese ? 'Tempo restante da reserva' : 'Tiempo restante de reserva'}
                </span>
              </div>
              <div className="text-2xl font-black text-amber-700 dark:text-amber-400">
                {minutes}:{seconds.toString().padStart(2, '0')}
              </div>
            </div>
          </div>

          {/* Steps Progress */}
          <div className="mb-12">
            <div className="flex items-center justify-between">
              {STEPS.map((step, idx) => (
                <div key={step.id} className="flex items-center flex-1">
                  <div className="flex flex-col items-center flex-1">
                    <div className={`
                      w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-all
                      ${currentStep >= step.id
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground'
                      }
                    `}>
                      <step.icon className="w-6 h-6" />
                    </div>
                    <span className="text-sm font-semibold">
                      {isPortuguese ? step.namePt : step.name}
                    </span>
                  </div>
                  {idx < STEPS.length - 1 && (
                    <div className={`
                      h-1 flex-1 mx-4 rounded-full transition-all
                      ${currentStep > step.id ? 'bg-primary' : 'bg-muted'}
                    `} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Resumen del Pedido */}
          <div className="mb-8 p-6 rounded-2xl bg-card border border-border shadow-lg">
            <h3 className="text-xl font-bold mb-4">
              {isPortuguese ? 'Resumo do Pedido' : 'Resumen del Pedido'}
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">{isPortuguese ? 'Zona' : 'Zona'}:</span>
                <span className="font-semibold">{zoneName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">{isPortuguese ? 'Quantidade' : 'Cantidad'}:</span>
                <span className="font-semibold">{quantity}</span>
              </div>
              <div className="flex justify-between pt-3 border-t">
                <span className="text-muted-foreground">{isPortuguese ? 'Total' : 'Total'}:</span>
                <span className="text-2xl font-black text-primary">{price}</span>
              </div>
            </div>
          </div>

          {/* WhatsApp CTA */}
          <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border-2 border-green-200 dark:border-green-800">
            <MessageCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h2 className="text-2xl font-black mb-3">
              {isPortuguese ? 'Finalize pelo WhatsApp' : 'Finaliza por WhatsApp'}
            </h2>
            <p className="text-muted-foreground mb-6">
              {isPortuguese
                ? 'Continue o processo de compra de forma rápida e segura através do nosso WhatsApp oficial.'
                : 'Continúa el proceso de compra de forma rápida y segura a través de nuestro WhatsApp oficial.'
              }
            </p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-green-600 text-white font-bold text-lg hover:bg-green-700 transition-all shadow-lg"
            >
              <MessageCircle className="w-6 h-6" />
              {isPortuguese ? 'Continuar no WhatsApp' : 'Continuar en WhatsApp'}
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>

        </div>
      </div>
    </>
  )
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CheckoutContent />
    </Suspense>
  )
}
