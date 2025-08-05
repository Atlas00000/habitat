# 🦁 New Animal Enclosure Guide

This guide explains how to quickly add new animal enclosures with assets from provided links.

## 🚀 Quick Start: Adding a New Enclosure

### Step 1: Add Assets to Configuration

When you have asset links, add them to the configuration:

```typescript
// In src/config/cloudflare.ts, add to the appropriate category:

// Example: Adding lion assets to safari
safari: {
  id: 'safari',
  name: 'Safari Environment',
  description: 'Assets for the safari region including African wildlife',
  assets: [
    {
      id: 'lion-model',
      name: 'African Lion',
      url: 'https://your-provided-link.com/lion.glb',
      type: 'model',
      category: 'safari',
      metadata: {
        description: 'Realistic African lion 3D model',
        tags: ['animal', 'lion', 'safari', 'predator'],
        size: 0
      }
    },
    {
      id: 'savanna-hdr',
      name: 'Savanna HDR',
      url: 'https://your-provided-link.com/savanna.hdr',
      type: 'hdr',
      category: 'safari',
      metadata: {
        description: 'High dynamic range environment map for savanna',
        tags: ['environment', 'hdr', 'savanna', 'lighting'],
        size: 0
      }
    }
  ]
}
```

### Step 2: Create the Page (if needed)

If the page doesn't exist, create it:

```typescript
// app/safari/page.tsx (already exists)
"use client"

import React from 'react'
import { ArcticRegionViewer } from '../../src/components/ArcticRegionViewer'

export default function SafariPage() {
  return (
    <main className="w-full h-screen bg-gradient-to-br from-yellow-50 to-orange-100">
      <div className="w-full h-full">
        <ArcticRegionViewer category="safari" />
      </div>
    </main>
  )
}
```

### Step 3: Update Navigation (if needed)

Add to the navigation in `app/page.tsx`:

```typescript
const environments = [
  // ... existing environments
  {
    id: 'safari',
    name: 'Safari Region',
    description: 'Experience African wildlife in their natural habitat',
    gradient: 'from-yellow-50 to-orange-100',
    color: 'orange',
    path: '/safari'
  }
]
```

## 🛠️ Using the Asset Manager (Recommended)

For easier management, use the AssetManager:

```typescript
import { addCloudflareAsset } from '../src/utils/assetManager'

// Add multiple assets quickly
addCloudflareAsset({
  name: 'African Lion',
  description: 'Realistic African lion 3D model',
  tags: ['animal', 'lion', 'safari', 'predator'],
  category: 'safari',
  type: 'model',
  cloudflareUrl: 'https://your-provided-link.com/lion.glb'
})

addCloudflareAsset({
  name: 'Savanna Environment',
  description: 'Complete savanna environment',
  tags: ['environment', 'savanna', 'grassland'],
  category: 'safari',
  type: 'model',
  cloudflareUrl: 'https://your-provided-link.com/savanna.glb'
})
```

## 🎨 Creating Custom Categories

For completely new environments:

```typescript
import { createNewCategory, addCloudflareAsset } from '../src/utils/assetManager'

// 1. Create new category
createNewCategory('desert', 'Desert Environment', 'Hot desert landscapes with unique wildlife')

// 2. Add assets to the new category
addCloudflareAsset({
  name: 'Camel',
  description: 'Desert camel 3D model',
  tags: ['animal', 'camel', 'desert'],
  category: 'desert',
  type: 'model',
  cloudflareUrl: 'https://your-provided-link.com/camel.glb'
})

// 3. Create the page
// app/desert/page.tsx
export default function DesertPage() {
  return (
    <main className="w-full h-screen bg-gradient-to-br from-yellow-50 to-orange-100">
      <div className="w-full h-full">
        <ArcticRegionViewer category="desert" />
      </div>
    </main>
  )
}
```

## 📋 Asset Types Supported

- **model**: 3D models (GLB/GLTF files) - Animals, environments
- **hdr**: High Dynamic Range environment maps - Lighting and atmosphere
- **texture**: Texture files (PNG, JPG) - Surface details
- **audio**: Sound files (MP3, WAV) - Ambient sounds
- **image**: 2D images (PNG, JPG) - UI elements

## 🎯 Best Practices

### Asset Organization
```typescript
// Good asset structure
{
  id: 'safari-lion-model',
  name: 'African Lion',
  url: 'https://your-link.com/lion.glb',
  type: 'model',
  category: 'safari',
  metadata: {
    description: 'Realistic African lion with animations',
    tags: ['animal', 'lion', 'safari', 'predator', 'mammal'],
    size: 5242880 // 5MB
  }
}
```

### Tagging System
Use consistent tags for easy filtering:
- **animal**: All animal models
- **environment**: Environment/scene models
- **predator**: Carnivorous animals
- **herbivore**: Plant-eating animals
- **mammal**, **bird**, **reptile**: Animal classes
- **hdr**, **lighting**: Environment lighting

## 🔧 Environment-Specific Styling

The system automatically applies environment-specific colors:

```typescript
// Environment colors are handled in EnvironmentScene.tsx
const getEnvironmentColors = () => {
  switch (category) {
    case 'safari':
      return {
        ground: '#d2b48c',    // Sand color
        terrain: '#f4a460',    // Desert terrain
        sky: '#ffd700'         // Golden sky
      }
    // Add your custom environment colors here
  }
}
```

## 🚨 Troubleshooting

### Asset Not Loading?
1. Check the URL is accessible
2. Verify the proxy API: `/api/proxy?url=YOUR_ASSET_URL`
3. Check browser console for CORS errors
4. Ensure asset ID is unique

### Page Not Found?
1. Verify the page file exists in `app/[category]/page.tsx`
2. Check the navigation includes the new category
3. Ensure the category exists in `ASSET_COLLECTIONS`

### Performance Issues?
1. Keep model files under 10MB
2. Use compressed textures
3. Optimize models for web delivery
4. Consider LOD (Level of Detail)

## 📝 Example: Adding Elephant Enclosure

```typescript
// 1. Add elephant assets
addCloudflareAsset({
  name: 'African Elephant',
  description: 'Large African elephant with trunk animations',
  tags: ['animal', 'elephant', 'safari', 'herbivore', 'mammal'],
  category: 'safari',
  type: 'model',
  cloudflareUrl: 'https://your-link.com/elephant.glb'
})

addCloudflareAsset({
  name: 'Elephant Habitat',
  description: 'Elephant enclosure with water hole',
  tags: ['environment', 'habitat', 'safari', 'water'],
  category: 'safari',
  type: 'model',
  cloudflareUrl: 'https://your-link.com/elephant-habitat.glb'
})

// 2. The page already exists, so it will automatically work!
// Visit /safari to see the new elephant assets
```

## ✅ System Features

- **Automatic CORS handling** via proxy API
- **Modular component architecture** for easy extension
- **Environment-specific styling** and lighting
- **Asset management utilities** for quick additions
- **Error handling** and graceful fallbacks
- **Full-screen immersive experience**
- **Interactive 3D scenes** with camera controls

The system is fully prepared for adding new animal enclosures with assets from provided links! 🎉 