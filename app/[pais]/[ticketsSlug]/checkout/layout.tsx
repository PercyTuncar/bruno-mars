import { COUNTRY_SLUGS, getCountryConfig } from '@/data/countries.config'

export async function generateStaticParams() {
  // Genera todas las combinaciones de país + ticketsSlug para checkout
  return COUNTRY_SLUGS.map(slug => {
    const config = getCountryConfig(slug)
    return {
      pais: slug,
      ticketsSlug: config.ticketsSlug
    }
  })
}

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
