
import { getProduct } from '@/app/lib/data';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import React from 'react';
import CartButton from '../cart/cartButton';


export default async function ProductTable({
    query,
    currentPage,
}: {
    query: string;
    currentPage: number;
}) {
    const producto = getProduct(query, currentPage)

    return (


        <div className="bg-white px-6">
            {(await producto).map((product) => {
                return (
                    <div key={product.id} className="border border-gray-400 rounded-lg mb-4">
                        <div className="grid grid-cols-2">
                            <div className="p-4 flex justify-center items-center">
                                <Image
                                    src={product.fotoURL}
                                    alt={`${product.nombre}`}
                                    className="w-64 h-64 object-contain"
                                    width={640}
                                    height={640}
                                />
                            </div>
                            <div className='p-4'>
                                <p className="text-lg font-bold mb-2">{product.nombre}</p>
                                <p className="text-gray-600 mb-2">{product.precio.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })}</p>
                                <p className="mb-4">{product.descripcion}</p>
                                <CartButton product={{ ...product, quantity: 1 }}>
                                    <ShoppingCartIcon className="h-5 w-5 mr-2" /> Añadir al carrito
                                </CartButton>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>

    )
}