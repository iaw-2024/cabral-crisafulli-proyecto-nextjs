import { Producto } from "../definitions";

export const addOne = (id: number) => ({ type: "ADD_ONE", payload: id });

export const removeOne = (id: number) => ({ type: "REMOVE_ONE", payload: id });

export const removeFromCart = (id: number) => ({ type: "REMOVE_FROM_CART", payload: id });

export const clearCart = () => ({ type: "CLEAR_CART" });

export const getCart = () => ({ type: "GET_CART" })

export const addToCart = (producto: Producto) => {
    const newItemWithQuantity = { ...producto, quantity: 1 };
    return ({ type: "ADD_TO_CART", payload: newItemWithQuantity });
};