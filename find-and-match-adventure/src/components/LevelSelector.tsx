'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useGame } from '@/contexts/GameContext'
import { supabase, Level, GameObject } from '@/lib/supabase'
import { Play, Image as ImageIcon } from 'lucide-react'

export default function LevelSelector() {
  const { dispatch } = useGame()
  const [levels, setLevels] = useState<Level[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadLevels()
  }, [])

  const loadLevels = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const { data, error } = await supabase
        .from('levels')
        .select('*')
        .order('id')
      
      if (error) {
        throw error
      }
      
      setLevels(data || [])
    } catch (err) {
      setError('Failed to load levels')
      console.error('Error loading levels:', err)
    } finally {
      setLoading(false)
    }
  }

  const startLevel = async (level: Level) => {
    try {
      const { data: objects, error } = await supabase
        .from('objects')
        .select('*')
        .eq('level_id', level.id)
        .order('id')
      
      if (error) {
        throw error
      }

      dispatch({
        type: 'START_GAME',
        payload: { level, objects: objects || [] },
      })
    } catch (err) {
      console.error('Error starting level:', err)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center p-8">
        <p className="text-red-600 mb-4">{error}</p>
        <button
          onClick={loadLevels}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          Try Again
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Choose Your Adventure!</h2>
        <p className="text-gray-600">Select a level to start playing</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {levels.map((level, index) => (
          <motion.div
            key={level.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
          >
            {/* Level thumbnail */}
            <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
              <ImageIcon className="w-16 h-16 text-gray-400" />
            </div>

            {/* Level info */}
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {level.title}
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Find hidden objects in this exciting scene!
              </p>
              
              <button
                onClick={() => startLevel(level)}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-2 px-4 rounded-lg flex items-center justify-center space-x-2 transition-all duration-200 transform hover:scale-105"
              >
                <Play className="w-4 h-4" />
                <span>Start Level</span>
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
