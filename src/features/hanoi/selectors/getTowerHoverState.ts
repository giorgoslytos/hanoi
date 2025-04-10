import { Active, Over } from '@dnd-kit/core'
import { createSelector } from '@reduxjs/toolkit'
import * as O from 'fp-ts/Option'
import * as F from 'fp-ts/function'
import { P, match } from 'ts-pattern'

import { RootState } from '../../../store'
import { TowerId, TowerOverState } from '../../../types'

const isTowerId = (value: string | number): value is TowerId =>
  typeof value === 'string' && ['start', 'temp', 'finish'].includes(value)

const isNumber = (value: string | number): value is number =>
  typeof value === 'number'

const getTowerHoverState = (
  over: Over | null,
  isOver: boolean,
  active: Active | null,
) =>
  createSelector(
    (state: RootState) => state.hanoi.towers,
    (towers) =>
      F.pipe(
        O.fromPredicate(() => isOver)(undefined),
        O.bind('overId', () =>
          F.pipe(
            O.fromNullable(over),
            O.map((ov) => ov.id),
            O.chain(O.fromPredicate(isTowerId)),
          ),
        ),
        O.bind('activeId', () =>
          F.pipe(
            O.fromNullable(active),
            O.map((a) => a.id),
            O.chain(O.fromPredicate(isNumber)),
          ),
        ),
        O.map(({ overId, activeId }) =>
          match<number, TowerOverState>(Math.min(...towers[overId]))
            .with(P.number.lt(activeId), () => 'illegal')
            .with(P._, F.constant('legal'))
            .exhaustive(),
        ),
        O.getOrElseW(() => undefined),
      ),
  )

export default getTowerHoverState
