import { useSelector } from 'react-redux'

import { RootState } from '../store'
import Disc from './Disc'
import { TowerProp } from './types'

const DiscWrapper = ({ id }: React.PropsWithChildren<TowerProp>) => {
  const items = useSelector((state: RootState) => state.hanoi.towers[id])

  return (
    <div className="flex flex-col items-center bottom-0 absolute m-auto left-0 right-0">
      {items.map((item) => (
        <Disc id={item} />
      ))}
    </div>
  )
}

export default DiscWrapper
