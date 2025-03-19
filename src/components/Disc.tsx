import { useDraggable } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'

import React from 'react'

import { TowerId } from '../types'

const Disc = ({
  id,
  towerId,
  color,
  enabled,
}: React.PropsWithChildren<{
  id: number
  towerId: TowerId
  color: string
  enabled: boolean
}>) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id,
      disabled: !enabled,
      data: { from: towerId },
    })
  const style = {
    transform: CSS.Translate.toString(transform),
    width: id * 15 + 28,
    zIndex: isDragging ? 999 : 99,
    backgroundColor: color,
    outline: isDragging ? 'solid 2px #ccc' : 'none',
    boxShadow: isDragging ? '0px 0px 0px 5px rgba(30,185,157,1)' : 'none',
  }

  const cursor = enabled
    ? isDragging
      ? 'cursor-grabbing'
      : 'cursor-grab'
    : 'cursor-default'

  return (
    <button
      data-id={id}
      onDrag={console.log}
      ref={setNodeRef}
      className={`${cursor} px-2 h-4 py-3 rounded-2xl relative`}
      style={style}
      {...listeners}
      {...attributes}
    ></button>
  )
}

export default Disc
