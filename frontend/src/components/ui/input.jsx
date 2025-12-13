function Input({ type = "text", label, id, placeholder, value, onChange, required = false }) {
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
                className="w-full p-3 rounded bg-gray-800 text-white border border-gray-700"
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                required={required}
            />
        </div>
    );
}

export default Input;