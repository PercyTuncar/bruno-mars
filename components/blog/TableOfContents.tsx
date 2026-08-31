'use client'

import { useEffect, useState } from 'react'
import { List, ChevronRight } from 'lucide-react'

interface Heading {
  id: string
  text: string
  level: number
}

export function TableOfContents() {
  const [headings, setHeadings] = useState<Heading[]>([])
  const [activeId, setActiveId] = useState<string>('')
  const [isSticky, setIsSticky] = useState(true)

  useEffect(() => {
    // Extract headings from article - only main content H2s
    const articleElements = document.querySelectorAll('.prose h2')

    const articleHeadings: Heading[] = []
    const seenTexts = new Set<string>()

    Array.from(articleElements).forEach((heading, index) => {
      const text = heading.textContent || ''

      // Filtrar headings no deseados
      const excludedTexts = [
        'Bruno Mars Confirma Gira',
        '¡Gira Confirmada',
        '¿Quieres ser el primero',
        'Compartir este artículo',
        'Información Rápida',
        '¿Listo para el Tour',
      ]

      const shouldExclude = excludedTexts.some(excluded => text.includes(excluded))

      // Solo incluir si no está duplicado y no está excluido
      if (!seenTexts.has(text) && !shouldExclude && text.trim().length > 0) {
        seenTexts.add(text)

        const baseId = text
          .toLowerCase()
          .normalize('NFD')
          .replace(/[̀-ͯ]/g, '') // Remove accents
          .replace(/[^a-z0-9\s-]/g, '')
          .trim()
          .replace(/\s+/g, '-')

        articleHeadings.push({
          id: baseId,
          text,
          level: 2,
        })

        // Asignar el ID al elemento HTML
        if (heading instanceof HTMLElement) {
          heading.id = baseId
        }
      }
    })

    setHeadings(articleHeadings)

    // Intersection Observer for active heading
    const headingObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: '-80px 0px -80% 0px' }
    )

    articleHeadings.forEach((heading) => {
      const element = document.getElementById(heading.id)
      if (element) headingObserver.observe(element)
    })

    // Observar cuando llegamos cerca del final del artículo
    const handleScroll = () => {
      const article = document.querySelector('article')
      const sidebar = document.querySelector('aside')

      if (!article || !sidebar) return

      const articleRect = article.getBoundingClientRect()
      const sidebarHeight = sidebar.offsetHeight
      const windowHeight = window.innerHeight

      // Calcular cuánto espacio necesitamos para mostrar todo el sidebar
      const spaceNeeded = sidebarHeight + 200 // 200px extra de margen

      // Si el final del artículo está lo suficientemente cerca, quitar sticky
      const articleBottom = articleRect.bottom

      // Dejar de ser sticky cuando quedan suficientes píxeles para mostrar todo el sidebar
      setIsSticky(articleBottom > spaceNeeded)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Check initial state

    return () => {
      headingObserver.disconnect()
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  if (headings.length === 0) return null

  return (
    <nav
      className={`
        p-6 rounded-2xl bg-gradient-to-br from-card via-card to-muted/30 border border-border shadow-sm
        transition-all duration-300
        ${isSticky ? 'sticky top-24' : 'relative'}
      `}
      aria-label="Tabla de contenidos"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-5 pb-4 border-b border-border/50">
        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10">
          <List className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h3 className="font-black text-base text-foreground">Tabla de Contenidos</h3>
          <p className="text-xs text-muted-foreground">Navegación rápida</p>
        </div>
      </div>

      {/* TOC List */}
      <ul className="space-y-1">
        {headings.map((heading, index) => {
          const isActive = activeId === heading.id

          return (
            <li key={`toc-item-${index}`}>
              <a
                href={`#${heading.id}`}
                onClick={(e) => {
                  e.preventDefault()
                  const element = document.getElementById(heading.id)
                  if (element) {
                    const offset = 100
                    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
                    window.scrollTo({
                      top: elementPosition - offset,
                      behavior: 'smooth'
                    })
                  }
                }}
                className={`
                  group flex items-start gap-2 py-2.5 px-3 rounded-lg text-sm transition-all duration-200
                  ${isActive
                    ? 'bg-primary/10 text-primary font-semibold shadow-sm'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  }
                `}
              >
                <ChevronRight
                  className={`
                    w-4 h-4 flex-shrink-0 mt-0.5 transition-transform duration-200
                    ${isActive ? 'rotate-90 text-primary' : 'opacity-0 group-hover:opacity-100'}
                  `}
                />
                <span className="leading-tight flex-1">{heading.text}</span>
              </a>
            </li>
          )
        })}
      </ul>

      {/* Footer hint */}
      <div className="mt-5 pt-4 border-t border-border/50">
        <p className="text-xs text-muted-foreground text-center">
          {headings.length} secciones principales
        </p>
      </div>
    </nav>
  )
}
