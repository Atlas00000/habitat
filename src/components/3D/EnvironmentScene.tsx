"use client"

import React, { Suspense, useState, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Environment, Sky, useTexture } from '@react-three/drei'
import { CloudflareModel } from './CloudflareModel'
import { getAssetsByCategory, CloudflareAsset } from '../../config/cloudflare'

interface EnvironmentSceneProps {
  category: string
  selectedAssetId?: string
  onAssetSelect?: (asset: CloudflareAsset) => void
  cameraMode?: 'orbit' | 'follow'
  onSceneReady?: () => void
}

// Camera Controller Component
function CameraController() {
  const { camera } = useThree()
  
  useEffect(() => {
    // Set initial camera position closer to the scene
    camera.position.set(0, 2, 8)
    camera.lookAt(0, 1, 0)
  }, [camera])
  
  useFrame(() => {
    // Add subtle camera movement for more dynamic feel
    const time = Date.now() * 0.0001
    camera.position.x = Math.sin(time) * 0.3
    camera.position.z = Math.cos(time) * 0.3 + 8
    camera.position.y = 2 + Math.sin(time * 2) * 0.1
    
    // Keep camera within reasonable bounds
    camera.position.x = Math.max(-10, Math.min(10, camera.position.x))
    camera.position.z = Math.max(3, Math.min(10, camera.position.z))
    camera.position.y = Math.max(1, Math.min(8, camera.position.y))
  })
  
  return null
}

// HDR Environment Component with error handling
function HDREnvironment({ hdrAsset }: { hdrAsset: CloudflareAsset }) {
  const [hasError, setHasError] = useState(false)
  
  if (hasError) {
    return <Sky sunPosition={[0, 1, 0]} />
  }
  
  // Use proxy URL to avoid CORS issues
  const proxyUrl = `/api/proxy?url=${encodeURIComponent(hdrAsset.url)}`
  
  return (
    <Environment 
      files={proxyUrl}
      background={true}
      blur={0.1}
    />
  )
}

export const EnvironmentScene: React.FC<EnvironmentSceneProps> = ({
  category,
  selectedAssetId,
  onAssetSelect,
  cameraMode = 'orbit',
  onSceneReady
}) => {
  const [assets, setAssets] = useState<CloudflareAsset[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [hdrAsset, setHdrAsset] = useState<CloudflareAsset | null>(null)
  const { camera } = useThree()

  // Initialize camera position
  useEffect(() => {
    if (cameraMode === 'orbit') {
      camera.position.set(0, 2, 8)
      camera.lookAt(0, 1, 0)
    }
  }, [camera, cameraMode])

           useEffect(() => {
           const categoryAssets = getAssetsByCategory(category)
           console.log('Category assets loaded:', categoryAssets.map(a => ({ id: a.id, name: a.name, type: a.type })))
           setAssets(categoryAssets)

           // Find HDR asset for environment
           const hdr = categoryAssets.find(asset => asset.type === 'hdr')
           setHdrAsset(hdr || null)

           setIsLoading(false)
           onSceneReady?.()
         }, [category, onSceneReady])

  const handleAssetClick = (asset: CloudflareAsset) => {
    onAssetSelect?.(asset)
  }

  // Get environment-specific colors
  const getEnvironmentColors = () => {
    switch (category) {
      case 'arctic':
        return {
          ground: '#e8f4f8',
          terrain: '#ffffff',
          sky: '#87ceeb'
        }
      case 'forest':
        // Check if we have night HDR for deer environment
        const hasNightHDR = assets.some(asset => 
          asset.type === 'hdr' && asset.metadata?.tags?.includes('night')
        )
        
        if (hasNightHDR) {
          return {
            ground: '#1a3d1a', // Darker forest ground for night
            terrain: '#2d5016',
            sky: '#1a1a2e' // Night sky
          }
        }
        
        return {
          ground: '#2d5016',
          terrain: '#228b22',
          sky: '#90ee90'
        }
      case 'mountain':
        return {
          ground: '#8b4513',
          terrain: '#696969',
          sky: '#87ceeb'
        }
      case 'safari':
        return {
          ground: '#d2b48c',
          terrain: '#f4a460',
          sky: '#ffd700'
        }
      default:
        return {
          ground: '#e8f4f8',
          terrain: '#ffffff',
          sky: '#87ceeb'
        }
    }
  }

  const colors = getEnvironmentColors()

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight
        position={[10, 10, 5]}
        intensity={1}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <pointLight position={[-10, 10, -10]} intensity={0.5} />
      
      {/* Environment */}
      {hdrAsset ? (
        <HDREnvironment hdrAsset={hdrAsset} />
      ) : (
        <Sky sunPosition={[0, 1, 0]} />
      )}
      
      {/* Ground Plane - Customize based on category */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial color={colors.ground} />
      </mesh>
      
      {/* Terrain Layer - Customize based on category */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.4, 0]} receiveShadow>
        <planeGeometry args={[40, 40]} />
        <meshStandardMaterial color={colors.terrain} />
      </mesh>
      
                   {/* Environment Assets */}
             {assets
               .filter(asset => asset.type === 'model') // Only render model assets
               .map((asset) => {
                 // Debug: Log asset being rendered
                 console.log('Rendering asset:', asset.id, asset.name, asset.type)
                 
                 // Position deer above the landscape
                 let position: [number, number, number] = [0, 0, 0]
                 let scale: [number, number, number] = [1, 1, 1]
                 
                 if (asset.id === 'deer-model') {
                   position = [0, 0.5, 0] // Lower deer to ground level with slight elevation
                   scale = [1.5, 1.5, 1.5] // Make deer larger and more visible
                   console.log('Deer positioned at:', position)
                 } else if (asset.id === 'forest2-landscape') {
                   position = [0, 0, 0] // Keep landscape at ground level
                   scale = [1, 1, 1]
                   console.log('Landscape positioned at:', position)
                 }
                 
                 return (
                   <CloudflareModel
                     key={asset.id}
                     asset={asset}
                     position={position}
                     scale={scale}
                     onClick={() => handleAssetClick(asset)}
                     onError={(error) => console.error(`Failed to load ${asset.name}:`, error)}
                   />
                 )
               })}
      
      {/* Camera Controls */}
      {cameraMode === 'orbit' ? (
        <OrbitControls 
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          maxPolarAngle={Math.PI / 2}
          minDistance={3}
          maxDistance={10}
          target={[0, 1, 0]}
          // Add damping for smoother movement
          enableDamping={true}
          dampingFactor={0.05}
          // Add auto-rotate for dynamic feel
          autoRotate={false}
          autoRotateSpeed={0.5}
        />
      ) : (
        <CameraController />
      )}
    </>
  )
} 