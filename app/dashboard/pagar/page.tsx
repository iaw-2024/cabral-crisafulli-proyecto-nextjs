import Breadcrumbs from '@/app/ui/productos/breadcrumbs';
import PayForm from '@/app/ui/productos/pay-form';

export default async function Page() {
  const formData = new FormData();
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Carrito', href: '/dashboard/carrito' },
          {
            label: 'Pagar producto',
            href: '/dashboard/pagar',
            active: true,
          },
        ]}
      />
      <PayForm formData={formData} />
    </main>
  );
}