import { ShoppingCartIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { getProduct } from '@/app/lib/data';
import { deleteProduct } from '@/app/lib/actions';

export default async function ProductTableAdmin({
    query,
    currentPage,
}: {
    query: string;
    currentPage: number;
}) {
    const producto = getProduct(query, currentPage);
    return (
        <div className="bg-white px-6">
            <div className="flex justify-between items-center py-4">
                <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                    Agregar producto
                </button>
               
            </div>
            {(await producto).map((product) => {
                return (
                    <div key={product.id} className="border border-gray-400 rounded-lg mb-4">
                        <div className="grid grid-cols-2">
                            <div className='p-4'>
                                <p className="text-lg font-bold mb-2">{product.nombre}</p>
                                <p className="text-gray-600 mb-2">{product.precio.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })}</p>
                                <p className="mb-4">{product.descripcion}</p>
                                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                                    <button className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded flex items-center w-full sm:w-auto">
                                        <ShoppingCartIcon className="h-5 w-5 mr-2" /> Añadir al carrito
                                    </button>
                                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center w-full sm:w-auto">
                                        <PencilIcon className="h-5 w-5 mr-2" /> Editar
                                    </button>
                                    <button
                                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded flex items-center w-full sm:w-auto"
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