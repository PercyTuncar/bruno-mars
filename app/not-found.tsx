import Link from 'next/link'
import { Home, MapPin } from 'lucide-react'
import { COUNTRY_SLUGS, getCountryConfig } from '@/data/countries.config'

/**
 * Página 404 personalizada
 * Incluye enlaces a los 5 países (mejora SEO y reduce rebote)
 */
export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-9xl font-serif font-bold text-primary mb-4">404</h1>
        <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
          Página no encontrada
        </h2>
        <p className="text-lg text-muted-foreground mb-12">
          La página que buscas no existe o ha sido movida.
        </p>

        {/* Enlaces útiles */}
        <div className="space-y-8">
          {/* Botón a Home */}
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-md font-medium hover:bg-primary/90 transition-colors"
            >
              <Home className="h-5 w-5" />
              Volver al Inicio
            </Link>
          </div>

          {/* Enlaces a países */}
          <div>
            <p className="text-sm text-muted-foreground mb-4">
              O visita directamente un país:
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {COUNTRY_SLUGS.map((slug) => {
                const config = getCountryConfig(slug)
                return (
                  <Link
                    key={slug}
                    href={`/${slug}`}
                    className="inline-flex items-center gap-2 px-4 py-2 matte rounded-md hover:border-primary/50 border-2 border-transparent transition-colors"
                  >
                    <MapPin className="h-4 w-4" />
                    {config.name}
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
