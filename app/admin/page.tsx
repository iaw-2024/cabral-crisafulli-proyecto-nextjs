import { fetchProductPages } from '@/app/lib/data';
import '@/app/ui/global.css';
import Search from '@/app/ui/search';
import Pagination from '@/app/ui/productos/pagination';
import { Suspense } from 'react';
import ProductTableAdmin from '@/app/ui/admin/table';
import { getProduct } from '@/app/lib/data';
import { RedirectAdmin } from '@/app/ui/admin/redirectLogin';
import { CreateProduct } from '@/app/ui/buttons';

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
        <div className="w-full">
            <RedirectAdmin />
            <p className='titulo'>Productos</p>
            <div className="flex w-full items-center justify-end">
                <CreateProduct />
            </div>
            <div className="top-0 z-10 bg-white flex items-center justify-between search-container p-4">
                <Search placeholder="Buscar Producto..." />
            </div>
            {products.length === 0 ? (
                <div className="flex w-full items-center justify-center mt-4">
                    <p className="text-purple-600 font-bold text-xl">No se encontraron resultados para lo que busca</p>
                </div>
            ) : (
                <>
                    <Suspense key={query + currentPage}>
                        <div className="overflow-x-hidden w-full">
                            <ProductTableAdmin query={query} currentPage={currentPage} />
                        </div>
                    </Suspense>
                </>
            )}
            <div className="mt-5 flex w-full justify-center">
                <Pagination totalPages={totalPages} />
            </div>
        </div>
    );
}