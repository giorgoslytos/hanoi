import { useDispatch, useSelector } from 'react-redux'

import React from 'react'

import {
  resetDiscs,
  setColors,
  setDiscCount,
} from '../features/hanoi/hanoiSlice'
import { RootState } from '../store'
import ModeSelector from './ModeSelector'

const HanoiControls = () => {
  const dispatch = useDispatch()
  const discsCount = useSelector((state: RootState) => state.hanoi.discsCount)
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
          <label htmlFor="number" className="text-gray-700">
            Select number of Discs:
          </label>
          <select
            id="number"
            value={discsCount}
            onChange={handleSelectDiscCountChange}
            className="px-4 py-2 border-2 border-gray-400 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
        </div>
      </div>
    </div>
  )
}
export default HanoiControls
