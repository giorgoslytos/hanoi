import 'animate.css'
import Confetti from 'react-confetti'
import { useDispatch, useSelector } from 'react-redux'
import { useWindowSize } from 'react-use'

import React from 'react'

import './App.css'
import CongratsModal from './components/CongratsModal'
import HanoiControls from './components/HanoiControls'
import Hanoi from './features/hanoi/Hanoi'
import { initialAppLoad } from './features/hanoi/hanoiSlice'
import { RootState } from './store'

function App() {
  const { width, height } = useWindowSize()
  const isCompleted = useSelector(
    (state: RootState) => state.hanoi.hanoiState === 'completed',
  )
  const dispatch = useDispatch()

  React.useEffect(() => {
    dispatch(initialAppLoad())
  }, [dispatch])

  return (
    <>
      <div className="justify-self-center flex flex-col h-screen">
        <div>
          <header>
            <h1
              className="text-3xl sm:text-4xl font-bold text-gray-100 
             text-center my-8"
            >
              Tower of Hanoi
            </h1>
          </header>
          <main>
            <div className="flex flex-wrap flex-col justify-center">
              <Hanoi finished={isCompleted} />
            </div>
            <HanoiControls />

            <div className="bg-gray-800/90 rounded-lg p-6 my-8">
              <h2 className="text-2xl font-bold text-teal-400 mb-4 border-b pb-2">
                The Tower of Hanoi Puzzle
              </h2>

              <div className="space-y-4 text-gray-300">
                <p>
                  The Tower of Hanoi is a classic mathematical puzzle that
                  demonstrates principles of recursion and logical thinking.
                </p>

                <p>
                  To solve the puzzle, you must move the entire stack of disks
                  to another rod while following these rules:
                </p>

                <ul className="list-disc pl-6 space-y-2">
                  <li className="pl-2">Move only one disk at a time</li>
                  <li className="pl-2">
                    Always move the top disk from any stack and place it onto
                    another rod
                  </li>
                  <li className="pl-2">
                    Never place a larger disk on top of a smaller one
                  </li>
                </ul>

                <p className="bg-gray-700/50 p-3 rounded-md italic">
                  <strong>Did you know?</strong> The minimum number of moves
                  needed to solve the puzzle is 2<sup>n</sup> − 1, where n is
                  the number of disks. For example, 3 disks require 7 moves.
                </p>
              </div>
            </div>
          </main>
        </div>
        <footer className="md:p-8 bg-gray-800 text-white">
          Created by &nbsp;
          <a
            className="text-teal-400 hover:text-teal-300
        font-semibold transition-colors duration-200 decoration-2 focus:outline-none focus:ring-2 
        focus:ring-teal-200 focus:ring-offset-2 rounded-sm"
            href="https://www.linkedin.com/in/george-litos-215b2918a/"
          >
            George Litos
          </a>
          &nbsp; © 2025
        </footer>
        {isCompleted && (
          // <Confetti width={width} height={height} recycle={false} />
          <Confetti width={width - 24} height={height} recycle={false} />
        )}
        <CongratsModal />
      </div>
    </>
  )
}

export default App
