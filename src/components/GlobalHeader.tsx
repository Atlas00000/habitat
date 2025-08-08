"use client"

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Volume2, VolumeX } from 'lucide-react'

export function GlobalHeader() {
  const [isMusicPlaying, setIsMusicPlaying] = useState(false)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    
    // Initialize music state from localStorage
    const savedMusicState = localStorage.getItem('natureViewMusicPlaying')
    if (savedMusicState === 'true') {
      setIsMusicPlaying(true)
    }

    // Initialize audio
    const initMusic = () => {
      if (typeof window !== 'undefined') {
        const audio = new Audio('/Upbeat_Jungle.mp3')
        audio.loop = true
        audio.volume = 0.3
        audio.preload = 'metadata'
        ;(window as any).backgroundAudio = audio

        // Add event listeners
        audio.addEventListener('canplaythrough', () => {
          console.log('Audio ready to play')
        })

        audio.addEventListener('error', (error) => {
          console.log('Audio error:', error)
        })

        audio.addEventListener('play', () => {
          setIsMusicPlaying(true)
          localStorage.setItem('natureViewMusicPlaying', 'true')
        })

        audio.addEventListener('pause', () => {
          setIsMusicPlaying(false)
          localStorage.setItem('natureViewMusicPlaying', 'false')
        })
      }
    }

    initMusic()

    // Check audio state after initialization and loading completion
    const checkAudioState = () => {
      const audio = (window as any).backgroundAudio
      if (audio) {
        setIsMusicPlaying(!audio.paused)
      }
    }

    // Check immediately
    setTimeout(checkAudioState, 200)
    
    // Check again after loading screen completes and periodically
    setTimeout(checkAudioState, 2700) // 2.5s loading + 200ms buffer
    
    // Set up periodic checks for audio state changes
    const audioStateInterval = setInterval(checkAudioState, 1000)
    
    return () => clearInterval(audioStateInterval)
  }, [])

  return (
    <>
      {/* Enhanced Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-emerald-900/80 via-teal-800/80 to-cyan-700/80 backdrop-blur-xl border-b border-white/20 shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="text-3xl animate-bounce-gentle">🌿</div>
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-teal-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
              </div>
              <div>
                <Link href="/" className="hover:opacity-80 transition-opacity">
                  <h1 className="text-2xl font-bold text-white mb-1">Nature View</h1>
                  <p className="text-sm text-emerald-200 font-medium">Global Wildlife Explorer</p>
                </Link>
              </div>
            </div>

            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/arctic" className="text-emerald-200 hover:text-white transition-all duration-300 hover:scale-105 font-medium">Arctic Life</Link>
              <Link href="/forest" className="text-emerald-200 hover:text-white transition-all duration-300 hover:scale-105 font-medium">Forest Realm</Link>
              <Link href="/mountain" className="text-emerald-200 hover:text-white transition-all duration-300 hover:scale-105 font-medium">Alpine Heights</Link>
              <Link href="/safari" className="text-emerald-200 hover:text-white transition-all duration-300 hover:scale-105 font-medium">Global Safari</Link>
              <Link href="/coastal" className="text-emerald-200 hover:text-white transition-all duration-300 hover:scale-105 font-medium">Coastal Waters</Link>
            </nav>
            
            <div className="flex items-center space-x-3">
              {/* Music Control Button - Only render on client */}
              {isClient && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    console.log('Music button clicked!')
                    const audio = (window as any).backgroundAudio
                    console.log('Audio element:', audio)
                    if (audio) {
                      if (isMusicPlaying) {
                        console.log('Pausing music...')
                        audio.pause()
                        setIsMusicPlaying(false)
                        localStorage.setItem('natureViewMusicPlaying', 'false')
                      } else {
                        console.log('Playing music...')
                        audio.play().then(() => {
                          console.log('Music started successfully!')
                          setIsMusicPlaying(true)
                          localStorage.setItem('natureViewMusicPlaying', 'true')
                        }).catch((error: any) => {
                          console.log('Playback failed:', error)
                        })
                      }
                    } else {
                      console.log('No audio element found')
                    }
                  }}
                  className="w-12 h-12 bg-gradient-to-br from-emerald-600/60 to-teal-600/60 backdrop-blur-md rounded-full flex items-center justify-center border-2 border-white/30 shadow-lg hover:bg-white/30 transition-all duration-300 relative group cursor-pointer"
                  title={isMusicPlaying ? "Pause Music" : "Play Music"}
                >
                  {isMusicPlaying ? (
                    <Volume2 className="w-6 h-6 text-white animate-pulse" />
                  ) : (
                    <VolumeX className="w-6 h-6 text-white/70" />
                  )}
                  {/* Animated sound waves when playing */}
                  {isMusicPlaying && (
                    <div className="absolute inset-0 flex items-center justify-center space-x-1">
                      <div className="w-0.5 h-3 bg-emerald-300 animate-pulse" style={{ animationDelay: '0s' }}></div>
                      <div className="w-0.5 h-4 bg-emerald-300 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-0.5 h-2 bg-emerald-300 animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                  )}
                  {/* Tooltip */}
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-black/90 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50">
                    {isMusicPlaying ? "Pause Music" : "Play Music"}
                  </div>
                </motion.button>
              )}
              
              {/* User Avatar */}
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-600/40 to-teal-600/40 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 shadow-lg hover:scale-105 transition-all duration-300">
                  <div className="w-5 h-5 bg-white rounded-full animate-pulse"></div>
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Header Spacer */}
      <div className="h-20" />
    </>
  )
}
