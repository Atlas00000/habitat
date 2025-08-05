"use client"

import { useFrame, useThree } from '@react-three/fiber'
import { useEffect } from 'react'

interface CameraBoundsProps {
  minY?: number
  maxY?: number
  minDistance?: number
  maxDistance?: number
  target?: [number, number, number]
}

export const CameraBounds: React.FC<CameraBoundsProps> = ({
  minY = 1.5, // Minimum height above ground
  maxY = 15, // Maximum height
  minDistance = 3, // Minimum distance from target
  maxDistance = 20, // Maximum distance from target
  target = [0, 1, 0] // Target point to orbit around
}) => {
  const { camera } = useThree()

  useFrame(() => {
    // Calculate distance from target
    const distance = camera.position.distanceTo(camera.getWorldDirection(camera.position.clone().sub(target)))
    
    // Enforce minimum and maximum distance
    if (distance < minDistance) {
      const direction = camera.position.clone().sub(target).normalize()
      camera.position.copy(target.clone().add(direction.multiplyScalar(minDistance)))
    } else if (distance > maxDistance) {
      const direction = camera.position.clone().sub(target).normalize()
      camera.position.copy(target.clone().add(direction.multiplyScalar(maxDistance)))
    }
    
    // Enforce Y bounds (prevent going under floor)
    if (camera.position.y < minY) {
      camera.position.y = minY
    } else if (camera.position.y > maxY) {
      camera.position.y = maxY
    }
    
    // Ensure camera always looks at target
    camera.lookAt(target[0], target[1], target[2])
  })

  return null
} 