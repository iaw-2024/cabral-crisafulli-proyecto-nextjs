'use client'

import { useReducer } from 'react';
import { cartInitialState, cartReducer } from '@/app/lib/reducer/cartReducer';
import { getProductCart } from "../data";

export function useCart() {
    const [state, dispatch] = useReducer(cartReducer, cartInitialState);

    const addOne = (id: number) => {
        dispatch({ type: "ADD_ONE", payload: id });
    };

    const removeOne = (id: number) => {
        dispatch({ type: "REMOVE_ONE", payload: id });
    };

    const removeFromCart = (id: number) => {
        dispatch({ type: "REMOVE_FROM_CART", payload: id });
    };

    const clearCart = () => {
        dispatch({ type: "CLEAR_CART" });
    };

    const getCart = () => {
        return state.cart;
    };

    const addToCart = async (id: number) => {
        const newItem = await getProductCart(id);
        if (newItem !== null) {
            const newItemWithQuantity = { ...newItem, quantity: 1 };
            dispatch({ type: "ADD_TO_CART", payload: newItemWithQuantity });
        } else {
            console.error(`Product with id ${id} not found`);
        }
    };

    return {
        addOne,
        removeOne,
        removeFromCart,
        clearCart,
        getCart,
        addToCart,
    };
}