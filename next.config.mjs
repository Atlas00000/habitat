/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable standalone output for Docker
  output: 'standalone',
  experimental: {
    // Enable experimental features for better Fast Refresh
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
    // Enable SWC minification for faster builds
    swcMinify: true,
  },
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
  // Development server optimizations
  devIndicators: {
    buildActivity: true,
    buildActivityPosition: 'bottom-right',
  },
  webpack: (config, { dev, isServer }) => {
    // GLB/GLTF file support
    config.module.rules.push({
      test: /\.(glb|gltf)$/,
      type: 'asset/resource',
    })
    
    // Optimize for development
    if (dev) {
      // Enhanced watch options for better Fast Refresh
      config.watchOptions = {
        poll: 300, // Even faster detection for immediate updates
        aggregateTimeout: 100, // Faster updates
        ignored: [
          '**/node_modules',
          '**/.git',
          '**/.next',
          '**/dist',
          '**/build',
          '**/.swc', // Ignore SWC cache
          '**/coverage', // Ignore test coverage
          '**/.nyc_output', // Ignore coverage output
          '**/.turbo', // Ignore Turbo cache
          '**/coverage', // Ignore test coverage
        ],
      }
      
      // Enhanced Fast Refresh configuration
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      }
      
      // Enable source maps for better debugging
      config.devtool = 'eval-source-map'
      
      // Optimize for Fast Refresh
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            default: false,
            vendors: false,
            // Create a vendor chunk for better caching
            vendor: {
              name: 'vendor',
              chunks: 'all',
              test: /node_modules/,
              priority: 20,
            },
            // Create a common chunk for shared code
            common: {
              name: 'common',
              minChunks: 2,
              chunks: 'all',
              priority: 10,
              reuseExistingChunk: true,
              enforce: true,
            },
          },
        },
        // Disable minification in development for faster builds
        minimize: false,
        // Disable concatenation for better debugging
        concatenateModules: false,
      }
      
      // Optimize for Fast Refresh
      config.resolve = {
        ...config.resolve,
        alias: {
          ...config.resolve.alias,
          // Ensure React is properly resolved for Fast Refresh
          'react': 'react',
          'react-dom': 'react-dom',
        },
      }
    }
    
    return config
  },
}

export default nextConfig 