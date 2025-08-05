"use client"

import React, { useState } from 'react'
import { Play, Pause, RotateCcw, Zap } from 'lucide-react'

interface AnimationControlsProps {
  onPlay?: () => void
  onPause?: () => void
  onReset?: () => void
  onSpeedChange?: (speed: number) => void
  isPlaying?: boolean
  currentSpeed?: number
  availableAnimations?: string[]
  onAnimationSelect?: (animationName: string) => void
  selectedAnimation?: string
}

export const AnimationControls: React.FC<AnimationControlsProps> = ({
  onPlay,
  onPause,
  onReset,
  onSpeedChange,
  isPlaying = false,
  currentSpeed = 1,
  availableAnimations = [],
  onAnimationSelect,
  selectedAnimation
}) => {
  const [speed, setSpeed] = useState(currentSpeed)

  const handleSpeedChange = (newSpeed: number) => {
    setSpeed(newSpeed)
    onSpeedChange?.(newSpeed)
  }

  return (
    <div className="bg-white/20 backdrop-blur-md rounded-lg p-4 border border-white/30 shadow-lg">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-white">Animation Controls</h3>
        <div className="flex items-center space-x-2">
          <button
            onClick={isPlaying ? onPause : onPlay}
            className="p-2 bg-white/20 rounded-md hover:bg-white/30 transition-colors"
            title={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? (
              <Pause className="h-4 w-4 text-white" />
            ) : (
              <Play className="h-4 w-4 text-white" />
            )}
          </button>
          <button
            onClick={onReset}
            className="p-2 bg-white/20 rounded-md hover:bg-white/30 transition-colors"
            title="Reset"
          >
            <RotateCcw className="h-4 w-4 text-white" />
          </button>
        </div>
      </div>

      {/* Animation Selection */}
      {availableAnimations.length > 0 && (
        <div className="mb-3">
          <label className="block text-xs text-white mb-1">Animation:</label>
          <select
            value={selectedAnimation || ''}
            onChange={(e) => onAnimationSelect?.(e.target.value)}
            className="w-full bg-white/10 text-white text-xs rounded px-2 py-1 border border-white/20"
          >
            {availableAnimations.map((animation) => (
              <option key={animation} value={animation}>
                {animation}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Speed Control */}
      <div className="mb-3">
        <label className="block text-xs text-white mb-1">Speed:</label>
        <div className="flex items-center space-x-2">
          <input
            type="range"
            min="0.1"
            max="3"
            step="0.1"
            value={speed}
            onChange={(e) => handleSpeedChange(parseFloat(e.target.value))}
            className="flex-1"
          />
          <span className="text-xs text-white min-w-[2rem]">{speed}x</span>
        </div>
      </div>

      {/* Status */}
      <div className="flex items-center space-x-2 text-xs text-white">
        <div className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-green-400' : 'bg-gray-400'}`}></div>
        <span>{isPlaying ? 'Playing' : 'Paused'}</span>
        {availableAnimations.length > 0 && (
          <>
            <span>•</span>
            <span>{availableAnimations.length} animations</span>
          </>
        )}
      </div>
    </div>
  )
} 