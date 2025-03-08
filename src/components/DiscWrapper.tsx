import { useSelector } from 'react-redux'

import { RootState } from '../store'
import { TowerProp } from '../types'
import Disc from './Disc'

const DiscWrapper = ({ id }: React.PropsWithChildren<TowerProp>) => {
  const discs = useSelector((state: RootState) => state.hanoi.towers[id])
  const colors = useSelector((state: RootState) => state.hanoi.discColors)

  return (
    <div className="flex flex-col items-center bottom-0 absolute m-auto left-0 right-0">
      {discs.map((disc, index) => (
        <Disc
          id={disc}
          towerId={id}
          color={colors[disc]}
          key={disc}
          enabled={index === 0}
        />
      ))}
    </div>
  )
}

export default DiscWrapper
