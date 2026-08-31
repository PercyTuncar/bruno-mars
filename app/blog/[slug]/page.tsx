import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Calendar, Clock, ArrowLeft, Share2, Bookmark, ChevronRight } from 'lucide-react'
import { getAllPostSlugs, getPostBySlug, getRelatedPosts } from '@/lib/blog'
import { Navbar } from '@/components/layout/Navbar'
import { JsonLd } from '@/components/seo/JsonLd'
import { BlogCard } from '@/components/blog/BlogCard'
import { MDXComponents } from '@/components/blog/MDXComponents'
import { OptimizedImage } from '@/components/ui/OptimizedImage'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { TableOfContents } from '@/components/blog/TableOfContents'
import { ProgressBar } from '@/components/blog/ProgressBar'
import { FlagsBanner } from '@/components/blog/FlagsBanner'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://brunomars.lat'

/**
 * generateStaticParams para pre-renderizar todos los posts
 */
export async function generateStaticParams() {
  const slugs = getAllPostSlugs()
  return slugs.map((slug) => ({ slug }))
}

/**
 * generateMetadata dinámico por post
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    return {
      title: 'Post no encontrado',
    }
  }

  return {
    title: post.title,
    description: post.description,
    keywords: post.content.match(/keywords:\s*"([^"]+)"/)?.[1],
    authors: [{ name: post.author }],
    creator: post.author,
    publisher: 'Bruno Mars LATAM',
    alternates: {
      canonical: `${BASE_URL}/blog/${slug}`,
      languages: {
        'es-ES': `${BASE_URL}/blog/${slug}`,
        'es': `${BASE_URL}/blog/${slug}`,
      },
    },
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      modifiedTime: post.date,
      authors: [post.author],
      section: post.category,
      tags: post.content.match(/keywords:\s*"([^"]+)"/)?.[1]?.split(',').map(k => k.trim()),
      images: [
        {
          url: post.image.startsWith('http') ? post.image : `${BASE_URL}${post.image}`,
          width: 1200,
          height: 675,
          alt: post.title,
        },
      ],
      url: `${BASE_URL}/blog/${slug}`,
      siteName: 'Bruno Mars LATAM',
      locale: 'es_ES',
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [post.image.startsWith('http') ? post.image : `${BASE_URL}${post.image}`],
      creator: '@brunomars',
    },
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    other: {
      'article:published_time': post.date,
      'article:modified_time': post.date,
      'article:author': post.author,
      'article:section': post.category,
    },
  }
}

/**
 * ISR: Revalidar cada 1 hora
 */
export const revalidate = 3600

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const relatedPosts = getRelatedPosts(slug, 3)

  const formattedDate = new Date(post.date).toLocaleDateString('es', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  // JSON-LD Article Schema
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    image: `${BASE_URL}${post.image}`,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Organization',
      name: post.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Bruno Mars LATAM',
      logo: {
        '@type': 'ImageObject',
        url: `${BASE_URL}/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${BASE_URL}/blog/${slug}`,
    },
  }

  // Breadcrumb Schema
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Inicio',
        item: BASE_URL,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: `${BASE_URL}/blog`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.title,
        item: `${BASE_URL}/blog/${slug}`,
      },
    ],
  }

  return (
    <>
      <JsonLd data={articleSchema} />
      <JsonLd data={breadcrumbSchema} />

      <ProgressBar />

      <Navbar />

      <div className="min-h-screen bg-background">
        {/* Breadcrumb */}
        <div className="border-b bg-muted/30">
          <div className="max-w-7xl mx-auto px-6 lg:px-20 py-4">
            <nav className="flex items-center gap-2 text-sm" aria-label="Breadcrumb">
              <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
                Inicio
              </Link>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
              <Link href="/blog" className="text-muted-foreground hover:text-foreground transition-colors">
                Blog
              </Link>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
              <span className="text-foreground font-medium truncate max-w-xs">{post.title}</span>
            </nav>
          </div>
        </div>

        {/* Article Layout */}
        <article className="max-w-7xl mx-auto px-6 lg:px-20 py-12">
          <div className="grid lg:grid-cols-[1fr_300px] gap-12">
            {/* Main Content */}
            <div className="min-w-0">
              {/* Article Header */}
              <header className="mb-12">
                {/* Category */}
                <div className="mb-6">
                  <span className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-bold tracking-wide uppercase">
                    {post.category}
                  </span>
                </div>

                {/* Title */}
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-[1.1] tracking-tight">
                  {post.title}
                </h1>

                {/* Countries Flags Banner - SOLO PARA ESTE ARTÍCULO */}
                {post.slug === 'bruno-mars-en-concierto' && <FlagsBanner />}

                {/* Description */}
                <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed mb-8">
                  {post.description}
                </p>

                {/* Meta & Actions */}
                <div className="flex flex-wrap items-center justify-between gap-4 pb-8 border-b">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <time dateTime={post.date} className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {formattedDate}
                    </time>
                    <span className="w-1 h-1 rounded-full bg-muted-foreground/50" />
                    <span className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      {post.readingTime}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-muted rounded-lg transition-colors" aria-label="Compartir artículo">
                      <Share2 className="w-5 h-5" />
                    </button>
                    <button className="p-2 hover:bg-muted rounded-lg transition-colors" aria-label="Guardar para después">
                      <Bookmark className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </header>

              {/* Hero Image */}
              <div className="relative aspect-video rounded-2xl overflow-hidden mb-12 border">
                <OptimizedImage
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {/* Article Content */}
              <div className="prose prose-lg max-w-none
                prose-headings:scroll-mt-24
                prose-headings:font-black
                prose-headings:tracking-tight
                prose-h2:text-3xl
                prose-h2:mt-12
                prose-h2:mb-6
                prose-h3:text-2xl
                prose-h3:mt-8
                prose-h3:mb-4
                prose-p:text-lg
                prose-p:leading-relaxed
                prose-p:mb-6
                prose-a:text-primary
                prose-a:no-underline
                prose-a:font-semibold
                prose-a:hover:underline
                prose-strong:text-foreground
                prose-strong:font-bold
                prose-ul:my-6
                prose-ol:my-6
                prose-li:my-2
                dark:prose-invert
              ">
                <MDXRemote source={post.content} components={MDXComponents} />
              </div>

              {/* Share Section */}
              <div className="mt-16 pt-12 border-t">
                <div className="space-y-4">
                  <h3 className="text-xl font-bold">Compartir este artículo</h3>
                  <div className="flex flex-wrap gap-3">
                    <a
                      href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`${BASE_URL}/blog/${slug}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#1877F2] text-white hover:opacity-90 transition-opacity"
                      aria-label="Compartir en Facebook"
                    >
                      <Share2 className="w-5 h-5" />
                      <span className="font-medium">Facebook</span>
                    </a>

                    <a
                      href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(`${BASE_URL}/blog/${slug}`)}&text=${encodeURIComponent(post.title)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#1DA1F2] text-white hover:opacity-90 transition-opacity"
                      aria-label="Compartir en Twitter"
                    >
                      <Share2 className="w-5 h-5" />
                      <span className="font-medium">Twitter</span>
                    </a>

                    <a
                      href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`${BASE_URL}/blog/${slug}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#0A66C2] text-white hover:opacity-90 transition-opacity"
                      aria-label="Compartir en LinkedIn"
                    >
                      <Share2 className="w-5 h-5" />
                      <span className="font-medium">LinkedIn</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar - NO sticky, dejamos que TableOfContents maneje su propio sticky */}
            <aside className="space-y-8">
              {/* Table of Contents */}
              <TableOfContents />

              {/* Quick Info Card */}
              <div className="p-6 rounded-2xl bg-muted/50 border space-y-4">
                <h3 className="font-bold text-lg">Información Rápida</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <Calendar className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-semibold mb-1">Publicado</div>
                      <div className="text-muted-foreground">{formattedDate}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-semibold mb-1">Tiempo de lectura</div>
                      <div className="text-muted-foreground">{post.readingTime}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA Card */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20">
                <div className="text-center space-y-4">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/20 mb-2">
                    <Calendar className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-bold text-lg">¿Listo para el Tour?</h3>
                  <p className="text-sm text-muted-foreground">
                    Compra tus entradas oficiales para ver a Bruno Mars en vivo
                  </p>
                  <Link
                    href="/#paises"
                    className="block w-full py-3 px-4 bg-primary text-primary-foreground rounded-full font-bold hover:bg-primary/90 transition-colors text-center"
                  >
                    Ver Entradas
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </article>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="border-t bg-muted/30 py-16">
            <div className="max-w-7xl mx-auto px-6 lg:px-20">
              <h2 className="text-3xl font-black mb-8">Artículos Relacionados</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {relatedPosts.map((relatedPost) => (
                  <BlogCard key={relatedPost.slug} post={relatedPost} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Footer */}
        <footer className="border-t py-8">
          <div className="max-w-7xl mx-auto px-6 lg:px-20 text-center text-sm text-muted-foreground">
            <p>&copy; 2027 Bruno Mars LATAM. Todos los derechos reservados.</p>
          </div>
        </footer>
      </div>
    </>
  )
}
