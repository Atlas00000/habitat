"use client"

import React from 'react'
import { AnimalPage } from '../../../src/components/AnimalPage'
import { jaguarData } from '../../../src/data/jaguar-data'

export default function JaguarPage() {
  return (
    <AnimalPage
      animal={jaguarData}
      category="forest"
      environmentDescription="Explore the dense rainforest with our magnificent jaguar. This apex predator is perfectly adapted to the forest environment with its powerful build, excellent swimming abilities, and unique hunting techniques."
      features={[
        "Dense rainforest environment with realistic vegetation",
        "Enhanced forest landscape with night atmosphere",
        "Realistic jaguar with detailed fur and proportions",
        "Scientific name: Panthera onca"
      ]}
      backUrl="/forest"
      backLabel="Back to Forest"
    />
  )
} 