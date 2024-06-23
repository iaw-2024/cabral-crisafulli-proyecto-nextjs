'use client';

import { Product } from "@/app/lib/definitions";
import { agregarProducto } from "@/redux/features/carrito/carritoSlice";
import { useAppDispatch } from "@/redux/hooks";
import React, { useState } from "react";

export default function CartButton({
    children,
    product
}: {
    children: React.ReactNode
    product: Product
}) {
    const dispatch = useAppDispatch();
    const [showNotification, setShowNotification] = useState(false);

    function agregarCarrito() {
        dispatch(agregarProducto(product));
        setShowNotification(true);
        setTimeout(() => {
            setShowNotification(false);
        }, 3000);
    }

    return (
        <>
            <button className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded flex items-center"
                onClick={() => { agregarCarrito() }}>
                {children}
            </button>
            {showNotification && (
                <div className="fixed bottom-4 left-4 bg-violet-600 text-white py-2 px-4 rounded">
                    Producto añadido al carrito
                </div>
            )}
        </>
    );
}