
import { Action, Product } from "../definitions";

export interface State {
    cart: Product[];
}

export const cartInitialState: State = {
    cart: []
}

export function cartReducer(state: State, action: Action): State {
    switch (action.type) {
        case "ADD_TO_CART": {
            const newItem = action.payload;
            return {
                ...state,
                cart: [...state.cart, newItem],
            };
        }
        case "CLEAR_CART": {
            return {
                ...state,
                cart: [],
            };
        }
        case "REMOVE_FROM_CART": {
            return {
                ...state,
                cart: state.cart.filter(item => item.id !== action.payload),
            };
        }
        case "ADD_ONE": {
            const updatedCart = state.cart.map(item =>
                item.id === action.payload ? { ...item, quantity: item.quantity + 1 } : item
            );
            return {
                ...state,
                cart: updatedCart,
            };
        }
        case "REMOVE_ONE": {
            const updatedCart = state.cart.map(item =>
                item.id === action.payload ? { ...item, quantity: item.quantity - 1 } : item
            );
            return {
                ...state,
                cart: updatedCart,
            };
        }
        case "GET_CART": {
            return state;
        }
        default:
            return state;
    }
}