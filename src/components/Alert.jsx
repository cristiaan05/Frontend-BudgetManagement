const Alert = ({ message,color }) => {
    return (
        <div
            className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50"
            role="alert"
        >
            <div className={`bg-${color}-500 text-white font-bold rounded-lg border shadow-lg p-4`}>
                <p className="text-center">{message}</p>
            </div>
        </div>
    );
};

export default Alert;