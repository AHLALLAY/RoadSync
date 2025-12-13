function Button({ children, onClick, type = "button", style }) {
    const baseClasses = "px-6 py-2 rounded font-bold transition-colors";
    const defaultClasses = "bg-blue-500 text-white hover:bg-blue-600";
    
    return (
        <button
            type={type}
            className={style ? `${baseClasses} ${style}` : `${baseClasses} ${defaultClasses}`}
            onClick={onClick}
        >
            {children}
        </button>
    );
}

export default Button;