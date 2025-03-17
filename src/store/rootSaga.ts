import { all, fork } from 'redux-saga/effects'

import autoHanoiSaga from '../features/hanoi/autoHanoiSaga'
import watchMoveDiscSaga from '../features/hanoi/moveDiscSaga'

export default function* rootSaga() {
  yield all([fork(autoHanoiSaga), fork(watchMoveDiscSaga)])
}
