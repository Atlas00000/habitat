"use client"

import React from 'react'
import { ArcticRegionViewer } from '../../../src/components/ArcticRegionViewer'
import { deerData } from '../../../src/data/deer-data'

export default function DeerPage() {
  return (
    <main className="w-full h-screen bg-gradient-to-br from-green-50 to-blue-100">
      <div className="w-full h-full relative">
        <ArcticRegionViewer category="forest" />
        
        {/* Deer-specific overlay */}
        <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-md rounded-lg p-4 max-w-sm">
          <h2 className="text-xl font-bold text-gray-800 mb-2">🦌 {deerData.name} Habitat</h2>
          <p className="text-sm text-gray-600 mb-3">
            Explore the forest at night with our majestic {deerData.name.toLowerCase()}
          </p>
          <div className="text-xs text-gray-500 space-y-1">
            <div>• Night atmosphere with lakeside lighting</div>
            <div>• Enhanced forest landscape</div>
            <div>• Realistic {deerData.name.toLowerCase()} with antlers</div>
            <div>• Scientific name: {deerData.scientificName}</div>
          </div>
        </div>
      </div>
    </main>
  )
} 