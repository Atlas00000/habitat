"use client"

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  Sun, 
  TreePine, 
  Droplets, 
  Wind,
  ArrowLeft
} from 'lucide-react'
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

export default function SafariPage() {
  const animals = [
    {
      id: 'lion',
      name: 'African Lion',
      description: 'Experience the power and majesty of the king of the savanna',
      path: '/safari/lion',
      gradient: 'from-yellow-50 to-orange-100',
      data: {
        name: "African Lion",
        scientificName: "Panthera leo",
        habitat: "African savannas, grasslands, and open woodlands across sub-Saharan Africa",
        stats: {
          weight: "330-550 lbs (males), 265-395 lbs (females)",
          height: "3.5-4 feet at shoulder",
          lifespan: "10-14 years in the wild",
          speed: "50 mph (80 km/h) in short bursts"
        }
      }
    },
    {
      id: 'elephant',
      name: 'African Elephant',
      description: 'Discover the gentle giants of the African plains',
      path: '/safari/elephant',
      gradient: 'from-gray-50 to-slate-100',
      data: {
        name: "African Elephant",
        scientificName: "Loxodonta africana",
        habitat: "Savannas, forests, and grasslands across sub-Saharan Africa",
        stats: {
          weight: "6,000-14,000 lbs",
          height: "8-13 feet at shoulder",
          lifespan: "60-70 years in the wild",
          speed: "25 mph (40 km/h) in short bursts"
        }
      }
    },
    {
      id: 'giraffe',
      name: 'Giraffe',
      description: 'Meet the tallest animal on Earth',
      path: '/safari/giraffe',
      gradient: 'from-orange-50 to-yellow-100',
      data: {
        name: "Giraffe",
        scientificName: "Giraffa camelopardalis",
        habitat: "African savannas and open woodlands",
        stats: {
          weight: "1,750-2,800 lbs",
          height: "14-18 feet tall",
          lifespan: "20-25 years in the wild",
          speed: "35 mph (56 km/h) in short bursts"
        }
      }
    }
  ]

  const safariStats = [
    { icon: Sun, label: "Temperature", value: "70-95°F", color: "bg-yellow-500" },
    { icon: TreePine, label: "Grasslands", value: "40% of Africa", color: "bg-orange-500" },
    { icon: Droplets, label: "Rainfall", value: "20-40\" annually", color: "bg-blue-500" },
    { icon: Wind, label: "Wind Speed", value: "5-15 mph", color: "bg-amber-500" }
  ]

  const funFacts = [
    "The African savanna covers 40% of the continent and supports the world's largest land animals",
    "Lions can sleep up to 20 hours per day and are the only big cats that live in social groups",
    "Elephants can communicate through low-frequency sounds that travel for miles",
    "Giraffes have the same number of neck vertebrae as humans - just seven"
  ]

  return (
    <MobileLayout>
      <main className="min-h-screen bg-gradient-to-br from-yellow-900 via-orange-800 to-amber-900 relative">
        {/* Animated background */}
        <AnimatedBackground colors={["yellow", "orange", "amber"]} />

        <div className="relative z-10 container mx-auto">
          <MobileContainer>
            {/* Header */}
            <SectionHeader 
              title="Safari Biome"
              subtitle="Experience the vast African savannas and their incredible wildlife"
            />

            {/* Stats Grid */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-8 md:mb-12"
            >
              {safariStats.map((stat, index) => (
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
              {/* Safari Overview */}
              <div className="lg:col-span-2">
                <GlassWidget delay={0.3}>
                  <MobileHeading level={2} className="mb-4 flex items-center">
                    <Sun className="w-5 h-5 md:w-6 md:h-6 mr-2" />
                    Safari Overview
                  </MobileHeading>
                  <MobileText size="base" className="mb-6">
                    The African savanna is one of Earth's most iconic ecosystems, characterized by 
                    vast grasslands, scattered trees, and seasonal rainfall patterns. This dynamic 
                    environment supports some of the world's largest and most impressive wildlife, 
                    creating the perfect stage for nature's greatest spectacles.
                  </MobileText>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                    <div className="space-y-2 md:space-y-3">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                        <MobileHeading level={3} className="text-sm md:text-base">Grasslands</MobileHeading>
                      </div>
                      <MobileText size="sm">Vast open plains dominated by grasses</MobileText>
                    </div>
                    <div className="space-y-2 md:space-y-3">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-orange-400 rounded-full"></div>
                        <MobileHeading level={3} className="text-sm md:text-base">Acacia Trees</MobileHeading>
                      </div>
                      <MobileText size="sm">Scattered trees providing shade and food</MobileText>
                    </div>
                    <div className="space-y-2 md:space-y-3">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-amber-400 rounded-full"></div>
                        <MobileHeading level={3} className="text-sm md:text-base">Seasonal Rivers</MobileHeading>
                      </div>
                      <MobileText size="sm">Water sources that attract wildlife</MobileText>
                    </div>
                    <div className="space-y-2 md:space-y-3">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                        <MobileHeading level={3} className="text-sm md:text-base">Termite Mounds</MobileHeading>
                      </div>
                      <MobileText size="sm">Natural landmarks and ecosystem engineers</MobileText>
                    </div>
                  </div>
                </GlassWidget>
              </div>

              {/* Fun Facts */}
              <div>
                <FactCarousel
                  facts={funFacts}
                  title="Did You Know?"
                  icon={Sun}
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
                  Safari Inhabitants
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