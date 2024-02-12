import React from 'react';

const Modal = ({ isOpen, onClose, selectedDate }) => {
    console.log("Is modal open?", isOpen);
    console.log("Selected date:", selectedDate);
    return (
        <div className={`modal ${isOpen ? 'is-active' : ''}`}>
            <div className="modal-background" onClick={onClose}></div>
            <div className="modal-content">
                <h1>Hy</h1>
            </div>
            <button className="modal-close is-large" aria-label="close" onClick={onClose}></button>
        </div>
    );
};

export default Modal;
