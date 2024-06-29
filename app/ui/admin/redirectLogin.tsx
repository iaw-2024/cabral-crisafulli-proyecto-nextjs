'use client'

import { useEffect } from 'react';
import { useAppSelector } from "@/redux/hooks";
import { usePathname, useRouter } from "next/navigation";

export function RedirectAdmin() {
    const logueado = useAppSelector(state => state.log);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (!logueado && (pathname === '/admin' || pathname === '/admin/productos/crear')) {
            router.push('/dashboard/login');
        }
    }, [logueado, pathname, router]);

    return null;
}