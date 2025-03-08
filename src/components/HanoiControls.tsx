import { useDispatch, useSelector } from 'react-redux'

import React from 'react'

import {
  moveDisc,
  resetDiscs,
  setAutoSpeed,
  setColors,
  setDiscCount,
} from '../features/hanoi/hanoiSlice'
import { RootState } from '../store'
import { TowerId } from '../types'

const HanoiControls = () => {
  const dispatch = useDispatch()
  const discsCount = useSelector((state: RootState) => state.hanoi.discsCount)
  const autoSpeed = useSelector((state: RootState) => state.hanoi.autoSpeed)
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

  const handleAutoHanoi = () => {
    autoHanoi(discsCount, 'start', 'finish', 'temp')
  }
  const autoHanoi = async function (
    n: number,
    from_rod: TowerId,
    to_rod: TowerId,
    aux_rod: TowerId,
  ) {
    if (n == 0) {
      return
    }

    await autoHanoi(n - 1, from_rod, aux_rod, to_rod)
    console.log(
      'Move disk ' +
        n +
        ' from rod ' +
        from_rod +
        ' to rod ' +
        to_rod +
        '<br/>',
    )
    await new Promise((res) => {
      setTimeout(
        () =>
          res(dispatch(moveDisc({ discId: n, from: from_rod, to: to_rod }))),
        autoSpeed,
      )
    })
    await autoHanoi(n - 1, aux_rod, to_rod, from_rod)
  }

  const handleAutoSpeedChange = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    console.log(value)
    dispatch(setAutoSpeed(Number(value)))
  }

  return (
    <div className="m-8">
      <button
        onClick={handleAutoHanoi}
        className="bg-teal-100 hover:bg-teal-500 text-teal-700 font-semibold hover:text-white py-2 px-4 border border-teal-500 hover:border-transparent rounded"
      >
        asf
      </button>
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
          <label className="cursor-pointer">
            <input
              type="radio"
              name="mode"
              value="auto"
              className="hidden peer"
              defaultChecked
            />
            <div className="px-4 py-2 font-semibold border border-teal-400 rounded text-teal-700  peer-checked:border-teal-500 peer-checked:bg-teal-500 peer-checked:text-white transition">
              Manual
            </div>
          </label>

          <label className="cursor-pointer">
            <input
              type="radio"
              name="mode"
              value="manual"
              className="hidden peer"
            />
            <div className="px-4 py-2 font-semibold border border-teal-400 rounded text-teal-700  peer-checked:border-teal-500 peer-checked:bg-teal-500 peer-checked:text-white transition">
              Auto
            </div>
          </label>

          <div className="flex flex-col items-center w-full max-w-md p-4">
            <input
              type="range"
              min="1"
              max="2000"
              step="1"
              value={autoSpeed}
              onChange={handleAutoSpeedChange}
              className="w-full h-2 bg-teal-200 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-teal-400"
              style={{
                WebkitAppearance: 'none',
                accentColor: 'teal',
              }}
            />
            <span className="mt-2 text-teal-600 font-semibold">
              {/* {value} */}
            </span>
          </div>
        </div>
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
  )
}
export default HanoiControls
