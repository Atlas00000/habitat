"use client"

import React, { Suspense, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { EnvironmentScene } from './3D/EnvironmentScene'
import { FloatingDataPanel } from './FloatingDataPanel'
import { CameraHelpOverlay } from './3D/CameraHelpOverlay'
import { CloudflareAsset } from '../config/cloudflare'

export interface ArcticRegionViewerProps {
  className?: string
  category?: string
}

export const ArcticRegionViewer: React.FC<ArcticRegionViewerProps> = ({ 
  className = '', 
  category = 'arctic' 
}) => {
  const [selectedAsset, setSelectedAsset] = useState<CloudflareAsset | null>(null)
  const [cameraMode, setCameraMode] = useState<'orbit' | 'follow'>('orbit')
  const [showCameraInfo, setShowCameraInfo] = useState(false)
  const [showCameraHelp, setShowCameraHelp] = useState(false)

  const handleAssetSelect = (asset: CloudflareAsset) => {
    setSelectedAsset(asset)
  }

  return (
    <div className={`relative w-full h-full ${className}`}>
      {/* 3D Canvas */}
      <Canvas
        camera={{ position: [0, 5, 10], fov: 60 }}
        className="w-full h-full"
        shadows
        gl={{ antialias: true, alpha: true }}
        style={{ width: '100vw', height: '100vh' }}
      >
        <Suspense fallback={null}>
          <EnvironmentScene
            category={category}
            selectedAssetId={selectedAsset?.id}
            onAssetSelect={handleAssetSelect}
            cameraMode={cameraMode}
            showCameraInfo={showCameraInfo}
          />
        </Suspense>
      </Canvas>
      
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
      
      {/* UI Overlay */}
      {selectedAsset && (
        <div className="absolute inset-0 pointer-events-none">
          <FloatingDataPanel 
            animal={{
              name: selectedAsset.name,
              scientificName: selectedAsset.metadata?.description || 'Unknown',
              habitat: category,
              diet: selectedAsset.metadata?.tags || [],
              conservationStatus: 'Vulnerable' as const,
              funFacts: [selectedAsset.metadata?.description || 'No description available'],
              stats: {
                weight: 'Unknown',
                height: 'Unknown',
                lifespan: 'Unknown',
                speed: 'Unknown'
              }
            }} 
          />
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