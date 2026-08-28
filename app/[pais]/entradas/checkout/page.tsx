'use client'

/**
 * Checkout Page - Wizard de 3 pasos profesional
 * Paso 1: Datos personales
 * Paso 2: Método de pago
 * Paso 3: Confirmación
 */

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { Navbar } from '@/components/layout/Navbar'
import { CheckCircle2, User, CreditCard, ShieldCheck, ArrowRight, ArrowLeft, Clock } from 'lucide-react'

const STEPS = [
  { id: 1, name: 'Datos', icon: User },
  { id: 2, name: 'Pago', icon: CreditCard },
  { id: 3, name: 'Confirmación', icon: ShieldCheck },
]

function CheckoutContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [timeLeft, setTimeLeft] = useState(600) // 10 minutos

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

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const [formData, setFormData] = useState({
    // Paso 1
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dni: '',

    // Paso 2
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
  })

  const handleNext = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1)
  }

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-b from-background to-muted">
        {/* Progress Bar */}
        <div className="bg-white dark:bg-card border-b sticky top-[90px] z-40">
          <div className="max-w-7xl mx-auto px-6 lg:px-20 py-6">
            <div className="flex items-center justify-between">
              {/* Steps */}
              <div className="flex items-center gap-4">
                {STEPS.map((step, index) => (
                  <div key={step.id} className="flex items-center gap-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center font-bold transition-all ${
                          currentStep >= step.id
                            ? 'bg-primary text-white'
                            : 'bg-muted text-muted-foreground'
                        }`}
                      >
                        {currentStep > step.id ? (
                          <CheckCircle2 className="h-6 w-6" />
                        ) : (
                          <step.icon className="h-6 w-6" />
                        )}
                      </div>
                      <div className={`hidden md:block ${currentStep >= step.id ? 'text-foreground' : 'text-muted-foreground'}`}>
                        <div className="text-xs font-medium">Paso {step.id}</div>
                        <div className="font-bold">{step.name}</div>
                      </div>
                    </div>
                    {index < STEPS.length - 1 && (
                      <div
                        className={`hidden md:block w-16 h-1 rounded-full transition-all ${
                          currentStep > step.id ? 'bg-primary' : 'bg-muted'
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>

              {/* Timer */}
              <div className="flex items-center gap-2 px-4 py-2 bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 rounded-lg border border-amber-200 dark:border-amber-800">
                <Clock className="h-4 w-4" />
                <span className="font-mono font-bold">{formatTime(timeLeft)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-6 lg:px-20 py-12">
          <div className="grid lg:grid-cols-[1fr_400px] gap-12">
            {/* Form */}
            <div className="bg-white dark:bg-card p-8 lg:p-12 rounded-2xl border border-border/50 shadow-sm">
              {/* Step 1: Datos */}
              {currentStep === 1 && (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-3xl font-serif font-bold mb-2">Datos Personales</h2>
                    <p className="text-muted-foreground">
                      Ingresa tus datos para recibir las entradas
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Nombre</label>
                      <input
                        type="text"
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        className="w-full h-12 px-4 rounded-xl border border-border/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                        placeholder="Juan"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Apellido</label>
                      <input
                        type="text"
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        className="w-full h-12 px-4 rounded-xl border border-border/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                        placeholder="Pérez"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full h-12 px-4 rounded-xl border border-border/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                      placeholder="juan@ejemplo.com"
                    />
                    <p className="text-xs text-muted-foreground mt-2">
                      Recibirás tus entradas por email
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Teléfono</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full h-12 px-4 rounded-xl border border-border/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                        placeholder="+51 999 999 999"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">DNI/Documento</label>
                      <input
                        type="text"
                        value={formData.dni}
                        onChange={(e) => setFormData({ ...formData, dni: e.target.value })}
                        className="w-full h-12 px-4 rounded-xl border border-border/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                        placeholder="12345678"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Pago */}
              {currentStep === 2 && (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-3xl font-serif font-bold mb-2">Método de Pago</h2>
                    <p className="text-muted-foreground">
                      Ingresa los datos de tu tarjeta
                    </p>
                  </div>

                  {/* Payment Methods */}
                  <div className="flex gap-3">
                    {['visa', 'mastercard', 'amex'].map((card) => (
                      <div
                        key={card}
                        className="flex-1 h-16 border-2 border-primary bg-primary/5 rounded-xl flex items-center justify-center cursor-pointer hover:bg-primary/10 transition-all"
                      >
                        <span className="font-bold uppercase text-sm">{card}</span>
                      </div>
                    ))}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Número de Tarjeta</label>
                    <input
                      type="text"
                      value={formData.cardNumber}
                      onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                      className="w-full h-12 px-4 rounded-xl border border-border/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-mono"
                      placeholder="4532 1234 5678 9010"
                      maxLength={19}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Nombre en la Tarjeta</label>
                    <input
                      type="text"
                      value={formData.cardName}
                      onChange={(e) => setFormData({ ...formData, cardName: e.target.value })}
                      className="w-full h-12 px-4 rounded-xl border border-border/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all uppercase"
                      placeholder="JUAN PEREZ"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Vencimiento</label>
                      <input
                        type="text"
                        value={formData.expiryDate}
                        onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                        className="w-full h-12 px-4 rounded-xl border border-border/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-mono"
                        placeholder="MM/AA"
                        maxLength={5}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">CVV</label>
                      <input
                        type="text"
                        value={formData.cvv}
                        onChange={(e) => setFormData({ ...formData, cvv: e.target.value })}
                        className="w-full h-12 px-4 rounded-xl border border-border/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-mono"
                        placeholder="123"
                        maxLength={4}
                      />
                    </div>
                  </div>

                  <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 p-4 rounded-xl flex items-start gap-3">
                    <ShieldCheck className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-blue-900 dark:text-blue-100">
                      <div className="font-bold mb-1">Pago 100% Seguro</div>
                      <div>Tus datos están encriptados con SSL de 256 bits</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Confirmación */}
              {currentStep === 3 && (
                <div className="space-y-8 text-center py-12">
                  <div className="w-20 h-20 bg-green-100 dark:bg-green-950 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="h-12 w-12 text-green-600" />
                  </div>

                  <div>
                    <h2 className="text-3xl font-serif font-bold mb-2">¡Compra Exitosa!</h2>
                    <p className="text-muted-foreground text-lg">
                      Tus entradas han sido enviadas a tu email
                    </p>
                  </div>

                  <div className="bg-muted/50 p-6 rounded-xl max-w-md mx-auto">
                    <div className="text-sm text-muted-foreground mb-2">Código de confirmación</div>
                    <div className="text-2xl font-mono font-bold">BM-2027-{Math.random().toString(36).substr(2, 6).toUpperCase()}</div>
                  </div>

                  <Link
                    href="/"
                    className="inline-flex items-center gap-2 h-12 px-8 bg-primary text-white rounded-xl font-bold hover:bg-primary/90 transition-all"
                  >
                    Volver al Inicio
                  </Link>
                </div>
              )}

              {/* Navigation Buttons */}
              {currentStep < 3 && (
                <div className="flex items-center justify-between mt-12 pt-8 border-t">
                  {currentStep > 1 ? (
                    <button
                      onClick={handleBack}
                      className="flex items-center gap-2 px-6 py-3 border-2 border-border rounded-xl font-semibold hover:border-primary transition-all"
                    >
                      <ArrowLeft className="h-5 w-5" />
                      Atrás
                    </button>
                  ) : (
                    <div />
                  )}

                  <button
                    onClick={handleNext}
                    className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-primary to-accent text-white rounded-xl font-bold shadow-lift hover:shadow-lift-lg transition-all hover:-translate-y-1"
                  >
                    {currentStep === 2 ? 'Pagar' : 'Continuar'}
                    <ArrowRight className="h-5 w-5" />
                  </button>
                </div>
              )}
            </div>

            {/* Order Summary - Sticky */}
            <div className="lg:sticky lg:top-32 h-fit">
              <div className="bg-white dark:bg-card p-8 rounded-2xl border border-border/50 shadow-sm space-y-6">
                <h3 className="text-2xl font-bold">Resumen del Pedido</h3>

                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Zona VIP (x2)</span>
                    <span className="font-bold">$500.00</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Cargo por servicio</span>
                    <span className="font-bold">$50.00</span>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <div className="flex justify-between items-baseline">
                    <span className="text-lg font-bold">Total</span>
                    <span className="text-4xl font-black text-primary">$550.00</span>
                  </div>
                </div>

                <div className="space-y-3 pt-4 border-t text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                    <span>Entrega inmediata por email</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <ShieldCheck className="h-4 w-4 text-blue-600" />
                    <span>Compra 100% segura</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <CheckoutContent />
    </Suspense>
  )
}
