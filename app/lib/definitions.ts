export type Categoria = "Amistad" | "Pareja" | "Familia" | "Individual" | "Personalizada";

export type Product = {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  categoria: Categoria;
  pedidoId: number | null;
  fotoURL: string;
  quantity: number;
};

export type User = {
  id: string;
  email: string;
  password: string;
};

export type Action =
  | { type: 'ADD_TO_CART'; payload: Product }
  | { type: 'CLEAR_CART' }
  | { type: 'REMOVE_FROM_CART'; payload: number }
  | { type: 'ADD_ONE'; payload: number }
  | { type: 'REMOVE_ONE'; payload: number };

  export type ProductForm = {
    id: number;
    nombre: string;
    descripcion: string;
    precio: number;
    categoria: string;
    pedidoId: number | null;
    fotoURL: string;
  };


export type Estado = {
  errors?: {
    id?: string[];
    nombre?: string[];
    precio?: string[];
    categoria?: string[];
    pedidoId?: string[];
  };
  message?: string | null;
};