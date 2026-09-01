import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllPosts } from '@/lib/blog'
import { getBlogIndexMetadata } from '@/lib/seo/metadata'
import { buildBlogSchema } from '@/lib/seo/jsonld'
import { Navbar } from '@/components/layout/Navbar'
import { JsonLd } from '@/components/seo/JsonLd'
import { BlogHero } from '@/components/blog/BlogHero'
import { FeaturedPost } from '@/components/blog/FeaturedPost'
import { BlogGrid } from '@/components/blog/BlogGrid'
import { BlogCategories } from '@/components/blog/BlogCategories'
import { NewsletterCTA } from '@/components/blog/NewsletterCTA'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://brunomars.lat'

export const metadata: Metadata = getBlogIndexMetadata()

/**
 * ISR: Revalidar cada hora para mostrar nuevos posts
 */
export const revalidate = 3600

export default function BlogIndexPage() {
  const posts = getAllPosts()
  const [featuredPost, ...otherPosts] = posts

  // Categorías disponibles
  const categories = [
    { name: 'Todas', slug: 'all', count: posts.length },
    { name: 'Conciertos', slug: 'conciertos', count: posts.filter(p => p.category === 'Conciertos').length },
    { name: 'Noticias', slug: 'noticias', count: posts.filter(p => p.category === 'Noticias').length },
    { name: 'Guías', slug: 'guias', count: posts.filter(p => p.category === 'Guías').length },
  ]

  return (
    <>
      <JsonLd data={buildBlogSchema()} />

      <Navbar />

      <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
        {/* Hero Section */}
        <BlogHero />

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-6 lg:px-20 pb-20">
          {posts.length === 0 ? (
            // Estado vacío
            <div className="text-center py-24">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-muted/50 mb-6">
                <span className="text-4xl">📝</span>
              </div>
              <h2 className="text-2xl font-bold mb-4">Próximamente: Nuevos Artículos</h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-md mx-auto">
                Estamos preparando contenido exclusivo sobre el tour, guías de venues y más.
              </p>
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full font-semibold hover:bg-primary/90 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Volver al Inicio
              </Link>
            </div>
          ) : (
            <>
              {/* Categories Filter */}
              <BlogCategories categories={categories} />

              {/* Featured Post */}
              {featuredPost && (
                <div className="mb-16">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">⭐</span>
                      <h2 className="text-2xl font-bold">Destacado</h2>
                    </div>
                    <div className="flex-1 h-px bg-gradient-to-r from-border to-transparent" />
                  </div>
                  <FeaturedPost post={featuredPost} />
                </div>
              )}

              {/* Blog Grid */}
              {otherPosts.length > 0 && (
                <div>
                  <div className="flex items-center gap-3 mb-8">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">📰</span>
                      <h2 className="text-2xl font-bold">Últimas Noticias</h2>
                    </div>
                    <div className="flex-1 h-px bg-gradient-to-r from-border to-transparent" />
                  </div>
                  <BlogGrid posts={otherPosts} />
                </div>
              )}

              {/* Newsletter CTA */}
              <NewsletterCTA />
            </>
          )}
        </main>

        {/* Footer */}
        <footer className="border-t bg-card/50 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-6 lg:px-20 py-12">
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              {/* About */}
              <div>
                <h3 className="font-bold mb-4">Sobre Bruno Mars LATAM</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Tu fuente oficial de información sobre Bruno Mars The Romantic Tour 2027 en Latinoamérica.
                </p>
              </div>

              {/* Links */}
              <div>
                <h3 className="font-bold mb-4">Enlaces Rápidos</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">
                      Inicio
                    </Link>
                  </li>
                  <li>
                    <Link href="/blog" className="text-muted-foreground hover:text-primary transition-colors">
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link href="/#paises" className="text-muted-foreground hover:text-primary transition-colors">
                      Países
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Social */}
              <div>
                <h3 className="font-bold mb-4">Síguenos</h3>
                <div className="flex gap-3">
                  <a
                    href="https://instagram.com/brunomars"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-muted/50 hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-all duration-300 hover:scale-110"
                  >
                    <span className="text-lg">📸</span>
                  </a>
                  <a
                    href="https://twitter.com/brunomars"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-muted/50 hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-all duration-300 hover:scale-110"
                  >
                    <span className="text-lg">𝕏</span>
                  </a>
                  <a
                    href="https://facebook.com/brunomars"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-muted/50 hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-all duration-300 hover:scale-110"
                  >
                    <span className="text-lg">📘</span>
                  </a>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t text-center text-sm text-muted-foreground">
              <p>&copy; 2027 Bruno Mars LATAM. Todos los derechos reservados.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}
