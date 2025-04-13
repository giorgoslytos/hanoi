import { put, select, takeLatest } from 'redux-saga/effects'

import { RootState } from '../../../store'
import { initialAppLoad, setColors, setDiscCount } from '../hanoiSlice'

function* initApp() {
  const discsCount: number = yield select(
    (state: RootState) => state.hanoi.discsCount,
  )
  yield put(setDiscCount(discsCount))
  yield put(setColors())
}
export default function* initialAppLoadSaga() {
  yield takeLatest(initialAppLoad, initApp)
}
