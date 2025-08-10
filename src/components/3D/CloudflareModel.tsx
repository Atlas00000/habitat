"use client"

import React, { Suspense, useState, useEffect, useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { CloudflareAsset } from '../../config/cloudflare'
import { LoadingSpinner } from './LoadingSpinner'
import { useModelPreloader } from '../../services/modelCache'
import * as THREE from 'three'

interface CloudflareModelProps {
  asset: CloudflareAsset
  position?: [number, number, number]
  scale?: [number, number, number]
  rotation?: [number, number, number]
  onClick?: () => void
  onLoad?: () => void
  onError?: (error: Error) => void
  autoPlay?: boolean
  loop?: boolean
  animationSpeed?: number
  onAnimationsLoaded?: (animations: string[]) => void
}

function ModelComponent({ 
  asset, 
  position, 
  scale, 
  rotation, 
  onClick, 
  onLoad, 
  onError,
  autoPlay = true,
  loop = true,
  animationSpeed = 1,
  onAnimationsLoaded
}: CloudflareModelProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const [animations, setAnimations] = useState<any[]>([])
  const [mixer, setMixer] = useState<any>(null)
  const [retryCount, setRetryCount] = useState(0)
  const groupRef = useRef<THREE.Group>(null)
  const { isPreloaded, isLoading } = useModelPreloader()

  // Use proxy URL to avoid CORS issues with retry mechanism
  const proxyUrl = `/api/proxy?url=${encodeURIComponent(asset.url)}`
  
  // Load the model using useGLTF with improved error handling
  const { scene, animations: modelAnimations } = useGLTF(proxyUrl, true, true, (error) => {
    // Only log texture errors in development mode
    if (process.env.NODE_ENV === 'development') {
      console.warn(`Texture loading warning for ${asset.name}:`, error)
    }
    // Continue loading even if textures fail - fallback colors will be applied
  })



  // Ensure materials are properly set up with fallback colors
  useEffect(() => {
    if (scene) {
      // Give textures time to load before applying fallback colors
      const timer = setTimeout(() => {
        scene.traverse((child) => {
          if (child instanceof THREE.Mesh && child.material) {
            // Ensure material is properly configured
            if (Array.isArray(child.material)) {
              child.material.forEach(mat => {
                if (mat.map) {
                  mat.needsUpdate = true
                  // Don't override color if texture exists
                } else if (mat.color && !mat.map) {
                  // Apply fallback colors based on asset type
                  if (asset.id === 'black-bear-model') {
                    mat.color.setHex(0x3E2723) // Dark brown for bear
                  } else if (asset.id === 'forest2-landscape-bear' || asset.id === 'forest2-landscape') {
                    mat.color.setHex(0x4A7C59) // Forest green for landscape
                  } else if (asset.id === 'raccoon-model') {
                    mat.color.setHex(0x8B7355) // Brown color for raccoon
                  } else {
                    mat.color.setHex(0x8B7355) // Default brown
                  }
                }
              })
            } else {
              if (child.material.map) {
                child.material.needsUpdate = true
                // Don't override color if texture exists
              } else if (child.material.color && !child.material.map) {
                // Apply fallback colors based on asset type
                if (asset.id === 'black-bear-model') {
                  child.material.color.setHex(0x3E2723) // Dark brown for bear
                } else if (asset.id === 'forest2-landscape-bear' || asset.id === 'forest2-landscape') {
                  child.material.color.setHex(0x4A7C59) // Forest green for landscape
                } else if (asset.id === 'raccoon-model') {
                  child.material.color.setHex(0x8B7355) // Brown color for raccoon
                } else {
                  child.material.color.setHex(0x8B7355) // Default brown
                }
              }
            }
          }
        })
      }, 1500) // Reduced wait time for textures to load

      return () => clearTimeout(timer)
    }
  }, [scene, asset.id])

  useEffect(() => {
    const setupAnimations = async () => {
      if (scene && !isLoaded) {
        setIsLoaded(true)
        onLoad?.()
        
        // Setup animations if available
        if (modelAnimations && modelAnimations.length > 0) {
          console.log(`Found ${modelAnimations.length} animations for ${asset.name} (${asset.id}):`, modelAnimations.map(a => a.name))
          setAnimations(modelAnimations)
          
          // Notify parent about available animations
          onAnimationsLoaded?.(modelAnimations.map(a => a.name))
          
          // Create animation mixer
          const { AnimationMixer } = await import('three')
          const newMixer = new AnimationMixer(scene)
          setMixer(newMixer)
          
          // Play specific animations for black bear
          if (asset.id === 'black-bear-model') {
            // Look for bear_idle_smell animation
            const bearIdleSmell = modelAnimations.find(clip => 
              clip.name.toLowerCase().includes('bear_idle_smell') || 
              clip.name.toLowerCase().includes('idle_smell') ||
              clip.name.toLowerCase().includes('smell')
            )
            
            if (bearIdleSmell) {
              const action = newMixer.clipAction(bearIdleSmell)
              action.setLoop(THREE.LoopRepeat, Infinity) // Force infinite loop
              action.setEffectiveTimeScale(animationSpeed)
              action.clampWhenFinished = false // Don't clamp at the end
              action.play()
              console.log(`Playing bear animation: ${bearIdleSmell.name} with infinite loop`)
            } else {
              // Fallback to first animation if bear_idle_smell not found
              const firstClip = modelAnimations[0]
              if (firstClip) {
                const action = newMixer.clipAction(firstClip)
                action.setLoop(THREE.LoopRepeat, Infinity) // Force infinite loop
                action.setEffectiveTimeScale(animationSpeed)
                action.clampWhenFinished = false // Don't clamp at the end
                action.play()
                console.log(`Playing fallback bear animation: ${firstClip.name} with infinite loop`)
              }
            }
          } else if (asset.id === 'jaguar-model') {
            // Play all animations for jaguar
            modelAnimations.forEach((clip) => {
              const action = newMixer.clipAction(clip)
              if (autoPlay) {
                action.setLoop(THREE.LoopRepeat, Infinity) // Force infinite loop
                action.setEffectiveTimeScale(animationSpeed)
                action.clampWhenFinished = false // Don't clamp at the end
                action.play()
              }
            })
          } else {
            // Play all animations for other models
            modelAnimations.forEach((clip) => {
              const action = newMixer.clipAction(clip)
              if (autoPlay) {
                action.setLoop(THREE.LoopRepeat, Infinity) // Force infinite loop
                action.setEffectiveTimeScale(animationSpeed)
                action.clampWhenFinished = false // Don't clamp at the end
                action.play()
              }
            })
          }
        }
      }
    }
    
    setupAnimations()
    
    // Cleanup function to dispose mixer when component unmounts
    return () => {
      if (mixer) {
        mixer.stopAllAction()
        mixer.uncacheRoot(scene)
      }
    }
  }, [scene, isLoaded, onLoad, modelAnimations, asset.name, autoPlay, loop, animationSpeed, mixer])

  // Update animation mixer on each frame
  useFrame((state, delta) => {
    if (mixer) {
      // Cap delta to prevent large jumps
      const cappedDelta = Math.min(delta, 0.1)
      mixer.update(cappedDelta * animationSpeed)
    }
  })

  useEffect(() => {
    // Handle loading errors
    const handleError = (event: ErrorEvent) => {
      if (event.message.includes(asset.url) || event.message.includes(proxyUrl)) {
        const error = new Error(`Failed to load ${asset.name}: CORS or network error`)
        setError(error)
        onError?.(error)
      }
    }

    window.addEventListener('error', handleError)
    return () => window.removeEventListener('error', handleError)
  }, [asset.url, asset.name, proxyUrl, onError])

  if (error) {
    console.error(`Failed to load model ${asset.name}:`, error)
    return null
  }

  if (!scene) {
    return (
      <group position={getAssetPosition()}>
        <mesh>
          <boxGeometry args={[0.5, 0.5, 0.5]} />
          <meshStandardMaterial color="#8B7355" />
        </mesh>
      </group>
    )
  }

  // Show cache status in console for debugging (only in development)
  if (process.env.NODE_ENV === 'development') {
    if (isPreloaded(asset)) {
      console.log(`Model ${asset.name} loaded from cache`)
    } else if (isLoading(asset)) {
      console.log(`Model ${asset.name} is currently loading`)
    }
  }

  // Adjust position based on asset type
  const getAssetPosition = (): [number, number, number] => {
    // Use the passed position parameter if provided, otherwise use defaults
    if (position) {
      return position
    }
    
    // Default positions based on asset type
    if (asset.metadata?.tags?.includes('animal')) {
      return [0, 0, 0]
    }
    if (asset.metadata?.tags?.includes('environment')) {
      return [0, 0, 0]
    }
    return [0, 0, 0]
  }

  // Adjust scale based on asset type
  const getAssetScale = (): [number, number, number] => {
    // Use the passed scale parameter if provided, otherwise use defaults
    if (scale) {
      return scale
    }
    
    // Default scales based on asset type
    if (asset.metadata?.tags?.includes('animal')) {
      return [1, 1, 1]
    }
    if (asset.metadata?.tags?.includes('environment')) {
      return [1, 1, 1]
    }
    return [1, 1, 1]
  }

  return (
    <group 
      ref={groupRef}
      position={getAssetPosition()} 
      scale={getAssetScale()} 
      rotation={rotation}
      onClick={onClick}
    >
      <primitive object={scene} />
    </group>
  )
}

export const CloudflareModel: React.FC<CloudflareModelProps> = (props) => {
  return (
    <Suspense fallback={<LoadingSpinner size={1} color="#3B82F6" message={`Loading ${props.asset.name}...`} />}>
      <ModelComponent {...props} />
    </Suspense>
  )
}

// Preload function for models
export const preloadModel = (asset: CloudflareAsset) => {
  if (asset.type === 'model') {
    const proxyUrl = `/api/proxy?url=${encodeURIComponent(asset.url)}`
    useGLTF.preload(proxyUrl)
  }
} 