'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const ErrorModal: React.FC<{ message: string; onClose: () => void }> = ({ message, onClose }) => (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm text-center">
            <h2 className="text-xl font-bold mb-4">Error</h2>
            <p className="mb-4">{message}</p>
            <button
                onClick={onClose}
                className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700"
            >
                Cerrar
            </button>
        </div>
    </div>
);

const LoginForm: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showErrorModal, setShowErrorModal] = useState(false);
    const router = useRouter();

    const handleLogin = () => {
        if (email === 'admin@admin.com' && password === 'admin') {
            alert('Iniciar sesión correctamente');
            router.push('/dashboard/admin');
        } else {
            setError('Correo electrónico o contraseña incorrectos');
            setShowErrorModal(true);
        }
    };

    const closeModal = () => {
        setShowErrorModal(false);
    };

    return (
        <>
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
                        onClick={handleLogin}
                        className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700"
                    >
                        Iniciar sesión
                    </button>
                </div>
            </div>
            {showErrorModal && <ErrorModal message={error} onClose={closeModal} />}
        </>
    );
};

export default LoginForm;