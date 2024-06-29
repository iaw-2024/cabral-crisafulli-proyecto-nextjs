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
    const producto = await getProduct(query, currentPage);
    const filledProducts = [...producto, ...Array(Math.max(3 - producto.length, 0)).fill(null)]; // Rellenar hasta 3 productos si hay menos de 3

    return (
        <div className="xl:grid xl:grid-cols-3 gap-4 bg-white px-4">
            {filledProducts.map((product, index) => {
                if (!product) {
                    return (
                        <div key={`empty-${index}`} className="border border-transparent rounded-lg mb-4"></div>
                    );
                }
                return (
                    <div key={product.id} className="border border-gray-400 rounded-lg mb-4">
                        <div>
                            <div className="p-4 flex justify-center items-center">
                                <Image
                                    key={product.id}
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