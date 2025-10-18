import React from 'react';
import './Loader.css';

const Loader = () => {
    return (
        <div className="loader-container">
            <div className="ripple-container">
                {/* Multiple ripple rings */}
                <div className="ripple ripple-1"></div>
                <div className="ripple ripple-2"></div>
                <div className="ripple ripple-3"></div>

                {/* Logo in center */}
                <div className="logo-container">
                    <img
                        src="/logo-transparent-png.png"
                        alt="SYNERTIA Logo"
                        className="loader-logo"
                    />
                </div>
            </div>

            {/* Loading text */}
            <div className="loading-text">
                <span className="loading-letter">L</span>
                <span className="loading-letter">o</span>
                <span className="loading-letter">a</span>
                <span className="loading-letter">d</span>
                <span className="loading-letter">i</span>
                <span className="loading-letter">n</span>
                <span className="loading-letter">g</span>
                <span className="loading-dots">
                    <span>.</span>
                    <span>.</span>
                    <span>.</span>
                </span>
            </div>
        </div>
    );
};

export default Loader;
