'use server'

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { insertProduct, removeProduct } from '@/app/lib/data';
import { State } from './definitions';

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

    //catchUpProduct(id);

    revalidatePath('/dashboard/producto');
    redirect('/dashboard/productos');
}


export async function deleteProduct(id: number) {
    removeProduct(id);
}