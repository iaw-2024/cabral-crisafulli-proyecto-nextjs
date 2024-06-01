'use server'

import { z } from 'zod';

const FormSchema = z.object({
    email: z.string({
        invalid_type_error: 'Correo inválido',
    }),
    password: z.string ({
        invalid_type_error: 'Contraseña inválida',
    }),
});