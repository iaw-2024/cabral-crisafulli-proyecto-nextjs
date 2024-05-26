import '@/app/ui/global.css';
import Search from '@/app/ui/search';

export default function Page() {
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <p className='productos'>Productos</p>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Buscar Producto..." />
      </div>
    </div>
  )
}