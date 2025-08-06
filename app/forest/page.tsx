"use client"

import React from 'react'
import Link from 'next/link'
import { ArcticRegionViewer } from '../../src/components/ArcticRegionViewer'

export default function ForestPage() {
  const animals = [
    {
      id: 'deer',
      name: 'White-tailed Deer',
      description: 'Explore the forest with our majestic deer',
      path: '/forest/deer',
      gradient: 'from-green-50 to-blue-100'
    },
    {
      id: 'black-bear',
      name: 'American Black Bear',
      description: 'Discover the intelligent black bear in its natural habitat',
      path: '/forest/black-bear',
      gradient: 'from-brown-50 to-green-100'
    }
  ]

  return (
    <main className="w-full h-screen bg-gradient-to-br from-green-50 to-green-100">
      <div className="w-full h-full relative">
        <ArcticRegionViewer category="forest" />
        
        {/* Animal Navigation Overlay */}
        <div className="absolute top-4 left-4 z-20 bg-white/95 backdrop-blur-md rounded-xl p-6 max-w-md shadow-2xl border border-white/30">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Forest Animals</h2>
          <div className="space-y-3">
            {animals.map((animal) => (
              <Link
                key={animal.id}
                href={animal.path}
                className={`block p-4 rounded-lg bg-gradient-to-r ${animal.gradient} hover:scale-105 transition-transform duration-300 shadow-lg border border-white/30`}
              >
                <h3 className="text-lg font-semibold text-gray-800 mb-1">
                  {animal.name}
                </h3>
                <p className="text-sm text-gray-600">
                  {animal.description}
                </p>
              </Link>
            ))}
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-200">
            <Link
              href="/"
              className="text-sm text-gray-500 hover:text-gray-700 transition-colors flex items-center"
            >
              ← Back to Environments
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
} 