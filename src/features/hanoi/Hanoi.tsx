import { DndContext, DragEndEvent } from '@dnd-kit/core'

import DiscWrapper from '../../components/DiscWrapper'
import Tower from '../../components/Tower'
import ContainerWrapper from '../../components/TowerWrapper'

const Hanoi = () => {
  function handleDragEnd(e: DragEndEvent) {
    console.log({ e })
  }
  return (
    <div className="border p-8 border-amber-50">
      <DndContext onDragEnd={handleDragEnd}>
        <div className="flex flex-col items-center"></div>
        <ContainerWrapper>
          <div className="flex relative">
            <Tower id="start" />
            <DiscWrapper id="start" />
          </div>
          <div className="flex relative">
            <Tower id="temp" />
            <DiscWrapper id="temp" />
          </div>
          <div className="flex relative">
            <Tower id="finish" />
            <DiscWrapper id="finish" />
          </div>
        </ContainerWrapper>
      </DndContext>
    </div>
  )
}
export default Hanoi
