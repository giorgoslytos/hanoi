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

  const isCompleted = useSelector(
    (state: RootState) => state.hanoi.autoHanoiState === 'completed',
  )
  return (
    <>
      {isCompleted && (
        <Confetti
          // gravity={0.3}
          // friction={0.99}
          // initialVelocityY={20}
          width={width}
          height={height}
          recycle={false}
        />
      )}
      <Hanoi finished={isCompleted} />
      <HanoiControls />
    </>
  )
}

export default App
