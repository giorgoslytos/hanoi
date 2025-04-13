import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

import { HanoiInstructions, HanoiMode, HanoiMoveDisc } from '../../types'
import generateColors from '../../utils/colorManager'

export interface HanoiState {
  mode: HanoiMode
  hanoiState: 'idle' | 'running' | 'paused' | 'completed' | 'failed'
  autoSpeed: number
  discsCount: number
  moves: number
  cheated: boolean
  towers: {
    start: number[]
    temp: number[]
    finish: number[]
  }
  instructions: [string, HanoiInstructions][]
  undo: HanoiMoveDisc[]
  discColors: { [x: string]: string }
}

const DEFAULT_DISC_COUNT = 4

const initialState: HanoiState = {
  mode: 'manual',
  hanoiState: 'idle',
  autoSpeed: 1000,
  discsCount: DEFAULT_DISC_COUNT,
  moves: 0,
  cheated: false,
  towers: {
    start: Array.from({ length: DEFAULT_DISC_COUNT }, (_, n) => n + 1),
    temp: [],
    finish: [],
  },
  instructions: [],
  undo: [],
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
      state.towers[from] = state.towers[from].slice(1)
      state.towers[to] = [discId, ...state.towers[to]]
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
      state.hanoiState = 'idle'
      state.moves = 0
      state.undo = []
      state.cheated = false
    },
    setDiscCount: (state, { payload }: PayloadAction<number>) => {
      state.discsCount = payload
      state.towers.temp = []
      state.towers.finish = []
      state.towers.start = Array.from({ length: payload }, (_, i) => i + 1)
      state.moves = 0
      state.undo = []
    },
    setAutoSpeed: (state, { payload }: PayloadAction<number>) => {
      state.autoSpeed = payload
    },
    startAutoHanoi: (state) => {
      state.mode = 'auto'
      state.hanoiState = 'running'
    },
    pauseAutoHanoi: (state) => {
      state.hanoiState = 'paused'
    },
    resumeAuto: (state) => {
      state.hanoiState = 'running'
    },
    completeAutoHanoi: (state) => {
      state.hanoiState = 'completed'
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
    initialAppLoad: (_state) => {},
    hasCheated: (state, { payload }: PayloadAction<boolean>) => {
      state.cheated = payload
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
  initialAppLoad,
  hasCheated,
} = hanoiSlice.actions

export default hanoiSlice.reducer
