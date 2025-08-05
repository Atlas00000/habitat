"use client"

import React from 'react'
import { useModelPreloader } from '../../services/modelCache'
import { CloudflareAsset } from '../../config/cloudflare'

interface CacheStatusIndicatorProps {
  asset: CloudflareAsset
  show?: boolean
}

export const CacheStatusIndicator: React.FC<CacheStatusIndicatorProps> = ({ 
  asset, 
  show = false 
}) => {
  const { isPreloaded, isLoading, getCacheStats } = useModelPreloader()

  if (!show) return null

  const isCached = isPreloaded(asset)
  const isCurrentlyLoading = isLoading(asset)
  const stats = getCacheStats()

  return (
    <div className="absolute top-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
      <div className="flex items-center space-x-2">
        <div className={`w-2 h-2 rounded-full ${isCached ? 'bg-green-400' : isCurrentlyLoading ? 'bg-yellow-400' : 'bg-red-400'}`} />
        <span>
          {isCached ? 'Cached' : isCurrentlyLoading ? 'Loading...' : 'Not cached'}
        </span>
      </div>
      <div className="text-xs opacity-75">
        Cache: {stats.preloaded} loaded, {stats.loading} loading
      </div>
    </div>
  )
} 