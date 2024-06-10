'use client';

import { ProductForm, Categoria } from '@/app/lib/definitions';
import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { updateProduct } from '@/app/lib/actions';
import { useFormState } from 'react-dom';

export default function EditProductForm({
  product,
  category,
}: {
  product: ProductForm;
  category: Categoria[];
}) {
  const initialState = { message: null, errors: {} };
  const updateProductWithId = updateProduct.bind(null, product.id);
  const [state, dispatch] = useFormState(updateProductWithId, initialState);

  return (
    <form action={dispatch}>
      <div className="mb-4">
        <label htmlFor="name" className="mb-2 block text-sm font-medium">
          Insertar el nombre del producto
        </label>
        <div className="relative mt-2 rounded-md">
          <div className="relative">
            <input
              id="name"
              name="name"
              type="string"
              step="0.01"
              defaultValue={product.precio}
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
            />
          </div>
        </div>
      </div>
      <div className="mb-4">
        <label htmlFor="amount" className="mb-2 block text-sm font-medium">
          Inserte el precio
        </label>
        <div className="relative mt-2 rounded-md">
          <div className="relative">
            <input
              id="amount"
              name="amount"
              type="number"
              step="0.01"
              defaultValue={product.precio}
              placeholder="Enter USD amount"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
            />
            <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
          </div>
        </div>
      </div>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        <div className="mb-4">
          <label htmlFor="product" className="mb-2 block text-sm font-medium">
            Elegir una categoría
          </label>
          <div className="relative">
            <select
              id="product"
              name="customerId"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue={product.categoria[0]}
            >
              <option value="" disabled>
                Seleccionar la categoría
              </option>
              {product.map((category) => (
                <option key={product.id} value={product.id}>
                  {product.nombre}
                </option>
              ))}
            </select>
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="name" className="mb-2 block text-sm font-medium">
            Cantidad
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="product"
                name="quantity"
                type="number"
                step="0.01"
                defaultValue={0}
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
            </div>
          </div>
        </div>
        //Foto
        <Link
          href="/dashboard/editar"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancelar
        </Link>
        <Button type="submit">Editar Producto</Button>
      </div>
    </form>
  );
}