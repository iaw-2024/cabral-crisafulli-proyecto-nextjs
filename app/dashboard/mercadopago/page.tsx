import Breadcrumbs from '@/app/ui/productos/breadcrumbs';
import pagarProducto from '@/app/ui/mercadopago';

export default async function Page() {
    const formData = new FormData();
    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    { label: 'Pagar Producto', href: '/dashboard/pagar' },
                    {
                        label: 'Mercado Pago',
                        href: '/dashboard/mercadopago',
                        active: true,
                    },
                ]}
            />
            <pagarProducto formData={formData} />
        </main> 
    );
}