import React from 'react';

const Modal = ({ children, onClose }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-96">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-2xl text-gray-500"
                >
                    &times;
                </button>
                {children}
            </div>
        </div>
    );
};

export default Modal;
