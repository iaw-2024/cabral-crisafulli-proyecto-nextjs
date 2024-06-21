'use client';

import {
  ShoppingCartIcon,
  HomeIcon,
  ShoppingBagIcon,
  ArrowRightOnRectangleIcon,
  ArrowLeftOnRectangleIcon,
  PowerIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import clsx from 'clsx';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { logout, vaciarCarrito } from '@/redux/features/carrito/carritoSlice';

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  {
    name: 'Sobre mi',
    href: '/',
    icon: HomeIcon
  },
  {
    name: 'Productos',
    href: '/dashboard/productos',
    icon: ShoppingBagIcon
  },
  {
    name: 'Carrito',
    href: '/dashboard/carrito',
    icon: ShoppingCartIcon
  },
];

export default function NavLinks() {
  const pathname = usePathname();
  const logueado = useAppSelector(state => state.log);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(vaciarCarrito());
    router.push('/dashboard/productos'); // Redirigir a /dashboard/productos después de cerrar sesión
  };

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;

        // Render link for "Productos"
        if (link.name === 'Productos' && logueado) {
          return (
            <Link
              key={link.name}
              href='/dashboard/admin'
              className={clsx(
                'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-gray-200 hover:text-purple-400 md:flex-none md:justify-start md:p-2 md:px-3',
                {
                  'bg-purple-100 text-purple-600': pathname === '/dashboard/admin',
                },
              )}
            >
              <LinkIcon className="w-6" />
              <p className="hidden md:block">{link.name}</p>
            </Link>
          );
        }

        // Render link for "Productos"
        if (link.name === 'Productos' && !logueado) {
          return (
            <Link
              key={link.name}
              href={link.href}
              className={clsx(
                'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-gray-200 hover:text-purple-400 md:flex-none md:justify-start md:p-2 md:px-3',
                {
                  'bg-purple-100 text-purple-600': pathname === link.href,
                },
              )}
            >
              <LinkIcon className="w-6" />
              <p className="hidden md:block">{link.name}</p>
            </Link>
          );
        }

        // Render link for other links
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-gray-200 hover:text-purple-400 md:flex-none md:justify-start md:p-2 md:px-3',
              {
                'bg-purple-100 text-purple-600': pathname === link.href,
              },
            )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
      
      {/* Render login/logout link */}
      {logueado ? (
        <button
          onClick={handleLogout}
          className={clsx(
            'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-gray-200 hover:text-purple-400 md:flex-none md:justify-start md:p-2 md:px-3',
            {
              'bg-purple-100 text-purple-600': pathname === '/',
            },
          )}
        >
          <PowerIcon className="w-6" />
          <p className="hidden md:block">Cerrar sesión</p>
        </button>
      ) : (
        <Link
          href='/dashboard/login'
          className={clsx(
            'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-gray-200 hover:text-purple-400 md:flex-none md:justify-start md:p-2 md:px-3',
            {
              'bg-purple-100 text-purple-600': pathname === '/dashboard/login',
            },
          )}
        >
          <ArrowLeftOnRectangleIcon className="w-6" />
          <p className="hidden md:block">Iniciar sesión</p>
        </Link>
      )}
    </>
  );
}