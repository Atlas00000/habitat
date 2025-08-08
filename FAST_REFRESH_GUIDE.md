# Fast Refresh Optimization Guide

## Overview
This guide provides solutions for ensuring immediate code changes are reflected in the development server without requiring restarts.

## Quick Start

### Option 1: Use the Setup Script (Recommended)
```bash
npm run dev:setup
```

### Option 2: Manual Clean Start
```bash
npm run dev:clean
```

### Option 3: Complete Reset
```bash
npm run dev:reset
```

## Configuration Files

### 1. Next.js Configuration (`next.config.mjs`)
- Enhanced Fast Refresh settings
- Optimized webpack configuration
- Improved watch options for faster file detection

### 2. Environment Variables (`.env.local`)
- Fast Refresh enabled by default
- Development optimizations
- Cache configuration

### 3. Package.json Scripts
- `dev:setup`: Automated development environment setup
- `dev:clean`: Clean cache and start server
- `dev:reset`: Complete reset and restart
- `kill-port`: Kill process on port 3000

## Best Practices

### 1. Component Structure
```typescript
// ✅ Good: Export default function
export default function MyComponent() {
  return <div>Content</div>
}

// ❌ Bad: Named export for pages
export function MyPage() {
  return <div>Content</div>
}
```

### 2. State Management
```typescript
// ✅ Good: Use useState for local state
const [count, setCount] = useState(0)

// ✅ Good: Use useCallback for stable references
const handleClick = useCallback(() => {
  setCount(prev => prev + 1)
}, [])
```

### 3. Import Structure
```typescript
// ✅ Good: Named imports
import { useState, useEffect } from 'react'

// ✅ Good: Default imports
import MyComponent from './MyComponent'

// ❌ Avoid: Dynamic imports in development
const MyComponent = dynamic(() => import('./MyComponent'))
```

## Troubleshooting

### Issue: Changes not reflecting
1. **Check file structure**: Ensure components are properly exported
2. **Clear cache**: Run `npm run dev:clean`
3. **Check console**: Look for Fast Refresh errors
4. **Restart server**: Use `npm run dev:setup`

### Issue: Hydration mismatches
1. **Use deterministic values**: Avoid `Math.random()` in render
2. **Check server/client differences**: Ensure consistent rendering
3. **Use `useEffect` for client-only code**

### Issue: Port conflicts
1. **Kill existing process**: `npm run kill-port`
2. **Use different port**: `next dev --port 3001`
3. **Check process list**: `lsof -i :3000`

## Development Workflow

### 1. Initial Setup
```bash
# Clone and install
git clone <repository>
npm install

# Start with optimized Fast Refresh
npm run dev:setup
```

### 2. Daily Development
```bash
# Start development server
npm run dev

# If issues occur, clean and restart
npm run dev:clean
```

### 3. Troubleshooting
```bash
# Complete reset
npm run dev:reset

# Kill port conflicts
npm run kill-port
```

## Performance Optimizations

### 1. File Watching
- Poll interval: 300ms (faster detection)
- Aggregate timeout: 100ms (faster updates)
- Ignored directories: node_modules, .next, .turbo

### 2. Webpack Configuration
- Source maps: `eval-source-map` (faster builds)
- Minification: Disabled in development
- Chunk splitting: Optimized for development

### 3. Cache Management
- Next.js cache: Enabled with optimized settings
- Module cache: Cleaned automatically
- Turbo cache: Managed by setup script

## Monitoring

### 1. Development Indicators
- Build activity indicator: Bottom-right
- Fast Refresh status: Browser console
- Error overlay: Automatic display

### 2. Console Logs
```bash
# Check for Fast Refresh errors
npm run dev 2>&1 | grep -i "fast refresh"

# Monitor file changes
npm run dev 2>&1 | grep -i "compiled"
```

## Advanced Configuration

### 1. Custom Webpack Configuration
```javascript
// next.config.mjs
webpack: (config, { dev }) => {
  if (dev) {
    config.watchOptions = {
      poll: 300,
      aggregateTimeout: 100,
    }
  }
  return config
}
```

### 2. Environment Variables
```bash
# .env.local
FAST_REFRESH=true
REACT_FAST_REFRESH=true
NEXT_TELEMETRY_DISABLED=1
```

### 3. TypeScript Configuration
```json
// tsconfig.json
{
  "compilerOptions": {
    "incremental": true,
    "tsBuildInfoFile": ".tsbuildinfo"
  }
}
```

## Common Issues and Solutions

### 1. "Module not found" errors
- Clear cache: `npm run dev:clean`
- Check import paths
- Restart TypeScript server

### 2. Stale component state
- Use `useEffect` for side effects
- Avoid direct DOM manipulation
- Check for memory leaks

### 3. Slow refresh times
- Reduce bundle size
- Optimize imports
- Use code splitting

## Maintenance

### Weekly Tasks
1. Clear all caches: `npm run clean:all`
2. Update dependencies: `npm update`
3. Check for configuration updates

### Monthly Tasks
1. Review webpack configuration
2. Update Next.js version
3. Optimize development scripts

## Support

If you encounter persistent issues:
1. Check the troubleshooting section
2. Review console errors
3. Try the complete reset process
4. Check for conflicting processes 