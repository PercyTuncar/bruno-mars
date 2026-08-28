import { notFound } from 'next/navigation'
import { isValidCountry, type CountrySlug, COUNTRY_SLUGS } from '@/data/countries.config'

/**
 * generateStaticParams para pre-renderizar los 5 países en build time
 * Requisito de SEO: solo los países válidos deben tener rutas generadas
 */
export async function generateStaticParams() {
  return COUNTRY_SLUGS.map((slug) => ({
    pais: slug,
  }))
}

/**
 * Layout de país
 * Valida que el país sea soportado y proporciona contexto base
 */
export default async function CountryLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ pais: string }>
}) {
  const { pais } = await params

  // Validar país soportado
  if (!isValidCountry(pais)) {
    notFound()
  }

  return <>{children}</>
}
