"use client"

import React, { Suspense, useState, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Environment, Sky, useTexture } from '@react-three/drei'
import { CloudflareModel } from './CloudflareModel'
import { CameraBounds } from './CameraBounds'
import { CameraPositionIndicator } from './CameraPositionIndicator'
import { LoadingSpinner } from './LoadingSpinner'
import { getAssetsByCategory, CloudflareAsset } from '../../config/cloudflare'

interface EnvironmentSceneProps {
  category: string
  selectedAssetId?: string
  onAssetSelect?: (asset: CloudflareAsset) => void
  cameraMode?: 'orbit' | 'follow'
  onSceneReady?: () => void
  showCameraInfo?: boolean
}

// Camera Controller Component with enhanced floor protection
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
    
    // Enhanced bounds to prevent going under floor and out of view
    camera.position.x = Math.max(-12, Math.min(12, camera.position.x))
    camera.position.z = Math.max(4, Math.min(12, camera.position.z))
    camera.position.y = Math.max(2, Math.min(10, camera.position.y)) // Stronger floor protection
    
    // Ensure camera always looks at the scene center
    camera.lookAt(0, 1, 0)
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
  onSceneReady,
  showCameraInfo = false
}) => {
  const [assets, setAssets] = useState<CloudflareAsset[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [loadingProgress, setLoadingProgress] = useState(0)
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
           setLoadingProgress(0.2)
           const categoryAssets = getAssetsByCategory(category)
           setLoadingProgress(0.6)
           console.log('Category assets loaded:', categoryAssets.map(a => ({ id: a.id, name: a.name, type: a.type })))
           setAssets(categoryAssets)

           // Find HDR asset for environment
           const hdr = categoryAssets.find(asset => asset.type === 'hdr')
           setHdrAsset(hdr || null)
           setLoadingProgress(0.9)

           setIsLoading(false)
           setLoadingProgress(1)
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
      {/* Loading State */}
      {isLoading && (
        <group position={[0, 2, 0]}>
          <LoadingSpinner 
            size={1.5} 
            color="#3B82F6" 
            message={`Loading ${category} environment...`} 
          />
        </group>
      )}
      
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
                     onAnimationsLoaded={(animations) => {
                       console.log(`Animations loaded for ${asset.name}:`, animations)
                     }}
                   />
                 )
               })}
      
      {/* Camera Controls */}
      {cameraMode === 'orbit' ? (
        <OrbitControls 
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          maxPolarAngle={Math.PI / 2.2} // Prevent going below ground
          minPolarAngle={0.1} // Prevent going too high
          minDistance={4}
          maxDistance={12}
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
      
      {/* Camera Bounds Protection */}
      <CameraBounds 
        minY={1.5}
        maxY={15}
        minDistance={3}
        maxDistance={15}
        target={[0, 1, 0]}
      />
      
      {/* Camera Position Indicator */}
      <CameraPositionIndicator show={showCameraInfo} />
    </>
  )
} 