import { fetchProductPages } from '@/app/lib/data';
import '@/app/ui/global.css';
import Search from '@/app/ui/search';
import Pagination from '@/app/ui/productos/pagination';
import { Suspense } from 'react';
import ProductTable from '@/app/ui/productos/table';
import { getProduct } from '@/app/lib/data';

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
  const products = await getProduct(query, currentPage);

  return (
    <div className="w-full p-4 md:p-8">
      <div className="flex flex-col md:flex-row w-full items-center justify-between mb-4">
        <p className='productos'>Productos</p>
      </div>
      <div className="bg-white flex flex-col md:flex-row items-center justify-between gap-2 md:gap-4 p-4">
        <Search placeholder="Buscar Producto..." />
      </div>
      {products.length === 0 ? (
        <div className="flex w-full items-center justify-center mt-4">
          <p className="text-purple-600 font-bold text-xl text-center">No se encontraron resultados para lo que busca</p>
        </div>
      ) : (
        <>
          <Suspense key={query + currentPage}>
            <div className="overflow-x-auto w-full">
              <ProductTable query={query} currentPage={currentPage} />
            </div>
          </Suspense>
          <div className="mt-5 flex w-full justify-center">
            <Pagination totalPages={totalPages} />
          </div>
        </>
      )}
    </div>
  );
}