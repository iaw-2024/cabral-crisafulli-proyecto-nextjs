// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.
// However, these types are generated automatically if you're using an ORM such as Prisma.
export type Product = {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  categoria: Categoria;
  pedidoId: number;
  fotoURL: string;
};

export type User = {
  id: string;
  email: string;
  password: string;
};

export const OperacionesCarrito = {
  ADD_TO_CART: "ADD_TO_CART",
  CLEAR_CART: "CLEAR_CART",
  REMOVE_FROM_CART: "REMOVE_FROM_CART",
}

export type State = {
  errors?: {
    id?: string[];
    nombre?: string[];
    precio?: string[];
    categoria?: string[];
    pedidoId?: string[];
  };
  message?: string | null;
};

export type Categoria = "Amistad" | "Pareja" | "Familia" | "Individual" | "Personalizada";
