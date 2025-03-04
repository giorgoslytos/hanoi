import { useDraggable } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'

import React from 'react'

const Disc = ({ id }: React.PropsWithChildren<{ id: number }>) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id,
    })
  const style = {
    transform: CSS.Translate.toString(transform),
    width: id * 20 + 36,
    zIndex: isDragging ? 999 : 99,
    boxShadow: isDragging ? '0px 0px 0px 3px rgba(30,185,157,1)' : 'none',
  }

  const cursor = isDragging ? 'cursor-grabbing' : 'cursor-grab'
  return (
    <button
      ref={setNodeRef}
      className={`${cursor} px-2 h-4 py-3 bg-blue-600 rounded-2xl relative`}
      style={style}
      {...listeners}
      {...attributes}
    ></button>
  )
}

export default Disc
