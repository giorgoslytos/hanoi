import { useDispatch, useSelector } from 'react-redux'

import React from 'react'

import {
  resetDiscs,
  setColors,
  setDiscCount,
} from '../features/hanoi/hanoiSlice'
import getDisableDiscCountSelector from '../features/hanoi/selectors/getDisableDiscCountSelector'
import { RootState } from '../store'
import ModeSelector from './ModeSelector'

const HanoiControls = () => {
  const dispatch = useDispatch()
  const discsCount = useSelector((state: RootState) => state.hanoi.discsCount)
  const moves = useSelector((state: RootState) => state.hanoi.moves)

  const handleReset = () => {
    dispatch(resetDiscs())
  }

  const handleSelectDiscCountChange = ({
    target: { value },
  }: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setDiscCount(Number(value)))
  }

  const hanoiState = useSelector((state: RootState) => state.hanoi.hanoiState)

  const disableSelect = useSelector(getDisableDiscCountSelector)

  return (
    <div className="m-8 px-24">
      <div className="mt-4">
        {hanoiState !== 'completed' ? <ModeSelector /> : <></>}
        <div className="mt-4 flex items-center space-x-2">
          <label
            htmlFor="number"
            className="text-gray-200 my-auto font-bold w-24"
          >
            Discs:
          </label>
          <select
            id="number"
            value={discsCount}
            disabled={disableSelect}
            onChange={handleSelectDiscCountChange}
            className=" disabled:text-gray-600 disabled:cursor- px-4 py-2 border-2 border-gray-400 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-black"
          >
            {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
              <option value={num} key={num} className="bg-black">
                {num}
              </option>
            ))}
          </select>
          <div className="ml-2 flex gap-4">
            <button
              onClick={handleReset}
              className="bg-teal-100 hover:bg-teal-500 text-teal-700 font-semibold hover:text-white py-2 px-4 border border-teal-500 hover:border-transparent rounded"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
export default HanoiControls
