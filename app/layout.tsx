import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import '../src/styles.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Nature View - Interactive Wildlife Explorer',
  description: 'Explore diverse biomes and wildlife in stunning 3D environments. From Arctic polar bears to African savannas, discover Earth\'s incredible habitats.',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} m-0 p-0`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  )
} 