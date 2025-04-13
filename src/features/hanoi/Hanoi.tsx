import { DndContext, DragEndEvent } from '@dnd-kit/core'
import { IoIosColorPalette } from 'react-icons/io'
import { useDispatch, useSelector } from 'react-redux'

import ButtonIcon from '../../components/ButtonIcon'
import ContainerWrapper from '../../components/ContainerWrapper'
import TowerWrapper from '../../components/TowerWrapper'
import { RootState } from '../../store'
import { TowerId } from '../../types'
import { moveDisc, setColors } from './hanoiSlice'

const Hanoi = ({ finished }: { finished: boolean }) => {
  const dispatch = useDispatch()
  const towers = useSelector((state: RootState) => state.hanoi.towers)
  const mode = useSelector((state: RootState) => state.hanoi.mode)
  function handleDragEnd({ active, over }: DragEndEvent) {
    if (!over) return
    const to = over.id as TowerId
    const discId = active.id as number
    const from = active.data.current?.from
    if (Math.min(...towers[to]) < discId || to === from) return
    dispatch(moveDisc({ discId, from, to, mode }))
  }

  const handleResetColors = () => {
    dispatch(setColors())
  }
  return (
    <div
      className={`border p-8 border-amber-50 ${
        finished || mode === 'auto'
          ? 'pointer-events-none'
          : 'pointer-events-auto'
      }`}
    >
      <DndContext onDragEnd={handleDragEnd}>
        <ContainerWrapper>
          <ButtonIcon
            color="text-gray-500 hover:text-teal-500"
            className="absolute top-[-24px] right-[-64px] w-10 pointer-events-auto"
            hoverColor="text-purple-300"
            size={8}
            onClick={handleResetColors}
          >
            <IoIosColorPalette className="opacity-90" />
          </ButtonIcon>
          <TowerWrapper id="start" />
          <TowerWrapper id="temp" />
          <TowerWrapper id="finish" />
        </ContainerWrapper>
      </DndContext>
    </div>
  )
}
export default Hanoi
