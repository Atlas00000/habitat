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
  const groupRef = useRef<THREE.Group>(null)
  const { isPreloaded, isLoading } = useModelPreloader()

  // Use proxy URL to avoid CORS issues
  const proxyUrl = `/api/proxy?url=${encodeURIComponent(asset.url)}`
  
  // Load the model using useGLTF
  const { scene, animations: modelAnimations } = useGLTF(proxyUrl)

  useEffect(() => {
    const setupAnimations = async () => {
      if (scene && !isLoaded) {
        setIsLoaded(true)
        onLoad?.()
        
        // Setup animations if available
        if (modelAnimations && modelAnimations.length > 0) {
          console.log(`Found ${modelAnimations.length} animations for ${asset.name}:`, modelAnimations.map(a => a.name))
          setAnimations(modelAnimations)
          
          // Notify parent about available animations
          onAnimationsLoaded?.(modelAnimations.map(a => a.name))
          
          // Create animation mixer
          const { AnimationMixer } = await import('three')
          const newMixer = new AnimationMixer(scene)
          setMixer(newMixer)
          
          // Play all animations
          modelAnimations.forEach((clip) => {
            const action = newMixer.clipAction(clip)
            if (autoPlay) {
              action.setLoop(loop ? THREE.LoopRepeat : THREE.LoopOnce, 0)
              action.setEffectiveTimeScale(animationSpeed)
              action.play()
            }
          })
        }
      }
    }
    
    setupAnimations()
  }, [scene, isLoaded, onLoad, modelAnimations, asset.name, autoPlay, loop, animationSpeed])

  // Update animation mixer on each frame
  useFrame((state, delta) => {
    if (mixer) {
      mixer.update(delta * animationSpeed)
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
    return null
  }

  // Show cache status in console for debugging
  if (isPreloaded(asset)) {
    console.log(`Model ${asset.name} loaded from cache`)
  } else if (isLoading(asset)) {
    console.log(`Model ${asset.name} is currently loading`)
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