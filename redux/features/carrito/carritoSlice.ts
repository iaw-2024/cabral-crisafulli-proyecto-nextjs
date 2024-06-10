import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import type { Product } from '@/app/lib/definitions'

type SliceState = { productos: Product[] }

const initialState: SliceState = { productos: [] }

export const carritoSlice = createSlice({
    name: 'productos',
    initialState: initialState,
    reducers: {
        agregarProducto: (state, action: PayloadAction<Product>) => {
            // Buscar si el producto ya existe en el estado
            const existingProduct = state.productos.find(product => product.id === action.payload.id);

            if (existingProduct) {
                // Si el producto existe, incrementar la cantidad
                existingProduct.quantity += 1;
            } else {
                // Si el producto no existe, agregarlo al estado
                state.productos.push(action.payload);
            }
        },

        vaciarCarrito: (state) => {
            state.productos = []
        },

        borrarDeCarrito: (state, action: PayloadAction<Product>) => {
            state.productos = state.productos.filter(product => product.id !== action.payload.id);
        },

        agregarUno: (state, action: PayloadAction<Product>) => {
            // Buscar si el producto ya existe en el estado
            const existingProduct = state.productos.find(product => product.id === action.payload.id);

            if (existingProduct) {
                // Si el producto existe, incrementar la cantidad
                existingProduct.quantity += 1;
            }
        },

        eliminarUno: (state, action: PayloadAction<Product>) => {
            // Buscar si el producto ya existe en el estado
            const existingProduct = state.productos.find(product => product.id === action.payload.id);

            if (existingProduct) {
                if (existingProduct.quantity == 1) {
                    state.productos = state.productos.filter(product => product.id !== action.payload.id);
                }
                else {
                    existingProduct.quantity -= 1
                }
            }
        },
    }
})

// Action creators are generated for each case reducer function
export const { agregarProducto, vaciarCarrito, borrarDeCarrito, agregarUno, eliminarUno } = carritoSlice.actions

export default carritoSlice.reducer