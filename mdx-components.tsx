import type { MDXComponents } from 'mdx/types'
import { MDXComponents as CustomMDXComponents } from '@/components/blog/MDXComponents'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...CustomMDXComponents,
    ...components,
  }
}
