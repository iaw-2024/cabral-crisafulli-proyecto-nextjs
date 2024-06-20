'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { pay } from '@/app/lib/actions';
import { useAppSelector } from '@/redux/hooks';
import Payment from '@/app/api/pagarProducto';

const PayForm = () => {
    const total = useAppSelector(state => state.total)
    const [formValues, setFormValues] = useState({
        name: '',
        lastName: '',
        address: '',
        postalCode: '',
        creditCard: '',
        total
    });
    const [isFormValid, setIsFormValid] = useState(false);
    const formData = new FormData();

    useEffect(() => {
        const { name, lastName, address, postalCode, creditCard } = formValues;
        setIsFormValid(!!(name && lastName && address && postalCode && creditCard));
    }, [formValues]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        Object.entries(formValues).forEach(([key, value]) => {
            formData.append(key, value as string);
        });

        pay(formData)
    }
    return (
        <form>
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

                <div className="relative mt-2 rounded-md">
                    <label htmlFor="creditCard" className="mb-2 block text-lg font-medium">Tarjeta de Crédito</label>
                    <input
                        id="creditCard"
                        name="creditCard"
                        type="text"
                        value={formValues.creditCard}
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
                        onClick={handleSubmit}
                        className="flex h-10 items-center rounded-lg bg-violet-500 px-4 text-sm font-medium text-white transition-colors hover:bg-violet-600"
                        disabled={!isFormValid}
                    >
                        Pagar con MercadoPago
                    </button>
                </div>
            </div>
        </form>
    );
}

export default PayForm;
