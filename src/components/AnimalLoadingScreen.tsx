import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { BearPawIcon } from './BearPawIcon'

interface AnimalLoadingScreenProps {
  animalName: string
  onLoadingComplete: () => void
  isModelLoaded: boolean
}

export const AnimalLoadingScreen: React.FC<AnimalLoadingScreenProps> = ({
  animalName,
  onLoadingComplete,
  isModelLoaded
}) => {
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [showComplete, setShowComplete] = useState(false)

  // Simulate loading progress
  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 90) return prev
        return prev + Math.random() * 10
      })
    }, 200)

    return () => clearInterval(interval)
  }, [])

  // When model is loaded, complete the loading
  useEffect(() => {
    if (isModelLoaded && loadingProgress >= 90) {
      setLoadingProgress(100)
      setShowComplete(true)
      
      // Wait a moment to show completion, then call onLoadingComplete
      const timer = setTimeout(() => {
        onLoadingComplete()
      }, 800)

      return () => clearTimeout(timer)
    }
  }, [isModelLoaded, loadingProgress, onLoadingComplete])

  // Fallback timeout - if model doesn't load within 10 seconds, proceed anyway
  useEffect(() => {
    const fallbackTimer = setTimeout(() => {
      if (!isModelLoaded) {
        setLoadingProgress(100)
        setShowComplete(true)
        setTimeout(() => onLoadingComplete(), 800)
      }
    }, 10000)

    return () => clearTimeout(fallbackTimer)
  }, [isModelLoaded, onLoadingComplete])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-gradient-to-br from-bear-50 via-forest-50 to-bear-100 flex items-center justify-center"
    >
      <div className="text-center space-y-6">
        {/* Animal Icon */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center"
        >
          <BearPawIcon size={80} color="#8B4513" />
        </motion.div>

        {/* Loading Text */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-2"
        >
          <h2 className="text-2xl font-bold text-bear-900">
            Loading {animalName}...
          </h2>
          <p className="text-bear-700">
            Preparing the habitat environment
          </p>
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="w-64 h-2 bg-bear-200 rounded-full overflow-hidden mx-auto"
        >
          <motion.div
            className="h-full bg-gradient-to-r from-bear-600 to-forest-600 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${loadingProgress}%` }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>

        {/* Progress Text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-sm text-bear-600"
        >
          {showComplete ? 'Ready!' : `${Math.round(loadingProgress)}%`}
        </motion.div>

        {/* Loading Animation */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="flex justify-center"
        >
          <div className="w-8 h-8 border-2 border-bear-300 border-t-bear-600 rounded-full" />
        </motion.div>
      </div>
    </motion.div>
  )
}
