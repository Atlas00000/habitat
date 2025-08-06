import { AnimalPage } from '../../../src/components/AnimalPage'
import { foxData } from '../../../src/data/fox-data'

export default function FoxPage() {
  return (
    <AnimalPage
      animal={foxData}
      category="forest"
      environmentDescription="Explore the nocturnal forest environment with our clever fox. This highly adaptable mammal thrives in woodland habitats and is perfectly adapted to night-time hunting with its excellent hearing and agility."
      features={[
        "Night atmosphere with lakeside lighting",
        "Enhanced forest landscape", 
        "Realistic fox with animations",
        "Scientific name: Vulpes vulpes"
      ]}
      backUrl="/forest"
      backLabel="Back to Forest"
    />
  )
} 