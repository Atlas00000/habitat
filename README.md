# 🦁 Animal Enclosure System

A modular 3D environment explorer for animal enclosures with Cloudflare asset integration.

## 🚀 Features

- **Modular Architecture**: Easy to add new animal enclosures
- **3D Immersive Experience**: Full-screen 3D environments with camera controls
- **Cloudflare Integration**: CORS-free asset loading via proxy API
- **Environment-Specific Styling**: Automatic color schemes and lighting
- **Asset Management**: Comprehensive utilities for managing 3D models and textures
- **Error Handling**: Graceful fallbacks and error recovery

## 🌍 Environments

- **Arctic**: Polar bears and ice environments
- **Forest**: ✅ Black bears and rainforest (with assets)
- **Mountain**: Alpine peaks and climbers
- **Safari**: African wildlife and savanna

## 🛠️ Tech Stack

- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe development
- **Three.js**: 3D graphics library
- **React Three Fiber**: React renderer for Three.js
- **Drei**: Useful helpers for React Three Fiber
- **Tailwind CSS**: Utility-first CSS framework
- **pnpm**: Fast package manager

## 📦 Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd arctic-region-standalone

# Install dependencies
pnpm install

# Start development server
pnpm start
```

## 🎯 Quick Start

1. **Visit the application**: `http://localhost:3000`
2. **Choose an environment**: Click on any environment card
3. **Explore in 3D**: Use mouse/touch to navigate the 3D scene
4. **Interact with assets**: Click on animals to see information

## 🦁 Adding New Animal Enclosures

### Method 1: Using Asset Manager (Recommended)

```typescript
import { addCloudflareAsset } from '../src/utils/assetManager'

// Add a new animal
addCloudflareAsset({
  name: 'African Lion',
  description: 'Realistic African lion 3D model',
  tags: ['animal', 'lion', 'safari', 'predator'],
  category: 'safari',
  type: 'model',
  cloudflareUrl: 'https://your-link.com/lion.glb'
})
```

### Method 2: Direct Configuration

```typescript
// In src/config/cloudflare.ts
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
    }
  ]
}
```

## 📋 Supported Asset Types

- **model**: 3D models (GLB/GLTF files) - Animals, environments
- **hdr**: High Dynamic Range environment maps - Lighting and atmosphere
- **texture**: Texture files (PNG, JPG) - Surface details
- **audio**: Sound files (MP3, WAV) - Ambient sounds
- **image**: 2D images (PNG, JPG) - UI elements

## 🏗️ Project Structure

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

app/
├── arctic/page.tsx           # Arctic environment
├── forest/page.tsx           # Forest environment
├── mountain/page.tsx         # Mountain environment
├── safari/page.tsx           # Safari environment
└── page.tsx                  # Navigation hub
```

## 🔧 Configuration

### Cloudflare API Key

The system uses a Cloudflare API key for asset management:

```typescript
// src/config/cloudflare.ts
export const CLOUDFLARE_CONFIG = {
  API_KEY: 'your-api-key-here',
  BASE_URL: 'https://api.cloudflare.com/client/v4',
  ZONE_ID: 'your-zone-id'
}
```

### CORS Proxy

All external assets are automatically routed through a proxy API to handle CORS issues:

```
/api/proxy?url=YOUR_ASSET_URL
```

## 🎨 Customization

### Environment Colors

Each environment has custom styling defined in `EnvironmentScene.tsx`:

```typescript
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

### Adding New Categories

```typescript
import { createNewCategory } from '../src/utils/assetManager'

createNewCategory('desert', 'Desert Environment', 'Hot desert landscapes with unique wildlife')
```

## 🚨 Troubleshooting

### Asset Not Loading?
1. Check the URL is accessible
2. Verify the proxy API: `/api/proxy?url=YOUR_ASSET_URL`
3. Check browser console for CORS errors
4. Ensure asset ID is unique

### Performance Issues?
1. Keep model files under 10MB
2. Use compressed textures
3. Optimize models for web delivery
4. Consider LOD (Level of Detail)

### 3D Model Positioning Issues?
**IMPORTANT FIX**: If 3D models (especially animals) are not responding to position/scale changes:

The `CloudflareModel` component now properly respects position and scale parameters passed from parent components. Previously, it was overriding these values with hardcoded defaults for animal assets.

**Key Points:**
- Position and scale parameters are now prioritized over asset type defaults
- Animal models will respond to position changes in `EnvironmentScene.tsx`
- Always pass explicit position/scale values when you need specific positioning

**Example Usage:**
```typescript
// In EnvironmentScene.tsx
if (asset.id === 'deer-model') {
  position = [0, 3.0, 0] // This will now work correctly
  scale = [0.8, 0.8, 0.8]
}
```

## 📚 Documentation

- [Asset Management Guide](./ASSET_MANAGEMENT.md)
- [New Enclosure Guide](./NEW_ENCLOSURE_GUIDE.md)
- [Quick Reference](./QUICK_REFERENCE.md)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Add your animal enclosures
4. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🎉 Acknowledgments

- Three.js community for 3D graphics
- React Three Fiber for React integration
- Cloudflare for asset hosting
- Next.js team for the framework

---

**Ready to explore the animal kingdom in 3D!** 🦁🐘🦒 