import Link from 'next/link'
import { Calendar, Clock, Tag } from 'lucide-react'
import type { BlogPostMetadata } from '@/lib/blog'
import { OptimizedImage } from '@/components/ui/OptimizedImage'
import { cn } from '@/lib/utils'

interface BlogCardProps {
  post: BlogPostMetadata
  featured?: boolean
}

export function BlogCard({ post, featured = false }: BlogCardProps) {
  const formattedDate = new Date(post.date).toLocaleDateString('es', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  if (featured) {
    return (
      <Link href={`/blog/${post.slug}`} className="group block">
        <article className="grid md:grid-cols-2 gap-6 matte p-6 rounded-lg border-2 border-transparent hover:border-primary/50 transition-all">
          <div className="relative aspect-video rounded-lg overflow-hidden">
            <OptimizedImage
              src={post.image}
              alt={post.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              priority={featured}
            />
          </div>
          <div className="flex flex-col justify-center">
            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
              <span className="inline-flex items-center gap-1">
                <Tag className="h-4 w-4" />
                {post.category}
              </span>
              <span className="inline-flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {formattedDate}
              </span>
              <span className="inline-flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {post.readingTime}
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-serif font-bold mb-3 group-hover:text-primary transition-colors">
              {post.title}
            </h2>
            <p className="text-muted-foreground mb-4 line-clamp-2">
              {post.description}
            </p>
            <span className="text-primary font-medium inline-flex items-center gap-2">
              Leer artículo →
            </span>
          </div>
        </article>
      </Link>
    )
  }

  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <article className="matte p-6 rounded-lg border-2 border-transparent hover:border-primary/50 transition-all h-full flex flex-col">
        <div className="relative aspect-video rounded-lg overflow-hidden mb-4">
          <OptimizedImage
            src={post.image}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
          <span className="inline-flex items-center gap-1">
            <Tag className="h-3 w-3" />
            {post.category}
          </span>
          <span className="inline-flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {formattedDate}
          </span>
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {post.readingTime}
          </span>
        </div>
        <h3 className="text-xl font-serif font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2">
          {post.title}
        </h3>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-3 flex-grow">
          {post.description}
        </p>
        <span className="text-primary font-medium text-sm inline-flex items-center gap-2">
          Leer más →
        </span>
      </article>
    </Link>
  )
}
