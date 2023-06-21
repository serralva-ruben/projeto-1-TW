import React, { useState } from 'react';

function ErrorMessagePopup({ message }) {
    const [showPopup, setShowPopup] = useState(true);

    const closePopup = () => {
        setShowPopup(false);
        window.location.reload();
    };

    return (
        <div style={showPopup ? styles.overlay : styles.hiddenOverlay}>
            <div id="error-popup" style={showPopup ? styles.popup : styles.hiddenPopup}>
                <p style={styles.message}>{message}</p>
                <button onClick={closePopup} style={styles.closeButton}>
                    Close
                </button>
            </div>
        </div>
    );
}

const styles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backdropFilter: 'blur(5px)',
        zIndex: 999,
    },
    hiddenOverlay: {
        display: 'none',
    },
    popup: {
        backgroundColor: 'rgba(255, 0, 0, 0.8)',
        padding: '20px',
        borderRadius: '5px',
        color: 'white',
        textAlign: 'center',
    },
    hiddenPopup: {
        display: 'none',
    },
    message: {
        margin: 0,
        fontSize: '18px',
        fontWeight: 'bold',
    },
    closeButton: {
        margin: '10px auto 0',
        padding: '8px 16px',
        backgroundColor: '#3498db',
        color: 'white',
        borderRadius: '5px',
        border: 'none',
        cursor: 'pointer',
        fontSize: '16px',
        fontWeight: 'bold',
        boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.2)',
        transition: 'background-color 0.3s ease',
    },
};

export default ErrorMessagePopup;
