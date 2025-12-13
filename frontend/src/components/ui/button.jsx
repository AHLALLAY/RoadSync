function Button({ children, onClick, type = "button", style }) {
    const defaultClasses = `
        px-6 py-2 rounded font-bold transition-all duration-300 border
        border-cyan-500 text-cyan-400 bg-transparent
        hover:bg-cyan-500 hover:text-black hover:shadow-[0_0_15px_rgba(6,182,212,0.6)]
    `;

    return (
        <button
            type={type}
            className={style ? style : defaultClasses}
            onClick={onClick}
        >
            {children}
        </button>
    );
}

export default Button;