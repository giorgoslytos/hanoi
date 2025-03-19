import { useDroppable } from '@dnd-kit/core'
import { useSelector } from 'react-redux'

import { RootState } from '../store'
import { TowerProp } from '../types'

const Tower = ({ id }: React.PropsWithChildren<TowerProp>) => {
  const { isOver, setNodeRef } = useDroppable({
    id,
  })
  const style = {
    boxShadow: isOver ? '0px 0px 0px 3px rgba(30,185,157,1)' : 'none',
  }
  const items = useSelector((state: RootState) => state.hanoi.towers[id])
  return (
    <div className="place-items-center relative w-52">
      <div
        ref={setNodeRef}
        data-id={id}
        style={style}
        className="relative h-64 border border-b-0 border-x-2 border-t-2 border-amber-100 w-4 bg-orange-200 rounded-t-2xl"
      ></div>
      {/* <div className="flex flex-col items-center bottom-0 absolute m-auto left-0 right-0">
        {items.map((item) => (
          <Disc id={item} />
        ))}
      </div> */}
    </div>
  )
}
export default Tower
