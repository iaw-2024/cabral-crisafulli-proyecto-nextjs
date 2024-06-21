import getSixProducts from '@/app/lib/data'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
      const products = await getSixProducts();  
      return NextResponse.json({ products });
  } catch (err) {
      console.error('Error al traer los productos:', err);
      return NextResponse.json({ error: 'No es posible hallar los productos' }, { status: 500 });
  }
}