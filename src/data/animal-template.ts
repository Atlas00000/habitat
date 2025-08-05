// Animal Data Template - Reference for adding new animals
// Copy this structure and customize for each new animal

export interface Animal {
  name: string
  scientificName: string
  habitat: string
  diet: string[]
  conservationStatus: "Least Concern" | "Near Threatened" | "Vulnerable" | "Endangered" | "Critically Endangered"
  funFacts: string[]
  stats: {
    weight: string
    height: string
    lifespan: string
    speed: string
  }
  image?: string
}

// Enhanced interface for animal pages with optimization features
export interface AnimalPageConfig {
  animal: Animal
  category: string
  environmentDescription: string
  features: string[]
  backUrl?: string
  backLabel?: string
  // Camera optimization settings
  cameraSettings?: {
    initialPosition?: [number, number, number]
    targetPosition?: [number, number, number]
    minDistance?: number
    maxDistance?: number
    minY?: number
    maxY?: number
  }
  // Animation optimization settings
  animationSettings?: {
    autoPlay?: boolean
    loop?: boolean
    animationSpeed?: number
    preferredAnimations?: string[]
  }
  // Model optimization settings
  modelSettings?: {
    position?: [number, number, number]
    scale?: [number, number, number]
    rotation?: [number, number, number]
    shadowCast?: boolean
    shadowReceive?: boolean
    preload?: boolean // Whether to preload this model
    cachePriority?: 'high' | 'medium' | 'low' // Cache priority
  }
  // Performance optimization settings
  performanceSettings?: {
    enableShadows?: boolean
    enableFog?: boolean
    enableParticles?: boolean
    maxDrawDistance?: number
    enableModelCaching?: boolean
    enableLoadingSpinners?: boolean
    enableErrorRetry?: boolean
    enableProgressTracking?: boolean
  }
}

// Template for new animals - replace with actual data
export const animalTemplate: Animal = {
  name: "Animal Name",
  scientificName: "Genus species",
  habitat: "Detailed habitat description including geographic range",
  diet: [
    "Primary food source 1",
    "Primary food source 2", 
    "Secondary food source 1",
    "Secondary food source 2",
    "Seasonal food source 1",
    "Seasonal food source 2"
  ],
  conservationStatus: "Least Concern", // Choose appropriate status
  funFacts: [
    "Fact 1: Interesting behavior or adaptation",
    "Fact 2: Physical characteristics",
    "Fact 3: Social behavior or communication",
    "Fact 4: Survival strategies",
    "Fact 5: Unique abilities or traits",
    "Fact 6: Reproduction or life cycle",
    "Fact 7: Environmental adaptations",
    "Fact 8: Human interaction or cultural significance"
  ],
  stats: {
    weight: "Weight range with units (males/females if different)",
    height: "Height measurement with context (at shoulder, etc.)",
    lifespan: "Lifespan in the wild (and captivity if different)",
    speed: "Maximum speed with units"
  }
}

// Enhanced template with optimization settings
export const optimizedAnimalTemplate: AnimalPageConfig = {
  animal: animalTemplate,
  category: "habitat-type",
  environmentDescription: "Detailed description of the 3D environment and animal behavior",
  features: [
    "Feature 1: Environmental enhancement",
    "Feature 2: Animal behavior simulation",
    "Feature 3: Interactive elements",
    "Feature 4: Educational content"
  ],
  backUrl: "/habitat",
  backLabel: "Back to Habitat",
  // Camera optimization settings
  cameraSettings: {
    initialPosition: [0, 5, 10],
    targetPosition: [0, 1, 0],
    minDistance: 3,
    maxDistance: 15,
    minY: 1.5,
    maxY: 15
  },
  // Animation optimization settings
  animationSettings: {
    autoPlay: true,
    loop: true,
    animationSpeed: 1.0,
    preferredAnimations: ['idle', 'walk', 'run']
  },
  // Model optimization settings
  modelSettings: {
    position: [0, 0.5, 0],
    scale: [1, 1, 1],
    rotation: [0, 0, 0],
    shadowCast: true,
    shadowReceive: true,
    preload: true,
    cachePriority: 'high'
  },
  // Performance optimization settings
  performanceSettings: {
    enableShadows: true,
    enableFog: false,
    enableParticles: false,
    maxDrawDistance: 100,
    enableModelCaching: true,
    enableLoadingSpinners: true,
    enableErrorRetry: true,
    enableProgressTracking: true
  }
}

// Example: Polar Bear Template with optimizations
export const polarBearTemplate: Animal = {
  name: "Polar Bear",
  scientificName: "Ursus maritimus",
  habitat: "Arctic regions including sea ice, coastal areas, and tundra across the Arctic Circle",
  diet: [
    "Seals (primary prey)",
    "Walrus",
    "Beluga whales",
    "Fish",
    "Bird eggs",
    "Berries (when available)",
    "Carrion"
  ],
  conservationStatus: "Vulnerable",
  funFacts: [
    "Polar bears are excellent swimmers and can swim for days at a time",
    "They have black skin under their white fur to absorb heat from the sun",
    "Polar bears can smell seals from up to 20 miles away",
    "They are the largest land carnivores on Earth",
    "Polar bears can run up to 25 mph on land",
    "They have special adaptations to survive in temperatures as low as -50°F",
    "Polar bears are actually marine mammals, spending most of their time on sea ice",
    "They can go months without eating during the summer when sea ice melts"
  ],
  stats: {
    weight: "800-1,600 lbs (males), 330-650 lbs (females)",
    height: "6-9 feet when standing on hind legs",
    lifespan: "20-25 years in the wild",
    speed: "25 mph (40 km/h) on land, 6 mph (10 km/h) swimming"
  }
}

// Optimized Polar Bear configuration
export const optimizedPolarBearConfig: AnimalPageConfig = {
  animal: polarBearTemplate,
  category: "arctic",
  environmentDescription: "Explore the harsh Arctic environment with our majestic polar bear. Experience the frozen landscape where this apex predator thrives in extreme conditions.",
  features: [
    "Arctic ice environment with realistic snow",
    "Enhanced lighting for polar conditions",
    "Realistic polar bear with fur simulation",
    "Scientific name: Ursus maritimus"
  ],
  backUrl: "/arctic",
  backLabel: "Back to Arctic",
  cameraSettings: {
    initialPosition: [0, 3, 8],
    targetPosition: [0, 1.5, 0],
    minDistance: 4,
    maxDistance: 12,
    minY: 2,
    maxY: 10
  },
  animationSettings: {
    autoPlay: true,
    loop: true,
    animationSpeed: 0.8,
    preferredAnimations: ["idle", "walk", "swim"]
  },
  modelSettings: {
    position: [0, 0, 0],
    scale: [1.2, 1.2, 1.2],
    rotation: [0, 0, 0],
    shadowCast: true,
    shadowReceive: true,
    preload: true,
    cachePriority: 'high'
  },
  performanceSettings: {
    enableShadows: true,
    enableFog: true,
    enableParticles: true,
    maxDrawDistance: 40,
    enableModelCaching: true,
    enableLoadingSpinners: true,
    enableErrorRetry: true,
    enableProgressTracking: true
  }
}

// Example: African Lion Template
export const lionTemplate: Animal = {
  name: "African Lion",
  scientificName: "Panthera leo",
  habitat: "Savannas, grasslands, and open woodlands across sub-Saharan Africa",
  diet: [
    "Zebras",
    "Wildebeest",
    "Buffalo",
    "Giraffes",
    "Antelopes",
    "Warthogs",
    "Small mammals",
    "Birds"
  ],
  conservationStatus: "Vulnerable",
  funFacts: [
    "Lions are the only cats that live in social groups called prides",
    "Male lions have impressive manes that protect their neck during fights",
    "Lionesses do most of the hunting for the pride",
    "Lions can run up to 50 mph in short bursts",
    "They have excellent night vision and hunt primarily at night",
    "Lions can sleep for up to 20 hours a day",
    "Their roar can be heard from up to 5 miles away",
    "Lions are excellent swimmers, unlike most other big cats"
  ],
  stats: {
    weight: "330-550 lbs (males), 265-395 lbs (females)",
    height: "3.5-4 feet at shoulder",
    lifespan: "10-14 years in the wild",
    speed: "50 mph (80 km/h) in short bursts"
  }
}

// Optimized Lion configuration
export const optimizedLionConfig: AnimalPageConfig = {
  animal: lionTemplate,
  category: "savanna",
  environmentDescription: "Experience the African savanna with our majestic lion. This social predator demonstrates incredible hunting skills and pride dynamics.",
  features: [
    "Savanna environment with realistic grass",
    "Enhanced lighting for African sun",
    "Realistic lion with mane simulation",
    "Scientific name: Panthera leo"
  ],
  backUrl: "/savanna",
  backLabel: "Back to Savanna",
  cameraSettings: {
    initialPosition: [0, 4, 10],
    targetPosition: [0, 1.2, 0],
    minDistance: 5,
    maxDistance: 18,
    minY: 1.8,
    maxY: 12
  },
  animationSettings: {
    autoPlay: true,
    loop: true,
    animationSpeed: 1.2,
    preferredAnimations: ["idle", "walk", "roar", "hunt"]
  },
  modelSettings: {
    position: [0, 0, 0],
    scale: [1.1, 1.1, 1.1],
    rotation: [0, 0, 0],
    shadowCast: true,
    shadowReceive: true,
    preload: true,
    cachePriority: 'high'
  },
  performanceSettings: {
    enableShadows: true,
    enableFog: false,
    enableParticles: false,
    maxDrawDistance: 60,
    enableModelCaching: true,
    enableLoadingSpinners: true,
    enableErrorRetry: true,
    enableProgressTracking: true
  }
}

// Guidelines for creating optimized animal pages:
/*
1. DATA QUALITY:
   - Use accurate scientific names and conservation status
   - Include comprehensive habitat and diet information
   - Provide engaging, educational fun facts
   - Use specific measurements with context

2. CAMERA OPTIMIZATION:
   - Set appropriate initial camera position for best view
   - Configure distance limits based on model size
   - Adjust Y-axis bounds to prevent floor penetration
   - Test camera controls for smooth navigation
   - Use CameraBounds component for automatic boundary enforcement

3. ANIMATION OPTIMIZATION:
   - Enable autoPlay for immediate engagement
   - Set appropriate animation speed (0.5-1.5 range)
   - Configure loop behavior based on animation type
   - Specify preferred animations for better performance
   - Use AnimationControls component for user interaction

4. MODEL OPTIMIZATION:
   - Position models at appropriate height and scale
   - Enable shadows for realistic lighting
   - Set rotation for optimal viewing angle
   - Consider model complexity and performance impact
   - Enable model preloading for faster subsequent loads
   - Set appropriate cache priority (high/medium/low)

5. PERFORMANCE OPTIMIZATION:
   - Enable shadows only when necessary
   - Use fog sparingly for atmospheric effects
   - Limit particle effects for mobile performance
   - Set appropriate draw distances
   - Enable model caching for improved load times
   - Use loading spinners for better UX
   - Implement error retry mechanisms
   - Add progress tracking for long loads

6. USER EXPERIENCE:
   - Provide clear navigation with back buttons
   - Include descriptive environment text
   - List key features for user awareness
   - Ensure responsive design for all devices
   - Add camera position indicators for debugging
   - Include camera help overlay for new users

7. LOADING & CACHING:
   - Enable model preloading for critical assets
   - Use cache status indicators in development
   - Implement progressive loading for large models
   - Add retry logic for failed asset loads
   - Show loading progress for better user feedback

8. ERROR HANDLING:
   - Graceful fallbacks for missing assets
   - Retry mechanisms for network failures
   - User-friendly error messages
   - Performance monitoring and logging
*/ 