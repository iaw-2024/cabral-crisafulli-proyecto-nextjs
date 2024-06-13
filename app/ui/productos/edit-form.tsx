'use client';

import { Categoria, ProductForm } from '@/app/lib/definitions';
import {
  CurrencyDollarIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { updateProduct } from '@/app/lib/actions';
import { useFormState } from 'react-dom';

export default function EditForm({
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
    <div className="rounded-md bg-gray-50 p-4 md:p-6">
      {/* Product Name */}
      <label htmlFor="name" className="mb-2 block text-sm font-medium">
        Insertar el nombre del producto
      </label>
      <div className="relative mt-2 rounded-md">
        <input
          id="name"
          name="name"
          type="text"
          defaultValue = {product.nombre}
          className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
        />
      </div>

      {/* Product Price */}
      <div className="mb-4">
        <label htmlFor="amount" className="mb-2 block text-sm font-medium">
          Elegir el precio
        </label>
        <div className="relative mt-2 rounded-md">
          <input
            id="amount"
            name="amount"
            type="number"
            defaultValue = {product.precio}
            step="0.01"
            placeholder="Ingrese el precio en $"
            className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
          />
          <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
        </div>
      </div>

      {/* Category */}
      <div className="mb-4">
        <label htmlFor="category" className="mb-2 block text-sm font-medium">
          Elegir una categoría
        </label>
        <div className="relative">
          <select
            id="category"
            name="categoryId"
            className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
            defaultValue={product.categoria}
            aria-describedby="category-error"
          >
            <option value="" disabled>
              Seleccionar Categoría
            </option>
            {category.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
        </div>
      </div>

      {/* Description */}
      <label htmlFor="name" className="mb-2 block text-sm font-medium">
        Insertar una descripción del producto
      </label>
      <div className="relative mt-2 rounded-md">
        <input
          id="name"
          name="name"
          type="text"
          defaultValue={product.descripcion}
          className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
        />
      </div>

      {/* Foto url */}
      <label htmlFor="name" className="mb-2 block text-sm font-medium">
        Insertar la url de la foto
      </label>
      <div className="relative mt-2 rounded-md">
        <input
          id="name"
          name="name"
          type="text"
          defaultValue={product.fotoURL}
          className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
        />
      </div>

      {/* Form Actions */}
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/invoices"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancelar
        </Link>
        <Button type="submit">Crear Producto</Button>
      </div>
    </div>
  </form>
);
}