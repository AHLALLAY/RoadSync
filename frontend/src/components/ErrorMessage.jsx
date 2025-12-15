const ErrorMessage = ({ message, onRetry, className = '' }) => {
    return (
        <div className={`bg-red-900/20 border border-red-500/50 rounded-lg p-6 text-center ${className}`}>
            <div className="flex flex-col items-center gap-4">
                <div className="text-red-400 text-4xl">⚠</div>
                <div>
                    <h3 className="text-red-400 font-bold text-lg mb-2">Erreur</h3>
                    <p className="text-gray-300">{message || 'Une erreur est survenue'}</p>
                </div>
                {onRetry && (
                    <button
                        onClick={onRetry}
                        className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded transition-colors"
                    >
                        Réessayer
                    </button>
                )}
            </div>
        </div>
    );
};

export { ErrorMessage };