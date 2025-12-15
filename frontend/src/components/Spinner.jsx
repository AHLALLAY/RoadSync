const Spinner = ({ size = 'md', className = '' }) => {
    const sizeClasses = {
        sm: 'w-4 h-4',
        md: 'w-8 h-8',
        lg: 'w-12 h-12'
    };

    return (
        <div className={`flex items-center justify-center ${className}`}>
            <div
                className={`
                    ${sizeClasses[size] || sizeClasses.md}
                    border-4 border-gray-700 border-t-blue-500
                    rounded-full animate-spin
                `}
                role="status"
                aria-label="Chargement en cours"
            >
                <span className="sr-only">Chargement...</span>
            </div>
        </div>
    );
};

export { Spinner };