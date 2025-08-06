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
  habitat: "Diverse habitats including deciduous forests, mixed woodlands, grasslands, and suburban areas across North America. They prefer areas with dense cover for protection and open areas for feeding.",
  diet: [
    "Browse (leaves, twigs, and shoots of woody plants)",
    "Forbs (broad-leaved herbaceous plants)",
    "Grasses and sedges",
    "Acorns and other nuts",
    "Fruits and berries",
    "Agricultural crops (corn, soybeans)",
    "Mushrooms and lichens",
    "Bark and buds in winter"
  ],
  conservationStatus: "Least Concern",
  funFacts: [
    "White-tailed deer can run up to 30 mph and jump up to 10 feet high and 30 feet long",
    "They have excellent hearing and can rotate their ears 180 degrees to detect predators from any direction",
    "Male deer (bucks) grow and shed their antlers every year - the only mammals to do so",
    "Deer are excellent swimmers and can cross rivers and lakes when needed, using their strong legs",
    "They have a specialized four-chambered stomach that allows them to digest tough cellulose-rich plant material",
    "White-tailed deer can see in color and have excellent night vision, with eyes adapted for low-light conditions",
    "They communicate through scent marking, vocalizations (grunts, bleats, snorts), and body language",
    "Fawns are born with white spots that help them camouflage in dappled sunlight and disappear by their first winter",
    "Deer have a keen sense of smell, 1000 times more sensitive than humans, helping them detect predators and find food",
    "They can survive in temperatures from -40°F to 100°F, adapting their behavior and metabolism accordingly"
  ],
  stats: {
    weight: "150-300 lbs (males), 90-200 lbs (females)",
    height: "3-4 feet at shoulder, 6-8 feet from nose to tail",
    lifespan: "10-15 years in the wild, up to 20 years in captivity",
    speed: "30 mph (48 km/h) in short bursts, 15-20 mph sustained"
  }
} 