import EditForm from '@/app/ui/productos/edit-form';
import Breadcrumbs from '@/app/ui/productos/breadcrumbs';
import { fetchProductById, fetchUsers } from '@/app/lib/data';
import { notFound } from 'next/navigation';
import { Categoria, ProductForm } from '@/app/lib/definitions';

const categories: Categoria[] = ["Amistad", "Pareja", "Familia", "Individual", "Personalizada"];

export default async function Page({ params }: { params: { id: number } }) {
  const id = parseInt(params.id.toString());
  const product = await fetchProductById(id)

  if (!product) {
    notFound();
  }

  const productForm: ProductForm = {
    id: product.id,
    nombre: product.nombre,
    descripcion: product.descripcion,
    precio: product.precio,
    categoria: product.categoria,
    pedidoId: product.pedidoId,
    fotoURL: product.fotoURL
  };

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
      <EditForm product={productForm} category={categories} />
    </main>
  );
}