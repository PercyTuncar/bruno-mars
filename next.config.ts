import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export',
  eslint: {
    ignoreDuringBuilds: false,
  },
  images: {
    unoptimized: true, // Requerido para static export
  },
  // Configuración MDX
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  // Optimizaciones de compilación
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Optimización de chunks
  experimental: {
    optimizePackageImports: ['lucide-react', '@radix-ui/react-slot'],
  },
}

export default nextConfig
