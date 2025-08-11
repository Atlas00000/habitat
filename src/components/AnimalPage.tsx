"use client"

import React, { useState } from 'react'
import { ArcticRegionViewer } from './ArcticRegionViewer'
import { FloatingDataPanel } from './FloatingDataPanel'
import { MobileFactSheet } from './MobileFactSheet'
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

// Theme configurations for different regions
const regionThemes = {
  forest: {
    primary: 'bg-green-600',
    secondary: 'bg-green-100/50',
    accent: 'bg-green-200/50',
    background: 'from-green-50/95 to-emerald-50/95',
    border: 'border-green-200/30',
    text: 'text-green-900',
    textSecondary: 'text-green-700'
  },
  arctic: {
    primary: 'bg-blue-600',
    secondary: 'bg-blue-100/50',
    accent: 'bg-blue-200/50',
    background: 'from-blue-50/95 to-cyan-50/95',
    border: 'border-blue-200/30',
    text: 'text-blue-900',
    textSecondary: 'text-blue-700'
  },
  safari: {
    primary: 'bg-yellow-600',
    secondary: 'bg-yellow-100/50',
    accent: 'bg-yellow-200/50',
    background: 'from-yellow-50/95 to-orange-50/95',
    border: 'border-yellow-200/30',
    text: 'text-yellow-900',
    textSecondary: 'text-yellow-700'
  },
  mountain: {
    primary: 'bg-gray-600',
    secondary: 'bg-gray-100/50',
    accent: 'bg-gray-200/50',
    background: 'from-gray-50/95 to-slate-50/95',
    border: 'border-gray-200/30',
    text: 'text-gray-900',
    textSecondary: 'text-gray-700'
  }
}

// Default theme for unknown regions
const defaultTheme = regionThemes.forest

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

  // Get theme based on category
  const theme = regionThemes[category as keyof typeof regionThemes] || defaultTheme

  // Get appropriate icon based on animal name
  const getAnimalIcon = () => {
    const animalName = animal.name.toLowerCase()
    if (animalName.includes('bear')) return '🐻'
    if (animalName.includes('deer')) return '🦌'
    if (animalName.includes('fox')) return '🦊'
    if (animalName.includes('raccoon')) return '🦝'
    if (animalName.includes('jaguar')) return '🐆'
    if (animalName.includes('lion')) return '🦁'
    if (animalName.includes('polar')) return '🐻‍❄️'
    if (animalName.includes('goat')) return '🐐'
    return '🐾'
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

        {/* Mobile Fact Sheet */}
        <MobileFactSheet 
          animal={animal}
          theme={theme}
          icon={<span className="text-lg">{getAnimalIcon()}</span>}
          title={`${animal.name} Fact Sheet`}
        />

        {/* Comprehensive Data Panel - Desktop Only */}
        {showDataPanel && selectedAnimal && (
          <div className="hidden md:block">
            <FloatingDataPanel animal={selectedAnimal} />
          </div>
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