'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

interface Category {
  name: string
  slug: string
  count: number
}

interface BlogCategoriesProps {
  categories: Category[]
}

export function BlogCategories({ categories }: BlogCategoriesProps) {
  const [activeCategory, setActiveCategory] = useState('all')

  return (
    <div className="mb-12">
      <div className="flex flex-wrap gap-3">
        {categories.map((category, index) => (
          <motion.button
            key={category.slug}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            onClick={() => setActiveCategory(category.slug)}
            className={`
              relative px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300
              ${
                activeCategory === category.slug
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/30 scale-105'
                  : 'bg-card border border-border hover:border-purple-500/50 hover:bg-card/80'
              }
            `}
          >
            {category.name}
            {category.count > 0 && (
              <span
                className={`
                  ml-2 inline-flex items-center justify-center min-w-[1.5rem] h-6 px-2 rounded-full text-xs font-bold
                  ${
                    activeCategory === category.slug
                      ? 'bg-white/20 text-white'
                      : 'bg-muted text-muted-foreground'
                  }
                `}
              >
                {category.count}
              </span>
            )}
          </motion.button>
        ))}
      </div>
    </div>
  )
}
