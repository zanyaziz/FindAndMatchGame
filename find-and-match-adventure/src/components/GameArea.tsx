'use client'

import React, { useRef, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useGame } from '@/contexts/GameContext'
import { Star, Sparkles } from 'lucide-react'

interface GameAreaProps {
  onImageLoad?: () => void
}

export default function GameArea({ onImageLoad }: GameAreaProps) {
  const { state, dispatch } = useGame()
  const imageRef = useRef<HTMLImageElement>(null)
  const [imageLoaded, setImageLoaded] = useState(false)
  const [clickPosition, setClickPosition] = useState<{ x: number; y: number } | null>(null)
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number } | null>(null)

  const handleImageClick = (event: React.MouseEvent<HTMLImageElement>) => {
    if (!state.currentObject || !imageRef.current || !imageLoaded) return

    const rect = imageRef.current.getBoundingClientRect()
    const scaleX = imageRef.current.naturalWidth / rect.width
    const scaleY = imageRef.current.naturalHeight / rect.height

    const clickX = (event.clientX - rect.left) * scaleX
    const clickY = (event.clientY - rect.top) * scaleY

    setClickPosition({ x: event.clientX - rect.left, y: event.clientY - rect.top })
    console.log(clickX, clickY, state.currentObject, state.currentObject.minx, state.currentObject.maxx, state.currentObject.miny, state.currentObject.maxy)
    console.log(state.currentObject.minx)
    // Check if click is within the object's bounding box
    const isCorrect =
      clickX >= state.currentObject.minx &&
      clickX <= state.currentObject.maxx &&
      clickY >= state.currentObject.miny &&
      clickY <= state.currentObject.maxy

    if (isCorrect) {
      dispatch({ type: 'CORRECT_CLICK', payload: state.currentObject.id })
      // Play success sound
      playSound('success')
    } else {
      dispatch({ type: 'INCORRECT_CLICK' })
      // Play error sound
      playSound('error')
    }

    // Clear click position after animation
    setTimeout(() => setClickPosition(null), 1000)
  }

  const playSound = (type: 'success' | 'error') => {
    // Create audio context for sound effects
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)

    if (type === 'success') {
      oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime) // C5
      oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.1) // E5
      oscillator.frequency.setValueAtTime(783.99, audioContext.currentTime + 0.2) // G5
    } else {
      oscillator.frequency.setValueAtTime(200, audioContext.currentTime) // Low tone
    }

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3)

    oscillator.start(audioContext.currentTime)
    oscillator.stop(audioContext.currentTime + 0.3)
  }

  const handleImageLoad = () => {
    setImageLoaded(true)
    onImageLoad?.()
  }

  const handleMouseMove = (event: React.MouseEvent<HTMLImageElement>) => {
    if (!imageRef.current || !imageLoaded) return

    const rect = imageRef.current.getBoundingClientRect()
    const scaleX = imageRef.current.naturalWidth / rect.width
    const scaleY = imageRef.current.naturalHeight / rect.height

    const mouseX = Math.round((event.clientX - rect.left) * scaleX)
    const mouseY = Math.round((event.clientY - rect.top) * scaleY)

    setMousePosition({ x: mouseX, y: mouseY })
  }

  const handleMouseLeave = () => {
    setMousePosition(null)
  }

  useEffect(() => {
    if (state.clickFeedback) {
      const timer = setTimeout(() => {
        dispatch({ type: 'CLEAR_FEEDBACK' })
      }, 1500)
      return () => clearTimeout(timer)
    }
  }, [state.clickFeedback, dispatch])

  if (!state.currentLevel) {
    return (
      <div className="flex items-center justify-center h-full bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg">
        <p className="text-xl text-gray-600">Select a level to start playing!</p>
      </div>
    )
  }

  return (
    <div className="relative flex-1 bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Coordinate display */}
      <AnimatePresence>
        {mousePosition && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute top-4 right-4 z-20"
          >
            <div className="bg-black bg-opacity-75 text-white px-3 py-2 rounded-lg text-sm font-mono">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>X: {mousePosition.x}, Y: {mousePosition.y}</span>
              </div>
              <div className="text-xs text-gray-300 mt-1">
                Image coordinates
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Click feedback overlay */}
      <AnimatePresence>
        {clickPosition && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 2, opacity: 0 }}
            className="absolute pointer-events-none z-10"
            style={{
              left: clickPosition.x - 20,
              top: clickPosition.y - 20,
            }}
          >
            <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center">
              <Star className="w-6 h-6 text-yellow-600" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success/Error feedback */}
      <AnimatePresence>
        {state.clickFeedback && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="absolute top-4 right-4 z-20"
          >
            <div
              className={`p-4 rounded-full ${
                state.clickFeedback === 'correct'
                  ? 'bg-green-500 text-white'
                  : 'bg-red-500 text-white'
              }`}
            >
              {state.clickFeedback === 'correct' ? (
                <Sparkles className="w-8 h-8" />
              ) : (
                <span className="text-2xl">❌</span>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main image */}
      <div className="relative h-full">
        <img
          ref={imageRef}
          src={state.currentLevel.image_url}
          alt={state.currentLevel.title}
          className="w-full h-full object-contain cursor-crosshair"
          onClick={handleImageClick}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onLoad={handleImageLoad}
          style={{ filter: imageLoaded ? 'none' : 'blur(5px)' }}
        />
        
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        )}
      </div>

      {/* Game completion overlay */}
      <AnimatePresence>
        {state.isGameComplete && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-30"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="bg-white p-8 rounded-lg text-center max-w-md mx-4"
            >
              <h2 className="text-3xl font-bold text-green-600 mb-4">🎉 Great Job!</h2>
              <p className="text-xl text-gray-700 mb-4">
                You found all {state.score} objects!
              </p>
              <button
                onClick={() => dispatch({ type: 'RESET_GAME' })}
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold transition-colors"
              >
                Play Again
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
