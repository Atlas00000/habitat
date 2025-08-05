import { CloudflareAsset, ASSET_COLLECTIONS } from '../config/cloudflare'

export interface AssetUploadData {
  name: string
  description?: string
  tags?: string[]
  category: 'arctic' | 'forest' | 'mountain' | 'safari' | string // Allow custom categories
  type: 'model' | 'texture' | 'audio' | 'image' | 'hdr'
  cloudflareUrl: string
}

export class AssetManager {
  /**
   * Add a new asset to the configuration
   * This function helps you add assets to the ASSET_COLLECTIONS
   */
  static addAsset(data: AssetUploadData): CloudflareAsset {
    const asset: CloudflareAsset = {
      id: `${data.category}-${data.name.toLowerCase().replace(/\s+/g, '-')}`,
      name: data.name,
      url: data.cloudflareUrl,
      type: data.type,
      category: data.category,
      metadata: {
        description: data.description,
        tags: data.tags || [],
        size: 0 // Will be updated when you provide the actual size
      }
    }

    // Add to the appropriate collection
    if (ASSET_COLLECTIONS[data.category]) {
      ASSET_COLLECTIONS[data.category].assets.push(asset)
    }

    return asset
  }

  /**
   * Get all assets for a specific category
   */
  static getAssetsByCategory(category: string): CloudflareAsset[] {
    return ASSET_COLLECTIONS[category]?.assets || []
  }

  /**
   * Get all model assets for a category
   */
  static getModelsByCategory(category: string): CloudflareAsset[] {
    return this.getAssetsByCategory(category).filter(asset => asset.type === 'model')
  }

  /**
   * Remove an asset by ID
   */
  static removeAsset(assetId: string): boolean {
    for (const collection of Object.values(ASSET_COLLECTIONS)) {
      const index = collection.assets.findIndex(asset => asset.id === assetId)
      if (index !== -1) {
        collection.assets.splice(index, 1)
        return true
      }
    }
    return false
  }

  /**
   * Update an existing asset
   */
  static updateAsset(assetId: string, updates: Partial<CloudflareAsset>): boolean {
    for (const collection of Object.values(ASSET_COLLECTIONS)) {
      const asset = collection.assets.find(asset => asset.id === assetId)
      if (asset) {
        Object.assign(asset, updates)
        return true
      }
    }
    return false
  }

  /**
   * Generate a unique asset ID
   */
  static generateAssetId(category: string, name: string): string {
    const baseId = `${category}-${name.toLowerCase().replace(/\s+/g, '-')}`
    let id = baseId
    let counter = 1

    while (this.assetExists(id)) {
      id = `${baseId}-${counter}`
      counter++
    }

    return id
  }

  /**
   * Check if an asset exists
   */
  static assetExists(assetId: string): boolean {
    for (const collection of Object.values(ASSET_COLLECTIONS)) {
      if (collection.assets.some(asset => asset.id === assetId)) {
        return true
      }
    }
    return false
  }

  /**
   * Get asset statistics
   */
  static getAssetStats() {
    const stats: Record<string, { total: number; models: number; textures: number; audio: number; images: number }> = {}
    
    for (const [category, collection] of Object.entries(ASSET_COLLECTIONS)) {
      const assets = collection.assets
      stats[category] = {
        total: assets.length,
        models: assets.filter(a => a.type === 'model').length,
        textures: assets.filter(a => a.type === 'texture').length,
        audio: assets.filter(a => a.type === 'audio').length,
        images: assets.filter(a => a.type === 'image').length
      }
    }

    return stats
  }
}

// Helper function to easily add assets
export const addCloudflareAsset = (data: AssetUploadData): CloudflareAsset => {
  return AssetManager.addAsset(data)
}

// Helper function to create new categories
export const createNewCategory = (categoryId: string, categoryName: string, description: string) => {
  const { addNewCategory } = require('../config/cloudflare')
  
  addNewCategory(categoryId, {
    id: categoryId,
    name: categoryName,
    description: description,
    assets: []
  })
  
  return categoryId
}

// Example usage:
// addCloudflareAsset({
//   name: 'Polar Bear',
//   description: 'High-quality polar bear 3D model',
//   tags: ['animal', 'bear', 'arctic'],
//   category: 'arctic',
//   type: 'model',
//   cloudflareUrl: 'https://your-cloudflare-url.com/polar-bear.glb'
// }) 