'use client'

import React, { createContext, useContext, useReducer, ReactNode } from 'react'
import { GameObject, Level } from '@/lib/supabase'

interface GameState {
  currentLevel: Level | null
  currentObject: GameObject | null
  remainingObjects: GameObject[]
  score: number
  isGameComplete: boolean
  isGameStarted: boolean
  foundObjects: number[]
  clickFeedback: 'correct' | 'incorrect' | null
}

type GameAction =
  | { type: 'START_GAME'; payload: { level: Level; objects: GameObject[] } }
  | { type: 'SET_CURRENT_OBJECT'; payload: GameObject }
  | { type: 'CORRECT_CLICK'; payload: number }
  | { type: 'INCORRECT_CLICK' }
  | { type: 'CLEAR_FEEDBACK' }
  | { type: 'RESET_GAME' }

const initialState: GameState = {
  currentLevel: null,
  currentObject: null,
  remainingObjects: [],
  score: 0,
  isGameComplete: false,
  isGameStarted: false,
  foundObjects: [],
  clickFeedback: null,
}

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'START_GAME':
      return {
        ...state,
        currentLevel: action.payload.level,
        remainingObjects: action.payload.objects,
        currentObject: action.payload.objects[0] || null,
        score: 0,
        isGameComplete: false,
        isGameStarted: true,
        foundObjects: [],
        clickFeedback: null,
      }

    case 'SET_CURRENT_OBJECT':
      return {
        ...state,
        currentObject: action.payload,
      }

    case 'CORRECT_CLICK':
      const newFoundObjects = [...state.foundObjects, action.payload]
      const newRemainingObjects = state.remainingObjects.filter(
        (obj) => obj.id !== action.payload
      )
      const nextObject = newRemainingObjects[0] || null
      const isComplete = newRemainingObjects.length === 0

      return {
        ...state,
        score: state.score + 1,
        foundObjects: newFoundObjects,
        remainingObjects: newRemainingObjects,
        currentObject: nextObject,
        isGameComplete: isComplete,
        clickFeedback: 'correct',
      }

    case 'INCORRECT_CLICK':
      return {
        ...state,
        clickFeedback: 'incorrect',
      }

    case 'CLEAR_FEEDBACK':
      return {
        ...state,
        clickFeedback: null,
      }

    case 'RESET_GAME':
      return initialState

    default:
      return state
  }
}

const GameContext = createContext<{
  state: GameState
  dispatch: React.Dispatch<GameAction>
} | null>(null)

export function GameProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(gameReducer, initialState)

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  )
}

export function useGame() {
  const context = useContext(GameContext)
  if (!context) {
    throw new Error('useGame must be used within a GameProvider')
  }
  return context
}
