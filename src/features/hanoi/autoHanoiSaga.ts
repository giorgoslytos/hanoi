import { Task } from 'redux-saga'
import {
  call,
  cancel,
  delay,
  put,
  select,
  take,
  takeLatest,
} from 'redux-saga/effects'

import { RootState } from '../../store'
import { TowerId } from '../../types'
import {
  completeAutoHanoi,
  moveDisc,
  resetDiscs,
  resumeAuto,
  startAutoHanoi,
} from './hanoiSlice'

const isElementFound = (element: Element | null): element is Element =>
  !!element

function* moveDiscCh(discId: number, from: TowerId, to: TowerId) {
  const discEl = document.querySelector<HTMLButtonElement>(
    `[data-id="${discId}"]`,
  )
  const hanoiTowerEl = document.querySelector<HTMLDivElement>(
    `[data-id="${from}"]`,
  )
  const toHanoiTowerEl = document.querySelector<HTMLDivElement>(
    `[data-id="${to}"]`,
  )
  if (
    isElementFound(discEl) &&
    isElementFound(hanoiTowerEl) &&
    isElementFound(toHanoiTowerEl)
  ) {
    const {
      top: discTop,
      left: discLeft,
      height: discHeight,
      width: discWidth,
    } = discEl.getBoundingClientRect()
    const autospeed: number = yield select(
      (state: RootState) => state.hanoi.autoSpeed,
    )
    discEl.style.transition = `transform ${autospeed / 2}ms ease-in-out`
    const { top: towerTop } = hanoiTowerEl.getBoundingClientRect()
    const { left: toTowerLeft, width: toTowerWidth } =
      toHanoiTowerEl.getBoundingClientRect()
    const toTop = discTop - towerTop + 4 + discHeight
    const toLeft = toTowerLeft - discWidth / 2 - discLeft + toTowerWidth / 2
    discEl.style.transform = `translate(0, ${-toTop}px)`
    yield delay(autospeed / 2)
    discEl.style.transform = `translate(${toLeft}px,${-toTop}px)`
    yield delay(autospeed / 2)
    const autoHanoiState: RootState['hanoi']['autoHanoiState'] = yield select(
      (state: RootState) => state.hanoi.autoHanoiState,
    )
    if (autoHanoiState === 'paused' || autoHanoiState === 'idle') {
      discEl.style.transform = `translate(0,0)`
    }
    yield put(moveDisc({ discId, from, to }))
  }
}
function* autoHanoi(
  n: number,
  from_rod: TowerId,
  to_rod: TowerId,
  aux_rod: TowerId,
): Generator {
  const autoState = (yield select(
    (state: RootState) => state.hanoi.autoHanoiState,
  )) as RootState['hanoi']['autoHanoiState']

  if (autoState === 'paused') {
    yield take(resumeAuto.type)
  }
  if (n == 0) {
    return
  }
  yield* autoHanoi(n - 1, from_rod, aux_rod, to_rod)
  console.log(
    'Move disk ' + n + ' from rod ' + from_rod + ' to rod ' + to_rod + '<br/>',
  )
  // yield put(moveDiscDelayed({ discId: n, from: from_rod, to: to_rod }))
  yield call(moveDiscCh, n, from_rod, to_rod)
  // yield take(moveDisc.type)
  yield* autoHanoi(n - 1, aux_rod, to_rod, from_rod)
}

function* handleAutoHanoi() {
  const discsCount: number = yield select(
    (state: RootState) => state.hanoi.discsCount,
  )

  yield autoHanoi(discsCount, 'start', 'finish', 'temp')
  yield put(completeAutoHanoi())
}

// Root saga
export default function* watchAutoHanoiStart() {
  while (true) {
    // Wait for startAutoHanoi action
    const task = (yield takeLatest(startAutoHanoi, handleAutoHanoi)) as Task

    // Wait for resetDiscs action
    yield take(resetDiscs)

    // Cancel the running saga (if it exists)
    if (task) {
      yield cancel(task)
      Array.from({ length: 10 }, (_, index) => index + 1).forEach((discId) => {
        const discEl = document.querySelector<HTMLButtonElement>(
          `[data-id="${discId}"]`,
        )
        if (!discEl) return
        discEl.style.transform = 'translate(0,0)'
      })
    }
  }
}
