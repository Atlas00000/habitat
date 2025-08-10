import React from 'react'
import { motion } from 'framer-motion'
import { BearPawPrint } from './BearPawIcon'

export const BearBackgroundElements: React.FC = React.memo(() => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Optimized animated paw prints trail */}
      <div className="absolute top-20 left-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 1.5, delay: 0 }}
        >
          <BearPawPrint size={48} color="#8B4513" />
        </motion.div>
      </div>
      
      <div className="absolute top-40 right-20">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.08 }}
          transition={{ duration: 1.5, delay: 0.3 }}
        >
          <BearPawPrint size={36} color="#8B4513" />
        </motion.div>
      </div>
      
      <div className="absolute bottom-32 left-1/4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.06 }}
          transition={{ duration: 1.5, delay: 0.6 }}
        >
          <BearPawPrint size={40} color="#8B4513" />
        </motion.div>
      </div>
      
      <div className="absolute bottom-20 right-1/3">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.05 }}
          transition={{ duration: 1.5, delay: 0.9 }}
        >
          <BearPawPrint size={32} color="#8B4513" />
        </motion.div>
      </div>

      {/* Additional paw prints for more trail effect */}
      <div className="absolute top-60 left-1/3">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.04 }}
          transition={{ duration: 1.5, delay: 1.2 }}
        >
          <BearPawPrint size={28} color="#8B4513" />
        </motion.div>
      </div>
      
      <div className="absolute top-80 right-1/4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.03 }}
          transition={{ duration: 1.5, delay: 1.5 }}
        >
          <BearPawPrint size={24} color="#8B4513" />
        </motion.div>
      </div>

      {/* Optimized floating forest elements */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 2, delay: 0.5 }}
        className="absolute top-1/4 left-1/6"
      >
        <div className="w-4 h-4 bg-forest-600/20 rounded-full blur-sm" />
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.08 }}
        transition={{ duration: 2, delay: 0.8 }}
        className="absolute top-1/3 right-1/6"
      >
        <div className="w-3 h-3 bg-bear-600/20 rounded-full blur-sm" />
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.06 }}
        transition={{ duration: 2, delay: 1.1 }}
        className="absolute bottom-1/4 left-1/5"
      >
        <div className="w-5 h-5 bg-bear-700/20 rounded-full blur-sm" />
      </motion.div>

      {/* Gradient overlays for depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-bear-50/30 via-transparent to-forest-50/30" />
      <div className="absolute inset-0 bg-gradient-to-tl from-bear-100/20 via-transparent to-bear-50/20" />
    </div>
  )
})
