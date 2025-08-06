export const CLOUDFLARE_CONFIG = {
  API_KEY: 'f206d12764dd0ac757f72e20dbc7d6cad72b8',
  BASE_URL: 'https://api.cloudflare.com/client/v4',
  ZONE_ID: '', // Will be set when you provide the zone ID
}

export interface CloudflareAsset {
  id: string
  name: string
  url: string
  type: 'model' | 'texture' | 'audio' | 'image' | 'hdr'
  category: 'arctic' | 'forest' | 'mountain' | 'safari' | string // Allow custom categories
  metadata?: {
    description?: string
    tags?: string[]
    size?: number
  }
}

export interface AssetCollection {
  id: string
  name: string
  description: string
  assets: CloudflareAsset[]
}

// Asset collections for different environments
export const ASSET_COLLECTIONS: Record<string, AssetCollection> = {
  arctic: {
    id: 'arctic',
    name: 'Arctic Environment',
    description: 'Assets for the arctic region including polar bears and ice',
    assets: [
      // Placeholder for arctic assets
      // {
      //   id: 'polar-bear-model',
      //   name: 'Polar Bear Model',
      //   url: 'https://your-cloudflare-url.com/polar-bear.glb',
      //   type: 'model',
      //   category: 'arctic',
      //   metadata: {
      //     description: 'High-quality polar bear 3D model',
      //     tags: ['animal', 'bear', 'arctic'],
      //     size: 2048576
      //   }
      // }
    ]
  },
  forest: {
    id: 'forest',
    name: 'Forest Environment',
    description: 'Assets for the forest region including trees and wildlife',
    assets: [

      {
        id: 'rainforest-trail-hdr',
        name: 'Rainforest Trail HDR',
        url: 'https://pub-fdb254222c8f4a71bed4b3dd7a1d8ba1.r2.dev/rainforest_trail.hdr',
        type: 'hdr',
        category: 'forest',
        metadata: {
          description: 'High dynamic range environment map for rainforest atmosphere',
          tags: ['environment', 'hdr', 'rainforest', 'lighting'],
          size: 0
        }
      },

      {
        id: 'deer-model',
        name: 'White-tailed Deer',
        url: 'https://pub-fdb254222c8f4a71bed4b3dd7a1d8ba1.r2.dev/deer.glb',
        type: 'model',
        category: 'forest',
        metadata: {
          description: 'Realistic deer 3D model with antlers',
          tags: ['animal', 'deer', 'forest', 'herbivore', 'mammal', 'white-tailed-deer'],
          size: 0
        }
      },
      {
        id: 'forest2-landscape',
        name: 'Forest Landscape',
        url: 'https://pub-fdb254222c8f4a71bed4b3dd7a1d8ba1.r2.dev/forest2.glb',
        type: 'model',
        category: 'forest',
        metadata: {
          description: 'Enhanced forest landscape environment',
          tags: ['environment', 'forest', 'landscape', 'vegetation'],
          size: 0
        }
      },
      {
        id: 'lakeside-night-hdr',
        name: 'Lakeside Night HDR',
        url: 'https://pub-fdb254222c8f4a71bed4b3dd7a1d8ba1.r2.dev/lakeside_night.hdr',
        type: 'hdr',
        category: 'forest',
        metadata: {
          description: 'Night atmosphere with lakeside environment',
          tags: ['environment', 'hdr', 'night', 'lakeside', 'lighting'],
          size: 0
        }
      },
      // Black Bear Assets
      {
        id: 'black-bear-model',
        name: 'American Black Bear',
        url: 'https://pub-fdb254222c8f4a71bed4b3dd7a1d8ba1.r2.dev/black_bear.glb',
        type: 'model',
        category: 'forest',
        metadata: {
          description: 'Realistic black bear 3D model with animations',
          tags: ['animal', 'bear', 'forest', 'omnivore', 'mammal', 'predator', 'black-bear'],
          size: 0
        }
      },
      {
        id: 'forest2-landscape-bear',
        name: 'Forest Landscape for Bear',
        url: 'https://pub-fdb254222c8f4a71bed4b3dd7a1d8ba1.r2.dev/forest2.glb',
        type: 'model',
        category: 'forest',
        metadata: {
          description: 'Enhanced forest landscape environment for black bear habitat',
          tags: ['environment', 'forest', 'landscape', 'vegetation', 'bear-habitat'],
          size: 0
        }
      },
      {
        id: 'lakeside-night-hdr-bear',
        name: 'Lakeside Night HDR for Bear',
        url: 'https://pub-fdb254222c8f4a71bed4b3dd7a1d8ba1.r2.dev/lakeside_night.hdr',
        type: 'hdr',
        category: 'forest',
        metadata: {
          description: 'Night atmosphere with lakeside environment for black bear',
          tags: ['environment', 'hdr', 'night', 'lakeside', 'lighting', 'bear-habitat'],
          size: 0
        }
      }
    ]
  },
  mountain: {
    id: 'mountain',
    name: 'Mountain Environment',
    description: 'Assets for the mountain region including peaks and climbers',
    assets: []
  },
  safari: {
    id: 'safari',
    name: 'Safari Environment',
    description: 'Assets for the safari region including African wildlife',
    assets: []
  }
}

export const getAssetsByCategory = (category: string): CloudflareAsset[] => {
  return ASSET_COLLECTIONS[category]?.assets || []
}

export const getAssetById = (id: string): CloudflareAsset | undefined => {
  for (const collection of Object.values(ASSET_COLLECTIONS)) {
    const asset = collection.assets.find(a => a.id === id)
    if (asset) return asset
  }
  return undefined
}

// Helper function to add new categories
export const addNewCategory = (categoryId: string, categoryData: AssetCollection) => {
  ASSET_COLLECTIONS[categoryId] = categoryData
}

// Helper function to get all available categories
export const getAvailableCategories = (): string[] => {
  return Object.keys(ASSET_COLLECTIONS)
}

// Helper function to check if category exists
export const categoryExists = (category: string): boolean => {
  return category in ASSET_COLLECTIONS
} 