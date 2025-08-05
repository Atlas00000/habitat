"use client"

import React, { useState } from 'react'
import { ArcticRegionViewer } from '../../src/components/ArcticRegionViewer'
import { getAssetsByCategory } from '../../src/config/cloudflare'

export default function TestForestPage() {
  const [selectedAsset, setSelectedAsset] = useState<string | null>(null)
  const forestAssets = getAssetsByCategory('forest')

  return (
    <main className="w-full h-screen bg-gradient-to-br from-green-50 to-green-100">
      <div className="w-full h-full relative">
        <ArcticRegionViewer category="forest" />
        
        {/* Asset Info Panel */}
        <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-md rounded-lg p-4 max-w-sm">
          <h3 className="text-lg font-bold text-gray-800 mb-2">Forest Assets</h3>
          <div className="space-y-2">
            {forestAssets.map((asset) => (
              <div key={asset.id} className="text-sm">
                <div className="font-medium text-gray-700">{asset.name}</div>
                <div className="text-gray-500 text-xs">{asset.type}</div>
                <div className="text-gray-400 text-xs truncate">{asset.url}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
} 