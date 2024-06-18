'use client';

import {
  ShoppingCartIcon,
  HomeIcon,
  ShoppingBagIcon,
  ArrowRightOnRectangleIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { useAppSelector } from '@/redux/hooks';

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
  {
    name: 'Iniciar sesión',
    href: '/dashboard/login',
    icon: ArrowRightOnRectangleIcon
  },
  {
    name: 'Pedidos',
    href: '/dashboard/pedidos',
    icon: ShoppingBagIcon
  },
  {
    name: 'Cerrar sesión',
    href: '/dashboard/logout',
    icon: ArrowRightOnRectangleIcon
  }
];

export default function NavLinks() {
  const pathname = usePathname();
  const logueado = useAppSelector(state => state.log)
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        if (link.name === 'Iniciar sesión' && logueado) {
          return null; // No renderizar el enlace de "Iniciar sesión" si el usuario ya está logueado
        }
        if (link.name === 'Cerrar sesión' && !logueado) {
          return null; // No renderizar el enlace de "Iniciar sesión" si el usuario ya está logueado
        }
        if (link.name === 'Pedidos' && !logueado) {
          return null; // No renderizar el enlace de "Iniciar sesión" si el usuario ya está logueado
        }
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
              )}          >
              <LinkIcon className="w-6" />
              <p className="hidden md:block">{link.name}</p>
            </Link>
          )
        }
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
              )}          >
              <LinkIcon className="w-6" />
              <p className="hidden md:block">{link.name}</p>
            </Link>
          )
        }
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-gray-200 hover:text-purple-400 md:flex-none md:justify-start md:p-2 md:px-3',
              {
                'bg-purple-100 text-purple-600': pathname === link.href,
              },
            )}          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
