"use client"

import React, { useState, Suspense, lazy } from 'react'
import { Button } from '../ui/button'
import { ArrowLeft, Info, Eye, EyeOff, TreePine, Leaf, Mountain, Moon } from 'lucide-react'
import { Animal } from '../data/deer-data'
import { BearPawIcon, BearPawPrint, BearClawIcon } from './BearPawIcon'
import { ArcticRegionViewer } from './ArcticRegionViewer'
import { motion, AnimatePresence } from 'framer-motion'

// Lazy load components for better performance
const BearFloatingDataPanel = lazy(() => import('./BearFloatingDataPanel').then(module => ({ default: module.BearFloatingDataPanel })))
const BearBackgroundElements = lazy(() => import('./BearBackgroundElements').then(module => ({ default: module.BearBackgroundElements })))

interface BearAnimalPageProps {
  animal: Animal
  category: string
  environmentDescription: string
  features: string[]
  backUrl?: string
  backLabel?: string
}

export const BearAnimalPage: React.FC<BearAnimalPageProps> = ({
  animal,
  category,
  environmentDescription,
  features,
  backUrl = '/forest',
  backLabel = 'Back to Forest'
}) => {
  const [showDataPanel, setShowDataPanel] = useState(true)
  const [selectedAnimal, setSelectedAnimal] = useState(animal)

  const handleBack = () => {
    if (backUrl) {
      window.location.href = backUrl
    } else {
      window.history.back()
    }
  }

  return (
    <main className="w-full h-screen bg-gradient-to-br from-bear-50 via-forest-50 to-bear-100 relative overflow-hidden">
      {/* Enhanced background elements - lazy loaded */}
      <Suspense fallback={null}>
        <BearBackgroundElements />
      </Suspense>

      <div className="w-full h-full relative">
        {/* 3D Environment Viewer */}
        <ArcticRegionViewer category={category} selectedAnimal={animal} />
        
        {/* Enhanced Bear-specific overlay with habitat gradients */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute top-4 left-4 z-20 bg-gradient-to-br from-bear-50/95 to-forest-50/95 backdrop-blur-md rounded-xl p-6 max-w-md shadow-2xl border border-bear-200/30"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <BearPawIcon size={28} color="#8B4513" />
              <h2 className="text-2xl font-bold text-bear-900 flex items-center">
                {animal.name} Habitat
              </h2>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowDataPanel(!showDataPanel)}
              className="text-bear-700 hover:text-bear-900 hover:bg-bear-100/50"
            >
              {showDataPanel ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>
          </div>
          
          <p className="text-sm text-bear-800 mb-4 leading-relaxed">
            {environmentDescription}
          </p>
          
          <div className="space-y-3">
            {features.map((feature, index) => (
              <motion.div 
                key={index} 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-center space-x-2"
              >
                <BearClawIcon size={16} color="#8B4513" />
                <span className="text-xs text-bear-700">{feature}</span>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-4 pt-4 border-t border-amber-200">
            <div className="flex items-center space-x-2 text-xs text-bear-600">
              <Info className="h-3 w-3" />
              <span>Explore the {animal.name.toLowerCase()} habitat and learn fascinating facts</span>
            </div>
          </div>
        </motion.div>

        {/* Enhanced Back button with bear theme */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="absolute top-4 right-4 z-20"
        >
          <Button
            variant="outline"
            size="sm"
            onClick={handleBack}
            className="bg-gradient-to-r from-bear-50/90 to-forest-50/90 backdrop-blur-md border-bear-200/30 text-bear-800 hover:bg-bear-100/90 hover:border-bear-300/50 transition-all duration-300"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            {backLabel}
          </Button>
        </motion.div>

        {/* Habitat Environment Cards */}
        <div className="absolute bottom-4 left-4 z-20 space-y-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-gradient-to-r from-forest-50/90 to-forest-100/90 backdrop-blur-md rounded-lg p-3 border border-forest-200/30 shadow-lg"
          >
            <div className="flex items-center space-x-2">
              <TreePine className="h-4 w-4 text-green-700" />
              <span className="text-xs text-forest-800 font-medium">Forest Habitat</span>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="bg-gradient-to-r from-bear-50/90 to-bear-100/90 backdrop-blur-md rounded-lg p-3 border border-bear-200/30 shadow-lg"
          >
            <div className="flex items-center space-x-2">
              <Leaf className="h-4 w-4 text-amber-700" />
              <span className="text-xs text-bear-800 font-medium">Omnivore Diet</span>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="bg-gradient-to-r from-blue-50/90 to-indigo-50/90 backdrop-blur-md rounded-lg p-3 border border-blue-200/30 shadow-lg"
          >
            <div className="flex items-center space-x-2">
              <Moon className="h-4 w-4 text-blue-700" />
              <span className="text-xs text-blue-800 font-medium">Nocturnal Activity</span>
            </div>
          </motion.div>
        </div>

        {/* Comprehensive Data Panel - lazy loaded */}
        <AnimatePresence>
          {showDataPanel && selectedAnimal && (
            <Suspense fallback={
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="fixed inset-0 z-30 flex items-center justify-center bg-black/20"
              >
                <div className="bg-white/90 backdrop-blur-md rounded-xl p-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-bear-600"></div>
                </div>
              </motion.div>
            }>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <BearFloatingDataPanel animal={selectedAnimal} />
              </motion.div>
            </Suspense>
          )}
        </AnimatePresence>
      </div>
    </main>
  )
}
