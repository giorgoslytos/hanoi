import {
  DndContext,
  DragEndEvent,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { IoIosColorPalette } from 'react-icons/io'
import { useDispatch, useSelector } from 'react-redux'

import ButtonIcon from '../../components/ButtonIcon'
import ContainerWrapper from '../../components/ContainerWrapper'
import TowerWrapper from '../../components/TowerWrapper'
import { RootState } from '../../store'
import { TowerId } from '../../types'
import { moveDisc, setColors } from './hanoiSlice'
import { useWindowSize } from 'react-use'

const Hanoi = ({ finished }: { finished: boolean }) => {
  const dispatch = useDispatch()
  const { width } = useWindowSize()
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
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 10, // Require 10px movement before activating
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        distance: { y: 300 },
        delay: 0, // Delay activation by 250ms
        tolerance: 10, // Allow 5px of movement during delay
      },
    }),
  )
  return (
    <div
      className={`md:border md:p-8 border-amber-50 ${
        finished || mode === 'auto'
          ? 'pointer-events-none'
          : 'pointer-events-auto'
      }`}
    >
      <DndContext onDragEnd={handleDragEnd} sensors={sensors}>
        <ContainerWrapper>
          <ButtonIcon
            color="text-gray-500 hover:text-teal-500"
            className="absolute right-[-8px] md:top-[-24px] md:right-[-64px] w-10 pointer-events-auto"
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
