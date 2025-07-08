import { Pause, Play } from 'lucide-react'
import { VscDebugContinue } from 'react-icons/vsc'
import { useDispatch, useSelector } from 'react-redux'
import { match } from 'ts-pattern'

import React from 'react'

import {
  HanoiState,
  pauseAutoHanoi,
  resumeAuto,
  setAutoSpeed,
  setMode,
  startAutoHanoi,
} from '../features/hanoi/hanoiSlice'
import { RootState } from '../store'

const MAX_AUTOSPEED = 2000

const ModeSelector = () => {
  const dispatch = useDispatch()
  const autoSpeed = useSelector((state: RootState) => state.hanoi.autoSpeed)
  const mode = useSelector((state: RootState) => state.hanoi.mode)
  const autoHanoiState = useSelector(
    (state: RootState) => state.hanoi.hanoiState,
  )

  const startAuto = () => {
    dispatch(startAutoHanoi())
  }

  const pauseAuto = () => {
    dispatch(pauseAutoHanoi())
  }

  const handleAutoSpeedChange = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setAutoSpeed(MAX_AUTOSPEED - Number(value)))
  }

  const handleModeChange = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setMode(value as HanoiState['mode']))
  }

  const handleResume = () => dispatch(resumeAuto())

  const autoSpeedRangeValue = React.useMemo(
    () => MAX_AUTOSPEED - autoSpeed + 50,
    [autoSpeed],
  )

  const moves = useSelector((state: RootState) => state.hanoi.moves)

  return (
    <>
      <h3 className="text-gray-300 my-auto font-bold w-24 mx-auto">
        Moves: {moves}
      </h3>
      <div className="flex space-x-2 my-4 flex-col sm:flex-row gap-4">
        <div className="flex space-x-2">
          <label className="cursor-pointer">
            <input
              type="radio"
              name="mode"
              value="manual"
              checked={mode === 'manual'}
              className="hidden peer"
              onChange={handleModeChange}
            />
            <div className="px-4 py-2 font-semibold border border-teal-400 rounded text-teal-700  peer-checked:border-teal-500 peer-checked:bg-teal-500 peer-checked:text-white transition">
              Manual
            </div>
          </label>

          <label className="cursor-pointer">
            <input
              type="radio"
              name="mode"
              value="auto"
              checked={mode === 'auto'}
              className="hidden peer"
              onChange={handleModeChange}
            />
            <div className="px-4 py-2 font-semibold border border-teal-400 rounded text-teal-700  peer-checked:border-teal-500 peer-checked:bg-teal-500 peer-checked:text-white transition">
              Auto
            </div>
          </label>
        </div>
        {mode === 'auto' && autoHanoiState !== 'completed' && (
          <div className="flex">
            {match(autoHanoiState)
              .with('idle', () => (
                <button
                  onClick={startAuto}
                  className="p-2 rounded border border-teal-500 bg-teal-500 text-white transition hover:bg-teal-600"
                >
                  <Play className="w-5 h-5 text-white" />
                </button>
              ))
              .with('running', () => (
                <button
                  onClick={pauseAuto}
                  className="p-2 rounded border border-teal-500 bg-teal-500 text-white transition hover:bg-teal-600"
                >
                  <Pause className="w-5 h-5 text-white" />
                </button>
              ))
              .with('paused', () => {
                return (
                  <button
                    onClick={handleResume}
                    className="p-2 rounded border border-teal-500 bg-teal-500 text-white transition hover:bg-teal-600"
                  >
                    <VscDebugContinue className="w-5 h-5 text-white" />
                  </button>
                )
              })
              // .with('completed', () => <div>completed</div>)
              .with('failed', () => <div>failed</div>)
              .exhaustive()}
            <div className="flex flex-col items-center w-48 p-4">
              <input
                type="range"
                min="1"
                max={MAX_AUTOSPEED}
                step="1"
                value={autoSpeedRangeValue}
                onChange={handleAutoSpeedChange}
                className="w-full h-2 bg-teal-200 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-teal-400"
                style={{
                  WebkitAppearance: 'none',
                  accentColor: 'teal',
                }}
              />
              <span className="text-teal-600 font-semibold"></span>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
export default ModeSelector
