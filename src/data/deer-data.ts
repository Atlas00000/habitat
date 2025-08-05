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

export const deerData: Animal = {
  name: "White-tailed Deer",
  scientificName: "Odocoileus virginianus",
  habitat: "Forest regions, woodlands, and meadows across North America",
  diet: ["Grasses", "Leaves", "Twigs", "Fruits", "Nuts", "Bark", "Mushrooms", "Agricultural crops"],
  conservationStatus: "Least Concern",
  funFacts: [
    "White-tailed deer can run up to 30 mph and jump up to 10 feet high",
    "They have excellent hearing and can rotate their ears 180 degrees to detect predators",
    "Male deer grow and shed their antlers every year - a unique mammalian trait",
    "Deer are excellent swimmers and can cross rivers and lakes when needed",
    "They have a special four-chambered stomach for digesting tough plant material",
    "White-tailed deer can see in color and have excellent night vision",
    "They communicate through scent marking, vocalizations, and body language",
    "Fawns are born with white spots that help them camouflage in dappled sunlight"
  ],
  stats: {
    weight: "150-300 lbs (males), 90-200 lbs (females)",
    height: "3-4 feet at shoulder",
    lifespan: "10-15 years in the wild",
    speed: "30 mph (48 km/h)"
  }
} 