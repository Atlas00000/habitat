"use client"

import React from 'react'
import { BearAnimalPage } from '../../../src/components/BearAnimalPage'
import { blackBearData } from '../../../src/data/black-bear-data'

export default function BlackBearPage() {
  return (
    <BearAnimalPage
      animal={blackBearData}
      category="forest"
      environmentDescription="Explore the forest environment with our majestic American black bear. This intelligent omnivore is perfectly adapted to forest life with excellent climbing abilities, keen senses, and remarkable hibernation skills."
      features={[
        "Forest habitat with diverse vegetation",
        "Omnivorous diet including berries and fish",
        "Excellent climbing and swimming abilities",
        "Scientific name: Ursus americanus"
      ]}
      backUrl="/forest"
      backLabel="Back to Forest"
    />
  )
} 