import { useState, useEffect } from 'react';
import { Wallet } from '@mercadopago/sdk-react';
import { getProduct } from '@/app/lib/data';

export default function Payment({ searchParams }: { searchParams?: { query?: string; page?: string; }; }) {
    const [preferenceId, setPreferenceId] = useState<string | null>(null);

    useEffect(() => {
        // Reset preferenceId to null whenever the component is mounted
        setPreferenceId(null);
    }, []);

    const createPreference = async () => {
        const query = searchParams?.query || '';
        const currentPage = Number(searchParams?.page) || 1;

        try {
            const products = await getProduct(query, currentPage);

            const response = await fetch('/api/preferencia', {  // asegúrate que esta ruta es correcta
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ items: products })
            });

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
        <div>
            <button onClick={createPreference} className="bg-blue-500 text-white px-4 py-2 rounded-md">
                Pagar
            </button>
            {preferenceId && (
                <div id="wallet_container">
                    <div className="mt-6">
                        <Wallet initialization={{ preferenceId }} />
                    </div>
                </div>
            )}
        </div>
    );
};
