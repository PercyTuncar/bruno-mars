/**
 * Componente de Breadcrumbs visual + JSON-LD
 * Mejora SEO y navegación del usuario
 */

import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { JsonLd } from './JsonLd'
import { buildBreadcrumbSchema } from '@/lib/seo/jsonld'

interface BreadcrumbItem {
  name: string
  url: string
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
}

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://brunomars.lat'

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  // Siempre incluir "Inicio" como primer item
  const fullItems: BreadcrumbItem[] = [
    { name: 'Inicio', url: BASE_URL },
    ...items,
  ]

  return (
    <>
      <JsonLd data={buildBreadcrumbSchema(fullItems)} />
      <nav aria-label="Breadcrumb" className="mb-8">
        <ol className="flex items-center gap-2 text-sm text-muted-foreground">
          {fullItems.map((item, index) => {
            const isLast = index === fullItems.length - 1

            return (
              <li key={item.url} className="flex items-center gap-2">
                {index > 0 && (
                  <ChevronRight className="h-4 w-4" aria-hidden="true" />
                )}
                {isLast ? (
                  <span className="font-medium text-foreground" aria-current="page">
                    {item.name}
                  </span>
                ) : (
                  <Link
                    href={item.url}
                    className="hover:text-foreground transition-colors"
                  >
                    {item.name}
                  </Link>
                )}
              </li>
            )
          })}
        </ol>
      </nav>
    </>
  )
}
