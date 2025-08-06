import { AnimalPage } from '../../../src/components/AnimalPage'
import { polarBearData } from '../../../src/data/polar-bear-data'

export default function PolarBearPage() {
  return (
    <AnimalPage 
      animal={polarBearData} 
      category="arctic"
      environmentDescription="Explore the Arctic environment with our magnificent polar bear. This apex predator is perfectly adapted to life on sea ice and is the largest land carnivore on Earth."
      features={[
        "Snow and ice environment",
        "Arctic terrain landscape", 
        "Realistic polar bear model",
        "Scientific name: Ursus maritimus"
      ]}
      backUrl="/arctic"
      backLabel="Back to Arctic" 
    />
  )
} 