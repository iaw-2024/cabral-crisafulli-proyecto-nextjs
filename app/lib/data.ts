'use sever'

import { PrismaClient } from '@prisma/client'

export async function getProduct() {
    const prisma = new PrismaClient()
    const producto = await prisma.producto.findMany()
    return producto
}
