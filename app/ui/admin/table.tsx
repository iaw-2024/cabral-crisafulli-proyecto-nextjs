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
        <div className="columns-3 bg-white px-6">
            {(await producto).map((product) => {
                return (
                    <div key={product.id} className="border border-gray-400 rounded-lg mb-4">
                        <div className="grid grid-cols-2">
                            <div className='p-4'>
                                <p className="text-lg font-bold mb-2">{product.nombre}</p>
                                <p className="text-gray-600 mb-2">{product.precio.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })}</p>
                                <p className="mb-4">{product.descripcion}</p>
                                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                                    <CartButton product={{ ...product, quantity: 1 }}>
                                        <ShoppingCartIcon className="h-5 w-5 mr-2" /> Añadir al carrito
                                    </CartButton>
                                </div>
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