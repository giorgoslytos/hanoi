import 'animate.css'
import Confetti from 'react-confetti'
import { useSelector } from 'react-redux'
import useWindowSize from 'react-use/lib/useWindowSize'

import './App.css'
import HanoiControls from './components/HanoiControls'
import Hanoi from './features/hanoi/Hanoi'
import { RootState } from './store'

function App() {
  const { width, height } = useWindowSize()
  const isFinished = useSelector(
    (state: RootState) =>
      state.hanoi.discsCount === state.hanoi.towers.finish.length,
  )

  return (
    <>
      {isFinished && (
        <Confetti
          // gravity={0.3}
          // friction={0.99}
          // initialVelocityY={20}
          width={width}
          height={height}
          recycle={false}
        />
      )}
      <Hanoi finished={isFinished} />
      <HanoiControls />
    </>
  )
}

export default App
