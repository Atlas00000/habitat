"use client"

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  Sun, 
  Thermometer, 
  Wind,
  TreePine,
  ArrowLeft
} from 'lucide-react'
import { lionData } from '../../src/data/lion-data'
import { 
  GlassWidget, 
  StatsWidget, 
  FactCarousel, 
  AnimalCard, 
  AnimatedBackground, 
  SectionHeader 
} from '../../src/components/GlassComponents'
import { 
  MobileLayout, 
  MobileContainer, 
  MobileGrid, 
  MobileText, 
  MobileHeading 
} from '../../src/components/MobileLayout'

export default function SafariPage() {
  const animals = [
    {
      id: 'lion',
      name: 'Lion',
      description: 'Discover the majestic lion in its savanna habitat',
      path: '/safari/lion',
      gradient: 'from-yellow-50 to-orange-100',
      data: lionData,
      icon: '🦁'
    }
  ]

  const safariStats = [
    { icon: Sun, label: "Temperature", value: "70°F to 95°F", color: "bg-yellow-500" },
    { icon: Thermometer, label: "Rainfall", value: "20-40 inches", color: "bg-orange-500" },
    { icon: Wind, label: "Humidity", value: "40-60%", color: "bg-amber-500" },
    { icon: TreePine, label: "Vegetation", value: "Grasslands", color: "bg-green-500" }
  ]

  const funFacts = [
    "Savannas cover 20% of Earth's land surface",
    "The African savanna is home to the largest land animals",
    "Grasslands support the highest density of herbivores",
    "Savannas have distinct wet and dry seasons"
  ]

  return (
    <MobileLayout>
      <main className="min-h-screen bg-gradient-to-br from-yellow-900 via-orange-800 to-amber-900 relative">
        {/* Enhanced Animated Background */}
        <div className="fixed inset-0 pointer-events-none">
          {/* Base gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-900 via-orange-800 to-amber-900" />
          
          {/* Animated mesh gradient overlay */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-yellow-400/10 via-orange-400/10 to-amber-400/10 animate-pulse" />
            <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-yellow-300/5 to-orange-300/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
            <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-gradient-to-br from-amber-300/5 to-yellow-300/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
          </div>

          {/* Floating Dust Particles */}
          {Array.from({ length: 25 }).map((_, i) => {
            // Use deterministic positioning based on index to avoid hydration mismatch
            const left = (i * 4) % 100
            const top = (i * 3) % 100
            const duration = 4 + (i % 2)
            const delay = (i % 2)
            const xOffset = (i % 3) - 1 // Deterministic x movement
            
            return (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-yellow-200/40 rounded-full"
                style={{
                  left: `${left}%`,
                  top: `${top}%`,
                }}
                animate={{
                  y: [0, -15, 0],
                  x: [0, xOffset * 5, 0],
                  opacity: [0.4, 0.9, 0.4],
                  scale: [1, 1.4, 1],
                }}
                transition={{
                  duration,
                  repeat: Infinity,
                  delay,
                  ease: "easeInOut",
                }}
              />
            )
          })}
          
          {/* Enhanced Light Rays */}
          <div className="absolute inset-0 opacity-40">
            <motion.div 
              className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-yellow-300/40 to-transparent"
              animate={{ opacity: [0.4, 0.9, 0.4] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div 
              className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-orange-300/30 to-transparent"
              animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 5, repeat: Infinity, delay: 1, ease: "easeInOut" }}
            />
            <motion.div 
              className="absolute top-0 left-2/3 w-px h-full bg-gradient-to-b from-transparent via-amber-300/20 to-transparent"
              animate={{ opacity: [0.2, 0.6, 0.2] }}
              transition={{ duration: 6, repeat: Infinity, delay: 2, ease: "easeInOut" }}
            />
          </div>
        </div>

        <div className="relative z-10 container mx-auto">
          <MobileContainer>
            {/* Enhanced Header */}
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-8"
            >
              <motion.div
                className="flex items-center justify-center space-x-3 mb-4"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <motion.div
                  className="w-12 h-12 bg-yellow-500/20 backdrop-blur-xl rounded-full flex items-center justify-center border border-yellow-400/30"
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <Sun className="w-6 h-6 text-yellow-300" />
                </motion.div>
                <h1 className="text-3xl font-bold text-white">Safari Biome 🌍</h1>
              </motion.div>
              <p className="text-yellow-200 text-lg max-w-2xl mx-auto">
                Experience the vast savannas and their magnificent wildlife
              </p>
            </motion.div>

            {/* Enhanced Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-8 md:mb-12"
        >
          {safariStats.map((stat, index) => (
                <motion.div
              key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: 0.5 + index * 0.1,
                    type: "spring",
                    stiffness: 100
                  }}
                  whileHover={{ scale: 1.05 }}
                  className="bg-white/10 backdrop-blur-xl rounded-xl p-4 border border-white/20 shadow-lg"
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-lg ${stat.color} flex items-center justify-center`}>
                      <stat.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-sm text-yellow-200 font-medium">{stat.label}</div>
                      <div className="text-lg font-bold text-white">{stat.value}</div>
                    </div>
                  </div>
                </motion.div>
          ))}
        </motion.div>

        {/* Main content grid */}
            <div className="grid lg:grid-cols-3 gap-6 md:gap-8 mb-8 md:mb-12">
          {/* Safari Overview */}
          <div className="lg:col-span-2">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-lg"
                >
                  <motion.div
                    className="flex items-center space-x-3 mb-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                  >
                    <motion.div
                      className="w-10 h-10 bg-yellow-500/20 rounded-lg flex items-center justify-center"
                      whileHover={{ scale: 1.1 }}
                    >
                      <Sun className="w-5 h-5 text-yellow-300" />
                    </motion.div>
                    <h2 className="text-2xl font-bold text-white">Safari Overview</h2>
                  </motion.div>
                  
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 1.0 }}
                    className="text-yellow-200 mb-6 leading-relaxed"
                  >
                    Savannas are vast grasslands characterized by scattered trees and seasonal 
                    rainfall patterns. These open landscapes support some of the world's most 
                    iconic wildlife, from majestic lions to towering giraffes, all adapted 
                    to life in these dynamic ecosystems.
                  </motion.p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                    {[
                      { color: "bg-yellow-400", title: "Grasslands", desc: "Vast open plains with tall grasses" },
                      { color: "bg-orange-400", title: "Scattered Trees", desc: "Isolated trees providing shade and food" },
                      { color: "bg-amber-400", title: "Seasonal Rivers", desc: "Water sources that flow during wet seasons" },
                      { color: "bg-green-400", title: "Wildlife Corridors", desc: "Migration paths for large herbivores" }
                    ].map((item, index) => (
                      <motion.div
                        key={item.title}
                        className="space-y-2 md:space-y-3"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 1.2 + index * 0.1 }}
                      >
                  <div className="flex items-center space-x-2">
                          <div className={`w-3 h-3 ${item.color} rounded-full`}></div>
                          <h3 className="text-sm md:text-base font-semibold text-white">{item.title}</h3>
                  </div>
                        <p className="text-sm text-yellow-200">{item.desc}</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
          </div>

          {/* Fun Facts */}
          <div>
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.9 }}
                  className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-lg h-fit"
                >
                  <motion.div
                    className="flex items-center space-x-3 mb-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 1.1 }}
                  >
                    <motion.div
                      className="w-10 h-10 bg-yellow-500/20 rounded-lg flex items-center justify-center"
                      whileHover={{ scale: 1.1 }}
                    >
                      <Sun className="w-5 h-5 text-yellow-300" />
                    </motion.div>
                    <h3 className="text-xl font-bold text-white">Did You Know?</h3>
                  </motion.div>
                  
                  <div className="space-y-4">
                    {funFacts.map((fact, index) => (
                      <motion.div
                        key={index}
                        className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/10"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 1.3 + index * 0.1 }}
                        whileHover={{ scale: 1.02, backgroundColor: "rgba(255, 255, 255, 0.15)" }}
                      >
                        <p className="text-sm text-yellow-200 leading-relaxed">{fact}</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
          </div>
        </div>

        {/* Animals Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.5 }}
            >
              <motion.div
                className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-lg"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 1.7 }}
              >
                <motion.h2
                  className="text-2xl font-bold text-white mb-6 text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 1.9 }}
                >
              Safari Inhabitants
                </motion.h2>
                <div className="grid md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 gap-4 md:gap-6 max-w-2xl mx-auto">
              {animals.map((animal, index) => (
                    <motion.div
                  key={animal.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 2.0 + index * 0.2 }}
                      whileHover={{ scale: 1.02 }}
                      className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 cursor-pointer"
                      onClick={() => window.location.href = animal.path}
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 bg-yellow-500/20 rounded-full flex items-center justify-center">
                          <span className="text-2xl">{animal.icon}</span>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-white mb-1">{animal.name}</h3>
                          <p className="text-yellow-200 text-sm">{animal.description}</p>
                        </div>
                        <motion.div
                          whileHover={{ x: 5 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ArrowLeft className="w-5 h-5 text-yellow-300 rotate-180" />
                        </motion.div>
                      </div>
                    </motion.div>
              ))}
            </div>
              </motion.div>
        </motion.div>

        {/* Safari Ecosystem Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.2 }}
          className="mt-8"
        >
          <motion.div
            className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-lg"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 2.4 }}
            whileHover={{ scale: 1.02, boxShadow: "0 25px 50px rgba(0, 0, 0, 0.3)" }}
          >
            <motion.h2
              className="text-2xl font-bold text-white mb-6 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 2.6 }}
            >
              Safari Ecosystem 🌍
            </motion.h2>
            <div className="grid md:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 2.8 }}
                className="space-y-4"
              >
                <div className="bg-yellow-500/20 backdrop-blur-sm rounded-lg p-4 border border-yellow-400/30">
                  <h3 className="text-lg font-bold text-white mb-2">🌾 Grasslands</h3>
                  <p className="text-yellow-200 text-sm leading-relaxed">
                    Vast open plains provide grazing for herbivores and hunting grounds for predators, supporting the classic safari experience.
                  </p>
                </div>
                <div className="bg-orange-500/20 backdrop-blur-sm rounded-lg p-4 border border-orange-400/30">
                  <h3 className="text-lg font-bold text-white mb-2">🌳 Acacia Woodlands</h3>
                  <p className="text-orange-200 text-sm leading-relaxed">
                    Scattered trees provide shade and shelter for wildlife, creating perfect spots for wildlife viewing and photography.
                  </p>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 3.0 }}
                className="space-y-4"
              >
                <div className="bg-amber-500/20 backdrop-blur-sm rounded-lg p-4 border border-amber-400/30">
                  <h3 className="text-lg font-bold text-white mb-2">💧 Waterholes</h3>
                  <p className="text-amber-200 text-sm leading-relaxed">
                    Vital water sources attract diverse wildlife, creating natural gathering spots for observation and photography.
                  </p>
                </div>
                <div className="bg-red-500/20 backdrop-blur-sm rounded-lg p-4 border border-red-400/30">
                  <h3 className="text-lg font-bold text-white mb-2">🏜️ Desert Edges</h3>
                  <p className="text-red-200 text-sm leading-relaxed">
                    Transition zones where desert meets savanna, supporting unique species adapted to harsh conditions.
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* Safari Wildlife Categories Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 3.2 }}
          className="mt-8"
        >
          <motion.div
            className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-lg"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 3.4 }}
            whileHover={{ scale: 1.02, boxShadow: "0 25px 50px rgba(0, 0, 0, 0.3)" }}
          >
            <motion.h2
              className="text-2xl font-bold text-white mb-6 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 3.6 }}
            >
              Safari Wildlife Categories 🦁
            </motion.h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { icon: "🦁", title: "Big Cats", desc: "Lions, leopards, cheetahs, and other apex predators" },
                { icon: "🐘", title: "Elephants", desc: "Gentle giants that shape the landscape" },
                { icon: "🦒", title: "Giraffes", desc: "Tall browsers that reach the highest leaves" },
                { icon: "🦓", title: "Zebras", desc: "Striped grazers that travel in herds" },
                { icon: "🦛", title: "Hippos", desc: "Semi-aquatic giants that dominate waterholes" },
                { icon: "🦏", title: "Rhinos", desc: "Ancient herbivores with thick protective skin" },
                { icon: "🦛", title: "Buffalo", desc: "Powerful grazers that form large herds" },
                { icon: "🦌", title: "Antelope", desc: "Graceful herbivores with incredible speed" }
              ].map((category, index) => (
                <motion.div
                  key={category.title}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: 3.8 + index * 0.1,
                    type: "spring",
                    stiffness: 100
                  }}
                  whileHover={{ 
                    scale: 1.05,
                    y: -5,
                    boxShadow: "0 15px 35px rgba(0, 0, 0, 0.3)"
                  }}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 cursor-pointer group"
                >
                  <div className="text-center">
                    <motion.div 
                      className="text-3xl mb-3"
                      animate={{ y: [0, -3, 0] }}
                      transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                    >
                      {category.icon}
                    </motion.div>
                    <h3 className="text-sm font-bold text-white mb-2">{category.title}</h3>
                    <p className="text-xs text-yellow-200 leading-relaxed">{category.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Safari Conservation Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 4.0 }}
          className="mt-8"
        >
          <motion.div
            className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-lg"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 4.2 }}
            whileHover={{ scale: 1.02, boxShadow: "0 25px 50px rgba(0, 0, 0, 0.3)" }}
          >
            <motion.h2
              className="text-2xl font-bold text-white mb-6 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 4.4 }}
            >
              Safari Conservation 🌱
            </motion.h2>
            <div className="grid md:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 4.6 }}
                className="space-y-4"
              >
                <div className="bg-yellow-500/20 backdrop-blur-sm rounded-lg p-4 border border-yellow-400/30">
                  <h3 className="text-lg font-bold text-white mb-2">🛡️ Anti-Poaching</h3>
                  <p className="text-yellow-200 text-sm leading-relaxed">
                    Dedicated rangers and technology work together to protect wildlife from illegal hunting and poaching activities.
                  </p>
                </div>
                <div className="bg-orange-500/20 backdrop-blur-sm rounded-lg p-4 border border-orange-400/30">
                  <h3 className="text-lg font-bold text-white mb-2">🌍 Habitat Protection</h3>
                  <p className="text-orange-200 text-sm leading-relaxed">
                    Protected areas and wildlife corridors ensure animals have safe spaces to roam and maintain genetic diversity.
                  </p>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 4.8 }}
                className="space-y-4"
              >
                <div className="bg-amber-500/20 backdrop-blur-sm rounded-lg p-4 border border-amber-400/30">
                  <h3 className="text-lg font-bold text-white mb-2">💚 Community Involvement</h3>
                  <p className="text-amber-200 text-sm leading-relaxed">
                    Local communities benefit from sustainable tourism and participate in conservation efforts and education.
                  </p>
                </div>
                <div className="bg-red-500/20 backdrop-blur-sm rounded-lg p-4 border border-red-400/30">
                  <h3 className="text-lg font-bold text-white mb-2">🔬 Research & Monitoring</h3>
                  <p className="text-red-200 text-sm leading-relaxed">
                    Scientific studies track wildlife populations and behavior to inform conservation strategies and management.
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* Back to environments */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 2.5 }}
              className="text-center mt-8 md:mt-12"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
        >
          <Link
            href="/"
                  className="inline-flex items-center space-x-2 text-emerald-200 hover:text-emerald-100 transition-colors group bg-white/10 backdrop-blur-sm px-6 py-3 rounded-lg border border-white/20"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Environments</span>
          </Link>
        </motion.div>
            </motion.div>
          </MobileContainer>
      </div>
    </main>
    </MobileLayout>
  )
} 