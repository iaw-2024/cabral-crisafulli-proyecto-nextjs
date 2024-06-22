'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { login } from '@/redux/features/carrito/carritoSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { ErrorModal } from './error';

const LoginForm: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showErrorModal, setShowErrorModal] = useState(false);
    const router = useRouter();
    const dispatchLogin = useAppDispatch();

    const handleLogin = () => {
        if (!email || !password) {
            setError('Por favor, complete todos los campos.');
            setShowErrorModal(true);
            return;
        }

        if (!email.includes('@')) {
            setError('Incluya el signo @ en su correo electrónico');
            setShowErrorModal(true);
            return;
        }

        if (email === 'admin@admin.com' && password === 'admin') {
            dispatchLogin(login());
            alert('Iniciar sesión correctamente');
            router.push('/dashboard/admin');
        } else {
            setError('Correo electrónico o contraseña incorrectos');
            setShowErrorModal(true);
        }
    };

    return (
        <>
            <form className="space-y-3">
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
                        <h2 className="text-2xl font-bold mb-6 text-center">Iniciar sesión</h2>
                        <div className="mb-4">
                            <label className="block mb-2 text-sm font-medium text-gray-700">Correo electrónico</label>
                            <input
                                type="email"
                                className="w-full p-2 border border-gray-300 rounded-md"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block mb-2 text-sm font-medium text-gray-700">Contraseña</label>
                            <input
                                type="password"
                                className="w-full p-2 border border-gray-300 rounded-md"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <button
                            type="button"
                            onClick={handleLogin}
                            className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700"
                        >
                            Iniciar sesión
                        </button>
                        <div className="flex h-8 items-end space-x-1" aria-live="polite" aria-atomic="true">
                            {error && (
                                <>
                                    <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
                                    <p className="text-sm text-red-500">{error}</p>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </form>
            {showErrorModal && <ErrorModal message={error} onClose={() => {
                setShowErrorModal(false);
            }} />}
        </>
    );
};

export default LoginForm;