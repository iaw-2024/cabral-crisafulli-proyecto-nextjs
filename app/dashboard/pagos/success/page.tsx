'use client'

import { vaciarCarrito } from '@/redux/features/carrito/carritoSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';

export default function Page() {

    const productos = useAppSelector(state => state.productos);
    const formData = useAppSelector(state => state.formData);
    const dispatch = useAppDispatch();


    dispatch(vaciarCarrito())

    return (
        <div>

        </div>
    );
}