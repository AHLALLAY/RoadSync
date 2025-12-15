let toastListeners = [];
let toastIdCounter = 0;

export const addToastListener = (listener) => {
    toastListeners.push(listener);
    return () => {
        toastListeners = toastListeners.filter(l => l !== listener);
    };
};

const showToast = (message, type = 'info', duration = 3000) => {
    const toast = {
        id: toastIdCounter++,
        message,
        type,
        duration
    };

    toastListeners.forEach(listener => listener(toast));
};

export const showSuccess = (message, duration = 3000) => {
    showToast(message, 'success', duration);
};

export const showError = (message, duration = 4000) => {
    showToast(message, 'error', duration);
};

export const showInfo = (message, duration = 3000) => {
    showToast(message, 'info', duration);
};

export const showWarning = (message, duration = 3000) => {
    showToast(message, 'warning', duration);
};