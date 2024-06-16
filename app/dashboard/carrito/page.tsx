'use client'
import '@/app/ui/global.css';
import { ShoppingCartIcon, XMarkIcon } from '@heroicons/react/24/outline';
import React, { useEffect, useState } from 'react';
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
    // Obtener los productos del estado
    const products = useAppSelector(state => state.productos)
    const dispatch = useAppDispatch()

    // Estado para habilitar o deshabilitar los botones
    const [isDisabled, setIsDisabled] = useState(false);

    // Efecto para actualizar el estado basado en la cantidad de productos
    useEffect(() => {
        setIsDisabled(products.length === 0);
    }, [products]);

    return (
        <>
            <p className="carrito">Carrito</p>
            <div className="flex justify-end">
                <button
                    className={`${isDisabled ? 'bg-red-400 cursor-not-allowed' : 'bg-red-500 hover:bg-red-700'
                        } text-white font-bold py-2 px-4 rounded flex items-center`}
                    onClick={() => { if (!isDisabled) dispatch(vaciarCarrito()) }}
                    disabled={isDisabled}>
                    <CancelledCartIcon />
                    <span className="ml-2">Vaciar carrito</span>
                </button>
                <Link
                    href={isDisabled ? "#" : "/dashboard/pagar"}
                    onClick={(e) => isDisabled && e.preventDefault()}
                    className={`${isDisabled ? 'bg-purple-400 cursor-not-allowed' : 'bg-green-500 hover:bg-green-700'
                        } text-white font-bold py-2 px-4 rounded flex items-center`}>
                    Pagar
                </Link>
            </div>
            <ProductCartTable productos={products} />
        </>
    );
}
