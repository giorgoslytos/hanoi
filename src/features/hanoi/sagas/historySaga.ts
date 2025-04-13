import { PayloadAction } from '@reduxjs/toolkit'
import { call, put, select, takeEvery, takeLeading } from 'redux-saga/effects'

import { HanoiMoveDisc } from '../../../types'
import {
  hasCheated,
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
  } else {
    yield put(hasCheated(true))
  }
}

function* undoLastMoveSaga() {
  const instruction: HanoiMoveDisc = yield select(getLastMovement())
  const { discId, from, to } = instruction
  yield call(moveDiscCh, discId, from, to)
  yield put(removeLastMove())
}
export default function* watchMoveDiscSaga() {
  yield takeEvery(moveDisc, storeMovementSaga)
  yield takeLeading(undoLastMove, undoLastMoveSaga)
}
