"use client"

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  Home, 
  Snowflake, 
  TreePine, 
  Mountain, 
  Sun,
  ArrowLeft,
  Search
} from 'lucide-react'
import { 
  MobileLayout, 
  MobileContainer, 
  MobileGrid, 
  MobileText, 
  MobileHeading 
} from '../src/components/MobileLayout'

export default function NotFound() {
  const availablePages = [
    { name: 'Home', href: '/', icon: Home, description: 'Main landing page' },
    { name: 'Arctic', href: '/arctic', icon: Snowflake, description: 'Polar bears and ice environments' },
    { name: 'Forest', href: '/forest', icon: TreePine, description: 'Black bears and rainforest' },
    { name: 'Mountain', href: '/mountain', icon: Mountain, description: 'Alpine peaks and climbers' },
    { name: 'Safari', href: '/safari', icon: Sun, description: 'African wildlife and savanna' }
  ]

  return (
    <MobileLayout>
      <main className="min-h-screen bg-gradient-to-br from-emerald-900 via-teal-800 to-cyan-700 relative">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-32 h-32 bg-emerald-400/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute top-40 right-20 w-40 h-40 bg-teal-400/20 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-cyan-400/20 rounded-full blur-3xl animate-pulse delay-2000" />
        </div>

        <div className="relative z-10 container mx-auto">
          <MobileContainer>
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-8 md:mb-16"
            >
              <div className="flex justify-center mb-6">
                <div className="w-24 h-24 md:w-32 md:h-32 bg-emerald-500/20 backdrop-blur-xl rounded-full flex items-center justify-center border border-emerald-400/30">
                  <Search className="w-12 h-12 md:w-16 md:h-16 text-emerald-300" />
                </div>
              </div>
              
              <MobileHeading level={1} className="mb-4 md:mb-6">
                Page Not Found
              </MobileHeading>
              <MobileText size="lg" className="max-w-2xl mx-auto">
                The page you're looking for doesn't exist yet. 
                But don't worry - we have plenty of amazing habitats to explore!
              </MobileText>
            </motion.div>

            {/* Available Pages */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-8 md:mb-12"
            >
              <MobileHeading level={2} className="mb-6 text-center">
                Available Habitats
              </MobileHeading>
              
              <MobileGrid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
                {availablePages.map((page, index) => {
                  const Icon = page.icon
                  return (
                    <motion.div
                      key={page.name}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                    >
                      <Link
                        href={page.href}
                        className="group block p-6 rounded-2xl bg-emerald-500/10 backdrop-blur-xl border border-emerald-400/20 hover:bg-emerald-500/15 transition-all duration-300 hover:scale-105"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-emerald-500/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Icon className="w-6 h-6 text-emerald-300" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-white font-bold text-lg mb-1">
                              {page.name}
                            </h3>
                            <p className="text-emerald-200 text-sm">
                              {page.description}
                            </p>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  )
                })}
              </MobileGrid>
            </motion.div>

            {/* Back to Home */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-center"
            >
              <Link
                href="/"
                className="inline-flex items-center space-x-2 px-6 py-3 bg-emerald-500/20 backdrop-blur-sm border border-emerald-400/30 rounded-lg text-emerald-200 font-medium hover:bg-emerald-500/30 transition-all duration-200 group"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                <span>Back to Home</span>
              </Link>
            </motion.div>

            {/* Additional Info */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="text-center mt-8 md:mt-12"
            >
              <MobileText size="sm" className="max-w-2xl mx-auto">
                More habitats and animals are coming soon! 
                We're constantly expanding our collection of interactive 3D environments.
              </MobileText>
            </motion.div>
          </MobileContainer>
        </div>
      </main>
    </MobileLayout>
  )
} 