"use client"

import React from 'react'
import Link from 'next/link'

export default function HomePage() {
  const environments = [
    {
      id: 'arctic',
      name: 'Arctic Region',
      description: 'Explore the frozen wilderness with polar bears and ice',
      gradient: 'from-blue-50 to-blue-100',
      color: 'blue',
      path: '/arctic'
    },
    {
      id: 'forest',
      name: 'Forest Region',
      description: 'Discover lush forests with diverse wildlife',
      gradient: 'from-green-50 to-green-100',
      color: 'green',
      path: '/forest'
    },
    {
      id: 'mountain',
      name: 'Mountain Region',
      description: 'Scale the peaks and explore alpine environments',
      gradient: 'from-gray-50 to-gray-100',
      color: 'gray',
      path: '/mountain'
    },
    {
      id: 'safari',
      name: 'Safari Region',
      description: 'Experience African wildlife in their natural habitat',
      gradient: 'from-yellow-50 to-orange-100',
      color: 'orange',
      path: '/safari'
    }
  ]

  return (
    <main className="w-full h-screen bg-gradient-to-br from-purple-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8 h-full">
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold text-gray-800 mb-4">
            Environment Explorer
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose an environment to explore in immersive 3D
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {environments.map((env) => (
            <Link
              key={env.id}
              href={env.path}
              className={`group relative overflow-hidden rounded-2xl shadow-2xl transition-all duration-500 hover:scale-105 hover:shadow-3xl bg-gradient-to-br ${env.gradient}`}
            >
              <div className="aspect-square p-8 flex flex-col justify-center items-center text-center">
                <div className={`w-16 h-16 rounded-full bg-${env.color}-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <div className={`w-8 h-8 bg-${env.color}-600 rounded-full`}></div>
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-gray-900 transition-colors">
                  {env.name}
                </h2>
                <p className="text-gray-600 group-hover:text-gray-700 transition-colors">
                  {env.description}
                </p>
                <div className="mt-4 px-6 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium text-gray-700 group-hover:bg-white/30 transition-colors">
                  Explore →
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
} 