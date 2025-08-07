"use client"

import React from 'react'
import { motion } from 'framer-motion'

interface MobileLayoutProps {
  children: React.ReactNode
  className?: string
  showScrollIndicator?: boolean
}

export function MobileLayout({ 
  children, 
  className = "", 
  showScrollIndicator = true 
}: MobileLayoutProps) {
  return (
    <div className={`mobile-layout ${className}`}>
      {children}
      
      {/* Mobile scroll indicator */}
      {showScrollIndicator && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="fixed bottom-4 right-4 z-50 md:hidden"
        >
          <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
            <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" />
          </div>
        </motion.div>
      )}
    </div>
  )
}

export function MobileContainer({ 
  children, 
  className = "" 
}: { 
  children: React.ReactNode
  className?: string 
}) {
  return (
    <div className={`mobile-container px-4 md:px-6 py-4 md:py-6 ${className}`}>
      {children}
    </div>
  )
}

export function MobileGrid({ 
  children, 
  className = "" 
}: { 
  children: React.ReactNode
  className?: string 
}) {
  return (
    <div className={`mobile-grid grid gap-4 md:gap-6 ${className}`}>
      {children}
    </div>
  )
}

export function MobileCard({ 
  children, 
  className = "" 
}: { 
  children: React.ReactNode
  className?: string 
}) {
  return (
    <div className={`mobile-card bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-4 md:p-6 ${className}`}>
      {children}
    </div>
  )
}

export function MobileButton({ 
  children, 
  className = "",
  ...props 
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode
  className?: string
}) {
  return (
    <button 
      className={`mobile-button min-h-[44px] min-w-[44px] bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-2 text-white font-medium transition-all duration-200 active:scale-95 ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

type TextSize = 'sm' | 'base' | 'lg' | 'xl'

export function MobileText({ 
  children, 
  className = "",
  size = 'base'
}: { 
  children: React.ReactNode
  className?: string
  size?: TextSize
}) {
  const sizeClasses = {
    sm: 'text-sm',
    base: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl'
  }

  return (
    <div className={`mobile-text ${sizeClasses[size]} text-white/80 leading-relaxed ${className}`}>
      {children}
    </div>
  )
}

export function MobileHeading({ 
  children, 
  className = "",
  level = 1
}: { 
  children: React.ReactNode
  className?: string
  level?: 1 | 2 | 3
}) {
  const levelClasses = {
    1: 'text-2xl md:text-4xl lg:text-6xl font-bold',
    2: 'text-xl md:text-2xl lg:text-3xl font-bold',
    3: 'text-lg md:text-xl lg:text-2xl font-semibold'
  }

  const Tag = `h${level}` as keyof JSX.IntrinsicElements

  return (
    <Tag className={`mobile-heading text-white ${levelClasses[level]} ${className}`}>
      {children}
    </Tag>
  )
}

// Mobile-specific utilities
export function MobileSafeArea({ 
  children, 
  className = "" 
}: { 
  children: React.ReactNode
  className?: string 
}) {
  return (
    <div className={`mobile-safe-area pb-safe pt-safe ${className}`}>
      {children}
    </div>
  )
}

export function MobileScrollContainer({ 
  children, 
  className = "" 
}: { 
  children: React.ReactNode
  className?: string 
}) {
  return (
    <div className={`mobile-scroll-container overflow-y-auto overflow-x-hidden ${className}`}>
      {children}
    </div>
  )
}

export function MobileTouchTarget({ 
  children, 
  className = "",
  ...props 
}: React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div 
      className={`mobile-touch-target min-h-[44px] min-w-[44px] flex items-center justify-center ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}

export function MobileResponsiveImage({ 
  src, 
  alt, 
  className = "" 
}: { 
  src: string
  alt: string
  className?: string 
}) {
  return (
    <img 
      src={src} 
      alt={alt} 
      className={`mobile-responsive-image w-full h-auto object-cover ${className}`}
      loading="lazy"
    />
  )
}

export function MobileStatusBar({ 
  children, 
  className = "" 
}: { 
  children: React.ReactNode
  className?: string 
}) {
  return (
    <div className={`mobile-status-bar fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-sm border-b border-white/10 ${className}`}>
      {children}
    </div>
  )
}

export function MobileBottomNav({ 
  children, 
  className = "" 
}: { 
  children: React.ReactNode
  className?: string 
}) {
  return (
    <div className={`mobile-bottom-nav fixed bottom-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-sm border-t border-white/10 pb-safe ${className}`}>
      {children}
    </div>
  )
} 