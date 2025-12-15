function Input({ type = "text", label, id, placeholder, value, onChange, required = false, className = "", ...props }) {
    return (
        <div className="space-y-2">
            {label && (
                <label htmlFor={id} className="block text-gray-400 text-sm">
                    {label} {required && <span className="text-red-500">*</span>}
                </label>
            )}
            <input
                type={type}
                id={id}
                className={`w-full p-3 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                required={required}
                {...props}
            />
        </div>
    );
}

export { Input };