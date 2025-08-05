"use client"

import React from 'react'
import { Animal } from '../data/polar-bear-data'

interface SceneViewportProps {
  selectedAnimal: Animal
  onAnimalSelect: (animal: Animal) => void
}

export const SceneViewport: React.FC<SceneViewportProps> = ({ selectedAnimal, onAnimalSelect }) => {
  return (
    <div>
      <h2>Scene Viewport</h2>
      <p>Component placeholder - implementation needed</p>
    </div>
  )
} 