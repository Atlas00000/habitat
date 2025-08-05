"use client"

import React from 'react'
import { ArcticRegionViewer } from '../../src/components/ArcticRegionViewer'

export default function ForestPage() {
  return (
    <main className="w-full h-screen bg-gradient-to-br from-green-50 to-green-100">
      <div className="w-full h-full">
        <ArcticRegionViewer category="forest" />
      </div>
    </main>
  )
} 