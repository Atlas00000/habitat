"use client"

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { 
  Home, 
  Snowflake, 
  TreePine, 
  Mountain, 
  Sun,
  Menu,
  X
} from 'lucide-react'
import { 
  MobileLayout, 
  MobileContainer, 
  MobileButton 
} from './MobileLayout'

interface HeaderProps {
  className?: string
}

export function Header({ className = "" }: HeaderProps) {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)

  const navigation = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Arctic', href: '/arctic', icon: Snowflake },
    { name: 'Forest', href: '/forest', icon: TreePine },
    { name: 'Mountain', href: '/mountain', icon: Mountain },
    { name: 'Safari', href: '/safari', icon: Sun }
  ]

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/'
    }
    return pathname.startsWith(href)
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 bg-emerald-900/20 backdrop-blur-sm border-b border-emerald-400/20 ${className}`}>
      <MobileContainer className="py-2 md:py-4">
        <div className="flex items-center justify-between">
          {/* Logo/Brand */}
          <Link href="/" className="flex items-center space-x-2 group">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="w-8 h-8 md:w-10 md:h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center border border-emerald-400/30"
            >
              <TreePine className="w-5 h-5 md:w-6 md:h-6 text-emerald-300" />
            </motion.div>
            <span className="text-white font-bold text-lg md:text-xl group-hover:text-emerald-200 transition-colors">
              Habitat Explorer
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => {
              const Icon = item.icon
              const active = isActive(item.href)
              
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                    active 
                      ? 'bg-emerald-500/20 text-emerald-200 border border-emerald-400/30' 
                      : 'text-emerald-200/70 hover:text-emerald-200 hover:bg-emerald-500/10'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              )
            })}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 transition-colors border border-emerald-400/30"
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5 text-emerald-200" />
            ) : (
              <Menu className="w-5 h-5 text-emerald-200" />
            )}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        <motion.div
          initial={false}
          animate={isMobileMenuOpen ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden overflow-hidden"
        >
          <div className="pt-4 pb-2 space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon
              const active = isActive(item.href)
              
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    active 
                      ? 'bg-emerald-500/20 text-emerald-200 border border-emerald-400/30' 
                      : 'text-emerald-200/70 hover:text-emerald-200 hover:bg-emerald-500/10'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              )
            })}
          </div>
        </motion.div>
      </MobileContainer>
    </header>
  )
}

export function HeaderSpacer() {
  return <div className="h-16 md:h-20" />
} 