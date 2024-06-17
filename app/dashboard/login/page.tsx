import React from 'react';
import LoginForm from '@/app/ui/loginForm';
import { lusitana } from '@/app/ui/fonts';
import {
  AtSymbolIcon,
  KeyIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { Button } from '@/app/ui/button';
import { useFormState, useFormStatus } from 'react-dom';
import { authenticate } from '@/app/lib/actions';




const LoginPage: React.FC = () => {
    return (
        <div>
            <LoginForm />
        </div>
    );
};

export default LoginPage;