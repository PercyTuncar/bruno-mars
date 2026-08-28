/**
 * Componente para inyectar JSON-LD en el <head>
 * Server Component que renderiza datos estructurados
 */

interface JsonLdProps {
  data: Record<string, any> | Array<Record<string, any>>
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
