import { createSelector } from '@reduxjs/toolkit'
import * as O from 'fp-ts/Option'
import * as F from 'fp-ts/function'
import { last } from 'fp-ts/lib/Array'

import { RootState } from '../../../store'

const getLastMovement = () =>
  createSelector(
    (state: RootState) => state.hanoi.undo,
    F.flow(last, O.getOrElseW(F.constUndefined)),
  )

export default getLastMovement
