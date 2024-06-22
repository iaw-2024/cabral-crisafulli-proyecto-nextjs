import Breadcrumbs from "@/app/ui/productos/breadcrumbs";
import UsuarioForm from '@/app/ui/usuario/crearUsuarioForm';

export default async function Page() {
    return (
      <main>
        <Breadcrumbs
          breadcrumbs={[
            { label: 'Usuario', href: '/dashboard/usuario' },
            {
              label: 'Crear usuario',
              href: '/dashboard/usuario/crear',
              active: true,
            },
          ]}
        />
        <UsuarioForm/>
      </main>
    );
}