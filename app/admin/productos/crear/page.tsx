import ProductForm from '@/app/ui/productos/admin/create-form';
import { Categoria } from '@/app/lib/definitions';
import Breadcrumbs from '@/app/ui/productos/breadcrumbs';
import { RedirectAdmin } from '@/app/ui/admin/redirectLogin';

const categories: Categoria[] = ["Amistad", "Pareja", "Familia", "Individual", "Personalizada"];
export default async function Page() {

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Productos', href: '/admin/productos' },
          {
            label: 'Crear producto',
            href: '/admin/productos/crear',
            active: true,
          },
        ]}
      />
      <RedirectAdmin />
      <ProductForm category={categories} />
    </main>
  );
}