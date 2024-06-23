import PayForm from '@/app/ui/pay/pay-form';
import Breadcrumbs from '@/app/ui/productos/breadcrumbs';

export default function Page() {
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Carrito', href: '/dashboard/carrito' },
          {
            label: 'Pagar Producto',
            href: '/dashboard/pagar',
            active: true,
          },
        ]}
      />
      <PayForm />
    </main>
  );
}