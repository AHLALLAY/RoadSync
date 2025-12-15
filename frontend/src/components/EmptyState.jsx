const EmptyState = ({ message = 'Aucune donnée disponible', icon = '📭', children, className = '' }) => {
    return (
        <div className={`flex flex-col items-center justify-center p-12 text-center ${className}`}>
            <div className="text-6xl mb-4">{icon}</div>
            <h3 className="text-gray-400 text-lg font-medium mb-2">{message}</h3>
            {children && <div className="mt-4">{children}</div>}
        </div>
    );
};

export { EmptyState };