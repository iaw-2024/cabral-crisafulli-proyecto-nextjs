'use client'

import { crearPedido } from '@/app/lib/actions';
import { vaciarCarrito } from '@/redux/features/carrito/carritoSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';

export default function Page() {

    const productos = useAppSelector(state => state.productos);
    const datos = useAppSelector(state => state.datos);
    const dispatch = useAppDispatch();
    crearPedido(datos, productos)
    dispatch(vaciarCarrito())

    return (
        <div>
            <p>Pago exitoso</p>
        </div>
    );
}