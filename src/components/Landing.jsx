import React from 'react';
import { Button } from '@mui/material'; // Import Material UI Button

const LandingContent = () => {
    return (
        <div className="landing-container">
            <div className="landing-overlay">
                <h1 className="landing-title">Welcome to Our Website</h1>
                <Button variant="contained" color="primary" className="cta-button">
                    Get Started
                </Button>
            </div>
        </div>
    );
};

export default LandingContent;
