"use client"

import React from 'react'
import { AnimalPage } from '../../../src/components/AnimalPage'
import { blackBearData } from '../../../src/data/black-bear-data'

export default function BlackBearPage() {
  return (
    <AnimalPage
      animal={blackBearData}
      category="forest"
      environmentDescription="Explore the forest environment with our majestic American black bear. This intelligent omnivore is perfectly adapted to forest life with excellent climbing abilities, keen senses, and remarkable hibernation skills."
      features={[
        "Night atmosphere with lakeside lighting",
        "Enhanced forest landscape with realistic terrain",
        "Realistic black bear with detailed fur and proportions",
        "Scientific name: Ursus americanus"
      ]}
      backUrl="/forest"
      backLabel="Back to Forest"
    />
  )
} 