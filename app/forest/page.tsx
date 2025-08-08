"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  TreePine, 
  Thermometer, 
  Wind, 
  Sun,
  ArrowLeft,
  Info,
  Play,
  Star,
  Zap,
  Leaf
} from 'lucide-react'
import { blackBearData } from '../../src/data/black-bear-data'
import { deerData } from '../../src/data/deer-data'
import { foxData } from '../../src/data/fox-data'
import { raccoonData } from '../../src/data/raccoon-data'
import { jaguarData } from '../../src/data/jaguar-data'
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

export default function ForestPage() {
  const [selectedFact, setSelectedFact] = useState<number | null>(null)
  const [hoveredStat, setHoveredStat] = useState<string | null>(null)
  const [isExploring, setIsExploring] = useState(false)
  const [activeLayer, setActiveLayer] = useState<number | null>(null)

  const animals = [
    {
      id: 'black-bear',
      name: 'Black Bear',
      description: 'Discover the black bear in its forest habitat',
      path: '/forest/black-bear',
      gradient: 'from-green-50 to-emerald-100',
      data: blackBearData
    },
    {
      id: 'deer',
      name: 'Deer',
      description: 'Discover the graceful deer in its forest habitat',
      path: '/forest/deer',
      gradient: 'from-green-50 to-emerald-100',
      data: deerData
    },
    {
      id: 'fox',
      name: 'Fox',
      description: 'Discover the cunning fox in its forest habitat',
      path: '/forest/fox',
      gradient: 'from-green-50 to-emerald-100',
      data: foxData
    },
    {
      id: 'raccoon',
      name: 'Raccoon',
      description: 'Discover the clever raccoon in its forest habitat',
      path: '/forest/raccoon',
      gradient: 'from-green-50 to-emerald-100',
      data: raccoonData
    },
    {
      id: 'jaguar',
      name: 'Jaguar',
      description: 'Discover the powerful jaguar in its forest habitat',
      path: '/forest/jaguar',
      gradient: 'from-green-50 to-emerald-100',
      data: jaguarData
    }
  ]

  const forestStats = [
    { icon: TreePine, label: "Temperature", value: "32°F to 85°F", color: "bg-green-500", detail: "Moderate climate with seasonal changes" },
    { icon: Thermometer, label: "Rainfall", value: "30-60 inches", color: "bg-emerald-500", detail: "Consistent precipitation throughout year" },
    { icon: Wind, label: "Humidity", value: "60-80%", color: "bg-teal-500", detail: "High moisture levels in forest air" },
    { icon: Sun, label: "Sunlight", value: "Partial Shade", color: "bg-yellow-500", detail: "Filtered light through canopy" }
  ]

  const funFacts = [
    { fact: "Forests cover 31% of Earth's land surface", icon: "🌍" },
    { fact: "A single tree can produce oxygen for 4 people", icon: "🌱" },
    { fact: "Forests are home to 80% of terrestrial biodiversity", icon: "🦋" },
    { fact: "Trees communicate through underground fungal networks", icon: "🕸️" }
  ]

  const forestLayers = [
    { color: "bg-green-400", title: "Canopy Layer", desc: "Upper tree branches forming a continuous cover", icon: "🌳" },
    { color: "bg-emerald-400", title: "Understory", desc: "Shrubs and small trees below the canopy", icon: "🌿" },
    { color: "bg-teal-400", title: "Forest Floor", desc: "Ground level with leaf litter and fungi", icon: "🍂" },
    { color: "bg-lime-400", title: "Soil Layer", desc: "Rich organic soil supporting root systems", icon: "🌱" }
  ]

  return (
    <MobileLayout>
      <main className="min-h-screen bg-gradient-to-br from-green-900 via-green-800 to-emerald-900 relative">
        {/* Enhanced Animated Background */}
        <div className="fixed inset-0 pointer-events-none">
          {/* Base gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-green-900 via-green-800 to-emerald-900" />
          
          {/* Animated mesh gradient overlay */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-green-400/10 via-emerald-400/10 to-teal-400/10 animate-pulse" />
            <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-green-300/5 to-emerald-300/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
            <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-gradient-to-br from-teal-300/5 to-green-300/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
          </div>

          {/* Floating Leaves */}
          {Array.from({ length: 20 }).map((_, i) => {
            // Use deterministic positioning based on index to avoid hydration mismatch
            const left = (i * 5) % 100
            const top = (i * 4) % 100
            const duration = 6 + (i % 4)
            const delay = (i % 3)
            const xOffset = (i % 3) - 1 // Deterministic x movement
            
            return (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-green-300/30 rounded-full"
                style={{
                  left: `${left}%`,
                  top: `${top}%`,
                }}
                animate={{
                  y: [0, -25, 0],
                  x: [0, xOffset * 10, 0],
                  opacity: [0.3, 0.8, 0.3],
                  scale: [1, 1.6, 1],
                  rotate: [0, 180, 360],
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
              className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-green-300/30 to-transparent"
              animate={{ opacity: [0.3, 0.8, 0.3] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div 
              className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-emerald-300/20 to-transparent"
              animate={{ opacity: [0.2, 0.6, 0.2] }}
              transition={{ duration: 5, repeat: Infinity, delay: 1, ease: "easeInOut" }}
            />
            <motion.div 
              className="absolute top-0 left-2/3 w-px h-full bg-gradient-to-b from-transparent via-teal-300/20 to-transparent"
              animate={{ opacity: [0.1, 0.5, 0.1] }}
              transition={{ duration: 6, repeat: Infinity, delay: 2, ease: "easeInOut" }}
            />
          </div>
        </div>

        <div className="relative z-10 container mx-auto">
          <MobileContainer>
            {/* Enhanced Header with Interactive Elements */}
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
                  className="w-12 h-12 bg-green-500/20 backdrop-blur-xl rounded-full flex items-center justify-center border border-green-400/30 cursor-pointer"
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  whileHover={{ scale: 1.2, boxShadow: "0 0 30px rgba(34, 197, 94, 0.5)" }}
                  whileTap={{ scale: 0.9 }}
                >
                  <TreePine className="w-6 h-6 text-green-300" />
                </motion.div>
                <motion.h1 
                  className="text-3xl font-bold text-white"
                  whileHover={{ scale: 1.05 }}
                >
                  Forest Biome
                </motion.h1>
              </motion.div>
              <motion.p 
                className="text-green-200 text-lg max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Discover the lush forests and their diverse wildlife inhabitants
              </motion.p>
            </motion.div>

            {/* Enhanced Interactive Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-8 md:mb-12"
        >
          {forestStats.map((stat, index) => (
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
                  whileHover={{ 
                    scale: 1.05,
                    y: -5,
                    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)"
                  }}
                  onHoverStart={() => setHoveredStat(stat.label)}
                  onHoverEnd={() => setHoveredStat(null)}
                  className="bg-white/10 backdrop-blur-xl rounded-xl p-4 border border-white/20 shadow-lg cursor-pointer transition-all duration-300"
                >
                  <div className="flex items-center space-x-3">
                    <motion.div 
                      className={`w-10 h-10 rounded-lg ${stat.color} flex items-center justify-center`}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <stat.icon className="w-5 h-5 text-white" />
                    </motion.div>
                    <div>
                      <div className="text-sm text-green-200 font-medium">{stat.label}</div>
                      <div className="text-lg font-bold text-white">{stat.value}</div>
                    </div>
                  </div>
                  
                  {/* Animated Detail Tooltip */}
                  <AnimatePresence>
                    {hoveredStat === stat.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.8 }}
                        transition={{ duration: 0.3 }}
                        className="absolute top-full left-0 right-0 mt-2 bg-green-900/90 backdrop-blur-xl rounded-lg p-3 border border-green-400/30 z-10"
                      >
                        <p className="text-xs text-green-200">{stat.detail}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
          ))}
        </motion.div>

        {/* Main content grid */}
            <div className="grid lg:grid-cols-3 gap-6 md:gap-8 mb-8 md:mb-12">
              {/* Enhanced Forest Overview */}
          <div className="lg:col-span-2">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-lg"
                  whileHover={{ scale: 1.02, boxShadow: "0 25px 50px rgba(0, 0, 0, 0.3)" }}
                >
                  <motion.div
                    className="flex items-center space-x-3 mb-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                  >
                    <motion.div
                      className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center cursor-pointer"
                      whileHover={{ scale: 1.1, rotate: 180 }}
                      transition={{ duration: 0.6 }}
                    >
                      <TreePine className="w-5 h-5 text-green-300" />
                    </motion.div>
                    <h2 className="text-2xl font-bold text-white">Forest Overview</h2>
                  </motion.div>
                  
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 1.0 }}
                    className="text-green-200 mb-6 leading-relaxed"
                  >
                Forests are complex ecosystems that provide habitat for countless species. 
                    These lush environments are characterized by dense tree canopies, rich 
                    biodiversity, and a unique microclimate that supports a wide variety 
                    of plant and animal life.
                  </motion.p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                    {forestLayers.map((item, index) => (
                      <motion.div
                        key={item.title}
                        className="space-y-2 md:space-y-3 cursor-pointer group"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 1.2 + index * 0.1 }}
                        whileHover={{ 
                          scale: 1.05,
                          backgroundColor: "rgba(255, 255, 255, 0.1)",
                          borderRadius: "12px",
                          padding: "12px"
                        }}
                        onHoverStart={() => setActiveLayer(index)}
                        onHoverEnd={() => setActiveLayer(null)}
                      >
                  <div className="flex items-center space-x-2">
                          <motion.div 
                            className={`w-3 h-3 ${item.color} rounded-full`}
                            whileHover={{ scale: 1.5 }}
                          />
                          <h3 className="text-sm md:text-base font-semibold text-white group-hover:text-green-300 transition-colors">
                            {item.title}
                          </h3>
                          <motion.span
                            className="text-lg"
                            animate={{ 
                              y: activeLayer === index ? [0, -5, 0] : [0, -3, 0],
                              scale: activeLayer === index ? 1.2 : 1
                            }}
                            transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                          >
                            {item.icon}
                          </motion.span>
                  </div>
                        <p className="text-sm text-green-200 group-hover:text-green-100 transition-colors">
                          {item.desc}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
                </div>

              {/* Enhanced Interactive Fun Facts */}
              <div>
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.9 }}
                  className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-lg h-fit"
                  whileHover={{ scale: 1.02, boxShadow: "0 25px 50px rgba(0, 0, 0, 0.3)" }}
                >
                  <motion.div
                    className="flex items-center space-x-3 mb-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 1.1 }}
                  >
                    <motion.div
                      className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center cursor-pointer"
                      whileHover={{ scale: 1.1, rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <TreePine className="w-5 h-5 text-green-300" />
                    </motion.div>
                    <h3 className="text-xl font-bold text-white">Did You Know?</h3>
                  </motion.div>
                  
                  <div className="space-y-4">
                    {funFacts.map((factItem, index) => (
                      <motion.div
                        key={index}
                        className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/10 cursor-pointer group"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 1.3 + index * 0.1 }}
                        whileHover={{ 
                          scale: 1.02, 
                          backgroundColor: "rgba(255, 255, 255, 0.15)",
                          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)"
                        }}
                        onClick={() => setSelectedFact(selectedFact === index ? null : index)}
                      >
                        <div className="flex items-start space-x-3">
                          <motion.span
                            className="text-2xl"
                            animate={{ 
                              rotate: selectedFact === index ? [0, 360] : 0,
                              scale: selectedFact === index ? 1.2 : 1
                            }}
                            transition={{ duration: 0.6 }}
                          >
                            {factItem.icon}
                          </motion.span>
                          <p className="text-sm text-green-200 leading-relaxed group-hover:text-green-100 transition-colors">
                            {factItem.fact}
                          </p>
                  </div>
                        
                        {/* Expandable Detail */}
                        <AnimatePresence>
                          {selectedFact === index && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                              className="mt-3 pt-3 border-t border-white/10"
                            >
                              <div className="flex items-center space-x-2 text-xs text-green-300">
                                <Leaf className="w-3 h-3" />
                                <span>Discover more about forest ecosystems!</span>
                </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
          </div>

            {/* Enhanced Animals Section */}
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
                whileHover={{ scale: 1.02, boxShadow: "0 25px 50px rgba(0, 0, 0, 0.3)" }}
              >
                <motion.h2
                  className="text-2xl font-bold text-white mb-6 text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 1.9 }}
                >
              Forest Inhabitants
                </motion.h2>
                <div className="grid md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 gap-4 md:gap-6 max-w-2xl mx-auto">
              {animals.map((animal, index) => (
                    <motion.div
                  key={animal.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 2.0 + index * 0.2 }}
                      whileHover={{ 
                        scale: 1.05,
                        boxShadow: "0 15px 35px rgba(0, 0, 0, 0.3)"
                      }}
                      className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 cursor-pointer group"
                      onClick={() => window.location.href = animal.path}
                    >
                      <div className="flex items-center space-x-4">
                        <motion.div 
                          className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center"
                          whileHover={{ scale: 1.1, rotate: 360 }}
                          transition={{ duration: 0.6 }}
                        >
                          <span className="text-2xl">🐻</span>
                        </motion.div>
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-white mb-1 group-hover:text-green-300 transition-colors">
                            {animal.name}
                          </h3>
                          <p className="text-green-200 text-sm group-hover:text-green-100 transition-colors">
                            {animal.description}
                          </p>
                        </div>
                        <motion.div
                          whileHover={{ x: 5, rotate: 180 }}
                          transition={{ duration: 0.3 }}
                          className="flex items-center space-x-2"
                        >
                          <ArrowLeft className="w-5 h-5 text-green-300 rotate-180" />
                          <motion.div
                            animate={{ opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            <Zap className="w-4 h-4 text-green-400" />
                          </motion.div>
                        </motion.div>
                      </div>
                    </motion.div>
              ))}
            </div>
              </motion.div>
        </motion.div>

            {/* Forest Ecosystem Layers Section */}
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
                  Forest Ecosystem Layers 🌳
                </motion.h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {forestLayers.map((layer, index) => (
                    <motion.div
                      key={layer.title}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ 
                        duration: 0.6, 
                        delay: 2.8 + index * 0.1,
                        type: "spring",
                        stiffness: 100
                      }}
                      whileHover={{ 
                        scale: 1.05,
                        y: -5,
                        boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)"
                      }}
                      className={`${layer.color} backdrop-blur-sm rounded-xl p-4 border border-white/20 cursor-pointer group`}
                      onClick={() => setActiveLayer(activeLayer === index ? null : index)}
                    >
                      <div className="text-center">
                        <motion.div 
                          className="text-3xl mb-2"
                          animate={{ y: [0, -5, 0] }}
                          transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                        >
                          {layer.icon}
                        </motion.div>
                        <h3 className="text-sm font-bold text-white mb-1">{layer.title}</h3>
                        <p className="text-xs text-white/80 leading-relaxed">{layer.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            {/* Forest Conservation Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 2.6 }}
              className="mt-8"
            >
              <motion.div
                className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-lg"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 2.8 }}
                whileHover={{ scale: 1.02, boxShadow: "0 25px 50px rgba(0, 0, 0, 0.3)" }}
              >
                <motion.h2
                  className="text-2xl font-bold text-white mb-6 text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 3.0 }}
                >
                  Forest Conservation 🌱
                </motion.h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 3.2 }}
                    className="space-y-4"
                  >
                    <div className="bg-green-500/20 backdrop-blur-sm rounded-lg p-4 border border-green-400/30">
                      <h3 className="text-lg font-bold text-white mb-2">🌿 Biodiversity</h3>
                      <p className="text-green-200 text-sm leading-relaxed">
                        Forests are home to 80% of terrestrial biodiversity, providing habitat for countless species of plants, animals, and microorganisms.
                      </p>
                    </div>
                    <div className="bg-emerald-500/20 backdrop-blur-sm rounded-lg p-4 border border-emerald-400/30">
                      <h3 className="text-lg font-bold text-white mb-2">🌬️ Climate Regulation</h3>
                      <p className="text-emerald-200 text-sm leading-relaxed">
                        Forests act as carbon sinks, absorbing CO2 and releasing oxygen, helping to regulate global climate patterns.
                      </p>
                    </div>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 3.4 }}
                    className="space-y-4"
                  >
                    <div className="bg-teal-500/20 backdrop-blur-sm rounded-lg p-4 border border-teal-400/30">
                      <h3 className="text-lg font-bold text-white mb-2">💧 Water Cycle</h3>
                      <p className="text-teal-200 text-sm leading-relaxed">
                        Forests play a crucial role in the water cycle, filtering water and maintaining watershed health.
                      </p>
                    </div>
                    <div className="bg-lime-500/20 backdrop-blur-sm rounded-lg p-4 border border-lime-400/30">
                      <h3 className="text-lg font-bold text-white mb-2">🏥 Medicinal Value</h3>
                      <p className="text-lime-200 text-sm leading-relaxed">
                        Many forest plants contain compounds used in traditional and modern medicine for treating various ailments.
                      </p>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>

            {/* Forest Activities Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 3.0 }}
              className="mt-8"
            >
              <motion.div
                className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-lg"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 3.2 }}
                whileHover={{ scale: 1.02, boxShadow: "0 25px 50px rgba(0, 0, 0, 0.3)" }}
              >
                <motion.h2
                  className="text-2xl font-bold text-white mb-6 text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 3.4 }}
                >
                  Forest Activities 🚶‍♂️
                </motion.h2>
                <div className="grid md:grid-cols-3 gap-4">
                  {[
                    { icon: "🌲", title: "Hiking", desc: "Explore forest trails and discover hidden paths" },
                    { icon: "📸", title: "Wildlife Photography", desc: "Capture the beauty of forest creatures" },
                    { icon: "🔍", title: "Nature Study", desc: "Learn about forest ecology and biodiversity" },
                    { icon: "🏕️", title: "Camping", desc: "Experience the forest at night under the stars" },
                    { icon: "🎨", title: "Forest Art", desc: "Create art inspired by nature's beauty" },
                    { icon: "🧘", title: "Forest Bathing", desc: "Practice mindfulness in the forest" }
                  ].map((activity, index) => (
                    <motion.div
                      key={activity.title}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ 
                        duration: 0.6, 
                        delay: 3.6 + index * 0.1,
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
                          {activity.icon}
                        </motion.div>
                        <h3 className="text-sm font-bold text-white mb-2">{activity.title}</h3>
                        <p className="text-xs text-green-200 leading-relaxed">{activity.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            {/* Forest Seasons Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 3.4 }}
              className="mt-8"
            >
              <motion.div
                className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-lg"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 3.6 }}
                whileHover={{ scale: 1.02, boxShadow: "0 25px 50px rgba(0, 0, 0, 0.3)" }}
              >
                <motion.h2
                  className="text-2xl font-bold text-white mb-6 text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 3.8 }}
                >
                  Forest Through the Seasons 🌸
                </motion.h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { icon: "🌸", title: "Spring", desc: "New growth, blooming flowers, and returning wildlife" },
                    { icon: "☀️", title: "Summer", desc: "Full canopy, abundant life, and warm forest air" },
                    { icon: "🍂", title: "Autumn", desc: "Colorful leaves, falling nuts, and migrating animals" },
                    { icon: "❄️", title: "Winter", desc: "Bare branches, snow-covered ground, and quiet beauty" }
                  ].map((season, index) => (
                    <motion.div
                      key={season.title}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ 
                        duration: 0.6, 
                        delay: 4.0 + index * 0.1,
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
                          transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                        >
                          {season.icon}
                        </motion.div>
                        <h3 className="text-sm font-bold text-white mb-2">{season.title}</h3>
                        <p className="text-xs text-green-200 leading-relaxed">{season.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            {/* Enhanced Back to environments */}
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