// Cloudflare CDN configuration for arctic assets
export const CDN_ASSETS = {
  arcticTerrain: 'https://cdn.jsdelivr.net/gh/your-repo/arctic-assets@main/arctic_terrain1.glb',
  polarBear: 'https://cdn.jsdelivr.net/gh/your-repo/arctic-assets@main/polar_bear.glb',
  snowEnvironment: 'https://cdn.jsdelivr.net/gh/your-repo/arctic-assets@main/snowenvrion_1k.hdr'
} as const

// Get CDN asset URL
export const getCDNAssetUrl = (assetKey: keyof typeof CDN_ASSETS): string => {
  return CDN_ASSETS[assetKey]
}

// Load asset with retry mechanism
export const loadAssetWithRetry = async (
  assetKey: keyof typeof CDN_ASSETS,
  maxRetries: number = 3
): Promise<string> => {
  const url = getCDNAssetUrl(assetKey)
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const response = await fetch(url, { method: 'HEAD' })
      if (response.ok) {
        return url
      }
    } catch (error) {
      console.warn(`Attempt ${attempt} failed for ${assetKey}:`, error)
    }
    
    if (attempt < maxRetries) {
      // Wait before retrying (exponential backoff)
      await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000))
    }
  }
  
  // Return URL anyway as fallback
  return url
}

// Preload assets from CDN
export const preloadAssets = async (): Promise<void> => {
  const assets = Object.keys(CDN_ASSETS) as (keyof typeof CDN_ASSETS)[]
  
  try {
    await Promise.allSettled(
      assets.map(asset => loadAssetWithRetry(asset))
    )
  } catch (error) {
    console.warn('Asset preload failed:', error)
  }
} 