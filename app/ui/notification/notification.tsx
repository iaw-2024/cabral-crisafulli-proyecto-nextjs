import { useEffect } from 'react';
import { FaceFrownIcon } from '@heroicons/react/24/outline';

interface NotificationProps {
    message: string;
    type: 'success' | 'error';
    onClose: () => void;
}

export function Notification({ message, type, onClose }: NotificationProps) {
    useEffect(() => {
        const timer = setTimeout(onClose, 3000); // Ocultar la notificación después de 3 segundos
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div
            className={`fixed bottom-4 right-4 p-4 rounded-lg shadow-lg z-50 ${type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                }`}
        >
            <div className="flex items-center justify-between">
                {type === 'error' && <FaceFrownIcon className="h-6 w-6 mr-2" />}
                <span>{message}</span>
                <button
                    onClick={onClose}
                    className="ml-4 text-lg leading-none"
                >
                    &times;
                </button>
            </div>
        </div>
    );
}
