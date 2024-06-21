"use server"

import { MercadoPagoConfig, Preference } from "mercadopago";
import { NextRequest } from "next/server";
import { Product } from "@/app/lib/definitions";

const URL = "localhost:3000";

const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN!
});

export async function createPreference(productos: Product[]) {
  const preference: Preference = new Preference(client);

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
        failure: `${URL}/failure`,
        pending: `${URL}/pending`,
      },
      auto_return: "approved"
    }
  })

  return response

}
export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const productos: Product[] = data.items;

    const response = await createPreference(productos);

    return new Response(JSON.stringify({ id: response.id }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.log(error);

    return new Response(
      JSON.stringify({
        message: "Internal Server Error",
        error: error,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}