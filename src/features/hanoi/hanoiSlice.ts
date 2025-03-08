import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

import { TowerId } from '../../types'
import generateColors from '../../utils/colorManager'

export interface HanoiState {
  mode: 'auto' | 'manual'
  autoSpeed: number
  discsCount: number
  moves: number
  towers: {
    start: number[]
    temp: number[]
    finish: number[]
  }
  discColors: { [x: string]: string }
}

const initialState: HanoiState = {
  mode: 'manual',
  autoSpeed: 500,
  discsCount: 3,
  moves: 0,
  towers: {
    start: [1, 2, 3],
    temp: [],
    finish: [],
  },
  discColors: {},
}

export const hanoiSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    setColors: (state) => {
      state.discColors = generateColors()
    },
    moveDisc: (
      state,
      {
        payload: { discId, from, to },
      }: PayloadAction<{
        discId: number
        from: TowerId
        to: TowerId
      }>,
    ) => {
      state.towers[from] = state.towers[from].slice(1)
      state.towers[to] = [discId, ...state.towers[to]]
    },
    resetDiscs: (state) => {
      state.towers.temp = []
      state.towers.finish = []
      state.towers.start = Array.from(
        { length: state.discsCount },
        (_, i) => i + 1,
      )
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
  },
})

// Action creators are generated for each case reducer function
export const { setColors, moveDisc, resetDiscs, setDiscCount, setAutoSpeed } =
  hanoiSlice.actions

export default hanoiSlice.reducer
