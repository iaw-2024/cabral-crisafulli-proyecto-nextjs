import { MercadoPagoConfig, Preference } from 'mercadopago';
import { redirect } from 'next/navigation';

const client = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN! });

export const PagarProducto = async ({ formData }: { formData: FormData }) => {
    "use server";

    const preference = new Preference(client).create({
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
    redirect((await preference).sandbox_init_point!);
}