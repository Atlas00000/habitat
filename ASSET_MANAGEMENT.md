# Asset Management Guide

This guide explains how to add and manage 3D models and assets from Cloudflare in your Environment Explorer project.

## 🚀 Quick Start

### 1. Upload Assets to Cloudflare

1. **Upload your 3D models** (GLB/GLTF format) to Cloudflare Images
2. **Get the direct URL** for each asset
3. **Note the asset details** (name, description, category, etc.)

### 2. Add Assets to Configuration

Open `src/config/cloudflare.ts` and add your assets to the appropriate collection:

```typescript
// Example: Adding a polar bear model
arctic: {
  id: 'arctic',
  name: 'Arctic Environment',
  description: 'Assets for the arctic region including polar bears and ice',
  assets: [
    {
      id: 'polar-bear-model',
      name: 'Polar Bear',
      url: 'https://your-cloudflare-url.com/polar-bear.glb',
      type: 'model',
      category: 'arctic',
      metadata: {
        description: 'High-quality polar bear 3D model',
        tags: ['animal', 'bear', 'arctic'],
        size: 2048576 // File size in bytes
      }
    }
  ]
}
```

### 3. Using the Asset Manager Utility

For easier asset management, use the `AssetManager` utility:

```typescript
import { addCloudflareAsset } from '../src/utils/assetManager'

// Add a new asset
addCloudflareAsset({
  name: 'Polar Bear',
  description: 'High-quality polar bear 3D model',
  tags: ['animal', 'bear', 'arctic'],
  category: 'arctic',
  type: 'model',
  cloudflareUrl: 'https://your-cloudflare-url.com/polar-bear.glb'
})
```

## 📁 Project Structure

```
src/
├── config/
│   └── cloudflare.ts          # Asset configuration
├── services/
│   └── assetLoader.ts         # Asset loading service
├── components/
│   ├── 3D/
│   │   ├── CloudflareModel.tsx    # 3D model component
│   │   └── EnvironmentScene.tsx   # Environment scene
│   └── ArcticRegionViewer.tsx     # Main viewer component
└── utils/
    └── assetManager.ts        # Asset management utilities
```

## 🌍 Environment Categories

- **Arctic** (`arctic`): Polar bears, ice, snow environments
- **Forest** (`forest`): Trees, forest wildlife, green environments  
- **Mountain** (`mountain`): Peaks, climbers, rocky environments
- **Safari** (`safari`): African wildlife, savanna environments

## 📋 Asset Types

- **model**: 3D models (GLB/GLTF files)
- **texture**: Texture files (PNG, JPG)
- **audio**: Sound files (MP3, WAV)
- **image**: 2D images (PNG, JPG)
- **hdr**: High Dynamic Range environment maps (HDR files)

## 🔧 Adding Assets Step by Step

### Step 1: Upload to Cloudflare
1. Go to your Cloudflare dashboard
2. Navigate to Images
3. Upload your 3D model file
4. Copy the direct URL

### Step 2: Configure the Asset
1. Open `src/config/cloudflare.ts`
2. Find the appropriate category (arctic, forest, mountain, safari)
3. Add your asset to the `assets` array

### Step 3: Test the Asset
1. Start the development server: `pnpm start`
2. Navigate to the appropriate environment page (e.g., `/arctic`)
3. Your asset should appear in the 3D scene

## 🎯 Best Practices

### Asset Naming
- Use descriptive names: `polar-bear-model`, `oak-tree-texture`
- Include category in ID: `arctic-polar-bear`, `forest-oak-tree`

### File Formats
- **3D Models**: Use GLB format for best compatibility
- **Textures**: Use PNG for transparency, JPG for photos
- **Audio**: Use MP3 for smaller files, WAV for quality

### Performance
- Keep model file sizes under 10MB when possible
- Use compressed textures
- Optimize models for web delivery

## 🛠️ Cloudflare Configuration

Your Cloudflare API key is configured in `src/config/cloudflare.ts`:

```typescript
export const CLOUDFLARE_CONFIG = {
  API_KEY: 'f206d12764dd0ac757f72e20dbc7d6cad72b8',
  BASE_URL: 'https://api.cloudflare.com/client/v4',
  ZONE_ID: '', // Add your zone ID here
}
```

## 📊 Asset Statistics

Use the AssetManager to get statistics:

```typescript
import { AssetManager } from '../src/utils/assetManager'

const stats = AssetManager.getAssetStats()
console.log(stats)
// Output: { arctic: { total: 5, models: 3, textures: 2, ... } }
```

## 🔄 Updating Assets

### Update an existing asset:
```typescript
AssetManager.updateAsset('polar-bear-model', {
  url: 'https://new-cloudflare-url.com/polar-bear-v2.glb',
  metadata: { description: 'Updated polar bear model' }
})
```

### Remove an asset:
```typescript
AssetManager.removeAsset('polar-bear-model')
```

## 🚨 Troubleshooting

### Asset not loading?
1. Check the URL is accessible
2. Verify the file format is supported
3. Check browser console for errors
4. Ensure the asset ID is unique

### CORS Issues?
The application includes a built-in proxy API (`/api/proxy`) that automatically handles CORS issues when loading external assets. All Cloudflare assets are routed through this proxy to ensure compatibility.

### Network Errors?
1. Check if the asset URL is publicly accessible
2. Verify the proxy API is working: `/api/proxy?url=YOUR_ASSET_URL`
3. Check browser network tab for failed requests

### Performance issues?
1. Reduce model complexity
2. Compress textures
3. Use lower polygon models
4. Implement LOD (Level of Detail)

### Cloudflare API errors?
1. Verify your API key is correct
2. Check your zone ID
3. Ensure proper permissions
4. Check rate limits

## 📝 Example Asset Configuration

```typescript
{
  id: 'arctic-polar-bear',
  name: 'Polar Bear',
  url: 'https://imagedelivery.net/your-zone/polar-bear.glb/public',
  type: 'model',
  category: 'arctic',
  metadata: {
    description: 'Realistic polar bear 3D model with animations',
    tags: ['animal', 'bear', 'arctic', 'predator'],
    size: 5242880 // 5MB
  }
}
```

## 🎨 Customization

Each environment has custom styling:
- **Arctic**: Blue/white color scheme, snow textures
- **Forest**: Green color scheme, tree textures  
- **Mountain**: Gray/brown color scheme, rock textures
- **Safari**: Yellow/orange color scheme, savanna textures

The environment colors and lighting are automatically adjusted based on the category. 