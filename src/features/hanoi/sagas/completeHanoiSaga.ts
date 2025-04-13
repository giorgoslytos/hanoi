import { put, select, takeLatest } from 'redux-saga/effects'

import { completeAutoHanoi, moveDisc } from '../hanoiSlice'
import getFinishManualHanoiFlag from '../selectors/getFinishManualHanoiFlag'

function* setCompletedHanoiSaga() {
  const finishTowerDiscCount: number = yield select(getFinishManualHanoiFlag)
  if (finishTowerDiscCount) {
    yield put(completeAutoHanoi())
  }
}
export default function* watchcompleteHanoiSaga() {
  yield takeLatest(moveDisc, setCompletedHanoiSaga)
}
