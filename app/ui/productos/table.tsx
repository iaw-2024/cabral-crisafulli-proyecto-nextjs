import { getProduct } from '@/app/lib/data';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';

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
                    <div key={product.id}>
                        <div className="grid grid-cols-2 border-r border-b border-l border-gray-400 rounded-lg">
                            <div>
                                <Image
                                    src={product.fotoURL}
                                    alt={`${product.nombre}`}
                                    className="mr-4 w-40"
                                    width={2296}
                                    height={2296}
                                />
                            </div>
                            <div className='grid grid-cols-1'>
                                <div className='grid grid-rows-3'>
                                    <div>
                                        <p>{product.nombre}</p>
                                        <br></br>
                                        <p>{product.precio.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })}</p>
                                    </div>
                                    <div>
                                        <p>{product.descripcion}</p>
                                    </div>
                                    <div>
                                        <button className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded flex items-center">
                                            <ShoppingCartIcon className="h-5 w-5 mr-2" /> Añadir al carrito
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    )
}