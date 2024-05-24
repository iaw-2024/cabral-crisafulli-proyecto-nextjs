import { Metadata } from 'next';
import React from 'react';
import '@/app/ui/global.css';

export const metadata: Metadata = {
    title: {
        template: '%s | Sobre mi',
        default: 'Sobre mi',
    },
};


export default function Page() {
    return (
        <>
            <p className="Carrito">Sobre mí</p>
        </>
    );
}