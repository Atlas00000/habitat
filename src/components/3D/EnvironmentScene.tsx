"use client"

import React, { Suspense, useState, useEffect, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Environment, Sky, useTexture } from '@react-three/drei'
import { CloudflareModel } from './CloudflareModel'
import { CameraBounds } from './CameraBounds'
import { CameraPositionIndicator } from './CameraPositionIndicator'
import { LoadingSpinner } from './LoadingSpinner'
import { getAssetsByCategory, CloudflareAsset } from '../../config/cloudflare'
import { useModelPreloader } from '../../services/modelCache'

interface EnvironmentSceneProps {
  category: string
  selectedAssetId?: string
  onAssetSelect?: (asset: CloudflareAsset) => void
  cameraMode?: 'orbit' | 'follow'
  onSceneReady?: () => void
  showCameraInfo?: boolean
  enableShadows?: boolean
  selectedAnimal?: any
}

// Enhanced Camera Controller with animal-focused positioning
function CameraController({ selectedAnimal }: { selectedAnimal?: any }) {
  const { camera } = useThree()
  const targetPosition = useRef<[number, number, number]>([0, 2, 6])
  const currentPosition = useRef<[number, number, number]>([0, 2, 6])
  
  useEffect(() => {
    // Position camera based on selected animal
    if (selectedAnimal) {
      const animalName = selectedAnimal.name.toLowerCase()
      
      if (animalName.includes('deer')) {
        targetPosition.current = [0, 1.5, 4] // Closer to deer
        currentPosition.current = [0, 1.5, 4]
      } else if (animalName.includes('bear')) {
        targetPosition.current = [0, 2, 5] // Slightly further for bear
        currentPosition.current = [0, 2, 5]
      } else if (animalName.includes('jaguar')) {
        targetPosition.current = [0, 1.8, 4.5] // Medium distance for jaguar
        currentPosition.current = [0, 1.8, 4.5]
      } else {
        // Default position for other animals
        targetPosition.current = [0, 2, 6]
        currentPosition.current = [0, 2, 6]
      }
      
      // Set initial camera position
      camera.position.set(...targetPosition.current)
      camera.lookAt(0, 1, 0)
    }
  }, [camera, selectedAnimal])
  
  useFrame(() => {
    // Smooth camera movement towards target
    const lerpFactor = 0.02
    currentPosition.current = currentPosition.current.map((pos, index) => 
      pos + (targetPosition.current[index] - pos) * lerpFactor
    ) as [number, number, number]
    
    camera.position.set(...currentPosition.current)
    
    // Enhanced bounds to prevent going out of scope
    camera.position.x = Math.max(-8, Math.min(8, camera.position.x))
    camera.position.z = Math.max(3, Math.min(8, camera.position.z))
    camera.position.y = Math.max(1.5, Math.min(6, camera.position.y))
    
    // Always look at the animal/scene center
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
  showCameraInfo = false,
  enableShadows = true,
  selectedAnimal
}) => {
  const [assets, setAssets] = useState<CloudflareAsset[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [hdrAsset, setHdrAsset] = useState<CloudflareAsset | null>(null)
  const { camera } = useThree()
  const { preloadCategory, getCacheStats } = useModelPreloader()
  const renderedAssets = useRef<Set<string>>(new Set())
  const loggedPositions = useRef<Set<string>>(new Set())
  const loggedAnimations = useRef<Set<string>>(new Set())

  // Initialize camera position based on selected animal
  useEffect(() => {
    if (cameraMode === 'orbit') {
      if (selectedAnimal) {
        const animalName = selectedAnimal.name.toLowerCase()
        
        if (animalName.includes('deer')) {
          camera.position.set(0, 1.5, 4)
        } else if (animalName.includes('bear')) {
          camera.position.set(0, 2, 5)
        } else if (animalName.includes('jaguar')) {
          camera.position.set(0, 1.8, 4.5)
        } else {
          camera.position.set(0, 2, 6)
        }
      } else {
        camera.position.set(0, 2, 6)
      }
      camera.lookAt(0, 1, 0)
    }
  }, [camera, cameraMode, selectedAnimal])

           useEffect(() => {
           setLoadingProgress(0.2)
           const categoryAssets = getAssetsByCategory(category)
           setLoadingProgress(0.6)
           console.log('Category assets loaded:', categoryAssets.map(a => ({ id: a.id, name: a.name, type: a.type })))
           
           // Filter assets based on selected animal
           let filteredAssets = categoryAssets
           if (selectedAnimal) {
             const animalName = selectedAnimal.name.toLowerCase()
             
             // Filter to only include assets that match the selected animal
             filteredAssets = categoryAssets.filter(asset => {
               // Always include HDR and landscape assets
               if (asset.type === 'hdr' || asset.metadata?.tags?.includes('landscape')) {
                 return true
               }
               
               // For model assets, only include the specific animal
               if (asset.type === 'model') {
                 const assetName = asset.name.toLowerCase()
                 const assetTags = asset.metadata?.tags || []
                 
                 // Include if the asset name or tags match the animal
                 return assetName.includes(animalName) || 
                        assetTags.some(tag => animalName.includes(tag) || tag.includes(animalName))
               }
               
               return false
             })
             
             console.log('Filtered assets for', selectedAnimal.name, ':', filteredAssets.map(a => ({ id: a.id, name: a.name, type: a.type })))
           }
           
           // Preload models for this category
           preloadCategory(category)
           setLoadingProgress(0.9)
           
           // Set assets and HDR
           const modelAssets = filteredAssets.filter(asset => asset.type === 'model')
           const hdrAsset = filteredAssets.find(asset => asset.type === 'hdr')
           
           setAssets(modelAssets)
           setHdrAsset(hdrAsset || null)
           setLoadingProgress(1.0)
           setIsLoading(false)
           
           // Log cache stats
           const stats = getCacheStats()
           console.log('Model cache stats:', stats)
           
           // Notify scene is ready
           if (onSceneReady) {
             onSceneReady()
           }
           }, [category, selectedAnimal, preloadCategory, getCacheStats, onSceneReady])

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
        castShadow={enableShadows}
        shadow-mapSize-width={enableShadows ? 512 : 256}
        shadow-mapSize-height={enableShadows ? 512 : 256}
        shadow-camera-far={50}
        shadow-camera-left={-25}
        shadow-camera-right={25}
        shadow-camera-top={25}
        shadow-camera-bottom={-25}
      />
      <pointLight position={[-10, 10, -10]} intensity={0.5} />
      
      {/* Environment */}
      {hdrAsset ? (
        <HDREnvironment hdrAsset={hdrAsset} />
      ) : (
        <Sky sunPosition={[0, 1, 0]} />
      )}
      
      {/* Ground Plane - Customize based on category */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow={enableShadows}>
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial color={colors.ground} />
      </mesh>
      
      {/* Terrain Layer - Customize based on category */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.4, 0]} receiveShadow={enableShadows}>
        <planeGeometry args={[40, 40]} />
        <meshStandardMaterial color={colors.terrain} />
      </mesh>
      
                   {/* Environment Assets */}
             {assets
               .filter(asset => asset.type === 'model') // Only render model assets
               .map((asset) => {
                 // Debug: Log asset being rendered (only once per asset)
                 if (!renderedAssets.current.has(asset.id)) {
                   console.log('Rendering asset:', asset.id, asset.name, asset.type)
                   renderedAssets.current.add(asset.id)
                 }
                 
                 // Position animals and landscapes appropriately
                 let position: [number, number, number] = [0, 0, 0]
                 let scale: [number, number, number] = [1, 1, 1]
                 
                 if (asset.id === 'deer-model') {
                   position = [0, 0.5, 0] // Lower deer to ground level with slight elevation
                   scale = [1.5, 1.5, 1.5] // Make deer larger and more visible
                   if (!loggedPositions.current.has(asset.id)) {
                     console.log('Deer positioned at:', position)
                     loggedPositions.current.add(asset.id)
                   }
                 } else if (asset.id === 'black-bear-model') {
                   position = [0, 0.8, 0] // Position bear higher to avoid landscape overlap
                   scale = [1.2, 1.2, 1.2] // Appropriate scale for bear
                   if (!loggedPositions.current.has(asset.id)) {
                     console.log('Black Bear positioned at:', position)
                     loggedPositions.current.add(asset.id)
                   }
                 } else if (asset.id === 'jaguar-model') {
                   position = [0, 0.5, 0] // Position jaguar at ground level
                   scale = [4, 4, 4] // Moderate scale for jaguar
                   if (!loggedPositions.current.has(asset.id)) {
                     console.log('Jaguar positioned at:', position)
                     loggedPositions.current.add(asset.id)
                   }
                 } else if (asset.id === 'forest2-landscape' || asset.id === 'forest2-landscape-bear' || asset.id === 'forest2-landscape-jaguar') {
                   position = [0, 0, 0] // Keep landscape at ground level
                   scale = [1, 1, 1]
                   if (!loggedPositions.current.has(asset.id)) {
                     console.log('Landscape positioned at:', position)
                     loggedPositions.current.add(asset.id)
                   }
                 }
                 
                 return (
                   <CloudflareModel
                     key={`${asset.id}-${asset.url}`} // More unique key to prevent re-renders
                     asset={asset}
                     position={position}
                     scale={scale}
                     onClick={() => handleAssetClick(asset)}
                     onError={(error) => console.error(`Failed to load ${asset.name}:`, error)}
                     onAnimationsLoaded={(animations) => {
                       if (!loggedAnimations.current.has(asset.id)) {
                         console.log(`Animations loaded for ${asset.name}:`, animations)
                         loggedAnimations.current.add(asset.id)
                       }
                     }}
                     // Animation settings for animals
                     autoPlay={asset.id === 'deer-model' || asset.id === 'black-bear-model' || asset.id === 'jaguar-model'}
                     loop={asset.id === 'deer-model' || asset.id === 'black-bear-model' || asset.id === 'jaguar-model'}
                     animationSpeed={asset.id === 'deer-model' ? 0.8 : asset.id === 'black-bear-model' ? 0.4 : asset.id === 'jaguar-model' ? 0.6 : 1.0}
                   />
                 )
               })}
      
      {/* Camera Controls with enhanced zoom limits */}
      {cameraMode === 'orbit' ? (
        <OrbitControls 
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          maxPolarAngle={Math.PI / 2.1} // Prevent going below ground
          minPolarAngle={0.2} // Prevent going too high
          minDistance={2.5} // Closer minimum distance
          maxDistance={8} // Shorter maximum distance to prevent zooming out of scope
          target={[0, 1, 0]}
          // Enhanced damping for smoother movement
          enableDamping={true}
          dampingFactor={0.08}
          // Add auto-rotate for dynamic feel
          autoRotate={false}
          autoRotateSpeed={0.5}
          // Add zoom damping
          zoomSpeed={0.8}
          // Prevent camera from going too far
          onChange={(e) => {
            const controls = e?.target
            if (controls) {
              // Ensure camera stays within bounds
              const distance = controls.getDistance()
              if (distance < 2.5) {
                // Use dollyIn/dollyOut to adjust distance instead of setDistance
                controls.dollyIn(2.5 / distance)
              }
              if (distance > 8) {
                controls.dollyOut(distance / 8)
              }
            }
          }}
        />
      ) : (
        <CameraController selectedAnimal={selectedAnimal} />
      )}
      
      {/* Enhanced Camera Bounds Protection */}
      <CameraBounds 
        minY={1.2}
        maxY={8}
        minDistance={2.5}
        maxDistance={8}
        target={[0, 1, 0]}
      />
      
      {/* Camera Position Indicator */}
      <CameraPositionIndicator show={showCameraInfo} />
    </>
  )
} 