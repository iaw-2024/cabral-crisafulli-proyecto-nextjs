import { MercadoPagoConfig, Preference } from "mercadopago";

const URL = "localhost:3000";
export async function POST(req: Request) {
  try {
    const client = new MercadoPagoConfig({
      accessToken: process.env.MP_ACCESS_TOKEN!,
      options: { timeout: 5000 },
    });

    const preference = new Preference(client);

    const data = await req.json();

    const preferenceToCreate = {
      items: data.items,
      auto_return: "approved",
      back_urls: {
        success: `${URL}/store`,
        failure: `${URL}/store/checkout`,
      },
      notification_url: `${URL}/api/notify`,
    };

    const response = await preference.create({ body: preferenceToCreate });

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