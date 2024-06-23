'use client'

import { crearPedido } from '@/app/lib/actions';
import { vaciarCarrito } from '@/redux/features/carrito/carritoSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { useRouter } from 'next/navigation';
import { FaceSmileIcon } from '@heroicons/react/24/outline';

export default function Page() {
    const productos = useAppSelector(state => state.productos);
    const datos = useAppSelector(state => state.datos);
    const dispatch = useAppDispatch();
    const router = useRouter();

    crearPedido(datos, productos);
    dispatch(vaciarCarrito());

    const handleVolver = () => {
        router.push('/dashboard/productos');
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-green-100 text-green-700 text-center">
            <div className="p-5 border-2 border-green-700 rounded-lg">
                <FaceSmileIcon className="w-12 h-12 text-green-700" />
                <p className="text-xl mt-2">A la brevedad empezaremos a preparar tu pedido</p>
                <button
                    onClick={handleVolver}
                    className="mt-4 px-4 py-2 bg-green-700 text-white text-lg rounded-md hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                >
                    Volver
                </button>
            </div>
        </div>
    );
}
