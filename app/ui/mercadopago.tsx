import { MercadoPagoConfig, Preference } from 'mercadopago';
import { redirect } from 'next/navigation';

const client = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN! });

export default async function pagarProducto({formData} : {formData: FormData}) {
    "use server";

    const preference = await new Preference(client).create({
        body: {
            items: [
                {
                    id: "pagarProducto",
                    title: 'Mi producto',
                    quantity: 1,
                    unit_price: Number(formData.get('price')),
                }
            ],
        }
    });
    redirect(preference.sandbox_init_point!);
}