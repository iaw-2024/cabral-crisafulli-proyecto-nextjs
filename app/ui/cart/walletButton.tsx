'use client'

import { initMercadoPago } from '@mercadopago/sdk-react';
import { Wallet } from '@mercadopago/sdk-react';

const MP_PUBLIC_KEY = "APP_USR-96d39e1c-68d5-45f1-8879-ed5e6023a20e"

initMercadoPago(MP_PUBLIC_KEY);

export function WalletButton({ preferenceId }: { preferenceId: string }) {
    return (
        <Wallet initialization={{ preferenceId }} />
    )
}