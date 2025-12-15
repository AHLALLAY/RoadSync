export const saveAuth = (userData, token) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
};

export const getUser = () => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
        try {
            return JSON.parse(userStr);
        } catch (error) {
            console.error('Erreur lors du parsing de l\'utilisateur:', error);
            return null;
        }
    }
    return null;
};

export const getToken = () => {
    return localStorage.getItem('token');
};

export const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    return !!(token && user);
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
};

export const isAdmin = () => {
    const user = getUser();
    return user?.role === 'Admin';
};

export const isDriver = () => {
    const user = getUser();
    return user?.role === 'Chauffeur';
};

