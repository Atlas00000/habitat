"use client"

import React from 'react'
import { ArcticRegionViewer } from '../../src/components/ArcticRegionViewer'

export default function SafariPage() {
  return (
    <main className="w-full h-screen bg-gradient-to-br from-yellow-50 to-orange-100">
      <div className="w-full h-full">
        <ArcticRegionViewer category="safari" />
      </div>
    </main>
  )
} 