import React from 'react';
import './modalMensajeStyles.css';

export function ModalMensaje({ isOpen, onClose, mensaje }) {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={onClose}>×</button>
            <p>{mensaje}</p>
        </div>
        </div>
    );
}