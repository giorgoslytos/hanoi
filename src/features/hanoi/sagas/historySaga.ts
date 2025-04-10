import { PayloadAction } from '@reduxjs/toolkit'
import {
  call,
  put,
  select,
  takeEvery,
  takeLatest,
  takeLeading,
} from 'redux-saga/effects'

import { HanoiMoveDisc } from '../../../types'
import {
  moveDisc,
  removeLastMove,
  storeMovement,
  undoLastMove,
} from '../hanoiSlice'
import getLastMovement from '../selectors/getLastMovement'
import { moveDiscCh } from './autoHanoiSaga'

function* storeMovementSaga({
  payload: { discId, from, to, mode },
}: PayloadAction<HanoiMoveDisc>) {
  if (mode === 'manual') {
    yield put(storeMovement({ discId, from: to, to: from }))
  }
}

function* undoLastMoveSaga() {
  console.log('undo')
  const instruction: HanoiMoveDisc = yield select(getLastMovement())
  console.log({ instruction })
  // yield put(moveDisc({ ...instruction, mode: 'auto' }))
  const { discId, from, to, mode } = instruction
  yield call(moveDiscCh, discId, from, to)
  yield put(removeLastMove())
}
export default function* watchMoveDiscSaga() {
  yield takeEvery(moveDisc, storeMovementSaga)
  yield takeLeading(undoLastMove, undoLastMoveSaga)
}
