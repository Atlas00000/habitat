"use client"

import React from 'react'
import Link from 'next/link'
import { ArrowLeft, MapPin, Users, Calendar, Heart } from 'lucide-react'

const coastalAnimals = [
  {
    name: "Harbor Seal",
    scientificName: "Phoca vitulina",
    habitat: "Coastal waters and rocky shores",
    description: "A common seal species found in temperate and Arctic coastal waters.",
    image: "🦭",
    path: "/coastal/harbor-seal"
  },
  {
    name: "Humpback Whale",
    scientificName: "Megaptera novaeangliae",
    habitat: "Open ocean and coastal waters",
    description: "Known for their spectacular breaching and complex songs.",
    image: "🐋",
    path: "/coastal/humpback-whale"
  },
  {
    name: "Seagull",
    scientificName: "Larus spp.",
    habitat: "Coastal areas and inland waters",
    description: "Adaptable seabirds found worldwide in coastal regions.",
    image: "🕊️",
    path: "/coastal/seagull"
  },
  {
    name: "Atlantic Cod",
    scientificName: "Gadus morhua",
    habitat: "North Atlantic coastal waters",
    description: "A commercially important fish species in the North Atlantic.",
    image: "🐟",
    path: "/coastal/atlantic-cod"
  }
]

export default function CoastalPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-cyan-800 to-teal-700">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-900/80 to-cyan-800/80 backdrop-blur-xl border-b border-white/20">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="text-4xl">🐳</div>
              <div>
                <h1 className="text-3xl font-bold text-white">Coastal Waters</h1>
                <p className="text-cyan-200">Marine Life & Ocean Ecosystems</p>
              </div>
            </div>
            <Link 
              href="/"
              className="flex items-center space-x-2 bg-white/10 backdrop-blur-md text-white px-4 py-2 rounded-lg hover:bg-white/20 transition-all duration-300"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Map</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Region Overview */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 mb-8 border border-white/20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center space-x-3">
              <MapPin className="w-6 h-6 text-cyan-300" />
              <div>
                <h3 className="text-white font-semibold">Location</h3>
                <p className="text-cyan-200 text-sm">Coastal Waters Worldwide</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Users className="w-6 h-6 text-cyan-300" />
              <div>
                <h3 className="text-white font-semibold">Species Count</h3>
                <p className="text-cyan-200 text-sm">4 Marine Species</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Calendar className="w-6 h-6 text-cyan-300" />
              <div>
                <h3 className="text-white font-semibold">Best Time</h3>
                <p className="text-cyan-200 text-sm">Year-round</p>
              </div>
            </div>
          </div>
        </div>

        {/* Marine Life Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {coastalAnimals.map((animal, index) => (
            <div 
              key={animal.name}
              className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 cursor-pointer group"
              onClick={() => window.location.href = animal.path}
            >
              <div className="text-4xl mb-4 text-center">{animal.image}</div>
              <h3 className="text-white font-bold text-lg mb-2">{animal.name}</h3>
              <p className="text-cyan-200 text-sm italic mb-2">{animal.scientificName}</p>
              <p className="text-white/80 text-sm mb-3">{animal.description}</p>
              <div className="flex items-center space-x-2 text-cyan-300 text-sm">
                <MapPin className="w-4 h-4" />
                <span>{animal.habitat}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Conservation Section */}
        <div className="mt-12 bg-gradient-to-r from-blue-800/50 to-cyan-700/50 backdrop-blur-md rounded-2xl p-8 border border-white/20">
          <div className="flex items-center space-x-3 mb-6">
            <Heart className="w-6 h-6 text-red-400" />
            <h2 className="text-2xl font-bold text-white">Marine Conservation</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-white font-semibold mb-3">Current Threats</h3>
              <ul className="text-cyan-200 space-y-2">
                <li>• Ocean pollution and plastic waste</li>
                <li>• Overfishing and bycatch</li>
                <li>• Climate change and ocean acidification</li>
                <li>• Habitat destruction</li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-3">Conservation Efforts</h3>
              <ul className="text-cyan-200 space-y-2">
                <li>• Marine protected areas</li>
                <li>• Sustainable fishing practices</li>
                <li>• Plastic reduction initiatives</li>
                <li>• Ocean cleanup programs</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
