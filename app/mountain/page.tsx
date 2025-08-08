"use client"

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  Mountain, 
  Thermometer, 
  Wind, 
  Sun,
  ArrowLeft
} from 'lucide-react'
import { mountainGoatData } from '../../src/data/mountain-goat-data'
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
      id: 'mountain-goat',
      name: 'Mountain Goat',
      description: 'Discover the agile mountain goat in its rocky habitat',
      path: '/mountain/mountain-goat',
      gradient: 'from-gray-50 to-slate-100',
      data: mountainGoatData
    }
  ]

  const mountainStats = [
    { icon: Mountain, label: "Elevation", value: "6,000-14,000 ft", color: "bg-gray-500" },
    { icon: Thermometer, label: "Temperature", value: "-40°F to 70°F", color: "bg-blue-500" },
    { icon: Wind, label: "Wind Speed", value: "Up to 100 mph", color: "bg-slate-500" },
    { icon: Sun, label: "Sunlight", value: "Intense UV", color: "bg-yellow-500" }
  ]

  const funFacts = [
    "Mountains cover 24% of Earth's land surface",
    "The highest mountain is Mount Everest at 29,029 ft",
    "Mountain air contains 40% less oxygen than sea level",
    "Mountains are formed by tectonic plate movements"
  ]

  return (
    <MobileLayout>
      <main className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-blue-900 relative">
        {/* Enhanced Animated Background */}
        <div className="fixed inset-0 pointer-events-none">
          {/* Base gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-slate-800 to-blue-900" />
          
          {/* Animated mesh gradient overlay */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-gray-400/10 via-slate-400/10 to-blue-400/10 animate-pulse" />
            <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-gray-300/5 to-slate-300/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
            <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-gradient-to-br from-blue-300/5 to-gray-300/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
          </div>

          {/* Floating Snow Particles */}
          {Array.from({ length: 15 }).map((_, i) => {
            // Use deterministic positioning based on index to avoid hydration mismatch
            const left = (i * 6.67) % 100
            const top = (i * 4) % 100
            const duration = 7 + (i % 4)
            const delay = (i % 4)
            
            return (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white/50 rounded-full"
                style={{
                  left: `${left}%`,
                  top: `${top}%`,
                }}
                animate={{
                  y: [0, -35, 0],
                  opacity: [0.5, 1, 0.5],
                  scale: [1, 2, 1],
                }}
                transition={{
                  duration,
                  repeat: Infinity,
                  delay,
                  ease: "easeInOut",
                }}
              />
            )
          })}
          
          {/* Enhanced Light Rays */}
          <div className="absolute inset-0 opacity-40">
            <motion.div 
              className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-white/40 to-transparent"
              animate={{ opacity: [0.4, 0.9, 0.4] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div 
              className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-slate-300/30 to-transparent"
              animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 6, repeat: Infinity, delay: 1, ease: "easeInOut" }}
            />
            <motion.div 
              className="absolute top-0 left-2/3 w-px h-full bg-gradient-to-b from-transparent via-blue-300/20 to-transparent"
              animate={{ opacity: [0.2, 0.6, 0.2] }}
              transition={{ duration: 7, repeat: Infinity, delay: 2, ease: "easeInOut" }}
            />
          </div>
        </div>

        <div className="relative z-10 container mx-auto">
          <MobileContainer>
            {/* Enhanced Header */}
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-8"
            >
              <motion.div
                className="flex items-center justify-center space-x-3 mb-4"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <motion.div
                  className="w-12 h-12 bg-gray-500/20 backdrop-blur-xl rounded-full flex items-center justify-center border border-gray-400/30"
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <Mountain className="w-6 h-6 text-gray-300" />
                </motion.div>
                <h1 className="text-3xl font-bold text-white">Mountain Biome 🏔️</h1>
              </motion.div>
              <p className="text-gray-200 text-lg max-w-2xl mx-auto">
                Explore the rugged mountain peaks and their resilient wildlife
              </p>
            </motion.div>

            {/* Enhanced Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-8 md:mb-12"
        >
          {mountainStats.map((stat, index) => (
                <motion.div
              key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: 0.5 + index * 0.1,
                    type: "spring",
                    stiffness: 100
                  }}
                  whileHover={{ scale: 1.05 }}
                  className="bg-white/10 backdrop-blur-xl rounded-xl p-4 border border-white/20 shadow-lg"
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-lg ${stat.color} flex items-center justify-center`}>
                      <stat.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-200 font-medium">{stat.label}</div>
                      <div className="text-lg font-bold text-white">{stat.value}</div>
                    </div>
                  </div>
                </motion.div>
          ))}
        </motion.div>

        {/* Main content grid */}
            <div className="grid lg:grid-cols-3 gap-6 md:gap-8 mb-8 md:mb-12">
          {/* Mountain Overview */}
          <div className="lg:col-span-2">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-lg"
                >
                  <motion.div
                    className="flex items-center space-x-3 mb-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                  >
                    <motion.div
                      className="w-10 h-10 bg-gray-500/20 rounded-lg flex items-center justify-center"
                      whileHover={{ scale: 1.1 }}
                    >
                      <Mountain className="w-5 h-5 text-gray-300" />
                    </motion.div>
                    <h2 className="text-2xl font-bold text-white">Mountain Overview</h2>
                  </motion.div>
                  
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 1.0 }}
                    className="text-gray-200 mb-6 leading-relaxed"
                  >
                    Mountains are among Earth's most dramatic landscapes, characterized by 
                    steep slopes, thin air, and extreme weather conditions. These rugged 
                    environments support specialized wildlife that has evolved unique 
                    adaptations to survive in these challenging conditions.
                  </motion.p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                    {[
                      { color: "bg-gray-400", title: "Alpine Zone", desc: "High elevation areas above tree line" },
                      { color: "bg-slate-400", title: "Subalpine", desc: "Transition zone between forest and alpine" },
                      { color: "bg-stone-400", title: "Rocky Slopes", desc: "Steep terrain with exposed rock faces" },
                      { color: "bg-blue-400", title: "Glacial Areas", desc: "Permanent ice and snow fields" }
                    ].map((item, index) => (
                      <motion.div
                        key={item.title}
                        className="space-y-2 md:space-y-3"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 1.2 + index * 0.1 }}
                      >
                  <div className="flex items-center space-x-2">
                          <div className={`w-3 h-3 ${item.color} rounded-full`}></div>
                          <h3 className="text-sm md:text-base font-semibold text-white">{item.title}</h3>
                  </div>
                        <p className="text-sm text-gray-200">{item.desc}</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
          </div>

          {/* Fun Facts */}
          <div>
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.9 }}
                  className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-lg h-fit"
                >
                  <motion.div
                    className="flex items-center space-x-3 mb-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 1.1 }}
                  >
                    <motion.div
                      className="w-10 h-10 bg-gray-500/20 rounded-lg flex items-center justify-center"
                      whileHover={{ scale: 1.1 }}
                    >
                      <Mountain className="w-5 h-5 text-gray-300" />
                    </motion.div>
                    <h3 className="text-xl font-bold text-white">Did You Know?</h3>
                  </motion.div>
                  
                  <div className="space-y-4">
                    {funFacts.map((fact, index) => (
                      <motion.div
                        key={index}
                        className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/10"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 1.3 + index * 0.1 }}
                        whileHover={{ scale: 1.02, backgroundColor: "rgba(255, 255, 255, 0.15)" }}
                      >
                        <p className="text-sm text-gray-200 leading-relaxed">{fact}</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
          </div>
        </div>

        {/* Animals Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.5 }}
            >
              <motion.div
                className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-lg"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 1.7 }}
              >
                <motion.h2
                  className="text-2xl font-bold text-white mb-6 text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 1.9 }}
                >
              Mountain Inhabitants
                </motion.h2>
                <div className="grid md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 gap-4 md:gap-6 max-w-2xl mx-auto">
              {animals.map((animal, index) => (
                    <motion.div
                  key={animal.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 2.0 + index * 0.2 }}
                      whileHover={{ scale: 1.02 }}
                      className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 cursor-pointer"
                      onClick={() => window.location.href = animal.path}
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 bg-gray-500/20 rounded-full flex items-center justify-center">
                          <span className="text-2xl">🐐</span>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-white mb-1">{animal.name}</h3>
                          <p className="text-gray-200 text-sm">{animal.description}</p>
                        </div>
                        <motion.div
                          whileHover={{ x: 5 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ArrowLeft className="w-5 h-5 text-gray-300 rotate-180" />
                        </motion.div>
                      </div>
                    </motion.div>
              ))}
            </div>
              </motion.div>
        </motion.div>

        {/* Mountain Geology Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.2 }}
          className="mt-8"
        >
          <motion.div
            className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-lg"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 2.4 }}
            whileHover={{ scale: 1.02, boxShadow: "0 25px 50px rgba(0, 0, 0, 0.3)" }}
          >
            <motion.h2
              className="text-2xl font-bold text-white mb-6 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 2.6 }}
            >
              Mountain Geology 🏔️
            </motion.h2>
            <div className="grid md:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 2.8 }}
                className="space-y-4"
              >
                <div className="bg-gray-500/20 backdrop-blur-sm rounded-lg p-4 border border-gray-400/30">
                  <h3 className="text-lg font-bold text-white mb-2">🌋 Volcanic Mountains</h3>
                  <p className="text-gray-200 text-sm leading-relaxed">
                    Formed by volcanic activity, these mountains are built up from layers of lava, ash, and other volcanic materials.
                  </p>
                </div>
                <div className="bg-blue-500/20 backdrop-blur-sm rounded-lg p-4 border border-blue-400/30">
                  <h3 className="text-lg font-bold text-white mb-2">⛰️ Fold Mountains</h3>
                  <p className="text-blue-200 text-sm leading-relaxed">
                    Created by tectonic plate collisions, these mountains form when Earth's crust is compressed and folded.
                  </p>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 3.0 }}
                className="space-y-4"
              >
                <div className="bg-slate-500/20 backdrop-blur-sm rounded-lg p-4 border border-slate-400/30">
                  <h3 className="text-lg font-bold text-white mb-2">🗻 Block Mountains</h3>
                  <p className="text-slate-200 text-sm leading-relaxed">
                    Formed when large blocks of Earth's crust are uplifted along fault lines, creating steep, rugged peaks.
                  </p>
                </div>
                <div className="bg-indigo-500/20 backdrop-blur-sm rounded-lg p-4 border border-indigo-400/30">
                  <h3 className="text-lg font-bold text-white mb-2">🏔️ Dome Mountains</h3>
                  <p className="text-indigo-200 text-sm leading-relaxed">
                    Created when magma pushes up but doesn't break through the surface, forming rounded mountain peaks.
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* Mountain Climate Zones Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 3.2 }}
          className="mt-8"
        >
          <motion.div
            className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-lg"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 3.4 }}
            whileHover={{ scale: 1.02, boxShadow: "0 25px 50px rgba(0, 0, 0, 0.3)" }}
          >
            <motion.h2
              className="text-2xl font-bold text-white mb-6 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 3.6 }}
            >
              Mountain Climate Zones 🌡️
            </motion.h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { icon: "🌱", title: "Base Zone", desc: "Warm temperatures, diverse vegetation, and abundant wildlife" },
                { icon: "🌲", title: "Forest Zone", desc: "Cooler temperatures, coniferous forests, and mountain wildlife" },
                { icon: "🌿", title: "Alpine Zone", desc: "Cold temperatures, hardy plants, and specialized animals" },
                { icon: "❄️", title: "Summit Zone", desc: "Extreme cold, minimal vegetation, and snow-covered peaks" }
              ].map((zone, index) => (
                <motion.div
                  key={zone.title}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: 3.8 + index * 0.1,
                    type: "spring",
                    stiffness: 100
                  }}
                  whileHover={{ 
                    scale: 1.05,
                    y: -5,
                    boxShadow: "0 15px 35px rgba(0, 0, 0, 0.3)"
                  }}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 cursor-pointer group"
                >
                  <div className="text-center">
                    <motion.div 
                      className="text-3xl mb-3"
                      animate={{ y: [0, -3, 0] }}
                      transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                    >
                      {zone.icon}
                    </motion.div>
                    <h3 className="text-sm font-bold text-white mb-2">{zone.title}</h3>
                    <p className="text-xs text-gray-200 leading-relaxed">{zone.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Mountain Activities Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 4.0 }}
          className="mt-8"
        >
          <motion.div
            className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-lg"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 4.2 }}
            whileHover={{ scale: 1.02, boxShadow: "0 25px 50px rgba(0, 0, 0, 0.3)" }}
          >
            <motion.h2
              className="text-2xl font-bold text-white mb-6 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 4.4 }}
            >
              Mountain Adventures 🏃‍♂️
            </motion.h2>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                { icon: "🏔️", title: "Climbing", desc: "Scale peaks and test your limits" },
                { icon: "⛷️", title: "Skiing", desc: "Glide down snowy mountain slopes" },
                { icon: "🚶‍♂️", title: "Hiking", desc: "Explore mountain trails and scenic views" },
                { icon: "🏕️", title: "Camping", desc: "Experience mountain nights under the stars" },
                { icon: "📸", title: "Photography", desc: "Capture breathtaking mountain landscapes" },
                { icon: "🧗", title: "Rock Climbing", desc: "Challenge yourself on vertical rock faces" }
              ].map((activity, index) => (
                <motion.div
                  key={activity.title}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: 4.6 + index * 0.1,
                    type: "spring",
                    stiffness: 100
                  }}
                  whileHover={{ 
                    scale: 1.05,
                    y: -5,
                    boxShadow: "0 15px 35px rgba(0, 0, 0, 0.3)"
                  }}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 cursor-pointer group"
                >
                  <div className="text-center">
                    <motion.div 
                      className="text-3xl mb-3"
                      animate={{ y: [0, -3, 0] }}
                      transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                    >
                      {activity.icon}
                    </motion.div>
                    <h3 className="text-sm font-bold text-white mb-2">{activity.title}</h3>
                    <p className="text-xs text-gray-200 leading-relaxed">{activity.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Back to environments */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 2.5 }}
              className="text-center mt-8 md:mt-12"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
        >
          <Link
            href="/"
                  className="inline-flex items-center space-x-2 text-emerald-200 hover:text-emerald-100 transition-colors group bg-white/10 backdrop-blur-sm px-6 py-3 rounded-lg border border-white/20"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Environments</span>
          </Link>
        </motion.div>
            </motion.div>
          </MobileContainer>
      </div>
    </main>
    </MobileLayout>
  )
} 