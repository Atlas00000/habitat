"use client"

import { useFrame, useThree } from '@react-three/fiber'
import { Vector3 } from 'three'

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
    // Convert target array to Vector3
    const targetVector = new Vector3(target[0], target[1], target[2])
    
    // Calculate distance from target
    const distance = camera.position.distanceTo(targetVector)
    
    // Enforce minimum and maximum distance
    if (distance < minDistance) {
      const direction = camera.position.clone().sub(targetVector).normalize()
      camera.position.copy(targetVector.clone().add(direction.multiplyScalar(minDistance)))
    } else if (distance > maxDistance) {
      const direction = camera.position.clone().sub(targetVector).normalize()
      camera.position.copy(targetVector.clone().add(direction.multiplyScalar(maxDistance)))
    }
    
    // Enforce Y bounds (prevent going under floor)
    if (camera.position.y < minY) {
      camera.position.y = minY
    } else if (camera.position.y > maxY) {
      camera.position.y = maxY
    }
    
    // Ensure camera always looks at target
    camera.lookAt(targetVector)
  })

  return null
} 