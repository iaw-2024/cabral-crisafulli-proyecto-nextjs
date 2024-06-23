import { RootState } from '@/redux/store';

export const selectTotalItemsInCarrito = (state: RootState) => {
    return state.productos.reduce((total, item) => total + item.quantity, 0);
};
