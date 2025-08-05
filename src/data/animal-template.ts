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

// Example: Polar Bear Template
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

// Guidelines for creating animal data:
/*
1. NAME: Use common name (e.g., "White-tailed Deer" not just "Deer")
2. SCIENTIFIC NAME: Use proper binomial nomenclature (Genus species)
3. HABITAT: Include geographic range and specific habitat types
4. DIET: List from most important to least important food sources
5. CONSERVATION STATUS: Use IUCN Red List categories
6. FUN FACTS: Include 6-8 interesting, educational facts
7. STATS: Be specific with measurements and include context
8. CONSISTENCY: Use metric and imperial units where appropriate
*/ 