import { HanoiInstructions, TowerId } from '../types'

const dictTowerId = {
  start: 0,
  temp: 1,
  finish: 2,
}

export function generateInstructions(n: number) {
  const instructions: [string, HanoiInstructions][] = []
  const discsState: [number[], number[], number[]] = [
    Array.from({ length: n }, (_, k) => n - k),
    [],
    [],
  ]

  const moveDisc = (from_rod: TowerId, to_rod: TowerId) => {
    const initialDiscState = discsState.map((state) => state.slice())
    const disc = discsState[dictTowerId[from_rod]].pop()
    if (disc) {
      discsState[dictTowerId[to_rod]].push(disc)
    }
    return initialDiscState.join('-')
  }

  function autoHanoi(
    n: number,
    from_rod: TowerId,
    to_rod: TowerId,
    aux_rod: TowerId,
  ): void {
    if (n == 0) {
      return
    }
    autoHanoi(n - 1, from_rod, aux_rod, to_rod)
    const state = moveDisc(from_rod, to_rod)
    instructions.push([state, [n, from_rod, to_rod]])
    autoHanoi(n - 1, aux_rod, to_rod, from_rod)
  }

  autoHanoi(n, 'start', 'finish', 'temp')
  console.log(discsState)

  return instructions
}
