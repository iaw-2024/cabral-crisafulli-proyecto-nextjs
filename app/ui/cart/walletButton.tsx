import { initMercadoPago } from '@mercadopago/sdk-react';
import { Wallet } from '@mercadopago/sdk-react';

initMercadoPago(process.env.MP_PUBLIC_KEY!);

export function WalletButton({ preferenceId }: { preferenceId: string }) {
    return (
        <Wallet initialization={{ preferenceId }} />
    )
}