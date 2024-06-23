import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import type { Product } from '@/app/lib/definitions';

type SliceState = { productos: Product[], log: boolean, total: number, datos: string[] };

const initialState: SliceState = { productos: [], log: false, total: 0, datos: [] };

export const carritoSlice = createSlice({
  name: 'carrito',
  initialState: initialState,
  reducers: {
    agregarProducto: (state, action: PayloadAction<Product>) => {
      // Buscar si el producto ya existe en el estado
      const existingProduct = state.productos.find(product => product.id === action.payload.id);
      state.total = state.total + action.payload.precio;
      if (existingProduct) {
        // Si el producto existe, incrementar la cantidad
        existingProduct.quantity += 1;
      } else {
        // Si el producto no existe, agregarlo al estado
        state.productos.push({ ...action.payload, quantity: 1 });
      }
    },
    vaciarCarrito: (state) => {
      state.productos = [];
      state.total = 0;
    },
    borrarDeCarrito: (state, action: PayloadAction<Product>) => {
      const existingProduct = state.productos.find(product => product.id === action.payload.id);
      if (existingProduct) {
        state.total -= (existingProduct.precio * existingProduct.quantity);
      }
      state.productos = state.productos.filter(product => product.id !== action.payload.id);
    },
    agregarUno: (state, action: PayloadAction<Product>) => {
      // Buscar si el producto ya existe en el estado
      const existingProduct = state.productos.find(product => product.id === action.payload.id);
      if (existingProduct) {
        // Si el producto existe, incrementar la cantidad
        existingProduct.quantity += 1;
        state.total += existingProduct.precio;
      }
    },
    eliminarUno: (state, action: PayloadAction<Product>) => {
      // Buscar si el producto ya existe en el estado
      const existingProduct = state.productos.find(product => product.id === action.payload.id);
      if (existingProduct && existingProduct.quantity > 1) {
        // Si el producto existe y la cantidad es mayor a 1, decrementar la cantidad
        existingProduct.quantity -= 1;
        state.total -= existingProduct.precio;
      }
    },

    login: (state) => {
      state.log = true;
    },

    logout: (state) => {
      state.log = false;
    },

    cargarDatosFormulario: (state, action: PayloadAction<string[]>) => {
      action.payload.forEach(element => {
        state.datos.push(element)
      });
    },
  }
});

// Action creators are generated for each case reducer function
export const { agregarProducto, vaciarCarrito, borrarDeCarrito, agregarUno, eliminarUno, login, logout, cargarDatosFormulario } = carritoSlice.actions;

export default carritoSlice.reducer;