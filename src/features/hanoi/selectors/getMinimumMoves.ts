import { createSelector } from '@reduxjs/toolkit'

import { RootState } from '../../../store'

export default createSelector(
  (state: RootState) => state.hanoi.discsCount,
  (count) => (2 ^ count) - 1,
)
