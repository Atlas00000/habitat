"use client"

import React from 'react'
import { ArcticRegionViewer } from '../../src/components/ArcticRegionViewer'

export default function MountainPage() {
  return (
    <main className="w-full h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="w-full h-full">
        <ArcticRegionViewer category="mountain" />
      </div>
    </main>
  )
} 