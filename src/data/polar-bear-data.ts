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

export const polarBearData: Animal = {
  name: "Polar Bear",
  scientificName: "Ursus maritimus",
  habitat: "Arctic regions",
  diet: ["Seals", "Fish", "Birds"],
  conservationStatus: "Vulnerable",
  funFacts: [
    "Polar bears are excellent swimmers",
    "They can smell seals from up to 20 miles away",
    "Polar bears have black skin under their white fur"
  ],
  stats: {
    weight: "800-1,600 lbs",
    height: "6-10 feet",
    lifespan: "20-30 years",
    speed: "25 mph"
  }
} 