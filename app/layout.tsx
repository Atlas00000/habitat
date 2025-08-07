import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../src/styles.css'
import { Header, HeaderSpacer } from '../src/components/Header'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Habitat Explorer - Interactive 3D Wildlife Environments',
  description: 'Explore diverse biomes and wildlife in stunning 3D environments. From Arctic polar bears to African savannas, discover Earth\'s incredible habitats.',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} m-0 p-0`} suppressHydrationWarning>
        <Header />
        <HeaderSpacer />
        {children}
      </body>
    </html>
  )
} 