import { Active, DataRef } from '@dnd-kit/core'

export type TowerId = 'start' | 'temp' | 'finish'

export type TowerProp = {
  id: TowerId
}

export type HanoiMode = 'auto' | 'manual'

export type HanoiMoveDisc = {
  discId: number
  from: TowerId
  to: TowerId
  mode?: HanoiMode
}

export type HanoiInstructions = [number, TowerId, TowerId]

export interface ActiveTower extends Omit<Active, 'data'> {
  data: DataRef<{ from: string }>
}

export type TowerOverState = 'legal' | 'illegal' | undefined
