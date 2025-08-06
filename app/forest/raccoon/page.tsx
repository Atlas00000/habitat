import { AnimalPage } from '../../../src/components/AnimalPage'
import { raccoonData } from '../../../src/data/raccoon-data'

export default function RaccoonPage() {
  return (
    <AnimalPage
      animal={raccoonData}
      category="forest"
      environmentDescription="Explore the nocturnal forest environment with our clever raccoon. This highly intelligent mammal thrives in woodland habitats and is perfectly adapted to night-time foraging with its excellent dexterity and problem-solving skills."
      features={[
        "Night atmosphere with lakeside lighting",
        "Enhanced forest landscape", 
        "Realistic raccoon with animations",
        "Scientific name: Procyon lotor"
      ]}
      backUrl="/forest"
      backLabel="Back to Forest"
    />
  )
} 