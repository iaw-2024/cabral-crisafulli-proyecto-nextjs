import '@/app/ui/global.css';
import Search from '@/app/ui/search';
import { PrismaClient } from '@prisma/client'
import clsx from 'clsx';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import Image from 'next/image';
import { Key } from 'react';

export default async function Page() {
  const prisma = new PrismaClient()
  const producto = await prisma.producto.findMany()
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <p className='productos'>Productos</p>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Buscar Producto..." />
      </div>
      <div className="bg-white px-6">
        {producto.map((product: { id: Key; nombre: string; descripcion: string; precio: number; categoria: string; fotoURL: string }) => {
          return (
            <div>
              <div className="grid grid-cols-2">
                <div key={product.id}>
                  <Image
                    src={product.fotoURL}
                    alt={`${product.nombre}`}
                    className="mr-4"
                    width={2296}
                    height={2296}
                  />
                  <div className='grid grid-cols-1'>
                    <div className='grid grid-rows-2'>
                      <div>
                        <p>{product.nombre}</p>
                        <br></br>
                        <p>{product.precio}</p>
                      </div>
                      <div>
                        <p>{product.descripcion}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  )
}