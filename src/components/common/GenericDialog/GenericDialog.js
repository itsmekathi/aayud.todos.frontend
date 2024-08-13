import React from 'react';
import './GenericDialog.css'; // Assuming you have some basic CSS for the dialog

const GenericDialog = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="dialog-overlay">
            <div className="dialog">
                <button className="close-button" onClick={onClose}>×</button>
                <div className="dialog-content">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default GenericDialog;