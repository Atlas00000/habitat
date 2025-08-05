"use client"

import { useThree } from '@react-three/fiber'
import { useEffect, useState } from 'react'

interface BoundaryIndicatorProps {
  show?: boolean
  size?: number
}

export const BoundaryIndicator: React.FC<BoundaryIndicatorProps> = ({
  show = false,
  size = 20
}) => {
  const { camera } = useThree()
  const [isNearBoundary, setIsNearBoundary] = useState(false)

  useEffect(() => {
    const checkBoundary = () => {
      const distance = camera.position.length()
      const nearBoundary = distance > size * 0.8 || camera.position.y < 2
      setIsNearBoundary(nearBoundary)
    }

    const interval = setInterval(checkBoundary, 100)
    return () => clearInterval(interval)
  }, [camera, size])

  if (!show || !isNearBoundary) return null

  return (
    <group>
      {/* Subtle boundary warning */}
      <mesh position={[0, 0, 0]} visible={false}>
        <ringGeometry args={[size - 0.5, size, 32]} />
        <meshBasicMaterial 
          color="#ff4444" 
          transparent 
          opacity={0.3}
          wireframe
        />
      </mesh>
    </group>
  )
} 