'use sever'

import prisma from '@/prisma/db'
import { PrismaClient } from '@prisma/client'
import { Categoria, Product, User } from '@/app/lib/definitions';
import bcrypt from 'bcrypt'
const ITEMS_PER_PAGE = 6;

export async function getPhotoEmprendedor() {
    const foto = await prisma.fotos.findFirst({
        where: {
            nombre: 'Foto_Emprendedor',
        },
    })
    return foto
}

export async function getLogo() {
    const logo = await prisma.fotos.findFirst({
        where: {
            nombre: 'Logo',
        },
    })
    return logo
}

export async function getProduct(query: string, page: number) {
    const offset = (page - 1) * ITEMS_PER_PAGE;
    const producto = await prisma.producto.findMany({
        skip: offset,
        take: ITEMS_PER_PAGE,
        where: {
            nombre: {
                contains: query,
                mode: 'insensitive',
            }
        }
    })
    return producto
}

export async function getProductCart(idProduct: number) {
    const producto = await prisma.producto.findFirst({
        where: {
            id: idProduct,
        }
    })
    return producto
}

export async function fetchProductPages(query: string) {
    const producto = await prisma.producto.findMany({
        where: {
            nombre: {
                contains: query,
            }
        }
    })
    const totalPages = Math.ceil(Number(producto.length) / ITEMS_PER_PAGE);
    return totalPages;
}

export async function fetchProductById(id2: number) {
    const product = await prisma.producto.findFirst({
        where: {
            id: id2,
        }
    })
    return product;
}

export async function fetchUsers(email: string): Promise<User | null> {
    const user = await prisma.user.findFirst({
        where: {
            mail: email,
        },
    })
    if (user == null) {
        return null
    } else {
        return user;
    }

}

export async function insertProduct(query: string, price: number, description: string, category: Categoria, url: string) {
    const nuevoProducto = await prisma.producto.create({
        data: {
            nombre: query,
            descripcion: description,
            precio: price,
            categoria: category,
            fotoURL: url,
        },
    });
    return nuevoProducto
}

export async function removeProduct(id2: number) {
    const productoBorrado = await prisma.producto.delete({
        where: {
            id: id2,
        },
    });
}

export interface ProductUpdateInput {
    name?: number;
    price?: number;
    categoria?: Categoria;
    description?: string;
    fotoURL?: string;
}


export async function catchUpProduct(id2: number, query: string, price: number, description: string, category: Categoria, url: string) {
    const productoEditado = await prisma.producto.update({
        where: {
            id: id2,
        },
        data: {
            nombre: query,
            descripcion: description,
            precio: price,
            categoria: category,
            fotoURL: url,
        }
    })
    return productoEditado
}

export default async function getSixProducts() {
    const allProducts = await prisma.producto.findMany({
        take: 6
    })
    return allProducts
}

export async function productWhithName(name: string) {
    const product = await prisma.producto.findFirst({
        where: {
            nombre: name,
        },
    })
    return product

}

export async function createUser(mail2: string, contra: string) {
    const hashedPassword = await bcrypt.hash(contra, 10)
    await prisma.user.create({
        data: {
            mail: mail2,
            contrasena: hashedPassword,
            rol: 'Administrador',
        },
    })
}

export async function createPedido(name: string, lastname: string, phone: string, adress: string) {
    const pedido = await prisma.pedido.create({
        data: {
            nombre: name,
            apellido: lastname,
            telefono: phone,
            direccion: adress,
        },
    })
    return pedido
}

export async function createTiene(id: number, productos: Product[]) {
    productos.forEach(async product => {
        await prisma.tiene.create({
            data: {
                cantidad: product.quantity,
                pedidoId: id,
                productoId: product.id
            }
        })
    });
}