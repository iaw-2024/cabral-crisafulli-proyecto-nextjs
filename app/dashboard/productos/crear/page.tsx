import ProductForm  from '@/app/dashboard/admin/create-form';
import { Categoria } from '@/app/lib/definitions';
import Breadcrumbs from '@/app/ui/productos/breadcrumbs';

const categories: Categoria[] = ["Amistad", "Pareja", "Familia", "Individual", "Personalizada"];
export default async function Page() {

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Productos', href: '/dashboard/productos' },
          {
            label: 'Crear producto',
            href: '/dashboard/productos/crear',
            active: true,
          },
        ]}
      />
        <ProductForm category={categories} />
    </main>
  );
}