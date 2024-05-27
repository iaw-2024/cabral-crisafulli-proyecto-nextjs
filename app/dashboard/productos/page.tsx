import { fetchProductPages } from '@/app/lib/data';
import '@/app/ui/global.css';
import Search from '@/app/ui/search';
import Pagination from '@/app/ui/productos/pagination';
import { Suspense } from 'react';
import ProductTable from '@/app/ui/productos/Table'



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

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <p className='productos'>Productos</p>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Buscar Producto..." />
        <button type="button" className='bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded'>Buscar</button>
      </div>
      {<Suspense key={query + currentPage}>
        <ProductTable query={query} currentPage={currentPage} />
      </Suspense>}
      <div className="mt-5 flex w-full justify-center">
        {<Pagination totalPages={totalPages} />}
      </div>
    </div>
  )
}