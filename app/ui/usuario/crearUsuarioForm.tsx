'use client';

import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { useState } from 'react';
import { makeUser } from '@/app/lib/actions';

export default function Form() {
    const [formValues, setFormValues] = useState({
        mail: '',
        password: '',
    });

    const initialValues = {
        mail: '',
        password: '',
    };

    const [notification, setNotification] = useState<string | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    const handleSubmit = async () => {
        makeUser(formValues.mail, formValues.password)
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="rounded-md bg-gray-50 p-4 md:p-6">

                {/*Email */}
                <div className="mb-4">
                    <label htmlFor="mail" className="mb-2 block text-lg font-medium">
                        Ingrese el mail
                    </label>
                    <div className="relative mt-2 rounded-md">
                        <input
                            id="mail"
                            name="mail"
                            type="mail"
                            value={formValues.mail}
                            onChange={handleInputChange}
                            required
                            className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                        />
                    </div>
                </div>

                {/* Contraseña */}
                <div className="mb-4">
                    <label htmlFor="password" className="mb-2 block text-lg font-medium">
                        Ingrese la contraseña
                    </label>
                    <div className="relative mt-2 rounded-md">
                        <input
                            id="password"
                            name="password"
                            type="password"
                            step="0.01"
                            value={formValues.password}
                            onChange={handleInputChange}
                            required
                            className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                        />
                    </div>
                </div>

                {/* Form Actions */}
                <div className="mt-6 flex justify-end gap-4">
                    <Link
                        href="/"
                        className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
                    >
                        Cancelar
                    </Link>
                    <Button
                        type="submit"
                        className="flex h-10 items-center rounded-lg px-4 text-sm font-medium text-white transition-colors bg-violet-500 hover:bg-violet-600"
                    >
                        Crear Usuario
                    </Button>
                </div>
            </div>
            {notification && (
                <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-green-500 text-white p-4 rounded-md text-lg flex items-center space-x-2 m-px">
                    <span>{notification}</span>
                </div>
            )}
        </form>
    );
}