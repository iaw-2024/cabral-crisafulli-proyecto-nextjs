"use server"

import { NextRequest } from "next/server";
import { Product } from "@/app/lib/definitions";
import { createPreference } from "../../actions";

export async function POST(req: NextRequest) {

  try {
    const data = await req.json();
    const productos: Product[] = data.items;

    const response = await createPreference(productos);
    console.log("cree referencia")

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