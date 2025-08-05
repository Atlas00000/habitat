import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../src/styles.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Arctic Region Viewer',
  description: 'Interactive 3D Arctic environment with polar bear',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} m-0 p-0 overflow-hidden`} suppressHydrationWarning>{children}</body>
    </html>
  )
} 