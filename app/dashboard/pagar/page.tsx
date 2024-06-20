import Breadcrumbs from '@/app/ui/productos/breadcrumbs';
import MercadoPago from '@/app/ui/mercadopago';
import PayForm from '@/app/ui/productos/pay-form';

export default function Page() {
  const formData = new FormData();
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
      <PayForm formData={formData} />
    </main>
  );
}