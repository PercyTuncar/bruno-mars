import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from '@/components/layout/ThemeProvider'
import { ThemeScript } from '@/components/layout/ThemeScript'
import { JsonLd } from '@/components/seo/JsonLd'
import { buildOrganizationSchema } from '@/lib/seo/jsonld'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://brunomars.lat'),
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <ThemeScript />
        <JsonLd data={buildOrganizationSchema()} />
        {/* Google Fonts - Inter Bold (serio, autoridad) */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased min-h-screen bg-background text-foreground">
        <ThemeProvider defaultTheme="dark" storageKey="brunomars-theme">
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
