"use client"

import React from 'react'

interface GLTFModelProps {
  modelPath: string
  position?: [number, number, number]
  scale?: [number, number, number]
  rotation?: [number, number, number]
  onClick?: () => void
}

export const GLTFModel: React.FC<GLTFModelProps> = ({ 
  modelPath, 
  position = [0, 0, 0], 
  scale = [1, 1, 1], 
  rotation = [0, 0, 0],
  onClick 
}) => {
  return (
    <div>
      <h2>GLTF Model</h2>
      <p>Component placeholder - implementation needed</p>
    </div>
  )
} 