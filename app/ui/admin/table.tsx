import { ShoppingCartIcon, PlusIcon } from '@heroicons/react/24/outline';
import { getProduct } from '@/app/lib/data';
import { UpdateProduct, DeleteProduct, CreateProduct } from '@/app/ui/buttons';
import CartButton from '../cart/cartButton';

export default async function ProductTableAdmin({
    query,
    currentPage,
}: {
    query: string;
    currentPage: number;
}) {
    const producto = getProduct(query, currentPage);

    return (
        <div className="xl:columns-3 md:columns-1 bg-white px-6">
            {(await producto).map((product) => {
                return (
                    <div key={product.id} className="border border-gray-400 rounded-lg mb-4">
                        <div className="grid grid-cols-2">
                            <div className='p-4'>
                                <p className="text-lg font-bold mb-2">{product.nombre}</p>
                                <p className="text-gray-600 mb-2">{product.precio.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })}</p>
                                <p className="mb-4">{product.descripcion}</p>
                                <div className="flex space-x-4">
                                    <UpdateProduct id={product.id} />
                                    <DeleteProduct id={product.id} />
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div >
    );
}