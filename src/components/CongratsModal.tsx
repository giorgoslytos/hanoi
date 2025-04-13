import 'animate.css'
import { useSelector } from 'react-redux'

import React from 'react'

import { RootState } from '../store'

const CongratsModal: React.FC<React.PropsWithChildren> = ({ children }) => {
  const isCompleted = useSelector(
    (state: RootState) => state.hanoi.hanoiState === 'completed',
  )
  const cheated = useSelector((state: RootState) => state.hanoi.cheated)
  const [isOpen, setIsOpen] = React.useState(false)
  const moves = useSelector((state: RootState) => state.hanoi.moves)
  const discCount = useSelector((state: RootState) => state.hanoi.discsCount)
  const optimalMoves = React.useMemo(() => 2 ** discCount - 1, [discCount])

  React.useEffect(() => {
    setIsOpen(isCompleted)
  }, [isCompleted])
  if (!isOpen) return children

  return (
    <>
      <div className="w-screen fixed inset-0 flex items-center justify-center backdrop-blur-sm z-[999]">
        <div className="bg-gray-900 rounded-lg border-2 border-teal-500 p-6 max-w-md w-full mx-4">
          <div className="flex flex-col space-y-4">
            <h2 className="text-2xl font-bold text-teal-400">
              Congratulations! 🎉
            </h2>
            <div className="text-gray-200">
              {cheated ? (
                <>
                  <p>
                    Heeeey! You has cheated!!! Either way... Congrats for
                    solving Tower of Hanoi! 😉
                  </p>
                  <br />
                  <div>
                    You
                    <span className="italic text-gray-400">
                      {' '}
                      ( ...Well not really You!{' '}
                    </span>
                    😝<span className="italic text-gray-400">)</span> made{' '}
                    {moves} moves
                  </div>
                </>
              ) : (
                <p>
                  You have successfully solved Tower of Hanoi with{' '}
                  <b>{moves}</b> moves!
                </p>
              )}
            </div>
            <div className="flex justify-between">
              <p className="text-gray-300 font-medium my-auto">
                Optimal: {optimalMoves} moves
              </p>
              <button
                onClick={() => setIsOpen(false)}
                className="bg-teal-100 hover:bg-teal-500 text-teal-700 font-semibold hover:text-white py-2 px-4 border border-teal-500 hover:border-transparent rounded transition-colors duration-200"
              >
                Go Back
              </button>
            </div>
          </div>
        </div>
      </div>
      {children}
    </>
  )
}

export default CongratsModal
