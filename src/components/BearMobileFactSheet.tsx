"use client"

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Info, Utensils, Heart, Zap, MapPin } from 'lucide-react'
import { BearPawIcon, BearClawIcon } from './BearPawIcon'
import { Animal } from '../data/deer-data'

interface BearMobileFactSheetProps {
  animal: Animal
}

interface FactItem {
  id: string
  title: string
  content: string
  icon: React.ReactNode
  category: 'fact' | 'stats' | 'diet' | 'habitat'
}

export const BearMobileFactSheet: React.FC<BearMobileFactSheetProps> = ({ animal }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  // Create comprehensive fact items from animal data
  const factItems: FactItem[] = [
    // Fun Facts
    ...animal.funFacts.map((fact, index) => ({
      id: `fun-fact-${index}`,
      title: `Did You Know?`,
      content: fact,
      icon: <BearPawIcon size={20} color="#8B4513" />,
      category: 'fact' as const
    })),
    
    // Stats
    {
      id: 'weight',
      title: 'Weight',
      content: animal.stats.weight,
      icon: <Heart className="h-5 w-5 text-red-600" />,
      category: 'stats' as const
    },
    {
      id: 'height',
      title: 'Height',
      content: animal.stats.height,
      icon: <Zap className="h-5 w-5 text-yellow-600" />,
      category: 'stats' as const
    },
    {
      id: 'lifespan',
      title: 'Lifespan',
      content: animal.stats.lifespan,
      icon: <Heart className="h-5 w-5 text-green-600" />,
      category: 'stats' as const
    },
    {
      id: 'speed',
      title: 'Speed',
      content: animal.stats.speed,
      icon: <Zap className="h-5 w-5 text-blue-600" />,
      category: 'stats' as const
    },
    
    // Diet items
    ...animal.diet.slice(0, 4).map((food, index) => ({
      id: `diet-${index}`,
      title: 'Diet',
      content: food,
      icon: <Utensils className="h-5 w-5 text-amber-600" />,
      category: 'diet' as const
    })),
    
    // Habitat
    {
      id: 'habitat',
      title: 'Habitat',
      content: animal.habitat,
      icon: <MapPin className="h-5 w-5 text-green-600" />,
      category: 'habitat' as const
    }
  ]

  // Auto-rotate facts
  useEffect(() => {
    if (!isAutoPlaying || factItems.length <= 1) return

    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % factItems.length)
    }, 5000) // 5 seconds per fact

    return () => clearInterval(interval)
  }, [isAutoPlaying, factItems.length])

  const nextFact = () => {
    setCurrentIndex(prev => (prev + 1) % factItems.length)
    setIsAutoPlaying(false)
  }

  const prevFact = () => {
    setCurrentIndex(prev => (prev - 1 + factItems.length) % factItems.length)
    setIsAutoPlaying(false)
  }

  const currentFact = factItems[currentIndex]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="md:hidden absolute bottom-4 left-4 right-4 z-20"
    >
      <div className="bg-gradient-to-r from-bear-50/95 to-forest-50/95 backdrop-blur-md rounded-xl p-4 border border-bear-200/30 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <BearClawIcon size={16} color="#8B4513" />
            <span className="text-sm font-semibold text-bear-800">Bear Fact Sheet</span>
          </div>
          <div className="flex items-center space-x-1">
            <span className="text-xs text-bear-600">
              {currentIndex + 1} / {factItems.length}
            </span>
          </div>
        </div>

        {/* Fact Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentFact.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="min-h-[80px] flex flex-col justify-center"
          >
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 mt-1">
                {currentFact.icon}
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-medium text-bear-900 mb-1">
                  {currentFact.title}
                </h3>
                <p className="text-xs text-bear-700 leading-relaxed">
                  {currentFact.content}
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-bear-200/50">
          <button
            onClick={prevFact}
            className="p-2 rounded-lg bg-bear-100/50 hover:bg-bear-200/50 transition-colors"
          >
            <ChevronLeft className="h-4 w-4 text-bear-700" />
          </button>
          
          {/* Progress Dots */}
          <div className="flex space-x-1">
            {factItems.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentIndex(index)
                  setIsAutoPlaying(false)
                }}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentIndex 
                    ? 'bg-bear-600' 
                    : 'bg-bear-300 hover:bg-bear-400'
                }`}
              />
            ))}
          </div>
          
          <button
            onClick={nextFact}
            className="p-2 rounded-lg bg-bear-100/50 hover:bg-bear-200/50 transition-colors"
          >
            <ChevronRight className="h-4 w-4 text-bear-700" />
          </button>
        </div>

        {/* Auto-play indicator */}
        <div className="flex items-center justify-center mt-2">
          <div className="flex items-center space-x-1">
            <div className={`w-2 h-2 rounded-full transition-colors ${
              isAutoPlaying ? 'bg-green-500' : 'bg-gray-400'
            }`} />
            <span className="text-xs text-bear-600">
              {isAutoPlaying ? 'Auto-playing' : 'Paused'}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
