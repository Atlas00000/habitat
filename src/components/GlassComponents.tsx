import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { LucideIcon } from 'lucide-react'

// Glass-like widget component with backdrop blur and transparency
export const GlassWidget = ({ 
  children, 
  className = "", 
  delay = 0,
  hover = true 
}: { 
  children: React.ReactNode
  className?: string
  delay?: number
  hover?: boolean
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay }}
    whileHover={hover ? { scale: 1.02, y: -2 } : undefined}
    className={`backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6 shadow-2xl hover:shadow-3xl transition-all duration-300 ${className}`}
  >
    {children}
  </motion.div>
)

// Stats widget with icon and value display
export const StatsWidget = ({ 
  icon: Icon, 
  label, 
  value, 
  color,
  delay = 0 
}: {
  icon: LucideIcon
  label: string
  value: string
  color: string
  delay?: number
}) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5, delay }}
    whileHover={{ scale: 1.05, y: -2 }}
    className="flex items-center space-x-3 p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300"
  >
    <div className={`p-2 rounded-lg ${color} shadow-lg`}>
      <Icon className="w-5 h-5 text-white" />
    </div>
    <div>
      <p className="text-sm text-white/70 font-medium">{label}</p>
      <p className="font-bold text-white text-lg">{value}</p>
    </div>
  </motion.div>
)

// Animated fact carousel component
export const FactCarousel = ({ 
  facts, 
  title, 
  icon: Icon,
  delay = 0 
}: {
  facts: string[]
  title: string
  icon: LucideIcon
  delay?: number
}) => {
  const [currentIndex, setCurrentIndex] = React.useState(0)

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % facts.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [facts.length])

  return (
    <GlassWidget delay={delay}>
      <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
        <Icon className="w-6 h-6 mr-2" />
        {title}
      </h2>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.5 }}
          className="h-32 flex items-center"
        >
          <p className="text-white/90 text-lg leading-relaxed">
            {facts[currentIndex]}
          </p>
        </motion.div>
      </AnimatePresence>
      
      <div className="flex space-x-2 mt-4">
        {facts.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentIndex ? 'bg-white' : 'bg-white/30'
            }`}
          />
        ))}
      </div>
    </GlassWidget>
  )
}

// Animal card with hover effects and data display
export const AnimalCard = ({ 
  animal, 
  data, 
  index,
  delay = 0 
}: {
  animal: { 
    id: string
    name: string
    description: string
    path: string
    gradient: string
  }
  data: any
  index: number
  delay?: number
}) => (
  <motion.div
    initial={{ opacity: 0, x: -50 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.6, delay: delay + index * 0.2 }}
    whileHover={{ scale: 1.02, y: -5 }}
    className="group h-full"
  >
    <a href={animal.path} className="block h-full">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 p-6 h-full hover:border-white/40 transition-all duration-300">
        <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-white">{animal.name}</h3>
            <motion.div
              initial={{ x: 0 }}
              whileHover={{ x: 5 }}
              transition={{ duration: 0.2 }}
            >
              <svg className="w-5 h-5 text-white/60 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.div>
          </div>
          
          <p className="text-white/80 mb-4">{animal.description}</p>
          
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-sm">
              <svg className="w-4 h-4 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="text-white/70">{data.habitat.split('.')[0]}...</span>
            </div>
            
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-1">
                <svg className="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <span className="text-white/70">{data.stats.lifespan.split(' ')[0]}</span>
              </div>
              <div className="flex items-center space-x-1">
                <svg className="w-4 h-4 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span className="text-white/70">{data.stats.speed.split(' ')[0]}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </a>
  </motion.div>
)

// Animated background elements component
export const AnimatedBackground = ({ 
  colors = ["green", "emerald", "blue"],
  className = "" 
}: {
  colors?: string[]
  className?: string
}) => (
  <div className={`absolute inset-0 ${className}`}>
    {colors.map((color, index) => (
      <motion.div
        key={index}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: index * 0.5 }}
        className={`absolute w-32 h-32 bg-${color}-400/20 rounded-full blur-3xl animate-pulse`}
        style={{
          top: `${20 + index * 20}%`,
          left: `${10 + index * 30}%`,
          animationDelay: `${index * 1000}ms`
        }}
      />
    ))}
  </div>
)

// Section header with animated underline
export const SectionHeader = ({ 
  title, 
  subtitle,
  delay = 0 
}: {
  title: string
  subtitle?: string
  delay?: number
}) => (
  <motion.div
    initial={{ opacity: 0, y: -50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay }}
    className="text-center mb-12"
  >
    <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
      {title}
    </h1>
    {subtitle && (
      <p className="text-xl text-white/80 max-w-2xl mx-auto">
        {subtitle}
      </p>
    )}
  </motion.div>
) 