"use client"

import React, { createContext, useContext, useState, useEffect } from 'react'
import { LoadingScreen } from './LoadingScreen'

interface LoadingContextType {
  isLoading: boolean
  setIsLoading: (loading: boolean) => void
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined)

export function useLoading() {
  const context = useContext(LoadingContext)
  if (context === undefined) {
    throw new Error('useLoading must be used within a LoadingProvider')
  }
  return context
}

export function LoadingProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasUserInteracted, setHasUserInteracted] = useState(false)

  useEffect(() => {
    // Simulate initial loading time
    const timer = setTimeout(() => {
      setIsLoading(false)
      
      // Set up user interaction listener for auto-play
      const handleUserInteraction = () => {
        if (!hasUserInteracted) {
          setHasUserInteracted(true)
          const audio = (window as any).backgroundAudio
          if (audio && audio.paused) {
            audio.play().then(() => {
              console.log('Audio auto-started after user interaction')
              localStorage.setItem('natureViewMusicPlaying', 'true')
            }).catch((error: any) => {
              console.log('Auto-play failed after user interaction:', error)
            })
          }
          // Remove listeners after first interaction
          document.removeEventListener('click', handleUserInteraction)
          document.removeEventListener('keydown', handleUserInteraction)
          document.removeEventListener('touchstart', handleUserInteraction)
        }
      }

      // Add event listeners for user interaction
      document.addEventListener('click', handleUserInteraction)
      document.addEventListener('keydown', handleUserInteraction)
      document.addEventListener('touchstart', handleUserInteraction)
    }, 2500) // Show loading for 2.5 seconds

    return () => clearTimeout(timer)
  }, [hasUserInteracted])

  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
      {isLoading && <LoadingScreen />}
      {children}
    </LoadingContext.Provider>
  )
}
