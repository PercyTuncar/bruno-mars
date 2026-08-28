import type { Metadata } from 'next'
import Link from 'next/link'
import { MapPin, ArrowRight, Users, Calendar, Zap, Star } from 'lucide-react'
import { getHomeMetadata } from '@/lib/seo/metadata'
import { buildOrganizationSchema, buildItemListSchema } from '@/lib/seo/jsonld'
import { JsonLd } from '@/components/seo/JsonLd'
import { Navbar } from '@/components/layout/Navbar'
import { COUNTRY_SLUGS, getCountryConfig } from '@/data/countries.config'

export const metadata: Metadata = getHomeMetadata()
export const revalidate = 3600

export default function HomePage() {
  const countries = COUNTRY_SLUGS.map((slug) => {
    const config = getCountryConfig(slug)
    return {
      slug,
      name: config.name,
      ticketsSlug: config.ticketsSlug,
    }
  })

  return (
    <>
      <JsonLd data={buildOrganizationSchema()} />
      <JsonLd
        data={buildItemListSchema(
          countries.map((c, index) => ({
            position: index + 1,
            name: `Bruno Mars en ${c.name}`,
            url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://brunomars.lat'}/${c.slug}`,
          }))
        )}
      />

      <Navbar />

      {/* Hero COMPACTO - Todo en viewport */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden bg-gradient-to-br from-background via-muted/30 to-background">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-accent/5" />

        <div className="relative z-10 max-w-6xl mx-auto px-6 py-12 w-full">
          <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-12 items-center">
            {/* Contenido Izquierda */}
            <div className="space-y-6">
              {/* Badge compacto */}
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded-lg">
                <Zap className="h-3 w-3 text-primary" />
                <span className="text-xs font-bold tracking-wide text-primary">THE ROMANTIC TOUR 2027</span>
              </div>

              {/* Título compacto */}
              <div>
                <h1 className="text-5xl font-black leading-[0.95] tracking-tight">
                  <span className="block">Bruno Mars</span>
                  <span className="block text-primary">Latinoamérica</span>
                </h1>
              </div>

              {/* Subtitle */}
              <p className="text-sm text-muted-foreground max-w-md">
                5 países • Septiembre - Octubre 2027 • +50,000 fans
              </p>

              {/* Stats inline */}
              <div className="flex flex-wrap gap-3">
                <div className="flex items-center gap-2 px-3 py-2 bg-card/50 border border-border rounded-lg backdrop-blur-sm">
                  <Calendar className="h-4 w-4 text-primary" />
                  <span className="text-xs font-semibold">Sep - Oct</span>
                </div>

                <div className="flex items-center gap-2 px-3 py-2 bg-card/50 border border-border rounded-lg backdrop-blur-sm">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span className="text-xs font-semibold">5 Países</span>
                </div>

                <div className="flex items-center gap-2 px-3 py-2 bg-card/50 border border-border rounded-lg backdrop-blur-sm">
                  <Users className="h-4 w-4 text-primary" />
                  <span className="text-xs font-semibold">+50K fans</span>
                </div>
              </div>

              {/* CTA */}
              <Link
                href="#paises"
                className="inline-flex items-center gap-2 h-12 px-6 bg-primary text-white rounded-xl font-bold text-sm shadow-glow hover:shadow-glow-lg transition-all hover:-translate-y-0.5"
              >
                Ver Países y Entradas
                <ArrowRight className="h-4 w-4" />
              </Link>

              {/* Trust badge pequeño */}
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                <span>2,847 personas viendo ahora</span>
              </div>
            </div>

            {/* Visual Derecha - Imagen Completa */}
            <div className="relative h-[400px] lg:h-[450px]">
              <img
                src="https://www.brunomars.com/sites/g/files/g2000021861/files/2026-04/romtr_hdr.png"
                alt="Bruno Mars - The Romantic Tour"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Países Section - COMPACTA */}
      <section id="paises" className="py-16 bg-background">
        <div className="max-w-6xl mx-auto px-6">
          {/* Header compacto */}
          <div className="mb-8">
            <h2 className="text-3xl font-black mb-2">Selecciona tu País</h2>
            <p className="text-sm text-muted-foreground">
              Encuentra fechas y entradas disponibles
            </p>
          </div>

          {/* Grid compacto */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {countries.map((country) => (
              <Link
                key={country.slug}
                href={`/${country.slug}`}
                className="group relative bg-card p-6 rounded-xl border border-border hover:border-primary/50 transition-all duration-300 hover:-translate-y-1"
              >
                {/* Flag emoji grande */}
                <div className="text-3xl mb-3">
                  {country.slug === 'peru' && '🇵🇪'}
                  {country.slug === 'chile' && '🇨🇱'}
                  {country.slug === 'argentina' && '🇦🇷'}
                  {country.slug === 'colombia' && '🇨🇴'}
                  {country.slug === 'brasil' && '🇧🇷'}
                </div>

                {/* Nombre */}
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                  {country.name}
                </h3>

                {/* Info */}
                <p className="text-xs text-muted-foreground mb-4">
                  Septiembre 2027 • Ver fechas
                </p>

                {/* CTA */}
                <div className="flex items-center justify-between pt-3 border-t border-border/50">
                  <span className="text-sm font-semibold text-primary">Ver entradas</span>
                  <ArrowRight className="h-4 w-4 text-primary group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Sobre el Show */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black mb-4">Qué Esperar del Show</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Más de 2 horas del mejor espectáculo en vivo. Bruno Mars trae su producción de clase mundial a Latinoamérica.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-card p-8 rounded-xl border border-border">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-black mb-3">Producción Épica</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Fuegos artificiales, pirotecnia masiva, confetti y efectos especiales. Una experiencia visual inolvidable en estadios.
              </p>
            </div>

            <div className="bg-card p-8 rounded-xl border border-border">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-black mb-3">Banda en Vivo</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                The Hooligans en escena. Músicos de clase mundial con coreografías sincronizadas que elevan cada canción.
              </p>
            </div>

            <div className="bg-card p-8 rounded-xl border border-border">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Star className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-black mb-3">20+ Canciones</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Todos los hits: "Just the Way You Are", "24K Magic", "Uptown Funk", más canciones nuevas de "The Romantic".
              </p>
            </div>
          </div>

          <div className="mt-12 bg-card p-8 rounded-xl border border-border">
            <h3 className="text-2xl font-black mb-4">Setlist Confirmado</h3>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                  <span>24K Magic</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                  <span>Just the Way You Are</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                  <span>Marry You</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                  <span>Grenade</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                  <span>When I Was Your Man</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                  <span>Perm</span>
                </li>
              </ul>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                  <span>That's What I Like</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                  <span>Uptown Funk</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                  <span>Locked Out of Heaven</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                  <span>It Will Rain</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                  <span>Talking to the Moon</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                  <span>I Just Might</span>
                </li>
              </ul>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                  <span>Risk It All</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                  <span>Treasure</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                  <span>Runaway Baby</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                  <span>Leave the Door Open</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                  <span>Low Rider Medley</span>
                </li>
                <li className="text-xs text-muted-foreground italic mt-2">
                  + más sorpresas
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Footer compacto */}
      <footer className="border-t py-12 bg-card/30">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                  <span className="text-white font-black text-sm">BM</span>
                </div>
                <div>
                  <div className="font-bold text-sm">Bruno Mars</div>
                  <div className="text-xs text-muted-foreground">LATAM Tour</div>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                Experiencia oficial Latinoamérica 2027
              </p>
            </div>

            <div>
              <h4 className="font-bold text-sm mb-3">Países</h4>
              <ul className="space-y-2 text-xs">
                {countries.map((country) => (
                  <li key={country.slug}>
                    <Link
                      href={`/${country.slug}`}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {country.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-sm mb-3">Info</h4>
              <ul className="space-y-2 text-xs">
                <li>
                  <Link href="/blog" className="text-muted-foreground hover:text-primary transition-colors">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t text-center text-xs text-muted-foreground">
            <p>&copy; 2027 Bruno Mars LATAM. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </>
  )
}
