import { useDroppable } from '@dnd-kit/core'
import { useSelector } from 'react-redux'
import { match } from 'ts-pattern'

import React from 'react'

import getTowerHeight from '../features/hanoi/selectors/getTowerHeight'
import getTowerHoverState from '../features/hanoi/selectors/getTowerHoverState'
import { TowerProp } from '../types'

const Tower = ({ id }: React.PropsWithChildren<TowerProp>) => {
  const { isOver, over, active, setNodeRef } = useDroppable({
    id,
  })
  const towerHoverState = useSelector(getTowerHoverState(over, isOver, active))

  const hoverStyle = {
    boxShadow: match(towerHoverState)
      .with('legal', () => '0px 0px 0px 3px rgba(30,185,157,1)')
      .with('illegal', () => '0px 0px 0px 3px rgba(255, 86, 86, .8)')
      .otherwise(() => 'none'),
  }

  const towerHeight = useSelector(getTowerHeight)
  const style = {
    ...hoverStyle,
    height: `${towerHeight}px`,
    minHeight: '200px',
  }
  return (
    <div className="place-items-center relative min-w-72">
      <div ref={setNodeRef} data-id={id} className="px-5">
        <div
          style={style}
          className="relative h-96 border border-b-0 border-x-2 border-t-2 border-amber-100 w-4 bg-orange-200 rounded-t-2xl"
        ></div>
      </div>
    </div>
  )
}
export default Tower
