import { all, fork } from 'redux-saga/effects'

import hanoiSaga from '../features/hanoi/autoHanoiSaga'

// import watchMoveDiscSaga from '../features/hanoi/moveDiscSaga'

export default function* rootSaga() {
  // yield all([fork(hanoiSaga), fork(watchMoveDiscSaga)])
  yield all([fork(hanoiSaga)])
}
