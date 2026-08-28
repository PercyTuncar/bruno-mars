'use client'

/**
 * Navbar Unificado y Funcional
 * - Mismo en todas las páginas
 * - Búsqueda funcional
 * - Context-aware
 */

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { ThemeToggle } from './ThemeToggle'
import { Search, ShoppingCart, MapPin, Shield } from 'lucide-react'

const COUNTRIES = [
  { slug: 'peru', name: 'Perú' },
  { slug: 'chile', name: 'Chile' },
  { slug: 'argentina', name: 'Argentina' },
  { slug: 'colombia', name: 'Colombia' },
  { slug: 'brasil', name: 'Brasil' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [showResults, setShowResults] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Búsqueda funcional
  const handleSearch = (query: string) => {
    setSearchQuery(query)
    if (query.length < 2) {
      setSearchResults([])
      setShowResults(false)
      return
    }

    const results: any[] = []

    // Buscar países
    COUNTRIES.forEach(country => {
      if (country.name.toLowerCase().includes(query.toLowerCase())) {
        results.push({
          type: 'country',
          title: country.name,
          subtitle: 'Ver fechas y entradas',
          href: `/${country.slug}`,
        })
      }
    })

    // Buscar en blog (simulado - en producción vendría de API)
    if (query.toLowerCase().includes('fecha') || query.toLowerCase().includes('tour')) {
      results.push({
        type: 'blog',
        title: 'Fechas del Tour Anunciadas',
        subtitle: 'Blog',
        href: '/blog/tour-announcement',
      })
    }

    setSearchResults(results)
    setShowResults(results.length > 0)
  }

  return (
    <>
      {/* Top Bar */}
      <div className="bg-primary text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-20">
          <div className="flex items-center justify-between h-10 text-sm">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                <span className="font-medium">Compra 100% Segura</span>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-4 text-xs">
              <span>🔒 SSL Certificado</span>
              <span>✓ Entrega Garantizada</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 dark:bg-card/95 backdrop-blur-xl shadow-sm'
            : 'bg-white dark:bg-card'
        }`}
        style={{ borderBottom: '1px solid rgba(0,0,0,0.06)' }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-20">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg">
                <span className="text-white font-black text-xl">BM</span>
              </div>
              <div className="hidden sm:block">
                <div className="text-xl font-bold leading-tight">Bruno Mars</div>
                <div className="text-xs text-muted-foreground -mt-0.5">LATAM Tour</div>
              </div>
            </Link>

            {/* Search */}
            <div className="hidden md:block flex-1 max-w-md mx-8 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                onFocus={() => searchResults.length > 0 && setShowResults(true)}
                onBlur={() => setTimeout(() => setShowResults(false), 200)}
                placeholder="Buscar países, fechas, noticias..."
                className="w-full h-12 pl-12 pr-4 rounded-full bg-muted/50 border border-border/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all text-sm"
              />

              {/* Search Results */}
              {showResults && searchResults.length > 0 && (
                <div className="absolute top-full mt-2 left-0 right-0 bg-white dark:bg-card rounded-2xl shadow-lift-lg border border-border/50 overflow-hidden">
                  {searchResults.map((result, index) => (
                    <Link
                      key={index}
                      href={result.href}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-muted/50 transition-colors"
                    >
                      {result.type === 'country' ? (
                        <MapPin className="h-5 w-5 text-primary" />
                      ) : (
                        <span className="text-lg">📰</span>
                      )}
                      <div>
                        <div className="font-medium">{result.title}</div>
                        <div className="text-xs text-muted-foreground">{result.subtitle}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4">
              <ThemeToggle />

              <Link
                href="#cart"
                className="relative p-2 hover:bg-muted/50 rounded-lg transition-colors"
              >
                <ShoppingCart className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-white text-xs rounded-full flex items-center justify-center font-bold">
                  0
                </span>
              </Link>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}
