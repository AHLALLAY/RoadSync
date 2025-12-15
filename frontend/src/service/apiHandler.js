import { API_BASE } from '../config/env.js';

async function apiHandler(endPoint, methode = 'GET', body = null, token = null) {
    try {
        const validToken = token || localStorage.getItem('token');
        const header = {
            'Content-Type': 'application/json',
            ...(validToken && { 'Authorization': `Bearer ${validToken}` })
        }
        const option = {
            method: methode,
            headers: header
        }

        if (body) {
            option.body = JSON.stringify(body);
        }

        const response = await fetch(`${API_BASE}${endPoint}`, option);
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            return {
                success: false,
                message: errorData.message || response.statusText || 'Une erreur est survenue',
                status: response.status,
                data: errorData
            }
        }

        const data = await response.json();
        return {
            success: true,
            data: data
        };
    } catch (err) {
        return {
            success: false,
            message: err.message || 'Erreur de connexion au serveur',
            status: err.status || 500,
            error: err
        }
    }
}

export default apiHandler;