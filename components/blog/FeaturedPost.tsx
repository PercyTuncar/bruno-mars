'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Calendar, Clock, ArrowRight, Sparkles } from 'lucide-react'

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

interface FeaturedPostProps {
  post: Post
}

export function FeaturedPost({ post }: FeaturedPostProps) {
  const formattedDate = new Date(post.date).toLocaleDateString('es', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <Link href={`/blog/${post.slug}`} className="group block">
        <article className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-card to-card/50 border border-border/50 hover:border-purple-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/10">
          {/* Background gradient on hover */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full filter blur-3xl" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-pink-500/10 rounded-full filter blur-3xl" />
          </div>

          <div className="relative grid lg:grid-cols-2 gap-8 p-8 lg:p-12">
            {/* Left: Image */}
            <div className="relative order-2 lg:order-1">
              <div className="relative aspect-video lg:aspect-square rounded-2xl overflow-hidden border border-white/10 shadow-lg group-hover:shadow-2xl transition-shadow duration-500">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* Featured badge */}
                <div className="absolute top-4 left-4">
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold shadow-lg">
                    <Sparkles className="w-3 h-3" />
                    DESTACADO
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Content */}
            <div className="flex flex-col justify-center order-1 lg:order-2 space-y-6">
              {/* Category */}
              <div className="flex items-center gap-3">
                <span className="px-4 py-1.5 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 text-purple-600 dark:text-purple-400 text-sm font-semibold">
                  {post.category}
                </span>
              </div>

              {/* Title */}
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black leading-tight group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">
                {post.title}
              </h2>

              {/* Description */}
              <p className="text-lg text-muted-foreground leading-relaxed">
                {post.description}
              </p>

              {/* Meta */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {formattedDate}
                </div>
                <div className="w-1 h-1 rounded-full bg-muted-foreground/30" />
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {post.readingTime}
                </div>
              </div>

              {/* CTA */}
              <div className="pt-2">
                <div className="inline-flex items-center gap-2 text-purple-600 dark:text-purple-400 font-semibold group-hover:gap-3 transition-all">
                  Leer artículo completo
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </div>
        </article>
      </Link>
    </motion.div>
  )
}
