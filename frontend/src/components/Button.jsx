import { useNavigate } from 'react-router-dom';
import { logout } from '../utils/authUtils';

function Button({ 
    children, 
    onClick, 
    type = "button", 
    variant = "default",
    className = "", 
    style, 
    disabled 
}) {
    const navigate = useNavigate();

    const handleClick = (e) => {
        if (variant === 'logout') {
            logout();
            navigate('/login');
        } else if (onClick) {
            onClick(e);
        }
    };

    const normalStyle = "px-6 py-2 rounded font-bold transition-colors bg-blue-500 text-white hover:bg-blue-600";
    const logoutStyle = "text-sm text-red-400 border border-red-400 px-3 py-1 rounded hover:bg-red-400 hover:text-white transition-colors";
    const baseStyle = variant === 'logout' ? logoutStyle : normalStyle;
    const finalClassName = className 
        ? `${baseStyle} ${className}` 
        : (style ? `${baseStyle} ${style}` : baseStyle);
    const buttonText = variant === 'logout' 
        ? (children || 'Déconnexion') 
        : children;

    return (
        <button
            type={type}
            className={finalClassName}
            onClick={handleClick}
            disabled={disabled}
        >
            {buttonText}
        </button>
    );
}

export { Button };
