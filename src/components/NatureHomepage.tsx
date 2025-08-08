"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { 
  TrendingUp, 
  Users, 
  Award, 
  Activity, 
  Globe, 
  Leaf, 
  Heart, 
  Star, 
  Zap, 
  Target,
  MapPin,
  ChevronRight,
  Play,
  Info,
  X,
  ArrowRight,
  Share,
  Twitter,
  Facebook,
  Instagram,
  Github,
  ExternalLink,
  Mail,
  Volume2,
  VolumeX
} from "lucide-react"
import { useLoading } from './LoadingProvider'

interface Region {
  id: string
  name: string
  displayName: string
  description: string
  position: { x: number; y: number }
  mobilePosition?: { x: number; y: number }
  color: string
  wildlife: string[]
  icon: string
  path: string
}

const regions: Region[] = [
  {
    id: "arctic",
    name: "Arctic Life",
    displayName: "Arctic Life",
    description: "Explore the frozen wilderness of the Arctic",
    position: { x: 20, y: 35 },
    mobilePosition: { x: 25, y: 40 },
    color: "from-blue-400 to-cyan-500",
    wildlife: ["Polar Bear", "Arctic Fox", "Snowy Owl", "Seal"],
    icon: "🐻‍❄️",
    path: "/arctic"
  },
  {
    id: "alpine",
    name: "Alpine Heights",
    displayName: "Alpine Heights",
    description: "Discover mountain wildlife and rugged terrain",
    position: { x: 20, y: 55 },
    mobilePosition: { x: 25, y: 60 },
    color: "from-gray-400 to-blue-400",
    wildlife: ["Mountain Goat", "Golden Eagle", "Marmot", "Alpine Ibex"],
    icon: "🏔️",
    path: "/mountain"
  },
  {
    id: "coastal",
    name: "Coastal Waters",
    displayName: "COASTAL WATERS",
    description: "Dive into marine life and ocean ecosystems",
    position: { x: 70, y: 30 },
    mobilePosition: { x: 75, y: 35 },
    color: "from-blue-500 to-cyan-600",
    wildlife: ["Harbor Seal", "Humpback Whale", "Seagull", "Atlantic Cod"],
    icon: "🐳",
    path: "/coastal"
  },
  {
    id: "forest",
    name: "Forest Realm",
    displayName: "FOREST REALM",
    description: "Wander through dense forests and woodland creatures",
    position: { x: 75, y: 50 },
    mobilePosition: { x: 75, y: 45 },
    color: "from-green-500 to-emerald-600",
    wildlife: ["Gray Wolf", "Red Deer", "Great Horned Owl", "Red Fox"],
    icon: "🌲",
    path: "/forest"
  },
  {
    id: "safari",
    name: "Global Safari",
    displayName: "GLOBAL SAFARI",
    description: "Experience wildlife from around the world",
    position: { x: 75, y: 60 },
    mobilePosition: { x: 75, y: 55 },
    color: "from-yellow-500 to-orange-500",
    wildlife: ["Lion", "Elephant", "Giraffe", "Zebra"],
    icon: "🌎",
    path: "/safari"
  }
]

const stats = [
  { value: "150+", label: "Species", icon: "🐾", color: "text-emerald-300", trend: "+12%" },
  { value: "2,341", label: "Active Users", icon: "👥", color: "text-blue-300", trend: "+23" },
  { value: "89", label: "Protected Wildlife", icon: "🛡️", color: "text-green-300", trend: "+5" },
  { value: "45", label: "Lessons Completed", icon: "📚", color: "text-yellow-300", trend: "+2" },
  { value: "78%", label: "Daily Goal", icon: "��", color: "text-purple-300", trend: "+12%" },
  { value: "3/5", label: "Regions", icon: "🌍", color: "text-cyan-300", trend: "+1" },
  { value: "1,247", label: "Impact", icon: "🌱", color: "text-green-300", trend: "+89" },
  { value: "23", label: "Achievements", icon: "⭐", color: "text-yellow-300", trend: "+5" }
]

const liveActivity = [
  { title: "Conservation Hero", subtitle: "Level 5 +2 levels", icon: "🔑", color: "from-yellow-400 to-orange-500" },
  { title: "Rising Explorer", subtitle: "Top 10% +15%", icon: "🏔️", color: "from-blue-400 to-cyan-500" },
  { title: "Community Leader", subtitle: "2,341 +89", icon: "👥", color: "from-green-400 to-emerald-500" }
]

export function NatureHomepage() {
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null)
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [currentTime, setCurrentTime] = useState<string>("")
  const [activeTrend, setActiveTrend] = useState(0)
  const { isLoading } = useLoading()

  // Memoize expensive calculations
  const selectedRegionData = React.useMemo(() => 
    selectedRegion ? regions.find(r => r.id === selectedRegion) : null, 
    [selectedRegion]
  )

  useEffect(() => {

    
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString())
    }, 1000)
    
    const trendInterval = setInterval(() => {
      setActiveTrend((prev) => (prev + 1) % 4)
    }, 4000)
    

    
    return () => {
      window.removeEventListener('resize', checkMobile)
      clearInterval(timeInterval)
      clearInterval(trendInterval)
    }
  }, [])

  const handleRegionClick = (regionId: string) => {
    setSelectedRegion(regionId)
  }

  const handleRegionHover = (regionId: string | null) => {
    setHoveredRegion(regionId)
  }

  const closePanel = () => {
    setSelectedRegion(null)
  }


  
  // Don't render content while loading
  if (isLoading) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-teal-800 to-cyan-700 nature-view-gradient overflow-hidden">
      {/* Background Audio */}
      <audio src="/Upbeat_Jungle.mp3" loop preload="auto" />
      
      {/* Background Map Image */}
      <div className="fixed inset-0 pointer-events-none opacity-20">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" 
              style={{
               backgroundImage: 'url("/map-image.jpg")',
               backgroundSize: 'cover',
               backgroundPosition: 'center',
               filter: 'brightness(0.8) contrast(1.2)'
             }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/60 via-teal-800/60 to-cyan-700/60" />
      </div>



             {/* Enhanced Stats Bar */}
       <div className="relative z-10 bg-gradient-to-r from-emerald-800/40 via-teal-700/40 to-cyan-700/40 backdrop-blur-xl border-b border-white/20 shadow-lg">
         <div className="container mx-auto px-4 py-4">
           <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ 
                     duration: 0.6, 
                     delay: index * 0.1,
                    type: "spring",
                    stiffness: 100
                  }}
                   whileHover={{ 
                     scale: 1.05,
                     y: -2,
                     transition: { duration: 0.2 }
                   }}
                   className="relative group cursor-pointer"
                 >
                   {/* Enhanced Stat Container */}
                   <div className="bg-white/10 backdrop-blur-md rounded-lg p-3 border border-white/20 hover:bg-white/20 transition-all duration-300 relative overflow-hidden">
                     {/* Animated background gradient */}
                     <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                     
                     {/* Glowing effect on hover */}
                     <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-emerald-400/20 to-cyan-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
                     
                     <div className="relative z-10">
                       <div className="flex items-center justify-center space-x-2">
                         {/* Enhanced Icon with Animation */}
                  <motion.div 
                           className="relative"
                           animate={{ 
                             scale: [1, 1.1, 1],
                             rotate: [0, 3, -3, 0]
                           }}
                           transition={{
                             duration: 3,
                             repeat: Infinity,
                             ease: "easeInOut",
                             delay: index * 0.5
                           }}
                         >
                           <span className="text-lg drop-shadow-lg">{stat.icon}</span>
                           {/* Pulsing ring effect */}
                           <motion.div
                             className="absolute inset-0 rounded-full border border-white/30"
                             animate={{
                               scale: [1, 1.3, 1],
                               opacity: [0.5, 0, 0.5]
                             }}
                             transition={{
                               duration: 2,
                               repeat: Infinity,
                               ease: "easeInOut"
                             }}
                           />
                  </motion.div>
                         
                         <div>
                           {/* Enhanced Value with Glow */}
                           <motion.div 
                             className="text-sm font-bold text-white"
                             animate={{ 
                               textShadow: [
                                 "0 0 5px rgba(255,255,255,0.3)",
                                 "0 0 8px rgba(255,255,255,0.6)",
                                 "0 0 5px rgba(255,255,255,0.3)"
                               ]
                             }}
                             transition={{
                               duration: 2,
                               repeat: Infinity,
                               ease: "easeInOut"
                             }}
                           >
                    {stat.value}
                           </motion.div>
                           <div className="text-xs text-emerald-200">{stat.label}</div>
                  </div>
                         
                         {/* Enhanced Trend Indicator */}
                  <motion.div 
                           className={`text-xs font-bold px-2 py-1 rounded-full inline-flex items-center space-x-1 ${
                             stat.trend.includes('+') 
                               ? 'bg-green-500/20 text-green-300 border border-green-400/30' 
                               : 'bg-blue-500/20 text-blue-300 border border-blue-400/30'
                           }`}
                           animate={{
                             scale: [1, 1.05, 1],
                             opacity: [0.8, 1, 0.8]
                           }}
                           transition={{
                             duration: 2,
                             repeat: Infinity,
                             ease: "easeInOut"
                           }}
                         >
                           <motion.span 
                             className="text-xs"
                             animate={{ 
                               rotate: stat.trend.includes('+') ? [0, 15, 0] : [0, -15, 0]
                             }}
                             transition={{
                               duration: 1.5,
                               repeat: Infinity,
                               ease: "easeInOut"
                             }}
                           >
                             {stat.trend.includes('+') ? '↗' : '↘'}
                           </motion.span>
                           <span>{stat.trend}</span>
                  </motion.div>
            </div>
          </div>

                     {/* Floating particles effect */}
            <motion.div
                       className="absolute top-1 right-1 w-1.5 h-1.5 bg-emerald-300 rounded-full opacity-60"
                       animate={{
                         y: [0, -3, 0],
                         opacity: [0.6, 1, 0.6]
                       }}
              transition={{ 
                         duration: 2,
                         repeat: Infinity,
                         ease: "easeInOut",
                         delay: index * 0.3
                       }}
                     />
                   </div>
                 </motion.div>
               ))}
           </div>
          
          {/* Live Activity */}
          <div className="mt-4 pt-4 border-t border-emerald-600/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="text-xs text-emerald-200">
                  Live Activity • {currentTime || "Loading..."}
                </div>
                <div className="text-xs text-emerald-300">Last updated: 2 min ago</div>
                  </div>
              
              <div className="flex space-x-3">
                {liveActivity.map((activity, index) => (
                  <motion.div 
                    key={activity.title}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className={`px-3 py-1 rounded-full text-xs text-white bg-gradient-to-r ${activity.color}`}
                  >
                    <div className="flex items-center space-x-1">
                      <span>{activity.icon}</span>
                      <span className="font-medium">{activity.title}</span>
                    </div>
                    <div className="text-xs opacity-90">{activity.subtitle}</div>
            </motion.div>
          ))}
              </div>
            </div>
        </div>

          {/* Action Buttons */}
          <div className="mt-4 flex items-center justify-center space-x-4">
          <motion.button 
              whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
              className="px-6 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg font-medium transition-colors flex items-center space-x-2"
            >
              <Heart className="w-4 h-4" />
              <span>Conservation</span>
          </motion.button>
        </div>


        </div>
      </div>

      {/* Interactive Map Section */}
      <section className="relative w-full h-screen flex items-center justify-center overflow-hidden pt-16">
        {/* Background Map Image - Full Screen */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-full h-full flex items-center justify-center">
            <img
              src="/map-image.jpg"
              alt="Nature View World Map"
              className="w-auto h-auto max-w-full max-h-full object-contain opacity-95"
              style={{ 
                width: '100%', 
                height: '100%',
                objectFit: 'contain',
                objectPosition: 'center'
              }}
              loading="eager"
              decoding="async"
            />
            
            {/* Interactive Region Points */}
            {regions.map((region) => {
              const pos = isMobile ? region.mobilePosition || region.position : region.position
              return (
            <motion.div
              key={region.id}
                  className="absolute cursor-pointer z-10"
                  style={{
                    left: `${pos.x}%`,
                    top: `${pos.y}%`,
                    transform: 'translate(-50%, -50%)'
                  }}
                  whileHover={{ scale: 1.15, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleRegionClick(region.id)}
                  onMouseEnter={() => handleRegionHover(region.id)}
                  onMouseLeave={() => handleRegionHover(null)}
                >
                  {/* Enhanced Icon Container */}
                  <motion.div 
                    className={`relative w-20 h-20 rounded-full bg-gradient-to-br ${region.color} flex items-center justify-center shadow-2xl border-3 border-white/30 backdrop-blur-md overflow-hidden`}
                    animate={{
                      boxShadow: [
                        `0 0 20px ${region.color.split(' ')[1].replace('to-', '')}/50`,
                        `0 0 30px ${region.color.split(' ')[1].replace('to-', '')}/70`,
                        `0 0 20px ${region.color.split(' ')[1].replace('to-', '')}/50`
                      ]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    {/* Animated background ring */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-white/20 to-transparent animate-spin" style={{ animationDuration: '8s' }}></div>
                    
                    {/* Main icon */}
                  <motion.div 
                      className="relative z-10"
                      animate={{ 
                        scale: [1, 1.1, 1],
                        rotate: [0, 5, -5, 0]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      <span className="text-3xl drop-shadow-lg">{region.icon}</span>
                  </motion.div>
                    
                    {/* Pulsing ring effect */}
                        <motion.div 
                      className="absolute inset-0 rounded-full border-2 border-white/40"
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 0, 0.5]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                  </motion.div>
                  
                  {/* Enhanced Region Label */}
                    <motion.div
                    className="absolute top-full left-1/2 transform -translate-x-1/2 mt-3"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap shadow-xl border border-white/30 backdrop-blur-sm">
                    <div className="flex items-center space-x-2">
                        <span className="text-xs">📍</span>
                        <span>{region.displayName}</span>
                        <motion.div 
                          animate={{ x: [0, 3, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                        >
                          <span className="text-xs">→</span>
                    </motion.div>
                  </div>
                </div>
                    </motion.div>
                
                  {/* Hover Info */}
                  <AnimatePresence>
                    {hoveredRegion === region.id && (
                      <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-4 w-48 bg-black/90 backdrop-blur-md rounded-lg p-3 border border-white/20 shadow-xl"
                      >
                        <div className="text-white text-sm">
                          <div className="font-bold mb-1">{region.name}</div>
                          <div className="text-xs text-gray-300 mb-2">{region.description}</div>
                          <div className="text-xs">
                            <div className="font-semibold mb-1">Wildlife:</div>
                            <div className="flex flex-wrap gap-1">
                              {region.wildlife.slice(0, 3).map((animal, index) => (
                                <span key={index} className="bg-white/20 px-1 py-0.5 rounded text-xs">
                      {animal}
                                </span>
                  ))}
                </div>
                </div>
              </div>
            </motion.div>
                    )}
                  </AnimatePresence>
            </motion.div>
              )
            })}
        </div>
      </div>

        {/* All Regions Button */}
        <div className="absolute bottom-4 right-4 z-20">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/30 shadow-lg"
          >
            <Globe className="w-5 h-5" />
          </motion.button>
        </div>
      </section>

      {/* Enhanced Region Detail Panel */}
      <AnimatePresence>
        {selectedRegion && selectedRegionData && (
          <>
            {/* Animated Backdrop */}
        <motion.div 
              className="fixed inset-0 bg-black/60 backdrop-blur-md z-40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
              onClick={closePanel}
            />
            
            {/* Enhanced Panel */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div 
                className="bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-xl rounded-3xl border border-white/30 shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
                initial={{ scale: 0.3, opacity: 0, y: 100, rotate: -10 }}
                animate={{ scale: 1, opacity: 1, y: 0, rotate: 0 }}
                exit={{ scale: 0.3, opacity: 0, y: 100, rotate: 10 }}
            transition={{ 
              type: "spring", 
              stiffness: 150, 
              damping: 15,
              duration: 0.6
            }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Panel Header with Region Icon */}
                <div className="relative p-8 border-b border-white/20">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="text-6xl animate-bounce-gentle">
                        {selectedRegionData.icon}
                      </div>
                <div>
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
                          {selectedRegionData.displayName}
                        </h2>
                        <p className="text-emerald-200 text-lg">
                          {selectedRegionData.description}
                  </p>
                </div>
              </div>
              <motion.button
                      onClick={closePanel}
                      className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/30 hover:bg-white/30 transition-all duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                      <X className="w-6 h-6" />
              </motion.button>
            </div>
            

            </div>
            
                {/* Panel Content */}
                <div className="p-8">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Left Column - Wildlife & Progress */}
                    <div className="space-y-6">
                      {/* Progress Bar */}
          <motion.div 
                        className="mb-6"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ delay: 0.3, duration: 1 }}
                      >
                        <div className="flex justify-between text-white mb-2">
                          <span className="text-sm font-medium">Exploration Progress</span>
                          <span className="text-sm font-bold">75%</span>
              </div>
                        <div className="w-full bg-white/20 rounded-full h-3 backdrop-blur-sm">
                <motion.div 
                            className="bg-gradient-to-r from-emerald-400 to-teal-400 h-3 rounded-full"
                  initial={{ width: 0 }}
                            animate={{ width: "75%" }}
                            transition={{ delay: 0.5, duration: 1.5 }}
                />
              </div>
          </motion.div>

                      {/* Wildlife Section */}
                      <motion.div 
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                      >
                        <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                          <span className="mr-2">🦁</span>
                          Featured Wildlife
                        </h3>
                        <div className="grid grid-cols-2 gap-3">
                          {selectedRegionData.wildlife.map((animal, index) => (
                            <motion.div
                    key={index}
                              className="bg-white/10 backdrop-blur-md rounded-lg p-3 border border-white/20 hover:bg-white/20 transition-all duration-300"
                              initial={{ scale: 0.8, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              transition={{ delay: 0.6 + index * 0.1 }}
                              whileHover={{ scale: 1.05, y: -2 }}
                            >
                              <div className="text-center">
                                <div className="text-xl mb-1">🐾</div>
                                <div className="text-white font-semibold text-sm">{animal}</div>
                                <div className="text-emerald-200 text-xs">Native Species</div>
            </div>
                            </motion.div>
                ))}
            </div>
                      </motion.div>

                      {/* Action Buttons */}
                      <motion.div 
                        className="flex flex-col space-y-4"
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.8 }}
                      >
                        {/* Enhanced View Biome Button */}
                        <div className="flex justify-center">
                          <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                            className="relative"
                          >
                            {/* Glowing background effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 rounded-full blur-xl opacity-50 animate-pulse"></div>
                            
                            {/* Main button */}
                            <Link
                              href={selectedRegionData.path}
                              className="relative block"
                            >
                              <motion.div
                                whileHover={{ 
                                  scale: 1.1,
                                  rotate: [0, -5, 5, -5, 0],
                                  transition: { duration: 0.5 }
                                }}
                                whileTap={{ scale: 0.95 }}
                                className="relative bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-400 hover:via-teal-400 hover:to-cyan-400 text-white font-bold py-4 px-8 md:py-3 md:px-6 rounded-full shadow-2xl border-2 border-white/30 backdrop-blur-md transition-all duration-300 hover:shadow-emerald-500/50 hover:shadow-2xl scale-100 md:scale-80"
                                animate={{
                                  boxShadow: [
                                    "0 0 20px rgba(16, 185, 129, 0.5)",
                                    "0 0 40px rgba(16, 185, 129, 0.8)",
                                    "0 0 20px rgba(16, 185, 129, 0.5)"
                                  ]
                                }}
                                transition={{
                                  duration: 2,
                                  repeat: Infinity,
                                  ease: "easeInOut"
                                }}
                              >
                                <div className="flex items-center space-x-3">
                                  <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                  >
                                    <Play className="w-6 h-6 md:w-5 md:h-5" />
                                  </motion.div>
                                  <span className="text-lg md:text-base">View Biome</span>
                                  <motion.div
                                    animate={{ x: [0, 5, 0] }}
                                    transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
                                  >
                                    <ArrowRight className="w-5 h-5 md:w-4 md:h-4" />
                                  </motion.div>
          </div>
                              </motion.div>
                            </Link>
                            
                            {/* Floating particles effect */}
                            <motion.div
                              className="absolute -top-2 -left-2 w-4 h-4 bg-emerald-300 rounded-full opacity-70"
                              animate={{
                                y: [0, -10, 0],
                                opacity: [0.7, 1, 0.7]
                              }}
                              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            />
                            <motion.div
                              className="absolute -bottom-2 -right-2 w-3 h-3 bg-teal-300 rounded-full opacity-70"
                              animate={{
                                y: [0, 10, 0],
                                opacity: [0.7, 1, 0.7]
                              }}
                              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                            />
                          </motion.div>
                        </div>
                        
                        {/* Secondary Action Buttons */}
                        <div className="flex space-x-3">
                          <button className="flex-1 bg-white/10 backdrop-blur-md text-white font-bold py-3 px-4 rounded-lg border border-white/30 hover:bg-white/20 transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2">
                            <Info className="w-4 h-4" />
                            <span>Learn More</span>
                          </button>
                          <button className="flex-1 bg-white/10 backdrop-blur-md text-white font-bold py-3 px-4 rounded-lg border border-white/30 hover:bg-white/20 transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2">
                            <Heart className="w-4 h-4" />
                            <span>Support</span>
                          </button>
        </div>
      </motion.div>
            </div>

                    {/* Right Column - Stats & Projects */}
                    <div className="space-y-6">
                      {/* Stats Grid */}
        <motion.div 
                        className="grid grid-cols-2 gap-3"
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5 }}
                      >
                        {[
                          { label: "Species Count", value: "24", icon: "🐾", color: "from-emerald-400 to-teal-400" },
                          { label: "Conservation Status", value: "Protected", icon: "🛡️", color: "from-blue-400 to-cyan-400" },
                          { label: "Climate Type", value: "Temperate", icon: "🌡️", color: "from-yellow-400 to-orange-400" },
                          { label: "Ecosystem Health", value: "Excellent", icon: "🌱", color: "from-green-400 to-emerald-400" }
                        ].map((stat, index) => (
          <motion.div 
                            key={stat.label}
                            className={`bg-gradient-to-br ${stat.color} rounded-lg p-3 text-white backdrop-blur-md border border-white/20`}
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.7 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                          >
                            <div className="text-xl mb-1">{stat.icon}</div>
                            <div className="text-lg font-bold mb-1">{stat.value}</div>
                            <div className="text-xs opacity-90">{stat.label}</div>
                          </motion.div>
                        ))}
                      </motion.div>

                      {/* Conservation Projects */}
                <motion.div 
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.6 }}
                      >
                        <h3 className="text-lg font-bold text-white mb-3 flex items-center">
                          <span className="mr-2">🌿</span>
                          Active Conservation Projects
                        </h3>
                        <div className="space-y-2">
                          {[
                            { title: "Habitat Restoration", progress: 85, color: "from-green-400 to-emerald-400" },
                            { title: "Species Protection", progress: 72, color: "from-blue-400 to-cyan-400" },
                            { title: "Community Education", progress: 93, color: "from-purple-400 to-pink-400" }
                          ].map((project, index) => (
                            <motion.div
                              key={project.title}
                              className="bg-white/10 backdrop-blur-md rounded-lg p-3 border border-white/20"
                              initial={{ x: 50, opacity: 0 }}
                              animate={{ x: 0, opacity: 1 }}
                              transition={{ delay: 0.8 + index * 0.1 }}
                            >
                              <div className="flex justify-between items-center mb-2">
                                <span className="text-white font-medium text-sm">{project.title}</span>
                                <span className="text-emerald-300 font-bold text-sm">{project.progress}%</span>
                              </div>
                              <div className="w-full bg-white/20 rounded-full h-2">
                                <motion.div 
                                  className={`bg-gradient-to-r ${project.color} h-2 rounded-full`}
                                  initial={{ width: 0 }}
                                  animate={{ width: `${project.progress}%` }}
                                  transition={{ delay: 1 + index * 0.1, duration: 1 }}
                                />
                              </div>
                </motion.div>
                          ))}
            </div>
          </motion.div>

                      {/* Quick Actions */}
                      <motion.div 
                        className="flex space-x-2"
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.9 }}
                      >
                        <button className="flex-1 bg-white/10 backdrop-blur-md text-white py-2 px-3 rounded-lg border border-white/30 hover:bg-white/20 transition-all duration-300 flex items-center justify-center space-x-1 text-sm">
                          <Heart className="w-3 h-3" />
                          <span>Support</span>
                        </button>
                        <button className="flex-1 bg-white/10 backdrop-blur-md text-white py-2 px-3 rounded-lg border border-white/30 hover:bg-white/20 transition-all duration-300 flex items-center justify-center space-x-1 text-sm">
                          <Users className="w-3 h-3" />
                          <span>Volunteer</span>
                        </button>
                        <button className="flex-1 bg-white/10 backdrop-blur-md text-white py-2 px-3 rounded-lg border border-white/30 hover:bg-white/20 transition-all duration-300 flex items-center justify-center space-x-1 text-sm">
                          <Share className="w-3 h-3" />
                          <span>Share</span>
                        </button>
                      </motion.div>
                    </div>
                  </div>
                </div>
        </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>

      {/* Enhanced Footer */}
      <footer className="relative z-10 bg-gradient-to-b from-emerald-900/80 to-teal-900/80 border-t border-white/20 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Enhanced Brand */}
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="relative">
                  <Globe className="h-10 w-10 text-emerald-300 animate-spin-slow" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
                  <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-teal-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-white mb-1">
                    Nature View
                  </h3>
                  <div className="flex items-center space-x-2">
                    <Star className="h-4 w-4 text-yellow-300 animate-pulse" />
                    <span className="text-emerald-300 text-sm font-medium">Premium Wildlife Explorer</span>
                </div>
              </div>
              </div>
              <p className="text-emerald-200 mb-6 max-w-md leading-relaxed">
                Explore wildlife from every corner of the world through interactive 3D experiences. Learn about conservation, 
                discover amazing animals, and become an environmental advocate.
              </p>
              
              {/* Enhanced Social Links */}
              <div className="flex space-x-3 mb-6">
              <motion.button
                whileHover={{ scale: 1.1 }}
                  className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-emerald-200 hover:text-white hover:bg-white/20 transition-all duration-300 border border-white/20"
                >
                  <Twitter className="h-4 w-4" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-emerald-200 hover:text-white hover:bg-white/20 transition-all duration-300 border border-white/20"
                >
                  <Facebook className="h-4 w-4" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-emerald-200 hover:text-white hover:bg-white/20 transition-all duration-300 border border-white/20"
                >
                  <Instagram className="h-4 w-4" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-emerald-200 hover:text-white hover:bg-white/20 transition-all duration-300 border border-white/20"
                >
                  <Github className="h-4 w-4" />
              </motion.button>
            </div>
            
              {/* Quick Stats */}
              <div className="flex space-x-6 text-sm">
                <div className="flex items-center space-x-2 text-emerald-200">
                  <Award className="h-4 w-4" />
                  <span>5 Regions</span>
              </div>
                <div className="flex items-center space-x-2 text-emerald-200">
                  <Users className="h-4 w-4" />
                  <span>2,341 Members</span>
              </div>
                <div className="flex items-center space-x-2 text-emerald-200">
                  <TrendingUp className="h-4 w-4" />
                  <span>150+ Species</span>
            </div>
              </div>
            </div>
            
            {/* Enhanced Quick Links */}
            <div>
              <h4 className="text-lg font-bold text-white mb-4">Explore</h4>
              <ul className="space-y-3">
                {[
                  { icon: Globe, label: "All Regions" },
                  { icon: Heart, label: "Wildlife Gallery" },
                  { icon: Leaf, label: "Learning Path" },
                  { icon: ExternalLink, label: "Conservation" }
                ].map((item, index) => (
                  <li key={item.label}>
              <motion.button 
                      whileHover={{ scale: 1.05, x: 5 }}
                      className="text-emerald-200 hover:text-white justify-start p-0 h-auto transition-all duration-300 flex items-center w-full"
                    >
                      <item.icon className="h-4 w-4 mr-2" />
                      {item.label}
              </motion.button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Enhanced Contact */}
            <div>
              <h4 className="text-lg font-bold text-white mb-4">Contact</h4>
              <ul className="space-y-3">
                {[
                  { icon: Mail, label: "Contact Us" },
                  { icon: Heart, label: "Support" },
                  { icon: Globe, label: "Privacy Policy" },
                  { icon: ExternalLink, label: "Terms of Service" }
                ].map((item, index) => (
                  <li key={item.label}>
              <motion.button 
                      whileHover={{ scale: 1.05, x: 5 }}
                      className="text-emerald-200 hover:text-white justify-start p-0 h-auto transition-all duration-300 flex items-center w-full"
              >
                      <item.icon className="h-4 w-4 mr-2" />
                      {item.label}
              </motion.button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Enhanced Bottom Bar */}
          <div className="border-t border-white/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-4">
              <p className="text-emerald-200 text-sm">
                © 2024 Nature View. All rights reserved.
              </p>
              <div className="flex items-center space-x-2">
                <Heart className="h-4 w-4 text-pink-300 animate-pulse" />
                <span className="text-emerald-200 text-sm">Made for wildlife conservation</span>
              </div>
            </div>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <div className="flex items-center space-x-2 text-emerald-200 text-sm">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                <span>Live Updates</span>
              </div>
              <div className="flex items-center space-x-2 text-emerald-200 text-sm">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                <span>Online</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
} 