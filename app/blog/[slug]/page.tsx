import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Calendar, Clock, ArrowLeft } from 'lucide-react'
import { getAllPostSlugs, getPostBySlug, getRelatedPosts } from '@/lib/blog'
import { ThemeToggle } from '@/components/layout/ThemeToggle'
import { JsonLd } from '@/components/seo/JsonLd'
import { BlogCard } from '@/components/blog/BlogCard'
import { MDXComponents } from '@/components/blog/MDXComponents'
import { OptimizedImage } from '@/components/ui/OptimizedImage'
import { MDXRemote } from 'next-mdx-remote/rsc'

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
    title: `${post.title} - Blog Bruno Mars LATAM`,
    description: post.description,
    alternates: {
      canonical: `${BASE_URL}/blog/${slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      images: [
        {
          url: `${BASE_URL}${post.image}`,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      url: `${BASE_URL}/blog/${slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [`${BASE_URL}${post.image}`],
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

  // JSON-LD BlogPosting
  const blogPostingSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    image: `${BASE_URL}${post.image}`,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Person',
      name: post.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'brunomars.lat',
      logo: {
        '@type': 'ImageObject',
        url: `${BASE_URL}/images/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${BASE_URL}/blog/${slug}`,
    },
  }

  return (
    <>
      <JsonLd data={blogPostingSchema} />

      <div className="min-h-screen flex flex-col">
        {/* Navbar */}
        <header className="border-b glass sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <Link href="/" className="text-xl font-serif font-bold hover:text-primary transition-colors">
              Bruno Mars LATAM
            </Link>
            <div className="flex items-center gap-4">
              <Link
                href="/blog"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors hidden md:inline"
              >
                Blog
              </Link>
              <ThemeToggle />
            </div>
          </div>
        </header>

        <main className="flex-1">
          <article className="container mx-auto px-4 py-12 max-w-4xl">
            {/* Back button */}
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
            >
              <ArrowLeft className="h-4 w-4" />
              Volver al blog
            </Link>

            {/* Hero image */}
            <div className="relative aspect-video rounded-lg overflow-hidden mb-8">
              <OptimizedImage
                src={post.image}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Header */}
            <header className="mb-8">
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                <span className="inline-flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {formattedDate}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {post.readingTime}
                </span>
                <span className="px-3 py-1 rounded-full bg-muted text-xs font-medium">
                  {post.category}
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
                {post.title}
              </h1>
              <p className="text-xl text-muted-foreground">
                {post.description}
              </p>
            </header>

            {/* Content */}
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <MDXRemote source={post.content} components={MDXComponents} />
            </div>
          </article>

          {/* Related posts */}
          {relatedPosts.length > 0 && (
            <section className="border-t bg-muted/30 py-16 mt-16">
              <div className="container mx-auto px-4">
                <h2 className="text-3xl font-serif font-bold mb-8 text-center">
                  Artículos Relacionados
                </h2>
                <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                  {relatedPosts.map((relatedPost) => (
                    <BlogCard key={relatedPost.slug} post={relatedPost} />
                  ))}
                </div>
              </div>
            </section>
          )}
        </main>

        {/* Footer */}
        <footer className="border-t py-8">
          <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
            <p>&copy; 2027 Bruno Mars LATAM. Todos los derechos reservados.</p>
          </div>
        </footer>
      </div>
    </>
  )
}
