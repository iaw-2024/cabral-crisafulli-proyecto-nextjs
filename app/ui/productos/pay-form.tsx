import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { MercadoPagoConfig, Preference } from 'mercadopago';
import { redirect } from 'next/navigation';


const client = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN! });

interface FormComponentProps {
    formValues: {
        name: string;
        lastName: string;
        address: string;
        postalCode: string;
        creditCard: string;
    };
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function PayForm(formData: FormData) {
    async function pagarProducto() {
        "use server";
        const preference = await new Preference(client).create({
            body: {
                items: [
                    {
                        id: 'producto',
                        title: formData.get("message") as string,
                        quantity: 1,
                        unit_price: Number(formData.get("amount")),
                    }
                ],
            }
        });
        redirect(preference.sandbox_init_point!);
    }

    const FormComponent: React.FC<FormComponentProps> = ({ formValues, handleChange }) => {
        return (
            <form action={pagarProducto}>
                <div className="rounded-md bg-gray-50 p-4 md:p-6">
                    <label htmlFor="name" className="mb-2 block text-lg font-medium">
                        Nombre
                    </label>
                    <div className="relative mt-2 rounded-md">
                        <input
                            id="name"
                            name="name"
                            type="text"
                            value={formValues.name}
                            onChange={handleChange}
                            className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                        />
                    </div>


                    <label htmlFor="name" className="mb-2 block text-lg font-medium">
                        Apellido
                    </label>
                    <div className="relative mt-2 rounded-md">
                        <input
                            id="lastName"
                            name="lastName"
                            type="text"
                            value={formValues.lastName}
                            onChange={handleChange}
                            className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                        />
                    </div>

                    <label htmlFor="name" className="mb-2 block text-lg font-medium">
                        Dirección
                    </label>
                    <div className="relative mt-2 rounded-md">
                        <input
                            id="address"
                            name="address"
                            type="text"
                            value={formValues.address}
                            onChange={handleChange}
                            className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                        />
                    </div>

                    <label htmlFor="name" className="mb-2 block text-lg font-medium">
                        Código postal
                    </label>
                    <div className="relative mt-2 rounded-md">
                        <input
                            id="postalCode"
                            name="postalCode"
                            type="textnumber"
                            value={formValues.postalCode}
                            onChange={handleChange}
                            className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                        />
                    </div>

                    <label htmlFor="name" className="mb-2 block text-lg font-medium">
                        Tarjeta de crédito
                    </label>
                    <div className="relative mt-2 rounded-md">
                        <input
                            id="creditCard"
                            name="creditCard"
                            type="textnumber"
                            value={formValues.creditCard}
                            onChange={handleChange}
                            className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                        />
                    </div>

                    <div className="mt-6 flex justify-end gap-4">
                        <Link
                            href="/dashboard/carrito"
                            className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
                        >
                            Cancelar
                        </Link>
                        <Button type="submit" className="flex h-10 items-center rounded-lg bg-violet-500 px-4 text-sm font-medium text-white transition-colors hover:bg-violet-600">
                            Pagar
                        </Button>
                    </div>
                </div>
            </form>
        );
    }
}