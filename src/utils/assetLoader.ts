import { getCDNAssetUrl, loadAssetWithRetry, CDN_ASSETS } from './cloudflare-cdn'

export interface AssetConfig {
  localPath: string
  cdnPath?: string
  fallbackType: 'primitive' | 'texture' | 'none'
}

// Enhanced asset mapping with arctic assets
export const ASSETS = {
  // Arctic assets
  arcticTerrain: {
    localPath: '/assets/arctic_terrain1.glb',
    cdnPath: 'https://cdn.jsdelivr.net/gh/your-repo/arctic-assets@main/arctic_terrain1.glb',
    fallbackType: 'primitive' as const
  },
  polarBear: {
    localPath: '/assets/polar_bear.glb',
    cdnPath: 'https://cdn.jsdelivr.net/gh/your-repo/arctic-assets@main/polar_bear.glb',
    fallbackType: 'primitive' as const
  },
  snowEnvironment: {
    localPath: '/assets/snowenvrion_1k.hdr',
    cdnPath: 'https://cdn.jsdelivr.net/gh/your-repo/arctic-assets@main/snowenvrion_1k.hdr',
    fallbackType: 'none' as const
  }
}

// Asset cache for faster subsequent loads
const assetCache = new Map<string, string>()

// Enhanced asset path resolver with Cloudflare CDN
export const getAssetPath = (assetKey: keyof typeof ASSETS): string => {
  // Check cache first
  if (assetCache.has(assetKey)) {
    return assetCache.get(assetKey)!
  }
  
  // Use Cloudflare CDN if available
  if (assetKey in CDN_ASSETS) {
    const url = getCDNAssetUrl(assetKey as keyof typeof CDN_ASSETS)
    assetCache.set(assetKey, url)
    return url
  }
  
  // Fallback to legacy logic
  const asset = ASSETS[assetKey]
  const url = asset.cdnPath || asset.localPath
  assetCache.set(assetKey, url)
  return url
}

// Enhanced asset loader with retry and health checks
export const loadAssetWithHealthCheck = async (
  assetKey: keyof typeof ASSETS,
  options?: {
    maxRetries?: number
    timeout?: number
    useCDN?: boolean
  }
): Promise<string> => {
  const { maxRetries = 2, timeout = 5000, useCDN = true } = options || {}
  
  // Use Cloudflare CDN if available and enabled
  if (useCDN && assetKey in CDN_ASSETS) {
    return loadAssetWithRetry(assetKey as keyof typeof CDN_ASSETS, maxRetries)
  }
  
  // Fallback to local assets
  const asset = ASSETS[assetKey]
  return asset.cdnPath || asset.localPath
}

// Preload critical assets for better performance
export const preloadCriticalAssets = async (): Promise<void> => {
  const criticalAssets: (keyof typeof ASSETS)[] = ['arcticTerrain', 'polarBear', 'snowEnvironment']
  
  try {
    await Promise.allSettled(
      criticalAssets.map(asset => loadAssetWithHealthCheck(asset))
    )
  } catch (error) {
    console.warn('Critical asset preload failed:', error)
  }
}

// Check asset health status
export const checkAssetHealth = async (): Promise<Record<string, boolean>> => {
  const health: Record<string, boolean> = {}
  
  for (const [key, asset] of Object.entries(ASSETS)) {
    try {
      const response = await fetch(asset.cdnPath || asset.localPath, { method: 'HEAD' })
      health[key] = response.ok
    } catch (error) {
      health[key] = false
    }
  }
  
  return health
}

// Get asset information
export const getAssetInfo = (assetKey: keyof typeof ASSETS) => {
  return ASSETS[assetKey]
} 