import { useState, useEffect } from 'react';
import { addToastListener } from '../utils/notifications';

const Notification = () => {
    const [notification, setNotification] = useState(null);

    useEffect(() => {
        const removeListener = addToastListener((toast) => {
            setNotification({
                message: toast.message,
                type: toast.type
            });

            setTimeout(() => {
                setNotification(null);
            }, toast.duration || 3000);
        });

        return removeListener;
    }, []);

    if (!notification) return null;

    const typeStyles = {
        success: 'bg-green-500 text-white',
        error: 'bg-red-500 text-white',
        warning: 'bg-orange-500 text-white',
        info: 'bg-blue-500 text-white'
    };

    return (
        <div
            className={`
                fixed top-4 right-4 z-50 px-6 py-4 rounded-lg shadow-lg
                ${typeStyles[notification.type] || typeStyles.info}
                min-w-[300px] max-w-[500px]
            `}
        >
            <p className="font-medium">{notification.message}</p>
        </div>
    );
};

export { Notification };