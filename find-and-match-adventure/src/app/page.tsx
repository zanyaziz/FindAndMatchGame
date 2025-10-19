'use client'

import { GameProvider, useGame } from '@/contexts/GameContext'
import GameArea from '@/components/GameArea'
import TargetPanel from '@/components/TargetPanel'
import ScoreBoard from '@/components/ScoreBoard'
import LevelSelector from '@/components/LevelSelector'
import { Puzzle } from 'lucide-react'

function GameContent() {
  const { state } = useGame()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Puzzle className="w-8 h-8 text-purple-600" />
              <h1 className="text-2xl font-bold text-gray-800">
                Find & Match Adventure
              </h1>
            </div>
            {state.isGameStarted && (
              <div className="text-sm text-gray-600">
                Level: {state.currentLevel?.title}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!state.isGameStarted ? (
          <LevelSelector />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-200px)]">
            {/* Game Area - Takes up 3 columns */}
            <div className="lg:col-span-3">
              <GameArea />
            </div>

            {/* Side Panel - Takes up 1 column */}
            <div className="lg:col-span-1 space-y-6">
              <TargetPanel />
              <ScoreBoard />
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-gray-600">
            <p>Made with ❤️ for kids aged 4-9</p>
            <p className="text-sm mt-2">
              Improve visual recognition, focus, and memory through fun gameplay!
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default function Home() {
  return (
    <GameProvider>
      <GameContent />
    </GameProvider>
  )
}