import { useGLTF } from '@react-three/drei'
import { CloudflareAsset, getAssetsByCategory } from '../config/cloudflare'

// Simple cache for preloaded models
class ModelCache {
  private static instance: ModelCache
  private preloadedUrls: Set<string> = new Set()
  private loadingPromises: Map<string, Promise<void>> = new Map()

  static getInstance(): ModelCache {
    if (!ModelCache.instance) {
      ModelCache.instance = new ModelCache()
    }
    return ModelCache.instance
  }

  // Preload a single model
  preloadModel(asset: CloudflareAsset): Promise<void> {
    if (asset.type !== 'model') {
      return Promise.resolve()
    }

    const proxyUrl = `/api/proxy?url=${encodeURIComponent(asset.url)}`
    
    // If already preloaded, return immediately
    if (this.preloadedUrls.has(proxyUrl)) {
      return Promise.resolve()
    }

    // If currently loading, return the existing promise
    if (this.loadingPromises.has(proxyUrl)) {
      return this.loadingPromises.get(proxyUrl)!
    }

    // Start preloading
    const preloadPromise = this.loadModel(proxyUrl)
    this.loadingPromises.set(proxyUrl, preloadPromise)

    return preloadPromise.then(() => {
      this.preloadedUrls.add(proxyUrl)
      this.loadingPromises.delete(proxyUrl)
    })
  }

  // Preload all models for a category
  async preloadCategory(category: string): Promise<void> {
    const assets = getAssetsByCategory(category)
    const modelAssets = assets.filter(asset => asset.type === 'model')
    
    console.log(`Preloading ${modelAssets.length} models for category: ${category}`)
    
    const preloadPromises = modelAssets.map(asset => 
      this.preloadModel(asset).catch(error => {
        console.warn(`Failed to preload model ${asset.name}:`, error)
      })
    )

    await Promise.all(preloadPromises)
    console.log(`Finished preloading models for category: ${category}`)
  }

  // Check if a model is preloaded
  isPreloaded(asset: CloudflareAsset): boolean {
    if (asset.type !== 'model') return true
    const proxyUrl = `/api/proxy?url=${encodeURIComponent(asset.url)}`
    return this.preloadedUrls.has(proxyUrl)
  }

  // Check if a model is currently loading
  isLoading(asset: CloudflareAsset): boolean {
    if (asset.type !== 'model') return false
    const proxyUrl = `/api/proxy?url=${encodeURIComponent(asset.url)}`
    return this.loadingPromises.has(proxyUrl)
  }

  // Clear the cache
  clearCache(): void {
    this.preloadedUrls.clear()
    this.loadingPromises.clear()
    console.log('Model cache cleared')
  }

  // Get cache stats
  getCacheStats(): { preloaded: number; loading: number } {
    return {
      preloaded: this.preloadedUrls.size,
      loading: this.loadingPromises.size
    }
  }

  private async loadModel(proxyUrl: string): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        // Use React Three Fiber's preload mechanism
        useGLTF.preload(proxyUrl)
        resolve()
      } catch (error) {
        reject(error)
      }
    })
  }
}

export const modelCache = ModelCache.getInstance()

// Hook for easy preloading in components
export const useModelPreloader = () => {
  const preloadModel = (asset: CloudflareAsset) => {
    return modelCache.preloadModel(asset)
  }

  const preloadCategory = (category: string) => {
    return modelCache.preloadCategory(category)
  }

  const isPreloaded = (asset: CloudflareAsset) => {
    return modelCache.isPreloaded(asset)
  }

  const isLoading = (asset: CloudflareAsset) => {
    return modelCache.isLoading(asset)
  }

  return {
    preloadModel,
    preloadCategory,
    isPreloaded,
    isLoading,
    getCacheStats: modelCache.getCacheStats.bind(modelCache),
    clearCache: modelCache.clearCache.bind(modelCache)
  }
} 