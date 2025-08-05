"use client"

import React, { Suspense, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { EnvironmentScene } from './3D/EnvironmentScene'
import { FloatingDataPanel } from './FloatingDataPanel'
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
          />
        </Suspense>
      </Canvas>
      
      {/* Camera Mode Toggle */}
      <div className="absolute top-4 right-4 z-10">
        <button
          onClick={() => setCameraMode(cameraMode === 'orbit' ? 'follow' : 'orbit')}
          className="bg-white/20 backdrop-blur-md rounded-lg px-4 py-2 text-white font-medium hover:bg-white/30 transition-colors"
        >
          {cameraMode === 'orbit' ? 'Follow Mode' : 'Orbit Mode'}
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
    </div>
  )
} 