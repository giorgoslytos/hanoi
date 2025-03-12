import { delay, put, select, takeEvery } from 'redux-saga/effects'

import { RootState } from '../../store'
import { moveDisc, moveDiscDelayed } from './hanoiSlice'

function* handleDelayedMoveDisc({
  payload,
}: ReturnType<typeof moveDiscDelayed>) {
  const autospeed: number = yield select(
    (state: RootState) => state.hanoi.autoSpeed,
  )
  yield delay(autospeed)
  yield put(moveDisc(payload))
}

// Root saga
export default function* watchMoveDiscSaga() {
  yield takeEvery(moveDiscDelayed.type, handleDelayedMoveDisc)
}
