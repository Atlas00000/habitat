"use client"

import { useThree } from '@react-three/fiber'
import { useEffect, useState } from 'react'

interface CameraPositionIndicatorProps {
  show?: boolean
}

export const CameraPositionIndicator: React.FC<CameraPositionIndicatorProps> = ({
  show = false
}) => {
  const { camera } = useThree()
  const [position, setPosition] = useState({ x: 0, y: 0, z: 0 })
  const [isNearFloor, setIsNearFloor] = useState(false)

  useEffect(() => {
    const updatePosition = () => {
      setPosition({
        x: Math.round(camera.position.x * 10) / 10,
        y: Math.round(camera.position.y * 10) / 10,
        z: Math.round(camera.position.z * 10) / 10
      })
      setIsNearFloor(camera.position.y < 2.5)
    }

    const interval = setInterval(updatePosition, 100)
    return () => clearInterval(interval)
  }, [camera])

  if (!show) return null

  return (
    <div 
      style={{
        position: 'absolute',
        bottom: '20px',
        right: '20px',
        background: 'rgba(0, 0, 0, 0.7)',
        color: 'white',
        padding: '10px',
        borderRadius: '8px',
        fontSize: '12px',
        fontFamily: 'monospace',
        zIndex: 1000,
        pointerEvents: 'none'
      }}
    >
      <div style={{ marginBottom: '5px', fontWeight: 'bold' }}>
        Camera Position
      </div>
      <div style={{ color: isNearFloor ? '#ff6b6b' : '#4ecdc4' }}>
        X: {position.x} | Y: {position.y} | Z: {position.z}
      </div>
      {isNearFloor && (
        <div style={{ color: '#ff6b6b', fontSize: '10px', marginTop: '5px' }}>
          ⚠️ Near floor boundary
        </div>
      )}
    </div>
  )
} 