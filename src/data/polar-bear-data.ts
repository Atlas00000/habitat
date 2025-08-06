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
  name: 'Polar Bear',
  scientificName: 'Ursus maritimus',
  conservationStatus: 'Vulnerable',
  habitat: 'Arctic sea ice, coastal areas, and tundra regions of the Arctic Circle. Polar bears are highly adapted to life on sea ice and are excellent swimmers.',
  diet: [
    'Seals (primary prey)',
    'Walrus',
    'Beluga whales',
    'Fish',
    'Bird eggs',
    'Berries (when available)'
  ],
  funFacts: [
    'Polar bears are the largest land carnivores on Earth, with males weighing up to 1,500 pounds.',
    'Their fur appears white but is actually transparent, with a black skin underneath.',
    'Polar bears can swim for days at a time, covering distances of up to 60 miles.',
    'They have an excellent sense of smell and can detect a seal from up to 20 miles away.',
    'Polar bears are excellent swimmers and can reach speeds of 6 mph in water.',
    'They can go months without eating during the summer when sea ice melts.',
    'Polar bear cubs are born weighing only about 1 pound but grow quickly on their mother\'s rich milk.',
    'They are considered marine mammals because they spend so much time on sea ice.'
  ],
  stats: {
    weight: '800-1,600 lbs',
    height: '6-10 feet',
    lifespan: '20-30 years',
    speed: '25 mph'
  }
} 