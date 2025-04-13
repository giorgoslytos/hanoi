import { HanoiInstructions, TowerId } from '../../types'

export default function autoHanoi(
  n: number,
  from_rod: TowerId,
  to_rod: TowerId,
  aux_rod: TowerId,
  moveDisc: (from_rod: TowerId, to_rod: TowerId) => string,
  instructions: [string, HanoiInstructions][],
): void {
  if (n == 0) {
    return
  }
  autoHanoi(n - 1, from_rod, aux_rod, to_rod, moveDisc, instructions)
  const state = moveDisc(from_rod, to_rod)
  instructions.push([state, [n, from_rod, to_rod]])
  autoHanoi(n - 1, aux_rod, to_rod, from_rod, moveDisc, instructions)
}
