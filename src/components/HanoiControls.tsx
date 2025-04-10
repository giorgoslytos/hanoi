import { useDispatch, useSelector } from 'react-redux'

import React from 'react'

import {
  resetDiscs,
  setColors,
  setDiscCount,
  undoLastMove,
} from '../features/hanoi/hanoiSlice'
import getLastMovement from '../features/hanoi/selectors/getLastMovement'
import { RootState } from '../store'
import { generateInstructions } from '../utils/autoHanoi'
import ModeSelector from './ModeSelector'

const HanoiControls = () => {
  const dispatch = useDispatch()
  const discsCount = useSelector((state: RootState) => state.hanoi.discsCount)
  const moves = useSelector((state: RootState) => state.hanoi.moves)
  React.useEffect(() => {
    dispatch(setDiscCount(discsCount))
    dispatch(setColors())
  }, [])

  const handleReset = () => {
    dispatch(resetDiscs())
  }

  const handleResetColors = () => {
    dispatch(setColors())
  }

  const handleSelectDiscCountChange = ({
    target: { value },
  }: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setDiscCount(Number(value)))
  }

  const handleUndo = () => {
    dispatch(undoLastMove())
  }
  const disableUndo = !useSelector(getLastMovement())

  return (
    <div className="m-8">
      <div className="flex gap-4">
        <button
          onClick={handleReset}
          className="bg-teal-100 hover:bg-teal-500 text-teal-700 font-semibold hover:text-white py-2 px-4 border border-teal-500 hover:border-transparent rounded"
        >
          Reset
        </button>
        <button
          onClick={handleResetColors}
          className="bg-teal-100 hover:bg-teal-500 text-teal-700 font-semibold hover:text-white py-2 px-4 border border-teal-500 hover:border-transparent rounded"
        >
          Generate Disc Color Palette
        </button>
      </div>
      <div className="mt-4">
        <div className="flex space-x-2">
          <ModeSelector />
        </div>
        <div className="mt-4 flex items-center space-x-2">
          <label htmlFor="number" className="text-gray-200">
            Select number of Discs:
          </label>
          <select
            id="number"
            value={discsCount}
            onChange={handleSelectDiscCountChange}
            className="px-4 py-2 border-2 border-gray-400 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-black"
          >
            {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
              <option value={num} key={num} className="bg-black">
                {num}
              </option>
            ))}
          </select>
        </div>
      </div>
      <h3 className="text-gray-200">Moves: {moves}</h3>
      <button onClick={() => console.log(generateInstructions(discsCount))}>
        sadf
      </button>
      <button
        onClick={handleUndo}
        disabled={disableUndo}
        className={
          `${disableUndo ? 'bg-gray-400 cursor-not-allowed opacity-50' : 'bg-teal-100 hover:bg-teal-500 text-teal-700 hover:text-white hover:border-transparent border-teal-500'}` +
          ' font-semibold  py-2 px-4 border rounded'
        }
      >
        undo
      </button>
    </div>
  )
}
export default HanoiControls
