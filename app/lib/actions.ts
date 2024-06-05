'use server'

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { insertProduct } from '@/app/lib/data';

const CategoriaSchema = z.enum(['Amistad', 'Pareja', 'Familia', 'Individual', 'Personalizada']);
const FormSchema = z.object({
    id: z.string({
        invalid_type_error: 'Id inválido',
    }),
    nombre: z.string({
        invalid_type_error: 'Nombre inválido',
    }),
    precio: z.any({
        invalid_type_error: 'Precio inválido',
    }),
    categoria: CategoriaSchema,
    pedidoId: z.string({
        invalid_type_error: 'PedidoId inválido',
    }),
    descripcion: z.string({
        invalid_type_error: 'Descripción inválido',
    }),
    fotoUrl: z.string({
        invalid_type_error: 'Fotourl inválido',
    }),
});

const CrearProducto = FormSchema.omit({ id: true });
const ModificarProducto = FormSchema.omit({ id: true });

export type State = {
    errors?: {
        id?: string[];
        nombre?: string[];
        precio?: string[];
        categoria?: string[];
        pedidoId?: string[];
    };
    message?: string | null;
};

export async function createProduct(prevState: State, formData: FormData) {
    const validatedFields = CrearProducto.safeParse({
        id: formData.get('id'),
        nombre: formData.get('nombre'),
        precio: formData.get('precio'),
        categoria: formData.get('categoria'),
        pedidoId: formData.get('pedidoId'),
        descripcion: formData.get('descripcion'),
        fotoUrl: formData.get('fotoUrl'),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Faltan completar campos.',
        };
    }

    const { nombre, precio, descripcion, fotoUrl } = validatedFields.data;
    const categoria = validatedFields.data.categoria;
    const precioEnCentavos = precio * 100;

    insertProduct(nombre, precioEnCentavos, descripcion, categoria, fotoUrl);

    revalidatePath('/dashboard/productos');
    redirect('/dashboard/productos');
}

export async function updateProducto(prevState: State, formData: FormData) {
    const validatedFields = ModificarProducto.safeParse({
        id: formData.get('id'),
        nombre: formData.get('nombre'),
        precio: formData.get('precio'),
        categoria: formData.get('categoria'),
        pedidoId: formData.get('pedidoId'),
        descripcion: formData.get('descripcion'),
        fotoUrl: formData.get('fotourl'),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Faltan completar campos. Error al actualizar un producto',
        };
    }

    const { nombre, precio, categoria, pedidoId } = validatedFields.data;
    const precioEnCentavos = precio * 100;

    try {
        await sql`
        UPDATE producto
        SET productoId = precio = ${precioEnCentavos}, status = ${status}
        WHERE id = 
      `;
    } catch (error) {
        return { message: 'Database Error: Failed to Update Invoice.' };
    }

    revalidatePath('/dashboard/producto');
    redirect('/dashboard/productos');
}


export async function deleteProduct(id: string) {
    try {
        await sql`DELETE FROM product WHERE id = ${id}`;
        revalidatePath('/dashboard/productos');
        return { message: 'El producto fue eliminado' };
    } catch (error) {
        return { message: 'No es posible eliminar el producto' };
    }
}