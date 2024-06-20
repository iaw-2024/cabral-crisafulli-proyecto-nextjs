import { useState, useEffect } from 'react';
//import Wallet from 'package-name';
import { getProduct } from '@/app/lib/data';

export default function Payment({ searchParams,
}: {
    searchParams?: {
        query?: string;
        page?: string;
    };
}) {
    const [preferenceId, setPreferenceId] = useState<string | null>(null);

    useEffect(() => {
        // Reset preferenceId to null whenever the component is mounted
        setPreferenceId(null);
    }, []);

    const createPreference = async () => {

        const query = searchParams?.query || '';
        const currentPage = Number(searchParams?.page) || 1;
        const products = await getProduct(query, currentPage);
        try {
            const response = await fetch('@/app/api/preferencia', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ items: products })
            });

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
            {preferenceId !== null && (
                <div id="wallet_container">
                    <div className="mt-6">
                        <Wallet initialization={{ preferenceId: preferenceId }} />
                    </div>
                </div>
            )}
        </div>
    );
};