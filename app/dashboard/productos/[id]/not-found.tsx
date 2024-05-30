import Link from 'next/link';
import { FaceFrownIcon } from '@heroicons/react/24/outline';

export default function NotFound() {
  console.log("NotFound");
  return (
    <main className="flex h-screen flex-col items-center justify-center gap-2">
      <FaceFrownIcon className="w-10 text-gray-400 text-purple-700" />
      <h2 className="text-xl font-semibold text-purple-700">No se encontraron resultados para lo que busca</h2>
      <Link
        href="/dashboard/productos"
        className="mt-4 rounded-md bg-purple-700 px-4 py-2 text-sm text-white transition-colors hover:bg-purple-600"
      >
        Volver
      </Link>
    </main>
  );
}