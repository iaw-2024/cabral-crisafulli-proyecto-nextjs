'use client'

import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { deleteProduct } from '@/app/lib/actions';
import { useState } from 'react';

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
  const [showConfirmation, setShowConfirmation] = useState(false);
  const deleteProductWithId = deleteProduct.bind(null, id);

  const handleDelete = () => {
    deleteProductWithId();
    setShowConfirmation(false);
  };

  return (
    <div>
      {!showConfirmation ? (
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded flex items-center w-full sm:w-auto"
          onClick={() => setShowConfirmation(true)}
        >
          <TrashIcon className="h-5 w-5 mr-2" /> Eliminar
        </button>
      ) : (
        <div className="bg-white p-4 rounded border border-gray-300 shadow-lg absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <p className="mb-4">¿Estás seguro que deseas eliminar este producto?</p>
          <div className="flex justify-center">
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-4"
              onClick={handleDelete}
            >
              Sí, eliminar
            </button>
            <button
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
              onClick={() => setShowConfirmation(false)}
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}