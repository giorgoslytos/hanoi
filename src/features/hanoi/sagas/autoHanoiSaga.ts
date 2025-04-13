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

import { RootState } from '../../../store'
import { HanoiInstructions as HanoiInstruction, TowerId } from '../../../types'
import {
  completeAutoHanoi,
  moveDisc,
  removeLastMove,
  resetDiscs,
  resumeAuto,
  startAutoHanoi,
  undoLastMove,
} from '../hanoiSlice'
import getCurrentState from '../selectors/getCurrentState'

const isElementFound = (element: Element | null): element is Element =>
  !!element

export function* moveDiscCh(discId: number, from: TowerId, to: TowerId) {
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
    const autoHanoiState: RootState['hanoi']['hanoiState'] = yield select(
      (state: RootState) => state.hanoi.hanoiState,
    )
    if (autoHanoiState === 'paused' || autoHanoiState === 'idle') {
      discEl.style.transform = `translate(0,0)`
    }
    yield put(moveDisc({ discId, from, to }))
  }
}

function* autoHanoi() {
  const instructions: [string, HanoiInstruction][] = yield select(
    (state: RootState) => state.hanoi.instructions,
  )
  const instructionsLength: number = yield select(
    (state: RootState) => state.hanoi.instructions.length,
  )

  let i = 0
  while (true) {
    const autoState = (yield select(
      (state: RootState) => state.hanoi.hanoiState,
    )) as RootState['hanoi']['hanoiState']
    if (autoState === 'paused') {
      yield take(resumeAuto.type)
    }
    if (instructionsLength === i) {
      break
    }

    const currentStateId: string = yield select(getCurrentState)

    const index = instructions.findIndex(
      ([instrId]) => instrId === currentStateId,
    )

    if (index === -1) {
      yield put(undoLastMove())
      yield take(removeLastMove)
    } else {
      const [_stateId, [n, from, to]] = instructions[index]
      yield delay(0)
      yield call(moveDiscCh, n, from, to)
      i = index + 1
    }
  }
}
function* handleAutoHanoi() {
  yield call(autoHanoi)
  yield put(completeAutoHanoi())
}

export default function* watchAutoHanoiStart() {
  while (true) {
    const task = (yield takeLatest(startAutoHanoi, handleAutoHanoi)) as Task

    yield take(resetDiscs)

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
