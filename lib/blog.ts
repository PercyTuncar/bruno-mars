import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'

const postsDirectory = path.join(process.cwd(), 'content/blog')

export interface BlogPost {
  slug: string
  title: string
  description: string
  date: string
  author: string
  image: string
  category: string
  readingTime: string
  content: string
}

export interface BlogPostMetadata {
  slug: string
  title: string
  description: string
  date: string
  author: string
  image: string
  category: string
  readingTime: string
}

/**
 * Obtiene todos los slugs de posts disponibles
 */
export function getAllPostSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) {
    return []
  }

  const files = fs.readdirSync(postsDirectory)
  return files
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => file.replace(/\.mdx$/, ''))
}

/**
 * Obtiene el contenido completo de un post por slug
 */
export function getPostBySlug(slug: string): BlogPost | null {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)
    const stats = readingTime(content)

    return {
      slug,
      title: data.title,
      description: data.description,
      date: data.date,
      author: data.author || 'Bruno Mars LATAM',
      image: data.image || '/images/blog/default.jpg',
      category: data.category || 'General',
      readingTime: stats.text,
      content,
    }
  } catch (error) {
    return null
  }
}

/**
 * Obtiene los metadatos de todos los posts (sin contenido completo)
 * Ordenados por fecha descendente
 */
export function getAllPosts(): BlogPostMetadata[] {
  const slugs = getAllPostSlugs()
  const posts = slugs
    .map((slug) => {
      const post = getPostBySlug(slug)
      if (!post) return null

      // Retornar solo metadata
      const { content, ...metadata } = post
      return metadata
    })
    .filter((post): post is BlogPostMetadata => post !== null)
    .sort((a, b) => (new Date(b.date).getTime() - new Date(a.date).getTime()))

  return posts
}

/**
 * Obtiene posts relacionados por categoría
 */
export function getRelatedPosts(slug: string, limit: number = 3): BlogPostMetadata[] {
  const currentPost = getPostBySlug(slug)
  if (!currentPost) return []

  const allPosts = getAllPosts()
  return allPosts
    .filter((post) => post.slug !== slug && post.category === currentPost.category)
    .slice(0, limit)
}
