import '@/app/ui/global.css';
import { ShoppingCartIcon, XMarkIcon } from '@heroicons/react/24/outline';
import React from 'react';

const CancelledCartIcon = () => {
    return (
        <div className="relative inline-block">
            <ShoppingCartIcon className="h-6 w-6 text-white-500" />
            <XMarkIcon className="h-4 w-4 text-white-500 absolute top-0 right-0" />
        </div>
    );
};


export default function Page() {
    return (
        <>
            <p className="carrito">Carrito</p>
            <div className="flex justify-end">
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded flex items-center">
                    <CancelledCartIcon />
                    <span className="ml-2">Vaciar carrito</span>
                </button>
            </div>
        </>
    );
}