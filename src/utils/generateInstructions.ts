import { HanoiInstructions, TowerId } from '../types'
import solveHanoi from './autohanoi/solveHanoi'

const dictTowerId = {
  start: 0,
  temp: 1,
  finish: 2,
}

export default function generateInstructions(n: number) {
  const instructions: [string, HanoiInstructions][] = []
  const discsState: [number[], number[], number[]] = [
    Array.from({ length: n }, (_, k) => k + 1),
    [],
    [],
  ]

  const moveDisc = (from_rod: TowerId, to_rod: TowerId) => {
    const initialDiscState = discsState.map((state) => state.slice())
    const disc = discsState[dictTowerId[from_rod]].shift()
    if (disc) {
      discsState[dictTowerId[to_rod]].unshift(disc)
    }
    return initialDiscState.join('-')
  }

  solveHanoi(n, 'start', 'finish', 'temp', moveDisc, instructions) // Mutating function

  return instructions
}
