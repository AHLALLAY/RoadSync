export const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';
export const APP_MODE = import.meta.env.MODE || 'development';
export const IS_DEV = APP_MODE === 'development';
export const IS_PROD = APP_MODE === 'production';

export const APP_CONFIG = {
    API_BASE,
    APP_MODE,
    IS_DEV,
    IS_PROD
};

export default APP_CONFIG;