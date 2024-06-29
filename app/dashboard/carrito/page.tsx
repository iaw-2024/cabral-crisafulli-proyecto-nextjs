'use client';
import '@/app/ui/global.css';
import { ShoppingCartIcon, XMarkIcon } from '@heroicons/react/24/outline';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import ProductCartTable from '@/app/ui/cart/table';
import { vaciarCarrito } from '@/redux/features/carrito/carritoSlice';
import Link from 'next/link';

const CancelledCartIcon = () => (
    <div className="relative inline-block">
        <ShoppingCartIcon className="h-5 w-5 text-white" />
        <XMarkIcon className="h-3 w-3 text-white absolute top-0 right-0" />
    </div>
);

export default function Page() {
    const products = useAppSelector(state => state.productos);
    const total = useAppSelector(state => state.total);
    const dispatch = useAppDispatch();

    const [isDisabled, setIsDisabled] = useState(false);

    useEffect(() => {
        setIsDisabled(products.length === 0);
    }, [products]);

    return (
        <div className="w-full">
            <div className="flex flex-col md:flex-row w-full items-center justify-between mb-4">
                <p className="titulo">Carrito</p>
            </div>
            <div className="flex flex-col md:flex-row justify-between mb-4">
                <div className="flex flex-col items-start">
                    <p className="mb-2 font-bold">Total a pagar: {total.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })}</p>
                    <Link
                        href={isDisabled ? "#" : "/dashboard/pagar"}
                        onClick={(e) => isDisabled && e.preventDefault()}
                        className={`bg-green-500 ${isDisabled ? 'cursor-not-allowed' : 'hover:bg-green-700'
                            } text-white font-bold py-1.5 px-4 rounded flex items-center justify-center w-32`}>
                        Pagar
                    </Link>
                </div>
                <button
                    className={`bg-red-500 ${isDisabled ? 'cursor-not-allowed' : 'hover:bg-red-700'
                        } text-white font-bold py-1.5 px-4 rounded flex items-center justify-center w-32`}
                    onClick={() => { if (!isDisabled) dispatch(vaciarCarrito()); }}
                    disabled={isDisabled}>
                    <CancelledCartIcon />
                    <span className="ml-2">Vaciar carrito</span>
                </button>
            </div>
            <>
                <div className="grid grid-cols-1 md:grid-cols-3">
                    {products.map((product, index) => (
                        <div key={index} className="overflow-x-auto">
                            <ProductCartTable productos={[product]} />
                        </div>
                    ))}
                </div>
            </>
        </div>
    );
}
