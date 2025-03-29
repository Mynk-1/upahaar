import React from "react";



const SignInModal = ({ onClose, onSignIn, message }) => {
  

    
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                <div className="text-xl font-bold mb-4">Sign In Required</div>
                <p className="mb-6">{message || "Please sign in to continue"}</p>
                <div className="flex justify-end gap-4">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 "
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onSignIn}
                        className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
                    >
                        Sign In
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SignInModal;