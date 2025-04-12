import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'

import hanoiSlice from '../features/hanoi/hanoiSlice'
import rootSaga from './rootSaga'

const sagaMiddleware = createSagaMiddleware()

export const store = configureStore({
  reducer: {
    hanoi: hanoiSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware), // Correct way to add saga middleware
})

sagaMiddleware.run(rootSaga)

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
