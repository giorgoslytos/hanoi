import { createSelector } from '@reduxjs/toolkit'

import { RootState } from '../../../store'

const getCurrentState = createSelector(
  (state: RootState) => state.hanoi.towers,
  (towers) => {
    const { start, temp, finish } = towers
    return [start, temp, finish].join('-')
  },
)

export default getCurrentState
