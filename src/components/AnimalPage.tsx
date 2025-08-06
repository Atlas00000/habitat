"use client"

import React, { useState } from 'react'
import { ArcticRegionViewer } from './ArcticRegionViewer'
import { FloatingDataPanel } from './FloatingDataPanel'
import { Button } from '../ui/button'
import { ArrowLeft, Info, Eye, EyeOff, MapPin, Users, Calendar } from 'lucide-react'
import { Animal } from '../data/deer-data'

interface AnimalPageProps {
  animal: Animal
  category: string
  environmentDescription: string
  features: string[]
  backUrl?: string
  backLabel?: string
}

export const AnimalPage: React.FC<AnimalPageProps> = ({
  animal,
  category,
  environmentDescription,
  features,
  backUrl = '/forest',
  backLabel = 'Back to Forest'
}) => {
  const [showDataPanel, setShowDataPanel] = useState(true)
  const [selectedAnimal, setSelectedAnimal] = useState(animal)

  const handleBack = () => {
    if (backUrl) {
      window.location.href = backUrl
    } else {
      window.history.back()
    }
  }

  return (
    <main className="w-full h-screen bg-gradient-to-br from-green-50 to-blue-100">
      <div className="w-full h-full relative">
        <ArcticRegionViewer category={category} selectedAnimal={animal} />
        
        {/* Enhanced Animal-specific overlay */}
        <div className="absolute top-4 left-4 z-20 bg-white/95 backdrop-blur-md rounded-xl p-6 max-w-md shadow-2xl border border-white/30">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center">
              {animal.name} Habitat
            </h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowDataPanel(!showDataPanel)}
              className="text-gray-600 hover:text-gray-800"
            >
              {showDataPanel ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>
          </div>
          
          <p className="text-sm text-gray-600 mb-4 leading-relaxed">
            {environmentDescription}
          </p>
          
          <div className="space-y-3">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-xs text-gray-600">{feature}</span>
              </div>
            ))}
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex items-center space-x-2 text-xs text-gray-500">
              <Info className="h-3 w-3" />
              <span>Click on the {animal.name.toLowerCase()} to see detailed information</span>
            </div>
          </div>
        </div>

        {/* Back button */}
        <div className="absolute top-4 right-4 z-20">
          <Button
            variant="outline"
            size="sm"
            onClick={handleBack}
            className="bg-white/90 backdrop-blur-md border-white/30 text-gray-700 hover:bg-white/95"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            {backLabel}
          </Button>
        </div>

        {/* Comprehensive Data Panel */}
        {showDataPanel && selectedAnimal && (
          <FloatingDataPanel animal={selectedAnimal} />
        )}
      </div>
    </main>
  )
}

// Usage example:
/*
import { AnimalPage } from '../src/components/AnimalPage'
import { deerData } from '../src/data/deer-data'

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
*/ 