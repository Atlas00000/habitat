"use client"

import React from 'react'

interface LoadingSpinnerProps {
  size?: number
  color?: string
  message?: string
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 2,
  color = "#3B82F6",
  message = "Loading model..."
}) => {
  return (
    <group>
      {/* Simple rotating cube as loading indicator */}
      <mesh>
        <boxGeometry args={[size, size, size]} />
        <meshStandardMaterial color={color} />
      </mesh>
      
             {/* Optional: Add text label */}
       {message && (
         <group position={[0, -size - 0.5, 0]}>
           <mesh>
             <planeGeometry args={[size * 4, 0.5]} />
             <meshBasicMaterial color="#000000" transparent opacity={0.5} />
           </mesh>
         </group>
       )}
    </group>
  )
}

// Alternative: Simple spinning ring
export const RingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 2,
  color = "#3B82F6",
  message = "Loading model..."
}) => {
  return (
    <group>
      <mesh>
        <ringGeometry args={[size * 0.8, size, 32]} />
        <meshBasicMaterial color={color} side={2} />
      </mesh>
    </group>
  )
} 