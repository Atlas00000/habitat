"use client"

import React from 'react'
import { AnimalPage } from '../../../src/components/AnimalPage'
import { lionData } from '../../../src/data/lion-data'

export default function LionPage() {
  return (
    <AnimalPage
      animal={lionData}
      category="safari"
      environmentDescription="Explore the African savanna with our majestic lion. This apex predator is perfectly adapted to life on the grasslands and is known for its social behavior, powerful hunting abilities, and iconic roar."
      features={[
        "African savanna environment",
        "Grassland landscape with realistic vegetation",
        "Realistic lion with detailed mane and proportions",
        "Scientific name: Panthera leo"
      ]}
      backUrl="/safari"
      backLabel="Back to Safari"
    />
  )
}

