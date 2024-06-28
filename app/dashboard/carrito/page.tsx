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
        <ShoppingCartIcon className="h-6 w-6 text-white" />
        <XMarkIcon className="h-4 w-4 text-white absolute top-0 right-0" />
    </div>
);

export default function Page() {
    const products = useAppSelector(state => state.productos);
    const dispatch = useAppDispatch();

    const [isDisabled, setIsDisabled] = useState(false);

    useEffect(() => {
        setIsDisabled(products.length === 0);
    }, [products]);

    return (
        <div className="w-full p-4 md:p-8">
            <div className="flex flex-col md:flex-row w-full items-center justify-between mb-4">
                <p className="carrito">Carrito</p>
            </div>
            <div className="flex flex-col md:flex-row justify-end gap-4 mb-4">
                <button
                    className={`bg-red-500 ${isDisabled ? 'cursor-not-allowed' : 'hover:bg-red-700'
                        } text-white font-bold py-2 px-4 rounded flex items-center justify-center`}
                    onClick={() => { if (!isDisabled) dispatch(vaciarCarrito()); }}
                    disabled={isDisabled}>
                    <CancelledCartIcon />
                    <span className="ml-2">Vaciar carrito</span>
                </button>
                <Link
                    href={isDisabled ? "#" : "/dashboard/pagar"}
                    onClick={(e) => isDisabled && e.preventDefault()}
                    className={`bg-green-500 ${isDisabled ? 'cursor-not-allowed' : 'hover:bg-green-700'
                        } text-white font-bold py-2 px-4 rounded flex items-center justify-center`}>
                    Pagar
                </Link>
            </div>
            <div className="overflow-x-hidden w-full">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {products.map((product, index) => (
                        <div key={index} className="col-span-1">
                            <ProductCartTable productos={[product]} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}