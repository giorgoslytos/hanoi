import { call, put, select, takeLatest } from 'redux-saga/effects'

import { RootState } from '../../../store'
import { HanoiInstructions } from '../../../types'
import generateInstructions from '../../../utils/generateInstructions'
import { setDiscCount, setInstructions } from '../hanoiSlice'

function* discCountGeneration() {
  const discCount: number = yield select(
    (state: RootState) => state.hanoi.discsCount,
  )

  const instructions: [string, HanoiInstructions][] = yield call(
    generateInstructions,
    discCount,
  )
  yield put(setInstructions(instructions))
}
export default function* watchDiscCountGenerationSaga() {
  yield takeLatest(setDiscCount, discCountGeneration)
}
