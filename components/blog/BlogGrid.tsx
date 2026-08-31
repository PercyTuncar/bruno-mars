'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Calendar, Clock, ArrowRight } from 'lucide-react'

interface Post {
  slug: string
  title: string
  description: string
  date: string
  author: string
  category: string
  image: string
  readingTime: string
}

interface BlogGridProps {
  posts: Post[]
}

export function BlogGrid({ posts }: BlogGridProps) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {posts.map((post, index) => {
        const formattedDate = new Date(post.date).toLocaleDateString('es', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        })

        return (
          <motion.div
            key={post.slug}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Link href={`/blog/${post.slug}`} className="group block h-full">
              <article className="relative h-full flex flex-col overflow-hidden rounded-2xl bg-card border border-border/50 hover:border-purple-500/50 transition-all duration-500 hover:shadow-xl hover:shadow-purple-500/10 hover:-translate-y-1">
                {/* Image */}
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  {/* Category badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-white/90 dark:bg-black/90 backdrop-blur-sm text-xs font-semibold">
                      {post.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col p-6 space-y-4">
                  {/* Meta */}
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      {formattedDate}
                    </div>
                    <div className="w-1 h-1 rounded-full bg-muted-foreground/30" />
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      {post.readingTime}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold leading-tight group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors line-clamp-2">
                    {post.title}
                  </h3>

                  {/* Description */}
                  <p className="flex-1 text-sm text-muted-foreground leading-relaxed line-clamp-3">
                    {post.description}
                  </p>

                  {/* CTA */}
                  <div className="pt-2">
                    <div className="inline-flex items-center gap-2 text-sm font-semibold text-purple-600 dark:text-purple-400 group-hover:gap-3 transition-all">
                      Leer más
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </article>
            </Link>
          </motion.div>
        )
      })}
    </div>
  )
}
