"use client"

import React from 'react'
import { AlertTriangle } from 'lucide-react'

export const DevelopmentIndicator: React.FC = () => {
  if (process.env.NODE_ENV !== 'development') {
    return null
  }

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 pointer-events-none">
      <div className="bg-red-500/20 backdrop-blur-md rounded-lg px-4 py-2 border border-red-500/30 shadow-lg pointer-events-auto">
        <div className="flex items-center space-x-2">
          <AlertTriangle className="h-4 w-4 text-red-500" />
          <span className="text-sm font-bold text-red-500">IN DEVELOPMENT</span>
        </div>
      </div>
    </div>
  )
} 