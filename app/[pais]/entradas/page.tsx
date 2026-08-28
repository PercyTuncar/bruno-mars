import { notFound } from 'next/navigation'
import { isValidCountry, type CountrySlug, getCountryConfig } from '@/data/countries.config'
import { getCountryData } from '@/data/countries'
import { getCountryZones } from '@/data/zones'
import { getCountryTicketsMetadata } from '@/lib/seo/metadata'
import { JsonLd } from '@/components/seo/JsonLd'
import { buildCountryEventSchema, buildBreadcrumbSchema } from '@/lib/seo/jsonld'
import { Navbar } from '@/components/layout/Navbar'
import { TicketsPageClient } from '@/components/tickets/TicketsPageClient'
import { WhatsAppModal } from '@/components/modals/WhatsAppModal'

export async function generateMetadata({ params }: { params: Promise<{ pais: string }> }) {
  const { pais } = await params
  if (!isValidCountry(pais)) return {}
  return getCountryTicketsMetadata(pais as CountrySlug)
}

export const revalidate = 300

export default async function TicketsPage({ params }: { params: Promise<{ pais: string }> }) {
  const { pais } = await params
  if (!isValidCountry(pais)) notFound()

  const countrySlug = pais as CountrySlug
  const config = getCountryConfig(countrySlug)
  const data = getCountryData(countrySlug)
  const zonesData = getCountryZones(countrySlug)
  const zones = zonesData.zones

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://brunomars.lat'

  return (
    <>
      <JsonLd data={buildCountryEventSchema(countrySlug)} />
      <JsonLd data={buildBreadcrumbSchema([
        { name: 'Home', url: baseUrl },
        { name: config.name, url: `${baseUrl}/${countrySlug}` },
        { name: 'Entradas', url: `${baseUrl}/${countrySlug}/${config.ticketsSlug}` },
      ])} />
      <Navbar />
      <WhatsAppModal
        countrySlug={countrySlug}
        countryName={config.name}
        language={config.language}
      />

      <TicketsPageClient
        countrySlug={countrySlug}
        config={config}
        data={data}
        zones={zones}
      />
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
