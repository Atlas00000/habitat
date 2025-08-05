"use client"

import React from 'react'
import { ArcticRegionViewer } from '../../src/components/ArcticRegionViewer'

export default function ArcticPage() {
  return (
    <main className="w-full h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="w-full h-full">
        <ArcticRegionViewer category="arctic" />
      </div>
    </main>
  )
} 