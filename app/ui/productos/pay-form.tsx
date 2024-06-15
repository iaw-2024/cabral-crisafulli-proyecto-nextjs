'use client'

import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { useState } from 'react';

export default function PayForm() {
    const [file, setFile] = useState<File | null>(null);
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [formValues, setFormValues] = useState({
        name: '',
        lastName: '',
        address: '',
        postalCode: '',
        creditCard: '',
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData();
        if (file) {
            formData.append('file', file);
        }
        // Append other form values to formData
        Object.entries(formValues).forEach(([key, value]) => {
            formData.append(key, value);
        });

        try {
            const response = await fetch('/lib/api/upload', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            if (data.success) {
                setImageUrl(data.product.imageUrl);
            } else {
                console.error('Error uploading image:', data.error);
            }
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="rounded-md bg-gray-50 p-4 md:p-6">
                <label htmlFor="name" className="mb-2 block text-lg font-medium">
                    Nombre
                </label>
                <div className="relative mt-2 rounded-md">
                    <input
                        id="name"
                        name="name"
                        type="text"
                        value={formValues.name}
                        onChange={handleInputChange}
                        className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                    />
                </div>

                
                <label htmlFor="name" className="mb-2 block text-lg font-medium">
                    Apellido
                </label>
                <div className="relative mt-2 rounded-md">
                    <input
                        id="lastName"
                        name="lastName"
                        type="text"
                        value={formValues.lastName}
                        onChange={handleInputChange}
                        className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                    />
                </div>

                <label htmlFor="name" className="mb-2 block text-lg font-medium">
                    Dirección
                </label>
                <div className="relative mt-2 rounded-md">
                    <input
                        id="address"
                        name="address"
                        type="text"
                        value={formValues.address}
                        onChange={handleInputChange}
                        className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                    />
                </div>

                <label htmlFor="name" className="mb-2 block text-lg font-medium">
                    Código postal
                </label>
                <div className="relative mt-2 rounded-md">
                    <input
                        id="postalCode"
                        name="postalCode"
                        type="textnumber"
                        value={formValues.postalCode}
                        onChange={handleInputChange}
                        className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                    />
                </div>

                <label htmlFor="name" className="mb-2 block text-lg font-medium">
                    Tarjeta de crédito
                </label>
                <div className="relative mt-2 rounded-md">
                    <input
                        id="creditCard"
                        name="creditCard"
                        type="textnumber"
                        value={formValues.creditCard}
                        onChange={handleInputChange}
                        className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                    />
                </div>

                <div className="mt-6 flex justify-end gap-4">
                    <Link
                        href="/dashboard/carrito"
                        className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
                    >
                        Cancelar
                    </Link>
                    <Button type="submit" className="flex h-10 items-center rounded-lg bg-violet-500 px-4 text-sm font-medium text-white transition-colors hover:bg-violet-600">
                         Pagar
                    </Button>
                </div>
            </div>
        </form>
    );
}