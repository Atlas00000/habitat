"use client"

import React, { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { 
  MapPin, 
  ChevronRight, 
  Play, 
  Info, 
  X, 
  Globe, 
  Leaf, 
  Heart, 
  Sparkles, 
  Zap, 
  Star, 
  Award, 
  TrendingUp, 
  Users, 
  Target,
  ArrowRight
} from "lucide-react"
import { 
  MobileLayout, 
  MobileContainer, 
  MobileGrid, 
  MobileText, 
  MobileHeading 
} from './MobileLayout'

interface NatureRegion {
  id: string
  name: string
  displayName: string
  description: string
  icon: string
  color: string
  wildlife: string[]
  gradient: string
  difficulty: string
  completion: number
  path: string
}

const natureRegions: NatureRegion[] = [
  {
    id: "arctic",
    name: "Arctic Life",
    displayName: "Arctic Life",
    description: "Explore the frozen wilderness of the Arctic",
    icon: "❄️",
    color: "from-blue-400 to-cyan-500",
    gradient: "from-blue-500/20 to-cyan-500/20",
    wildlife: ["Polar Bear", "Arctic Fox", "Snowy Owl", "Seal"],
    difficulty: "Beginner",
    completion: 85,
    path: "/arctic"
  },
  {
    id: "forest",
    name: "Forest Realm",
    displayName: "Forest Realm",
    description: "Wander through dense forests and woodland creatures",
    icon: "🌲",
    color: "from-green-500 to-emerald-600",
    gradient: "from-green-500/20 to-emerald-600/20",
    wildlife: ["Gray Wolf", "Red Deer", "Great Horned Owl", "Red Fox"],
    difficulty: "Intermediate",
    completion: 75,
    path: "/forest"
  },
  {
    id: "mountain",
    name: "Alpine Heights",
    displayName: "Alpine Heights",
    description: "Discover mountain wildlife and rugged terrain",
    icon: "🏔️",
    color: "from-gray-400 to-blue-400",
    gradient: "from-gray-500/20 to-blue-500/20",
    wildlife: ["Mountain Goat", "Golden Eagle", "Marmot", "Alpine Ibex"],
    difficulty: "Intermediate",
    completion: 60,
    path: "/mountain"
  },
  {
    id: "safari",
    name: "Global Safari",
    displayName: "Global Safari",
    description: "Experience wildlife from around the world",
    icon: "🌍",
    color: "from-yellow-500 to-orange-500",
    gradient: "from-yellow-500/20 to-orange-500/20",
    wildlife: ["Lion", "Elephant", "Giraffe", "Zebra"],
    difficulty: "Expert",
    completion: 25,
    path: "/safari"
  }
]

export function NatureHomepage() {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const [isScrolling, setIsScrolling] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsLoaded(true)
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % 3)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolling(true)
      const timeout = setTimeout(() => setIsScrolling(false), 150)
      return () => clearTimeout(timeout)
    }

    const scrollElement = scrollRef.current
    if (scrollElement) {
      scrollElement.addEventListener('scroll', handleScroll)
      return () => scrollElement.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const handleRegionClick = (regionId: string) => {
    setSelectedRegion(regionId)
  }

  const handleExploreRegion = (regionId: string) => {
    const region = natureRegions.find(r => r.id === regionId)
    if (region) {
      window.location.href = region.path
    }
  }

  const handleRegionCardClick = (regionId: string) => {
    const region = natureRegions.find(r => r.id === regionId)
    if (region) {
      window.location.href = region.path
    }
  }

  const stats = [
    { value: "150+", label: "Species", icon: "🐾", color: "text-emerald-300", trend: "+12%" },
    { value: "4/4", label: "Regions", icon: "🌍", color: "text-blue-300", trend: "+1" },
    { value: "1,247", label: "Trees", icon: "🌱", color: "text-green-300", trend: "+89" }
  ]

  const achievements = [
    { icon: Award, label: "Conservation Hero", color: "text-yellow-300" },
    { icon: TrendingUp, label: "Rising Explorer", color: "text-emerald-300" },
    { icon: Users, label: "Community Leader", color: "text-blue-300" }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-teal-800 to-cyan-700 pt-16 overflow-hidden">
      {/* Enhanced Background with Multiple Layers */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900 via-teal-800 to-cyan-700" />
        
        {/* Animated mesh gradient overlay */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-emerald-400/10 via-teal-400/10 to-cyan-400/10 animate-pulse" />
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-emerald-300/5 to-teal-300/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-gradient-to-br from-cyan-300/5 to-blue-300/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        </div>

        {/* Floating Particles with Enhanced Animation */}
        {Array.from({ length: 30 }).map((_, i) => {
          // Use deterministic positioning based on index to avoid hydration mismatch
          const left = (i * 3.33) % 100
          const top = (i * 2.5) % 100
          const duration = 4 + (i % 3)
          const delay = (i % 3)
          
          return (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white/30 rounded-full"
              style={{
                left: `${left}%`,
                top: `${top}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.3, 0.8, 0.3],
                scale: [1, 1.5, 1],
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
            className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-white/30 to-transparent"
            animate={{ opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div 
            className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-white/20 to-transparent"
            animate={{ opacity: [0.2, 0.6, 0.2] }}
            transition={{ duration: 4, repeat: Infinity, delay: 1, ease: "easeInOut" }}
          />
          <motion.div 
            className="absolute top-0 left-2/3 w-px h-full bg-gradient-to-b from-transparent via-emerald-300/20 to-transparent"
            animate={{ opacity: [0.1, 0.5, 0.1] }}
            transition={{ duration: 5, repeat: Infinity, delay: 2, ease: "easeInOut" }}
          />
        </div>
      </div>

      {/* Enhanced Hero Section with Glass Morphism */}
      <div className="relative z-10">
        <motion.div 
          className="w-full h-48 bg-gradient-to-b from-white/10 to-transparent backdrop-blur-xl border-b border-white/20"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex flex-col h-full px-6">
            {/* Enhanced Animated Title with Glow Effect */}
            <div className="text-center pt-6 mb-6">
              <motion.div 
                className="relative"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
              >
                <h1 className="text-4xl font-bold text-white mb-2">
                  <span className="bg-gradient-to-r from-emerald-300 via-teal-300 to-cyan-300 bg-clip-text text-transparent animate-gradient-x">
                    Habitat Explorer 🌍✨
                  </span>
                </h1>
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-300/20 to-teal-300/20 blur-xl animate-pulse" />
              </motion.div>
              <motion.p 
                className="text-emerald-200 text-sm"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                Global Wildlife Explorer
              </motion.p>
            </div>

            {/* Enhanced Stats with Smooth Animations */}
            <div className="flex justify-between items-center h-24">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="flex flex-col items-center text-center"
                  initial={{ opacity: 0, y: 20, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ 
                    duration: 0.8, 
                    delay: 0.8 + index * 0.2,
                    type: "spring",
                    stiffness: 100
                  }}
                  whileHover={{ scale: 1.05 }}
                >
                  <motion.div 
                    className={`text-3xl mb-2 ${stat.color}`}
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                  >
                    {stat.icon}
                  </motion.div>
                  <div className="text-xl font-bold text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-xs text-emerald-200 font-medium mb-1">
                    {stat.label}
                  </div>
                  <motion.div 
                    className="text-xs text-emerald-300 font-bold"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 1.5 + index * 0.2 }}
                  >
                    {stat.trend}
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Enhanced Achievement Badges with Glass Effect */}
        <div className="flex justify-center space-x-3 mt-4 px-6">
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.label}
              className="flex items-center space-x-2 bg-white/10 backdrop-blur-xl px-3 py-2 rounded-full border border-white/20 shadow-lg"
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                duration: 0.6, 
                delay: 1.5 + index * 0.1,
                type: "spring",
                stiffness: 100
              }}
              whileHover={{ 
                scale: 1.05, 
                backgroundColor: "rgba(255, 255, 255, 0.15)",
                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)"
              }}
            >
              <achievement.icon className={`h-4 w-4 ${achievement.color}`} />
              <span className="text-xs text-white font-medium">{achievement.label}</span>
            </motion.div>
          ))}
        </div>

        {/* Enhanced Action Buttons with Glass Morphism */}
        <div className="flex justify-center space-x-4 mt-4 px-6">
          <motion.button 
            className="px-6 py-3 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 hover:from-emerald-500/30 hover:to-teal-500/30 text-emerald-200 text-sm border border-emerald-400/30 backdrop-blur-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-emerald-500/25 rounded-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.8 }}
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 10px 40px rgba(16, 185, 129, 0.3)"
            }}
            whileTap={{ scale: 0.95 }}
          >
            <Sparkles className="h-4 w-4 mr-2 inline" />
            View Progress
          </motion.button>
          <motion.button 
            className="px-6 py-3 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 hover:from-blue-500/30 hover:to-cyan-500/30 text-blue-200 text-sm border border-blue-400/30 backdrop-blur-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-blue-500/25 rounded-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.0 }}
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 10px 40px rgba(14, 165, 233, 0.3)"
            }}
            whileTap={{ scale: 0.95 }}
          >
            <Zap className="h-4 w-4 mr-2 inline" />
            Join Community
          </motion.button>
        </div>
      </div>

      {/* Enhanced Regions Section with Glass Cards */}
      <div className="p-6" ref={scrollRef}>
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.2 }}
        >
          <h2 className="text-2xl font-bold text-white mb-3">
            Choose Your Adventure
          </h2>
          <p className="text-emerald-200 text-sm">
            Tap on a region to explore wildlife
          </p>
        </motion.div>
        
        <div className="space-y-4">
          {natureRegions.map((region, index) => (
            <motion.div
              key={region.id}
              className={`relative overflow-hidden bg-gradient-to-r ${region.gradient} backdrop-blur-xl rounded-2xl p-6 border border-white/20 transition-all duration-500 transform ${
                selectedRegion === region.id 
                  ? 'ring-2 ring-emerald-400 scale-105 shadow-2xl' 
                  : 'hover:scale-105 hover:shadow-xl'
              } ${isScrolling ? 'scale-95' : ''}`}
              initial={{ opacity: 0, x: -50, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ 
                duration: 0.8, 
                delay: 2.5 + index * 0.2,
                type: "spring",
                stiffness: 100
              }}
              whileHover={{ 
                scale: 1.02,
                boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
                backgroundColor: "rgba(255, 255, 255, 0.15)"
              }}
              onClick={() => handleRegionCardClick(region.id)}
            >
              {/* Enhanced Animated Background */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative z-10">
                <div className="flex items-center space-x-4 mb-3">
                  <motion.div 
                    className="text-5xl"
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                  >
                    {region.icon}
                  </motion.div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-1">{region.displayName}</h3>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs px-2 py-1 rounded-full bg-white/20 text-white backdrop-blur-sm">
                        {region.difficulty}
                      </span>
                      <span className="text-xs text-emerald-200">
                        {region.completion}% complete
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-2 backdrop-blur-sm">
                      <div className="w-8 h-8 rounded-full border-2 border-emerald-400 relative">
                        <motion.div 
                          className="absolute inset-0 rounded-full bg-emerald-400"
                          style={{ 
                            clipPath: `polygon(0 0, 100% 0, 100% 100%, 0 100%)`,
                          }}
                          initial={{ rotate: 0 }}
                          animate={{ rotate: region.completion * 3.6 }}
                          transition={{ duration: 2, delay: 3 + index * 0.2 }}
                        />
                      </div>
                    </div>
                    <motion.div
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronRight className="text-white/60 h-5 w-5" />
                    </motion.div>
                  </div>
                </div>
                
                <p className="text-emerald-200 text-sm mb-3 leading-relaxed">{region.description}</p>
                
                <div className="flex flex-wrap gap-2">
                  {region.wildlife.slice(0, 3).map((animal, animalIndex) => (
                    <motion.span
                      key={animalIndex}
                      className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs text-white border border-white/20"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ 
                        duration: 0.5, 
                        delay: 3.5 + index * 0.2 + animalIndex * 0.1 
                      }}
                      whileHover={{ scale: 1.05 }}
                    >
                      {animal}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Enhanced Footer with Glass Effect */}
      <motion.div 
        className="mt-8 p-6 bg-gradient-to-t from-white/10 to-transparent backdrop-blur-xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 3.5 }}
      >
        <div className="text-center">
          <motion.div 
            className="flex items-center justify-center space-x-2 mb-3"
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <Globe className="h-6 w-6 text-emerald-300" />
            <span className="text-white font-bold text-lg">Habitat Explorer</span>
            <Star className="h-4 w-4 text-yellow-300 animate-pulse" />
          </motion.div>
          <p className="text-emerald-200 text-sm mb-3">Global Wildlife Explorer</p>
          
          {/* Quick Stats */}
          <div className="flex justify-center space-x-6 text-xs text-emerald-200">
            <div className="flex items-center space-x-1">
              <Target className="h-3 w-3" />
              <span>Daily Goal: 85%</span>
            </div>
            <div className="flex items-center space-x-1">
              <Users className="h-3 w-3" />
              <span>2,341 Members</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Enhanced Region Detail Modal with Glass Morphism */}
      {selectedRegion && (
        <motion.div 
          className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div 
            className="bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-xl rounded-3xl p-8 w-full max-w-sm border border-white/30 shadow-2xl"
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <motion.div 
                  className="text-4xl"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {natureRegions.find(r => r.id === selectedRegion)?.icon}
                </motion.div>
                <div>
                  <h3 className="text-2xl font-bold text-white">
                    {natureRegions.find(r => r.id === selectedRegion)?.displayName}
                  </h3>
                  <p className="text-emerald-300 text-sm">
                    {natureRegions.find(r => r.id === selectedRegion)?.difficulty} Level
                  </p>
                </div>
              </div>
              <motion.button
                onClick={() => setSelectedRegion(null)}
                className="text-white hover:bg-white/20 rounded-full p-2 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="h-5 w-5" />
              </motion.button>
            </div>
            
            <p className="text-emerald-200 mb-6 leading-relaxed">
              {natureRegions.find(r => r.id === selectedRegion)?.description}
            </p>
            
            {/* Enhanced Progress Bar */}
            <div className="mb-6">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-emerald-200">Progress</span>
                <span className="text-emerald-300 font-bold">
                  {natureRegions.find(r => r.id === selectedRegion)?.completion}%
                </span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-2 backdrop-blur-sm">
                <motion.div 
                  className="bg-gradient-to-r from-emerald-400 to-teal-400 h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${natureRegions.find(r => r.id === selectedRegion)?.completion}%` }}
                  transition={{ duration: 1.5, delay: 0.5 }}
                />
              </div>
            </div>
            
            <div className="mb-6">
              <p className="text-emerald-300 text-sm font-medium mb-3">Featured Wildlife:</p>
              <div className="flex flex-wrap gap-2">
                {natureRegions.find(r => r.id === selectedRegion)?.wildlife.map((animal, index) => (
                  <motion.span
                    key={index}
                    className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-sm text-white border border-white/20"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    {animal}
                  </motion.span>
                ))}
              </div>
            </div>
            
            <div className="flex space-x-3">
              <motion.button 
                className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-medium py-3 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-emerald-500/25"
                onClick={() => handleExploreRegion(selectedRegion!)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Play className="h-4 w-4 mr-2 inline" />
                Explore
              </motion.button>
              <motion.button 
                className="flex-1 border-white/30 text-white hover:bg-white/10 font-medium py-3 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Info className="h-4 w-4 mr-2 inline" />
                Learn More
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
} 