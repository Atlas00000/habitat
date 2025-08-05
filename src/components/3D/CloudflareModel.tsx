"use client"

import React, { Suspense, useState, useEffect } from 'react'
import { useGLTF } from '@react-three/drei'
import { CloudflareAsset } from '../../config/cloudflare'

interface CloudflareModelProps {
  asset: CloudflareAsset
  position?: [number, number, number]
  scale?: [number, number, number]
  rotation?: [number, number, number]
  onClick?: () => void
  onLoad?: () => void
  onError?: (error: Error) => void
}

function ModelComponent({ asset, position, scale, rotation, onClick, onLoad, onError }: CloudflareModelProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  // Use proxy URL to avoid CORS issues
  const proxyUrl = `/api/proxy?url=${encodeURIComponent(asset.url)}`
  
  // Load the model using useGLTF
  const { scene } = useGLTF(proxyUrl)

  useEffect(() => {
    if (scene && !isLoaded) {
      setIsLoaded(true)
      onLoad?.()
    }
  }, [scene, isLoaded, onLoad])

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

  // Adjust position based on asset type
  const getAssetPosition = () => {
    // Use the passed position parameter if provided, otherwise use defaults
    if (position) {
      return position
    }
    
    // Default positions based on asset type
    if (asset.metadata?.tags?.includes('animal')) {
      return [0, 0, 0] as [number, number, number]
    }
    if (asset.metadata?.tags?.includes('environment')) {
      return [0, 0, 0] as [number, number, number]
    }
    return [0, 0, 0]
  }

  // Adjust scale based on asset type
  const getAssetScale = () => {
    // Use the passed scale parameter if provided, otherwise use defaults
    if (scale) {
      return scale
    }
    
    // Default scales based on asset type
    if (asset.metadata?.tags?.includes('animal')) {
      return [1, 1, 1] as [number, number, number]
    }
    if (asset.metadata?.tags?.includes('environment')) {
      return [1, 1, 1] as [number, number, number]
    }
    return [1, 1, 1]
  }

  return (
    <group 
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
    <Suspense fallback={null}>
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