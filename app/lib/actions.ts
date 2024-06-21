'use server'

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { insertProduct, removeProduct, catchUpProduct } from '@/app/lib/data';
import { Estado, Product } from './definitions';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { MercadoPagoConfig, Preference } from "mercadopago";

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



export async function createProduct(prevState: Estado, formData: FormData) {
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

export async function updateProduct(id: number, prevState: Estado, formData: FormData) {
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

    const { nombre, precio, descripcion, categoria, pedidoId, fotoUrl } = validatedFields.data;
    const precioEnCentavos = precio * 100;

    catchUpProduct(id, nombre, precioEnCentavos, descripcion, categoria, fotoUrl);

    revalidatePath('/dashboard/producto');
    redirect('/dashboard/productos');
    return { message: 'Producto Modificado' };
}


export async function deleteProduct(id: number) {
    removeProduct(id);
    revalidatePath('/dashboard/producto');
    return { message: 'Producto Eliminado' };
}

export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
) {
    try {
        await signIn('credentials', formData);
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return 'Invalid credentials.';
                default:
                    return 'Something went wrong.';
            }
        }
        throw error;
    }
}

const client = new MercadoPagoConfig({
    accessToken: process.env.MP_ACCESS_TOKEN!
});

export async function createPreference(productos: Product[]) {
    const preference: Preference = new Preference(client);
    const URL =
        process.env.NODE_ENV === 'production' ? process.env.VERCEL_BRANCH_URL : "localhost:3000";

    const response = await preference.create({
        body: {
            items: productos.map((item: Product) => ({
                id: item.id.toString(),
                title: item.nombre,
                quantity: item.quantity,
                unit_price: Number(item.precio),
            })),
            purpose: 'wallet_purchase',
            back_urls: {
                success: `${URL}/success`,
                failure: `${URL}/dashboard/carrito`,
                pending: `${URL}/pending`,
            },
            auto_return: "approved"
        }
    })

    return response


}