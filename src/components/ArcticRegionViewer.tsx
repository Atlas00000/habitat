"use client"

import React, { Suspense, useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { EnvironmentScene } from './3D/EnvironmentScene'
import { CameraHelpOverlay } from './3D/CameraHelpOverlay'
import { CacheStatusIndicator } from './3D/CacheStatusIndicator'
import { CloudflareAsset } from '../config/cloudflare'

export interface ArcticRegionViewerProps {
  className?: string
  category?: string
  selectedAnimal?: any
}

export const ArcticRegionViewer: React.FC<ArcticRegionViewerProps> = ({ 
  className = '', 
  category = 'arctic',
  selectedAnimal
}) => {
  const [selectedAsset, setSelectedAsset] = useState<CloudflareAsset | null>(null)
  const [cameraMode, setCameraMode] = useState<'orbit' | 'follow'>('orbit')
  const [showCameraInfo, setShowCameraInfo] = useState(false)
  const [showCameraHelp, setShowCameraHelp] = useState(false)
  const [isSceneLoading, setIsSceneLoading] = useState(true)
  const [enableShadows, setEnableShadows] = useState(true)

  const handleAssetSelect = (asset: CloudflareAsset) => {
    setSelectedAsset(asset)
  }

  // Disable shadows on mobile for better performance
  useEffect(() => {
    const isMobile = window.innerWidth < 768
    if (isMobile) {
      setEnableShadows(false)
    }
  }, [])

  return (
    <div className={`relative w-full h-full ${className}`}>
      {/* 3D Canvas */}
      <Canvas
        camera={{ position: [0, 5, 10], fov: 60 }}
        className="w-full h-full"
        shadows={enableShadows}
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: "high-performance",
          stencil: false,
          depth: true
        }}
        style={{ width: '100vw', height: '100vh' }}
      >
        <Suspense fallback={null}>
          <EnvironmentScene
            category={category}
            selectedAssetId={selectedAsset?.id}
            onAssetSelect={handleAssetSelect}
            cameraMode={cameraMode}
            showCameraInfo={showCameraInfo}
            onSceneReady={() => setIsSceneLoading(false)}
            enableShadows={enableShadows}
            selectedAnimal={selectedAnimal}
          />
        </Suspense>
      </Canvas>
      
      {/* Cache Status Indicator (development only) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="absolute top-4 left-4 z-20">
          <CacheStatusIndicator 
            asset={{
              id: 'deer-model',
              name: 'Deer',
              type: 'model',
              url: '',
              category: 'forest',
              metadata: {}
            }} 
            show={true} 
          />
        </div>
      )}
      
      {/* Camera Controls */}
      <div className="absolute top-4 right-4 z-10 flex space-x-2">
        <button
          onClick={() => setCameraMode(cameraMode === 'orbit' ? 'follow' : 'orbit')}
          className="bg-white/20 backdrop-blur-md rounded-lg px-4 py-2 text-white font-medium hover:bg-white/30 transition-colors"
        >
          {cameraMode === 'orbit' ? 'Follow Mode' : 'Orbit Mode'}
        </button>
        <button
          onClick={() => setShowCameraInfo(!showCameraInfo)}
          className="bg-white/20 backdrop-blur-md rounded-lg px-4 py-2 text-white font-medium hover:bg-white/30 transition-colors"
        >
          {showCameraInfo ? 'Hide Info' : 'Show Info'}
        </button>
        <button
          onClick={() => setShowCameraHelp(true)}
          className="bg-white/20 backdrop-blur-md rounded-lg px-4 py-2 text-white font-medium hover:bg-white/30 transition-colors"
          title="Camera help"
        >
          ?
        </button>
      </div>
      
      {/* UI Overlay - Removed duplicate FloatingDataPanel */}
      

      
      {/* Loading Overlay */}
      {isSceneLoading && (
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white/90 rounded-lg p-6 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
            <p className="text-gray-700">Loading {category} environment...</p>
          </div>
        </div>
      )}
      
      {/* Camera Help Overlay */}
      <CameraHelpOverlay 
        show={showCameraHelp} 
        onClose={() => setShowCameraHelp(false)} 
      />
    </div>
  )
} 