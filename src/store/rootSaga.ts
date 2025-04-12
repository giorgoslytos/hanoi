import { all, fork } from 'redux-saga/effects'

import hanoiSaga from '../features/hanoi/sagas/autoHanoiSaga'
import watchMoveDiscSaga from '../features/hanoi/sagas/historySaga'

export default function* rootSaga() {
  yield all([fork(hanoiSaga), fork(watchMoveDiscSaga)])
}
