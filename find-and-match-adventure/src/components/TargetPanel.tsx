'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { useGame } from '@/contexts/GameContext'
import { Search, Target } from 'lucide-react'

export default function TargetPanel() {
  const { state } = useGame()

  if (!state.currentObject) {
    return (
      <div className="w-80 bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg shadow-lg p-6 flex flex-col items-center justify-center">
        <div className="text-center">
          <Search className="w-16 h-16 text-purple-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            {state.isGameComplete ? 'Game Complete!' : 'No Target Object'}
          </h3>
          <p className="text-gray-600">
            {state.isGameComplete
              ? 'You found all the objects!'
              : 'Select a level to start playing.'}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-80 bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg shadow-lg p-6">
      <div className="text-center mb-6">
        <Target className="w-8 h-8 text-purple-600 mx-auto mb-2" />
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Find This Object:</h3>
        <p className="text-sm text-gray-600">
          Click on the object in the main image
        </p>
      </div>

      {/* Target object image */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-lg p-4 shadow-md mb-4"
      >
        <div className="aspect-square flex items-center justify-center">
          <img
            src={state.currentObject.image_url}
            alt={state.currentObject.name}
            className="max-w-full max-h-full object-contain"
          />
        </div>
      </motion.div>

      {/* Object name */}
      <div className="text-center">
        <h4 className="text-lg font-semibold text-gray-800 mb-2">
          {state.currentObject.name}
        </h4>
        
        {/* Progress indicator */}
        <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
          <span>Progress:</span>
          <div className="flex space-x-1">
            {Array.from({ length: state.foundObjects.length + state.remainingObjects.length }).map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full ${
                  index < state.foundObjects.length
                    ? 'bg-green-500'
                    : index === state.foundObjects.length
                    ? 'bg-yellow-500 animate-pulse'
                    : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Hint text */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-4 p-3 bg-blue-50 rounded-lg"
      >
        <p className="text-sm text-blue-800 text-center">
          💡 Look carefully at the main image and find the object that matches this picture!
        </p>
      </motion.div>
    </div>
  )
}
