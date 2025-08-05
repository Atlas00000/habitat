# Development Notes

## Important Fixes & Patterns

### 3D Model Positioning Fix (2024)

**Problem**: 3D models (especially animals) were not responding to position/scale changes because the `CloudflareModel` component was overriding passed parameters with hardcoded defaults.

**Root Cause**: In `src/components/3D/CloudflareModel.tsx`, the `getAssetPosition()` and `getAssetScale()` functions were returning hardcoded values for animal assets, ignoring the position/scale parameters passed from parent components.

**Solution**: Modified the functions to prioritize passed parameters over asset type defaults:

```typescript
// Before (BROKEN)
const getAssetPosition = () => {
  if (asset.metadata?.tags?.includes('animal')) {
    return [0, 0, 0] as [number, number, number] // Overrides passed position!
  }
  return position || [0, 0, 0]
}

// After (FIXED)
const getAssetPosition = () => {
  // Use the passed position parameter if provided, otherwise use defaults
  if (position) {
    return position
  }
  
  // Default positions based on asset type
  if (asset.metadata?.tags?.includes('animal')) {
    return [0, 0, 0] as [number, number, number]
  }
  return [0, 0, 0]
}
```

**Key Principle**: Always prioritize explicit parameters over asset type defaults when positioning 3D models.

### When Creating New Pages

1. **Always pass explicit position/scale values** when you need specific positioning
2. **Test model positioning** immediately after adding new 3D assets
3. **Use the EnvironmentScene pattern** for consistent positioning across environments
4. **Remember this fix** - it's easy to forget and causes confusing behavior

### Example Pattern for New Environments

```typescript
// In EnvironmentScene.tsx - Always use this pattern
{assets
  .filter(asset => asset.type === 'model')
  .map((asset) => {
    let position: [number, number, number] = [0, 0, 0]
    let scale: [number, number, number] = [1, 1, 1]
    
    if (asset.id === 'your-animal-model') {
      position = [0, 2.0, 0] // Explicit positioning
      scale = [0.8, 0.8, 0.8]
    } else if (asset.id === 'your-environment-model') {
      position = [0, 0, 0]
      scale = [1, 1, 1]
    }
    
    return (
      <CloudflareModel
        key={asset.id}
        asset={asset}
        position={position}  // This will now work correctly
        scale={scale}
        onClick={() => handleAssetClick(asset)}
      />
    )
  })}
```

## Common Gotchas

1. **Asset ID Mismatch**: Ensure the asset ID in your condition matches exactly with the asset configuration
2. **Position Array**: Always use `[x, y, z]` format for position and scale
3. **Asset Tags**: Check that your asset has the correct tags in the cloudflare config
4. **Model Loading**: Ensure the model URL is accessible and the proxy is working

## Testing Checklist

When adding new 3D assets:
- [ ] Model loads without errors
- [ ] Position changes are applied correctly
- [ ] Scale changes are applied correctly
- [ ] Model responds to clicks (if interactive)
- [ ] Model works in different environments
- [ ] Performance is acceptable

---

*Last Updated: 2024 - Remember this fix when creating new pages!* 