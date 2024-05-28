import { getProduct } from '@/app/lib/data';
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
                                <div className='grid grid-rows-2'>
                                    <div>
                                        <p>{product.nombre}</p>
                                        <br></br>
                                        <p>{product.precio.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })}</p>
                                    </div>
                                    <div>
                                        <p>{product.descripcion}</p>
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