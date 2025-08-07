"use client"

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  Mountain, 
  Cloud, 
  Wind, 
  Snowflake,
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

export default function MountainPage() {
  const animals = [
    {
      id: 'mountain-lion',
      name: 'Mountain Lion',
      description: 'Discover the elusive cougar of the high peaks',
      path: '/mountain/mountain-lion',
      gradient: 'from-gray-50 to-slate-100',
      data: {
        name: "Mountain Lion",
        scientificName: "Puma concolor",
        habitat: "Mountainous regions, forests, and rocky terrain across the Americas",
        stats: {
          weight: "130-220 lbs (males), 80-140 lbs (females)",
          height: "2-3 feet at shoulder",
          lifespan: "8-13 years in the wild",
          speed: "40-50 mph (64-80 km/h) in short bursts"
        }
      }
    },
    {
      id: 'bighorn-sheep',
      name: 'Bighorn Sheep',
      description: 'Meet the agile climbers of the rocky peaks',
      path: '/mountain/bighorn-sheep',
      gradient: 'from-brown-50 to-amber-100',
      data: {
        name: "Bighorn Sheep",
        scientificName: "Ovis canadensis",
        habitat: "Rocky mountain slopes and alpine meadows",
        stats: {
          weight: "175-300 lbs (males), 100-200 lbs (females)",
          height: "3-3.5 feet at shoulder",
          lifespan: "10-15 years in the wild",
          speed: "30 mph (48 km/h) on rough terrain"
        }
      }
    },
    {
      id: 'golden-eagle',
      name: 'Golden Eagle',
      description: 'Witness the master of the mountain skies',
      path: '/mountain/golden-eagle',
      gradient: 'from-yellow-50 to-amber-100',
      data: {
        name: "Golden Eagle",
        scientificName: "Aquila chrysaetos",
        habitat: "Mountainous regions and open landscapes worldwide",
        stats: {
          weight: "7-14 lbs",
          height: "2-3 feet tall",
          lifespan: "20-30 years in the wild",
          speed: "150 mph (240 km/h) in dives"
        }
      }
    }
  ]

  const mountainStats = [
    { icon: Mountain, label: "Elevation", value: "Up to 29,000 ft", color: "bg-gray-500" },
    { icon: Cloud, label: "Cloud Cover", value: "Frequent", color: "bg-slate-500" },
    { icon: Wind, label: "Wind Speed", value: "Up to 100 mph", color: "bg-blue-500" },
    { icon: Snowflake, label: "Snowfall", value: "Heavy", color: "bg-cyan-500" }
  ]

  const funFacts = [
    "Mountains cover 24% of Earth's land surface and are home to 15% of the world's population",
    "The highest mountain on Earth, Mount Everest, grows about 4mm taller each year",
    "Mountain ecosystems contain 80% of the world's freshwater in their glaciers and snowpack",
    "Golden eagles can spot prey from up to 2 miles away and dive at speeds over 150 mph"
  ]

  return (
    <MobileLayout>
      <main className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-stone-900 relative">
        {/* Animated background */}
        <AnimatedBackground colors={["gray", "slate", "stone"]} />

        <div className="relative z-10 container mx-auto">
          <MobileContainer>
            {/* Header */}
            <SectionHeader 
              title="Mountain Biome"
              subtitle="Explore the rugged peaks and alpine ecosystems of the world's highest places"
            />

            {/* Stats Grid */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-8 md:mb-12"
            >
              {mountainStats.map((stat, index) => (
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
              {/* Mountain Overview */}
              <div className="lg:col-span-2">
                <GlassWidget delay={0.3}>
                  <MobileHeading level={2} className="mb-4 flex items-center">
                    <Mountain className="w-5 h-5 md:w-6 md:h-6 mr-2" />
                    Mountain Overview
                  </MobileHeading>
                  <MobileText size="base" className="mb-6">
                    Mountain ecosystems are among Earth's most dramatic and challenging environments, 
                    characterized by extreme elevation changes, harsh weather conditions, and unique 
                    adaptations. These rugged landscapes create distinct zones from base to summit, 
                    each supporting specialized wildlife adapted to the altitude and climate.
                  </MobileText>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                    <div className="space-y-2 md:space-y-3">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                        <MobileHeading level={3} className="text-sm md:text-base">Alpine Zone</MobileHeading>
                      </div>
                      <MobileText size="sm">High elevation areas above tree line</MobileText>
                    </div>
                    <div className="space-y-2 md:space-y-3">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-slate-400 rounded-full"></div>
                        <MobileHeading level={3} className="text-sm md:text-base">Subalpine</MobileHeading>
                      </div>
                      <MobileText size="sm">Transition zone with stunted trees</MobileText>
                    </div>
                    <div className="space-y-2 md:space-y-3">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                        <MobileHeading level={3} className="text-sm md:text-base">Montane Forest</MobileHeading>
                      </div>
                      <MobileText size="sm">Lower slopes with dense forests</MobileText>
                    </div>
                    <div className="space-y-2 md:space-y-3">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-cyan-400 rounded-full"></div>
                        <MobileHeading level={3} className="text-sm md:text-base">Glaciers</MobileHeading>
                      </div>
                      <MobileText size="sm">Permanent ice formations at high elevations</MobileText>
                    </div>
                  </div>
                </GlassWidget>
              </div>

              {/* Fun Facts */}
              <div>
                <FactCarousel
                  facts={funFacts}
                  title="Did You Know?"
                  icon={Mountain}
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
                  Mountain Inhabitants
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