import React from 'react'
import { ArcticRegionViewer } from './src/components/ArcticRegionViewer'

// Example usage of the Arctic Region Viewer
export default function Example() {
  const handleBackClick = () => {
    console.log('Back button clicked')
  }

  const handleThemeChange = (theme: 'day' | 'night') => {
    console.log('Theme changed to:', theme)
  }

  return (
    <div className="h-screen">
      <ArcticRegionViewer
        showBackButton={true}
        onBackClick={handleBackClick}
        initialTheme="day"
        onThemeChange={handleThemeChange}
        showControls={true}
        showDataPanel={true}
        className=""
      />
    </div>
  )
}

// Alternative: Minimal usage
export function MinimalExample() {
  return (
    <div className="h-screen">
      <ArcticRegionViewer />
    </div>
  )
}

// Alternative: Custom data
export function CustomDataExample() {
  const customData = {
    name: "Arctic Fox",
    scientificName: "Vulpes lagopus",
    habitat: "Arctic tundra and coastal areas",
    diet: ["Lemmings", "Birds", "Fish", "Berries"],
    conservationStatus: "Least Concern" as const,
    funFacts: [
      "Arctic foxes change color with the seasons!",
      "They have the warmest fur of any mammal!",
      "Arctic foxes can survive temperatures as low as -70°C!"
    ],
    stats: {
      weight: "6-17 lbs",
      height: "10-12 inches",
      lifespan: "3-6 years",
      speed: "30 mph"
    }
  }

  return (
    <div className="h-screen">
      <ArcticRegionViewer customData={customData} />
    </div>
  )
} 