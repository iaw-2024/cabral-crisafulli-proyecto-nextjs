import { Metadata } from 'next';
import React from 'react';
import '@/app/ui/global.css';

export const metadata: Metadata = {
    title: {
        template: '%s | Carrito',
        default: 'Carrito',
    },
};


export default function Page() {
    return (
        <>
            <p className="carrito">Carrito</p>
        </>
    );
}