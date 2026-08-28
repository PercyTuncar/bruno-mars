import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllPosts } from '@/lib/blog'
import { BlogCard } from '@/components/blog/BlogCard'
import { ThemeToggle } from '@/components/layout/ThemeToggle'
import { JsonLd } from '@/components/seo/JsonLd'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://brunomars.lat'

export const metadata: Metadata = {
  title: 'Blog - Bruno Mars LATAM | Noticias y Guías del Tour',
  description: 'Mantente informado sobre Bruno Mars The Romantic Tour 2027 en Latinoamérica. Fechas, venues, guías de compra y más.',
  alternates: {
    canonical: `${BASE_URL}/blog`,
  },
  openGraph: {
    title: 'Blog - Bruno Mars LATAM',
    description: 'Noticias, guías y actualizaciones sobre The Romantic Tour 2027',
    url: `${BASE_URL}/blog`,
    type: 'website',
  },
}

/**
 * ISR: Revalidar cada hora para mostrar nuevos posts
 */
export const revalidate = 3600

export default function BlogIndexPage() {
  const posts = getAllPosts()
  const [featuredPost, ...regularPosts] = posts

  // JSON-LD para ItemList
  const blogListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: posts.map((post, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'BlogPosting',
        headline: post.title,
        datePublished: post.date,
        author: {
          '@type': 'Person',
          name: post.author,
        },
        url: `${BASE_URL}/blog/${post.slug}`,
      },
    })),
  }

  return (
    <>
      <JsonLd data={blogListSchema} />

      <div className="min-h-screen flex flex-col">
        {/* Navbar */}
        <header className="border-b glass sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <Link href="/" className="text-xl font-serif font-bold hover:text-primary transition-colors">
              Bruno Mars LATAM
            </Link>
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors hidden md:inline"
              >
                Inicio
              </Link>
              <ThemeToggle />
            </div>
          </div>
        </header>

        <main className="flex-1">
          <div className="container mx-auto px-4 py-12 md:py-16">
            {/* Header */}
            <div className="mb-12 text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-4">
                Blog
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Noticias, guías y todo lo que necesitas saber sobre Bruno Mars The Romantic Tour 2027 en Latinoamérica
              </p>
            </div>

            {posts.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-lg text-muted-foreground mb-6">
                  Próximamente: Artículos sobre el tour, guías de venues y más
                </p>
                <Link
                  href="/"
                  className="inline-block px-6 py-3 bg-primary text-primary-foreground rounded-md font-medium hover:bg-primary/90 transition-colors"
                >
                  Volver al Inicio
                </Link>
              </div>
            ) : (
              <>
                {/* Post destacado */}
                {featuredPost && (
                  <div className="mb-12">
                    <BlogCard post={featuredPost} featured />
                  </div>
                )}

                {/* Grid de posts */}
                {regularPosts.length > 0 && (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {regularPosts.map((post) => (
                      <BlogCard key={post.slug} post={post} />
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t py-8 mt-16">
          <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
            <p>&copy; 2027 Bruno Mars LATAM. Todos los derechos reservados.</p>
          </div>
        </footer>
      </div>
    </>
  )
}
