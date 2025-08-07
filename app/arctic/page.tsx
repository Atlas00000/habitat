"use client"

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  Snowflake, 
  Thermometer, 
  Wind, 
  Sun,
  ArrowLeft
} from 'lucide-react'
import { polarBearData } from '../../src/data/polar-bear-data'
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

export default function ArcticPage() {
  const animals = [
    {
      id: 'polar-bear',
      name: 'Polar Bear',
      description: 'Discover the majestic polar bear in its frozen habitat',
      path: '/arctic/polar-bear',
      gradient: 'from-blue-50 to-white-100',
      data: polarBearData
    }
  ]

  const arcticStats = [
    { icon: Snowflake, label: "Temperature", value: "-40°F to 32°F", color: "bg-blue-500" },
    { icon: Thermometer, label: "Ice Coverage", value: "14.5M km²", color: "bg-cyan-500" },
    { icon: Wind, label: "Wind Speed", value: "Up to 60 mph", color: "bg-slate-500" },
    { icon: Sun, label: "Sunlight", value: "24h (Summer)", color: "bg-yellow-500" }
  ]

  const funFacts = [
    "The Arctic is home to the world's largest land predator - the polar bear",
    "Arctic sea ice has decreased by 13% per decade since 1979",
    "The Arctic contains 20% of the world's freshwater in its ice caps",
    "Polar bears can smell seals from up to 20 miles away"
  ]

  return (
    <MobileLayout>
      <main className="min-h-screen bg-gradient-to-br from-blue-900 via-cyan-800 to-slate-900 relative">
        {/* Animated background */}
        <AnimatedBackground colors={["blue", "cyan", "slate"]} />

        <div className="relative z-10 container mx-auto">
          <MobileContainer>
            {/* Header */}
            <SectionHeader 
              title="Arctic Biome"
              subtitle="Explore the frozen wilderness of the Arctic and its incredible inhabitants"
            />

            {/* Stats Grid */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-8 md:mb-12"
            >
              {arcticStats.map((stat, index) => (
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
              {/* Arctic Overview */}
              <div className="lg:col-span-2">
                <GlassWidget delay={0.3}>
                  <MobileHeading level={2} className="mb-4 flex items-center">
                    <Snowflake className="w-5 h-5 md:w-6 md:h-6 mr-2" />
                    Arctic Overview
                  </MobileHeading>
                  <MobileText size="base" className="mb-6">
                    The Arctic is one of Earth's most extreme environments, characterized by 
                    freezing temperatures, vast ice sheets, and unique adaptations. This 
                    frozen wilderness supports specialized wildlife that has evolved to 
                    thrive in one of the planet's harshest climates.
                  </MobileText>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                    <div className="space-y-2 md:space-y-3">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                        <MobileHeading level={3} className="text-sm md:text-base">Polar Ice Cap</MobileHeading>
                      </div>
                      <MobileText size="sm">Massive ice sheets covering the Arctic Ocean</MobileText>
                    </div>
                    <div className="space-y-2 md:space-y-3">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-cyan-400 rounded-full"></div>
                        <MobileHeading level={3} className="text-sm md:text-base">Tundra</MobileHeading>
                      </div>
                      <MobileText size="sm">Treeless plains with permafrost soil</MobileText>
                    </div>
                    <div className="space-y-2 md:space-y-3">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-slate-400 rounded-full"></div>
                        <MobileHeading level={3} className="text-sm md:text-base">Pack Ice</MobileHeading>
                      </div>
                      <MobileText size="sm">Floating sea ice that forms and melts seasonally</MobileText>
                    </div>
                    <div className="space-y-2 md:space-y-3">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-white rounded-full"></div>
                        <MobileHeading level={3} className="text-sm md:text-base">Glaciers</MobileHeading>
                      </div>
                      <MobileText size="sm">Massive ice formations that slowly flow</MobileText>
                    </div>
                  </div>
                </GlassWidget>
              </div>

              {/* Fun Facts */}
              <div>
                <FactCarousel
                  facts={funFacts}
                  title="Did You Know?"
                  icon={Snowflake}
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
                  Arctic Inhabitants
                </MobileHeading>
                <div className="grid md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 gap-4 md:gap-6 max-w-2xl mx-auto">
                  {animals.map((animal, index) => (
                    <AnimalCard
                      key={animal.id}
                      animal={animal}
                      data={animal.data}
                      index={index}
                      delay={0.7}
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