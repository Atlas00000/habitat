"use client"

import React, { useState, useEffect } from 'react'
import { ArcticRegionViewer } from '../../src/components/ArcticRegionViewer'
import { getAssetsByCategory } from '../../src/config/cloudflare'

export default function DebugForestPage() {
  const [assets, setAssets] = useState<any[]>([])
  const [loadingStatus, setLoadingStatus] = useState<string>('Loading...')

  useEffect(() => {
    const forestAssets = getAssetsByCategory('forest')
    setAssets(forestAssets)
    setLoadingStatus(`Found ${forestAssets.length} forest assets`)
  }, [])

  return (
    <main className="w-full h-screen bg-gradient-to-br from-green-50 to-green-100">
      <div className="w-full h-full relative">
        <ArcticRegionViewer category="forest" />
        
        {/* Debug Panel */}
        <div className="absolute top-4 left-4 z-10 bg-white/95 backdrop-blur-md rounded-lg p-4 max-w-md">
          <h3 className="text-lg font-bold text-gray-800 mb-2">Forest Debug Info</h3>
          <div className="text-sm space-y-2">
            <div className="text-green-600 font-medium">{loadingStatus}</div>
            {assets.map((asset) => (
              <div key={asset.id} className="border-l-2 border-green-500 pl-2">
                <div className="font-medium text-gray-700">{asset.name}</div>
                <div className="text-gray-500 text-xs">Type: {asset.type}</div>
                <div className="text-gray-400 text-xs truncate">URL: {asset.url}</div>
                <div className="text-gray-400 text-xs">
                  Tags: {asset.metadata?.tags?.join(', ') || 'None'}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
} 