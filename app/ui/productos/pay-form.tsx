'use client';

import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { MercadoPagoConfig, Preference } from 'mercadopago';
import { redirect } from 'next/navigation';
import { useState } from 'react';

const client = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN! });

interface PayFormProps {
    formData: FormData;
}

const PayForm: React.FC<PayFormProps> = ({ formData }) => {
    const [formValues, setFormValues] = useState({
        name: '',
        lastName: '',
        address: '',
        postalCode: '',
        creditCard: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    const pagarProducto = async (e: React.FormEvent<HTMLFormElement>) => {
        console.log(process.env.MP_ACCESS_TOKEN);
        e.preventDefault();
        try {
            const preference = await new Preference(client).create({
                body: {
                    items: [
                        {
                            id: 'producto',
                            title: 'Pagar poducto',
                            quantity: 1,
                            unit_price: 1500, //TODO poner bien el precico unitario
                        }
                    ],
                }
            });
            if (preference.sandbox_init_point) {
                redirect(preference.sandbox_init_point);
            } else {
                console.error('No se encontró el sandbox_init_point en la respuesta de MercadoPago.');
            }
        } catch (error) {
            console.error('Error al crear la preferencia de pago:', error);
        }
    };

    return (
        <form onSubmit={pagarProducto}>
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
                        onChange={handleChange}
                        className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                    />
                </div>

                <label htmlFor="lastName" className="mb-2 block text-lg font-medium">
                    Apellido
                </label>
                <div className="relative mt-2 rounded-md">
                    <input
                        id="lastName"
                        name="lastName"
                        type="text"
                        value={formValues.lastName}
                        onChange={handleChange}
                        className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                    />
                </div>

                <label htmlFor="address" className="mb-2 block text-lg font-medium">
                    Direccion
                </label>
                <div className="relative mt-2 rounded-md">
                    <input
                        id="address"
                        name="address"
                        type="text"
                        value={formValues.address}
                        onChange={handleChange}
                        className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                    />
                </div>

                <label htmlFor="postalCode" className="mb-2 block text-lg font-medium">
                    Codigo Postal
                </label>
                <div className="relative mt-2 rounded-md">
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
                    <Button type="submit" className="flex h-10 items-center rounded-lg bg-violet-500 px-4 text-sm font-medium text-white transition-colors hover:bg-violet-600">
                        Pagar
                    </Button>
                </div>
            </div>
        </form>
    );
}

export default PayForm;