'use client'

import { useEffect, useRef } from 'react';
import { useAppSelector } from "@/redux/hooks";
import { usePathname, useRouter } from "next/navigation";

export function RedirectAdmin() {
    const logueado = useAppSelector(state => state.log);
    const router = useRouter();
    const pathname = usePathname();
    const previousPathname = useRef<string | null>(null);

    useEffect(() => {
        if (pathname !== previousPathname.current) {
            if (pathname === '/admin' && !logueado) {
                router.push('/dashboard/login');
            }
            if (pathname === '/admin/productos/crear' && !logueado) {
                router.push('/dashboard/login');
            }
            previousPathname.current = pathname;
        }
    }, [pathname, logueado, router]);

    return null;
}