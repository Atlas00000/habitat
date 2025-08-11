"use client"

import React from 'react'
import { AnimalPage } from '../../../src/components/AnimalPage'
import { mountainGoatData } from '../../../src/data/mountain-goat-data'

export default function MountainGoatPage() {
  return (
    <AnimalPage
      animal={mountainGoatData}
      category="mountain"
      environmentDescription="Explore the rugged mountain terrain with our sure-footed mountain goat. This remarkable climber is perfectly adapted to life on steep cliffs and rocky slopes with its specialized hooves and incredible balance."
      features={[
        "Mountain terrain environment",
        "Rocky landscape with cliffs and slopes",
        "Realistic mountain goat with horns and fur",
        "Scientific name: Oreamnos americanus"
      ]}
      backUrl="/mountain"
      backLabel="Back to Mountain"
    />
  )
}

