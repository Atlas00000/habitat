"use client"

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  Leaf, 
  TreePine, 
  Droplets, 
  Sun,
  ArrowLeft
} from 'lucide-react'
import { deerData } from '../../src/data/deer-data'
import { blackBearData } from '../../src/data/black-bear-data'
import { jaguarData } from '../../src/data/jaguar-data'
import { raccoonData } from '../../src/data/raccoon-data'
import { foxData } from '../../src/data/fox-data'
import { 
  GlassWidget, 
  StatsWidget, 
  FactCarousel, 
  AnimalCard, 
  AnimatedBackground, 
  SectionHeader 
} from '../../src/components/GlassComponents'
import { 
  MobileLayout, 
  MobileContainer, 
  MobileGrid, 
  MobileText, 
  MobileHeading 
} from '../../src/components/MobileLayout'

export default function ForestPage() {
  const animals = [
    {
      id: 'deer',
      name: 'White-tailed Deer',
      description: 'Explore the forest with our majestic deer',
      path: '/forest/deer',
      gradient: 'from-green-50 to-blue-100',
      data: deerData
    },
    {
      id: 'black-bear',
      name: 'American Black Bear',
      description: 'Discover the intelligent black bear in its natural habitat',
      path: '/forest/black-bear',
      gradient: 'from-brown-50 to-green-100',
      data: blackBearData
    },
    {
      id: 'jaguar',
      name: 'Jaguar',
      description: 'Explore the rainforest with our powerful jaguar',
      path: '/forest/jaguar',
      gradient: 'from-orange-50 to-yellow-100',
      data: jaguarData
    },
    {
      id: 'raccoon',
      name: 'Raccoon',
      description: 'Meet the clever and adaptable raccoon',
      path: '/forest/raccoon',
      gradient: 'from-gray-50 to-blue-100',
      data: raccoonData
    },
    {
      id: 'fox',
      name: 'Fox',
      description: 'Discover the cunning and agile fox',
      path: '/forest/fox',
      gradient: 'from-orange-50 to-red-100',
      data: foxData
    }
  ]

  const forestStats = [
    { icon: TreePine, label: "Tree Species", value: "150+", color: "bg-green-500" },
    { icon: Leaf, label: "Plant Diversity", value: "2,000+", color: "bg-emerald-500" },
    { icon: Droplets, label: "Annual Rainfall", value: "40-80\"", color: "bg-blue-500" },
    { icon: Sun, label: "Sunlight", value: "Partial", color: "bg-yellow-500" }
  ]

  const funFacts = [
    "Forests cover 31% of Earth's land surface and are home to 80% of terrestrial biodiversity",
    "A single mature tree can produce oxygen for 4 people and absorb 48 pounds of CO2 per year",
    "Trees communicate through underground fungal networks called 'Wood Wide Web'",
    "Forests provide habitat for over 80% of amphibian species and 75% of bird species"
  ]

  return (
    <MobileLayout>
      <main className="min-h-screen bg-gradient-to-br from-green-900 via-green-800 to-emerald-900 relative">
        {/* Animated background */}
        <AnimatedBackground colors={["green", "emerald", "blue"]} />

        <div className="relative z-10 container mx-auto">
          <MobileContainer>
            {/* Header */}
            <SectionHeader 
              title="Forest Biome"
              subtitle="Discover the lush, diverse world of forest ecosystems and their incredible inhabitants"
            />

            {/* Stats Grid */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-8 md:mb-12"
            >
              {forestStats.map((stat, index) => (
                <StatsWidget
                  key={stat.label}
                  icon={stat.icon}
                  label={stat.label}
                  value={stat.value}
                  color={stat.color}
                  delay={index * 0.1}
                />
              ))}
            </motion.div>

            {/* Main content grid */}
            <div className="grid lg:grid-cols-3 gap-6 md:gap-8 mb-8 md:mb-12">
              {/* Forest Overview */}
              <div className="lg:col-span-2">
                <GlassWidget delay={0.3}>
                  <MobileHeading level={2} className="mb-4 flex items-center">
                    <TreePine className="w-5 h-5 md:w-6 md:h-6 mr-2" />
                    Forest Overview
                  </MobileHeading>
                  <MobileText size="base" className="mb-6">
                    Forests are Earth's most biodiverse terrestrial ecosystems, providing 
                    habitat for countless species while playing a crucial role in global 
                    climate regulation. These complex ecosystems feature multiple layers 
                    from the forest floor to the canopy, each supporting unique wildlife.
                  </MobileText>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                    <div className="space-y-2 md:space-y-3">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                        <MobileHeading level={3} className="text-sm md:text-base">Canopy Layer</MobileHeading>
                      </div>
                      <MobileText size="sm">Upper tree layer providing shelter and food</MobileText>
                    </div>
                    <div className="space-y-2 md:space-y-3">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-emerald-400 rounded-full"></div>
                        <MobileHeading level={3} className="text-sm md:text-base">Understory</MobileHeading>
                      </div>
                      <MobileText size="sm">Middle layer with shrubs and small trees</MobileText>
                    </div>
                    <div className="space-y-2 md:space-y-3">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                        <MobileHeading level={3} className="text-sm md:text-base">Forest Floor</MobileHeading>
                      </div>
                      <MobileText size="sm">Ground level with decomposing matter</MobileText>
                    </div>
                    <div className="space-y-2 md:space-y-3">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                        <MobileHeading level={3} className="text-sm md:text-base">Riparian Zones</MobileHeading>
                      </div>
                      <MobileText size="sm">Water-adjacent areas with unique species</MobileText>
                    </div>
                  </div>
                </GlassWidget>
              </div>

              {/* Fun Facts */}
              <div>
                <FactCarousel
                  facts={funFacts}
                  title="Did You Know?"
                  icon={Leaf}
                  delay={0.4}
                />
              </div>
            </div>

            {/* Animals Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <GlassWidget delay={0.6}>
                <MobileHeading level={2} className="mb-6 md:mb-8 text-center">
                  Forest Inhabitants
                </MobileHeading>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                  {animals.map((animal, index) => (
                    <AnimalCard
                      key={animal.id}
                      animal={animal}
                      data={animal.data}
                      index={index}
                      delay={0.7 + index * 0.1}
                    />
                  ))}
                </div>
              </GlassWidget>
            </motion.div>

            {/* Back to environments */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="text-center mt-8 md:mt-12"
            >
              <Link
                href="/"
                className="inline-flex items-center space-x-2 text-white/80 hover:text-white transition-colors group"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                <span>Back to Environments</span>
              </Link>
            </motion.div>
          </MobileContainer>
        </div>
      </main>
    </MobileLayout>
  )
} 