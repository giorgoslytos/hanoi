import { delay, put, select, take, takeEvery } from 'redux-saga/effects'

import { RootState } from '../../store'
import { moveDisc, moveDiscDelayed, resumeAuto } from './hanoiSlice'

function* handleDelayedMoveDisc({
  payload,
}: ReturnType<typeof moveDiscDelayed>) {
  const autospeed: number = yield select(
    (state: RootState) => state.hanoi.autoSpeed,
  )
  yield delay(autospeed)
  const autoHanoiState: RootState['hanoi']['autoHanoiState'] = yield select(
    (state: RootState) => state.hanoi.autoHanoiState,
  )
  if (autoHanoiState === 'paused') {
    yield take(resumeAuto)
    yield put(moveDisc(payload))
  } else if (autoHanoiState === 'running') {
    yield put(moveDisc(payload))
  }
}

// Root saga
export default function* watchMoveDiscSaga() {
  yield takeEvery(moveDiscDelayed.type, handleDelayedMoveDisc)
}
