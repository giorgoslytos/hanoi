import { put, select, take, takeLatest } from 'redux-saga/effects'

import { RootState } from '../../store'
import { TowerId } from '../../types'
import {
  completeAutoHanoi,
  moveDisc,
  moveDiscDelayed,
  resumeAuto,
  startAutoHanoi,
} from './hanoiSlice'

function* autoHanoi(
  n: number,
  from_rod: TowerId,
  to_rod: TowerId,
  aux_rod: TowerId,
): Generator {
  const autoState = (yield select(
    (state: RootState) => state.hanoi.autoHanoiState,
  )) as RootState['hanoi']['autoHanoiState']

  if (autoState === 'paused') {
    yield take(resumeAuto.type)
  }
  if (n == 0) {
    return
  }
  yield* autoHanoi(n - 1, from_rod, aux_rod, to_rod)
  console.log(
    'Move disk ' + n + ' from rod ' + from_rod + ' to rod ' + to_rod + '<br/>',
  )
  yield put(moveDiscDelayed({ discId: n, from: from_rod, to: to_rod }))
  yield take(moveDisc.type)
  yield* autoHanoi(n - 1, aux_rod, to_rod, from_rod)
}

function* handleAutoHanoi() {
  const discsCount: number = yield select(
    (state: RootState) => state.hanoi.discsCount,
  )
  yield autoHanoi(discsCount, 'start', 'finish', 'temp')
  yield put(completeAutoHanoi())
}

// Root saga
export default function* watchAutoHanoiStart() {
  yield takeLatest(startAutoHanoi, handleAutoHanoi)
}
