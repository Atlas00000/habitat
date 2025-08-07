/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  // Enable Fast Refresh for better development experience
  fastRefresh: true,
  // Optimize for development
  swcMinify: true,
  // Enable React strict mode for better development
  reactStrictMode: true,
  // Optimize images
  images: {
    domains: [],
    formats: ['image/webp', 'image/avif'],
  },
  // Development optimizations
  onDemandEntries: {
    // Period (in ms) where the server will keep pages in the buffer
    maxInactiveAge: 25 * 1000,
    // Number of pages that should be kept simultaneously without being disposed
    pagesBufferLength: 2,
  },
  webpack: (config, { dev, isServer }) => {
    // GLB/GLTF file support
    config.module.rules.push({
      test: /\.(glb|gltf)$/,
      type: 'asset/resource',
    })
    
    // Optimize for development
    if (dev) {
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
      }
      
      // Enable source maps for better debugging
      config.devtool = 'eval-source-map'
    }
    
    return config
  },
}

export default nextConfig 