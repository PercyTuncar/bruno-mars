'use client'

import { useState } from 'react'
import { Facebook, Twitter, Linkedin, Link2, Check } from 'lucide-react'

interface ShareButtonsProps {
  title: string
  url: string
}

export function ShareButtons({ title, url }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false)

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
  }

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold">Compartir este artículo</h3>
      <div className="flex flex-wrap gap-3">
        <a
          href={shareLinks.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#1877F2] text-white hover:opacity-90 transition-opacity"
          aria-label="Compartir en Facebook"
        >
          <Facebook className="w-5 h-5" />
          <span className="font-medium">Facebook</span>
        </a>

        <a
          href={shareLinks.twitter}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#1DA1F2] text-white hover:opacity-90 transition-opacity"
          aria-label="Compartir en Twitter"
        >
          <Twitter className="w-5 h-5" />
          <span className="font-medium">Twitter</span>
        </a>

        <a
          href={shareLinks.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#0A66C2] text-white hover:opacity-90 transition-opacity"
          aria-label="Compartir en LinkedIn"
        >
          <Linkedin className="w-5 h-5" />
          <span className="font-medium">LinkedIn</span>
        </a>

        <button
          onClick={handleCopyLink}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-muted hover:bg-muted/80 transition-colors border"
          aria-label="Copiar enlace"
        >
          {copied ? (
            <>
              <Check className="w-5 h-5 text-green-600" />
              <span className="font-medium text-green-600">¡Copiado!</span>
            </>
          ) : (
            <>
              <Link2 className="w-5 h-5" />
              <span className="font-medium">Copiar enlace</span>
            </>
          )}
        </button>
      </div>
    </div>
  )
}
