import { TrashIcon, PlusIcon, MinusIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { useCart } from '@/app/lib/reducer/useCart'
import { Product } from '@/app/lib/definitions';
import React from 'react';


export default async function ProductTable() {
    const {
        cart,
        addOne,
        removeOne,
        removeFromCart,
        clearCart,
        getCart,
        addToCart,
    } = useCart();
    return (
        <div className="bg-white px-6">
            {getCart().map((product: Product) => {
                return (
                    <div key={product.id} className="border border-gray-400 rounded-lg mb-4">
                        <div className="grid grid-cols-2">
                            <div className="p-4 flex justify-center items-center">
                                <Image
                                    src={product.fotoURL}
                                    alt={`${product.nombre}`}
                                    className="w-64 h-64 object-contain"
                                    width={320}
                                    height={320}
                                />
                            </div>
                            <div className='p-4'>
                                <p className="text-lg font-bold mb-2">{product.nombre}</p>
                                <p className="text-gray-600 mb-2">{product.precio.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })}</p>
                                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded flex items-center" onClick={() => removeFromCart(product.id)}>
                                    <TrashIcon className="h-5 w-5 mr-2" />
                                </button>
                                <div className='flex'>
                                    <button className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded flex items-center" onClick={() => addOne(product.id)}>
                                        <PlusIcon className="h-5 w-5 mr-2" />
                                    </button>
                                    <p className="text-lg font-bold mb-2">{product.quantity}</p>
                                    <button className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded flex items-center" onClick={() => removeOne(product.id)}>
                                        <MinusIcon className="h-5 w-5 mr-2" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    )
}