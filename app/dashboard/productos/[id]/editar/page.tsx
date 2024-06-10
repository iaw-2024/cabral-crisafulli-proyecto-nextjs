import EditProductForm from '@/app/ui/productos/edit-form';
import Breadcrumbs from '@/app/ui/productos/breadcrumbs';
import { fetchProductById, fetchUsers } from '@/app/lib/data';
import { notFound } from 'next/navigation';
 
export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id;
    const [product, users] = await Promise.all([
      fetchProductById(id),
      fetchUsers(), 
    ]);
  
    if (!product) {
      notFound();
    }
    
    return (
      <main>
        <Breadcrumbs
          breadcrumbs={[
            { label: 'Productos', href: '/dashboard/productos' },
            {
              label: 'Editar Productos',
              href: `/dashboard/productos/${id}/editar`,
              active: true,
            },
          ]}
        />
        //EditProductForm
      </main>
    );
  }