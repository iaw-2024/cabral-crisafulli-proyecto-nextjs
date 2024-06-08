import ProductForm  from '@/app/dashboard/admin/create-form';
import Breadcrumbs from '@/app/ui/productos/breadcrumbs';
 
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
    </main>
  );
}