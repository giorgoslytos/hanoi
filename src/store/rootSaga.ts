import { all, fork } from 'redux-saga/effects'

import hanoiSaga from '../features/hanoi/sagas/autoHanoiSaga'
import watchcompleteHanoiSaga from '../features/hanoi/sagas/completeHanoiSaga'
import watchMoveDiscSaga from '../features/hanoi/sagas/historySaga'
import initialAppLoadSaga from '../features/hanoi/sagas/initialAppLoadSaga'
import watchDiscCountGenerationSaga from '../features/hanoi/sagas/solveHanoiSaga'

export default function* rootSaga() {
  yield all([
    fork(hanoiSaga),
    fork(watchMoveDiscSaga),
    fork(watchDiscCountGenerationSaga),
    fork(watchcompleteHanoiSaga),
    fork(initialAppLoadSaga),
  ])
}
