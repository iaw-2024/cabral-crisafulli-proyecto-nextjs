import { fetchProductPages } from '@/app/lib/data';
import '@/app/ui/global.css';
import Search from '@/app/ui/search';
import Pagination from '@/app/ui/productos/pagination';
import { Suspense } from 'react';
import ProductTable from '@/app/ui/productos/table';
import NotFound from '@/app/dashboard/productos/[id]/not-found';
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
  console.log(products.length);

  return (
    <div className="w-full">
      {products.length === 0 ? (
        <NotFound />
      ) : (
        <>
          <div className="flex w-full items-center justify-between">
            <p className='productos'>Productos</p>
          </div>
          <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
            <Search placeholder="Buscar Producto..." />
          </div>
          <Suspense key={query + currentPage}>
            <ProductTable query={query} currentPage={currentPage} />
          </Suspense>
          <div className="mt-5 flex w-full justify-center">
            <Pagination totalPages={totalPages} />
          </div>
        </>
      )}
    </div>
  );
}