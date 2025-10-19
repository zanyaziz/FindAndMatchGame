'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { useGame } from '@/contexts/GameContext'
import { Trophy, Star, Target } from 'lucide-react'

export default function ScoreBoard() {
  const { state } = useGame()

  const totalObjects = state.foundObjects.length + state.remainingObjects.length
  const progressPercentage = totalObjects > 0 ? (state.foundObjects.length / totalObjects) * 100 : 0

  return (
    <div className="bg-gradient-to-r from-yellow-100 to-orange-100 rounded-lg shadow-lg p-6">
      <div className="text-center mb-4">
        <Trophy className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
        <h3 className="text-lg font-semibold text-gray-800">Score Board</h3>
      </div>

      {/* Score display */}
      <motion.div
        key={state.score}
        initial={{ scale: 1.2 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3 }}
        className="text-center mb-6"
      >
        <div className="text-4xl font-bold text-yellow-600 mb-2">
          {state.score}
        </div>
        <p className="text-sm text-gray-600">Points Earned</p>
      </motion.div>

      {/* Progress bar */}
      <div className="mb-4">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Progress</span>
          <span>{state.foundObjects.length} / {totalObjects}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <motion.div
            className="bg-gradient-to-r from-green-400 to-green-600 h-3 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      {/* Stats */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Star className="w-4 h-4 text-green-500" />
            <span className="text-sm text-gray-700">Found</span>
          </div>
          <span className="font-semibold text-green-600">{state.foundObjects.length}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Target className="w-4 h-4 text-yellow-500" />
            <span className="text-sm text-gray-700">Remaining</span>
          </div>
          <span className="font-semibold text-yellow-600">{state.remainingObjects.length}</span>
        </div>

        {state.currentLevel && (
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-purple-500 rounded-full"></div>
              <span className="text-sm text-gray-700">Level</span>
            </div>
            <span className="font-semibold text-purple-600">{state.currentLevel.title}</span>
          </div>
        )}
      </div>

      {/* Achievement badges */}
      {state.score > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-3 bg-green-50 rounded-lg"
        >
          <div className="flex items-center justify-center space-x-2">
            <Star className="w-5 h-5 text-green-500" />
            <span className="text-sm font-semibold text-green-700">
              Great job! Keep it up! 🌟
            </span>
          </div>
        </motion.div>
      )}
    </div>
  )
}
