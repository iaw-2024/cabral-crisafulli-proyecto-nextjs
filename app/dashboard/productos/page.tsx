import { getProduct, fetchProductPages } from '@/app/lib/data';
import '@/app/ui/global.css';
import Search from '@/app/ui/search';
import Pagination from '@/app/ui/productos/pagination';

import Image from 'next/image';

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchProductPages(query);
  const producto = getProduct('', 1)
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <p className='productos'>Productos</p>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Buscar Producto..." />
        <button type="button" className='bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded'>Buscar</button>
      </div>
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
      <div className="mt-5 flex w-full justify-center">
        {<Pagination totalPages={totalPages} />}
      </div>
    </div>
  )
}