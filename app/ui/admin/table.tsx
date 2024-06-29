import { getProduct } from '@/app/lib/data';
import { UpdateProduct, DeleteProduct } from '@/app/ui/buttons';

export default async function ProductTableAdmin({
    query,
    currentPage,
}: {
    query: string;
    currentPage: number;
}) {
    const producto = await getProduct(query, currentPage);
    
    // Calcula la cantidad de elementos de relleno necesarios
    const placeholdersCount = (3 - (producto.length % 3)) % 3;
    const placeholders = Array.from({ length: placeholdersCount });

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 bg-white px-6">
            {producto.map((product) => (
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
            ))}
            {placeholders.map((_, index) => (
                <div key={`placeholder-${index}`} className="invisible"></div>
            ))}
        </div>
    );
}