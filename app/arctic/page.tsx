"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  Snowflake, 
  Thermometer, 
  Wind, 
  Sun,
  ArrowLeft,
  Star,
  Zap
} from 'lucide-react'
import { polarBearData } from '../../src/data/polar-bear-data'
import { 
  MobileLayout, 
  MobileContainer
} from '../../src/components/MobileLayout'

export default function ArcticPage() {
  const [selectedFact, setSelectedFact] = useState<number | null>(null)
  const [hoveredStat, setHoveredStat] = useState<string | null>(null)
  const [isExploring, setIsExploring] = useState(false)

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
    { icon: Snowflake, label: "Temperature", value: "-40°F to 32°F", color: "bg-blue-500", detail: "Extreme cold with seasonal variations" },
    { icon: Thermometer, label: "Ice Coverage", value: "14.5M km²", color: "bg-cyan-500", detail: "Massive ice sheets covering Arctic Ocean" },
    { icon: Wind, label: "Wind Speed", value: "Up to 60 mph", color: "bg-slate-500", detail: "Fierce winds across open ice" },
    { icon: Sun, label: "Sunlight", value: "24h (Summer)", color: "bg-yellow-500", detail: "Polar day and night cycles" }
  ]

  return (
    <MobileLayout>
      <main className="min-h-screen bg-gradient-to-br from-blue-900 via-cyan-800 to-slate-900 relative">
        {/* Background */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-cyan-800 to-slate-900" />
        </div>

        <div className="relative z-10 container mx-auto">
          <MobileContainer>
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-8"
            >
                              <motion.h1 
                  className="text-3xl font-bold text-white"
                  whileHover={{ scale: 1.05 }}
                >
                  Arctic Biome 🧊
                </motion.h1>
              <motion.p 
                className="text-blue-200 text-lg max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Explore the frozen wilderness of the Arctic and its incredible inhabitants
              </motion.p>
            </motion.div>

            {/* Stats Grid */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-8 md:mb-12"
            >
              {arcticStats.map((stat, index) => (
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
                  whileHover={{ 
                    scale: 1.05,
                    y: -5,
                    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)"
                  }}
                  onHoverStart={() => setHoveredStat(stat.label)}
                  onHoverEnd={() => setHoveredStat(null)}
                  className="bg-white/10 backdrop-blur-xl rounded-xl p-4 border border-white/20 shadow-lg cursor-pointer transition-all duration-300"
                >
                  <div className="flex items-center space-x-3">
                    <motion.div 
                      className={`w-10 h-10 rounded-lg ${stat.color} flex items-center justify-center`}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <stat.icon className="w-5 h-5 text-white" />
                    </motion.div>
                    <div>
                      <div className="text-sm text-blue-200 font-medium">{stat.label}</div>
                      <div className="text-lg font-bold text-white">{stat.value}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

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
                whileHover={{ scale: 1.02, boxShadow: "0 25px 50px rgba(0, 0, 0, 0.3)" }}
              >
                <motion.h2
                  className="text-2xl font-bold text-white mb-6 text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 1.9 }}
                >
                  Arctic Inhabitants
                </motion.h2>
                <div className="grid md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 gap-4 md:gap-6 max-w-2xl mx-auto">
                  {animals.map((animal, index) => (
                    <motion.div
                      key={animal.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 2.0 + index * 0.2 }}
                      whileHover={{ 
                        scale: 1.05,
                        boxShadow: "0 15px 35px rgba(0, 0, 0, 0.3)"
                      }}
                      className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 cursor-pointer group"
                      onClick={() => window.location.href = animal.path}
                    >
                      <div className="flex items-center space-x-4">
                        <motion.div 
                          className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center"
                          whileHover={{ scale: 1.1, rotate: 360 }}
                          transition={{ duration: 0.6 }}
                        >
                          <span className="text-2xl">🐻‍❄️</span>
                        </motion.div>
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-white mb-1 group-hover:text-blue-300 transition-colors">
                            {animal.name}
                          </h3>
                          <p className="text-blue-200 text-sm group-hover:text-blue-100 transition-colors">
                            {animal.description}
                          </p>
                        </div>
                        <motion.div
                          whileHover={{ x: 5, rotate: 180 }}
                          transition={{ duration: 0.3 }}
                          className="flex items-center space-x-2"
                        >
                          <ArrowLeft className="w-5 h-5 text-blue-300 rotate-180" />
                          <motion.div
                            animate={{ opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            <Zap className="w-4 h-4 text-blue-400" />
                          </motion.div>
                        </motion.div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            {/* Arctic Ecosystem Section */}
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
                  Arctic Ecosystem ❄️
                </motion.h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 2.8 }}
                    className="space-y-4"
                  >
                    <div className="bg-blue-500/20 backdrop-blur-sm rounded-lg p-4 border border-blue-400/30">
                      <h3 className="text-lg font-bold text-white mb-2">🧊 Sea Ice</h3>
                      <p className="text-blue-200 text-sm leading-relaxed">
                        Sea ice provides critical habitat for polar bears, seals, and other Arctic wildlife, serving as hunting platforms and breeding grounds.
                      </p>
                    </div>
                    <div className="bg-cyan-500/20 backdrop-blur-sm rounded-lg p-4 border border-cyan-400/30">
                      <h3 className="text-lg font-bold text-white mb-2">🌊 Arctic Ocean</h3>
                      <p className="text-cyan-200 text-sm leading-relaxed">
                        The Arctic Ocean is home to unique marine life adapted to extreme cold, including whales, walruses, and Arctic fish species.
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
                      <h3 className="text-lg font-bold text-white mb-2">🏔️ Tundra</h3>
                      <p className="text-slate-200 text-sm leading-relaxed">
                        The treeless tundra supports hardy plants and provides summer grazing for caribou and other herbivores.
                      </p>
                    </div>
                    <div className="bg-indigo-500/20 backdrop-blur-sm rounded-lg p-4 border border-indigo-400/30">
                      <h3 className="text-lg font-bold text-white mb-2">🌌 Aurora</h3>
                      <p className="text-indigo-200 text-sm leading-relaxed">
                        The Northern Lights create spectacular displays in the Arctic sky, visible during long winter nights.
                      </p>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>

            {/* Arctic Challenges Section */}
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
                  Arctic Challenges 🌍
                </motion.h2>
                <div className="grid md:grid-cols-3 gap-4">
                  {[
                    { icon: "🌡️", title: "Climate Change", desc: "Rapid warming affecting sea ice and wildlife habitats" },
                    { icon: "🏭", title: "Pollution", desc: "Industrial contaminants reaching remote Arctic regions" },
                    { icon: "🛢️", title: "Resource Extraction", desc: "Oil and gas development impacting pristine areas" },
                    { icon: "🚢", title: "Shipping", desc: "Increased vessel traffic through melting sea ice" },
                    { icon: "🎣", title: "Overfishing", desc: "Commercial fishing affecting Arctic marine ecosystems" },
                    { icon: "🏠", title: "Indigenous Rights", desc: "Protecting traditional ways of life and lands" }
                  ].map((challenge, index) => (
                    <motion.div
                      key={challenge.title}
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
                          transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                        >
                          {challenge.icon}
                        </motion.div>
                        <h3 className="text-sm font-bold text-white mb-2">{challenge.title}</h3>
                        <p className="text-xs text-blue-200 leading-relaxed">{challenge.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            {/* Arctic Research Section */}
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
                  Arctic Research & Discovery 🔬
                </motion.h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 4.6 }}
                    className="space-y-4"
                  >
                    <div className="bg-blue-500/20 backdrop-blur-sm rounded-lg p-4 border border-blue-400/30">
                      <h3 className="text-lg font-bold text-white mb-2">🔬 Scientific Research</h3>
                      <p className="text-blue-200 text-sm leading-relaxed">
                        Research stations study climate change, wildlife behavior, and Arctic ecosystems to understand global environmental changes.
                      </p>
                    </div>
                    <div className="bg-cyan-500/20 backdrop-blur-sm rounded-lg p-4 border border-cyan-400/30">
                      <h3 className="text-lg font-bold text-white mb-2">📡 Technology</h3>
                      <p className="text-cyan-200 text-sm leading-relaxed">
                        Advanced monitoring systems track sea ice, wildlife movements, and environmental conditions in real-time.
                      </p>
                    </div>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 4.8 }}
                    className="space-y-4"
                  >
                    <div className="bg-slate-500/20 backdrop-blur-sm rounded-lg p-4 border border-slate-400/30">
                      <h3 className="text-lg font-bold text-white mb-2">🌍 Indigenous Knowledge</h3>
                      <p className="text-slate-200 text-sm leading-relaxed">
                        Traditional knowledge from Arctic communities provides valuable insights into environmental changes and wildlife behavior.
                      </p>
                    </div>
                    <div className="bg-indigo-500/20 backdrop-blur-sm rounded-lg p-4 border border-indigo-400/30">
                      <h3 className="text-lg font-bold text-white mb-2">🚁 Exploration</h3>
                      <p className="text-indigo-200 text-sm leading-relaxed">
                        Modern explorers use technology to map uncharted areas and discover new species in the remote Arctic wilderness.
                      </p>
                    </div>
                  </motion.div>
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