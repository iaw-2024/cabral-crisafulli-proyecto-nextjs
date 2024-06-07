import Image from 'next/image';
import { ShoppingCartIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { getProduct } from '@/app/lib/data';
import { deleteProduct } from '@/app/lib/actions';

export default async function ProductTable({
    query,
    currentPage,
}: {
    query: string;
    currentPage: number;
}) {
    const producto = getProduct(query, currentPage);
    return (
        <div className="bg-white px-6">
            {(await producto).map((product) => {
                return (
                    <div key={product.id} className="border border-gray-400 rounded-lg mb-4">
                        <div className="grid grid-cols-2">
                            <div className='p-4'>
                                <p className="text-lg font-bold mb-2">{product.nombre}</p>
                                <p className="text-gray-600 mb-2">{product.precio.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })}</p>
                                <p className="mb-4">{product.descripcion}</p>
                                <div className="flex space-x-2">
                                    <button className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded flex items-center">
                                        <ShoppingCartIcon className="h-5 w-5 mr-2" /> Añadir al carrito
                                    </button>
                                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center">
                                        <PencilIcon className="h-5 w-5 mr-2" /> Editar
                                    </button>
                                    <button
                                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded flex items-center"
                                        onClick={() => deleteProduct(product.id)}
                                    >
                                        <TrashIcon className="h-5 w-5 mr-2" /> Eliminar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}