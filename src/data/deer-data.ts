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
  name: "Deer",
  scientificName: "Cervidae",
  habitat: "Forest regions and woodlands",
  diet: ["Grasses", "Leaves", "Twigs", "Fruits", "Nuts"],
  conservationStatus: "Least Concern",
  funFacts: [
    "Deer are excellent swimmers and can cross rivers and lakes",
    "They have excellent hearing and can rotate their ears 180 degrees",
    "Male deer grow and shed their antlers every year",
    "Deer can run up to 30 mph and jump up to 10 feet high",
    "They have a special stomach with four chambers for digesting tough plant material"
  ],
  stats: {
    weight: "150-300 lbs",
    height: "3-4 feet",
    lifespan: "10-15 years",
    speed: "30 mph"
  }
} 