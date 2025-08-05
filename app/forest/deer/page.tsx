"use client"

import React from 'react'
import { AnimalPage } from '../../../src/components/AnimalPage'
import { deerData } from '../../../src/data/deer-data'

export default function DeerPage() {
  return (
    <AnimalPage
      animal={deerData}
      category="forest"
      environmentDescription="Explore the forest environment with our majestic white-tailed deer. This nocturnal creature thrives in woodland habitats and is perfectly adapted to forest life with excellent hearing and agility."
      features={[
        "Night atmosphere with lakeside lighting",
        "Enhanced forest landscape", 
        "Realistic deer with antlers",
        "Scientific name: Odocoileus virginianus"
      ]}
      backUrl="/forest"
      backLabel="Back to Forest"
    />
  )
} 