import { createSelector } from '@reduxjs/toolkit'

import { RootState } from '../../../store'

export default createSelector(
  [
    (state: RootState) => state.hanoi.hanoiState,
    (state: RootState) => state.hanoi.discsCount,
    (state: RootState) => state.hanoi.towers['start'],
  ],
  (hanoiState, discsCount, towers) =>
    hanoiState !== 'idle' || towers.length !== discsCount,
)
