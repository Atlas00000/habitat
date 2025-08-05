import { CloudflareAsset, getAssetById, getAssetsByCategory } from '../config/cloudflare'

export interface AssetLoadOptions {
  onProgress?: (progress: number) => void
  onError?: (error: Error) => void
  onComplete?: (asset: any) => void
}

export class AssetLoader {
  private static instance: AssetLoader
  private loadedAssets: Map<string, any> = new Map()
  private loadingAssets: Map<string, Promise<any>> = new Map()

  static getInstance(): AssetLoader {
    if (!AssetLoader.instance) {
      AssetLoader.instance = new AssetLoader()
    }
    return AssetLoader.instance
  }

  async loadModel(assetId: string, options?: AssetLoadOptions): Promise<any> {
    const asset = getAssetById(assetId)
    if (!asset) {
      throw new Error(`Asset with id ${assetId} not found`)
    }

    // Check if already loaded
    if (this.loadedAssets.has(assetId)) {
      return this.loadedAssets.get(assetId)
    }

    // Check if currently loading
    if (this.loadingAssets.has(assetId)) {
      return this.loadingAssets.get(assetId)
    }

    // Start loading
    const loadPromise = this.loadAssetFromUrl(asset.url, options)
    this.loadingAssets.set(assetId, loadPromise)

    try {
      const result = await loadPromise
      this.loadedAssets.set(assetId, result)
      this.loadingAssets.delete(assetId)
      return result
    } catch (error) {
      this.loadingAssets.delete(assetId)
      throw error
    }
  }

  private async loadAssetFromUrl(url: string, options?: AssetLoadOptions): Promise<any> {
    return new Promise((resolve, reject) => {
      // For GLTF models, we'll use the useGLTF hook from drei
      // This is a placeholder for the actual loading logic
      const xhr = new XMLHttpRequest()
      xhr.open('GET', url, true)
      xhr.responseType = 'arraybuffer'

      xhr.onprogress = (event) => {
        if (event.lengthComputable && options?.onProgress) {
          const progress = event.loaded / event.total
          options.onProgress(progress)
        }
      }

      xhr.onload = () => {
        if (xhr.status === 200) {
          try {
            // Parse the loaded asset
            const arrayBuffer = xhr.response
            // This would be handled by Three.js GLTFLoader in practice
            resolve(arrayBuffer)
            options?.onComplete?.(arrayBuffer)
          } catch (error) {
            reject(error)
            options?.onError?.(error as Error)
          }
        } else {
          const error = new Error(`Failed to load asset: ${xhr.statusText}`)
          reject(error)
          options?.onError?.(error)
        }
      }

      xhr.onerror = () => {
        const error = new Error('Network error while loading asset')
        reject(error)
        options?.onError?.(error)
      }

      xhr.send()
    })
  }

  getLoadedAsset(assetId: string): any | undefined {
    return this.loadedAssets.get(assetId)
  }

  isAssetLoaded(assetId: string): boolean {
    return this.loadedAssets.has(assetId)
  }

  isAssetLoading(assetId: string): boolean {
    return this.loadingAssets.has(assetId)
  }

  clearCache(): void {
    this.loadedAssets.clear()
    this.loadingAssets.clear()
  }

  preloadAssets(category: string, options?: AssetLoadOptions): Promise<void[]> {
    const assets = getAssetsByCategory(category)
    const modelAssets = assets.filter(asset => asset.type === 'model')
    
    return Promise.all(
      modelAssets.map(asset => 
        this.loadModel(asset.id, options).catch(error => {
          console.warn(`Failed to preload asset ${asset.id}:`, error)
        })
      )
    )
  }
}

export const assetLoader = AssetLoader.getInstance() 