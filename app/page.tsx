import { Metadata } from 'next';
import React from 'react';
import '@/app/ui/global.css';
import { getPhotoEmprendedor } from './lib/data';
import Image from 'next/image';

export const metadata: Metadata = {
  title: {
    template: '%s | Sobre mi',
    default: 'Sobre mi',
  },
};

export default async function Page() {
  const foto = getPhotoEmprendedor()
  return (
    <>
      <p className="sobre-mi">Hola!!!!</p>
      <div className="custom-font">
        Mi nombre es Luz y soy la emprendedora detrás de Katty Manualidades. Soy de Bahía Blanca y actualmente no cuento con envíos fuera de Bahía Blanca.
        El emprendimiento nació en 2019 como una forma de poder costear fotocopias y transporte para la universidad. Actualmente este emprendimiento es mi estilo de vida y mi empleo.
        Katty Manualidades es un emprendimiento principalmente especializado en pulseras de macramé, pero también hacemos muchísimos tipos de accesorios diferentes en variedad de materiales.
        Siempre buscamos la forma de ser originales y ponernos retos personales al momento de crear algo nuevo. Por ello estamos abiertos a recibir consultas acerca de nuestros productos, pedidos mayoristas y a recibir sugerencias de modelos nuevos.
      </div>
      <div className="flex justify-center mt-4">
        <Image src={(await foto)?.fotoURL as string}
          alt="Emprendedor"
          width={283}
          height={283}
          className='w-50 rounded-full mx-auto'
        />
      </div>
    </>
  );
}
