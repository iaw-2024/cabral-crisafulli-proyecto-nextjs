'use client';

import Link from 'next/link';
import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
//import { Button } from '@/app/ui/button';
//import { createProduct } from '@/app/lib/actions';
//import { useFormState } from 'react-dom';
import React, { useState } from 'react';

interface ProductFormProps {
  onSubmit: (product: Product) => void;
}

interface Product {
  photo: File | null;
  name: string;
  price: number;
  description: string;
  category: string;
}

const ProductForm: React.FC<ProductFormProps> = ({ onSubmit }) => {
  const categories = ['amistad', 'pareja', 'familia', 'individual', 'personalizada'];
  const [photo, setPhoto] = useState<File | null>(null);
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState(categories[0]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const newProduct: Product = {
      photo,
      name,
      price,
      description,
      category,
    };
    onSubmit(newProduct);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="photo">Foto:</label>
        <input 
          type="file" 
          id="photo" 
          accept="image/*" 
          onChange={(e) => setPhoto(e.target.files ? e.target.files[0] : null)} 
        />
      </div>
      <div>
        <label htmlFor="name">Nombre:</label>
        <input 
          type="text" 
          id="name" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          required 
        />
      </div>
      <div>
        <label htmlFor="price">Precio:</label>
        <input 
          type="number" 
          id="price" 
          value={price} 
          onChange={(e) => setPrice(parseFloat(e.target.value))} 
          required 
        />
      </div>
      <div>
        <label htmlFor="description">Descripción:</label>
        <textarea 
          id="description" 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
          required 
        />
      </div>
      <div>
        <label htmlFor="category">Categoría:</label>
        <select 
          id="category" 
          value={category} 
          onChange={(e) => setCategory(e.target.value)} 
          required
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>
      <button type="submit">Crear Producto</button>
    </form>
  );
};

export default ProductForm;