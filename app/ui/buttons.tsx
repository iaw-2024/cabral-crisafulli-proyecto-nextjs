import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { deleteProduct } from '@/app/lib/actions';

export function CreateProduct() {
  return (
    <Link
      href="/dashboard/productos/crear"
      className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded inline-flex items-center">
      <PlusIcon className="h-5 w-5 md:ml-2" />
      <span className="hidden md:block">Crear Producto</span>
    </Link>
  );
}

export function UpdateProduct({ id }: { id: number }) {
  return (
    <Link href={`/dashboard/productos/${id}/editar`}>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center w-full sm:w-auto">
        <PencilIcon className="h-5 w-5 mr-2" /> Editar
      </button>
    </Link>
  );
}

export function DeleteProduct({ id }: { id: number }) {
  const deleteProductWithId = deleteProduct.bind(null, id);

  return (
    <form action={deleteProductWithId}>
      <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded flex items-center w-full sm:w-auto">
        <TrashIcon className="h-5 w-5 mr-2" /> Eliminar
      </button>
    </form>
  );
}