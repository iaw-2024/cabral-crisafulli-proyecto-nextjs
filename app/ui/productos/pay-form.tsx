'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useAppSelector } from '@/redux/hooks';
import { Wallet } from '@mercadopago/sdk-react';

const PayForm = () => {
    const productos = useAppSelector(state => state.productos);
    const [formValues, setFormValues] = useState({
        name: '',
        lastName: '',
        address: '',
        postalCode: '',
    });
    const [isFormValid, setIsFormValid] = useState(false);
    const [preferenceId, setPreferenceId] = useState<string | null>(null);
    const formData = new FormData();

    useEffect(() => {
        const { name, lastName, address, postalCode } = formValues;
        setIsFormValid(!!(name && lastName && address && postalCode));
    }, [formValues]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        Object.entries(formValues).forEach(([key, value]) => {
            formData.append(key, value as string);
        });

        try {
            const response = await fetch('/lib/api/mercadopago', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ items: productos })
            });

            console.log(response.ok)

            if (!response.ok) {
                throw new Error('Error en la respuesta del servidor');
            }

            const data = await response.json();
            setPreferenceId(data.id);
        } catch (error) {
            console.error('Error creating preference:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="rounded-md bg-gray-50 p-4 md:p-6">
                <div className="relative mt-2 rounded-md">
                    <label htmlFor="name" className="mb-2 block text-lg font-medium">Nombre</label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        value={formValues.name}
                        onChange={handleChange}
                        className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                    />
                </div>

                <div className="relative mt-2 rounded-md">
                    <label htmlFor="lastName" className="mb-2 block text-lg font-medium">Apellido</label>
                    <input
                        id="lastName"
                        name="lastName"
                        type="text"
                        value={formValues.lastName}
                        onChange={handleChange}
                        className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                    />
                </div>

                <div className="relative mt-2 rounded-md">
                    <label htmlFor="address" className="mb-2 block text-lg font-medium">Dirección</label>
                    <input
                        id="address"
                        name="address"
                        type="text"
                        value={formValues.address}
                        onChange={handleChange}
                        className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                    />
                </div>

                <div className="relative mt-2 rounded-md">
                    <label htmlFor="postalCode" className="mb-2 block text-lg font-medium">Código Postal</label>
                    <input
                        id="postalCode"
                        name="postalCode"
                        type="text"
                        value={formValues.postalCode}
                        onChange={handleChange}
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

                    <button
                        type="submit"
                        className="flex h-10 items-center rounded-lg bg-violet-500 px-4 text-sm font-medium text-white transition-colors hover:bg-violet-600"
                        disabled={!isFormValid}
                    >
                        Pagar con MercadoPago
                    </button>
                    {preferenceId && (
                        <div id="wallet_container">
                            <div className="mt-6">
                                <Wallet initialization={{ preferenceId }} />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </form>
    );
}

export default PayForm;
