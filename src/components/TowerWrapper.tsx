import { TowerProp } from '../types'
import DiscWrapper from './DiscWrapper'
import Tower from './Tower'

const TowerWrapper = ({ id }: React.PropsWithChildren<TowerProp>) => {
  return (
    <div className="flex relative">
      <Tower id={id} />
      <DiscWrapper id={id} />
    </div>
  )
}
export default TowerWrapper
