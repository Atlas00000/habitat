import React from 'react'

interface BearPawIconProps {
  size?: number
  color?: string
  className?: string
}

export const BearPawIcon: React.FC<BearPawIconProps> = ({ 
  size = 24, 
  color = "currentColor",
  className = ""
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Main paw pad */}
      <ellipse
        cx="12"
        cy="16"
        rx="4"
        ry="3"
        fill={color}
        opacity="0.8"
      />
      {/* Toe pads */}
      <circle cx="8" cy="10" r="2" fill={color} opacity="0.9" />
      <circle cx="12" cy="8" r="2" fill={color} opacity="0.9" />
      <circle cx="16" cy="10" r="2" fill={color} opacity="0.9" />
      <circle cx="10" cy="6" r="1.5" fill={color} opacity="0.9" />
      <circle cx="14" cy="6" r="1.5" fill={color} opacity="0.9" />
    </svg>
  )
}

export const BearPawPrint: React.FC<BearPawIconProps> = ({ 
  size = 32, 
  color = "#8B4513",
  className = ""
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Main paw pad with shadow */}
      <ellipse
        cx="16"
        cy="22"
        rx="5"
        ry="4"
        fill={color}
        opacity="0.7"
      />
      <ellipse
        cx="16"
        cy="22"
        rx="4"
        ry="3"
        fill={color}
        opacity="0.9"
      />
      {/* Toe pads with shadows */}
      <circle cx="11" cy="13" r="2.5" fill={color} opacity="0.6" />
      <circle cx="11" cy="13" r="2" fill={color} opacity="0.9" />
      
      <circle cx="16" cy="10" r="2.5" fill={color} opacity="0.6" />
      <circle cx="16" cy="10" r="2" fill={color} opacity="0.9" />
      
      <circle cx="21" cy="13" r="2.5" fill={color} opacity="0.6" />
      <circle cx="21" cy="13" r="2" fill={color} opacity="0.9" />
      
      <circle cx="13" cy="7" r="2" fill={color} opacity="0.6" />
      <circle cx="13" cy="7" r="1.5" fill={color} opacity="0.9" />
      
      <circle cx="19" cy="7" r="2" fill={color} opacity="0.6" />
      <circle cx="19" cy="7" r="1.5" fill={color} opacity="0.9" />
    </svg>
  )
}

export const BearClawIcon: React.FC<BearPawIconProps> = ({ 
  size = 20, 
  color = "#654321",
  className = ""
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Claw shape */}
      <path
        d="M10 2 L12 8 L10 14 L8 8 Z"
        fill={color}
        opacity="0.8"
      />
      <path
        d="M6 4 L8 10 L6 16 L4 10 Z"
        fill={color}
        opacity="0.8"
      />
      <path
        d="M14 4 L16 10 L14 16 L12 10 Z"
        fill={color}
        opacity="0.8"
      />
    </svg>
  )
}
