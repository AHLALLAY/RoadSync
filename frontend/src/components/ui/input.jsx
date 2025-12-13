function Input({ type = "text", label, id, style, placeholder, value, onChange, required = false }) {
    const defaultStyle = `
        w-full p-2 rounded bg-slate-800 text-white border border-slate-700
        focus:outline-none focus:border-orange-500 focus:shadow-[0_0_10px_rgba(249,115,22,0.4)]
        placeholder-gray-500 transition-all duration-300
    `;
    const finalStyle = style ? style : defaultStyle;
    
    return label ? (
        <div className="space-y-1">
            <label htmlFor={id}>{label} {required && <span className="text-red-500">*</span>}</label>
            <input
                type={type}
                id={id}
                className={finalStyle}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                required={required}
            />
        </div>
    ) : (
        <input
            type={type}
            id={id}
            className={style}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            required={required}
        />
    );
}

export default Input;