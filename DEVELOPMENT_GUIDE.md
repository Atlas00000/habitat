# Development Guide

## Fast Refresh Setup

The project is now optimized for Fast Refresh (Hot Module Replacement) to provide immediate feedback during development.

### Quick Start

```bash
# Start development server with Fast Refresh
pnpm dev

# Or use the fast development mode
pnpm dev:fast
```

### Fast Refresh Features

✅ **Immediate Updates** - See changes instantly without page refresh  
✅ **State Preservation** - Component state is maintained during updates  
✅ **Error Recovery** - Automatic error recovery with overlay  
✅ **TypeScript Support** - Full TypeScript hot reloading  

## Development Optimizations

### 1. Next.js Configuration

The `next.config.mjs` includes optimizations for development:

- **Fast Refresh**: Enabled for immediate updates
- **Source Maps**: Better debugging experience
- **Webpack Optimization**: Faster rebuilds
- **React Strict Mode**: Better development experience

### 2. Development Scripts

```bash
# Standard development with Fast Refresh
pnpm dev

# Fast development mode with turbo
pnpm dev:fast

# Clean and restart (if issues occur)
pnpm clean && pnpm dev

# Type checking
pnpm type-check

# Linting
pnpm lint
```

### 3. Best Practices for Fast Refresh

#### ✅ Do's

- **Component Structure**: Keep components simple and focused
- **State Management**: Use React hooks properly
- **File Organization**: Maintain clear file structure
- **Error Boundaries**: Handle errors gracefully

#### ❌ Don'ts

- **Global State**: Avoid complex global state changes
- **Side Effects**: Be careful with useEffect dependencies
- **Large Components**: Break down large components
- **External Dependencies**: Minimize external state changes

### 4. Troubleshooting Fast Refresh

#### If Fast Refresh Stops Working:

1. **Clear Cache**:
   ```bash
   pnpm clean
   ```

2. **Restart Server**:
   ```bash
   pnpm dev
   ```

3. **Check Console**: Look for error messages in browser console

4. **Component Issues**: Ensure components are properly exported

#### Common Issues:

- **TypeScript Errors**: Fix type errors to restore Fast Refresh
- **Syntax Errors**: Check for missing imports or syntax issues
- **State Issues**: Avoid complex state mutations during development

### 5. Mobile Development

#### Testing Mobile Responsiveness:

1. **Browser DevTools**: Use device simulation
2. **Real Devices**: Test on actual mobile devices
3. **Network Throttling**: Test with slow connections
4. **Touch Testing**: Verify touch interactions

#### Mobile Optimization Tips:

- Use `MobileLayout` components consistently
- Test touch targets (44px minimum)
- Verify scrolling behavior
- Check safe area handling

### 6. Performance Monitoring

#### Development Performance:

- **Bundle Analyzer**: Monitor bundle size
- **Lighthouse**: Check performance scores
- **React DevTools**: Monitor component performance
- **Network Tab**: Monitor loading times

#### Key Metrics:

- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **Time to Interactive**: < 3.8s

### 7. Code Quality

#### TypeScript:

```bash
# Type checking
pnpm type-check

# Watch mode for types
pnpm type-check --watch
```

#### Linting:

```bash
# Run linter
pnpm lint

# Fix auto-fixable issues
pnpm lint --fix
```

### 8. File Structure

```
app/
├── layout.tsx          # Root layout
├── page.tsx           # Homepage
├── arctic/            # Arctic biome
├── forest/            # Forest biome
├── safari/            # Safari biome
└── mountain/          # Mountain biome

src/
├── components/        # Reusable components
│   ├── GlassComponents.tsx
│   └── MobileLayout.tsx
├── data/             # Data files
└── styles.css        # Global styles
```

### 9. Development Workflow

1. **Start Development**:
   ```bash
   pnpm dev
   ```

2. **Make Changes**: Edit files and see immediate updates

3. **Test Responsiveness**: Use browser dev tools

4. **Type Check**: Ensure no TypeScript errors

5. **Commit Changes**: Use meaningful commit messages

### 10. Hot Reload Tips

#### For Best Performance:

- **Component Updates**: Changes to components update instantly
- **Style Changes**: CSS updates are immediate
- **Data Changes**: Update data files for instant reflection
- **Layout Changes**: Structural changes reload quickly

#### Optimization:

- **Small Components**: Keep components focused
- **Proper Imports**: Use correct import statements
- **Error Handling**: Handle errors gracefully
- **State Management**: Use React hooks properly

---

## Quick Commands Reference

```bash
# Development
pnpm dev              # Start development server
pnpm dev:fast         # Fast development mode
pnpm clean            # Clear cache and restart

# Building
pnpm build-app        # Build for production
pnpm serve            # Start production server

# Quality
pnpm type-check       # TypeScript checking
pnpm lint             # Code linting

# Troubleshooting
pnpm clean && pnpm dev  # Clean restart
```

This setup ensures you get the fastest possible development experience with immediate feedback on all changes! 