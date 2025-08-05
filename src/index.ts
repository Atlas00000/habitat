// Main export for the Arctic Region Viewer
export { ArcticRegionViewer } from './components/ArcticRegionViewer'
export type { ArcticRegionViewerProps } from './components/ArcticRegionViewer'

// Export data for customization
export { polarBearData } from './data/polar-bear-data'

// Export utilities for advanced usage
export { preloadCriticalAssets, checkAssetHealth, getAssetPath } from './utils/assetLoader'
export { preloadAssets, getCDNAssetUrl } from './utils/cloudflare-cdn'

// Export individual components for advanced customization
export { SceneViewport } from './components/SceneViewport'
export { FloatingDataPanel } from './components/FloatingDataPanel'
export { GLTFModel } from './components/gltf-model' 