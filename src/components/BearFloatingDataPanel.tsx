"use client"

import React, { useState, useEffect, useCallback } from "react"
import { Button } from "../ui/button"
import { 
  MapPin, Utensils, Shield, Info, Snowflake, Heart, AlertTriangle, 
  Droplets, Thermometer, Zap, Play, Pause, Volume2, VolumeX, Star, Eye, Target, Wind, Waves, EyeOff,
  TreePine, Leaf, Mountain, Moon, Sun, Cloud
} from "lucide-react"
import { BearPawIcon, BearClawIcon } from './BearPawIcon'
import { motion, AnimatePresence } from 'framer-motion'

interface Animal {
  name: string
  scientificName: string
  habitat: string
  diet: string[]
  conservationStatus: "Least Concern" | "Near Threatened" | "Vulnerable" | "Endangered" | "Critically Endangered"
  funFacts: string[]
  stats: {
    weight: string
    height: string
    lifespan: string
    speed: string
  }
  image?: string
}

interface BearFloatingDataPanelProps {
  animal: Animal
}

const conservationStatusColors = {
  "Least Concern": "bg-green-500/20 text-green-700 border-green-300",
  "Near Threatened": "bg-yellow-500/20 text-yellow-700 border-yellow-300",
  "Vulnerable": "bg-orange-500/20 text-orange-700 border-orange-300",
  "Endangered": "bg-red-500/20 text-red-700 border-red-300",
  "Critically Endangered": "bg-red-600/20 text-red-800 border-red-400"
}

const conservationStatusIcons = {
  "Least Concern": <Heart className="h-4 w-4" />,
  "Near Threatened": <AlertTriangle className="h-4 w-4" />,
  "Vulnerable": <AlertTriangle className="h-4 w-4" />,
  "Endangered": <AlertTriangle className="h-4 w-4" />,
  "Critically Endangered": <AlertTriangle className="h-4 w-4" />
}

export const BearFloatingDataPanel: React.FC<BearFloatingDataPanelProps> = React.memo(({ animal }) => {
  const [currentFactIndex, setCurrentFactIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(true)
  const [showStats, setShowStats] = useState(true)
  const [hoveredPanel, setHoveredPanel] = useState<string | null>(null)
  const [pulseEffect, setPulseEffect] = useState(false)
  const [showUI, setShowUI] = useState(true)

  // Auto-rotate facts with optimized timing and reduced re-renders
  useEffect(() => {
    if (animal.funFacts.length <= 1) return
    
    const interval = setInterval(() => {
      setCurrentFactIndex(prev => (prev + 1) % animal.funFacts.length)
      setPulseEffect(true)
      setTimeout(() => setPulseEffect(false), 300)
    }, 6000)

    return () => clearInterval(interval)
  }, [animal.funFacts.length])

  const toggleStats = useCallback(() => {
    setShowStats(prev => !prev);
  }, [])

  const toggleUI = useCallback(() => {
    setShowUI(prev => !prev);
  }, [])

  const handlePanelHover = useCallback((panel: string) => {
    setHoveredPanel(panel);
  }, []);

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 z-30 pointer-events-none">
             {/* Top Panel - Animal Name & Status with Bear Theme */}
       <div className={`absolute top-20 md:top-16 left-1/2 transform -translate-x-1/2 transition-all duration-500 ${
         showUI ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
       }`}>
         <motion.div 
           initial={{ opacity: 0, y: -20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8 }}
           className={`bg-gradient-to-r from-bear-50/95 to-forest-50/95 backdrop-blur-md rounded-xl p-2 md:p-4 border border-bear-200/30 shadow-2xl transition-all duration-500 max-w-[90vw] md:max-w-none pointer-events-auto ${
             hoveredPanel === 'top' ? 'bg-bear-100/95 scale-105' : ''
           }`}
          onMouseEnter={() => handlePanelHover('top')}
          onMouseLeave={() => handlePanelHover(null)}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <BearPawIcon size={24} color="#8B4513" />
                             <h3 className="text-base md:text-xl font-bold text-bear-900">
                {animal.name}
              </h3>
            </div>
            <div className={`px-2 py-1 rounded-full text-xs font-medium border ${conservationStatusColors[animal.conservationStatus]}`}>
              <div className="flex items-center space-x-1">
                {conservationStatusIcons[animal.conservationStatus]}
                <span>{animal.conservationStatus}</span>
              </div>
            </div>
          </div>
          
                     <p className="text-xs md:text-sm text-bear-800 italic">
            {animal.scientificName}
          </p>
        </motion.div>
      </div>

             {/* Right Panel - Fun Facts with Bear Theme */}
       <div className={`absolute top-1/2 right-2 md:right-4 transform -translate-y-1/2 transition-all duration-500 ${
         showUI ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4 pointer-events-none'
       }`}>
         <motion.div 
           initial={{ opacity: 0, x: 20 }}
           animate={{ opacity: 1, x: 0 }}
           transition={{ duration: 0.8, delay: 0.2 }}
           className={`bg-gradient-to-br from-forest-50/95 to-forest-100/95 backdrop-blur-md rounded-xl p-3 md:p-4 border border-forest-200/30 shadow-2xl transition-all duration-500 max-w-[250px] md:max-w-[300px] pointer-events-auto ${
             hoveredPanel === 'facts' ? 'bg-forest-100/95 scale-105' : ''
           }`}
          onMouseEnter={() => handlePanelHover('facts')}
          onMouseLeave={() => handlePanelHover(null)}
        >
          <div className="flex items-center space-x-2 mb-3">
            <BearClawIcon size={20} color="#8B4513" />
                         <h4 className="text-sm md:text-lg font-bold text-forest-900">Fun Facts</h4>
          </div>
          
          <AnimatePresence mode="wait">
            <motion.div
              key={currentFactIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
                             className={`text-xs md:text-sm text-forest-800 leading-relaxed ${pulseEffect ? 'animate-pulse' : ''}`}
            >
              {animal.funFacts[currentFactIndex]}
            </motion.div>
          </AnimatePresence>
          
          <div className="flex justify-center mt-3 space-x-1">
            {animal.funFacts.map((_, index) => (
              <div
                key={index}
                                 className={`w-2 h-2 rounded-full transition-all duration-300 ${
                   index === currentFactIndex ? 'bg-forest-600' : 'bg-forest-300'
                 }`}
              />
            ))}
          </div>
        </motion.div>
      </div>

             {/* Left Panel - Stats with Bear Theme */}
       <div className={`absolute top-1/2 left-2 md:left-4 transform -translate-y-1/2 transition-all duration-500 ${
         showUI ? 'opacity-100 -translate-x-0' : 'opacity-0 -translate-x-4 pointer-events-none'
       }`}>
         <motion.div 
           initial={{ opacity: 0, x: -20 }}
           animate={{ opacity: 1, x: 0 }}
           transition={{ duration: 0.8, delay: 0.4 }}
           className={`bg-gradient-to-br from-bear-50/95 to-bear-100/95 backdrop-blur-md rounded-xl p-3 md:p-4 border border-bear-200/30 shadow-2xl transition-all duration-500 max-w-[220px] md:max-w-[280px] pointer-events-auto ${
             hoveredPanel === 'stats' ? 'bg-bear-100/95 scale-105' : ''
           }`}
          onMouseEnter={() => handlePanelHover('stats')}
          onMouseLeave={() => handlePanelHover(null)}
        >
          <div className="flex items-center space-x-2 mb-3">
            <BearPawIcon size={20} color="#8B4513" />
                         <h4 className="text-sm md:text-lg font-bold text-bear-900">Bear Stats</h4>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
                             <span className="text-xs md:text-sm text-bear-700">Weight:</span>
               <span className="text-xs md:text-sm font-medium text-bear-900">{animal.stats.weight}</span>
             </div>
             <div className="flex items-center justify-between">
               <span className="text-xs md:text-sm text-bear-700">Height:</span>
               <span className="text-xs md:text-sm font-medium text-bear-900">{animal.stats.height}</span>
             </div>
             <div className="flex items-center justify-between">
               <span className="text-xs md:text-sm text-bear-700">Lifespan:</span>
               <span className="text-xs md:text-sm font-medium text-bear-900">{animal.stats.lifespan}</span>
             </div>
             <div className="flex items-center justify-between">
               <span className="text-xs md:text-sm text-bear-700">Speed:</span>
               <span className="text-xs md:text-sm font-medium text-bear-900">{animal.stats.speed}</span>
            </div>
          </div>
        </motion.div>
      </div>

             {/* Bottom Panel - Habitat & Diet with Bear Theme */}
       <div className={`absolute bottom-2 md:bottom-4 left-1/2 transform -translate-x-1/2 transition-all duration-500 ${
         showUI ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
       }`}>
         <motion.div 
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8, delay: 0.6 }}
           className={`bg-gradient-to-r from-blue-50/95 to-indigo-50/95 backdrop-blur-md rounded-xl p-3 md:p-4 border border-blue-200/30 shadow-2xl transition-all duration-500 max-w-[95vw] md:max-w-[600px] pointer-events-auto ${
             hoveredPanel === 'habitat' ? 'bg-blue-100/95 scale-105' : ''
           }`}
          onMouseEnter={() => handlePanelHover('habitat')}
          onMouseLeave={() => handlePanelHover(null)}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <TreePine className="h-4 w-4 text-blue-700" />
                <h4 className="text-sm md:text-lg font-bold text-blue-900">Habitat</h4>
              </div>
                             <p className="text-xs md:text-sm text-blue-800 leading-relaxed">
                {animal.habitat}
              </p>
            </div>
            
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <Leaf className="h-4 w-4 text-blue-700" />
                <h4 className="text-sm md:text-lg font-bold text-blue-900">Diet</h4>
              </div>
                             <div className="text-xs md:text-sm text-blue-800">
                <ul className="list-disc list-inside space-y-1">
                  {animal.diet.slice(0, 4).map((food, index) => (
                    <li key={index}>{food}</li>
                  ))}
                  {animal.diet.length > 4 && (
                    <li className="text-blue-600 italic">...and more</li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

             {/* Control Panel */}
       <div className="absolute bottom-2 md:bottom-4 right-2 md:right-4 pointer-events-auto">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex space-x-2"
        >
          <Button
            variant="outline"
            size="sm"
            onClick={toggleStats}
            className="bg-gradient-to-r from-bear-50/90 to-forest-50/90 backdrop-blur-md border-bear-200/30 text-bear-800 hover:bg-bear-100/90"
          >
            <BearPawIcon size={16} color="#8B4513" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={toggleUI}
            className="bg-gradient-to-r from-bear-50/90 to-forest-50/90 backdrop-blur-md border-bear-200/30 text-bear-800 hover:bg-bear-100/90"
          >
            <Eye className="h-4 w-4" />
          </Button>
        </motion.div>
      </div>
    </div>
  )
})
