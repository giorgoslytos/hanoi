import './App.css'
import reactLogo from './assets/react.svg'
import { Counter } from './features/counter/Counter'
import Hanoi from './features/hanoi/Hanoi'
import viteLogo from '/vite.svg'

function App() {
  return (
    <>
      {/* <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <Counter /> */}
      <Hanoi />
    </>
  )
}

export default App
