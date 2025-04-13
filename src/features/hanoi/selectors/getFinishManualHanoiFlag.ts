import { createSelector } from '@reduxjs/toolkit'

import { RootState } from '../../../store'

export default createSelector(
  [
    (state: RootState) => state.hanoi.mode === 'manual',
    (state: RootState) => state.hanoi.towers['finish'],
    (state: RootState) => state.hanoi.discsCount,
  ],
  (isManual, finTower, discCount) =>
    isManual ? finTower.length === discCount : false,
)
