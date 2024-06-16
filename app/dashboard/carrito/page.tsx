'use client'
import '@/app/ui/global.css';
import { ShoppingCartIcon, XMarkIcon, CreditCardIcon } from '@heroicons/react/24/outline';
import React, { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import ProductCartTable from '@/app/ui/cart/table';
import { vaciarCarrito } from '@/redux/features/carrito/carritoSlice';
import Link from 'next/link';


const CancelledCartIcon = () => {
    return (
        <div className="relative inline-block">
            <ShoppingCartIcon className="h-6 w-6 text-white-500" />
            <XMarkIcon className="h-4 w-4 text-white-500 absolute top-0 right-0" />
        </div>
    );
};


export default function Page() {

    //TODO usar los productos del estado para la pagina 
    const products = useAppSelector(state => state.productos)
    const dispatch = useAppDispatch()
    return (
        <>
            <p className="carrito">Carrito</p>
            <div className="flex justify-end">
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded flex items-center"
                    onClick={() => { dispatch(vaciarCarrito()) }}>
                    <CancelledCartIcon />
                    <span className="ml-2">Vaciar carrito</span>
                </button>
                <Link
                    href="/dashboard/pagar"
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded flex items-center">
                    Pagar
                </Link>
            </div>
            <ProductCartTable productos={products} />
        </>
    );
}