'use client'

import { useAppSelector } from "@/redux/hooks";
import { usePathname, useRouter } from "next/navigation";


export function RedirectAdmin() {
    const logueado = useAppSelector(state => state.log);
    const router = useRouter()
    const pathname = usePathname();
    if (pathname === '/dashboard/admin' && !logueado) {
        router.push('/dashboard/login');
    }
    return (
        <></>
    )
}