'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { MapPin, Calendar, Star, Flame, Zap, CheckCircle2, ArrowRight, Plus, Minus, ShoppingCart, X, Ticket, Clock, Users } from 'lucide-react'
import { formatCurrency } from '@/lib/format-currency'
import type { CountrySlug } from '@/data/countries.config'

interface Zone {
  id: string
  name: string
  price: number
  category: string
  available: boolean
  description?: string
}

interface CartItem {
  zone: Zone
  quantity: number
}

interface TicketsPageClientProps {
  countrySlug: CountrySlug
  config: any
  data: any
  zones: Zone[]
}

export function TicketsPageClient({ countrySlug, config, data, zones }: TicketsPageClientProps) {
  const [cart, setCart] = useState<Record<string, number>>({})

  const availableZones = zones.filter(z => z.available)
  const soldOutZones = zones.filter(z => !z.available)

  // Ordenar por precio ascendente
  const sortedZones = useMemo(() => {
    return [...availableZones].sort((a, b) => a.price - b.price)
  }, [availableZones])

  // Calcular carrito
  const cartItems: CartItem[] = useMemo(() => {
    return Object.entries(cart)
      .filter(([_, qty]) => qty > 0)
      .map(([zoneId, quantity]) => {
        const zone = zones.find(z => z.id === zoneId)!
        return { zone, quantity }
      })
  }, [cart, zones])

  const cartTotal = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + (item.zone.price * item.quantity), 0)
  }, [cartItems])

  const totalTickets = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.quantity, 0)
  }, [cartItems])

  const handleQuantityChange = (zoneId: string, delta: number) => {
    setCart(prev => {
      const current = prev[zoneId] || 0
      const newValue = Math.max(0, Math.min(6, current + delta))

      if (newValue === 0) {
        const { [zoneId]: _, ...rest } = prev
        return rest
      }

      return { ...prev, [zoneId]: newValue }
    })
  }

  const removeFromCart = (zoneId: string) => {
    setCart(prev => {
      const { [zoneId]: _, ...rest } = prev
      return rest
    })
  }

  const clearCart = () => {
    setCart({})
  }

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'numerada':
        return 'bg-blue-500/10 text-blue-500 border-blue-500/20'
      case 'stand_up':
      case 'stand up':
        return 'bg-purple-500/10 text-purple-500 border-purple-500/20'
      default:
        return 'bg-muted text-muted-foreground border-border'
    }
  }

  const getBadge = (zone: Zone, index: number) => {
    if (index === 0) return { icon: Star, text: 'BEST VALUE', color: 'text-primary' }
    if (zone.price < 100) return { icon: Zap, text: 'ECONÓMICO', color: 'text-green-500' }
    return null
  }

  // Construir URL de checkout
  const checkoutUrl = useMemo(() => {
    if (cartItems.length === 0) return '#'
    const params = new URLSearchParams()
    cartItems.forEach(item => {
      params.append('zones', `${item.zone.id}:${item.quantity}`)
    })
    return `/${countrySlug}/entradas/checkout?${params.toString()}`
  }, [cartItems, countrySlug])

  return (
    <>
      {/* Hero Compacto */}
      <section className="bg-black border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-4xl font-black text-white mb-2">
                Entradas Bruno Mars {config.name}
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-sm text-white/60">
                <div className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" />
                  <span>{data.dates[0].dateDisplay}</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1.5">
                  <MapPin className="h-4 w-4" />
                  <span>{data.venue.name}</span>
                </div>
                <span>•</span>
                <span className="text-primary font-bold">{availableZones.length} zonas disponibles</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-green-500/10 text-green-500 rounded-lg border border-green-500/20">
                <CheckCircle2 className="h-4 w-4" />
                <span className="text-xs font-bold">Entrega Garantizada</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-primary/10 text-primary rounded-lg border border-primary/20">
                <Zap className="h-4 w-4" />
                <span className="text-xs font-bold">Compra Segura</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content - 2 COLUMNAS */}
      <section className="py-12 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-[1fr_400px] gap-8">
            {/* Zonas */}
            <div>
              {/* Urgency Banner */}
              <div className="bg-amber-500/10 border border-amber-500/20 p-4 rounded-xl flex items-start gap-3 mb-8">
                <Flame className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-amber-500 text-sm">¡Alta demanda!</div>
                  <div className="text-xs text-amber-500/80">
                    3,847 personas viendo estas entradas. Las mejores zonas se agotan rápido.
                  </div>
                </div>
              </div>

              {/* Section Title */}
              <h2 className="text-2xl font-black mb-6">Elige tu zona</h2>

              {/* Zones Grid */}
              <div className="space-y-4">
                {sortedZones.map((zone, index) => {
                  const quantity = cart[zone.id] || 0
                  const badge = getBadge(zone, index)

                  return (
                    <div
                      key={zone.id}
                      className="group bg-card p-6 rounded-xl border border-border hover:border-primary/50 transition-all relative"
                    >
                      {badge && (
                        <div className="absolute top-6 right-6 flex items-center gap-1 px-2 py-1 bg-black/80 backdrop-blur-sm rounded-md">
                          <badge.icon className={`h-3 w-3 ${badge.color}`} />
                          <span className={`text-xs font-bold ${badge.color}`}>{badge.text}</span>
                        </div>
                      )}

                      <div className="flex flex-col md:flex-row gap-6">
                        {/* Info */}
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-3">
                            <MapPin className="h-4 w-4 text-primary" />
                            <span className={`px-2 py-0.5 rounded text-xs font-bold border ${getCategoryColor(zone.category)}`}>
                              {zone.category.toUpperCase()}
                            </span>
                          </div>

                          <h3 className="text-2xl font-black mb-2 group-hover:text-primary transition-colors">
                            {zone.name}
                          </h3>

                          {zone.description && (
                            <p className="text-sm text-muted-foreground mb-4">{zone.description}</p>
                          )}

                          <div>
                            <div className="text-xs text-muted-foreground mb-1">Precio por entrada</div>
                            <div className="text-4xl font-black text-primary">
                              {formatCurrency(zone.price, config.currency)}
                            </div>
                          </div>
                        </div>

                        {/* Quantity Selector */}
                        <div className="flex flex-col justify-center items-center gap-4 min-w-[180px]">
                          <div className="text-xs text-muted-foreground uppercase tracking-wide">Cantidad</div>
                          <div className="flex items-center gap-4">
                            <button
                              onClick={() => handleQuantityChange(zone.id, -1)}
                              disabled={quantity === 0}
                              className={`h-12 w-12 rounded-lg flex items-center justify-center transition-all ${
                                quantity === 0
                                  ? 'bg-muted text-muted-foreground cursor-not-allowed'
                                  : 'bg-primary/10 text-primary hover:bg-primary hover:text-white'
                              }`}
                            >
                              <Minus className="h-5 w-5" />
                            </button>
                            <span className="text-4xl font-black font-mono w-12 text-center">{quantity}</span>
                            <button
                              onClick={() => handleQuantityChange(zone.id, 1)}
                              disabled={quantity >= 6}
                              className={`h-12 w-12 rounded-lg flex items-center justify-center transition-all ${
                                quantity >= 6
                                  ? 'bg-muted text-muted-foreground cursor-not-allowed'
                                  : 'bg-primary/10 text-primary hover:bg-primary hover:text-white'
                              }`}
                            >
                              <Plus className="h-5 w-5" />
                            </button>
                          </div>
                          <div className="text-xs text-muted-foreground">Máx. 6 por zona</div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Sold Out Zones */}
              {soldOutZones.length > 0 && (
                <div className="mt-12">
                  <h2 className="text-xl font-black text-muted-foreground mb-4">Zonas Agotadas</h2>
                  <div className="space-y-3">
                    {soldOutZones.map((zone) => (
                      <div
                        key={zone.id}
                        className="bg-muted/30 p-4 rounded-xl border border-border/50 opacity-50"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-bold text-sm mb-0.5">{zone.name}</h3>
                            <p className="text-xs text-muted-foreground">{zone.category}</p>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bold line-through text-muted-foreground">
                              {formatCurrency(zone.price, config.currency)}
                            </div>
                            <span className="inline-block mt-1 px-2 py-0.5 bg-red-500/10 text-red-500 rounded text-xs font-bold">
                              AGOTADO
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sticky Cart */}
            <aside className="lg:sticky lg:top-24 self-start">
              <div className="bg-card border border-border rounded-xl overflow-hidden shadow-lg">
                {/* Header */}
                <div className="p-6 border-b border-border bg-muted/30">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <ShoppingCart className="h-5 w-5 text-primary" />
                      <h2 className="text-xl font-black">Resumen de tu compra</h2>
                    </div>
                    {cartItems.length > 0 && (
                      <button
                        onClick={clearCart}
                        className="text-xs text-muted-foreground hover:text-primary transition-colors font-semibold"
                      >
                        Limpiar
                      </button>
                    )}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {totalTickets === 0 ? 'Sin entradas seleccionadas' : `${totalTickets} entrada${totalTickets > 1 ? 's' : ''} seleccionada${totalTickets > 1 ? 's' : ''}`}
                  </div>
                </div>

                {/* Cart Items */}
                <div className="max-h-[450px] overflow-y-auto custom-scrollbar">
                  {cartItems.length === 0 ? (
                    <div className="p-12 text-center">
                      <Ticket className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
                      <p className="text-sm text-muted-foreground font-semibold mb-1">
                        No hay entradas seleccionadas
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Elige una zona y agrega cantidades
                      </p>
                    </div>
                  ) : (
                    <div className="p-6 space-y-4">
                      {cartItems.map(item => (
                        <div key={item.zone.id} className="bg-muted/30 p-4 rounded-lg border border-border">
                          <div className="flex items-start justify-between gap-3 mb-3">
                            <div className="flex-1 min-w-0">
                              <h3 className="font-bold text-sm mb-1">{item.zone.name}</h3>
                              <p className="text-xs text-muted-foreground">
                                {formatCurrency(item.zone.price, config.currency)} × {item.quantity}
                              </p>
                            </div>
                            <button
                              onClick={() => removeFromCart(item.zone.id)}
                              className="flex-shrink-0 h-7 w-7 rounded-md bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all flex items-center justify-center"
                              aria-label="Eliminar zona"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                          <div className="text-lg font-black text-primary">
                            {formatCurrency(item.zone.price * item.quantity, config.currency)}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Footer */}
                {cartItems.length > 0 && (
                  <div className="p-6 border-t border-border bg-muted/30 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-muted-foreground uppercase tracking-wide">Total</span>
                      <span className="text-4xl font-black text-primary">
                        {formatCurrency(cartTotal, config.currency)}
                      </span>
                    </div>

                    <Link
                      href={checkoutUrl}
                      className="flex items-center justify-center gap-2 h-14 px-8 gradient-red text-white rounded-xl font-bold text-lg shadow-glow hover:shadow-glow-lg transition-all hover:scale-105 w-full"
                    >
                      Ir al Checkout
                      <ArrowRight className="h-5 w-5" />
                    </Link>

                    <div className="flex items-center gap-2 text-xs text-muted-foreground justify-center">
                      <CheckCircle2 className="h-3 w-3" />
                      <span>Compra segura y protegida</span>
                    </div>
                  </div>
                )}
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Información Completa del Concierto - DESPUÉS de las zonas */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black mb-4">Todo sobre The Romantic Tour en {config.name}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Descubre qué te espera en el concierto más esperado del año
            </p>
          </div>

          {/* El Show */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-card p-8 rounded-xl border border-border">
              <h3 className="text-2xl font-black mb-4">El Espectáculo</h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Bruno Mars trae <strong>The Romantic Tour</strong> a {config.name} con más de <strong>2 horas</strong> del mejor
                espectáculo en vivo. Primera gira mundial en casi una década, y la primera vez que se presenta en estadios a nivel global.
              </p>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Zap className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <div className="font-bold text-sm mb-1">Producción Masiva</div>
                    <div className="text-xs text-muted-foreground">Fuegos artificiales, pirotecnia, confetti y efectos especiales de última generación</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Users className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <div className="font-bold text-sm mb-1">The Hooligans en Vivo</div>
                    <div className="text-xs text-muted-foreground">Banda completa con músicos de clase mundial y coreografías sincronizadas</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Star className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <div className="font-bold text-sm mb-1">Showmanship Legendario</div>
                    <div className="text-xs text-muted-foreground">"El mejor showman vivo" según Rolling Stone</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-card p-8 rounded-xl border border-border">
              <h3 className="text-2xl font-black mb-4">Información del Evento</h3>
              <div className="space-y-4">
                <div className="p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="h-4 w-4 text-primary" />
                    <div className="text-xs text-muted-foreground uppercase tracking-wide">Fecha</div>
                  </div>
                  <div className="font-black text-lg">{data.dates[0].dateDisplay}</div>
                </div>
                <div className="p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="h-4 w-4 text-primary" />
                    <div className="text-xs text-muted-foreground uppercase tracking-wide">Apertura de Puertas</div>
                  </div>
                  <div className="font-black text-lg">{data.dates[0].time}</div>
                </div>
                <div className="p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="h-4 w-4 text-primary" />
                    <div className="text-xs text-muted-foreground uppercase tracking-wide">Venue</div>
                  </div>
                  <div className="font-black text-lg">{data.venue.name}</div>
                  <div className="text-sm text-muted-foreground">{data.venue.address.city}</div>
                </div>
                <div className="p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="h-4 w-4 text-primary" />
                    <div className="text-xs text-muted-foreground uppercase tracking-wide">Duración</div>
                  </div>
                  <div className="font-black text-lg">+2 horas</div>
                </div>
              </div>
            </div>
          </div>

          {/* Setlist Completo */}
          <div className="bg-card p-8 rounded-xl border border-border mb-12">
            <h3 className="text-3xl font-black mb-6">Canciones Confirmadas</h3>
            <p className="text-muted-foreground mb-8">
              El setlist incluye más de 20 canciones con hits de todos sus álbumes, desde los clásicos románticos
              hasta el funk explosivo de 24K Magic, más canciones nuevas del álbum "The Romantic".
            </p>
            <div className="grid md:grid-cols-4 gap-6">
              <div>
                <div className="font-bold text-sm text-primary uppercase tracking-wide mb-4">Clásicos Románticos</div>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Just the Way You Are</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Grenade</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Marry You</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>When I Was Your Man</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>It Will Rain</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Talking to the Moon</span>
                  </li>
                </ul>
              </div>
              <div>
                <div className="font-bold text-sm text-primary uppercase tracking-wide mb-4">Era 24K Magic</div>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>24K Magic</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>That's What I Like</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Perm</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Treasure</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Locked Out of Heaven</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Runaway Baby</span>
                  </li>
                </ul>
              </div>
              <div>
                <div className="font-bold text-sm text-primary uppercase tracking-wide mb-4">Colaboraciones</div>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Uptown Funk (con Mark Ronson)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Leave the Door Open (Silk Sonic)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Low Rider Medley</span>
                  </li>
                </ul>
              </div>
              <div>
                <div className="font-bold text-sm text-primary uppercase tracking-wide mb-4">The Romantic (2026)</div>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>I Just Might</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Risk It All</span>
                  </li>
                  <li className="flex items-start gap-2 text-muted-foreground italic">
                    <span className="text-primary mt-1">•</span>
                    <span>Más sorpresas en vivo</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section para SEO */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-black mb-8 text-center">Preguntas Frecuentes</h2>

          <div className="space-y-4">
            <details className="bg-card p-6 rounded-xl border border-border group">
              <summary className="font-bold cursor-pointer list-none flex items-center justify-between">
                <span>¿Cuánto dura el concierto de Bruno Mars?</span>
                <ArrowRight className="h-4 w-4 text-muted-foreground group-open:rotate-90 transition-transform" />
              </summary>
              <p className="text-sm text-muted-foreground mt-4 leading-relaxed">
                El concierto de Bruno Mars en {config.name} dura más de 2 horas. El show incluye más de 20 canciones,
                desde sus clásicos como "Just the Way You Are" hasta los éxitos de 24K Magic y canciones nuevas del álbum "The Romantic".
              </p>
            </details>

            <details className="bg-card p-6 rounded-xl border border-border group">
              <summary className="font-bold cursor-pointer list-none flex items-center justify-between">
                <span>¿A qué hora abren las puertas?</span>
                <ArrowRight className="h-4 w-4 text-muted-foreground group-open:rotate-90 transition-transform" />
              </summary>
              <p className="text-sm text-muted-foreground mt-4 leading-relaxed">
                Las puertas del {data.venue.name} abren a las {data.dates[0].time}. Te recomendamos llegar con anticipación
                para evitar filas y disfrutar del ambiente pre-show.
              </p>
            </details>

            <details className="bg-card p-6 rounded-xl border border-border group">
              <summary className="font-bold cursor-pointer list-none flex items-center justify-between">
                <span>¿Qué canciones va a cantar Bruno Mars?</span>
                <ArrowRight className="h-4 w-4 text-muted-foreground group-open:rotate-90 transition-transform" />
              </summary>
              <div className="text-sm text-muted-foreground mt-4 leading-relaxed">
                <p className="mb-2">El setlist confirmado de The Romantic Tour incluye:</p>
                <ul className="space-y-1 ml-4">
                  <li>• Hits clásicos: "Just the Way You Are", "Grenade", "Marry You"</li>
                  <li>• 24K Magic: "24K Magic", "That's What I Like", "Perm"</li>
                  <li>• Colaboraciones: "Uptown Funk", "Leave the Door Open"</li>
                  <li>• Nuevas canciones: "I Just Might", "Risk It All"</li>
                  <li>• Y más sorpresas durante el show</li>
                </ul>
              </div>
            </details>

            <details className="bg-card p-6 rounded-xl border border-border group">
              <summary className="font-bold cursor-pointer list-none flex items-center justify-between">
                <span>¿Qué incluye la producción del show?</span>
                <ArrowRight className="h-4 w-4 text-muted-foreground group-open:rotate-90 transition-transform" />
              </summary>
              <p className="text-sm text-muted-foreground mt-4 leading-relaxed">
                The Romantic Tour cuenta con una producción de clase mundial: fuegos artificiales, pirotecnia masiva,
                confetti, efectos especiales, la banda completa The Hooligans en vivo, coreografías elaboradas y
                un escenario espectacular adaptado para estadios.
              </p>
            </details>

            <details className="bg-card p-6 rounded-xl border border-border group">
              <summary className="font-bold cursor-pointer list-none flex items-center justify-between">
                <span>¿Cuántas entradas puedo comprar?</span>
                <ArrowRight className="h-4 w-4 text-muted-foreground group-open:rotate-90 transition-transform" />
              </summary>
              <p className="text-sm text-muted-foreground mt-4 leading-relaxed">
                Puedes comprar hasta 6 entradas por zona. Selecciona las zonas que prefieras, elige la cantidad
                y todas se agregarán a tu carrito para proceder al checkout con una sola compra.
              </p>
            </details>

            <details className="bg-card p-6 rounded-xl border border-border group">
              <summary className="font-bold cursor-pointer list-none flex items-center justify-between">
                <span>¿Las entradas son con asientos numerados?</span>
                <ArrowRight className="h-4 w-4 text-muted-foreground group-open:rotate-90 transition-transform" />
              </summary>
              <p className="text-sm text-muted-foreground mt-4 leading-relaxed">
                Depende de la zona. Las zonas marcadas como "Numerada" incluyen asientos específicos asignados.
                Las zonas "Stand Up" son de pie, sin asientos asignados. Revisa los detalles de cada zona antes de comprar.
              </p>
            </details>
          </div>
        </div>
      </section>

      <footer className="border-t py-8 bg-card/30">
        <div className="max-w-7xl mx-auto px-6 text-center text-xs text-muted-foreground">
          <p>&copy; 2027 Bruno Mars LATAM</p>
        </div>
      </footer>
    </>
  )
}
