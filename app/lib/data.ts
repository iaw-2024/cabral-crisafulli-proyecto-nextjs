'use sever'

import { PrismaClient } from '@prisma/client'

const ITEMS_PER_PAGE = 6;

export async function getPhotoEmprendedor() {
    const prisma = new PrismaClient()
    const foto = await prisma.fotos.findFirst({
        where: {
            nombre: 'Foto_Emprendedor',
        },
    })
    return foto
}

export async function getLogo() {
    const prisma = new PrismaClient()
    const logo = await prisma.fotos.findFirst({
        where: {
            nombre: 'Logo',
        },
    })
    return logo
}

export async function getProduct(query: string, page: number) {
    const offset = (page - 1) * ITEMS_PER_PAGE;
    const prisma = new PrismaClient()
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

export async function fetchProductPages(query: string) {
    const prisma = new PrismaClient()
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


enum Categoria {
    Amistad = 'Amistad',
    Pareja = 'Pareja',
    Familia = 'Familia',
    Individual = 'Individual',
    Personalizada = 'Personalizada',
}

export async function insertProduct(query: string, price: number, description: string, category: Categoria, url: string) {
    const prisma = new PrismaClient()
    const nuevoProducto = await prisma.producto.create({
        data: {
            nombre: query,
            descripcion: description,
            precio: price, 
            categoria: category,
            fotoURL: url,
        },
    });
}

export async function deleteProduct(id2: number) {
    const prisma = new PrismaClient()
    const productoBorrado = await prisma.producto.delete({
        where: {
            id: id2,
        },
    });
}