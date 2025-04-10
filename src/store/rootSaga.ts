import { all, fork } from 'redux-saga/effects'

import hanoiSaga from '../features/hanoi/sagas/autoHanoiSaga'
import watchMoveDiscSaga from '../features/hanoi/sagas/historySaga'

// import watchMoveDiscSaga from '../features/hanoi/moveDiscSaga'

export default function* rootSaga() {
  yield all([fork(hanoiSaga), fork(watchMoveDiscSaga)])
}
