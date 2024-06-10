import { configureStore } from '@reduxjs/toolkit'
import carritoSlice from './features/carrito/carritoSlice'


export const makeStore = () => {
  return configureStore({
    reducer: carritoSlice
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']

