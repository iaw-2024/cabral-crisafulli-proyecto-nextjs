import ProductForm from '@/app/ui/productos/admin/create-form';
import { Categoria } from '@/app/lib/definitions';
import Breadcrumbs from '@/app/ui/productos/breadcrumbs';
import { RedirectAdmin } from '@/app/ui/admin/redirectLogin';

const categories: Categoria[] = ["Amistad", "Pareja", "Familia", "Individual", "Personalizada"];
export default async function Page() {

  return (
    <main>
      <RedirectAdmin />
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