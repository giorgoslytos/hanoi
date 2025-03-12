export type TowerId = 'start' | 'temp' | 'finish'

export type TowerProp = {
  id: TowerId
}

export type HanoiMoveDisc = {
  discId: number
  from: TowerId
  to: TowerId
}
