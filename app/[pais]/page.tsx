import { notFound } from 'next/navigation'
import Link from 'next/link'
import { isValidCountry, type CountrySlug, getCountryConfig } from '@/data/countries.config'
import { getCountryData } from '@/data/countries'
import { getCountryContent } from '@/data/content'
import { getCountryLandingMetadata } from '@/lib/seo/metadata'
import { JsonLd } from '@/components/seo/JsonLd'
import { buildCountryEventSchema, buildFAQSchema, buildBreadcrumbSchema } from '@/lib/seo/jsonld'
import { Breadcrumbs } from '@/components/seo/Breadcrumbs'
import { Navbar } from '@/components/layout/Navbar'
import { WhatsAppModal } from '@/components/modals/WhatsAppModal'
import { formatCurrency } from '@/lib/format-currency'
import { getPriceRange } from '@/data/zones'
import { Calendar, MapPin, Ticket, ArrowRight, Users, Clock, Zap, Star } from 'lucide-react'

export async function generateMetadata({ params }: { params: Promise<{ pais: string }> }) {
  const { pais } = await params
  if (!isValidCountry(pais)) return {}
  return getCountryLandingMetadata(pais as CountrySlug)
}

export const revalidate = 3600

export default async function CountryPage({ params }: { params: Promise<{ pais: string }> }) {
  const { pais } = await params
  if (!isValidCountry(pais)) notFound()

  const countrySlug = pais as CountrySlug
  const config = getCountryConfig(countrySlug)
  const data = getCountryData(countrySlug)
  const content = getCountryContent(countrySlug)
  const priceRange = getPriceRange(countrySlug)
  const faqSchema = buildFAQSchema(countrySlug)

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://brunomars.lat'

  return (
    <>
      <JsonLd data={buildCountryEventSchema(countrySlug)} />
      {faqSchema && <JsonLd data={faqSchema} />}
      <JsonLd data={buildBreadcrumbSchema([
        { name: 'Home', url: baseUrl },
        { name: config.name, url: `${baseUrl}/${countrySlug}` },
      ])} />
      <Navbar />
      <WhatsAppModal
        countrySlug={countrySlug}
        countryName={config.name}
        language={config.language}
      />

      {/* Hero Ultra Compacto y Poderoso */}
      <section className="relative h-screen max-h-[90vh] flex items-center overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src="https://mmo.aiircdn.com/766/6960104b7162a.jpg"
            alt="Bruno Mars concert background"
            className="w-full h-full object-cover"
          />
          {/* Gradient overlay equilibrado */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-black/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        </div>

        {/* Noise texture overlay */}
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }} />

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          {/* Breadcrumbs minimalistas */}
          <div className="mb-8">
            <Breadcrumbs items={[{ name: 'Home', url: '/' }, { name: config.name, url: `/${countrySlug}` }]} />
          </div>

          <div className="max-w-4xl">
            {/* Badge ultra pequeño */}
            <div className="inline-flex items-center gap-2 px-2 py-1 bg-white/5 border border-white/10 rounded-md backdrop-blur-sm mb-6">
              <Zap className="h-3 w-3 text-primary" />
              <span className="text-xs font-bold tracking-wider text-white/90">{content.hero.badge.toUpperCase()}</span>
            </div>

            {/* Título GIGANTE */}
            <h1 className="text-7xl md:text-8xl font-black leading-[0.9] tracking-tighter mb-6">
              <span className="block text-white">{content.hero.title}</span>
              <span className="block text-primary">{content.hero.titleHighlight}</span>
            </h1>

            {/* Info en una línea */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-white/70 mb-8">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-primary" />
                <span className="font-semibold">{data.dates[0].dateDisplay}</span>
              </div>
              <span className="text-white/30">•</span>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                <span className="font-semibold">{data.venue.name}</span>
              </div>
              <span className="text-white/30">•</span>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-primary" />
                <span className="font-semibold">{data.venue.capacity.toLocaleString()} {content.eventDetails.capacityUnit}</span>
              </div>
            </div>

            {/* Precio y CTA en línea */}
            <div className="flex flex-wrap items-center gap-6">
              <div>
                <div className="text-xs text-white/50 mb-1 uppercase tracking-wide">{content.hero.cta.from}</div>
                <div className="text-5xl font-black text-white">{formatCurrency(priceRange.min, config.currency)}</div>
              </div>

              <Link
                href={`/${countrySlug}/${config.ticketsSlug}`}
                className="inline-flex items-center gap-2 h-14 px-8 gradient-red text-white rounded-xl font-bold shadow-glow hover:shadow-glow-lg transition-all hover:scale-105"
              >
                <Ticket className="h-5 w-5" />
                {content.hero.cta.buyButton}
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>

            {/* Trust inline */}
            <div className="flex items-center gap-4 mt-8 text-xs text-white/50">
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                <span>3,421 {content.hero.stats.watching}</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1.5">
                <Star className="h-3 w-3 text-primary fill-primary" />
                <span>{content.hero.stats.delivery}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/20 rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-2 bg-white/50 rounded-full" />
          </div>
        </div>
      </section>

      {/* Event Details - Minimalista */}
      <section className="py-16 bg-background">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-card border border-border p-6 rounded-xl">
              <Calendar className="h-8 w-8 text-primary mb-3" />
              <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">{content.eventDetails.dateLabel}</div>
              <div className="text-xl font-black">{data.dates[0].dateDisplay}</div>
              <div className="text-sm text-muted-foreground mt-1">{content.eventDetails.doorsLabel} {data.dates[0].time}</div>
            </div>

            <div className="bg-card border border-border p-6 rounded-xl">
              <MapPin className="h-8 w-8 text-primary mb-3" />
              <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">{content.eventDetails.venueLabel}</div>
              <div className="text-xl font-black">{data.venue.name}</div>
              <div className="text-sm text-muted-foreground mt-1">{data.venue.address.city}</div>
            </div>

            <div className="bg-card border border-border p-6 rounded-xl">
              <Users className="h-8 w-8 text-primary mb-3" />
              <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">{content.eventDetails.capacityLabel}</div>
              <div className="text-xl font-black">{data.venue.capacity.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground mt-1">{content.eventDetails.capacityUnit}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Sobre el Concierto */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-black mb-8 text-center">{content.aboutConcert.title}</h2>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-card p-8 rounded-xl border border-border">
              <h3 className="text-2xl font-black mb-4">{content.aboutConcert.showTitle}</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                {content.aboutConcert.showDescription}
              </p>
              <ul className="space-y-2 text-sm">
                {content.aboutConcert.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Zap className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                    <span><strong>{feature.title}:</strong> {feature.description}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-card p-8 rounded-xl border border-border">
              <h3 className="text-2xl font-black mb-4">{content.aboutConcert.expectTitle}</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                {content.aboutConcert.expectDescription}
              </p>
              <div className="space-y-3">
                {content.aboutConcert.expectDetails.map((detail, index) => (
                  <div key={index} className="p-3 bg-muted/50 rounded-lg">
                    <div className="text-xs text-muted-foreground mb-1">{detail.label}</div>
                    <div className="font-bold">{detail.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Setlist */}
          <div className="bg-card p-8 rounded-xl border border-border">
            <h3 className="text-2xl font-black mb-4">{content.setlist.title}</h3>
            <p className="text-sm text-muted-foreground mb-6">
              {content.setlist.description}
            </p>
            <div className="grid md:grid-cols-4 gap-4 text-sm">
              {content.setlist.categories.map((category, index) => (
                <div key={index}>
                  <div className="font-bold text-xs text-muted-foreground uppercase tracking-wide mb-3">{category.title}</div>
                  <ul className="space-y-2">
                    {category.songs.map((song, songIndex) => (
                      <li key={songIndex}>• {song}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final - Minimalista */}
      <section className="py-20 bg-black">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            {content.cta.title}
          </h2>
          <p className="text-white/60 mb-8 max-w-md mx-auto">
            {content.cta.description}
          </p>
          <Link
            href={`/${countrySlug}/${config.ticketsSlug}`}
            className="inline-flex items-center gap-2 h-14 px-10 gradient-red text-white rounded-xl font-bold text-lg shadow-glow hover:shadow-glow-lg transition-all hover:scale-105"
          >
            {content.cta.button}
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>

      <footer className="border-t py-8 bg-card/30">
        <div className="max-w-6xl mx-auto px-6 text-center text-xs text-muted-foreground">
          <p>{content.footer.copyright}</p>
        </div>
      </footer>
    </>
  )
}

export async function generateStaticParams() {
  return [
    { pais: 'peru' },
    { pais: 'chile' },
    { pais: 'argentina' },
    { pais: 'colombia' },
    { pais: 'brasil' },
  ]
}
