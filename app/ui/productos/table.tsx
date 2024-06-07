import { getProduct } from '@/app/lib/data';
import { useCart } from '@/app/lib/reducer/actions';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import React from 'react';


export default async function ProductTable({
    query,
    currentPage,
}: {
    query: string;
    currentPage: number;
}) {
    const producto = getProduct(query, currentPage)
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
                                <button className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded flex items-center" onClick={() => addToCart(product.id)}>
                                    <ShoppingCartIcon className="h-5 w-5 mr-2" /> Añadir al carrito
                                </button>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    )
}