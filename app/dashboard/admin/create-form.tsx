import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/app/ui/button';

interface ProductFormProps {
  onSubmit: (data: any) => void;
}

const categories = ["amistad", "pareja", "familia", "individual", "personalizada"];

export default function ProductForm({ onSubmit }: ProductFormProps) {
  const [product, setProduct] = useState({
    name: '',
    price: '',
    description: '',
    category: '',
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!product.name) newErrors.name = "Product name is required";
    if (!product.price) newErrors.price = "Product price is required";
    if (!product.description) newErrors.description = "Product description is required";
    if (!product.category) newErrors.category = "Product category is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(product);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-md bg-gray-50 p-4 md:p-6">
      <div className="mb-4">
        <label htmlFor="name" className="mb-2 block text-sm font-medium">
          Product Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          value={product.name}
          onChange={handleChange}
          className="block w-full rounded-md border border-gray-200 py-2 pl-4 text-sm outline-2 placeholder:text-gray-500"
          aria-describedby="name-error"
        />
        {errors.name && (
          <p id="name-error" className="mt-2 text-sm text-red-500">
            {errors.name}
          </p>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="price" className="mb-2 block text-sm font-medium">
          Product Price
        </label>
        <input
          id="price"
          name="price"
          type="number"
          value={product.price}
          onChange={handleChange}
          className="block w-full rounded-md border border-gray-200 py-2 pl-4 text-sm outline-2 placeholder:text-gray-500"
          aria-describedby="price-error"
        />
        {errors.price && (
          <p id="price-error" className="mt-2 text-sm text-red-500">
            {errors.price}
          </p>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="description" className="mb-2 block text-sm font-medium">
          Product Description
        </label>
        <textarea
          id="description"
          name="description"
          value={product.description}
          onChange={handleChange}
          className="block w-full rounded-md border border-gray-200 py-2 pl-4 text-sm outline-2 placeholder:text-gray-500"
          aria-describedby="description-error"
        />
        {errors.description && (
          <p id="description-error" className="mt-2 text-sm text-red-500">
            {errors.description}
          </p>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="category" className="mb-2 block text-sm font-medium">
          Product Category
        </label>
        <select
          id="category"
          name="category"
          value={product.category}
          onChange={handleChange}
          className="block w-full rounded-md border border-gray-200 py-2 pl-4 text-sm outline-2 placeholder:text-gray-500"
          aria-describedby="category-error"
        >
          <option value="" disabled>Select a category</option>
          {categories.map((category) => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
        {errors.category && (
          <p id="category-error" className="mt-2 text-sm text-red-500">
            {errors.category}
          </p>
        )}
      </div>

      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/products"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Create Product</Button>
      </div>
    </form>
  );
}