import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface HanoiState {
  mode: 'auto' | 'manual'
  discsCount: number
  moves: number
  towers: {
    start: number[]
    temp: number[]
    finish: number[]
  }
}

const initialState: HanoiState = {
  mode: 'manual',
  discsCount: 0,
  moves: 0,
  towers: {
    start: [1, 2, 3, 4],
    temp: [],
    finish: [],
  },
}

export const hanoiSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    setDiscsCount: (state, { payload }: PayloadAction<number>) => {
      state.discsCount = payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setDiscsCount } = hanoiSlice.actions

export default hanoiSlice.reducer
