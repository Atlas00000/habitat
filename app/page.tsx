"use client"

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  Snowflake, 
  TreePine, 
  Mountain, 
  Sun,
  ArrowRight
} from 'lucide-react'
import { 
  MobileLayout, 
  MobileContainer, 
  MobileGrid, 
  MobileCard, 
  MobileText, 
  MobileHeading 
} from '../src/components/MobileLayout'

export default function HomePage() {
  const environments = [
    {
      id: 'arctic',
      name: 'Arctic Biome',
      description: 'Explore the frozen wilderness with polar bears and ice',
      gradient: 'from-blue-50 to-cyan-100',
      color: 'blue',
      icon: Snowflake,
      path: '/arctic',
      bgGradient: 'from-blue-900 via-cyan-800 to-slate-900'
    },
    {
      id: 'forest',
      name: 'Forest Biome',
      description: 'Discover lush forests with diverse wildlife',
      gradient: 'from-green-50 to-emerald-100',
      color: 'green',
      icon: TreePine,
      path: '/forest',
      bgGradient: 'from-green-900 via-green-800 to-emerald-900'
    },
    {
      id: 'mountain',
      name: 'Mountain Biome',
      description: 'Scale the peaks and explore alpine environments',
      gradient: 'from-gray-50 to-slate-100',
      color: 'gray',
      icon: Mountain,
      path: '/mountain',
      bgGradient: 'from-gray-900 via-slate-800 to-stone-900'
    },
    {
      id: 'safari',
      name: 'Safari Biome',
      description: 'Experience African wildlife in their natural habitat',
      gradient: 'from-yellow-50 to-orange-100',
      color: 'orange',
      icon: Sun,
      path: '/safari',
      bgGradient: 'from-yellow-900 via-orange-800 to-amber-900'
    }
  ]

  return (
    <MobileLayout>
      <main className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-800 to-blue-900 relative">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-32 h-32 bg-purple-400/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute top-40 right-20 w-40 h-40 bg-indigo-400/20 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-blue-400/20 rounded-full blur-3xl animate-pulse delay-2000" />
        </div>

        <div className="relative z-10 container mx-auto">
          <MobileContainer>
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-8 md:mb-16"
            >
              <MobileHeading level={1} className="mb-4 md:mb-6">
                Habitat Explorer
              </MobileHeading>
              <MobileText size="lg" className="max-w-3xl mx-auto">
                Journey through Earth's most diverse biomes and discover the incredible wildlife 
                that calls each unique environment home
              </MobileText>
            </motion.div>
            
            <MobileGrid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 max-w-7xl mx-auto">
              {environments.map((env, index) => (
                <motion.div
                  key={env.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Link
                    href={env.path}
                    className="group relative overflow-hidden rounded-2xl shadow-2xl transition-all duration-500 hover:scale-105 hover:shadow-3xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 block h-full"
                  >
                    <div className="aspect-square p-4 md:p-8 flex flex-col justify-center items-center text-center relative">
                      {/* Background gradient overlay */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${env.bgGradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />
                      
                      <div className="relative z-10">
                        <div className={`w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-300`}>
                          <env.icon className={`w-6 h-6 md:w-8 md:h-8 text-white`} />
                        </div>
                        <h2 className="text-lg md:text-2xl font-bold text-white mb-2 md:mb-3 group-hover:text-white transition-colors">
                          {env.name}
                        </h2>
                        <p className="text-sm md:text-base text-white/80 group-hover:text-white/90 transition-colors mb-4 md:mb-6">
                          {env.description}
                        </p>
                        <div className="flex items-center justify-center space-x-2 text-white/70 group-hover:text-white transition-colors">
                          <span className="text-xs md:text-sm font-medium">Explore</span>
                          <ArrowRight className="w-3 h-3 md:w-4 md:h-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </MobileGrid>

            {/* Additional info */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-center mt-8 md:mt-16"
            >
              <MobileText size="sm" className="max-w-2xl mx-auto">
                Each biome features stunning glass-morphism design, real animal data, 
                and interactive elements that bring these incredible ecosystems to life.
              </MobileText>
            </motion.div>
          </MobileContainer>
        </div>
      </main>
    </MobileLayout>
  )
} 