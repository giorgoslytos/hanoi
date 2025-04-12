import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

import { HanoiInstructions, HanoiMode, HanoiMoveDisc } from '../../types'
import generateColors from '../../utils/colorManager'

export interface HanoiState {
  mode: HanoiMode
  autoHanoiState: 'idle' | 'running' | 'paused' | 'completed' | 'failed'
  autoSpeed: number
  discsCount: number
  moves: number
  towers: {
    start: number[]
    temp: number[]
    finish: number[]
  }
  instructions: [string, HanoiInstructions][]
  undo: HanoiMoveDisc[]
  redo: {
    start: number[]
    temp: number[]
    finish: number[]
  }[]
  discColors: { [x: string]: string }
}

const DEFAULT_DISC_COUNT = 3

const initialState: HanoiState = {
  mode: 'manual',
  autoHanoiState: 'idle',
  autoSpeed: 1000,
  discsCount: DEFAULT_DISC_COUNT,
  moves: 0,
  towers: {
    start: Array.from({ length: DEFAULT_DISC_COUNT }, (_, n) => n + 1),
    temp: [],
    finish: [],
  },
  instructions: [],
  undo: [],
  redo: [],
  discColors: {},
}

export const hanoiSlice = createSlice({
  name: 'hanoi',
  initialState,
  reducers: {
    setColors: (state) => {
      state.discColors = generateColors()
    },
    moveDisc: (
      state,
      { payload: { discId, from, to } }: PayloadAction<HanoiMoveDisc>,
    ) => {
      state.towers = {
        ...state.towers,
        [from]: state.towers[from].slice(1),
        [to]: [discId, ...state.towers[to]],
      }
      state.moves = ++state.moves
    },
    moveDiscDelayed: (_state, _action: PayloadAction<HanoiMoveDisc>) => {},
    resetDiscs: (state) => {
      state.towers.temp = []
      state.towers.finish = []
      state.towers.start = Array.from(
        { length: state.discsCount },
        (_, i) => i + 1,
      )
      state.autoHanoiState = 'idle'
      state.moves = 0
    },
    setDiscCount: (state, { payload }: PayloadAction<number>) => {
      state.discsCount = payload
      state.towers.temp = []
      state.towers.finish = []
      state.towers.start = Array.from({ length: payload }, (_, i) => i + 1)
      state.moves = 0
    },
    setAutoSpeed: (state, { payload }: PayloadAction<number>) => {
      state.autoSpeed = payload
    },
    startAutoHanoi: (state) => {
      state.mode = 'auto'
      state.autoHanoiState = 'running'
    },
    pauseAutoHanoi: (state) => {
      state.autoHanoiState = 'paused'
    },
    resumeAuto: (state) => {
      state.autoHanoiState = 'running'
    },
    completeAutoHanoi: (state) => {
      state.autoHanoiState = 'completed'
    },
    setMode: (state, { payload }: PayloadAction<HanoiState['mode']>) => {
      state.mode = payload
    },
    storeMovement: (state, { payload }: PayloadAction<HanoiMoveDisc>) => {
      state.undo.push(payload)
    },
    undoLastMove: (_state) => {},
    removeLastMove: (state) => {
      state.undo.pop()
    },
    setInstructions: (
      state,
      { payload }: PayloadAction<[string, HanoiInstructions][]>,
    ) => {
      state.instructions = payload
    },
  },
})

export const {
  setColors,
  moveDisc,
  moveDiscDelayed,
  completeAutoHanoi,
  resetDiscs,
  setDiscCount,
  setAutoSpeed,
  startAutoHanoi,
  pauseAutoHanoi,
  resumeAuto,
  setMode,
  storeMovement,
  undoLastMove,
  setInstructions,
  removeLastMove,
} = hanoiSlice.actions

export default hanoiSlice.reducer
