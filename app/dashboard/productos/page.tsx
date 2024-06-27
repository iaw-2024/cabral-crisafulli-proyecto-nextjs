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
        <p className="productos">Productos</p>
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
          {/* Renderización condicional de productos */}
          {products.map((product) => (
            <div key={product.id} className="flex flex-col items-center md:flex-row md:items-start md:text-left md:p-4 md:border md:border-gray-300 md:rounded-lg md:shadow-md md:mb-4">
              <div className="md:w-1/3 md:pr-4">
                <img src={product.fotoURL} alt={product.nombre} className="md:w-full md:max-w-sm" />
              </div>
              <div className="md:w-2/3 md:pl-4">
                <p>{product.descripcion}</p>
                <button className="btn mt-2 md:mt-4">Comprar</button>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}