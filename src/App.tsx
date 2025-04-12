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
        <Confetti width={width} height={height} recycle={false} />
      )}
      <div className="flex flex-wrap">
        <Hanoi finished={isCompleted} />
      </div>
      <HanoiControls />
    </>
  )
}

export default App
