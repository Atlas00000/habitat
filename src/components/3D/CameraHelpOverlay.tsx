"use client"

import React, { useState } from 'react'
import { Info, X, MousePointer, Move, ZoomIn, RotateCcw } from 'lucide-react'

interface CameraHelpOverlayProps {
  show?: boolean
  onClose?: () => void
}

export const CameraHelpOverlay: React.FC<CameraHelpOverlayProps> = ({
  show = false,
  onClose
}) => {
  if (!show) return null

  return (
    <div className="absolute inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-white/95 backdrop-blur-md rounded-xl p-6 max-w-md mx-4 shadow-2xl border border-white/30">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-800 flex items-center">
            <Info className="h-5 w-5 mr-2" />
            Camera Controls
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
            title="Close camera help"
            aria-label="Close camera help"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="space-y-4 text-sm text-gray-600">
          <div className="flex items-center space-x-3">
            <MousePointer className="h-4 w-4 text-blue-500" />
            <span><strong>Left Click + Drag:</strong> Rotate camera around scene</span>
          </div>
          
          <div className="flex items-center space-x-3">
            <Move className="h-4 w-4 text-green-500" />
            <span><strong>Right Click + Drag:</strong> Pan camera</span>
          </div>
          
          <div className="flex items-center space-x-3">
            <ZoomIn className="h-4 w-4 text-purple-500" />
            <span><strong>Scroll Wheel:</strong> Zoom in/out</span>
          </div>
          
          <div className="flex items-center space-x-3">
            <RotateCcw className="h-4 w-4 text-orange-500" />
            <span><strong>Camera Mode:</strong> Switch between Orbit and Follow modes</span>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="text-xs text-gray-500">
            <strong>Tips:</strong>
            <ul className="mt-2 space-y-1">
              <li>• Camera is restricted to prevent going under the floor</li>
              <li>• Use the "Show Info" button to see camera position</li>
              <li>• The scene automatically keeps you in bounds</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
} 