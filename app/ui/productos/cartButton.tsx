'use client'

import { Product } from "@/app/lib/definitions";
import { agregarProducto } from "@/redux/features/carrito/carritoSlice";
import { useAppDispatch, useAppStore } from "@/redux/hooks";
import { useRef } from "react";


export default function CartButton({
    children,
    product
}: {
    children: React.ReactNode
    product: Product
}) {

    // Initialize the store with the product information
    const store = useAppStore()
    const initialized = useRef(false)
    if (!initialized.current) {
        initialized.current = true
    }

    const dispatch = useAppDispatch()

    function agregarCarrito() {
        dispatch(agregarProducto(product))
    }

    return (
        <button className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded flex items-center"
            onClick={() => { agregarCarrito() }}>
            {children}
        </button>
    );
}   