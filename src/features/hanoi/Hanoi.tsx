import { DndContext, DragEndEvent, DragOverEvent } from '@dnd-kit/core'
import { useDispatch, useSelector } from 'react-redux'

import ContainerWrapper from '../../components/ContainerWrapper'
import TowerWrapper from '../../components/TowerWrapper'
import { RootState } from '../../store'
import { TowerId } from '../../types'
import { moveDisc } from './hanoiSlice'

const Hanoi = ({ finished }: { finished: boolean }) => {
  const dispatch = useDispatch()
  const towers = useSelector((state: RootState) => state.hanoi.towers)
  function handleDragEnd({ active, over }: DragEndEvent) {
    if (!over) return
    const to = over.id as TowerId
    const discId = active.id as number
    const from = active.data.current?.from
    if (Math.min(...towers[to]) < discId || to === from) return
    dispatch(moveDisc({ discId, from, to }))
  }
  function handleDragOver(e: DragOverEvent) {
    console.log({ dragEnd: e, asdf: e.over?.id })
    const discId = e.active.id as number
    const over = e.over?.id as TowerId

    if (!over) return
    if (Math.min(...towers[over]) < discId) {
      console.log('asdf')
    }
  }
  return (
    <div
      className={`border p-8 border-amber-50 ${finished ? 'pointer-events-none' : 'pointer-events-auto'}`}
    >
      <DndContext onDragEnd={handleDragEnd} onDragOver={handleDragOver}>
        <ContainerWrapper>
          <TowerWrapper id="start" />
          <TowerWrapper id="temp" />
          <TowerWrapper id="finish" />
        </ContainerWrapper>
      </DndContext>
    </div>
  )
}
export default Hanoi
